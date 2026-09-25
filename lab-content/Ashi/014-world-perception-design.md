---
title: 'World Perception at 24 Microseconds: Designing an LLM-Free Ambient Awareness
  Layer'
slug: world-perception-on-turn-path-design-ashi
content_type: TECHNICAL_DESIGN
project: Ashi
status: Implemented and benchmarked
date: '2026-07-27'
topics:
- systems-design
- performance
- context-awareness
- git
- ambient-computing
evidence_level: high
publishable: true
description: "Ashi's world perception layer \u2014 which tracks filesystem, git state,\
  \ and environment across 1,725 resources every 60 seconds \u2014 adds 24 \xB5s to\
  \ the turn-path (a snapshot read) while running the full 574 ms perception pass\
  \ completely off the turn path in the background."
---

# World Perception at 24 Microseconds: Designing an LLM-Free Ambient Awareness Layer

## Content Type

TECHNICAL DESIGN

## Project

Ashi — Personal Cognitive Operating System

## Date

2026-07-27

## Status

Implemented and benchmarked

## One-Line Summary

Ashi's world perception layer — which tracks filesystem, git state, and environment across 1,725 resources every 60 seconds — adds 24 µs to the turn-path (a snapshot read) while running the full 574 ms perception pass completely off the turn path in the background.

## Context

For a personal AI assistant to give contextually aware answers about the user's actual work environment, it needs ambient awareness: what files exist, what's changed recently, what git branch is active, what processes are running. This awareness cannot be computed per-turn (too expensive) and cannot be completely stale (too inaccurate).

Phase X.3 designed and implemented `ashi-perception` — a background perception loop that runs independently of turns and makes its snapshot available to turns with minimal overhead.

## The Question

How do you give an LLM accurate ambient context about the user's environment without adding meaningful latency to every turn?

## Initial Approach

A background task (`PerceptionLoop`) runs every 60 seconds. It executes two sensors: `fs.local` (filesystem scan) and `git.local` (git repository state). The sensors produce a `WorldSnapshot` containing resources and edges. The snapshot is assembled and then atomically swapped into a shared slot that turn-path code reads.

Turn-path code does a single snapshot read (`PerceptionFrame.snapshot()`). The 60-second perception pass executes completely in the background, never blocking a turn.

The design is LLM-free by construction: perception is deterministic, filesystem-based, and produces structured data. No LLM call is made. Every number below is reproducible on demand (no quota spent).

## What Happened

**End-to-end benchmark results:**

| Metric | Value |
|---|---|
| Full perception pass (off-turn-path) | **574 ms p50** per pass |
| ├ `fs.local` sensor | 236 ms |
| ├ `git.local` sensor | 284 ms |
| └ publish (assemble + atomic swap) | 52 ms |
| Turn-path overhead (snapshot read) | **24 µs p50** |
| Snapshot freshness p50 | 30 s (half the 60s interval, as expected) |
| Snapshot freshness p95 | 57 s |
| Memory growth over 10 passes | **+0 resources, +0 edges, +0 bytes** |
| Snapshot size at 1,725 resources | 1.54 MiB |
| CPU share (background loop running) | **1.43% of one core** |
| Git subprocesses per pass | 10 |
| `.git/index` modified by 10 passes | **No** |

**The 24 µs figure is the turn-path cost.** The 574 ms is the background cost, amortized over 60 seconds — meaning it consumes 574/60,000 = 0.96% of real time.

**The `.git/index` finding is load-bearing:**

`git status` normally writes `.git/index` as a side effect, updating the index cache. An ambient loop running `git status` every 60 seconds would fight the user's own editor and IDE for the index lock indefinitely — a real, observed failure mode in other tools. `GIT_OPTIONAL_LOCKS=0` and `--no-optional-locks` prevent this.

The benchmark verifies the outcome directly: the `.git/index` mtime is identical before and after ten full passes. The flag is trusted but the index mtime is verified, not assumed.

**Zero growth:**

The assembler reconciles each new pass against the previous snapshot rather than accumulating. Ten passes over an unchanged tree produce a byte-identical snapshot. "Unbounded growth has been found three times in this codebase (workspace items at 9,266; `touched_file` edges; re-embedding without a ledger) — this is not one of them."

**Staleness is honest:**

The snapshot renders its own age (`observed 12s ago` / `observed 5m ago`). A sensor unheard-from for over 300 s is named in a `possibly out of date` line. The turn tolerates a stale world; it must not misrepresent one.

**A property only end-to-end testing could verify:**

