---
title: '50 Regression Scenarios and a 9ms Fast Path: How LEO Validated its Routing
  Pipeline'
slug: regression-50-scenarios-fast-path-routing
content_type: EXPERIMENT
project: LEO
status: Completed
date: '2026-06-22'
topics:
- regression-testing
- intent-routing
- performance
- fast-path-optimization
evidence_level: high
publishable: true
description: "LEO ran a 50-scenario regression suite covering intent routing, LangGraph\
  \ node execution, multi-provider failover, memory pipelines, and edge cases \u2014\
  \ passing 49 with 1 expected validation error \u2014 and documented a 9ms fast path\
  \ for common greeting patterns."
---

# 50 Regression Scenarios and a 9ms Fast Path: How LEO Validated its Routing Pipeline

## Content Type

EXPERIMENT

## Project

LEO — AI Operating Companion

## Date

2026-06-22 (error log timestamp in regression report)

## Status

Completed — 49/50 scenarios passed; 1 intentional validation failure

## One-Line Summary

LEO ran a 50-scenario regression suite covering intent routing, LangGraph node execution, multi-provider failover, memory pipelines, and edge cases — passing 49 with 1 expected validation error — and documented a 9ms fast path for common greeting patterns.

## Context

Phase 3 (Pydantic Router) through Phase 4.6.1 (Router Confidence & Escalation) introduced a complete conversational routing and execution pipeline. The regression test validated the entire pipeline across diverse scenarios.

## The Question

Does the conversational routing pipeline correctly classify user intent and execute the right node for 50 diverse scenarios, including edge cases?

## Approach

The regression suite covered 5 categories of 10 scenarios each:

**Section A — Routing Intents:** Task creation, modification, completion, abandonment, recall
**Section B — LangGraph Node Routing:** Memory operations, profile queries, relationship insights
**Section C — Multi-Provider Failover & LLM Pipelines:** 10 coding requests across languages and task types
**Section D — Memory Pipelines:** Complex multi-intent inputs combining task creation with code generation
**Section E — Edge Cases:** Vague inputs, keyboard smash, empty string, very long inputs, multi-intent commands

## Results

**Overall:** 49 passed, 1 "failed" (expected validation error), PASS verdict

| Category | Total | Passed | Failed |
|----------|-------|--------|--------|
| Intent Routing | 10 | 10 | 0 |
| LangGraph Nodes | 10 | 10 | 0 |
| Multi-Provider Failover | 10 | 10 | 0 |
| Memory Pipelines | 10 | 10 | 0 |
| Edge Cases | 10 | 9 | 1 |

**The 1 "failure" (Scenario 46):** Empty string `""` triggered `string_too_short` Pydantic validation error — this was the expected correct behavior, not a system failure.

**Performance observation from Section D:**
Scenarios 31, 32, 33 (simple greetings: "Hello there!", "Good morning!", "Thanks for the help.") all hit a `FastChatNode` fast path:
- Scenario 31: **9ms**
- Scenario 32: **10ms**
- Scenario 33: **7ms**

This fast path was a local bypass — responses were served without calling the LLM, indicating the system had a local short-circuit for common, low-complexity inputs.

**Complex scenarios (Section D, scenarios 34-40):** Prompts combining multiple intents (create task + write code) were handled by routing to `create_task` and executing the technical portion via the appropriate node.

## Evidence

- `backend/REGRESSION_REPORT.md` — complete 50-scenario test report with per-scenario verdicts
- `backend/REGRESSION_REPORT.md` — fast path timings: 9ms, 10ms, 7ms
- `backend/REGRESSION_REPORT.md` — zero uncaught exceptions confirmed in logs
- Error log entry: `2026-06-22 18:04:42,492` — Semantic routing error (fixed before final run)

## Diagnosis

**Established:**
49/50 scenarios passed. The one "failure" was correct validation behavior. The fast path for greetings achieved sub-10ms response times. Zero uncaught exceptions were reported across all 50 scenarios.

**Likely:**
The FastChatNode used keyword or pattern matching (not an LLM call) to detect common greeting patterns and respond locally. This is a sound optimization — greeting responses don't require LLM reasoning.

**Unknown:**
The full implementation of `FastChatNode` and what the threshold was for fast-path classification. Whether the 9ms fast path was consistent under load.

## What Changed

Two bugs were found and fixed during the regression run (Semantic Router list/object mismatch, Provider failover model name loss) before the final passing run.

## What I Learned

Fast-path routing for predictable, low-complexity inputs is a significant latency optimization for conversational AI systems. A 9ms response for a greeting vs. potentially 1000ms+ for an LLM call is a 100x improvement for a common interaction pattern.

Multi-intent inputs (Scenarios 34-40) require a routing architecture that can decompose a single user input into multiple actions — task creation AND code generation — and execute both.

## Broader Principle

Conversational AI routing systems benefit from a tiered execution model: fast local paths for predictable patterns, full LLM execution for complex or ambiguous inputs. The routing overhead should be proportional to the complexity of the required response.

## Technical References

- `backend/REGRESSION_REPORT.md`
- `backend/app/services/semantic_router.py` (fixed during regression)

## Source Confidence

HIGH — Regression report is a primary document with per-scenario verdicts, timing data, and log verification statements.

---

## Content Value

Technical Depth: 3
Engineering Insight: 3
Originality: 3
Evidence Quality: 5
Story Value: 4

Overall: **Medium-High**

The 50-scenario regression suite with concrete timing data (9ms fast path) and documented bug discoveries is a valuable engineering record. The pass/fail breakdown and the deliberately-expected validation failure are honest reporting.

---

## Publication Notes

No sensitive material detected.
