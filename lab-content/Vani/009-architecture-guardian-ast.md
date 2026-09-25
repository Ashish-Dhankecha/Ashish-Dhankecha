---
title: 'The Guardian: Using AST Analysis to Make Architecture Self-Validating'
slug: architecture-guardian-ast-analysis
content_type: ENGINEERING_NOTE
project: VANI
status: "Implemented \u2014 Phase 0"
date: '2026'
topics:
- static-analysis
- ast-analysis
- architecture-enforcement
- software-quality
- tooling
evidence_level: medium
publishable: true
description: "VANI includes an \"Architecture Guardian\" subsystem that continuously\
  \ validates the repository's own structural correctness at runtime using static\
  \ AST analysis \u2014 enforcing dependency rules, naming conventions, layer boundaries,\
  \ and documentation requirements."
---

# The Guardian: Using AST Analysis to Make Architecture Self-Validating

## Content Type

ENGINEERING NOTE

## Project

VANI (Cognitive Operating System)

## Date

2026 (Phase 0)

## Status

Implemented — Phase 0

## One-Line Summary

VANI includes an "Architecture Guardian" subsystem that continuously validates the repository's own structural correctness at runtime using static AST analysis — enforcing dependency rules, naming conventions, layer boundaries, and documentation requirements.

## Context

VANI's FOUNDATION.md defines ten architectural laws (no circular dependencies, one owner per domain, no global mutable state, etc.). Writing rules in a document is easy. Enforcing them as code changes is hard. The Architecture Guardian is VANI's answer to this problem.

It was one of the 13 Phase 0 subsystems, implemented as a full subsystem with Foundation, Rule Registry, Validation Engine, Validation Executor, and Guardian Orchestrator.

## The Question

How do you prevent a system's implementation from drifting away from its documented architecture as the codebase grows?

## Initial Approach

The Architecture Guardian was implemented as part of the runtime — it runs alongside other subsystems during the main execution loop. It uses:

- Static AST analysis to parse Python source files
- Rule registry containing architectural validation policies
- Validation engine to execute rules against parsed ASTs
- Diagnostics model to report violations

The Phase 0 Certification Architecture Suite was "redesigned around a shared Repository Analysis engine" — the same AST-parsing infrastructure used by both the runtime Guardian and the certification system.

## What It Validates

From the certification report, the Architecture Certification Suite validates:

- Repository structure (directory layout, module organization)
- Domain ownership (each module belongs to exactly one domain)
- Dependency rules (imports must respect architectural layer boundaries)
- Import rules (no cross-layer imports)
- Layer validation (Foundation, Context, State Machine, Engine, Executor, Orchestrator layers present)
- Protocol contract existence (required interfaces defined)
- Naming conventions (class/module naming standards enforced)
- Documentation requirements (docstrings, architecture docs present)

From `docs/phases/phase0/IMPLEMENTATION_REPORT.md`:
> "The Architecture Suite was expanded into a real static analysis engine capable of validating repository structure, dependency rules, ownership, contracts, imports, naming, documentation, and architectural layering using AST analysis."

## Evidence

- `docs/phases/phase0/IMPLEMENTATION_REPORT.md` — "Architecture Certification Suite redesigned around a shared Repository Analysis engine" and AST analysis description
- `docs/phases/phase0/CERTIFICATION.md` — Architecture suite scope: repository structure, domain ownership, dependency rules, import rules, layer validation, protocol contracts, naming conventions, documentation requirements
- `docs/phases/phase0/CHANGELOG.md` — Version 0.5.0 (Guardian implementation) and Version 0.9.0 (improved static repository analysis, AST parsing)
- `src/runtime/guardian/` — Architecture Guardian source directory
- `docs/architecture/ARCHITECTURE_GUARDIAN.md` — Guardian architecture specification (6,650 bytes)

## Diagnosis

**Established:**
The Architecture Guardian is implemented as a runtime subsystem. The certification suite uses the same AST analysis infrastructure. Both are confirmed by the changelog (v0.5.0 for Guardian, v0.9.0 for improved AST analysis) and source directory structure.

**Observation:**
The Guardian validates *structural* properties currently, not behavioral properties. It can check that the dependency graph is acyclic and that import boundaries are respected — but it cannot validate that a service behaves according to its behavioral contract.

**Known Limitation (from KNOWN_LIMITATIONS.md):**
> "Future enhancements may include: Runtime policy enforcement, Security policy validation, Configuration validation, Performance policy validation, Continuous architectural monitoring."

These capabilities do not yet exist.

**Unknown:**
The specific rules currently encoded in the Rule Registry. The source code of the validation rules was not directly inspected.

## What Changed

The Architecture Certification Suite was "redesigned" mid-Phase 0. The changelog (v0.9.0) lists improvements to "Static repository analysis, AST parsing, Dependency graph analysis, Layer validation, Documentation validation, Contract validation, Naming validation, Ownership validation" — suggesting the initial implementation was simpler and was expanded.

## What I Learned

Architectural rules written in documents are aspirational. Architectural rules encoded as executable validators are enforceable. The value of the Guardian is not in what it catches today (Phase 0 is small and consistent) but in what it will catch in Phase 5 or Phase 8 when the codebase is 10x larger and someone adds a shortcut import.

## What I Would Do Differently

**Observation:** Running AST analysis inside the continuous runtime loop may introduce overhead as the codebase grows. In a large Python project, AST parsing of all source files on every runtime cycle would be expensive. The Guardian may need to be triggered on changes rather than continuously, or cached aggressively. This is not yet a problem but is a future architectural concern.

## Broader Principle

The moment your architecture has more than five people working on it (or the moment it spans more than one year of development), you need architectural compliance tooling — not just documentation. AST-based validation is a practical approach for languages with good AST libraries (Python's `ast` module, Java's AST frameworks). The alternative is code review, which is expensive, inconsistent, and rarely catches everything.

## Technical References

- `src/runtime/guardian/` — Architecture Guardian source
- `docs/architecture/ARCHITECTURE_GUARDIAN.md` — Guardian architecture specification
- `docs/phases/phase0/CHANGELOG.md` — v0.5.0 and v0.9.0 (Guardian and AST improvements)
- `docs/phases/phase0/CERTIFICATION.md` — Architecture certification suite scope
- `docs/phases/phase0/KNOWN_LIMITATIONS.md` — Guardian limitations section

## Source Confidence

MEDIUM

The AST-based analysis is confirmed by multiple documents. However, the specific validation rules encoded in the Rule Registry were not directly inspected in source code. The capabilities are established from documentation; the implementation depth is inferred.

---

## Content Value

Technical Depth: 4/5
Engineering Insight: 5/5
Originality: 4/5
Evidence Quality: 3/5
Story Value: 3/5

Overall: **Medium-High**

The concept of a runtime subsystem that validates its own architecture is interesting and unusual. The AST-based validation approach is concrete. The evidence is from documentation rather than direct source inspection, which reduces confidence slightly. Worth publishing with appropriate hedging.

---

## Publication Notes

No sensitive material. Safe to publish.
