---
title: "The Subsystem Pattern: Foundation \u2192 Context \u2192 State Machine \u2192\
  \ Engine \u2192 Executor \u2192 Orchestrator"
slug: subsystem-layering-pattern
content_type: ARCHITECTURE_DECISION
project: VANI
status: "Established \u2014 used across all Phase 0 subsystems"
date: '2026'
topics:
- software-architecture
- design-patterns
- separation-of-concerns
- component-design
evidence_level: high
publishable: true
description: Every VANI subsystem is internally decomposed into six layers (Foundation,
  Context, State Machine, Engine, Executor, Orchestrator), providing consistent ownership
  boundaries and eliminating the most common architectural coupling problems.
---

# The Subsystem Pattern: Foundation → Context → State Machine → Engine → Executor → Orchestrator

## Content Type

ARCHITECTURE DECISION

## Project

VANI (Cognitive Operating System)

## Date

2026 (Phase 0)

## Status

Established — applied across all Phase 0 subsystems; becoming the standard for all future subsystems

## One-Line Summary

Every VANI subsystem is internally decomposed into six layers (Foundation, Context, State Machine, Engine, Executor, Orchestrator), providing consistent ownership boundaries and eliminating the most common architectural coupling problems.

## Context

Phase 0 implemented 13 major subsystems (Event System, Clock, Scheduler, Resource Manager, Health Monitor, Service Registry, Dependency Resolution, Kernel, Architecture Guardian, Runtime, Bootstrap, Certification Framework, Application Layer). Each one uses the same internal structure.

The Pattern is described in `docs/phases/phase0/OVERVIEW.md`: "Every subsystem follows a consistent internal structure composed of Foundation, Context, State Management (where applicable), Engine, Executor, and Orchestrator layers."

This is not a framework — it is a decomposition convention applied manually to every subsystem.

## The Question

How should a complex subsystem be internally organized to prevent the most common architectural problems (business logic in wrong layers, state management scattered across classes, orchestration mixed with execution)?

## Initial Approach

The pattern was established early and applied consistently. The `IMPLEMENTATION_REPORT.md` documents each subsystem with exactly this structure. For example, the Runtime subsystem:

> "Runtime Foundation, Runtime Context, Runtime State Machine, Runtime Loop, Runtime Engine, Runtime Executor, Runtime Orchestrator"

And the Kernel:

> "Kernel Foundation, Kernel Context, Service Registry, Lifecycle Manager, Boot Manager, Kernel Engine, Kernel Executor, Kernel Orchestrator"

## What Happened

Each layer has a clearly bounded responsibility:

**Foundation** — Base exception classes, shared types, domain constants, interfaces. No behavior; only definitions.

**Context** — Passive data storage for a subsystem's operational state. Contains no business logic. The LESSONS_LEARNED document explicitly states: "Context objects should never contain business logic. By restricting Contexts to passive storage, lifecycle decisions remain entirely inside State Machines while execution remains inside Engines."

**State Machine** — Owns all lifecycle transitions. The single authority for state changes within a subsystem. "Lifecycle transitions should never be distributed across multiple classes. Assigning all lifecycle authority to dedicated State Machines created predictable behavior."

**Engine** — Coordinates. Does not execute directly. "The Engine layer proved most effective when acting purely as a coordinator. Execution responsibility remained delegated to lower-level components, allowing Engines to focus exclusively on sequencing operations."

**Executor** — Performs the actual work units. Receives instructions from the Engine. Has no awareness of sequencing or orchestration.

**Orchestrator** — Public API layer. Translates external requests into coordinated Engine operations. The only entry point for external callers.

## Evidence

