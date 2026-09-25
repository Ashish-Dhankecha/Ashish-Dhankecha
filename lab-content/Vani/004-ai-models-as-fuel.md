---
title: 'AI Models Are Fuel, Not Architecture: The Model-Independent Cognitive Design'
slug: ai-models-as-fuel
content_type: ARCHITECTURE_DECISION
project: VANI
status: "Canonical \u2014 July 2026"
date: 2026-07
topics:
- ai-architecture
- llm-integration
- model-independence
- cognitive-systems
- provider-abstraction
evidence_level: high
publishable: true
description: VANI's AI strategy separates cognitive identity (stored in data) from
  computational substrate (AI models), so that any model can be swapped without losing
  personality, memory, knowledge, or behavioral continuity.
---

# AI Models Are Fuel, Not Architecture: The Model-Independent Cognitive Design

## Content Type

ARCHITECTURE DECISION

## Project

VANI (Cognitive Operating System)

## Date

July 2026

## Status

Canonical — governed by `AI_MODELS.md` (66,382 bytes; 1,281 lines) marked CANONICAL

## One-Line Summary

VANI's AI strategy separates cognitive identity (stored in data) from computational substrate (AI models), so that any model can be swapped without losing personality, memory, knowledge, or behavioral continuity.

## Context

The AI strategy document opens with: "AI models are fuel. The architecture is the engine." This framing exists because the project has a 50-year horizon — during which the models available today will be replaced dozens of times. Any architecture that stores intelligence in model weights would lose that intelligence with each replacement.

## The Question

How do you build a personal AI system designed to last 50 years when the models available today will be obsolete within 5?

## Initial Approach

The separation principle is documented explicitly:

| Function | Where Intelligence Lives |
|----------|--------------------------|
| Personality | Data (PCM + procedural memory) + prompt construction |
| Reasoning | Architecture (strategy selection) + model (computation) |
| Knowledge | Data (knowledge graph + semantic memory) |
| Memory | Data (event store + episodic memory) |
| Planning | Architecture (goal system) + model (plan generation) |

"The model provides computation. The architecture provides intelligence. The data provides continuity."

## What Happened

This separation was implemented through three mechanisms:

**1. Provider abstraction via port contract:**
The architecture defines a typed Python protocol interface for AI access:
```python
class AIPort(Protocol):
    async def complete(self, request: CompletionRequest) -> CompletionResponse: ...
    async def embed(self, texts: list[str]) -> list[list[float]]: ...
    def capabilities(self) -> ProviderCapabilities: ...
```
The cognitive core calls this interface. The identity of the underlying model (Llama 3, GPT-4, Gemini, Claude) is hidden behind it.

**2. Data-over-weights principle:**
No fine-tuning during Phases 1–5. Personalization is achieved through PCM (Procedural Cognitive Memory) and retrieval-augmented context, not model weight modification. When the model is replaced, personality persists because it lives in data.

**3. Model replacement strategy:**
A documented process: evaluate new model → create adapter or update config → dual-run for 1 week (both models producing responses) → compare quality → switch. Expected replacement frequency: every 3–12 months for cloud providers, every 6–18 months for local models.

**Current local model recommendations (as of July 2026 strategy document):**

| Use Case | Model | VRAM |
|----------|-------|------|
| General conversation | Llama 3 8B Q4_K_M | ~5.5 GB |
| Fast responses | Phi-4 Mini 3.8B Q4 | ~3.5 GB |
| Embeddings | all-MiniLM-L6-v2 | CPU |
| Speech | Whisper large-v3-turbo | ~1.5 GB |

## Evidence

- `docs/architecture/AI_MODELS.md` — Section 1 (AI Philosophy), Section 3 (Capability Matrix), Section 23 (Provider Independence Strategy)
- `docs/architecture/AI_MODELS.md` — The "Separation Principle" table (lines 64–82)
- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 4.3 (Provider Abstraction) with `AIPort` protocol definition
- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 4.11 (Fine-Tuning Strategy): "Do NOT fine-tune during Phases 1–5"
- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 4.12 (Model Replacement Strategy)
- `docs/architecture/FOUNDATION.md` — Law 9: "Models Are Tools, Not Architecture"

