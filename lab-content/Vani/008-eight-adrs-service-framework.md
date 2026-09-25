---
title: 'Eight ADRs in Phase 1: What Every Service Framework Decision Reveals'
slug: eight-adrs-service-framework
content_type: ARCHITECTURE_DECISION
project: VANI
status: "Accepted \u2014 Phase 1 in progress"
date: '2026'
topics:
- architectural-decision-records
- service-framework
- dependency-injection
- lifecycle-management
- engineering-governance
evidence_level: high
publishable: true
description: "Phase 1 produced eight formal Architectural Decision Records documenting\
  \ why VANI chose a unified service framework, centralized configuration, structured\
  \ logging, unified error hierarchy, kernel-controlled registration, kernel-orchestrated\
  \ lifecycle, event-driven integration, and constructor-based dependency injection\
  \ \u2014 each with explicit alternatives considered and rejected."
---

# Eight ADRs in Phase 1: What Every Service Framework Decision Reveals

## Content Type

ARCHITECTURE DECISION

## Project

VANI (Cognitive Operating System)

## Date

2026 (Phase 1)

## Status

Accepted — Phase 1 in progress

## One-Line Summary

Phase 1 produced eight formal Architectural Decision Records documenting why VANI chose a unified service framework, centralized configuration, structured logging, unified error hierarchy, kernel-controlled registration, kernel-orchestrated lifecycle, event-driven integration, and constructor-based dependency injection — each with explicit alternatives considered and rejected.

## Context

VANI's ADR process requires a formal record for every significant architectural decision. The ADR captures not just what was decided but why, what alternatives were considered, and what the tradeoffs are.

Phase 1 (Core Service Framework) alone produced eight accepted ADRs (ADR-001 through ADR-008). All are marked "Status: Accepted" though all have "Date: YYYY-MM-DD" (dates not yet filled in).

This document examines what the pattern of decisions reveals about the design philosophy.

## The Question

What does the full set of Phase 1 architectural decisions tell us about the service framework design philosophy, and what alternatives were seriously considered?

## What the ADRs Decided

**ADR-001: Unified Service Framework**
- Decided: One reusable framework for all services
- Rejected: Independent service implementations (duplicated logic, inconsistent behavior); framework per domain (fragmentation)
- Consequence: Every service inherits from `AbstractService` rather than implementing its own runtime

**ADR-002: Centralized Configuration Framework**
- Decided: All config loaded, validated, and converted to immutable models before any service initializes; injected through constructors
- Rejected: Service-owned configuration (duplicated validation); global configuration singleton (violates Foundation Law 6: No Global Mutable State)
- Key rule: Services are prohibited from reading config files or environment variables directly

**ADR-003: Structured Logging**
- Decided: Centralized structured logging framework; standardized schema
- Rejected: Console printing with `print()`; independent loggers per service
- Key rule: Services are prohibited from printing directly to console, creating custom loggers, or writing to log files

**ADR-004: Unified Error Hierarchy**
- Decided: All exceptions inherit from single base `VaniError`
- Rejected: Generic Python exceptions (Exception, RuntimeError, ValueError); independent exception trees per subsystem
- Implemented hierarchy (from `src/common/exceptions/base.py`):
  ```
  VaniError
  ├── ConfigurationError
  ├── LifecycleError
  ├── RegistrationError
  ├── DependencyError
  ├── ValidationError
  └── EventError
  ```
  Extended in `src/kernel/exceptions.py`:
  ```
  KernelError (extends VaniError)
  ├── BootError
  ├── ShutdownError
  └── StartupValidationError
  ```

**ADR-005: Kernel-Controlled Service Registration**
- Decided: Kernel is sole authority for service registry; registration only after successful init and validation
- Rejected: Self-registration (inconsistent lifecycle); static hardcoded registration (poor extensibility)
- Key rule: Services must not register themselves, modify the registry, or register other services

**ADR-006: Kernel-Orchestrated Service Lifecycle**
- Decided: Kernel coordinates all lifecycle transitions; services provide domain-specific lifecycle behavior only
- Rejected: Self-managed lifecycle (inconsistent); event-driven lifecycle without kernel authority (unpredictable ordering)
- Explicit lifecycle pipeline: Created → Initialized → Registered → Starting → Running → Paused → Resumed → Stopping → Stopped → Shutdown

