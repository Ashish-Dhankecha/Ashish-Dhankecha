---
title: Benchmarking Six Sub-2B Language Models for On-Device Structured Intent Inference
slug: sub-2b-model-benchmark-ashi
content_type: EXPERIMENT
project: Ashi
status: Completed
date: '2026-08-06'
topics:
- llm-benchmarking
- local-inference
- model-selection
- structured-output
- gguf
- llama-cpp
evidence_level: high
publishable: true
description: "Six GGUF models (268M\u20131.7B parameters) were benchmarked identically\
  \ for structured JSON intent inference on a CPU-only VPS target; Qwen2.5-1.5B-Instruct\
  \ was the only candidate genuinely doing the task rather than failing safely."
---

# Benchmarking Six Sub-2B Language Models for On-Device Structured Intent Inference

## Content Type

EXPERIMENT

## Project

Ashi — Personal Cognitive Operating System

## Date

2026-08-06

## Status

Completed

## One-Line Summary

Six GGUF models (268M–1.7B parameters) were benchmarked identically for structured JSON intent inference on a CPU-only VPS target; Qwen2.5-1.5B-Instruct was the only candidate genuinely doing the task rather than failing safely.

## Context

Ashi's planning layer detected user intent with regex — which cannot understand natural language like "BBC must have released a new video, play it." Phase I introduced a local, bounded, CPU-first inference platform (`ashi-inference`) to give the planner real natural language understanding without contacting a cloud provider. Phase I.3 was the model selection step: benchmark candidates and pick the one that ships in production.

The constraint was tight: must run on a CPU-only VPS, always-on, under 2GB RAM load delta, sub-2B parameters, Apache-2.0 or similar license.

## The Question

Which sub-2B GGUF model most reliably produces valid, actionable structured JSON output for intent inference on Ashi's real vocabulary?

## Initial Approach

Six candidates evaluated, chosen by querying the HuggingFace Hub API (not from memory) for what currently exists and is maintained:

| Model | Params | License |
|---|---|---|
| `google/functiongemma-270m-it` | 268M | Gemma |
| `Qwen/Qwen2.5-0.5B-Instruct` | 494M | Apache-2.0 |
| `Qwen/Qwen2.5-1.5B-Instruct` | 1.54B | Apache-2.0 |
| `HuggingFaceTB/SmolLM2-1.7B-Instruct` | 1.71B | Apache-2.0 |
| `google/gemma-3-1b-it` | 1.0B | Gemma |
| `TinyLlama/TinyLlama-1.1B-Chat-v1.0` | 1.1B | Apache-2.0 |

**One fixed prompt. One fixed JSON schema. Same temperature (0.8, library default). Same settings. No per-model tuning.** — This was a deliberate methodology choice mirroring Ashi's actual production pattern, where one fixed prompt is sent regardless of which backend model answers it.

444 total generations (6 models × 37 examples × 2 repeats). All Q4_K_M quantization for comparability.

Evaluation set: 37 real conversational examples grounded in `ashi.planning.action_detection`'s actual regex vocabulary — including intent detection, multi-step planning, temporal intent, indirect phrasing, parameter extraction, and explicit "negative" (no-action) cases.

## What Happened

**Raw performance table:**

| Model | p50 latency | tok/s | RAM load Δ | Schema valid | Real action accuracy |
|---|---|---|---|---|---|
| functiongemma-270m | 636ms | 94.7 | 335MB | 18% | 2% |
| qwen2.5-0.5b | 562ms | 63.3 | 515MB | 35% | **0%** |
| **qwen2.5-1.5b** | 1,079ms | 27.7 | 1,683MB | **72%** | **50%** |
| smollm2-1.7b | 5,372ms | 25.0 | 2,118MB | 22% | 4% |
| gemma-3-1b | 1,048ms | 35.4 | 715MB | 36% | 15% |
| tinyllama-1.1b | 4,551ms | 43.5 | 1,127MB | 5% | 2% |

**Critical methodology correction:** the headline `action_accuracy` number included "no-action" examples, where a model that completely fails to produce valid JSON still gets credited (because `steps=[]` is the correct answer, and a parse failure also produces `steps=[]`). Splitting by whether the example actually requires an action revealed:

| Model | Accuracy on action-required examples |
|---|---|
| functiongemma-270m | **2%** |
| qwen2.5-0.5b | **0%** |
| **qwen2.5-1.5b** | **50%** |
| smollm2-1.7b | **4%** |
| gemma-3-1b | **15%** |
| tinyllama-1.1b | **2%** |

Every model except Qwen2.5-1.5B was effectively scoring by failing safely. Qwen2.5-1.5B was the only candidate where the accuracy reflected genuine task capability.

**Per-model findings:**

