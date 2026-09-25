---
title: Removing Ollama After 71 of 82 Soak Failures Were 'Timeout Connecting to Ollama'
slug: ollama-removal-gemini-migration-ashi
content_type: ARCHITECTURE_DECISION
project: Ashi
status: Implemented
date: '2026-07-22'
topics:
- architecture
- dependencies
- local-llm
- cloud-migration
- reliability
evidence_level: high
publishable: true
description: "Ollama was removed entirely (no compatibility layer, no deprecated code\
  \ path) after a 12-hour soak certification run revealed it was the cause of 86.6%\
  \ of all turn failures \u2014 not by redesigning the embedding layer, but by routing\
  \ it through the existing `LiteLLMProvider` abstraction to Gemini."
---

# Removing Ollama After 71 of 82 Soak Failures Were "Timeout Connecting to Ollama"

## Content Type

ARCHITECTURAL DECISION

## Project

Ashi — Personal Cognitive Operating System

## Date

2026-07-22

## Status

Implemented

## One-Line Summary

Ollama was removed entirely (no compatibility layer, no deprecated code path) after a 12-hour soak certification run revealed it was the cause of 86.6% of all turn failures — not by redesigning the embedding layer, but by routing it through the existing `LiteLLMProvider` abstraction to Gemini.

## Context

Ashi used Ollama as its local embedding provider (`nomic-embed-text`). `MemoryRecallContributor` and `MemoryEncodingContributor` called it on every turn to encode and search memory. A 12-hour M2.7.3 soak certification run (`reports/soak/m273-certification-12h/`) completed with 82 failed turns. Of those, **71 were `TimeoutError: Timeout connecting to Ollama`** — the local process repeatedly failing under sustained load.

The request was explicit: "permanent architectural migration off Ollama entirely — no compatibility layer, no deprecated code path."

## The Question

How do you remove a dependency that runs on every turn without breaking the cognitive layer that depends on it?

## Initial Approach

The existing provider abstraction (`BaseProvider`/`LiteLLMProvider`) was already present for LLM calls. The question was whether it could serve the embedding role without structural changes.

## What Happened

**What Ollama was doing:**
1. `GENERAL_CHAT` backup provider
2. `TaskClass.EMBEDDING` — the embedding provider on every turn

**What replaced it:**
1. `GENERAL_CHAT` backup: `openrouter` (restored to its pre-ADR-0026 configuration — already wired, provides real failover from a different vendor, unlike "Gemini backs up Gemini")
2. `TaskClass.EMBEDDING`: `gemini-embedding-001` through the same `LiteLLMProvider` instance already registered as `"gemini"` for chat — no new provider class, one additional `ModelProfile`

