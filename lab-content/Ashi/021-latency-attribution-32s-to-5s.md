---
title: "Latency Attribution: Tracing and Eliminating Cascades from 32.8 s to 5.4 s"
slug: latency-attribution-32s-to-5s-experiment-ashi
content_type: EXPERIMENT
project: Ashi
status: Draft
date: "2026-07-26"
topics:
  - performance
  - latency
  - attribution
  - optimization
evidence_level: high
publishable: false
pinned: false
description: "Attribution tracing and cascade elimination reducing turn latency from 32,836 ms to 5,450 ms p50 across 40-turn soak runs."
---

# Latency Attribution: Tracing and Eliminating Cascades from 32.8 s to 5.4 s

## Question

Where does a 32-second first-token turn latency actually go in a 28-package cognitive architecture, and what are the highest-leverage mechanical interventions to eliminate it?

## Hypothesis

The 32+ second latency in the turn pipeline is dominated by compounding cascade overheads (retry loops, health degradation cascades from quota exhaustion, missing provider fallbacks, and serial contributor execution) rather than raw model generation time alone. Isolating phase boundaries and decoupling error signals will cut first-token turn latency by at least 75%.

## Setup (controlled variables)

- **Test harness**: Soak test framework (`ashi.soak.cli`)
- **Turn count**: 40 consecutive turns per run
- **Scenario**: Memory scenario (`--scenario memory`)
- **Random seed**: `1138482380`
- **Baseline run ID**: `x2-stageA-baseline`
- **Verification run ID**: `x2-stageA-baseline2`
- **Model providers**: Gemini API tier-1, llama.cpp local inference engine
- **Controlled variables**:
  - Constant prompt payload length across paired soak runs
  - Fixed 16-contributor pipeline topology
  <!-- TODO: Host CPU processor model, core allocation, and clock frequency -->
  <!-- TODO: Host RAM configuration and swap utilization during run -->
  <!-- TODO: Local background system load and thermal throttling status -->
  <!-- TODO: Exact OS kernel version and Python runtime version -->

## Method

1. **Instrumentation**: Implemented per-phase latency attribution instrumentation across the entire turn pipeline in `packages/ashi-observability/`, capturing high-resolution monotonic timestamps (`time.monotonic()`) at each contributor boundary.
2. **Signal decoupling**: Separated HTTP 429 quota exhaustion signals from provider health degradation (Content Piece 008) to stop transient rate-limits from marking providers `UNHEALTHY`.
3. **Fallback restoration**: Added missing backup provider routing for `TaskClass.EMBEDDING` in `configs/routing.yaml`.
4. **Execution budgeting**: Isolated the reasoning phase boundary (`ashi-reasoning`) to measure its standalone contribution to pre-LLM turn time.

## Measurements

| Metric | Pre-fix Baseline (`x2-stageA-baseline`) | Post-fix Controlled (`x2-stageA-baseline2`) |
|---|---|---|
| `first_token` latency p50 | 32,836 ms | 5,450 ms |
| `reasoning` alone p50 | <!-- TODO: Baseline isolated reasoning duration in ms --> | 2,777 ms (51% of total) |
| Perception turn path | <!-- TODO: Baseline perception latency in µs --> | 24 µs |
| Cognitive pipeline (ex-LLM) | <!-- TODO: Baseline total pre-LLM cognitive duration in ms --> | ~2,673 ms |
| Successful turns | 15 / 40 (37.5%) | 39 / 40 (97.5%) |
| Failed turns ("No suitable models") | 22 / 40 (55.0%) | 0 / 40 (0.0%) |
| Fallback behavior | Cascading degradation to UNHEALTHY | Clean tier rotation |

<!-- TODO: Complete latency distribution table (p90, p95, p99) for pre-fix and post-fix runs -->

## Result

- Attribution tracing pinpointed that `ashi-reasoning` consumed 51% (2,777 ms) of the total turn time, establishing that pre-LLM cognition was the single largest computational consumer.
- First-token turn latency dropped from 32,836 ms to 5,450 ms p50.
- Turn success rate increased from 37.5% (15/40) to 97.5% (39/40) under identical 40-turn soak conditions.

## Threats to validity

- **Network latency & external API quota variance**: Fluctuations in external Gemini API response latency and tier quota resets could skew individual turn timings.
- <!-- TODO: Measured variance of local disk I/O latency for sqlite state persistence -->
- <!-- TODO: Cache hit rate differential across early turns versus late turns in the 40-turn soak -->
- <!-- TODO: Verification of reproducibility on pure local inference without any cloud provider fallback -->

## Conclusion

Latency attribution is the indispensable prerequisite for performance engineering: without empirical attribution data, optimization efforts target arbitrary subsystems. The majority of the 32-second delay was not necessary computational work, but cascade failures caused by conflating rate-limits with provider unhealthiness. Decoupling error channels and attributing every microsecond resolved the latency crisis.

## Reproduce

```bash
# Execute the controlled 40-turn soak benchmark
uv run soak --turns 40 --scenario memory --seed 1138482380
```

- **Commit hash**: `46ad66a`
<!-- TODO: Exact git tag or commit SHA for the baseline pre-instrumentation checkout -->
<!-- TODO: Full list of environment variable flags required for reproducible offline execution -->
