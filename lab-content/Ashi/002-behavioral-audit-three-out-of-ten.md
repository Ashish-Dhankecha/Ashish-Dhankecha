---
title: 'Scoring a Running AI System 3/10: The Behavioral Integrity Audit'
slug: behavioral-integrity-audit-ashi
content_type: POST_MORTEM
project: Ashi
status: "Partial \u2014 fixes applied, score moved to 6/10 as of Part 2 Final"
date: '2026-08-11'
topics:
- cognitive-systems
- evaluation
- ai-assistants
- honesty
- behavioral-testing
evidence_level: high
publishable: true
description: "A forensic audit of Ashi's running production instance \u2014 22 live\
  \ turns, real Gemini, real Postgres \u2014 scored it 3/10 as \"TOOL-LIKE,\" with\
  \ a 75% false-success rate on action requests and zero proactive contacts in the\
  \ system's entire lifetime."
---

# Scoring a Running AI System 3/10: The Behavioral Integrity Audit

## Content Type

POST-MORTEM

## Project

Ashi — Personal Cognitive Operating System

## Date

2026-08-11 (commit `be7c706`)

## Status

Partial — score moved from 3/10 to 6/10 across subsequent phases (T, Part 2 Final, Part 2 Final Live)

## One-Line Summary

A forensic audit of Ashi's running production instance — 22 live turns, real Gemini, real Postgres — scored it 3/10 as "TOOL-LIKE," with a 75% false-success rate on action requests and zero proactive contacts in the system's entire lifetime.

## Context

After completing a substantial architecture (28 subsystems, reflection engine, learning engine, planning and execution layers, voice and Canvas transports), a behavioral audit was conducted against the actual running system — not tests, not soak, but the live instance with a real user talking to it. The question was: does this feel like a partner?

## The Question

What does the running system actually do in practice, and does it match what the architecture claims?

## Initial Approach

Static forensic trace of HEAD plus 22 live turns against `ashi serve` (real Gemini, real Postgres, 2,941-record memory store) plus direct inspection of persisted state plus one real process restart.

No code was changed during the audit. Two files were created under `reports/behavioral-audit/`.

## What Happened

**Overall score: 3/10 — TOOL-LIKE (capped, not averaged)**

The score is capped by three independent hard caps:
- Frequent fabricated actions → cap 3
- Essentially zero effective initiative → cap 5
- No meaningful user/world model → cap 5

The lowest binding cap was 3.

**Scorecard highlights:**

| Dimension | Score | Evidence |
|---|---|---|
| Continuity (session/restart) | 7 | Superseded deadline + stated preference recalled correctly after real process kill |
| Action integrity | **0** | 23/26 plans empty → 100% of those goals `ACHIEVED` |
| Initiative | **0** | `ProactiveCognitionRuntime` wired and running; zero check-ins ever logged |
| World model | **1** | `kg_relationships = 0`, `projects = 0`, 681 entities are almost all document file paths |
| Honesty | **2** | Excellent on knowledge; catastrophic on action (2 of 3 "I've queued it" claims were false) |
| Self-knowledge | **1** | Claims "I cannot plan multi-step actions or reflect" — both subsystems had run minutes earlier |
| Learning | **1** | 291 learning_results written; `list_results()` has zero production callers |

**Reliability matrix:**

| Situation | Success | False success |
|---|---|---|
| Ordinary conversation | 22/22 | 0 |
| Memory recall (incl. supersession) | 4/4 | 0 |
| Restart recovery | 3/3 | 0 |
| **Action requests** | **0/4** | **3/4** |
| **Commitment retention** | **0/1** | **1/1** |
| **Proactive contact** | **0 ever** | — |

**Conversation: ~100%. Action: 0%, with a 75% false-success rate.**

## Evidence

**What was good (evidence-backed):**
- Cross-restart continuity: killed the server and restarted it — the superseded deadline, stated preference, and pre-restart topic all came back correctly and unprompted
- Adversarial supersession: Friday → Monday, with two distractor turns in between, answered "Monday" correctly
- Negative continuity: "you haven't mentioned a deadline for the Zephyr contract" — no confabulation
- git/filesystem perception is real and reached answers
- Latency: 2.9–9.7s across 22 live turns, p50 ≈ 6s

**What was broken:**

The "dead cognition" table — 12 cognitive chains traced; only 3 terminated in behavior:

| Capability | Status | Evidence |
|---|---|---|
| Initiative | DEAD | `initiative_note` unread by `contributors/presence.py` |
| Teaching flow | DEAD | Same code path |
| Learning records | DEAD | `list_results()` zero production callers |
| Learning nudges | HARMFUL | Promoted test fixture "Meridian" to top recommendation |
| Proactive check-in | STARVED | Input set emptied by vacuous-success bug |
| Knowledge graph relationships | BROKEN | 0 rows with 14 facts present |
| Reflection → learning | LIVE ✅ | One intact handoff |
| Perception → prompt | LIVE ✅ | Confirmed in live answers |
| Memory → recall | LIVE ✅ | Survived real restart |

