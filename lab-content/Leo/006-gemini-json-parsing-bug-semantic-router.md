---
title: 'When Gemini Returns an Array Instead of an Object: A Semantic Router Bug'
slug: gemini-json-array-vs-object-semantic-router
content_type: DEBUGGING_DISCOVERY
project: LEO
status: Completed
date: '2026-06-22'
topics:
- llm-output-parsing
- defensive-programming
- semantic-routing
- gemini-api
evidence_level: high
publishable: true
description: Gemini occasionally returned a single-item JSON array instead of a JSON
  object when routing complex prompts, causing the semantic router to crash with a
  "list object has no attribute get" error.
---

# When Gemini Returns an Array Instead of an Object: A Semantic Router Bug

## Content Type

DEBUGGING_DISCOVERY

## Project

LEO — AI Operating Companion

## Date

2026-06-22 (timestamp from error log in REGRESSION_REPORT.md)

## Status

Completed — bug identified and fixed

## One-Line Summary

Gemini occasionally returned a single-item JSON array instead of a JSON object when routing complex prompts, causing the semantic router to crash with a "list object has no attribute get" error.

## Context

LEO's semantic router used Gemini to classify user intent into routing categories (e.g., `create_task`, `recall_profile`, `update_settings`). The router expected Gemini to return a JSON object from which it extracted the `intent` key using `.get("intent")`.

## The Question

Why did the semantic router fail intermittently on specific complex prompts but succeed on simpler ones?

## Initial Approach

The semantic router called Gemini with a prompt asking it to return a JSON object containing an `intent` field. The parser then called `data.get("intent")` on the result.

## What Happened

During regression testing (Scenario 34: "I'm learning Neo4j. Create a task and write a Cypher query to find nodes."), the router produced:

```
2026-06-22 18:04:42,492 - leo_backend - ERROR - Semantic routing failed: 'list' object has no attribute 'get'
```

The investigation found that Gemini occasionally returned a single-item JSON list (`[ { "intent": ... } ]`) instead of a raw JSON object (`{ "intent": ... }`). This happened specifically on complex prompts that combined multiple requests (create a task AND write code).

The parser called `.get("intent")` on what it assumed was a dict, but received a Python `list`.

## Evidence

- `backend/REGRESSION_REPORT.md` — Issue A: explicit error log with timestamp and error message
- `backend/REGRESSION_REPORT.md` — fix description: defensive list check in `semantic_router.py`
- Error: `2026-06-22 18:04:42,492 - leo_backend - ERROR - Semantic routing failed: 'list' object has no attribute 'get'`
- Scenario 34 as the specific reproducer

## Diagnosis

**Established:**
Gemini returned `[ { "intent": ... } ]` (a list) instead of `{ "intent": ... }` (an object) for complex, multi-intent prompts. The parser assumed dict and called `.get()`, which fails on a list.

**Likely:**
Gemini's JSON generation behavior for prompts requesting "a JSON object" is non-deterministic in edge cases. Complex prompts with multiple sub-requests may influence the model to wrap its response in an array, possibly due to training data patterns where lists of objects are a common output format for multi-item requests.

**Unknown:**
Whether this behavior is consistent across Gemini model versions or specific to the version used. Whether other prompts with similar multi-part structure trigger the same behavior.

## What Changed

The fix was added to `backend/app/services/semantic_router.py` (lines 68-72):

```python
data = json.loads(text.strip())
if isinstance(data, list):
    if len(data) > 0:
        data = data[0]
    else:
        data = {}
```

This defensive check extracts the first element if the parsed JSON is a list. All subsequent regression scenarios (34 onward) passed after the fix.

## What I Learned

LLM JSON output should never be assumed to be a specific type, even when the prompt explicitly requests a specific JSON structure. The model's output can vary between object and array representations, especially when the prompt contains multiple distinct requests that the model might interpret as a "list" of responses.

Defensive type checking on LLM JSON output is not paranoia — it is a necessary engineering practice.

## What I Would Do Differently

**Hindsight observation:** Define a Pydantic model for the expected router response and validate the LLM output through it. Pydantic would handle type coercion and validation uniformly, without requiring manual `isinstance` checks. If the LLM returns an array, the schema validation would fail loudly and provide a typed path for recovery.

## Broader Principle

LLM output is non-deterministic in structure, not just content. Parsing LLM JSON output without type validation assumes a consistency that the model does not guarantee. Always validate structure before accessing fields.

## Technical References

- `backend/app/services/semantic_router.py` (lines 68-72, approximate)
- `backend/REGRESSION_REPORT.md` (Issue A)

## Source Confidence

HIGH — Specific error message with timestamp, explicit fix description, and verified scenario reproduction all documented in the regression report.

---

## Content Value

Technical Depth: 3
Engineering Insight: 4
Originality: 3
Evidence Quality: 5
Story Value: 4

Overall: **Medium-High**

This is a specific, reproducible LLM parsing bug with a clear root cause and fix. The lesson (LLM JSON output type is non-deterministic) is broadly applicable to anyone building LLM-based applications. The evidence quality is high — the exact error, timestamp, scenario, and fix are all documented.

---

## Publication Notes

No sensitive material. The error log is from a development environment. No credentials or private data.
