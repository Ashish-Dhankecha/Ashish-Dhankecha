---
title: A Three-Package Dependency Cycle Undetected Until an Invariant Audit
slug: dependency-cycle-execution-planning-reflection-ashi
content_type: DEBUGGING_DISCOVERY
project: Ashi
status: Fixed
date: '2026-08-21'
topics:
- software-architecture
- dependency-management
- monorepo
- python
- type-safety
evidence_level: high
publishable: true
description: "A live three-package circular dependency (`ashi-execution \u2192 ashi-planning\
  \ \u2192 ashi-reflection \u2192 ashi-execution`) existed undetected for weeks because\
  \ no automated check verified the package dependency graph's acyclicity \u2014 until\
  \ a dedicated architectural invariant audit found it, and a `typing.Protocol` broke\
  \ it."
---

# A Three-Package Dependency Cycle Undetected Until an Invariant Audit

## Content Type

DEBUGGING DISCOVERY

## Project

Ashi — Personal Cognitive Operating System

## Date

2026-08-21

## Status

Fixed

## One-Line Summary

A live three-package circular dependency (`ashi-execution → ashi-planning → ashi-reflection → ashi-execution`) existed undetected for weeks because no automated check verified the package dependency graph's acyclicity — until a dedicated architectural invariant audit found it, and a `typing.Protocol` broke it.

## Context

Ashi is a 28-package Python monorepo enforcing a strict 6-layer dependency hierarchy where lower-layer packages cannot import higher-layer ones. The architecture is documented and the separation is a stated design principle. A full "architectural-invariant audit" (`docs/audits/ashi-architectural-invariant-audit.md`) was commissioned to verify the implementation matched the design.

The audit was not looking for cycles specifically — it was looking for anything that violated stated invariants.

## The Question

Does the actual dependency graph match the documented architecture?

## Initial Approach

The audit traced each package's declared `[project.dependencies]` in `pyproject.toml` and confirmed them against actual `from ashi.X import` statements. Not just transitive availability — actual imports in source files.

## What Happened

**The cycle:**

`ashi-execution → ashi-planning → ashi-reflection → ashi-execution`

Confirmed at both the `pyproject.toml` manifest level and by tracing actual imports:

- `ashi-execution` → `ashi-planning`: 21 files import `ashi.planning.models.{ActionProposal, Plan, RiskTier}`. Deep and semantically correct — execution executes proposals planning produces.
- `ashi-planning` → `ashi-reflection`: 2 files import `ashi.reflection.models.Evaluation`. Also semantically correct — plan revision policy reacts to past reflection judgments.
- **`ashi-reflection` → `ashi-execution`**: 2 files import `ashi.execution.tool_memory.{ToolMemoryRecord, ToolMemoryStore}`. The cycle-closing edge.

**Why `ashi-reflection` imported `ashi-execution`:**

`MetacognitiveCoordinator.record_strategy_evaluation` needed to know how reliable each tool/strategy had been. It consumed `ToolMemoryStore.list()` to read past execution records. `ToolMemoryStore` was defined in `ashi-execution` because `ashi-execution` writes to it (via `record_outcome` on every real tool call). Reflection imported the concrete class from its primary owner.

This is semantically reasonable — Reflection legitimately needs execution reliability data. The problem was the implementation: importing the concrete `ToolMemoryStore` class from `ashi-execution` closed the cycle, because `ashi-execution` already depends on `ashi-planning`, which already depends on `ashi-reflection`.

**Three edges, two correct, one fixable:**

The audit confirmed which edge to break: the only edge where the imported symbol was a behavioral interface (`ToolMemoryStore`, with a real method to call) rather than a pure value type (`Plan`, `ActionProposal`, `Evaluation`). The behavioral interface was the right place to introduce a structural seam.

## Evidence

- `docs/audits/ashi-architectural-invariant-audit.md` — finding AI-01
- `docs/decisions/0148-execution-planning-reflection-cycle-resolution.md`
- `packages/ashi-reflection/src/ashi/reflection/metacognition/tool_memory_protocol.py` — the Protocol
- `packages/ashi-reflection/pyproject.toml` — before/after dependency declarations
- `tests/certification/substrate/test_substrate_architecture_invariants.py` — `test_package_dependency_graph_has_no_cycle`

## Diagnosis

**Established:**

