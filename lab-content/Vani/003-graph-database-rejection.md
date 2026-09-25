---
title: Why I Rejected Every Graph Database and Used SQLite Instead
slug: graph-database-rejection-sqlite
content_type: ARCHITECTURE_DECISION
project: VANI
status: "Decided \u2014 July 2026"
date: 2026-07
topics:
- databases
- graph-databases
- sqlite
- knowledge-graphs
- technology-selection
evidence_level: high
publishable: true
description: "After evaluating Kuzu, Neo4j, Qdrant, and other specialized databases,\
  \ VANI uses SQLite with property graph tables (nodes + edges) for its knowledge\
  \ graph \u2014 because the graph will contain ~10K\u2013100K nodes across decades,\
  \ which SQLite handles trivially with zero operational overhead."
---

# Why I Rejected Every Graph Database and Used SQLite Instead

## Content Type

ARCHITECTURE DECISION

## Project

VANI (Cognitive Operating System)

## Date

July 2026 (per TECHNOLOGY_STRATEGY.md preparation date)

## Status

Decided — documented as canonical in TECHNOLOGY_STRATEGY.md

## One-Line Summary

After evaluating Kuzu, Neo4j, Qdrant, and other specialized databases, VANI uses SQLite with property graph tables (nodes + edges) for its knowledge graph — because the graph will contain ~10K–100K nodes across decades, which SQLite handles trivially with zero operational overhead.

## Context

VANI needs a knowledge graph to represent entities, relationships, and properties: people, projects, decisions, concepts, facts, books, experiences — and the typed edges connecting them.

The technology strategy document notes explicitly: "**Conflict with prior architecture documents**: Multiple documents recommended a dedicated graph database (Neo4j, Kuzu). After evaluation: **No dedicated graph database for VANI.**"

This signals that the graph database decision was revisited and reversed.

## The Question

What technology should VANI use for its knowledge graph, and does it need a dedicated graph database?

## Initial Approach

Prior architecture documents (referenced but not present in the current repository) had recommended a dedicated graph database — either Neo4j or Kuzu. This was apparently the initial assumption.

## What Happened

The technology evaluation explicitly rejected both:

**Kuzu rejected — orphan risk:**
> "Kuzu was archived after Apple acquisition (October 2025). Community forks (LadybugDB) lack stability guarantees."

**Neo4j rejected — infrastructure overhead:**
> "Neo4j requires a JVM server process, is licensed under GPL (Community) or commercial, and is architecturally overkill for a single-user knowledge graph of ~100K nodes."

**Qdrant, Milvus, Weaviate rejected — separate server processes:**
> "All require separate server processes. Qdrant is excellent but requires Docker or a separate binary. For a single-user system generating <1M vectors, sqlite-vec's simplicity and zero-ops profile are decisive."

**ChromaDB rejected — abstraction without value:**
> "ChromaDB is a higher-level Python library, not a database. It wraps other storage backends. Adding it creates an abstraction without adding capability that sqlite-vec + custom code doesn't provide."

**Decision:** Implement a property graph using two SQLite tables (nodes table + edges table) with JSON properties. Use recursive CTEs for graph traversal. Implement spreading activation at the application layer.

The projected data volume is explicit: "~10K–100K nodes after decades." SQLite handles this with trivial performance.

## Evidence

- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 5.5 "Graph Storage: SQLite with Property Graph Pattern" (lines 435–454)
- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 19.1 "Technologies Explicitly Rejected" — Neo4j, Kuzu, Qdrant entries
- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 5.4 "Vector Search: sqlite-vec" (rejection of Qdrant, Milvus, Weaviate)
- The Kuzu acquisition event (October 2025) is cited as a discovery that changed the decision

## Diagnosis

**Established:**
The decision to use SQLite property graph tables is explicit, canonical, and documented as superseding previous architecture documents that had recommended dedicated graph databases.

**Established:**
The Kuzu rejection was triggered by an external event (Apple acquisition, October 2025) that created orphan risk, demonstrating how technology lifecycle events influenced this architectural decision.

**Established:**
The quantitative argument is documented: ~100K nodes over decades is within SQLite's trivial capacity. The 7-question technology evaluation framework (embedded in the strategy document) systematically rules out server-based databases.

**Unknown:**
What the "prior architecture documents" specifically recommended, and when the switch from graph-database-recommended to SQLite-only occurred. Those documents are not in the current repository.

## What Changed

The architecture shifted from "dedicated graph database" (recommended in an earlier iteration) to "SQLite property graph tables" (current canonical decision).

## What I Learned

Three distinct lessons emerge:

1. **Technology orphan risk is real** — Kuzu's acquisition by Apple in October 2025 (mid-design) rendered a previously promising recommendation invalid. Technology selection for a 50-year project must account for the possibility that any technology could be abandoned.

2. **Scale must match the problem** — 100,000 graph nodes is not "big data." It is a number SQLite handles with two tables and recursive CTEs. Assuming you need a specialized database because graphs are involved is a category error.

3. **Infrastructure footprint compounds over decades** — every additional server process, daemon, or container is a decades-long maintenance commitment. The strategy document explicitly states: "Every dependency is a 50-year maintenance commitment."

## What I Would Do Differently

**Observation:** The strategy is sound for current projected scale. The acknowledged limitation is: "No native graph query language (Cypher/SPARQL). Complex traversals require application code." This may become a real friction point when implementing reasoning over the knowledge graph. The upgrade path (extract to dedicated graph DB if queries become a bottleneck) is documented but not yet tested.

## Broader Principle

For single-user, single-machine systems with moderate data volumes, the correct database technology is usually the one with the lowest operational footprint that handles the volume, not the most specialized tool for the data model. SQLite's property graph via two tables is architecturally ugly compared to Cypher, but it is a file you can copy, backup, and migrate — while Neo4j requires a JVM server, authentication configuration, and backup tooling.

## Technical References

- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 5.5 (property graph), 5.4 (sqlite-vec), 19.1 (rejected technologies)
- The 7-question technology framework (Section 2.1)
- Performance targets: memory retrieval < 100ms, PCM query < 20ms (Section 11.1)
- Storage technology summary table (Section 5.8)

## Source Confidence

HIGH

The rejection decisions are explicitly documented in the canonical Technology Strategy document, including the specific reasons for each rejection (Kuzu: orphan risk; Neo4j: JVM server; Qdrant: separate process). The conflict with prior architecture documents is explicitly acknowledged.

---

## Content Value

Technical Depth: 4/5
Engineering Insight: 5/5
Originality: 4/5
Evidence Quality: 5/5
Story Value: 4/5

Overall: **High**

The Kuzu acquisition event mid-design is an authentic external trigger that changed the architecture. The systematic rejection of every graph database for a project explicitly requiring a knowledge graph is counter-intuitive and demonstrates principled technology selection. The "100K nodes is not big data" argument is a concrete, reusable engineering lesson.

---

## Publication Notes

No sensitive material. Safe to publish.
