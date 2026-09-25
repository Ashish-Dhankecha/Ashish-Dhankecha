---
title: 'Three Scorer Bugs in a Single Benchmark: A Methodology Audit'
slug: benchmark-scorer-bugs-ashi
content_type: DEBUGGING_DISCOVERY
project: Ashi
status: "Completed \u2014 bugs fixed, numbers corrected"
date: '2026-08-07'
topics:
- benchmark-design
- evaluation
- scoring-methodology
- llm-evaluation
- correctness
evidence_level: high
publishable: true
description: A static analysis of a 123-generation benchmark run found three separate
  scorer bugs that were systematically biasing metrics in the lenient direction, including
  one that turned every complete call failure into a credited correct abstention.
---

# Three Scorer Bugs in a Single Benchmark: A Methodology Audit

## Content Type

DEBUGGING DISCOVERY

## Project

Ashi — Personal Cognitive Operating System

## Date

2026-08-07

## Status

Completed — all three bugs found, two fixed, one deferred with documented conditions

## One-Line Summary

A static analysis of a 123-generation benchmark run found three separate scorer bugs that were systematically biasing metrics in the lenient direction, including one that turned every complete call failure into a credited correct abstention.

## Context

After running the Phase I.3 Closure benchmark (re-measuring Qwen2.5-1.5B with chat template applied), a methodology audit was commissioned: Phase I.3.1. The scope was diagnosis only — no new model runs. Pure static analysis of the existing 123 generations and the actual scorer code. The goal was to determine whether the numbers could be trusted before acting on them.

Three scorer bugs were found. Their combined effect made the model look better on some dimensions and introduced a systematic "always lenient" bias on others.

## The Question

Are the benchmark numbers from the I.3 Closure run trustworthy?

## Initial Approach

Static analysis of `reports/i3-closure-qwen-rerun.json` (123 generation records) plus direct code reading of `_score()` in `apps/ashi/src/ashi/scripts/inference_model_benchmark.py`. 25 records were manually re-scored and compared against the automated scorer's verdict.

## What Happened

### Bug 1 — Failed calls credited as correct no-action abstention

**Found:** `ok=False` records (call failed — timeout or backend error) were scored `action_correct=True` for null-expected examples.

**Mechanism:** The scorer computed `len(steps) == 0` from an empty `steps` list built from `parsed=None` when a call fails. An empty `steps` list from a genuine empty-output model response is indistinguishable from an empty `steps` list from a `parsed=None` failure. Both received correct-abstention credit.

**Impact:** A failed call is not evidence of correct abstention. Bug #1 was systematically crediting failures as correct no-actions.

**After correction:** null-expected accuracy moved **33.3% → 21.2%** (the correction made the model look worse, because the bug had been giving it false credit).

Repeatability also rose from 65.9% → 73.2% as a side effect — the bug had been introducing label noise by mixing genuine correct answers with lucky failures.

### Bug 2 — Destination accuracy graded independent of action correctness

**Found:** `destination_correct` was computed across *all* returned steps independently of whether any step had the correct `action_type`. A multi-step output where the first step's `action_type` was wrong (`web.search` vs expected `browser.navigate`) still received `destination_correct=True` if any step's destination matched.

**Impact:** `destination_accuracy` was measured at 90.5%. After correction: **38.1%**.

This was the largest single correction. It revealed that destination resolution was a real, previously hidden weakness — not a settled strength as the pre-correction number suggested.

**Mechanism of the original error:** the scorer checked all returned steps for destination correctness as a set, not scoped to the step that got the action right. In single-step cases (the majority), this doesn't matter. In multi-step cases, it produces a lenient score.

### Bug 3 — Parameter scorer has an unbounded-fallback shape (found but not fixed)

**Found:** `param_score`'s `param_matching_steps = action_matching_steps or steps` still has the same logical shape as Bug 2 — it falls back to the entire step list when no steps match the expected action type, pooling parameters from wrong-action steps.

**Impact at time of discovery:** verified did *not* distort the current 23.3% `parameter_accuracy` in the existing run (every param-graded record in this run was single-step with a trivially-matching action_type, so the fallback never activated). However, it is not proven safe going forward — in a multi-step run with mismatched actions, it would produce leniently-scored parameter accuracy.