## Diagnosis

**Established:**
The separation of cognitive identity (data) from cognitive computation (models) is a core, explicitly stated architectural invariant. It is backed by Foundation Law 9 and the entire AI_MODELS.md document.

**Established:**
The practical implementation — port contracts, no fine-tuning, model replacement process — is documented in detail with specific technology recommendations.

**Established:**
The vLLM rejection is relevant here: "vLLM is designed for multi-user, high-throughput production serving with dedicated GPU infrastructure. VANI is a single-user system. vLLM's PagedAttention and continuous batching are overkill. It adds Python complexity and NVIDIA-only dependency."

**Established:**
LangChain is explicitly rejected: "Rapid abstraction churn, heavy dependencies, abstractions that leak. Direct API calls + custom contracts are more maintainable long-term."

**Unknown:**
How well the PCM-based personalization (personality stored in data rather than weights) actually performs compared to fine-tuned models. This is a design hypothesis not yet tested in production.

## What Changed

The fine-tuning strategy was changed: it was considered and explicitly deferred ("Do NOT fine-tune during Phases 1–5"). This is a deviation from an approach many personal AI projects use — fine-tuning on personal data to create a "personalized" model.

## What I Learned

The question "where does intelligence live?" is architectural, not technical. If the answer is "in the model weights," you've created a system that cannot be upgraded without losing its identity. If the answer is "in the data and architecture," every model replacement is a pure upgrade — better computation, zero data loss.

The inverse implication: embeddings are treated as cache (fully regenerable from source data), not as a source of truth. Replacing the embedding model means re-generating all embeddings — which is expensive but safe.

## What I Would Do Differently

**Observation:** The port contract approach is elegant in theory. In practice, provider APIs differ significantly (context window size, tool calling conventions, streaming behavior, structured output support). The contract must either expose lowest-common-denominator capability or dynamically expose capabilities — neither is free of complexity. The `ProviderCapabilities` return value in the protocol is a hint that this was anticipated.

**Unknown:** Whether the PCM + retrieval approach to personalization actually achieves what fine-tuning would achieve in terms of consistent personality expression across different models. This is the key hypothesis to test in Phase 3 (MVV).

## Broader Principle

For any AI system with a multi-year lifespan, the question is not "which model is best?" but "how do I build a system that gets better as models improve, without losing continuity?" The answer is to store continuity in data and treat models as interchangeable compute units. This principle applies beyond personal AI — to any system where the underlying AI component will change over its operational lifetime.

## Technical References

- `docs/architecture/AI_MODELS.md` — Full AI strategy (1,281 lines; CANONICAL)
- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 4 (AI Technology Stack)
- `docs/architecture/FOUNDATION.md` — Law 9
- `docs/architecture/AI_MODELS.md` — Section 19 (Fine-Tuning Strategy)
- `docs/architecture/AI_MODELS.md` — Section 22 (Model Upgrade Strategy)
- `docs/architecture/AI_MODELS.md` — Section 23 (Provider Independence Strategy)

## Source Confidence

HIGH

The AI strategy is detailed (1,281 lines), explicitly marked canonical, and internally consistent with the Foundation laws. The `AIPort` protocol code example is concrete.

---

## Content Value

Technical Depth: 5/5
Engineering Insight: 5/5
Originality: 5/5
Evidence Quality: 5/5
Story Value: 4/5

Overall: **High**

This is the strongest content piece in the inventory. "AI models are fuel, not architecture" is a concrete, quotable principle with significant engineering content behind it. The fine-tuning rejection and the "personality lives in data" argument are specific, testable design decisions. The 50-year model replacement horizon makes this immediately relevant to anyone building AI infrastructure.

---

## Publication Notes

No sensitive material. The AIPort protocol code is from the architecture document, not from secret implementation. Safe to publish.
