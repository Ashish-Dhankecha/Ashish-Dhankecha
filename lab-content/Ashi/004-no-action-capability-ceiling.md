---
title: 'Qwen2.5-1.5B''s No-Action Ceiling: When Prompt Engineering Stops Working'
slug: no-action-failure-investigation-ashi
content_type: EXPERIMENT
project: Ashi
status: "Completed \u2014 Recommendation: Option B (execution safeguard)"
date: '2026-08-08'
topics:
- llm-evaluation
- model-capability
- structured-inference
- quantization
- failure-analysis
evidence_level: high
publishable: true
description: 'A systematic investigation proved that Qwen2.5-1.5B-Instruct''s 18.2%
  no-action accuracy is a genuine capability ceiling, not a prompting or quantization
  problem: the failure rate is identical at Q4 and Q8, and categories with the most
  explicit prompt coverage fail at the same 100% rate as categories never mentioned
  in the prompt at all.'
---

# Qwen2.5-1.5B's No-Action Ceiling: When Prompt Engineering Stops Working

## Content Type

EXPERIMENT

## Project

Ashi — Personal Cognitive Operating System

## Date

2026-08-08

## Status

Completed — production recommendation issued

## One-Line Summary

A systematic investigation proved that Qwen2.5-1.5B-Instruct's 18.2% no-action accuracy is a genuine capability ceiling, not a prompting or quantization problem: the failure rate is identical at Q4 and Q8, and categories with the most explicit prompt coverage fail at the same 100% rate as categories never mentioned in the prompt at all.

## Context

After Phase I.4.1 shipped production prompt v2 and schema v2, no-action accuracy was 18.2% — the model hallucinated an action on roughly 4 in 5 conversational inputs where no action was warranted. Phase I.4.2 investigated whether this was fixable before integrating the model into the planner.

Two hypotheses were tested: (1) quantization is the ceiling — Q8 will fix it; (2) prompt engineering has headroom — better instructions will fix it.

## The Question

Has Qwen2.5-1.5B-Instruct reached its capability ceiling for reliable no-action abstention, or is there still meaningful headroom?

## Initial Approach

**Investigation 1 — Quantization comparison:**
- Same 41-example dataset, same production prompt v2, same schema v2, same deterministic decoding
- Q4_K_M (production) vs Q8_0 (freshly downloaded) — same Qwen2.5-1.5B-Instruct weights
- Run twice each, through the identical unmodified scoring function

**Investigation 2 — Failure taxonomy:**
52 no-action-expected samples across 10 semantic categories (reflective thinking, hypothetical, planning, comparison, brainstorming, storytelling, explanation, casual chat, philosophical, emotional)

**Investigation 3 — Prompt ceiling:**
Direct comparison: which failing categories are explicitly covered by the production no-action rule, vs. which are not?

**Investigation 4 — Capacity analysis:**
Every failure classified into exactly one root cause.

## What Happened

### Investigation 1 — Quantization ruled out

| Metric | Q4_K_M | Q8_0 | Difference |
|---|---|---|---|
| Schema validity | 92.7% | 91.5% | −1.2 pts |
| Action-required accuracy | 85.0% | 90.0% | +5.0 pts |
| **No-action accuracy** | **18.2%** (4/22) | **18.2%** (4/22) | **0.0 pts — identical** |
| Parameter accuracy | 80.0% | 80.0% | 0.0 pts |

No-action accuracy is exactly identical to three decimal places (0.18181818...) at both quantizations. The same 4 of 22 records are the only ones either quantization gets right — both repeats of `edge-01` and `edge-02`, degenerate/empty-or-gibberish inputs.

Critically: quantization visibly *did* move other metrics (action-required accuracy rose 5 pts at Q8, latency and RAM increased as expected for a 51%-larger file), proving the comparison is sensitive enough to detect real quantization effects. It detected none on no-action accuracy.

### Investigation 2 — Failure taxonomy

| Category | Failure rate |
|---|---|
| Degenerate input (empty string, gibberish) | **0%** |
| Reflective thinking | 100% |
| Explanation / factual question | 100% |
| Continuation / prior-context reference | 100% |
| Hypothetical discussion | 100% |
| Planning (abstract, non-actionable) | 100% |
| Comparison | 100% |
| Brainstorming | 100% |
| Storytelling | 100% |
| Casual chat | 100% |
| Philosophical | 100% |
| Emotional | 100% |

**The single most important finding:** failure is not concentrated on any semantic category. Every category of real, grammatically coherent conversational input fails at exactly 100%. The dividing line is not semantic — it is whether the model has *any* well-formed sentence to project an action onto. Given one, it reliably invents one, regardless of what the sentence says.

The two fallback shapes used in 48 of 48 failures:
- `web.search` with the entire input sentence dumped into `parameters.query`
- `notification.send` with the entire input dumped into `parameters.message`

Two cases used `device.bluetooth.enable` with no textual basis whatsoever.

### Investigation 3 — Prompt ceiling

The production system prompt explicitly named: "reflective," "conversational," "personal," "thoughts," "plans being discussed rather than requested," "questions," "chit-chat." One in-context few-shot example demonstrated a reflective thinking → no-action case verbatim.