**Disposition:** not fixed during the I.3.1 diagnostic pass (static-analysis-only scope). Documented for the next pass.

### The "93%" finding reclassified

The Phase I.3.1 methodology audit found that "13 of 14 (93%) parameter accuracy failures had the expected value present in `destination` instead of `parameters`" — a schema field-overload issue, not a semantic extraction failure.

After applying corrected destination matching: this figure updated to **14 of 14 (100%)** — the claim undercounted rather than overcounted. The model was consistently putting values in the right conceptual location but the wrong schema field.

## Evidence

- `reports/i3-closure-qwen-rerun.json` — 123 generation records
- `apps/ashi/src/ashi/scripts/inference_model_benchmark.py` — `_score()` function
- `docs/phases/phase-i3-methodology-audit.md` — full investigation
- `docs/phases/phase-i3-scorer-corrections.md` — re-scoring results
- `docs/phases/phase-i3-benchmark-certification.md` — final certification

## Diagnosis

**Established:**

All three bugs bias in the same direction — they make the model look better than it is, or at minimum make failures look like successes. None of them bias against the model.

The common structural pattern: a conditional that falls back to a larger set when the expected condition isn't met. `steps` instead of `action_matching_steps`. All steps instead of the matching step. This is not an intentional design choice — it is a "make it work for the common case" implementation that silently degrades in edge cases.

**Observation:**

After both fixes, the I.3-closure "not production-ready" verdict was unchanged. The corrections moved numbers worse, not better — but they did not flip any conclusion. Destination accuracy fell from 90.5% to 38.1%, a massive correction, but the system was already not considered production-ready for other reasons.

## What Changed

Phase I.3-scorer-corrections fixed bugs 1 and 2. The 123 existing generations were re-scored offline (no new inference). Bug 3 was documented for future work.

A benchmark certification pass (Phase I.3.2) verified that the remaining numbers were trustworthy before proceeding to prompt/schema work.

## What I Learned

Benchmark scorers deserve the same code review attention as the code being benchmarked. A scorer that systematically biases in the lenient direction can make a model look substantially better than it is and prevent the right corrective action from being taken.

The specific failure mode — "fall back to a larger set when the expected condition isn't met" — is particularly dangerous because it is a natural "make the common case work" implementation choice that degrades silently when the edge case activates.

Offline re-scoring (applying the corrected scorer to existing generation records) is a high-leverage tool: it reveals the true numbers without requiring a new model run.

## What I Would Do Differently

Write adversarial test cases for the scorer before running the benchmark. Specifically: a multi-step record where the first step has the wrong action type, to test whether destination_correct and parameter_accuracy scope correctly to the right step. This would have caught both bugs 2 and 3 before the first benchmark run.

## Broader Principle

In LLM benchmarks, "the no-action case" is frequently a scoring trap. A correct no-action output (`{"steps": []}`) is structurally identical to a failed call that produced no output. Any scorer that does not distinguish between these will credit failures as correct abstentions, systematically inflating no-action accuracy — particularly when the failure rate is non-trivial.

## Technical References

- `apps/ashi/src/ashi/scripts/inference_model_benchmark.py` — `_score()`
- `docs/phases/phase-i3-methodology-audit.md`
- `docs/phases/phase-i3-scorer-corrections.md`
- `reports/i3-closure-qwen-rerun-corrected.json`
- `docs/phases/phase-i3-benchmark-certification.md`

## Source Confidence

HIGH — bugs are traced to specific code paths, the impact is calculated from re-scoring the existing 123 generation records (not estimated), and the "14 of 14 (100%)" correction is verified by the certification pass.

---

## Content Value

Technical Depth: 4
Engineering Insight: 5
Originality: 4
Evidence Quality: 5
Story Value: 3

**Overall: High**

The finding that three independent bugs in one scorer all biased in the same lenient direction — and that the correction moved destination accuracy from 90.5% to 38.1% — is a strong, specific engineering lesson. The mechanism of Bug 1 (a complete call failure credited as a correct abstention) is the kind of precise, counterintuitive defect that makes good technical writing.

---

## Publication Notes

No credentials or private data. Benchmark methodology and scoring code are project-internal technical details with no privacy implications. Safe to publish.