The `LiteLLMProvider.embed()` method had a latent gap: it never vendor-qualified its model string (didn't call `_qualify_model()`), while `chat()`/`stream_chat()` both did. This was harmless while EMBEDDING routed to Ollama (which has no litellm vendor-prefix concept), but would have caused a silent misroute to Vertex AI's ADC fallback instead of the Google AI Studio API-key path for any cloud embedding model. Found and fixed during wiring.

**What was deleted — entirely:**
- `packages/ashi-llm/src/ashi/llm/providers/ollama/` — the whole subpackage
- `providers/local.py` — `LocalProvider`, which had no other subclass anywhere
- `bootstrap.py`'s `verify_ollama_models` pre-flight check, Ollama provider construction, dynamic model-discovery loop
- `docker-compose.yml`'s `ollama` service/volume
- `.env`/`.env.example`'s `OLLAMA_*` vars
- `.gitignore`'s `.ollama/` entry
- `TaskClass.LOCAL_CHAT` enum member entirely (could not be left declared-but-unrouted: `test_routing_configuration` asserts every `TaskClass` has a routing entry — a real invariant this codebase already enforces)

**Highest-risk follow-up, explicitly not resolved:**
`SemanticRanker.min_similarity=0.55` was calibrated empirically against `nomic-embed-text` cosine-similarity distributions. Gemini's embedding space has a different distribution. The threshold must be re-benchmarked against live Gemini embeddings. Shipping the old threshold risks silently worse recall. Flagged explicitly so it would not be skipped.

## Evidence

- `reports/soak/m273-certification-12h/` — 71 of 82 failures with `TimeoutError: Timeout connecting to Ollama`
- `docs/decisions/0041-ollama-removal-gemini-migration.md`
- `packages/ashi-llm/src/ashi/llm/providers/` — before/after directory structure
- `packages/ashi-llm/src/ashi/llm/providers/litellm/provider.py` — `_qualify_model()` fix

## Diagnosis

**Established:**

Ollama is a local daemon with its own startup overhead, model-registry conventions, process-RSS characteristics, and a default setup that includes internet-facing model-pull paths. Under sustained load from a 12-hour soak, it repeatedly failed to handle the connection volume.

The solution was not to make Ollama more reliable — it was to eliminate the only source of `TimeoutError: Timeout connecting to Ollama` from the codebase entirely by ensuring `OllamaClient` no longer exists.

**Consequence of "no compatibility layer":**
`uv run ashi` and most of the test suite (anything using the real `bootstrap()` via the `ashi_app` fixture) now require a live `GEMINI_API_KEY`. This was the explicit intent — not an oversight.

## What Changed

The `OllamaClient` class no longer exists. Neither does `OllamaProvider`, `LocalProvider`, or `verify_ollama_models`. Every path that previously reached Ollama now either goes through `LiteLLMProvider` or doesn't exist. The failure mode "Timeout connecting to Ollama" is structurally impossible — the code that would produce it is gone.

Consequence: the entire class of local-process failure (timeouts, startup failures, model-download failures, process-RSS spikes) is no longer possible for the chat and embedding paths.

## What I Learned

The framing "should we fix it or replace it?" is a false dichotomy when the thing being considered for repair has a reliability track record expressed as "86.6% of failures in a 12-hour run." That number reframes the question: the question is not "can Ollama be made reliable" but "what is the cost of this dependency vs. the alternatives."

The existing provider abstraction (`BaseProvider`/`LiteLLMProvider`) was designed to make this class of swap possible without touching business logic. The migration was a configuration and routing change, not a cognitive-layer change.

## What I Would Do Differently

The `min_similarity` calibration flag at the end of the ADR was the right move: explicitly documenting a known post-migration correctness risk that requires real data to validate, rather than silently shipping unchanged parameters. Every provider migration that changes the embedding model should flag this.

## Broader Principle

A local daemon dependency for a feature that runs on every turn has a failure-mode surface that scales with request volume: the more the system is used, the more likely a timeout becomes. Cloud API rate limits scale differently (they're a quota problem, not a reliability problem). For always-on, high-frequency embedding calls, a cloud API with a stable, maintained `litellm` integration is more appropriate than a locally-managed daemon — if the credential management is sound.

Removing a dependency entirely is cleaner than adding a compatibility layer to a dependency you no longer want. The compatibility layer extends the maintenance surface; the removal eliminates it.

## Technical References

- `docs/decisions/0041-ollama-removal-gemini-migration.md`
- `packages/ashi-llm/src/ashi/llm/providers/litellm/provider.py`
- `configs/routing.yaml`
- `packages/ashi-memory/src/ashi/memory/retrieval/semantic.py` — `SemanticRanker.min_similarity`
- `reports/soak/m273-certification-12h/`

## Source Confidence

HIGH — the soak failure rate is measured from a real 12-hour run. The code changes are documented in the ADR with specific file paths. The `min_similarity` recalibration gap is an acknowledged open item, not a resolved claim.

---

## Content Value

Technical Depth: 3
Engineering Insight: 4
Originality: 3
Evidence Quality: 5
Story Value: 4

**Overall: Medium-High**

The number — 71 of 82 failures — is a strong anchor for the decision. The story of a dependency creating the dominant failure mode in a 12-hour reliability test, then being removed entirely rather than patched, is a recognizable engineering pattern told concisely with specific data.

---

## Publication Notes

References to Ollama, Gemini, and litellm are to public open-source and API services. No credentials. The `min_similarity` value (0.55) is a configuration parameter with no privacy implications. Safe to publish.
