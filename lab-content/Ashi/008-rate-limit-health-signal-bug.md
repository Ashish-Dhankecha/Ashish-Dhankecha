---
title: 'Rate Limit Is Not a Health Signal: Fixing a Provider Cascade Failure'
slug: rate-limit-health-signal-bug-ashi
content_type: DEBUGGING_DISCOVERY
project: Ashi
status: Fixed
date: '2026-07-26'
topics:
- distributed-systems
- llm-routing
- rate-limiting
- health-monitoring
- gemini-api
evidence_level: high
publishable: true
description: "Daily quota exhaustion (HTTP 429) was being treated identically to infrastructure\
  \ failure (service unavailable), which marked the only available provider as UNHEALTHY\
  \ and caused 22 of 40 turns to fail \u2014 even as the provider successfully served\
  \ 134 requests in the same run."
---

# Rate Limit Is Not a Health Signal: Fixing a Provider Cascade Failure

## Content Type

DEBUGGING DISCOVERY

## Project

Ashi — Personal Cognitive Operating System

## Date

2026-07-26

## Status

Fixed

## One-Line Summary

Daily quota exhaustion (HTTP 429) was being treated identically to infrastructure failure (service unavailable), which marked the only available provider as UNHEALTHY and caused 22 of 40 turns to fail — even as the provider successfully served 134 requests in the same run.

## Context

Phase X.2 validated a multi-tier Gemini routing system (tier 1: `gemini-3.5-flash`, tier 2: `gemini-3.1-flash`, tier 3: `gemma-4-31b-it`). A 15-turn smoke test passed. A 40-turn baseline run failed catastrophically. The difference was that 15 turns was too short to exhaust the daily per-project quota.

The system uses the free Gemini API: 500 requests/day/project/model. Ashi runs on free-tier credentials across multiple projects.

## The Question

Why did 22 of 40 turns fail with `ValueError: No suitable models found for the request`, when the provider had successfully served 87 tier-2 attempts in the same run?

## Initial Approach

Root-cause analysis of `x2-stageA-baseline` run (40 turns, real Gemini, real Postgres). Investigation of the health monitoring and routing code.

## What Happened

**The failure chain:**

1. Tier 1's daily quota was spent. Every call 429'd first: **95 of 240 attempts**.
2. Each 429 called `health_monitor.record_failure("gemini")`, incrementing `consecutive_failures` for the **entire provider**.
3. Interleaved with 8 genuine backup failures (gemma `InternalServerError`/timeout), that crossed `offline_threshold=5`.
4. `gemini` → **UNHEALTHY**. Since all live routes were gemini-only, `HealthStrategy` emptied every candidate list and `router.py:47` raised `ValueError: No suitable models found` — for 10 consecutive turns, **including the embedding path**.
5. Turn 40 succeeded only because the 60-second cooldown period finally expired and demoted UNHEALTHY → DEGRADED.

**The core contradiction:**
The provider served **134 successful attempts** in the same run it was declared dead. A healthy-enough provider to serve 134 requests was simultaneously considered unhealthy enough to block all routing.

**Why quota exhaustion should not be a health signal:**

A `429 GenerateRequestsPerDayPerProjectPerModel-FreeTier` means the quota is spent for today. It tells you nothing about whether the provider's infrastructure is running. The fix for a rate limit is to wait for reset (midnight Pacific for Gemini free tier) or to rotate to a different credential — not to mark the provider as unhealthy and stop routing to it entirely.

A `503 Service Unavailable` or `500 Internal Server Error` is an infrastructure signal. That *is* a health event.

These two failure types require completely different responses but were being handled identically: both incremented the same health failure counter.

**Additional wrinkle — streaming path:**

`litellm`'s `MidStreamFallbackError` subclasses `ServiceUnavailableError`, so a 429 arriving *after* a stream opened was mapped to `ProviderUnavailableError` and lost its rate-limit identity before reaching the health counter. `GENERAL_CHAT` is streamed. Fixing the non-streaming path without fixing the streaming path would have left half the calls still incorrectly marked as health failures.

## Evidence

