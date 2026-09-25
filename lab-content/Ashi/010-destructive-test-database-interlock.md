---
title: 'When pytest Truncates Your Live Database: The Destructive Test Interlock'
slug: destructive-test-database-interlock-ashi
content_type: DEBUGGING_DISCOVERY
project: Ashi
status: Fixed
date: '2026-08-12'
topics:
- testing
- databases
- production-safety
- developer-experience
- pytest
evidence_level: high
publishable: true
description: "`uv run pytest packages/ashi-planning/tests` truncated the live production\
  \ Postgres database mid-session, wiping 3 goals, 26 episodes, and 3 plans while\
  \ `ashi serve` was running \u2014 because `PostgresConnection()` defaults to the\
  \ developer's live store when `ASHI_DATABASE_URL` is unset."
---

# When pytest Truncates Your Live Database: The Destructive Test Interlock

## Content Type

DEBUGGING DISCOVERY

## Project

Ashi — Personal Cognitive Operating System

## Date

2026-08-12

## Status

Fixed

## One-Line Summary

`uv run pytest packages/ashi-planning/tests` truncated the live production Postgres database mid-session, wiping 3 goals, 26 episodes, and 3 plans while `ashi serve` was running — because `PostgresConnection()` defaults to the developer's live store when `ASHI_DATABASE_URL` is unset.

## Context

Ashi runs against a local Postgres instance. `@pytest.mark.postgres` tests execute `TRUNCATE TABLE` statements to reset state between tests. `PostgresConnection()` resolves the database via `ASHI_DATABASE_URL` environment variable, with a fallback to `DEFAULT_DSN = postgresql://ashi:ashi_dev@localhost:5432/ashi` — the live local store.

On a developer machine, `uv run pytest` with `ASHI_DATABASE_URL` unset would therefore truncate production tables. Nothing warned.

## The Question

Why did the live Postgres store have 0 goals, 0 plans, and 0 episodes after a pytest run on an unrelated package?

## Initial Approach

Investigation after discovering the live store was wiped between Phase T and Part 2 Final. The behavioral audit data (goals, episodes, plans accumulated over active sessions) had vanished.

## What Happened

**The mechanism is direct and reproducible:**