- `docs/phases/phase0/IMPLEMENTATION_REPORT.md` — Each subsystem listed with all six layers
- `docs/phases/phase0/OVERVIEW.md` — "Every subsystem follows a consistent internal structure composed of Foundation, Context, State Management (where applicable), Engine, Executor, and Orchestrator layers"
- `docs/phases/phase0/LESSONS_LEARNED.md` — Four lessons directly documenting what was discovered about Context passivity, State Machine ownership, and Engine coordination
- `docs/phases/phase0/IMPLEMENTATION_REPORT.md` — "Architectural Refinements" section listing the refined patterns
- `src/runtime/` — Runtime directory structure visible in source

## Diagnosis

**Established:**
The six-layer pattern was applied consistently across all 13 Phase 0 subsystems. This is documented in the implementation report with each subsystem explicitly listed.

**Established:**
The LESSONS_LEARNED document reflects genuine refinement during implementation — not just stating the pattern but documenting what was discovered about it. The Context passivity lesson ("Contexts should never contain business logic") reads as a correction rather than an original design.

**Likely:**
The pattern was refined during implementation. The CHANGELOG mentions: "Runtime Context converted into passive storage. State Machine became lifecycle authority. Runtime Loop became execution-only. Engine assumed coordination ownership." This suggests the Runtime subsystem underwent internal refactoring before the pattern stabilized.

**Unknown:**
Whether the pattern was fully defined upfront or emerged iteratively through the first few subsystems.

## What Changed

The Runtime underwent documented refactoring during Phase 0:
- Runtime Context simplified into passive storage (was previously more active)
- Runtime State Machine became the sole lifecycle authority (responsibility was previously distributed)
- Runtime Loop became lifecycle-independent

This refactoring demonstrates the pattern was refined through practice, not just declared.

## What I Learned

From `docs/phases/phase0/LESSONS_LEARNED.md`:

- **Passive storage improves separation of concerns** — Context objects holding business logic creates coupling between state storage and state transitions. Removing logic from Context objects forces all decisions into explicit, single-owner locations.
- **State Machines should own lifecycle** — Having lifecycle transitions distributed across multiple classes creates subtle ordering bugs and makes state reasoning impossible. A single State Machine with explicit transition rules eliminates this.
- **Engines should coordinate, not execute** — Mixing coordination logic with execution logic creates a God Object. Separating them produces a layer that can be reasoned about independently.

## What I Would Do Differently

**Observation:** The six-layer pattern adds surface area. For simple subsystems, Foundation + State Machine + Engine + Orchestrator might be sufficient without the Context and Executor separation. The pattern may be over-decomposed for small subsystems. This cannot be evaluated until cognitive services of varying complexity are implemented in Phase 2+.

## Broader Principle

Complex subsystems benefit from enforced layer separation that answers three distinct questions: "What state exists?" (Context), "When does state change?" (State Machine), "What coordinates work?" (Engine), "What performs work?" (Executor), "What is the public API?" (Orchestrator). Answering these in separate classes prevents the most common forms of architectural coupling.

## Technical References

- `docs/phases/phase0/IMPLEMENTATION_REPORT.md` — Complete subsystem listing
- `docs/phases/phase0/LESSONS_LEARNED.md` — Sections on passive storage, state machine ownership, engine coordination
- `docs/phases/phase0/CHANGELOG.md` — Version 0.6.0 (Runtime refactoring details)
- `src/runtime/` — Runtime source directory structure

## Source Confidence

HIGH

The pattern is explicitly documented across multiple phase documents. The Runtime refactoring is specifically recorded in the CHANGELOG, confirming the pattern was refined through practice.

---

## Content Value

Technical Depth: 5/5
Engineering Insight: 4/5
Originality: 3/5
Evidence Quality: 5/5
Story Value: 3/5

Overall: **High**

The six-layer pattern with evidence of in-flight refactoring (Runtime Context simplified mid-development) is a genuinely useful engineering document. The separation of coordination (Engine) from execution (Executor) is a concrete pattern worth examining. The story of the pattern emerging through practice rather than being declared upfront adds authenticity.

---

## Publication Notes

No sensitive material. Safe to publish.
