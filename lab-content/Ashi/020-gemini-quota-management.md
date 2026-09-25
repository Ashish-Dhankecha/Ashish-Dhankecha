---
title: Managing a Free-Tier Gemini Quota Across 21 API Keys
slug: gemini-quota-management-credential-pool-ashi
content_type: TECHNICAL_DESIGN
project: Ashi
status: Implemented
date: '2026-07-28'
topics:
- api-management
- rate-limiting
- cost-engineering
- gemini
- resource-constraints
evidence_level: high
publishable: true
description: "Ashi operates on free-tier Gemini (500 req/day/project/model) using\
  \ a credential pool across 21 independent Google Cloud projects, with a quota-reset\
  \ strategy that accounts for the midnight Pacific reset time \u2014 not the developer's\
  \ local time zone."
---

# Managing a Free-Tier Gemini Quota Across 21 API Keys

## Content Type

TECHNICAL DESIGN

## Project

Ashi — Personal Cognitive Operating System

## Date

2026-07-28

## Status

Implemented

## One-Line Summary

Ashi operates on free-tier Gemini (500 req/day/project/model) using a credential pool across 21 independent Google Cloud projects, with a quota-reset strategy that accounts for the midnight Pacific reset time — not the developer's local time zone.

## Context

Building and running a personal AI system without spending money means engineering around rate limits as a primary constraint. Ashi's production LLM layer (`ashi-llm`) was designed from the start with this constraint as a first-class architectural concern.

The free Gemini API tier allows 500 requests per day per project per model. With approximately 7.8 LLM attempts per turn (measured), 500 requests supports roughly 64 turns per day per project. To support sustained daily use, the credential pool spans multiple independent Google Cloud projects.

## The Question

How do you implement LLM-backed cognitive behavior reliably on a zero-budget production constraint?

## Initial Approach

**`CredentialPool`:** A round-robin pool that maintains state per credential — available/rate-limited, `available_at` timestamp. On acquisition, skips rate-limited credentials until one becomes available.

**Initial gap identified:**

`CredentialPool` handled rate-limit cooldowns with a flat 60-second default. A `429 GenerateRequestsPerDayPerProjectPerModel-FreeTier` does not clear in 60 seconds — it clears at midnight Pacific. The credential was being retried every 60 seconds against an exhausted daily quota, wasting attempts on a known-failed key for up to 23 hours.

## What Happened

**ADR 0099 — Quota-Aware, Persisted Credential Cooldown:**

Three fixes:

**1. `reset_strategy: ResetStrategy` callable:**
`CredentialPool` gained an optional `reset_strategy: Callable[[Optional[float]], float]` parameter — "given now, return seconds until eligible again." `mark_rate_limited()` without an explicit `cooldown_seconds` uses the strategy's answer instead of the flat 60-second default. Future providers with different reset shapes (rolling-window, hourly) supply their own callable with no change to `CredentialPool`.

**2. `gemini_pacific_daily_reset()`:**
The one strategy implementation shipped: seconds until the next Pacific-time midnight, computed via `zoneinfo` (stdlib) against wall-clock Pacific time — not a fixed UTC offset. Correct across the PST/PDT transition automatically, twice a year.

**3. Wall-clock timing:**
The cooldown clock moved from `time.monotonic()` to `time.time()` (wall clock). A monotonic clock resets on process restart. Daily quota exhaustion at 14:00 would clear at midnight — but a restart at 22:00 would re-expose the credential immediately, wasting attempts on a still-exhausted key for two more hours.

**Deployment target clarification (amendment to ADR 0099):**
The pool targets 32 independent Gemini projects. Each has its own `GEMINI_API_KEY_*` environment variable. The pool round-robins across them, treating each independently: a 429 on project 1's key does not affect projects 2-32. "One 429 doesn't touch the other 31" is the entire point of the pool.

**Quota reset boundary mismatch:**