1. `ASHI_DATABASE_URL` is not set in a developer shell (common — it's set in `.env`, not in the shell environment)
2. `uv run pytest packages/ashi-planning/tests` is run to regression-check an unrelated code change
3. `PostgresConnection()` is called with no argument in test fixtures
4. `resolve_dsn()` finds `ASHI_DATABASE_URL` unset → falls back to `DEFAULT_DSN`
5. Test fixtures execute: `TRUNCATE TABLE goals CASCADE`, `TRUNCATE TABLE plans`, `TRUNCATE TABLE episodes`, `TRUNCATE TABLE projects`, `TRUNCATE TABLE plan_execution_contexts`
6. A running `ashi serve` instance that had been accumulating behavioral data now has zero records in five tables

**This happened at least twice:**

Occurrence 1: "the live Postgres store was wiped between Phase T and this phase" — reported in `reports/part2-final/final-completion-report.md` as an unexplained environmental change. The report correctly downgraded several audit dimensions from "known bad" to **UNMEASURED** because the baseline data was gone.

Occurrence 2: directly observed during Part 2's live phase — `uv run pytest packages/ashi-planning/tests` took the live store from 3 goals / 26 episodes / 3 plans to **0 / 0 / 0**, while `cognitive_events` and `memory_records` (whose suites contain no `TRUNCATE`) kept growing. The mechanism was directly observed, not inferred.

**The first guard implementation was wrong:**

The first version of the interlock read `os.environ.get("ASHI_DATABASE_URL")` and treated *unset* as safe — reasoning that with no URL configured, nothing could connect. This is exactly backwards: unset is when `DEFAULT_DSN` takes over and the live database is targeted. The guard ran, matched nothing, and the next test run truncated `projects` a second time.

Duplicating the resolution rule (`os.environ.get`) rather than calling the existing resolver (`resolve_dsn()`) was what made the guard wrong.

## Evidence

- `reports/part2-final/final-completion-report.md` — Occurrence 1 documented as unexplained environmental change
- `reports/part2-final/` — Occurrence 2 directly observed with before/after counts
- `docs/decisions/0137-destructive-test-database-interlock.md`
- Root `conftest.py` — interlock implementation
- `packages/ashi-planning/tests/conftest.py` — `TRUNCATE TABLE` statements in fixtures

## Diagnosis

**Established:**

The bug: `PostgresConnection()` with no argument falls back to the live database when `ASHI_DATABASE_URL` is unset. On a developer machine, this is the live store. Test fixtures with `TRUNCATE TABLE` are destructive in any database they point at.

The guard implementation bug: `os.environ.get("ASHI_DATABASE_URL")` treats unset as "no database" instead of "fallback to DEFAULT_DSN." The same fallback logic the bug relied on made the guard wrong when it checked the wrong variable for safety.

## What Changed

A repository-root `conftest.py` skips every `@pytest.mark.postgres` test when the resolved database is not disposable.

**"Disposable" is defined as:** the database name is exactly `test`, or ends in `_test`, `_tests`, or `_ci`.

**Opt out with:** `ASHI_ALLOW_DESTRUCTIVE_TESTS=1`

The check resolves the DSN by **calling `resolve_dsn()` itself** — not re-reading `ASHI_DATABASE_URL`. This is the fix for the wrong-guard mistake: the resolver is the single source of truth for what database will be used. Any guard must call the resolver, not re-implement a subset of its logic.

**Why skip rather than fail:** these tests already skip when Postgres is unreachable, so the shape of a run is unchanged. An explicit `SKIPPED (destructive: lives at postgresql://...ashi)` line is strictly more informative than silent data loss.

**Why not fix the fixtures instead:** editing 10 `TRUNCATE` statements across 5 files fixes those files and none of the next ones. The interlock is one file, applies to every current and future `postgres`-marked test, and cannot be forgotten by whoever writes the next fixture.

**Verification:** `packages/ashi-planning/tests` reports **391 passed** against a disposable database — identical to the pre-interlock count. The interlock removes no coverage.

## What I Learned

The most dangerous bugs are the ones where "the safe state" and "the dangerous state" are the same observable value. `ASHI_DATABASE_URL` unset looks like "not configured" (safe), but means "use the DEFAULT_DSN live database" (dangerous). Any guard that treats "unset" as "safe" based on a variable being absent has the logic exactly backwards.

Call the resolver, don't re-implement part of it. Any time you guard against a behavior that depends on a resolution function, call that function — not the underlying source it reads from. The wrong guard read one input to the resolver; the correct guard called the resolver directly.

## What I Would Do Differently

Database convention from day one: any `PostgresConnection()` call in a test file should require an explicit database name, not rely on a fallback. The fallback exists for production convenience, not for test correctness. A fixture factory that requires an explicit DSN or errors on ambiguous resolution would have prevented this class of bug entirely.

Alternatively: the `DEFAULT_DSN` fallback should have had a "test-safety assertion" built in — a check that the resolved DSN is a disposable database before accepting any connection request from a test process.

## Broader Principle

Never share the same default configuration between production and test code when the test code can be destructive. A fallback that makes a developer convenience (run `ashi serve` without setting environment variables) become a test hazard is a design gap. The test framework should explicitly require test-specific configuration; the production fallback is not appropriate test configuration.

Auditing guard logic against the behavior it's supposed to guard is essential. A guard that reads `ASHI_DATABASE_URL` to determine safety, when the danger comes from a *fallback* that activates when `ASHI_DATABASE_URL` is absent, is checking the wrong thing.

## Technical References

- `conftest.py` (root) — `_is_disposable_database()` interlock
- `packages/ashi-planning/tests/conftest.py` — `TRUNCATE TABLE` statements
- `packages/ashi-storage/src/ashi/storage/postgres/connection.py` — `resolve_dsn()`, `DEFAULT_DSN`
- `docs/decisions/0137-destructive-test-database-interlock.md`

## Source Confidence

HIGH — both occurrences are documented with specific state before and after. The mechanism was directly observed in the second occurrence. The wrong-guard implementation is documented in the ADR as "the same class of mistake as the bug it guards."

---

## Content Value

Technical Depth: 4
Engineering Insight: 5
Originality: 4
Evidence Quality: 5
Story Value: 5

**Overall: High**

This is universally relatable — "the test suite wiped the production database" is a war story every engineer understands. The detail that the first guard implementation was wrong in exactly the inverse-logic way (treating unset as safe when it means "use the live default") is a precise, specific lesson that elevates this above the usual "use a test database" advice.

---

## Publication Notes

References to Postgres table names (`goals`, `plans`, `episodes`) are behavioral/schema details with no privacy implications. The default DSN value (`postgresql://ashi:ashi_dev@localhost:5432/ashi`) is a developer credential documented in setup instructions, not a production credential. Safe to publish as written.
