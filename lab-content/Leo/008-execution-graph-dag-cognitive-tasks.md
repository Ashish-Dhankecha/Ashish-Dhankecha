---
title: 'Replacing Sequential Execution with a DAG: The Cognitive Execution Graph'
slug: execution-graph-dag-cognitive-tasks
content_type: ARCHITECTURE_DECISION
project: LEO
status: Partial
date: 'null'
topics:
- execution-graph
- dag-architecture
- parallel-execution
- cognitive-os
evidence_level: medium
publishable: true
description: LEO replaced sequential cognitive task execution with a Directed Acyclic
  Graph (DAG) model to support speculative branching, parallel execution of independent
  capabilities, and warp engine hyper-scaling.
---

# Replacing Sequential Execution with a DAG: The Cognitive Execution Graph

## Content Type

ARCHITECTURE_DECISION

## Project

LEO — AI Operating Companion

## Date

UNKNOWN (ADR-001 in docs/09_DECISION_RECORDS.md)

## Status

Partial — architecture documented and scheduler implemented; full execution graph integration status unknown

## One-Line Summary

LEO replaced sequential cognitive task execution with a Directed Acyclic Graph (DAG) model to support speculative branching, parallel execution of independent capabilities, and warp engine hyper-scaling.

## Context

In conventional AI assistant pipelines, execution is sequential: receive input, classify intent, call LLM, return response. This creates a fixed latency floor determined by the longest sequential chain.

LEO's first formal Architecture Decision Record (ADR-001, `docs/09_DECISION_RECORDS.md`) states:

> **ADR-001: Execution Graph replaced sequential execution to support speculative branching and warp engine parallelization.**

## The Question

Can AI cognitive execution be modeled as a DAG of capabilities, enabling parallelism, speculative execution, and cancellation — analogous to how a modern processor's out-of-order execution engine works?

## Initial Approach

The Execution Graph was designed as a Directed Acyclic Graph where:
- **Nodes** are capabilities (`reason`, `generate`, `validate`, `plan`)
- **Edges** are data dependencies between capabilities
- **Parallel Scheduler** identifies independent nodes and schedules them for concurrent execution
- **Warp Engine** aggressively spins up concurrent execution paths (e.g., 5 reasoning paths simultaneously) to minimize latency
- **Execution Cache** caches deterministic node outputs — identical nodes with same inputs skip re-execution
- **Speculative Execution** executes probabilistic branches before the exact path is confirmed; if the branch is taken, latency is zero; if not, result is discarded

The `CognitiveScheduler` (`backend/app/cognition/kernel/scheduler/core.py`) implements this paradigm:
- Driven exclusively by `TICK_FAST`, `TICK_INTERACTIVE`, `TICK_BACKGROUND` events from the Clock
- No internal polling or timers
- `OutOfOrderEngine` resolves dependencies (identifying which tasks are "ready" based on completed dependencies)
- `WarpCoordinator` groups independent tasks into warp batches
- `BranchPredictor` issues advisory pre-submissions for predicted next tasks
- `HazardDetector` prevents unsafe concurrent dispatches
- `DeadlineManager` and `FairnessManager` apply scheduling policies

Cancellation: the `InterruptController` can propagate cancellation signals down the graph to halt provider execution and reclaim resources.

## What Happened

The scheduler was fully implemented and functional. The `CognitiveScheduler.schedule_cycle()` method runs the complete pipeline: dependency resolution → priority computation → deadline and fairness adjustments → warp formation → hazard detection → dispatch.

Dispatch publishes a `RESOURCE_REQUESTED` event to the bus rather than directly executing — maintaining the zero-bypass principle.

The test suite included `app/cognition/scheduler/tests/test_scheduler.py` with 6 tests, all passing (indicated by `......` in the test results).

However, the full integration of the Execution Graph with actual cognitive capabilities (e.g., LLM execution nodes) was not directly evidenced. The scheduler dispatches tasks as events; whether a complete end-to-end pipeline from user input → graph build → scheduler → provider execution → response was fully wired is not confirmed by available evidence.

## Evidence

- `docs/09_DECISION_RECORDS.md` — ADR-001 documenting the decision
- `docs/13_EXECUTION_ARCHITECTURE.md` — Execution Graph, Warp Engine, Speculative Execution, Cancellation described
- `backend/app/cognition/kernel/scheduler/core.py` — `CognitiveScheduler` implementation with `OutOfOrderEngine`, `WarpCoordinator`, `BranchPredictor`, `HazardDetector`
- `backend/app/cognition/kernel/scheduler/engines.py` — 4 execution engines
- `backend/app/cognition/kernel/scheduler/policies.py` — `PriorityManager`, `DeadlineManager`, `FairnessManager`
- `backend/test_results.txt` line 34 — `test_scheduler.py ......` (6/6 passing)
- `backend/app/cognition/kernel/scheduler/models.py` — `CognitiveTask`, `CognitiveWarpTask`, `TaskState`

## Diagnosis

**Established:**
The scheduler implementation is complete and all 6 scheduler tests pass. The warp grouping, out-of-order execution, hazard detection, and branch prediction components exist as code.

**Likely:**
The full Execution Graph (building the DAG from a user request, populating capability nodes, resolving them through the scheduler) was not yet complete. The scheduler is the execution policy engine — it requires a graph builder and an execution runtime to be fully functional end-to-end.

**Unknown:**
How speculative execution and execution caching were implemented in practice, and whether they were validated beyond unit tests.

## What Changed

No documented change — this was the implemented architecture from Phase 26.

## What I Learned

The scheduler can be designed and tested independently of the full execution graph. Separating the scheduling policy (which tasks to run in what order) from the graph construction (which tasks to create) and execution runtime (how to actually execute a task) allows each to be built and verified independently.

## What I Would Do Differently

**Hindsight observation:** Building the scheduler before the execution runtime and graph builder creates a validated policy engine but defers the integration complexity. The hardest part of a DAG-based execution system is not the scheduler but the graph construction — determining dynamically what nodes to create from a user request.

## Broader Principle

Modeling AI execution as a DAG enables parallelism, caching, and speculative execution, but requires careful integration between graph construction, scheduling policy, and execution runtime. Each is independently testable but only valuable when integrated.

## Technical References

- `backend/app/cognition/kernel/scheduler/core.py`
- `backend/app/cognition/kernel/scheduler/engines.py`
- `backend/app/cognition/kernel/scheduler/policies.py`
- `docs/13_EXECUTION_ARCHITECTURE.md`
- `docs/09_DECISION_RECORDS.md` (ADR-001)

## Source Confidence

MEDIUM — Scheduler implementation confirmed. Full end-to-end execution graph integration not confirmed by available evidence.

---

## Content Value

Technical Depth: 4
Engineering Insight: 4
Originality: 4
Evidence Quality: 3
Story Value: 3

Overall: **Medium-High**

Applying out-of-order execution concepts (hazard detection, warp batching, branch prediction) to AI cognitive scheduling is technically interesting. The scheduler implementation is concrete. The gap between the scheduler implementation and full graph execution is an honest engineering story.

---

## Publication Notes

No sensitive material detected.