- `reports/soak/x2-stageA-baseline/` — full 40-turn run data
- `reports/x2-stage-a-verification.md` §3 — root cause and fix documentation
- `packages/ashi-llm/src/ashi/llm/service/llm_service.py` — `_record_attempt_failure()`
- `packages/ashi-llm/src/ashi/llm/router/strategy/health.py` — `HealthStrategy`
- ADR `docs/decisions/0083-llm-routing-strategy-and-health-monitoring.md`

## Diagnosis

**Established:**

`LLMService._record_attempt_failure()` called `health_monitor.record_failure()` on every caught exception type, including `RateLimitError`. This was the bug. Rate limit errors are not infrastructure health events; they are demand/quota events. They should be handled by credential rotation and cooldown, not by health scoring.

`HealthStrategy` treating UNHEALTHY as "no candidates at all" rather than "degraded, use the least-unhealthy option" was a compounding factor — it turned a health misclassification into a total routing failure rather than a degraded-but-working state.

## What Changed

**C3 — Rate limits excluded from health monitoring:**
`LLMService._record_attempt_failure()` now exempts `RateLimitError` from health counters. Rate limits are still handled by credential cooldown and rotation — they just no longer poison the health state.

Supporting fix for the streaming path: `LiteLLMClient._underlying_rate_limit()` now unwraps `original_exception`/`__cause__` to correctly identify rate-limit identity even when wrapped in `MidStreamFallbackError`.

**C4 — Degraded instead of empty:**
When every candidate is UNHEALTHY, `HealthStrategy` returns the single least-unhealthy one (ties broken on staleness) rather than `[]`. The degraded choice is surfaced in `RoutingDecision.reason`, so it is never silent.

**Before/after (identical 40-turn conditions):**

| Metric | Before fix | After fix |
|---|---|---|
| Successful turns | 15/40 (37.5%) | 39/40 (97.5%) |
| `No suitable models` errors | 22 | 0 |

**9 new regression tests** covering rate-limit exemption, degraded selection, and the streaming rate-limit unwrapping.

## What I Learned

Health monitoring and quota monitoring are different concerns served by different mechanisms. Conflating them produces failure modes that look like infrastructure outages but are actually quota management problems. The two failure types require completely different responses:

| Signal | Response |
|---|---|
| Rate limit (429) | Wait for reset / rotate credential |
| Infrastructure failure (5xx) | Mark unhealthy / route around |

Treating 429 as a health failure is like marking an employee "unable to work" because they ran out of budget for the month. The person is fine; the budget is exhausted.

## What I Would Do Differently

Include both error types in routing health tests from the start. The smoke test at 15 turns passed precisely because it was too short to hit a 429 under normal quota usage. A quota-exhaustion test (mocked) in the health monitoring unit tests would have verified the exemption before the 40-turn run.

## Broader Principle

In distributed systems with rate-limited external dependencies, distinguish clearly between "the service is unavailable" and "I have exceeded my allowed usage." These require different responses at every layer: routing, health monitoring, retry logic, and error surfacing. Conflating them in a single counter will eventually produce correct-but-misleading health verdicts that cause unnecessary outages.

## Technical References

- `packages/ashi-llm/src/ashi/llm/service/llm_service.py` — `_record_attempt_failure()`
- `packages/ashi-llm/src/ashi/llm/router/strategy/health.py` — `HealthStrategy`
- `packages/ashi-llm/src/ashi/llm/providers/litellm/client.py` — `_underlying_rate_limit()`
- `reports/x2-stage-a-verification.md`
- `docs/decisions/0083-llm-routing-strategy-and-health-monitoring.md`

## Source Confidence

HIGH — the root cause is traced to specific code paths, the failure chain is documented step-by-step with actual request counts, and the before/after comparison used identical run conditions.

---

## Content Value

Technical Depth: 4
Engineering Insight: 5
Originality: 4
Evidence Quality: 5
Story Value: 4

**Overall: High**

The contradiction — provider declared dead while successfully serving 134 requests — is a striking framing. The rate-limit-vs-health distinction is a broadly applicable engineering principle. The fix is concrete and the before/after numbers are dramatic (37.5% → 97.5% success rate).

---

## Publication Notes

References to "gemini" are to the public Gemini API and its documented quota model (500 req/day/project/model). No API keys or credentials. Safe to publish.
