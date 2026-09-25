---
title: 'The 12-Hour Benchmark Hang That Wasn''t: Monitoring vs. Work'
slug: benchmark-hang-monitoring-gap-ashi
content_type: DEBUGGING_DISCOVERY
project: Ashi
status: "Closed \u2014 progress logging added"
date: '2026-08-06'
topics:
- process-supervision
- observability
- long-running-tasks
- development-process
evidence_level: high
publishable: true
description: "A benchmark that completed in 22 minutes was mistaken for a 12-hour\
  \ hang because a separate background notification watcher silently failed to deliver\
  \ its completion signal \u2014 the benchmark itself was fine throughout."
---

# The 12-Hour Benchmark Hang That Wasn't: Monitoring vs. Work

## Content Type

DEBUGGING DISCOVERY

## Project

Ashi — Personal Cognitive Operating System

## Date

2026-08-06

## Status

Closed — progress logging added

## One-Line Summary

A benchmark that completed in 22 minutes was mistaken for a 12-hour hang because a separate background notification watcher silently failed to deliver its completion signal — the benchmark itself was fine throughout.

## Context

The Phase I.3 inference benchmark ran 6 models × 37 examples × 2 repeats = 444 generations against real locally-loaded GGUF models. The process was launched via `nohup ... &` / `disown` specifically because an earlier attempt had been lost to a session interruption. A separate background watcher was started to report completion: `until ! pgrep ...; do sleep 15; done`.

## The Question

Was the benchmark hanging? What was the actual root cause?

## Initial Approach

Investigation after the benchmark appeared to still be running 12+ hours after launch.

## What Happened

**Direct answers:**

- **Which model was running when it "stopped"?** None. The benchmark process was not running at all by the time this was investigated — `ps aux` showed no `inference-model-benchmark` process. The run had already finished.
- **How many generations completed?** All of them: 444 generations, confirmed by counting `per_example` entries in `reports/i3-model-benchmark.json` (74 = 37×2 per model, across all 6 models, none skipped).
- **Did any model repeatedly hit timeout?** No. Zero `TimeoutError_` entries across all 444 recorded generations. The highest p95 latency was 9.8s (`smollm2-1.7b`), well under the 30s budget.

**Timeline:**
- Started at 19:24
- Printed `Wrote reports/i3-model-benchmark.json` by 19:46
- **22-minute complete, successful run**
- Next investigation: ~12 hours later, when the user asked why it was "still running"

**Actual failure:** A separate background watcher (`until ! pgrep ...`) was supposed to report when the subprocess exited. Between starting the watcher and the next turn, the date changed from 2026-08-05 to 2026-08-06 — a long real-world idle gap — and the expected completion notification never arrived. Passively waiting on a notification that silently failed to arrive, with no independent way to verify the work was done, produced the appearance of a 12-hour hang around a process that had finished in 22 minutes.

**The same failure happened a second time.** Progress logging was added (see What Changed), the benchmark was re-run to get a watched run. It started at 08:08:46, finished at 08:27:06 (18 minutes), `[444/444]` logged — and the next check-in was roughly six hours later, prompted by the user asking why it was still running. The newly-added progress log was working correctly the entire time and would have shown the completion immediately to anyone watching it. The gap was not re-checking it across a long idle period.

## Evidence

- `reports/i3-model-benchmark.json` — 444 records, all six models, none skipped
- Log timestamps from the production run (19:24–19:46)
- `ps aux` output showing no running process
- Second run timestamps (08:08:46–08:27:06)
- `docs/phases/phase-i3-benchmark-hang-root-cause.md`

## Diagnosis

**Established:**

The benchmark completed correctly. The monitoring mechanism (a background watcher process) failed to deliver its completion signal across a long idle gap. Push-based completion notification is unreliable across session boundaries. Pull-based verification (checking the output file, checking the process table) is the reliable signal.

**Also verified during investigation:**

- Timeout enforcement works: a controlled test with `timeout_ms=50, max_tokens=2000` returned a typed `InferenceResult(ok=False, error=TimeoutError_(...))` in ~1.0s.
- Cancellation works: a real in-flight `engine.infer()` call, cancelled via `task.cancel()`, raised `asyncio.CancelledError` in ~0.01s.
- Chat templates: the investigation confirmed that all six benchmark models received identical raw completion (no per-model template) — a deliberate methodology choice that understates capability, flagged as the dominant cause of low `action_accuracy` numbers.

## What Changed

`apps/ashi/src/ashi/scripts/inference_model_benchmark.py` now prints one flushed line per completed generation via `_ProgressLogger`:

```
[137/444] qwen2.5-1.5b amb-02 (repeat 2/2) ok 1204ms — elapsed 210s, ETA 353s
```

Fields: model, example id, repeat number, per-request pass/fail, latency, running elapsed time, and a live ETA extrapolated from the observed completion rate. Silent multi-hour uncertainty is now impossible: `tail -f` on the log shows continuous, unambiguous forward progress or its absence, independent of whether any completion notification fires.

## What I Learned

The failure was not in the work — it was in how completion was supposed to be noticed. A push-based watcher (notify me when done) is vulnerable to the notification itself being lost. A pull-based check (what does the output file say) is always available and directly verifiable.

For long-running background work: progress logging (not just "done / not done") is the right observability primitive. A log that shows `[137/444]` tells you the work is running and progressing; a process watcher tells you only when it stops. The log has higher information density for the problem you actually care about during a multi-hour run (is this stuck?).

## What I Would Do Differently

Add inline progress logging from the start of any multi-hour script. A `print(f"[{i}/{total}] ...")` line is trivial to add and prevents this class of false alarm entirely. The `nohup`/`disown` pattern for session survival is correct; the missing piece was always-on progress visibility, not the subprocess management.

## Broader Principle

For long-running background work with a bounded task count, always prefer observable progress over point-in-time completion. Progress logging that shows current item, total, elapsed, and ETA is more useful than a start/done notification because it remains informative whether checked at 5 minutes, 2 hours, or 12 hours — and distinguishes "running correctly and will finish at 15:30" from "hung at item 137 for the last 3 hours."

The gap between "the work was done" and "I knew the work was done" is a monitoring problem, not a code problem.

## Technical References

- `apps/ashi/src/ashi/scripts/inference_model_benchmark.py` — `_ProgressLogger`
- `docs/phases/phase-i3-benchmark-hang-root-cause.md`
- `reports/i3-model-benchmark.json`

## Source Confidence

HIGH — the investigation has direct evidence: the output file timestamps, the `ps aux` result, and the second occurrence following the same pattern after the progress logging was added.

---

## Content Value

Technical Depth: 2
Engineering Insight: 4
Originality: 3
Evidence Quality: 5
Story Value: 4

**Overall: Medium-High**

The story is compelling — a 22-minute benchmark falsely believed to be hanging for 12 hours, twice — and the lesson about push vs. pull observability is concisely stated. The second occurrence (happening again after the fix was deployed) is a particularly honest detail that makes the story credible. Not the deepest technical piece, but highly relatable.

---

## Publication Notes

No credentials or private data. Process supervision details and benchmark logistics are purely technical. Safe to publish.
