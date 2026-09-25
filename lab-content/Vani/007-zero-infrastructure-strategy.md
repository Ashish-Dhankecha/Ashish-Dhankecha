---
title: 'Zero Infrastructure: Designing a 50-Year Personal AI with 15 Dependencies'
slug: zero-infrastructure-technology-strategy
content_type: ARCHITECTURE_DECISION
project: VANI
status: "Canonical \u2014 July 2026"
date: 2026-07
topics:
- technology-strategy
- infrastructure
- longevity
- dependency-management
- sqlite
evidence_level: high
publishable: true
description: "VANI's entire persistent state lives in one directory of SQLite files\
  \ and YAML configs, targeting 15 total external dependencies after 9 phases \u2014\
  \ because every additional dependency is a 50-year maintenance commitment."
---

# Zero Infrastructure: Designing a 50-Year Personal AI with 15 Dependencies

## Content Type

ARCHITECTURE DECISION

## Project

VANI (Cognitive Operating System)

## Date

July 2026

## Status

Canonical — TECHNOLOGY_STRATEGY.md

## One-Line Summary

VANI's entire persistent state lives in one directory of SQLite files and YAML configs, targeting 15 total external dependencies after 9 phases — because every additional dependency is a 50-year maintenance commitment.

## Context

VANI is designed for a single person's lifetime. The Technology Strategy document (62,200 bytes; 1,093 lines) was prepared in July 2026 with a "50-year horizon" and a January 2027 review date.

The guiding principle: "The best technology strategy for a 50-year project is the one with the fewest technologies. Every dependency is a liability. Every server is a maintenance burden. Every framework is a future migration."

## The Question

What technology stack should a personal AI system use if it is designed to operate for 50 years with a single developer?

## Initial Approach

The strategy defines eight guiding principles before listing any technologies:

- P1: Longevity Over Novelty (prefer 20+ year track record)
- P2: Embedded Over Server (no separate server processes)
- P3: Single-File Over Distributed
- P4: Open Format Over Proprietary
- P5: Replaceable Over Optimized
- P6: Local-First Over Cloud-First
- P7: Zero Infrastructure (no Docker, Kubernetes, Redis, message brokers)
- P8: Hardware Portability (x86 and ARM, Linux/macOS/Windows)

A 7-question framework is used before adopting any technology: Can it be embedded? Is it open source? Has it existed 5+ years? Can a single person maintain it? Is its data format open? Can it be replaced in <2 weeks? Does it have an active community?

## What Happened

The resulting technology decisions:

**Primary database:** SQLite for all transactional storage (events, episodic memory, PCM, configuration, conversation history). "26+ year track record. Embedded. Zero-config. Single-file. Cross-platform. Most tested database in history. Public domain."

**Analytical:** DuckDB (Phase 5+, columnar queries over large datasets). "Younger than SQLite (~5 years). Not suited for transactional workloads."

**Vector search:** sqlite-vec (SQLite extension). Same file, same process, zero infrastructure. "Less performant than dedicated vector databases at scale. Limited to ~1M vectors."

**Graph storage:** SQLite property graph tables (nodes + edges). Not a dedicated graph database.

**Cache:** In-process Python dicts only. No Redis, no Memcached.

**Event store:** Append-only SQLite table with JSON content. No Kafka, no RabbitMQ.

**AI inference:** llama.cpp (local) + cloud API adapters (remote). No vLLM, no managed inference services.

**Final state after all phases:**
> "VANI's entire persistent state lives in one directory containing SQLite files, YAML configs, and document files. It can be backed up by copying a directory. It can be moved between machines by copying a directory. No servers. No containers. No infrastructure."

**Technology count projection:**

| Phase | Total Technologies |
|-------|-------------------|
| 1 | ~8 |
| 3 (MVV) | ~10 |
| 9 | ~15 |

## Evidence

- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Sections 1–3 (guiding principles, methodology, hardware tiers)
- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 5.8 "Storage Technology Summary" (the all-SQLite table)
- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 12 "Technology Roadmap" (15 dependencies after 9 phases)
- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 19 "Technologies Explicitly Rejected" (30+ technologies listed)
- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 20 "Final Recommendations" (tech stack diagram)
- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 11 "Performance Targets" (latency targets)

## Diagnosis

**Established:**
The zero-infrastructure principle is consistently applied. Every rejected technology is explicitly explained with the specific principle it violates.

**Established:**
Performance targets exist and are documented: memory retrieval < 100ms, PCM query < 20ms, event store write < 10ms, cold start < 5s. These are reasonable targets for SQLite on modern hardware.

**Established:**
Data volume projections are documented: ~50 GB total after 50 years (text-only interactions). This is explicitly within single-machine, single-file capacity.

**Observation:**
The strategy acknowledges what it does NOT optimize for: "Maximum performance — Python is not the fastest language; SQLite is not the fastest database. But they are fast enough for a single-user system." This is an honest tradeoff acknowledgment.

**Observation:**
The "annual migration fire drill" is a notable operational procedure: every year, export all cognitive data to JSON Lines, set up a fresh VANI instance, import all data, run verification queries. This tests the data portability assumption annually.

## What Changed

The graph database decision changed: earlier architecture documents recommended Neo4j or Kuzu; the canonical strategy rejected both. (Documented as "Conflict with prior architecture documents" in Section 5.5.)

## What I Learned

1. **Dependencies compound over time** — 15 external dependencies after 9 phases is an unusual level of constraint. The explicit framing of "every additional dependency is a 50-year maintenance commitment" changes how you evaluate libraries.

2. **Data portability must be tested** — The annual fire drill (export → fresh install → import → verify) is a specific, actionable implementation of the replaceability principle. Most projects never test their own data portability until they need it in an emergency.

3. **Longevity requires boring technology** — SQLite (2000), PostgreSQL (1996), Python (1991) have survived because they solved real problems. The strategy explicitly uses 20+ year track records as a selection criterion.

## What I Would Do Differently

**Observation:** The "zero infrastructure" principle creates a constraint: VANI must run as a single Python process. But the Architecture documents describe VANI as a multi-service system with independent subsystems, kernel orchestration, and event-driven communication. Running all of this in one process is a significant engineering challenge that hasn't yet been fully exercised in production. The tension between "multi-service OS architecture" and "single-process deployment" will become apparent when cognitive services are implemented.

## Broader Principle

For single-user systems with a long horizon, the right question is not "what can this technology do?" but "what happens to my data in 20 years if this technology disappears?" Technologies that store data in open, portable formats (SQLite, JSON, CSV, Markdown) are intrinsically more appropriate than technologies that store data in proprietary formats, even if they offer better performance today.

## Technical References

- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Full 1,093-line technology strategy
- Section 2.1 — 7-question technology evaluation framework
- Section 5.8 — Storage technology summary table
- Section 11.1 — Performance targets
- Section 11.3 — Memory growth projections (Year 1 to Year 50)
- Section 19 — 30+ explicitly rejected technologies

## Source Confidence

HIGH

The technology strategy is detailed, internally consistent, and explicitly justified. The storage technology summary table and rejected technologies section are comprehensive. The "50 GB lifetime" projection with explicit assumptions (3–5 conversations/day, ~500 tokens/conversation) is quantitatively grounded.

---

## Content Value

Technical Depth: 4/5
Engineering Insight: 5/5
Originality: 4/5
Evidence Quality: 5/5
Story Value: 4/5

Overall: **High**

"15 external dependencies after 9 phases" is a compelling, verifiable claim. The all-SQLite storage architecture with zero server processes is unusual enough to be interesting. The annual migration fire drill is a concrete operational practice worth documenting. The "boring technology is better" argument is made rigorously with specific examples.

---

## Publication Notes

No sensitive material. The technology strategy references a file path on a Windows system (`C:\Users\ashis\Desktop\...` in companion document link) — this reveals a Windows development environment and a username. The path is in a markdown link inside the strategy document, not sensitive data itself. Safe to publish without including that specific path reference.
