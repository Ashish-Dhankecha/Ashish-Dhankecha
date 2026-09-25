---
title: 'Runtime Architecture Enforcement: Building an Architecture Guardian'
slug: architecture-guardian-drift-detection
content_type: ARCHITECTURE_DECISION
project: LEO
status: Partial
date: 'null'
topics:
- architecture-governance
- drift-detection
- cognitive-os
- design-enforcement
evidence_level: high
publishable: true
description: "LEO built a runtime Architecture Guardian that subscribes to system\
  \ events and validates architectural constraints in real time \u2014 but the guardian\
  \ could only detect violations it was notified about, not the 281 pre-existing static\
  \ violations in the codebase."
---

# Runtime Architecture Enforcement: Building an Architecture Guardian

## Content Type

ARCHITECTURE_DECISION

## Project

LEO — AI Operating Companion

## Date

UNKNOWN (Phase 26.17 label in source code)

## Status

Partial — Guardian implemented; 281 violations existed at the time of the Phase 28 audit

## One-Line Summary

LEO built a runtime Architecture Guardian that subscribes to system events and validates architectural constraints in real time — but the guardian could only detect violations it was notified about, not the 281 pre-existing static violations in the codebase.

## Context

Architectural drift is the gradual erosion of architectural constraints as code evolves. Standard approaches rely on code review and static analysis. LEO's approach was to build a dedicated `CognitiveArchitectureGuardian` component that operates as a first-class OS subsystem.

The Architecture Guardian document (`docs/10_ARCHITECTURE_GUARDIAN.md`) states this is "the most important document in the LEO Architecture Constitution" and mandates that before any code is written, seven questions must be answered — including whether the feature duplicates existing infrastructure, violates dependency rules, or increases architectural complexity.

## The Question

Can architectural constraints be enforced at runtime through an event-subscribing guardian component, rather than relying solely on code review or static analysis?

## Initial Approach

The `CognitiveArchitectureGuardian` (`backend/app/cognition/kernel/guardian/core.py`) was implemented as an `EventSubscriber`. It subscribed to 9 event types:
- `SERVICE_REGISTERED`
- `SERVICE_UNREGISTERED`
- `DEPENDENCY_CHANGED`
- `CAPABILITY_REGISTERED`
- `ARCHITECTURE_CHANGED`
- `KERNEL_BOOT`
- `KERNEL_SHUTDOWN`
- `SYSTEM_INITIALIZED`

On each event, it dispatched validation to 6 specialized validators:
1. `DependencyValidator` — checks cross-layer dependencies
2. `BoundaryValidator` — checks layer boundary violations
3. `OwnershipValidator` — checks component ownership rules
4. `ContractValidator` — checks interface contract compliance
5. `DriftDetector` — detects evolutionary architectural drift
6. `LegacyDetector` — detects use of deprecated/legacy patterns

Violations triggered an `ARCHITECTURE_VIOLATION` event. Clean validation triggered `ARCHITECTURE_VALIDATED`.

## What Happened

The guardian was implemented and its boot was confirmed in `backend/startup.log` (component appears in the boot sequence). The event-subscription architecture was complete.

However, the guardian is a reactive component — it can only validate what it is notified about through events. The 281 violations documented in `phase_28_x_2_violation_report.md` were static code-level violations (direct SQLAlchemy session usage) that would not trigger runtime events that the guardian subscribed to. The guardian would not observe direct database calls made by application code — those calls do not emit `DEPENDENCY_CHANGED` or `ARCHITECTURE_CHANGED` events.

The ponytail audit (`ponytail_audit_report.txt`) separately identified 36+ instances of interface over-engineering (YAGNI violations): single-implementation interfaces where a concrete class would suffice. The guardian did not cover this category.

## Evidence

- `backend/app/cognition/kernel/guardian/core.py` — `CognitiveArchitectureGuardian` implementation
- `backend/app/cognition/kernel/guardian/dependency.py`, `boundary.py`, `ownership.py`, `contracts.py`, `drift.py`, `legacy_detector.py` — 6 validators
- `docs/10_ARCHITECTURE_GUARDIAN.md` — guardian philosophy and pre-code checklist
- `backend/startup.log` — guardian appears in boot sequence
- `phase_28_x_2_violation_report.md` — 281 violations the guardian did not catch
- `ponytail_audit_report.txt` — YAGNI violations (-754 lines possible)

## Diagnosis

**Established:**
The guardian subscribes to OS events and dispatches to 6 validators. It cannot observe direct database calls made by application code because those calls do not publish events to the platform event bus.

**Likely:**
The guardian was designed to prevent future violations (new code that violates constraints) but could not address existing violations (legacy code predating the guardian). The event-based approach assumes all relevant operations are mediated through the event bus — which was the intended architecture but not yet the reality of the codebase.

**Unknown:**
Whether any static analysis complement to the runtime guardian was planned or implemented.

## What Changed

No documented corrective change was found. The violation report (`phase_28_x_2_violation_report.md`) was the documented output of a separate manual audit process, not the guardian.

## What I Learned

A runtime event-based architecture guardian is powerful for preventing future violations but cannot retroactively detect violations already embedded in the codebase. The guardian's effectiveness depends entirely on the event mediation assumption being true. If components bypass the event bus (as happened with direct database access), the guardian is blind to those violations.

## What I Would Do Differently

**Hindsight observation:** The guardian should be complemented by a static analysis tool (e.g., import graph analysis, AST scanning) that runs at CI time and checks for dependency rule violations regardless of whether the code is event-mediated. The Phase 28 audit was a manual process that produced the violation report — automating that as a pre-commit or CI check would close the gap the runtime guardian cannot cover.

## Broader Principle

Runtime constraint enforcement requires that all relevant operations are mediated through the runtime. Where direct access patterns exist outside the mediation layer, runtime enforcement is blind. Static analysis must complement runtime enforcement to achieve full coverage.

## Technical References

- `backend/app/cognition/kernel/guardian/core.py`
- `docs/10_ARCHITECTURE_GUARDIAN.md`
- `docs/05_ENGINEERING_RULES.md`
- `phase_28_x_2_violation_report.md`
- `ponytail_audit_report.txt`

## Source Confidence

HIGH — Guardian implementation confirmed in source. Boot log confirms startup. Violation report provides specific evidence of what the guardian missed.

---

## Content Value

Technical Depth: 4
Engineering Insight: 5
Originality: 4
Evidence Quality: 4
Story Value: 4

Overall: **High**

The event-based guardian pattern is a novel approach to architectural enforcement. The gap between what the guardian can observe and what actually violated the architecture is a precise and instructive lesson. The comparison between the guardian's scope and the static violation report is cleanly evidenced.

---

## Publication Notes

No sensitive material detected.