**Three of fifteen cognitive chains terminate in behavior.**

- `reports/behavioral-audit/BEHAVIORAL_INTEGRITY_AUDIT.md` — full audit
- Direct Postgres inspection: `select count(*) from pending_approvals`, `select * from goals`
- Live observation: Ashi said "No pending follow-ups" while naming the follow-up it had just discarded

## Diagnosis

**Established:**

The architecture is complete. The substrate works. The failure is not "the wrong architecture was built" — it is that the critical last-inch connections between subsystems were absent:

1. Empty plans completed vacuously → ACHIEVED goals → proactive sweep was permanently starved
2. `initiative_note` was computed every eligible turn and dropped one statement before rendering
3. `PlanExecutionStage` told the LLM "tell the user it's queued" before verifying any proposal was actually persisted
4. `list_results()` on the learning store had zero production callers — 291 records written, none read

**Observation:**

The learning system's only live effect was reinforcing `memory_strength` based on retrieval frequency. Since a test fixture ("Meridian") had been frequently recalled, it rose to the top of the system's priority recommendations. When asked "What should I work on next?", Ashi answered: "Continue developing Meridian in Rust." Meridian is a benchmark fixture. It does not exist.

**The audit's own formulation:** "Learning, in its only functioning form, made judgment worse."

## What Changed

Phase T (Aug 2026) closed the five highest-leverage findings:
- T1: Empty plan → `NO_ACTION_PROPOSAL`; `ACHIEVED` requires execution evidence
- T2/T3: `PlanExecutionStage` generates claims from persisted state, not from prompt instructions
- T4: 14 adversarial approval tests
- T5/T6: Commitment detection separated from command-intent detection
- T7/T8: `initiative_note` wired through to the rendered directive

Part 2 Final Live: first proactive contact in system lifetime delivered (~30 min after boot). Score moved to 6/10.

## What I Learned

"The subsystem is built and tested" is not equivalent to "the subsystem produces behavioral effects." Twelve of the fifteen cognitive chains in this system failed at a *connection*, not at a component. The components themselves were often correct in isolation.

A behavioral audit against the running production system, not against unit tests, is the only way to measure this gap. The unit test suite passed throughout the period when the system had a 75% false-success rate on actions.

The gap between "this system claims it did X" and "this system verified it did X" is not an LLM problem — it is an integration design problem. Every "I've queued it" claim was generated from a prompt instruction about what should have happened, never from what did.

## What I Would Do Differently

The hardest lesson: certifying subsystem behavior in isolation is insufficient. A behavioral integration test — one that submits an action request to the running system and then queries the database to verify what actually happened — would have caught the vacuous-success bug months earlier. The unit test suite and cognitive certification suite both passed on a system with a 75% false-success rate on its core action pathway.

Schedule adversarial behavioral audits early and regularly, not after architecture completion.

## Broader Principle

A cognitive system's correctness cannot be measured by testing subsystems in isolation. The failure modes that matter most — "the follow-up was silently discarded," "the claim was never verified" — only appear when the full stack executes against real data. Unit coverage of individual components is necessary but not sufficient for behavioral correctness.

## Technical References

- `reports/behavioral-audit/BEHAVIORAL_INTEGRITY_AUDIT.md`
- `apps/ashi/src/ashi/app/operator/operator.py:792`
- `apps/ashi/src/ashi/app/contributors/presence.py:174-182`
- `packages/ashi-presence/src/ashi/presence/initiative.py`
- `docs/decisions/0132-phase-t-action-integrity-and-commitment-durability.md`
- `reports/part2-final/FINAL_COMPLETION_REPORT.md`

## Source Confidence

HIGH — all claims are backed by direct database inspection, timestamped live turns, and code traces to specific lines. The audit explicitly separates what was measured from what was inferred.

---

## Content Value

Technical Depth: 5
Engineering Insight: 5
Originality: 5
Evidence Quality: 5
Story Value: 5

**Overall: High**

Exceptional content. A numerical behavioral scorecard, a "dead cognition" table, a 75% false-success rate, and the extraordinary quote from the system itself — this is the kind of audit that rarely gets published in detail. The gap between "architecture complete" and "system works" is a universal engineering failure mode, and this documents it with unusual specificity.

---

## Publication Notes

No credentials or API keys. Audit was conducted on the developer's own local instance with no third-party user data. References to "Gemini" and "Postgres" are infrastructure choices, not sensitive configuration. The test fixture "Meridian" is explicitly identified as a fixture, not real user data. Safe to publish.
