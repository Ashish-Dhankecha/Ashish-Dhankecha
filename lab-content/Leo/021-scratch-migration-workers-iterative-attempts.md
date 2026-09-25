---
title: 'Four Migration Workers: Iterative Attempts at Fixing 281 Violations'
slug: scratch-migration-workers-iterative-attempts
content_type: BUILD_LOG
project: LEO
status: Incomplete
date: 'null'
topics:
- migration
- iterative-development
- architectural-debt
- debugging
evidence_level: medium
publishable: true
description: The LEO root directory contained four successive migration worker scripts
  (`scratch_migration_worker.py` through `scratch_migration_worker_4.py`), each representing
  a separate attempt to programmatically migrate the 281 CMMU violation instances.
---

# Four Migration Workers: Iterative Attempts at Fixing 281 Violations

## Content Type

BUILD_LOG

## Project

LEO — AI Operating Companion

## Date

UNKNOWN

## Status

Incomplete — 4 iterations found; migration not completed

## One-Line Summary

The LEO root directory contained four successive migration worker scripts (`scratch_migration_worker.py` through `scratch_migration_worker_4.py`), each representing a separate attempt to programmatically migrate the 281 CMMU violation instances.

## Context

After the 281-violation Phase 28 audit report was generated, at least 4 attempts were made to write an automated migration tool that would transform direct database access code into CMMU-mediated access. These are scratch scripts preserved in the root directory of the project.

## What Was Found

In the root directory (`/home/ashish/Leo/`):
- `scratch_migration_worker.py`
- `scratch_migration_worker_2.py`
- `scratch_migration_worker_3.py`
- `scratch_migration_worker_4.py`

In the backend directory (`/home/ashish/Leo/backend/`):
- Additional migration-related scratch files

The naming convention (`scratch_` prefix) indicates these were experimental/exploratory scripts, not production tooling.

The presence of 4 successive iterations without completion indicates each attempt encountered problems that required a new approach.

## Evidence

- `/home/ashish/Leo/scratch_migration_worker.py` — first migration attempt
- `/home/ashish/Leo/scratch_migration_worker_2.py` — second iteration
- `/home/ashish/Leo/scratch_migration_worker_3.py` — third iteration
- `/home/ashish/Leo/scratch_migration_worker_4.py` — fourth iteration
- `phase_28_x_2_violation_report.md` — the migration target (281 violations to fix)

## Diagnosis

**Established:**
4 successive migration scripts exist in the project root. The script names increment sequentially, indicating each was a separate iteration.

**Likely:**
Each migration attempt encountered problems — possibly edge cases in the AST transformation, files that required manual handling, or changes that broke other tests. The `scratch_` prefix indicates these were exploratory and not production-ready.

The challenge of automating a migration from `Session()` direct access to `cmmu.begin_transaction()` is non-trivial: it requires understanding the semantics of each database call, not just pattern-matching imports. Some calls may require context that a simple AST rewriter cannot infer.

**Unknown:**
The content and specific failures of each iteration. Whether any of the 4 workers made partial progress (migrating a subset of violations). Why the 4th iteration was the last documented.

## What I Learned

Automated migration of architectural violations is a class of problem where the difficulty scales non-linearly with semantic complexity. Simple pattern replacements (change import A to import B) can be done mechanically. Semantic migrations (change how database access is scoped and transacted) require understanding the call context, which AST-level tools often cannot provide reliably.

The 4-iteration pattern is common in exploratory migration tooling: each iteration handles more cases correctly but reveals new edge cases or complexity.

## Broader Principle

When designing an architectural migration tool, expect multiple iterations. Start with the simplest transformation, measure coverage, identify the failure cases, and iterate. The 4 scratch scripts suggest an incremental approach was taken — a reasonable strategy for this complexity class.

## Technical References

- `/home/ashish/Leo/scratch_migration_worker.py`
- `/home/ashish/Leo/scratch_migration_worker_2.py`
- `/home/ashish/Leo/scratch_migration_worker_3.py`
- `/home/ashish/Leo/scratch_migration_worker_4.py`
- `phase_28_x_2_violation_report.md`

## Source Confidence

MEDIUM — File existence confirmed in directory listing. File contents not read. Inference based on naming conventions and project context.

---

## Content Value

Technical Depth: 2
Engineering Insight: 3
Originality: 2
Evidence Quality: 3
Story Value: 3

Overall: **Medium**

The 4-iteration migration attempt pattern is a useful build process story. The evidence is at the file-existence level (contents not read), so confidence is medium. Best as a supporting detail alongside the broader violation story.

---

## Publication Notes

No sensitive material detected.
