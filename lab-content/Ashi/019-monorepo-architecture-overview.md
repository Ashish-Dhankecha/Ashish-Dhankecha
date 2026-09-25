---
title: '28 Packages, One Acyclic Graph: Building a Personal AI as a Monorepo'
slug: ashi-monorepo-architecture-overview
content_type: TECHNICAL_DESIGN
project: Ashi
status: Active
date: '2026-07-25'
topics:
- architecture
- monorepo
- cognitive-systems
- python
- software-design
evidence_level: high
publishable: true
description: "Ashi is structured as 28 independent Python packages in a uv workspace,\
  \ organized into a six-layer dependency hierarchy enforced at the build level \u2014\
  \ so architectural violations are visible at import time, not at runtime months\
  \ later."
---

# 28 Packages, One Acyclic Graph: Building a Personal AI as a Monorepo

## Content Type

TECHNICAL DESIGN

## Project

Ashi — Personal Cognitive Operating System

## Date

2026-07-25

## Status

Active

## One-Line Summary

Ashi is structured as 28 independent Python packages in a uv workspace, organized into a six-layer dependency hierarchy enforced at the build level — so architectural violations are visible at import time, not at runtime months later.

## Context

A personal cognitive operating system has a natural tension: the system needs to be deeply integrated (every subsystem must be able to share events, memory, and configuration) while remaining comprehensible to maintain. A flat package structure would mean every file can import everything; a fully siloed structure would prevent the legitimate cross-system collaboration the system needs.

The 28-package monorepo with an enforced dependency hierarchy is the design that resolves this tension.

## The Question

How do you structure a 20+ subsystem codebase so that architectural violations are visible immediately, not silently accumulated?

## Initial Approach