The cycle existed and would have been caught by any tool that builds the package dependency graph and runs cycle detection. No such tool ran automatically. The `pyproject.toml` manifests are the layer a developer edits when adding a dependency — which is exactly where the mistake first appeared.

**The enforcement gap:** the codebase had certification tests for many invariants (routing configuration, cognitive certification, import bounds), but not for package-graph acyclicity. The invariant was stated as a design principle and left unenforced.

This is one of three independent instances this repository found of "nothing runs the check that would have caught this" — alongside ruff/mypy drift (resolved in the same pass) and a cognitive certification test that had been red for eleven days unnoticed.

## What Changed

**Break the cycle:** a local `typing.Protocol` in `ashi.reflection.metacognition.tool_memory_protocol` declares exactly the interface Reflection needs:

```python
class ToolRecordLike(Protocol):
    action_type: str
    provider_name: str
    attempts: int
    updated_at: datetime
    @property
    def success_rate(self) -> float: ...

class ToolMemoryReader(Protocol):
    def list(self) -> list[ToolRecordLike]: ...
```

`ashi.execution.tool_memory.ToolMemoryRecord`/`ToolMemoryStore` satisfy these structurally (Python structural typing), with zero code change on the execution side. `bootstrap.py` — the composition root — passes the real object unchanged.

`ashi-reflection`'s `pyproject.toml` no longer declares `ashi-execution`. A full grep confirms zero `from ashi.execution` imports anywhere in `ashi.reflection`. Verified with a live `MetacognitiveCoordinator` producing byte-identical `tool_caution`/`SelfModel` output.

**Enforce acyclicity:** `test_package_dependency_graph_has_no_cycle` parses every `packages/*/pyproject.toml`'s declared dependencies, builds a directed graph, runs DFS-based cycle detection, and fails with the exact cycle path if one exists. Negative-control verified: reconstructing the original three-edge cycle synthetically correctly detects and names it.

## What I Learned

An architectural invariant that is documented but not tested will eventually be violated. The size of the codebase and the good intentions of the developer are irrelevant — without automated enforcement, the invariant degrades over time as the system grows. This is not a failure of care; it is a property of unchecked invariants in a sufficiently large codebase.

`typing.Protocol` is the right Python tool for breaking a dependency cycle at a package boundary: it expresses "I need this behavioral interface" without creating a nominal dependency on the concrete implementation. The package that owns the implementation is free to implement it; the package that needs the behavior sees only the Protocol. No shared package needed, no moved ownership — just a structural seam at the boundary.

## What I Would Do Differently

Add the cycle detection test at the same time the layered architecture is first documented. "The graph is acyclic" is a design invariant — treat it like any other invariant and test it from the moment it's declared. A DFS over `pyproject.toml` files is twenty lines of Python and runs in milliseconds.

## Broader Principle

In a multi-package monorepo with a documented dependency hierarchy, the package dependency graph is a testable invariant. Any stated acyclicity or layering guarantee must be verified by automation, not by convention. Developer discipline is not a substitute for enforcement; it fails under time pressure, incomplete information, and accumulated changes that seemed individually reasonable. Cycle detection on the manifest layer (not the AST layer) is a cheap, fast, high-value check.

## Technical References

- `packages/ashi-reflection/src/ashi/reflection/metacognition/tool_memory_protocol.py`
- `tests/certification/substrate/test_substrate_architecture_invariants.py`
- `docs/decisions/0148-execution-planning-reflection-cycle-resolution.md`
- `docs/audits/ashi-architectural-invariant-audit.md`

## Source Confidence

HIGH — the cycle was confirmed at both the manifest and source-import level. The fix is present in the source. The enforcement test is a real running test. The cycle was also verified negative-control (reconstructed and detected correctly).

---

## Content Value

Technical Depth: 5
Engineering Insight: 5
Originality: 4
Evidence Quality: 5
Story Value: 3

**Overall: High**

Specific, traceable, consequential. The distinction between "semantically correct edges" and "the cycle-closing edge" is a clear diagnostic framework. The `typing.Protocol` solution is elegant and the principle — "acyclicity is a testable invariant, test it" — is directly actionable for any monorepo.

---

## Publication Notes

No credentials or private data. Package names, import paths, and architecture diagrams are technical details with no privacy implications. The `typing.Protocol` solution is a standard Python technique. Safe to publish.
