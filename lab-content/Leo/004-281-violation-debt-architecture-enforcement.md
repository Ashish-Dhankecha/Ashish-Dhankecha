---
title: '281 Violations: What Happens When Architecture and Implementation Diverge'
slug: 281-architectural-violations-phase-28
content_type: POST_MORTEM
project: LEO
status: Documented
date: 'null'
topics:
- architectural-debt
- enforcement-gap
- refactoring
- system-design
evidence_level: high
publishable: true
description: A Phase 28 audit of the LEO codebase discovered 281 violations of the
  core CMMU architectural rule across the entire application layer, spanning every
  major module from API routers to cognition engines to proactive agents.
---

# 281 Violations: What Happens When Architecture and Implementation Diverge

## Content Type

POST-MORTEM

## Project

LEO — AI Operating Companion

## Date

UNKNOWN (Phase 28 document; code timestamps suggest mid-2026)

## Status

Documented — violation report generated; no corrective migration documented

## One-Line Summary

A Phase 28 audit of the LEO codebase discovered 281 violations of the core CMMU architectural rule across the entire application layer, spanning every major module from API routers to cognition engines to proactive agents.

## Context

LEO's architecture established that all storage access (PostgreSQL, Neo4j, Redis) must flow through the CMMU (`cmmu.begin_transaction()`, `cmmu.query_graph()`, `cmmu.cache_get()`). This rule was documented in `docs/06_DEPENDENCY_RULES.md` and is a foundation of the Cognitive OS design.

The Phase 28.X.2 violation report (`phase_28_x_2_violation_report.md`) is a table of 281 rows, each identifying a file, the database technology accessed directly, the rule violated, and the canonical replacement.

## The Question

How pervasive was the divergence between the CMMU architectural intent and the actual implementation across the codebase?

## What Happened

The audit produced 281 violations across these categories:

**By database technology:**
- PostgreSQL/SQLAlchemy direct `Session` access: 248 violations
- Neo4j direct graph queries: 16 violations
- Redis direct cache initialization: 3 violations

**By application domain (examples):**
- Kernel subsystem: V001-V008 (kernel.py, repository.py, event_repository.py, etc.)
- MCP layer: V008-V024 (14+ MCP files)
- Communication layer: V025-V027
- Presence services: V028-V031
- Engineering services: V032-V048
- Platform services: V048-V076
- Cognition subsystems: V091-V205 (115 cognition-layer violations)
- Proactive engines: V206-V278 (73 proactive-layer violations)
- Expression layer: V279-V281

The cognition layer alone had 115 violations, covering every sub-domain: learning, metacognition, patterns, integrity, causal reasoning, trust, communication baselines, behavior, prediction, reflection, goals, self-modeling, work rhythm, contradiction detection, profile synthesis, identity, episodic memory, semantic memory, retrieval, and temporal reasoning.

The proactive layer had 73 violations, covering: response, intervention, feedback, goal drift, simulation, delivery, situation, deadline, trigger, and anomaly detection modules.

## Evidence

- `phase_28_x_2_violation_report.md` — 286-line table of 281 violations (V001-V281)
- `docs/06_DEPENDENCY_RULES.md` — "CMMU owns all data and memory access operations"
- `backend/app/cognition/kernel/memory/api.py` — the CMMU public API that should be the sole access point
- Any of the 281 files listed in the violation report (e.g., `backend/app/cognition/learning/engine.py`, `backend/app/proactive/anomaly/manager.py`, etc.)

## Diagnosis

**Established:**
The violations are documented with file-level precision. The pattern is uniform: direct SQLAlchemy `Session` usage instead of `cmmu.begin_transaction()`. This is the natural pattern that developers use when writing database-backed services — it was used throughout the codebase before the CMMU constraint was established.

**Likely:**
The violation pattern reflects a sequential build order: application features were built first using direct database access, then the OS infrastructure (including the CMMU) was built on top. The CMMU constraint was defined architecturally but the migration from direct access to CMMU-mediated access was never executed.

**Unknown:**
Whether the CMMU's physical storage backends (the actual PostgreSQL/Neo4j/Redis drivers behind the CMMU API) were implemented at the time of the audit. If not, migrating to `cmmu.begin_transaction()` would have been a non-functional no-op.

## What Changed

No documented corrective migration was found in the available project material.

## What I Learned

1. A 281-row violation report in a single architectural rule indicates the rule was applied retroactively to code that predates it.
2. The cognition layer (115 violations) and proactive layer (73 violations) together account for 67% of violations — these are the highest-level behavioral layers of the system, furthest from the OS primitives.
3. Even the kernel subsystem itself (V001-V008) violated the CMMU rule, including the `kernel.py` file (`backend/app/kernel/kernel.py`). The `PlatformKernel` passed a `db` (SQLAlchemy session) directly into its repository constructor — using the same pattern as all other violators.
4. The violation report is a necessary and honest document. Many projects allow architectural drift to accumulate undocumented. Generating a precise violation list is a prerequisite for any corrective action.

## What I Would Do Differently

**Hindsight observation:** The most effective intervention would have been to write a CI-enforced linting rule (e.g., banning direct `Session` imports outside the CMMU) from the day the CMMU constraint was established. Every new file added after that point would be caught immediately. The 281 existing violations would still need migration, but the violation count would not grow further.

## Broader Principle

Retroactive architectural constraint enforcement on an existing codebase scales with codebase size. A codebase with 281 violations of a single rule requires a systematic migration plan (not just a document) to resolve it. Generating the violation report is the first step; without an automated enforcement mechanism, violations will continue to accumulate.

## Technical References

- `phase_28_x_2_violation_report.md`
- `backend/app/cognition/kernel/memory/api.py`
- `docs/06_DEPENDENCY_RULES.md`
- `backend/app/kernel/kernel.py` (V004 — kernel itself violated the rule)

## Source Confidence

HIGH — Violation report is a primary document with 281 enumerated, file-level instances. The evidence is complete and specific.

---

## Content Value

Technical Depth: 3
Engineering Insight: 5
Originality: 3
Evidence Quality: 5
Story Value: 5

Overall: **High**

The 281-violation audit is unusually specific and honest documentation of architectural debt. The story of building an ambitious architectural constraint that was then violated by 100% of the existing application code is a concrete and instructive engineering post-mortem. The counts and file-level specificity make this a high-evidence story.

---

## Publication Notes

No sensitive material detected.