The measured constraint in `CLAUDE.md`: "Ashi's local accounting resets at 13:30 IST" (the developer's time zone offset from Pacific midnight). One soak baseline run straddled Google's actual midnight Pacific reset — a "full quota" run that wasn't, because the accounting window was different from Google's. This invalidated one baseline measurement.

**Measured reality (CLAUDE.md, "Measured Constraints"):**
- ~7.8 LLM attempts per turn
- 500 req/day/project/model
- Supported turns per project per day: ~64
- Keys as of 2026-08-01: 21 active (11 removed after dead-key cleanup)
- Effective daily capacity: ~21 × 64 ≈ 1,344 turns/day

## Evidence

- `packages/ashi-llm/src/ashi/llm/credentials/pool.py` — `CredentialPool`, `gemini_pacific_daily_reset()`
- `docs/decisions/0099-quota-aware-persisted-credential-cooldown.md`
- `CLAUDE.md` "Measured Constraints" — quota accounting details
- `.env.example` — `GEMINI_API_KEY_1` through `GEMINI_API_KEY_N` pattern
- `reports/x2-stage-a-verification.md` — quota straddling baseline invalidation

## Diagnosis

**The quota reset mismatch:**

Midnight Pacific = 13:30 IST. Any soak run that starts after 13:30 IST and runs past midnight Pacific — entirely within what looks like a single IST day — actually straddles two Gemini quota windows. Quota that looks "full" at 14:00 IST might actually be nearly exhausted from yesterday. This invalidated one baseline measurement and is documented in CLAUDE.md as a known accounting hazard.

**The 7.8 LLM attempts per turn:**

This is measured, not estimated. It includes: the main chat completion, embedding for memory recall, embedding for memory storage, reasoning (LLM call in some configurations), and retry overhead from 429s and fallback chains. The average of 7.8 means a 500-request daily quota supports 64 turns — surprisingly few for a daily-use personal assistant.

**Engineering response:**

The pool across 21 projects is the direct response to this constraint. The credential rotation is automatic; the developer's daily usage draws from whichever keys still have quota, transparently. If all 21 keys exhaust, Ashi degrades to LLM-free operations (memory retrieval and perception still work, LLM-backed responses wait for reset).

## What I Learned

The Gemini free tier's daily reset time is midnight Pacific, which is a specific point in wall-clock time that varies with DST. Any system that accounts quota locally must anchor to Pacific midnight, not UTC or local time. A monotonic-clock-based cooldown is not suitable for daily-quota tracking because it doesn't survive process restarts that occur within the same quota window.

The 7.8 attempts-per-turn measurement was surprising. Reducing this would have a direct, proportional effect on how many turns are possible per day per project. The main opportunities: reducing embedding calls (cache embeddings for recently-seen content), reducing retry overhead (the rate-limit/health-signal fix reduced wasted 429 attempts).

## What I Would Do Differently

Build the quota-aware cooldown from the start, not after finding the 60-second default was ineffective. The daily-quota nature of the free tier is documented by Google; designing a 60-second cooldown for a daily quota was a known mismatch from the beginning. The fix was straightforward once the gap was identified — it should have been part of the initial design.

## Broader Principle

When designing for rate-limited external services, the cooldown strategy must match the rate limit's actual reset semantics. A flat-duration cooldown (60 seconds) is appropriate for rolling-window rate limits (X requests per minute). It is not appropriate for daily-quota rate limits (X requests per calendar day in a specific time zone). Using the wrong cooldown strategy wastes real capacity: retrying an exhausted daily key every 60 seconds for 23 hours burns attempt-slots against the pool without recovering the exhausted credential.

## Technical References

- `packages/ashi-llm/src/ashi/llm/credentials/pool.py` — `CredentialPool`, `gemini_pacific_daily_reset()`
- `docs/decisions/0099-quota-aware-persisted-credential-cooldown.md`
- `CLAUDE.md` — "Measured Constraints", "Free Tier Quota"
- `configs/bootstrap.yaml` — credential pool configuration
- `.env.example` — key pattern

## Source Confidence

HIGH — the 7.8 attempts/turn is a measured value from production soak runs. The quota accounting (500 req/day/project/model) is from Google's documented free tier. The key count (21 active) is from CLAUDE.md. The Pacific midnight reset is Google's documented behavior, implemented and verified via `zoneinfo`.

---

## Content Value

Technical Depth: 3
Engineering Insight: 4
Originality: 4
Evidence Quality: 4
Story Value: 3

**Overall: Medium**

The constraint (500 req/day/project/model) is real and specific. The engineering response (21 independent projects, quota-aware cooldown, Pacific-midnight anchor) is concrete. The 7.8 attempts/turn measurement is a surprising and memorable detail. Good context-setting piece for the engineering constraints under which this system operates.

---

## Publication Notes

References to the Gemini free tier quotas are to Google's publicly documented API limits. No API keys are referenced; only the environment variable naming pattern (`GEMINI_API_KEY_N`) from `.env.example`. Safe to publish.