The architecture is organized as a uv workspace (Python's PEP 582-based monorepo tool). Each cognitive subsystem is its own installable Python package with its own `pyproject.toml`, its own declared dependencies, and its own import namespace.

The dependency graph is acyclic, enforced by a real test (`test_package_dependency_graph_has_no_cycle`).

## What Happened

**The six-layer hierarchy:**

| Layer | Packages | Rule |
|---|---|---|
| L0 Foundation | `ashi-config`, `ashi-observability`, `ashi-storage` | May not import anything above L0 |
| L1 Domain Substrate | `ashi-events`, `ashi-memory`, `ashi-identity`, `ashi-session`, `ashi-prompts` | May import L0 only |
| L2 Cognitive Services | `ashi-knowledge`, `ashi-reasoning`, `ashi-interpretation`, `ashi-inference`, `ashi-perception`, `ashi-runtime` | May import L0–L1 only |
| L3 Behavioral Intelligence | `ashi-character`, `ashi-relationship`, `ashi-presence`, `ashi-planning`, `ashi-reflection`, `ashi-learning`, `ashi-worldstate`, `ashi-environment`, `ashi-execution` | May import L0–L2 only |
| L4 Integration | `ashi-llm`, `ashi-pipeline` | May import L0–L3 |
| L5 Validation | `ashi-simulation`, `ashi-soak`, `ashi-evaluation` | May import everything |

Plus: `ashi-evidence`, `ashi-artifacts` (cross-cutting primitives at the foundation level)

**What the structure enforces:**

A new `from ashi.character import X` in `ashi-memory` fails immediately with an `ImportError` because `ashi-character` is not in `ashi-memory`'s declared dependencies and is not importable without installation. The violation is visible at import time in any environment.

This is "separation by structure, not convention." Convention-based rules ("please don't import character from memory") are invisible and unenforced. Structure-based rules fail loudly.

**The dependency graph as testable invariant:**

Since ADR 0148 (Aug 2026), `test_package_dependency_graph_has_no_cycle` parses every `pyproject.toml` and runs cycle detection. If a developer adds `ashi-execution` as a dependency of `ashi-reflection` (as happened in the real dependency cycle — Content Piece 011), the test fails before any CI check, naming the exact cycle.

**The event log as the integration bus:**

Cross-layer communication happens through `ashi-events` (L1). A higher-layer package produces an `Event`; a lower-layer package can consume event metadata without importing the higher-layer package. This is the mechanism that makes the acyclic hierarchy workable — subsystems don't need direct imports to communicate; they communicate through the event log.

**The ADR system as the governance layer:**

168 Architecture Decision Records (`docs/decisions/0001-0168`) document every non-trivial decision. The architecture freeze (ADR 0082) governs what requires an ADR before proceeding. The two together form a governance layer: the ADR system requires a documented rationale for any structural change, and the freeze defines which changes are structural.

**Practical consequence:**

The three-package cycle (`ashi-execution → ashi-planning → ashi-reflection → ashi-execution`) existed undetected for weeks because no automated check verified acyclicity. Once the enforcement test was added, the same class of cycle became impossible — detected in milliseconds at development time, not discovered months later during a behavioral audit.

## Evidence

- `README.md` — full 28-subsystem table and architecture diagrams
- `packages/*/pyproject.toml` — declared dependencies per package
- `tests/certification/substrate/test_substrate_architecture_invariants.py` — cycle detection
- `docs/decisions/0082-architecture-freeze.md` — freeze criteria
- `docs/decisions/0148-execution-planning-reflection-cycle-resolution.md` — cycle found + fixed
- `CLAUDE.md` — "Architecture Invariants" section

## Diagnosis

**What this structure prevents:**

- "I'll just import this one thing from a higher layer" — fails at import time
- Silent acyclic assumption degrading into a cycle — caught by the enforcement test
- Architectural violations accumulating until a full audit is needed — violations are visible at development time

**What it doesn't prevent (known gaps at time of audit):**

- Import-graph-level violations where a lower-layer package reaches into a higher-layer package's installed namespace through a transitive dependency (manifest-level acyclicity is enforced; AST-level import tracing across 1,000+ files is not)
- The gap between "the packages are correctly separated" and "the behavioral effects are correctly wired" (see the initiative_note and learning-result caller gaps)

**The recurring finding:**

Three separate incidents (`ruff`/`mypy` drift, a red certification test, the dependency cycle) were all instances of "nothing runs the check that would have caught this." The fix for all three was the same: add the check to the automated suite and run it. The enforcement test is a better guardrail than documentation.

## What I Learned

The difference between "separation by convention" and "separation by structure" is the difference between "developers are expected to follow the rule" and "violating the rule produces an immediate error." Convention degrades; structure doesn't. For architectural invariants that are important enough to state as invariants, they are important enough to enforce by test.

The hardest invariant to enforce is also the most important: behavioral correctness. Structural separation enforces that `ashi-memory` doesn't import `ashi-character`. It cannot enforce that `ashi-character`'s output actually affects behavior. That requires behavioral integration tests — which are the gap that the behavioral audit found.

## What I Would Do Differently

Add the cycle detection test at the same time the layered architecture is first declared. The test is 20 lines of Python, runs in milliseconds, and permanently prevents the dependency cycle class of bug. Writing it retroactively (after finding the cycle) means the bug existed and was preventable for the entire period before the test was added.

## Broader Principle

In a large Python codebase, structural separation (each subsystem in its own package with declared dependencies) is more reliable than conventional separation (files in folders with import guidelines). The cost is `pyproject.toml` boilerplate and `uv sync` at setup. The benefit is that architectural violations produce immediate, visible errors rather than silently accumulating until a full audit becomes necessary.

For any stated architectural invariant — "this graph is acyclic," "this layer doesn't import that layer" — write the test that verifies it. A documented invariant without a test is a wish. An invariant with a test is a guarantee.

## Technical References

- `README.md` — 28-subsystem architecture
- `packages/*/pyproject.toml`
- `tests/certification/substrate/test_substrate_architecture_invariants.py`
- `docs/decisions/0082-architecture-freeze.md`
- `docs/decisions/0148-execution-planning-reflection-cycle-resolution.md`
- `pyproject.toml` (root) — uv workspace configuration

## Source Confidence

HIGH — the package structure, dependency declarations, and enforcement test all exist in the repository. The hierarchy is documented in README.md with a visual diagram. The cycle detection test's accuracy was verified with a negative control.

---

## Content Value

Technical Depth: 4
Engineering Insight: 4
Originality: 3
Evidence Quality: 4
Story Value: 3

**Overall: Medium-High**

A clear articulation of a monorepo architecture with an unusual level of rigor for a solo project. The "separation by structure, not convention" framing is quotable. The 28-package table and six-layer hierarchy give the piece concrete grounding. Best as an establishing context piece that frames the rest of the technical content.

---

## Publication Notes

No credentials or private data. Package names, layer descriptions, and architecture diagrams are public technical details from the README. Safe to publish.
