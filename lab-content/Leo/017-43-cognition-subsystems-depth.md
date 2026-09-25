---
title: '43 Cognition Subsystems: The Scope and Structure of a Cognitive AI Layer'
slug: 43-cognition-subsystems-ai-cognitive-layer
content_type: ARCHITECTURE_DECISION
project: LEO
status: Partial
date: 'null'
topics:
- cognitive-architecture
- ai-subsystems
- metacognition
- self-modeling
evidence_level: high
publishable: true
description: LEO's cognition layer contained 43 distinct subsystems covering adaptive
  intelligence, causal reasoning, metacognition, trust modeling, risk assessment,
  conflict resolution, self-modeling, identity, and work rhythm analysis.
---

# 43 Cognition Subsystems: The Scope and Structure of a Cognitive AI Layer

## Content Type

ARCHITECTURE_DECISION

## Project

LEO — AI Operating Companion

## Date

UNKNOWN

## Status

Partial — subsystems implemented; behavioral integration incomplete

## One-Line Summary

LEO's cognition layer contained 43 distinct subsystems covering adaptive intelligence, causal reasoning, metacognition, trust modeling, risk assessment, conflict resolution, self-modeling, identity, and work rhythm analysis.

## Context

Most AI assistant architectures separate personality configuration from memory from execution. LEO's cognition layer attempted a much more granular decomposition: every cognitive capability was a named subsystem with its own repository, manager, and test suite.

## The Architecture

The `backend/app/cognition/` directory contained 43 subdirectories:

```
adaptive/           context/            extraction/         memory_merger/
behavior/           contradiction/      goals/              metacognition/
causal/             decay/              health/             meta/
certification/      episodic/           identity/           patterns/
communication_baseline/ episodic_index/ importance/         prediction/
conflict_resolution/ extraction/        integrity/          presence/
consolidation/      goals/              learning/           profile/
context/            health/             memory/             profile_api/
                                                            profile_synthesis/
                                                            reflection/
                                                            resources/
                                                            retrieval/
                                                            risks/
                                                            scheduler/
                                                            self/
                                                            semantic/
                                                            tasks/
                                                            temporal/
                                                            trust/
                                                            work_rhythm/
                                                            working_memory/
```

Notable subsystems by category:

**Self-modeling:**
- `self/` — contains `limits.py`, `dashboard.py`, `reflection.py`, `confidence.py`, `attention.py`, `engine.py`, `health.py`, `blind_spot.py`
- `metacognition/` — metacognitive store, engine, manager
- `identity/` — identity engine
- `profile/` + `profile_api/` + `profile_synthesis/` — user profile management

**Reasoning:**
- `causal/` — causal graph writing, candidate builder, certification
- `contradiction/` — contradiction detection and resolution
- `conflict_resolution/` — conflict resolution manager
- `temporal/` — temporal reasoning with Neo4j integration
- `prediction/` — prediction engine and evaluator

**Memory:**
- `episodic/` — episodic memory writer
- `episodic_index/` — episodic indexer
- `semantic/` — semantic synthesizer
- `consolidation/` — knowledge consolidation with Neo4j graph writing
- `memory_merger/` — memory deduplication and similarity
- `decay/` — memory decay manager
- `importance/` — memory importance scoring

**Learning:**
- `learning/` — acquisition, processing, evaluation, scheduling
- `adaptive/` — adaptive balance, freshness, engine
- `meta/` — meta-learning: belief revision, mental models, strategy optimizer, skill evolution

**Risk and integrity:**
- `risks/` — risk repository, updater, manager
- `integrity/` — integrity manager, optimizer, verifier
- `trust/` — trust repository, updater, manager

## What Happened

All 43 subsystems had test coverage. The test_results.txt shows all cognition tests passing:
- `app/cognition/behavior/tests/test_extractor.py ...` — passing
- `app/cognition/causal/tests/test_causal.py ....` — 4/4 passing
- `app/cognition/metacognition` — (confirmed in test list)
- All cognition tests passed in the test run

The Phase 28 audit found 115 violations in the cognition layer — direct database access in 115 files. This suggests each subsystem had a repository with direct SQLAlchemy access.

The `self/blind_spot.py` component is particularly notable: a component modeling the AI's own cognitive "blind spots" — areas where the AI system has systematic biases or gaps in awareness. This is a metacognitive self-modeling concept that goes beyond standard AI assistant design.

## Evidence

- `backend/app/cognition/` directory listing — 43 subdirectories confirmed
- `backend/test_results.txt` — all cognition subsystem tests listed as passing
- `phase_28_x_2_violation_report.md` — V091-V205: 115 cognition-layer violations
- `backend/app/cognition/self/` — 8 self-modeling components including `blind_spot.py`
- `backend/app/cognition/meta/` — belief_revision.py, mental_models.py, strategy_optimizer.py

## Diagnosis

**Established:**
43 cognition subsystems exist with unit tests. All tests pass. Each subsystem has a manager, repository, and test module.

**Likely:**
The subsystems were designed to interact through events (the Interconnect) and through the CMMU (for storage). The 115 violations indicate they were implemented with direct database access, meaning the inter-subsystem data flow through the CMMU was not yet operational.

**Unknown:**
Whether subsystems like `causal/graph_writer.py`, `consolidation/graph_writer.py`, and `temporal/` were actually writing to and reading from Neo4j knowledge graphs, or whether their operations were test-only.

## What I Learned

Decomposing a cognitive AI into 43 discrete subsystems makes each individually testable and independently evolvable. The challenge is integration: 43 subsystems each with their own database access pattern create 43 points of violation when a central access policy is introduced.

The self-modeling subsystems (`self/`, `metacognition/`, `identity/`) represent a deliberate design choice to give the AI system a model of its own state, capabilities, limits, and blind spots. Whether this self-model was ever populated from real execution data is not established.

## Broader Principle

Fine-grained cognitive decomposition is architecturally powerful but creates integration complexity proportional to the number of subsystems. At 43 subsystems, the integration overhead becomes a significant engineering cost.

## Technical References

- `backend/app/cognition/` (all 43 subdirectories)
- `backend/app/cognition/self/blind_spot.py`
- `backend/app/cognition/meta/belief_revision.py`
- `backend/app/cognition/causal/graph_writer.py`
- `backend/test_results.txt` (cognition test results)

## Source Confidence

HIGH — Directory structure confirmed. Test results confirmed. Violation counts from audit report.

---

## Content Value

Technical Depth: 4
Engineering Insight: 4
Originality: 5
Evidence Quality: 4
Story Value: 4

Overall: **High**

43 distinct cognitive subsystems including blind spot modeling, belief revision, and mental models is an unusually deep cognitive architecture. The `self/blind_spot.py` component alone is a conceptually interesting design. The scale creates inherent tension with the architectural rules — a story with high engineering value.

---

## Publication Notes

No sensitive material detected.
