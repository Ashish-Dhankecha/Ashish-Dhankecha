---
title: 'Building a Memory Management Unit for AI: The CMMU Design'
slug: cmmu-cognitive-memory-management-unit
content_type: ARCHITECTURE_DECISION
project: LEO
status: Partial
date: 'null'
topics:
- memory-architecture
- cognitive-os
- ai-infrastructure
- systems-design
evidence_level: high
publishable: true
description: "LEO's CMMU applied OS-style memory management \u2014 address translation,\
  \ protection, coherence, DMA, prefetch, and pressure monitoring \u2014 to AI cognitive\
  \ memory, but 281 violations documented that the rest of the system bypassed it."
---

# Building a Memory Management Unit for AI: The CMMU Design

## Content Type

ARCHITECTURE_DECISION

## Project

LEO — AI Operating Companion

## Date

UNKNOWN (Phase 26.7 label in source; latest startup log dated June 2026)

## Status

Partial — CMMU architecture implemented; application layer did not adopt it

## One-Line Summary

LEO's CMMU applied OS-style memory management — address translation, protection, coherence, DMA, prefetch, and pressure monitoring — to AI cognitive memory, but 281 violations documented that the rest of the system bypassed it.

## Context

In conventional AI systems, memory is accessed directly: a vector database call, a SQL query, a Redis cache lookup. Each component manages its own storage access pattern.

LEO's architecture specified that no component was permitted to access storage directly. All memory operations had to flow through the CMMU. This was a formal architectural rule in `docs/06_DEPENDENCY_RULES.md`:

> **CMMU owns all data and memory access operations.**

## The Question

Can OS-style memory management concepts (address translation, memory tiers, protection, DMA, prefetch, garbage collection, cache coherence) be applied to AI cognitive memory (working, episodic, semantic)?

## Initial Approach

The CMMU was implemented as `CognitiveMemoryManagementUnit` in `backend/app/cognition/kernel/memory/core.py`, composed of 17 specialized components:

| Component | OS Analog |
|-----------|-----------|
| `MemoryAddressTranslator` | MMU page table |
| `MemoryAllocator` | physical memory allocator |
| `MemoryProtectionManager` | page protection flags |
| `MemoryHierarchyManager` | tier management |
| `SemanticSegmentManager` | segment table |
| `SemanticPagingManager` | paging with event integration |
| `PromotionManager` | tier promotion/demotion |
| `CacheCoherenceManager` | multi-writer coherence locking |
| `MemoryPressureManager` | pressure detection |
| `MemoryPrefetchEngine` | predictive prefetch |
| `MemoryBusController` | arbitration + bandwidth throttling |
| `MemoryBandwidthManager` | bandwidth token bucket |
| `DMATransferManager` | background async transfers |
| `SharedContextBufferManager` | shared segment |

The memory bus (`memory/bus.py`) implemented read/write operations with:
1. Permission validation before any operation
2. Async bandwidth throttling (acquire/release)
3. Cache coherence exclusive write locks
4. Address translation to physical tier
5. Hierarchy registration
6. Cache invalidation after write
7. Event publication for observability

The four memory tiers: **Working Memory → Recent Memory → Episodic Memory → Semantic Memory**

Under memory pressure, the CMMU automatically triggered DMA demotions from Execution segment to Episodic tier (`core.py` lines 79-86).

## What Happened

The CMMU was architecturally complete. However, the Phase 28.X.2 violation report (`phase_28_x_2_violation_report.md`) documented 281 violations where components bypassed the CMMU:

- **248 violations**: Direct PostgreSQL/SQLAlchemy `Session` access
- **16 violations**: Direct Neo4j graph queries
- **3 violations**: Direct Redis cache initialization

The violations spanned every major module: cognition subsystems, proactive engines, API routers, engineering services, communication handlers, and the kernel repository itself (V001-V008 are kernel-layer violations).

Importantly, the `MemoryBusController._memory_store` is an in-memory Python `dict` — the CMMU had not yet implemented real storage backends (PostgreSQL/Neo4j/Redis). The application code bypassing it was reaching real databases directly.

## Evidence

- `backend/app/cognition/kernel/memory/core.py` — CMMU with 17 components
- `backend/app/cognition/kernel/memory/bus.py` — bus with protection, bandwidth, coherence
- `docs/12_MEMORY_ARCHITECTURE.md` — four-tier memory model
- `docs/06_DEPENDENCY_RULES.md` — "CMMU owns all data and memory access operations"
- `phase_28_x_2_violation_report.md` — V001-V281: 281 violations

## Diagnosis

**Established:**
The CMMU is architecturally complete and internally functional. The bus correctly implements protection, coherence, and bandwidth. DMA demotions are wired to memory pressure events.

**Likely:**
The CMMU was built as a forward-looking architecture target. Its internal `_memory_store` dict means the real storage backends were not yet wired. A complete migration would require: (a) migrating application code to CMMU APIs, and (b) implementing CMMU physical storage backends.

**Unknown:**
Whether any plan existed to implement the CMMU's physical storage driver layer.

## What Changed

No documented corrective change was found for the 281 violations.

## What I Learned

Building a gatekeeper abstraction for an existing codebase requires the gatekeeper to be built first, before any code that needs to use it. When the gatekeeper is built after, two migration problems must be solved simultaneously: migrating callers to use the new API, and implementing the API's physical backends.

The violation report covering 281 unique violations across essentially every module indicates the CMMU constraint was architecturally correct but practically impossible to enforce retroactively at this scale without a dedicated migration effort.

## What I Would Do Differently

**Hindsight observation:** The database access pattern (SQLAlchemy `Session` in every repository) was the natural starting point. Redirecting that through a CMMU would have been straightforward at project inception. At 281 violations, retroactive migration is a substantial engineering project.

## Broader Principle

In any system with a "single gatekeeper" architecture principle, the gatekeeper must be the first dependency written, not a later refactor. Every feature added before the gatekeeper is another violation to fix.

## Technical References

- `backend/app/cognition/kernel/memory/core.py`
- `backend/app/cognition/kernel/memory/bus.py`
- `backend/app/cognition/kernel/memory/api.py`
- `docs/12_MEMORY_ARCHITECTURE.md`
- `docs/06_DEPENDENCY_RULES.md`
- `phase_28_x_2_violation_report.md`

## Source Confidence

HIGH — CMMU files exist and are complete. Violation report is a primary document with 281 enumerated instances.

---

## Content Value

Technical Depth: 5
Engineering Insight: 5
Originality: 5
Evidence Quality: 5
Story Value: 4

Overall: **High**

Applying hardware MMU semantics (DMA, coherence, address translation, paging) to AI cognitive memory is genuinely unusual. The 281-violation gap provides specific, countable evidence for a high-value engineering lesson.

---

## Publication Notes

No sensitive material detected.
