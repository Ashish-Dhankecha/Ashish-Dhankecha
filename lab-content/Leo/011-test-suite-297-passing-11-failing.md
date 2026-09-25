---
title: '297 Passing, 11 Failing: What the Test Suite Reveals About Architecture Maturity'
slug: test-suite-297-passing-11-failing
content_type: ENGINEERING_NOTE
project: LEO
status: Documented
date: 'null'
topics:
- test-engineering
- test-failures
- architecture-maturity
- event-bus-contract
evidence_level: high
publishable: true
description: LEO's test suite ran 308 tests with 297 passing and 11 failing; the failures
  concentrated in event bus contract mismatches (wrong event topic names) and mock
  infrastructure gaps (add_mock_goal not implemented), revealing a disconnect between
  subsystem tests and integration-level event contracts.
---

# 297 Passing, 11 Failing: What the Test Suite Reveals About Architecture Maturity

## Content Type

ENGINEERING_NOTE

## Project

LEO — AI Operating Companion

## Date

UNKNOWN (test results file timestamp suggests mid-2026)

## Status

Documented — test failures identified; root causes analyzed

## One-Line Summary

LEO's test suite ran 308 tests with 297 passing and 11 failing; the failures concentrated in event bus contract mismatches (wrong event topic names) and mock infrastructure gaps (add_mock_goal not implemented), revealing a disconnect between subsystem tests and integration-level event contracts.

## Context

The test suite (`backend/test_results.txt`) ran across 308 collected tests covering cognition subsystems, personality modules, conversation routing, execution, realtime, research, recovery, and more. The results were 97% passing. The 11 failures provide useful signal about where the architecture was incomplete or inconsistent.

## The Question

What do the 11 failing tests reveal about the system's integration state?

## Failure Analysis

**Category 1: Event bus contract mismatch (event topic string divergence)**

`test_decision_manager_generate_recommendation`:
- Expected event topic: `"decision.requested"`
- Actual events published: `[("decision.requested", {...})]` — the assertion `"decision.requested" in topics` failed because `topics` was a list of tuples, not strings
- The test was comparing against the tuple representation, not the string

`test_strategic_manager_generate_plan`:
- Expected: `"plan.created"` in topics
- Actual events: `PlatformEvent(event_name="milestone.created", ...)` — the manager published `milestone.created` not `plan.created`
- Either the test was written against a previous API version or the manager's event naming changed

`test_strategic_manager_evaluator`:
- Expected: `"strategic_revision"` in topics
- Actual events had different event names

**Category 2: Mock repository missing required method**

`test_goal_drift_healthy`, `test_goal_drift_stalled`, `test_goal_drift_blocked_and_paused`:
```
goal_repository.add_mock_goal(goal)
AttributeError: ... object has no attribute 'add_mock_goal'
```
The test required a mock repository with `add_mock_goal()` but the mock did not implement it.

**Category 3: Manager not publishing expected health events**

`test_monitoring_manager_run_cycle` and `test_monitoring_manager_degraded_state`:
- Expected `health.updated` and `subsystem.degraded` events
- Actual: zero matching events published

**Category 4: Certification subsystem schema mismatch**

`test_certification_manager_full_run`:
```
AttributeError: 'CertificationPhaseResult' object has no attribute 'phase_id'
```
The `CertificationPhaseResult` Pydantic model lost the `phase_id` attribute — either a schema regression or the test was not updated after a schema change.

**Category 5: Recovery manager failures**

`test_recovery_manager_successful_recovery` and `test_recovery_manager_escalation_policy` — both failed; detailed trace not visible in the viewed portion of test_results.txt.

## Evidence

- `backend/test_results.txt` — full pytest output with failure tracebacks
- Lines 478-489 — short test summary: 11 specific failing tests listed
- Lines 113-275 — failure tracebacks

## Diagnosis

**Established:**
The 11 failures fall into patterns: event name mismatches (test expects one string, manager publishes another), mock infrastructure gaps, and schema regressions. These are integration-level failures, not logic failures.

**Likely:**
The event bus contract (which event names managers should publish) was not formally documented or enforced. Tests were written against one event name, and the implementation evolved to use a different name, breaking the test silently at the contract level.

The mock repository pattern (using `add_mock_goal()`) indicates the tests required a more capable mock than was provided.

**Unknown:**
Whether the certification schema regression (`phase_id` missing) was a deliberate API change or an accidental regression.

## What Changed

No documented fixes for the 11 failures.

## What I Learned

Event bus contracts are implicit APIs. When tests assert on specific event topic strings, any change to event naming in the implementation silently breaks the test without a type error. Event bus contracts should be defined as constants or enums that are shared between the publisher and the test. If the event name changes in one place, the constant update propagates everywhere.

The 97% pass rate with 11 specific integration failures suggests the unit-level subsystem tests are mature but the integration-level event contract tests reveal where the system needs hardening.

## What I Would Do Differently

**Hindsight observation:** Define event topic names as shared constants in a centralized events module. Tests and managers both import from the same source. Renaming an event becomes a refactor, not a silent break.

## Broader Principle

Implicit string contracts in event-driven systems create silent failures. Event topic names should be defined as typed constants to make mismatches a compile-time (or import-time) error rather than a runtime test failure.

## Technical References

- `backend/test_results.txt`
- `backend/app/decision/tests/test_manager.py`
- `backend/app/planning/tests/test_manager.py`
- `backend/app/monitoring/tests/test_manager.py`
- `backend/app/proactive/goal_drift/tests/test_goal_drift.py`
- `backend/app/certification/tests/test_certification.py`

## Source Confidence

HIGH — Specific failure tracebacks with file names, line numbers, and assertion values are in the test output file.

---

## Content Value

Technical Depth: 3
Engineering Insight: 4
Originality: 3
Evidence Quality: 5
Story Value: 3

Overall: **Medium-High**

The failure pattern analysis provides a concrete example of how event-driven architectures create silent contract failures. The 97% pass rate with 11 specific integration failures is a realistic picture of a large system in development. Evidence quality is high.

---

## Publication Notes

No sensitive material detected.
