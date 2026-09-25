---
title: 'The Cognitive Scheduler: Decoupling Time from Execution'
slug: cognitive-scheduler-decoupling
content_type: ARCHITECTURE_DECISION
project: VANI
status: "Implemented \u2014 Phase 0"
date: '2026'
topics:
- scheduling
- autonomous-agents
- software-architecture
- cognitive-systems
- decoupling
evidence_level: high
publishable: true
description: VANI's Cognitive Scheduler strictly separates the determination of *when*
  a task should run from *what* the task does, acting purely as a gatekeeper of time
  and priority rather than an executor of logic.
---

# The Cognitive Scheduler: Decoupling Time from Execution

## Content Type

ARCHITECTURE DECISION

## Project

VANI (Cognitive Operating System)

## Date

2026

## Status

Implemented — Phase 0 (Scheduler Subsystem)

## One-Line Summary

VANI's Cognitive Scheduler strictly separates the determination of *when* a task should run from *what* the task does, acting purely as a gatekeeper of time and priority rather than an executor of logic.

## Context

For an AI system to be truly autonomous, it must be able to schedule its own future work—consolidating memories at night, following up on a task in two hours, or running periodic self-evaluations.

This requires a scheduler. However, tightly coupling the scheduling logic with the cognitive tasks creates a tangled architecture. VANI solves this with a dedicated Scheduler subsystem designed with strict boundary constraints.

## The Decision

From `docs/architecture/SCHEDULER.md`:
> "The Scheduler decides **when work is eligible to run**. It never performs the work itself."

The Scheduler's responsibilities are rigidly constrained:
- Task scheduling (delayed and periodic)
- Priority management
- Queue management
- Execution ordering

What it explicitly does **not** do:
- Task execution
- Business logic
- AI inference
- Event routing

## The Lifecycle of Scheduled Work

A task passes through the Scheduler in a decoupled lifecycle:
1. **Created** (by any cognitive service)
2. **Registered** (into the Scheduler's queues)
3. **Waiting** (held until conditions/time are met)
4. **Ready** (marked as eligible)
5. **Dispatched** (handed off to the execution layer)
6. **Completed**

The Scheduler merely transitions tasks from Waiting to Ready when the clock or event conditions dictate. It then relies on the Event Bus or Runtime to actually hand the task back to the relevant domain owner for execution.

## Evidence

- `docs/architecture/SCHEDULER.md` — Scheduler subsystem specification
- `docs/phases/phase0/IMPLEMENTATION_REPORT.md` — Scheduler implemented in Phase 0

## Diagnosis

**Established:**
The Scheduler exists as a fully implemented Phase 0 infrastructure component, following the exact same Foundation → Context → State Machine → Engine → Executor → Orchestrator layering as the rest of the OS.

**Observation:**
This design allows cognitive services (like Memory or Planning) to enqueue future thoughts or actions without keeping a thread alive or writing custom sleep loops. It provides the foundation for proactive AI behavior.

## What I Learned

To build proactive AI, you cannot rely on user-prompted execution or basic cron jobs. You need an internal system scheduler that understands priority, queues, and delays, but remains entirely ignorant of what the AI is actually thinking or doing. Separation of concerns applies to time just as much as it applies to data.

## Broader Principle

Orchestration is not execution. A robust system scheduler should be a dumb calendar with a smart queue. It knows exactly *when* an item is due and *how important* it is, but it has zero understanding of the item's contents.

## Technical References

- `docs/architecture/SCHEDULER.md` — Architecture doc

## Source Confidence

HIGH

Explicitly defined in the architecture documentation and marked as completed in Phase 0.

---

## Content Value

Technical Depth: 4/5
Engineering Insight: 4/5
Originality: 3/5
Evidence Quality: 4/5
Story Value: 3/5

Overall: **Medium-High**

An excellent example of applying traditional OS concepts (process scheduling) to cognitive AI workloads to enable true autonomy.
