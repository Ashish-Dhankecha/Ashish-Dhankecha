---
title: 'From 32 Seconds to 5.4 Seconds: Tracing and Eliminating Latency in a 28-Package
  LLM System'
slug: latency-reduction-32s-to-5s-ashi
content_type: EXPERIMENT
project: Ashi
status: Completed
date: '2026-07-26'
topics:
- performance
- latency
- llm-systems
- tracing
- optimization
evidence_level: high
publishable: true
description: "Phase X.2 attribution tracing reduced first-token latency from 32,836\
  \ ms to 5,450 ms p50 by identifying that reasoning alone consumed 51% of total time\
  \ \u2014 and addressing the compounding effects of retry loops, missing fallbacks,\
  \ and uncapped contributor count."
---

# From 32 Seconds to 5.4 Seconds: Tracing and Eliminating Latency in a 28-Package LLM System

## Content Type

EXPERIMENT

## Project

Ashi — Personal Cognitive Operating System

## Date

2026-07-26

## Status

Completed

## One-Line Summary

Phase X.2 attribution tracing reduced first-token latency from 32,836 ms to 5,450 ms p50 by identifying that reasoning alone consumed 51% of total time — and addressing the compounding effects of retry loops, missing fallbacks, and uncapped contributor count.

## Context

Ashi's turn processing involves a 16-contributor cognitive pipeline before reaching the LLM call that produces the user-facing response. First-token latency of 32+ seconds was unmistakably a product problem, not a benchmark concern.

Phase X.2 introduced latency attribution: measuring and recording where time is spent within each turn, per contributor and per subsystem.

## The Question

Where does a 32-second first-token time actually go, and what are the highest-leverage fixes?

## Initial Approach

Stage A of Phase X.2 added attribution instrumentation throughout the turn pipeline, collecting per-phase timing for each contributor and for the final LLM call. A baseline soak run (`x2-stageA-baseline2`) measured the attributed distribution across 40 turns.

## What Happened

**Before optimization (baseline from production-readiness investigation):**

| Metric | Value |
|---|---|
| `first_token` p50 | **32,836 ms** |

**After Phase X.2 (measured in `CLAUDE.md`):**

| Metric | p50 |
|---|---|
| `first_token` | **5,450 ms** |
| `reasoning` alone | **2,777 ms** (51% of total) |
| Perception turn path | **24 µs** |
| Total cognitive pipeline (ex-LLM) | ~2,673 ms |

**What attribution revealed:**

1. **Reasoning dominated at 51% of total time.** `ashi-reasoning` produces the structured world model interpretation before the final LLM call. It was the single largest consumer of pre-LLM time and had no budget enforcement.

2. **Retry cascade amplification.** Each 429 quota error from Gemini tier-1 triggered a retry chain through tier-2 and tier-3 fallbacks, with health-monitor polling overhead on each attempt. Before the rate-limit / health-signal separation (Content Piece 008), these retries also triggered health degradation, compounding the cost.

3. **Missing `EMBEDDING` backup.** The routing configuration for `TaskClass.EMBEDDING` had no backup provider. A single transient embedding failure caused the entire turn to fail rather than degrading to a cached result or a reduced-context response.

4. **Contributor count not bounded.** Up to 16 contributors ran per turn sequentially in phases. Early phases produced context consumed by later phases — this is correct — but no mechanism existed to cap the total phase-budget or to parallelize work that didn't have data dependencies.

**The `x2-stageA-baseline` cascade failure:**

Before the rate-limit fix, a 40-turn baseline showed 22 of 40 turns failing with `No suitable models found`. The remaining 18 successful turns showed worst-case latency — every successful turn had to wait through multiple failed attempts before landing on a working model+credential combination.

**Post-fix comparison (identical conditions):**

| Metric | Before | After |
|---|---|---|
| Successful turns | 15/40 | **39/40** |
| p50 first-token | 32,836 ms | **5,450 ms** |
| Fallback utilization | Cascading to UNHEALTHY | Clean tier rotation |