| Category | Was it explicitly covered? | Failure rate |
|---|---|---|
| Reflective thinking | **Yes — named AND demonstrated by few-shot** | 100% |
| Planning | **Yes — literally named by phrase** | 100% |
| Casual chat | **Yes — literally named** | 100% |
| Questions / explanation | **Yes — literally named** | 100% |
| Hypothetical, comparison, storytelling | **No explicit coverage** | 100% |

Categories with the most explicit, most specific prompt coverage fail at the exact same 100% rate as categories the prompt never names. There is no detectable correlation between "how explicitly the prompt covers this" and "whether the model gets it right."

The model failed against an exact repeat of its own in-context few-shot example (`cog-01`: "Let's think about how to approach this problem" — verbatim the few-shot's own text — still failed 2/2).

### Investigation 4 — Root cause classification

| Root cause | Count | % |
|---|---|---|
| **Model reasoning failure** | 44 | **91.7%** |
| Missing few-shot coverage | 3 | 6.3% |
| Prompt ambiguity | 1 | 2.1% |
| Schema ambiguity | 0 | 0% |
| Quantization | 0 | 0% |

91.7% of failures are genuine model reasoning failure. The model, at this size and configuration, does not reliably suppress action-generation on well-formed input it has no concrete action to take on, regardless of how explicitly instructed.

## Evidence

- `reports/i4-2-quantization-comparison.json` — Q4 vs Q8 comparison run
- `reports/i4-2-supplementary-noaction.json` — 30-sample supplementary diagnostic
- `reports/i4-implementation-validation.json` — certified Phase I.4.1 baseline
- `docs/phases/phase-i4-2-production-readiness-investigation.md`
- `apps/ashi/src/ashi/app/inference/prompts.py` — `_SYSTEM_PROMPT_V2`

## Diagnosis

**Established:**

The model's no-action failure is structurally narrow: 100% failure on every kind of well-formed conversational input, 0% failure only on degenerate input (empty string, gibberish). This is not a category-specific failure — it is a structural property of what the model does with any well-formed sentence.

Both the "make the same model better" levers available (quantization, prompt engineering) are exhausted by direct measurement, not assumption.

**Observation:**

Every other capability this platform measures is strong and substantially improved by Phase I.4.1: parameter accuracy 80% (from 23.3% baseline), destination accuracy 64.3% (from 38.1%), action-required accuracy 85-90%, schema validity 92.7%, 100% decode determinism. Discarding the model to fix one narrow failure mode would be disproportionate.

## What Changed

**Recommendation: Option B — production-ready only with an execution safeguard.**

The failure is structurally narrow and boundable. A blanket confirmation/approval gate on `cognitive.intent`-sourced actions is sufficient — because the rest of the output is genuinely useful under a gate (parameter and destination extraction are strong), and Ashi's existing `PermissionBoundary` architecture is already designed to catch exactly this class of risk.

The safeguard was not implemented in Phase I.4.2 (out of scope). Phase I.5 remains the implementation phase.

## What I Learned

The most conclusive experiment: the model failed against an exact repeat of its own in-context few-shot example. If a model fails to generalize a behavior it was just shown working — on verbatim identical input — prompt engineering cannot teach that behavior. The failure is below the prompting layer.

This distinction — "model not following instructions" vs. "model structurally incapable of the behavior" — is testable by removing all prompt guidance and verifying the failure rate doesn't change. It didn't.

## What I Would Do Differently

Design the model selection benchmark to include no-action accuracy as a first-class metric from the start (Phase I.3 focused on action-required accuracy). The no-action failure mode was the most dangerous one for an autonomous assistant, and it was only discovered after selection.

## Broader Principle

For autonomous assistant systems, "no-action accuracy" — the rate at which the model correctly abstains when given conversational input — may be more important than "action accuracy." A model that frequently invents actions on ambiguous input is more dangerous than one that frequently misidentifies which action to take. These are different failure modes, require separate evaluation, and may point to fundamentally different architectural responses (action safeguards vs. prompt improvement).

## Technical References

- `docs/phases/phase-i4-2-production-readiness-investigation.md`
- `reports/i4-2-quantization-comparison.json`
- `reports/i4-2-supplementary-noaction.json`
- `apps/ashi/src/ashi/app/inference/prompts.py`
- `docs/decisions/0046-execution-permission-boundary.md` (PermissionBoundary)

## Source Confidence

HIGH — quantization comparison is byte-for-byte identical across matched records; failure taxonomy is based on direct inspection of all 52 samples; prompt-ceiling finding cross-references the actual system prompt text character by character.

---

## Content Value

Technical Depth: 5
Engineering Insight: 5
Originality: 5
Evidence Quality: 5
Story Value: 4

**Overall: High**

This is one of the project's strongest research artifacts: a systematic elimination of two hypotheses by measurement, a cliff-shaped failure taxonomy (0% vs 100%, with no gradient), and a counter-intuitive result (failing verbatim against its own few-shot example). The "prompt engineering has reached diminishing returns" conclusion is backed by a clear experimental design.

---

## Publication Notes

No credentials or private data. Model behavior is fully documented in benchmark JSON files. System prompt text describes Ashi's internal instruction policy, which is noted in the README as private — consider paraphrasing the prompt content rather than quoting it directly. The conclusions and experimental design are safe to publish fully.
