---
title: The Initiative Note That Was Computed Every Turn and Dropped Before Rendering
slug: initiative-note-dead-cognition-ashi
content_type: DEBUGGING_DISCOVERY
project: Ashi
status: Fixed
date: '2026-08-11'
topics:
- cognitive-systems
- debugging
- software-integration
- dead-code
- ai-assistants
evidence_level: high
publishable: true
description: "`initiative_note` \u2014 the instruction that would make Ashi initiate\
  \ a topic or check-in \u2014 was computed on every eligible turn by `presence/initiative.py`\
  \ and then silently dropped one statement before it could reach the prompt, for\
  \ the system's entire lifetime."
---

# The Initiative Note That Was Computed Every Turn and Dropped Before Rendering

## Content Type

DEBUGGING DISCOVERY

## Project

Ashi — Personal Cognitive Operating System

## Date

2026-08-11

## Status

Fixed (Phase T)

## One-Line Summary

`initiative_note` — the instruction that would make Ashi initiate a topic or check-in — was computed on every eligible turn by `presence/initiative.py` and then silently dropped one statement before it could reach the prompt, for the system's entire lifetime.

## Context

Ashi's `ashi-presence` package has an `initiative.py` module that computes whether Ashi should initiate a topic this turn — a check-in, a follow-up, a proactive reference to something it knows. The module was implemented, tested, and part of the certified architecture. The behavioral audit found Ashi had never initiated a contact in its lifetime.

## The Question

Why had Ashi never initiated a contact despite having a working initiative computation module?

## Initial Approach

Code trace from `presence/initiative.py` forward to wherever `initiative_note` would appear in the prompt.

## What Happened

The trace took approximately two minutes. The result:

`presence/initiative.py` computes `initiative_note: str | None` and returns it.

`apps/ashi/src/ashi/app/contributors/presence.py` receives the result. At line 174:

```python
result = initiative_service.compute(...)
# ... other fields are used ...
# initiative_note is never read from result
```

The field was computed. The field was available. It was never read from the result object.

The directive was one `if` statement away from influencing the prompt. The `presence` contributor already assembled a `PresenceDirective` that was rendered into the prompt. The initiative note needed to be included in that directive. It was not.

**The behavioral audit's formulation:** "The gap is one if statement wide."

This was not an edge case. Every eligible turn (when the conditions for initiative were met), `initiative_service.compute()` ran, computed a note, returned it, and it was dropped. For the system's entire pre-Phase-T lifetime.

**Other affected capability in the same path:**

The teaching flow — Ashi detecting an opportunity to teach the user something relevant — used the same mechanism and was similarly dead for the same reason.

## Evidence

- `apps/ashi/src/ashi/app/contributors/presence.py:174-182` — the drop site
- `packages/ashi-presence/src/ashi/presence/initiative.py` — the compute site
- `reports/behavioral-audit/BEHAVIORAL_INTEGRITY_AUDIT.md` — "initiative: DEAD" in the dead-cognition table
- Phase T ADR `docs/decisions/0132-phase-t-action-integrity-and-commitment-durability.md` — T7/T8

## Diagnosis

**Established:**

A simple omission: the result of `initiative_service.compute()` was received but the `initiative_note` field was never read from it. The directive assembly code used other fields from the result; initiative note was silently skipped.

This class of bug — "field is returned, field is never consumed" — is invisible to unit tests of the compute function (which verify the return value is correct) and invisible to integration tests of the contributor (which verify the directive is formed correctly from the fields that *are* used). Only a behavioral integration test — "does Ashi actually initiate a topic?" — would have caught it.

**Observation:**

This is part of a broader finding from the behavioral audit. Twelve cognitive chains were examined. Only 3 terminated in behavior. The gap was typically not in the component — the component worked — but in the connection between components. "The chain terminates before the behavioral output" rather than "the computation is wrong."

`initiative_note`, `learning_result.list_results()`, and the `knowledge_graph.relationships` field were three separate instances of the same pattern: computed, correct, never consumed.

## What Changed

Phase T, items T7/T8:
- `presence.py` now reads `initiative_note` from the result
- It is included in the `PresenceDirective` assembly
- The directive renderer includes it in the final prompt
- Unit test: verified that a compute result with a non-None `initiative_note` produces a directive that contains it, and that an empty note produces no directive

After the fix: the behavioral audit's live re-run showed Ashi initiating a topic unprompted in its first session. The first proactive contact in the system's operational lifetime occurred approximately 30 minutes after the fix was deployed.

## What I Learned

The gap between "the subsystem computes the right answer" and "the right answer reaches the output" is a distinct failure mode from "the subsystem is wrong." Unit tests of the subsystem cannot detect this gap — they verify the output of the subsystem, not whether the output is consumed.

The pattern has a name in the behavioral audit: "dead cognition." Cognition that runs, produces correct results, and has no effect on the system's behavior because its output is never consumed. This is distinct from "broken cognition" (computation is wrong) and "missing cognition" (no computation exists).

## What I Would Do Differently

An integration test for each cognitive chain from "input arrives" to "something in the prompt or action was affected" would have caught this class of bug at the chain level rather than requiring a behavioral audit. The test doesn't have to exercise the full LLM path — it only needs to verify that a computed result reaches the directive assembly.

Specifically: for any subsystem that contributes a note, directive, or instruction to a prompt, a test should verify that a non-None result from the subsystem actually changes the assembled prompt. This tests the connection, not the component.

## Broader Principle

In a system with a pipeline architecture — compute → assemble → render → act — testing each stage in isolation does not verify that stages are connected. A bug that drops the output of one stage before it reaches the next is invisible to stage-level unit tests. You need at least one test per pipeline that walks end-to-end from meaningful input to observable output.

"The subsystem works" and "the subsystem contributes to behavior" are different properties. Measure both.

## Technical References

- `apps/ashi/src/ashi/app/contributors/presence.py:174-182`
- `packages/ashi-presence/src/ashi/presence/initiative.py`
- `reports/behavioral-audit/BEHAVIORAL_INTEGRITY_AUDIT.md`
- `docs/decisions/0132-phase-t-action-integrity-and-commitment-durability.md` T7/T8

## Source Confidence

HIGH — the drop site was identified directly in source code at a specific line. The fix was applied and verified with a live behavioral test (first proactive contact in system lifetime).

---

## Content Value

Technical Depth: 3
Engineering Insight: 5
Originality: 4
Evidence Quality: 5
Story Value: 5

**Overall: High**

"The gap is one if statement wide" is a quotable observation. The story — complex cognition computing the right answer for the system's entire lifetime with zero behavioral effect — is both specific and universal. The resolution (first proactive contact 30 minutes after deploy) gives it a satisfying arc.

---

## Publication Notes

No credentials or private data. Code traces reference internal Ashi package paths with no privacy implications. Safe to publish.