## Evidence

- `reports/x2-stage-a-verification.md` — full verification with before/after counts
- `reports/latency-attribution.md` — per-phase attribution across turns
- `CLAUDE.md` "Measured Constraints" — 5,450ms p50 / 2,777ms reasoning p50 / 24µs perception
- `reports/soak/x2-stageA-baseline/` — pre-fix baseline
- `reports/soak/x2-stageA-baseline2/` — post-fix controlled comparison

## Diagnosis

**Established:**

The majority of the latency (51% from reasoning, approximately 48% from the final LLM call) was in computationally necessary work. The 32+ second number was not 32 seconds of this necessary work — it was the necessary work plus retry overhead, failure cascades, and serial contributor execution that could have been partially parallelized.

The rate-limit / health-signal separation (Content Piece 008) was the single highest-leverage fix: it prevented quota exhaustion from triggering health degradation, which eliminated the cascade where 95 of 240 attempts failed before landing on a successful path.

The `EMBEDDING` backup was a missing-configuration issue: `configs/routing.yaml` had a comment indicating the gap, but the backup was not wired. Adding it removed a class of hard turn failures.

**Open after Phase X.2:**

Reasoning at 2,777 ms p50 remains the dominant pre-LLM cost. The `ashi-reasoning` package's work (structured interpretation of context) is inherently expensive — it involves its own LLM call in some configurations. Reducing this requires either caching stable reasoning outputs, reducing the reasoning scope, or making it conditional. These were deferred to later phases.

## What I Learned

Latency attribution is the prerequisite for latency optimization. Before attribution data existed, every contributor "might" be the bottleneck. After attribution: reasoning is 51% of measured time, and no other contributor comes close. Optimization effort is immediately directed to the right place.

The compounding effect of retry overhead is larger than the overhead itself. A 429 retry that "costs 200ms" may actually cost 2 seconds when the health-monitoring side effects cascade into marking the provider degraded, requiring the health recovery period before the next successful attempt. Measuring the end-to-end effect (successful turn latency after a 429) rather than just the retry mechanism overhead gives the true cost.

## What I Would Do Differently

Add attribution from the start, not after latency becomes a visible problem. The instrumentation cost (a `time.monotonic()` at each phase boundary and a structured log entry per turn) is negligible. The information it provides is essential for any future optimization work and makes performance regressions visible in ongoing soak runs.

## Broader Principle

In a multi-stage pipeline with external calls (LLM, embedding, database), attribution tracing is the only way to know where time goes. Profiling tools that work at the Python call-stack level are not useful for systems where most time is spent waiting for external I/O. A purpose-built attribution log — recording what each stage did and how long it took — is the right tool for this class of system.

Any latency measurement without attribution is an anchor number without a story. Attribution tells you which part of the system to optimize, without which the anchor number is only frustrating.

## Technical References

- `reports/x2-stage-a-verification.md`
- `reports/latency-attribution.md`
- `CLAUDE.md` "Measured Constraints"
- `packages/ashi-observability/` — attribution event infrastructure
- `configs/routing.yaml` — embedding backup addition

## Source Confidence

HIGH — the before/after numbers are from real soak runs under identical conditions. The per-phase attribution data is from instrumented production turns. The p50 values in CLAUDE.md are dated 2026-07-26 and attributed to specific soak runs.

---

## Content Value

Technical Depth: 4
Engineering Insight: 4
Originality: 3
Evidence Quality: 5
Story Value: 4

**Overall: High**

32s → 5.4s is a strong concrete result. The "51% from reasoning" attribution finding explains *why* the optimization worked where it did. The cascade failure story (22/40 turns failing before the rate-limit fix) adds context for how bad the baseline was.

---

## Publication Notes

No credentials or private data. Latency numbers are from the developer's own local instance. "Gemini" references are to the public API. Safe to publish.