- **FunctionGemma-270M** (purpose-built by Google for function-calling): echoed the JSON schema's own placeholder tokens (`"<string or null>"`) verbatim rather than filling them in. It needs its own function-calling format; under raw completion prompting it is not usable. **18% schema-valid.**
- **Qwen2.5-0.5B**: syntactically the most reliable JSON producer among the small models, but defaults to `{"steps": []}` on almost every actionable request including trivially literal ones regex already solves. Not learning to refuse — failing to engage. **0% accuracy on action-required examples.**
- **SmolLM2-1.7B**: slowest (25.0 tok/s, 5.4s p50) and highest RAM (2.1GB), despite being mid-pack in parameters — worse on every resource axis than the larger-parameter Qwen2.5-1.5B. **22% schema-valid.**
- **Gemma-3-1B**: the real runner-up — 36% schema-valid, 15% real action accuracy. 2-3x worse than Qwen2.5-1.5B on every accuracy metric, but a reasonable fallback if RAM/latency pressure forces it later.
- **TinyLlama-1.1B**: included as an explicit lower bound. 95% failure rate, 2,048 token context window, 2% real action accuracy. Confirmed newer small models are a genuine generational improvement over 2024-era tiny models.
- **Qwen2.5-1.5B-Instruct**: winner. 72% schema-valid, 50% real action accuracy, 57% destination accuracy, 25% parameter accuracy — each the best of any candidate, several by wide margins. Correctly solved `amb-02` ("Find the newest paper about transformers" → `web.search`), one of the verbatim "regex cannot do this" motivating examples from the platform design document.

## Evidence

- `reports/i3-model-benchmark.json` — 444 per-example records, every model
- `apps/ashi/src/ashi/scripts/inference_model_benchmark.py` — harness
- `apps/ashi/src/ashi/scripts/inference_benchmark_dataset.py` — 37-example evaluation set
- `docs/phases/phase-i3-model-selection.md` — full investigation and selection rationale

## Diagnosis

**Established:**

The most consequential finding was the scoring artifact: models that mostly fail to produce valid JSON look disproportionately "accurate" on the null-expected third of the dataset purely by failing uninformatively. The fix was splitting `action_accuracy` by whether the example actually required an action. This correction changes the picture substantially — from "all models cluster around 50-80% accuracy" to "only one model is above 15%."

**Known limitation (disclosed at time, not discovered later):**

Every model was evaluated via raw completion without its native chat template. All six are `-it`/`-Instruct`/`-Chat` tuned and trained to be invoked through templates like `<|im_start|>`. The methodology understates every model's true capability. This was a deliberate choice (matching Ashi's actual production pattern at the time) — but flagged as a remaining risk before production use.

## What Changed

Qwen2.5-1.5B-Instruct (Q4_K_M) was registered as the production model through configuration only (`configs/inference.yaml` + `load_inference_config`). Zero changes to `ashi-inference`'s public interfaces. Swapping the production model is, by construction, editing one YAML file.

The benchmark confirmed: 50% real action accuracy is not production-reliable on its own. Phase I.4 (production prompt/schema/deterministic decoding) was the direct next step.

## What I Learned

Benchmark design can hide the failure you care most about. A scoring rule that gives equal credit to "model produced correct empty output" and "model failed to produce any output at all" makes a broken model look nearly as good as a working one. The correction — split by whether an action was expected — took a single line of Python but fundamentally changed which model won.

The "purpose-built" model (FunctionGemma) was the worst performer under uniform evaluation conditions. Purpose-built capabilities require format-specific inputs; applying a purpose-built model without its intended invocation format is not a fair test of its capability and is not a usable production configuration.

## What I Would Do Differently

Run each model through its own chat template from the start. The "same prompt for all models" methodology was defensible for initial comparison, but it understated every model's capability and the correction — disclosed and flagged at the time — ended up requiring a follow-up phase (I.3 Closure) to properly measure.

## Broader Principle

When evaluating models for a task that has both positive and negative cases, split the accuracy metric by case type before interpreting numbers. Models that fail silently into the correct default answer (empty output = no action) are not "accurate" at the task — they are "failing safely." Headline accuracy averaged across both case types conceals this.

## Technical References

- `docs/phases/phase-i3-model-selection.md` — full investigation
- `reports/i3-model-benchmark.json` — raw data (444 records)
- `apps/ashi/src/ashi/scripts/inference_model_benchmark.py`
- `configs/inference.yaml`
- `docs/phases/phase-i2-production-backend.md` — backend architecture

## Source Confidence

HIGH — all numbers are from actual benchmark runs recorded in `reports/i3-model-benchmark.json`. The methodology is fully documented including its limitations.

---

## Content Value

Technical Depth: 5
Engineering Insight: 4
Originality: 4
Evidence Quality: 5
Story Value: 4

**Overall: High**

A complete, real benchmark of six small language models with actual data, a genuine methodology correction that changes the results substantially, and production-deployment context that justifies why the constraints are real. Particularly strong because FunctionGemma being the worst performer under uniform conditions is a counterintuitive result with a clear explanation.

---

## Publication Notes

Model names, GGUF format details, and benchmark methodology are all public information. Raw benchmark data does not contain personal information. No credentials or private configuration. Safe to publish.
