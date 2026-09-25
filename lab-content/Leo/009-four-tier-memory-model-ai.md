---
title: 'A Four-Tier Cognitive Memory Model: Working, Episodic, Semantic, and More'
slug: four-tier-cognitive-memory-model
content_type: ARCHITECTURE_DECISION
project: LEO
status: Partial
date: 'null'
topics:
- memory-architecture
- cognitive-ai
- episodic-memory
- semantic-memory
evidence_level: high
publishable: true
description: LEO defined a four-tier cognitive memory model (Working, Recent, Episodic,
  Semantic) with lifecycle operations (promotion, demotion, consolidation, prefetch,
  garbage collection) managed by a dedicated Memory Intelligence subsystem.
---

# A Four-Tier Cognitive Memory Model: Working, Episodic, Semantic, and More

## Content Type

ARCHITECTURE_DECISION

## Project

LEO — AI Operating Companion

## Date

UNKNOWN

## Status

Partial — memory tiers defined and subsystem code implemented; CMMU gateway adoption incomplete

## One-Line Summary

LEO defined a four-tier cognitive memory model (Working, Recent, Episodic, Semantic) with lifecycle operations (promotion, demotion, consolidation, prefetch, garbage collection) managed by a dedicated Memory Intelligence subsystem.

## Context

AI systems have diverse memory needs: short-term context for an ongoing conversation, medium-term recall of recent interactions, long-term storage of specific events, and abstracted knowledge. Most systems handle these ad hoc (context window for short-term, vector database for retrieval). LEO formalized these as distinct tiers with explicit lifecycle rules.

## The Question

What is the right memory architecture for a cognitive AI system that must maintain multiple types of memory across different time horizons with different access patterns?

## Initial Approach

Four memory tiers were defined (`docs/12_MEMORY_ARCHITECTURE.md`):

1. **Working Memory** — ephemeral context for the immediate task or execution graph step; cleared upon task completion
2. **Recent Memory** — short-term chronological history of recent interactions and executions
3. **Episodic Memory** — long-term storage of specific events, tasks, and state snapshots
4. **Semantic Memory** — abstracted, consolidated knowledge and learned facts decoupled from specific episodes

The Memory Intelligence subsystem managed lifecycle transitions:
- **Promotion** — moving frequently accessed or relevant Working/Recent memory into Episodic or Semantic
- **Demotion** — archiving or dropping data from fast memory when relevance decays
- **Prefetch** — proactively loading Semantic or Episodic memory into Working Memory based on predictive context matching
- **Garbage Collection** — reclaiming Working Memory space after graph execution completes
- **Consolidation** — background process extracting semantic meaning from episodic logs to build generalized knowledge

The CMMU's `PromotionManager` and `DMATransferManager` handled the physical tier transitions. Under memory pressure, the CMMU triggered automatic DMA demotions from Execution segment to Episodic tier.

The cognition layer had dedicated subsystems for several of these tiers:
- `backend/app/cognition/episodic/` — episodic memory writer
- `backend/app/cognition/semantic/` — semantic memory synthesizer
- `backend/app/cognition/retrieval/` — retrieval and ranker
- `backend/app/cognition/consolidation/` — consolidation engine
- `backend/app/cognition/memory_merger/` — memory merging and deduplication
- `backend/app/cognition/working_memory/` — working memory manager
- `backend/app/cognition/decay/` — memory decay
- `backend/app/cognition/importance/` — importance scorer

## What Happened

All the tier-specific subsystems were implemented. The test suite confirmed most passing:
- `test_episodic_foundation.py` — passed (reference in backend tests)
- `app/cognition/episodic/tests/test_writer.py ....` — 4/4 passing
- `app/cognition/semantic/tests/test_synthesizer.py ...` — 3/3 passing
- `app/cognition/retrieval/tests/test_retrieval.py ...` — 3/3 passing
- `app/cognition/consolidation/tests/test_consolidation.py ...` — 3/3 passing
- `app/cognition/working_memory/tests/test_working_memory.py ....` — 4/4 passing
- `app/cognition/decay/tests/test_decay.py ....` — 4/4 passing

However, the Phase 28 violation report documented that the cognition layer (which includes all these memory subsystems) had 115 violations of the CMMU rule, meaning these subsystems were accessing storage (PostgreSQL, Neo4j) directly rather than through the CMMU gateway.

Additionally, the `MemoryBusController._memory_store` was an in-memory Python dict, meaning the CMMU's physical storage backends were not yet wired to real databases.

## Evidence

- `docs/12_MEMORY_ARCHITECTURE.md` — four-tier model and lifecycle operations
- `backend/app/cognition/episodic/`, `semantic/`, `retrieval/`, `consolidation/`, `working_memory/`, `decay/`, `importance/` directories — tier-specific implementations
- `backend/test_results.txt` — subsystem test results (all passing)
- `backend/app/cognition/kernel/memory/core.py` — CMMU with `PromotionManager`, `DMATransferManager`
- `phase_28_x_2_violation_report.md` — V091-V205: 115 cognition-layer violations

## Diagnosis

**Established:**
All four memory tiers have dedicated implementation code. Unit tests for each tier pass. The lifecycle operations (promotion, consolidation, decay, importance scoring) have code-level implementations.

**Likely:**
The memory subsystems were built with a direct-database approach (SQLAlchemy) and would need to be migrated to use the CMMU gateway to conform to the architectural intent. The tests pass because they use mocked or in-memory storage — the real integration with PostgreSQL and Neo4j is where the violations exist.

**Unknown:**
Whether the consolidation engine (which builds semantic meaning from episodic logs) was tested with real data or only with mocked responses. Whether the prefetch engine had any predictive accuracy measurement.

## What Changed

No documented corrective change.

## What I Learned

Defining memory tiers explicitly forces decisions that would otherwise be made ad hoc: what is the boundary between Recent and Episodic? When does information promote from Episodic to Semantic? What triggers garbage collection? These are hard questions for any AI system, and making them explicit is valuable even if the implementation is incomplete.

The four-tier model maps reasonably well to human cognitive memory research (working memory, long-term episodic, long-term semantic), which provides a principled foundation for the design choices.

## What I Would Do Differently

**Hindsight observation:** The memory model would benefit from concrete promotion/demotion criteria (e.g., "promote to episodic after 3 accesses in 24 hours; demote from working after task completion"). Without concrete rules, the lifecycle operations are architectural intent without behavioral specification.

## Broader Principle

Formalizing AI memory into distinct tiers with explicit lifecycle rules is a prerequisite for principled memory management. Without explicit tier definitions, memory systems grow organically and become difficult to reason about or optimize.

## Technical References

- `docs/12_MEMORY_ARCHITECTURE.md`
- `backend/app/cognition/episodic/`
- `backend/app/cognition/semantic/`
- `backend/app/cognition/consolidation/`
- `backend/app/cognition/retrieval/`
- `backend/app/cognition/working_memory/`
- `backend/app/cognition/decay/`

## Source Confidence

HIGH — Architecture documented, implementation exists, unit tests pass. Direct database access (violations) confirmed by audit.

---

## Content Value

Technical Depth: 4
Engineering Insight: 4
Originality: 4
Evidence Quality: 4
Story Value: 3

Overall: **High**

Four-tier cognitive memory with explicit lifecycle operations is a sophisticated design. The connection to cognitive science memory models (working/episodic/semantic) is intellectually grounded. The gap between the elegant design and the direct-database implementation is an honest engineering story.

---

## Publication Notes

No sensitive material detected.
