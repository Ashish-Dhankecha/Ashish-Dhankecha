---
title: 'No Placeholder Modules: Engineering Discipline in a Long-Horizon Project'
slug: no-placeholder-modules
content_type: ENGINEERING_NOTE
project: VANI
status: "Active principle \u2014 enforced from project start"
date: '2026'
topics:
- engineering-discipline
- cognitive-systems
- code-quality
- software-craftsmanship
evidence_level: high
publishable: true
description: 'VANI''s README.md establishes three non-negotiable engineering principles
  that apply regardless of project phase: no placeholder modules, strict static typing
  enforced by MyPy, and production-grade code from the first commit.'
---

# No Placeholder Modules: Engineering Discipline in a Long-Horizon Project

## Content Type

ENGINEERING NOTE

## Project

VANI (Cognitive Operating System)

## Date

2026

## Status

Active principle — enforced from project start

## One-Line Summary

VANI's README.md establishes three non-negotiable engineering principles that apply regardless of project phase: no placeholder modules, strict static typing enforced by MyPy, and production-grade code from the first commit.

## Context

VANI's `README.md` is the developer-facing entry point. Unlike most READMEs that describe features, VANI's opens with engineering principles that define how the project is built.

The principles are grouped under "Engineering Standards" and are stated as rules, not preferences.

## The Three Principles

**Principle 1: No Placeholder Modules**

> "No subsystem, module, or component is introduced as a placeholder or stub. Every file that exists in the repository either is complete or is actively being developed."

This is a direct consequence of the "Cognitive OS, not chatbot" architecture decision. If VANI is an operating system, you don't scaffold fake cognitive services and fill them in later. You introduce subsystems only when you are ready to build them completely.

In practical terms, this means Phase 0 has no `memory/` directory with a `TODO: implement episodic memory` stub. Memory does not exist in the codebase until Phase 2 builds it.

**Principle 2: Strict Static Typing**

> "All Python code uses strict type annotations. MyPy is configured with `strict = true`. The project aims for zero MyPy errors."

From `pyproject.toml` (verified in source):
```toml
[tool.mypy]
python_version = "3.12"
strict = true
warn_return_any = true
warn_unused_configs = true
```

Strict MyPy mode enables all optional checks: disallow-untyped-defs, disallow-any-generics, warn-return-any, disallow-incomplete-defs, and more.

**Principle 3: Production-Grade Standards**

> "Every component — regardless of development phase — is built to production quality. Infrastructure is not exempt. There are no 'just for now' solutions."

This produces the unusual property that Phase 0 (containing zero cognitive features) contains the same code quality standards as the final production system.

## Evidence

- `README.md` — "Engineering Standards" section (direct source)
- `pyproject.toml` — MyPy configuration: `strict = true`, `warn_return_any = true` (verified source code)
- `pyproject.toml` — Ruff configuration: `target-version = "py312"`, `select = ["E", "F", "I", "UP", "B", "SIM"]`
- `pyproject.toml` — Black: `line-length = 88`, `target-version = ["py312"]`
- `src/common/exceptions/base.py` — Source code with type annotations and docstrings
- `src/kernel/exceptions.py` — Source code with type annotations and docstrings
- Phase 0 producing zero placeholder directories

## Diagnosis

**Established:**
The "No Placeholder Modules" principle is reflected in the source code structure. The repository contains no stub directories or `pass`-only module files. Every source directory that exists (kernel, runtime, certification, common, bootstrap) contains implemented code.

**Established:**
Strict MyPy is configured in `pyproject.toml`. The configuration is correct (strict mode + warn_return_any + warn_unused_configs).

**Established:**
The toolchain is configured for production quality: MyPy strict, Ruff (linting with error, flake, isort, pyupgrade, bugbear, simplify rule sets), Black (formatting), pytest >= 8.0.

**Observation:**
`dependencies = []` in `pyproject.toml` — the installed package has zero runtime dependencies in Phase 0. Everything is in `[project.optional-dependencies].dev`. This is consistent with "zero cognitive features" in Phase 0.

## What I Learned

The "No Placeholder Modules" principle has a second-order benefit beyond code quality: it makes architectural scope concrete. You cannot "fake" your way through a phase by creating skeleton directories. Either a subsystem is implemented or it doesn't exist. This forces honest scope assessment.

The production-grade standard from day one means no future "let me clean up the Phase 0 code before we build on it" work is required. The foundation is already production-quality.

## What I Would Do Differently

**Observation:** The strict MyPy enforcement with zero placeholder exceptions is admirable but adds friction during rapid design exploration. In early phase development, you might want to explore an API design quickly before enforcing type correctness. The chosen approach accepts more friction for higher code quality — a reasonable tradeoff for a long-horizon project.

## Broader Principle

In a long-horizon project (one intended to operate for years or decades), the cost of technical debt compounds more severely than in a short-horizon project. "Production grade from day one" is economically justified when the codebase will be actively developed for 5–10+ years. The "no placeholder" rule is a specific implementation of this: fake code is debt that will be paid eventually, with interest.

## Technical References

- `README.md` — Engineering Standards section
- `pyproject.toml` — Full tooling configuration (verified)
- `src/common/exceptions/base.py` — Example of implemented code with typing
- `src/kernel/exceptions.py` — Example of implemented code with typing

## Source Confidence

HIGH

The principles are directly in README.md. The MyPy, Ruff, and Black configurations are verified in `pyproject.toml`. The absence of placeholder directories is observable in the source structure.

---

## Content Value

Technical Depth: 3/5
Engineering Insight: 4/5
Originality: 3/5
Evidence Quality: 5/5
Story Value: 3/5

Overall: **Medium-High**

"No placeholder modules" is a simple principle with real disciplinary consequences visible in the code structure. Combining it with strict MyPy and production-grade standards from day one creates a coherent engineering philosophy. The `dependencies = []` finding (zero runtime dependencies in Phase 0) is an interesting concrete illustration.

---

## Publication Notes

No sensitive material. Safe to publish.