The frame actually survives the real attention competition and reaches the prompt. `PerceptionFrame.snapshot()` is called by the attention framework during normal turn processing — confirmed by live observation. The test harness verified this.

## Evidence

- `reports/x3-step6-perception-bench.json` — 1,725 observations per pass, 10 passes
- `reports/x3-step6-verification.md` — full verification report
- `packages/ashi-perception/src/ashi/perception/` — implementation
- `configs/perception.yaml` — `max_entries: 5000`, 60-second interval
- `apps/ashi/src/ashi/app/attention/frame.py` — turn-path snapshot read

## Diagnosis

**The key architectural separation:**

The expensive perception work (574 ms, 10 git subprocesses) runs entirely in a background asyncio task with its own 60-second schedule. The turn path touches only the already-assembled snapshot via a single read — which is why the turn-path cost is 24 µs and not 574 ms.

The atomic swap (`publish` step, 52 ms) is the one point where background and turn-path intersect. It is structured to be brief and non-blocking: assembly happens in the background, the completed snapshot replaces the previous one atomically, and the turn-path never waits for assembly to complete.

**Why not compute per-turn:**

574 ms would be an unacceptable latency addition on every turn. The acceptable turn-path budget for perception is what a single `dict` read costs — 24 µs.

**Why not cache longer:**

60 seconds already produces a p50 staleness of 30 seconds. For a developer environment where files change on the scale of minutes, this is appropriate. p95 staleness at 57 seconds means the frame is almost always current. Extending to 5 minutes would produce p50 staleness of 2.5 minutes — visibly stale for active development.

## What I Learned

The separation between "background work" and "turn-path cost" must be explicit and enforced by structure, not convention. In Ashi's architecture, the turn path never calls the perception sensors directly — it can only read the published snapshot. If the snapshot is available (it is after the first pass), the turn-path cost is bounded at ~24 µs regardless of how expensive the sensors are.

Index file locking is a real, subtle gotcha with ambient git operations. `GIT_OPTIONAL_LOCKS=0` is the correct mitigation, but it should be verified by measuring the index mtime, not just by trusting the flag. The verification adds almost no overhead and provides direct evidence rather than indirect.

Zero-growth property must be tested by measurement over multiple passes, not assumed from the assembler's design. The design claimed idempotence; the benchmark verified it by showing identical snapshots across 10 passes.

## What I Would Do Differently

The `max_entries: 5000` cap in `configs/perception.yaml` exists to bound the snapshot size but is not exercised in this benchmark (1,725 resources at the Ashi repo). A separate test with a larger directory would verify the cap is enforced. As written, the cap is a documented guard without a test for its activation path.

## Broader Principle

For ambient context in interactive systems, design a two-tier architecture:
1. **Background tier:** expensive perception passes, running on their own schedule, completely off the critical interaction path
2. **Turn-path tier:** reads from the published snapshot, bounded to the cost of a single data structure read

The expensive work amortizes across many turns. The interaction latency budget covers only the cheap read. The key design constraint is that the turn path must never wait for background work to complete — the snapshot must always be readable (possibly stale), never unavailable.

## Technical References

- `packages/ashi-perception/src/ashi/perception/loop.py` — `PerceptionLoop`
- `packages/ashi-perception/src/ashi/perception/sensors/` — `fs.local`, `git.local`
- `packages/ashi-perception/src/ashi/perception/assembler.py` — zero-growth assembly
- `apps/ashi/src/ashi/app/attention/frame.py` — turn-path snapshot read
- `reports/x3-step6-verification.md`
- `configs/perception.yaml`

## Source Confidence

HIGH — all numbers are from a real benchmark run (`reports/x3-step6-perception-bench.json`) against the actual Ashi repository (1,344 files, 328 directories, 50 commits). The index mtime verification was directly observed. The zero-growth property was measured across 10 passes.

---

## Content Value

Technical Depth: 5
Engineering Insight: 4
Originality: 4
Evidence Quality: 5
Story Value: 3

**Overall: High**

The 24 µs vs 574 ms contrast is a strong headline. The git index locking issue (`GIT_OPTIONAL_LOCKS=0`, verified by mtime) is a precise, underappreciated system-level detail. The zero-growth property and how it was measured adds engineering depth. This is a strong technical piece for an audience that builds developer tools or ambient-context systems.

---

## Publication Notes

No credentials or private data. Repository statistics (1,344 files, 50 commits) are about the Ashi project's own development repository, not any user's private repository. Safe to publish.