**ADR-007: Event-Driven Service Integration**
- Decided: All inter-service communication through the Cognitive Interconnect (Event Bus); no direct service calls
- Rejected: Direct service calls (tight coupling, circular deps); shared global state (violates Foundation Law 6)
- Key rule: Services must not invoke another service directly, depend on another service's implementation, or create private event buses

**ADR-008: Constructor-Based Dependency Injection**
- Decided: All dependencies provided through constructors only
- Rejected: Direct instantiation (tight coupling); service locator (hidden dependencies, global mutable state); property injection (partially initialized objects)
- Key rule: Services must not instantiate infrastructure dependencies, use global singletons, or resolve dependencies dynamically

## Evidence

- `docs/adr/ADR-001-service-framework.md` through `ADR-008-dependency-injection.md` — all 8 ADR files
- `src/common/exceptions/base.py` — Actual implemented exception hierarchy (32 lines)
- `src/kernel/exceptions.py` — Kernel-specific exception extension (21 lines)
- `docs/adr/README.md` — ADR process documentation

## Diagnosis

**Established:**
Eight architectural decisions are documented with alternatives considered and rejected. Every ADR includes sections for Context, Problem, Decision, Rationale, Alternatives Considered, Consequences (positive and negative), Architectural Impact, Compatibility Impact, Implementation Notes, Certification Impact, Future Review Criteria, and Related Documents.

**Established:**
The exception hierarchy in `base.py` and `kernel/exceptions.py` is implemented code, not just documentation. The hierarchy matches ADR-004.

**Observation:**
All 8 ADRs have "Date: YYYY-MM-DD" — dates were not filled in. This is a documentation gap but does not affect the substance of the decisions.

**Observation:**
Every ADR explicitly rejects alternatives that violate Foundation laws. For example, ADR-002 rejects the global singleton precisely because it "violates FOUNDATION.md" — the architectural constitution is being used as a decision filter.

**Pattern across all ADRs:**
The consistency of rejection reasons across 8 ADRs reveals the top architectural concerns:
1. Duplicated infrastructure → unified framework
2. Global mutable state → explicit injection
3. Hidden dependencies → constructor declaration
4. Tight coupling → contract-based interfaces
5. Inconsistent lifecycle → kernel ownership

## What I Learned

The practice of writing ADRs before implementation forces the evaluation of alternatives that might otherwise be skipped under delivery pressure. The pattern of "duplicated logic" appearing as a rejection reason in 5 of 8 ADRs suggests this was a recurring temptation during design.

The "Negative" consequences sections in each ADR are honest: ADR-001 acknowledges "Additional abstraction layer; Initial implementation effort; Requires careful API design to remain stable." ADR-002 acknowledges "Startup validation increases initialization complexity; Configuration schema changes require careful versioning." These trade-off acknowledgments are rare in architecture documentation.

## Broader Principle

The 8 ADRs collectively enforce one meta-principle: every form of implicit dependency (global state, self-registration, direct service calls, console printing, custom loggers) is prohibited in favor of explicit, declared, injectable alternatives. This is dependency inversion applied systematically across every infrastructure concern.

## Technical References

- `docs/adr/ADR-001-service-framework.md` through `ADR-008-dependency-injection.md`
- `docs/adr/README.md` — ADR process and governance
- `src/common/exceptions/base.py` — Implemented exception hierarchy
- `src/kernel/exceptions.py` — Kernel exception extension
- `docs/architecture/FOUNDATION.md` — Laws referenced in rejection reasoning

## Source Confidence

HIGH

All 8 ADR files are present, consistent, and the exception hierarchy is confirmed in source code. The documents follow a consistent template with genuine technical content in each section.

---

## Content Value

Technical Depth: 4/5
Engineering Insight: 4/5
Originality: 3/5
Evidence Quality: 5/5
Story Value: 3/5

Overall: **High**

Eight ADRs for a single phase is unusual rigor. The consistency of rejection patterns across all 8 — "duplicated infrastructure," "global mutable state," "tight coupling" — is a concrete demonstration of architectural consistency. The implemented exception hierarchy (visible in source) provides code-level confirmation.

---

## Publication Notes

No sensitive material. Safe to publish.
