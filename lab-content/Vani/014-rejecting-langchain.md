---
title: 'Rejecting LangChain: Why Direct AI Contracts Are More Maintainable Over Decades'
slug: rejecting-langchain-direct-contracts
content_type: ARCHITECTURE_DECISION
project: VANI
status: "Decided \u2014 July 2026"
date: 2026-07
topics:
- langchain
- ai-frameworks
- vendor-lock-in
- abstractions
- long-term-maintenance
evidence_level: high
publishable: true
description: VANI explicitly rejected LangChain (and similar AI orchestration frameworks)
  in favor of direct API calls through custom port contracts, citing "rapid abstraction
  churn, heavy dependencies, abstractions that leak."
---

# Rejecting LangChain: Why Direct AI Contracts Are More Maintainable Over Decades

## Content Type

ARCHITECTURE DECISION

## Project

VANI (Cognitive Operating System)

## Date

July 2026

## Status

Decided — canonical in TECHNOLOGY_STRATEGY.md (Section 19, Rejected Technologies)

## One-Line Summary

VANI explicitly rejected LangChain (and similar AI orchestration frameworks) in favor of direct API calls through custom port contracts, citing "rapid abstraction churn, heavy dependencies, abstractions that leak."

## Context

By mid-2026, LangChain had become the dominant AI orchestration framework for Python-based AI applications. Most LLM application tutorials use it. Many companies' AI stacks are built on it. For a new AI project, using LangChain would have been the path of least resistance.

VANI's technology strategy chose the opposite path.

## The Question

Should VANI use LangChain (or similar AI framework) for AI orchestration, or implement its own abstraction layer?

## The Decision

From `docs/architecture/TECHNOLOGY_STRATEGY.md`, Section 19.3 (Frameworks Explicitly Rejected):

> **LangChain** — "Rapid abstraction churn, heavy dependencies, abstractions that leak. Direct API calls + custom contracts are more maintainable long-term."

The alternative: every AI capability is accessed through a typed Python Protocol contract defined by VANI's architecture. One adapter per provider. The cognitive core calls the contract, not the framework.

```python
class AIPort(Protocol):
    async def complete(self, request: CompletionRequest) -> CompletionResponse: ...
    async def embed(self, texts: list[str]) -> list[list[float]]: ...
    def capabilities(self) -> ProviderCapabilities: ...
```

## The Three Rejection Reasons

**1. Rapid abstraction churn**

LangChain's API surface changed substantially between versions 0.0.x, 0.1.x, 0.2.x, and 0.3.x — breaking changes within months. For a 50-year project, adopting a framework that requires significant code changes every 6 months creates a compounding maintenance burden.

**2. Heavy dependencies**

LangChain's dependency tree is substantial. Each added dependency is a potential security vulnerability, a licensing concern, and a future upgrade burden. VANI's constraint of 15 total external dependencies (across 9 phases) is fundamentally incompatible with adopting a framework with dozens of transitive dependencies.

**3. Abstractions that leak**

LangChain's abstractions expose provider-specific behaviors through their "universal" interface — tool calling conventions, streaming behaviors, context window handling, and structured output vary significantly between providers. The abstraction doesn't fully hide the differences; you still end up writing provider-specific code.

## What VANI Uses Instead

The `AIPort` protocol is the only AI integration point in VANI's cognitive core. Each provider implementation:
- Implements `AIPort`
- Maps provider-specific API calls to `CompletionRequest`/`CompletionResponse`
- Handles provider-specific errors internally
- Exposes `ProviderCapabilities` (what this provider can do)

The cognitive architecture never calls `openai.ChatCompletion.create()` directly. It calls `ai_port.complete(request)`.

## Evidence

- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 19.3 "Frameworks Explicitly Rejected" (LangChain entry)
- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 4.3 "Provider Abstraction" (AIPort protocol definition)
- `docs/architecture/AI_MODELS.md` — P3 (Contracts Over APIs): "Every AI capability is accessed through a port contract that defines input/output without specifying the provider. The cognitive core asks 'reason about this situation' — not 'call GPT-4.'"

## Diagnosis

**Established:**
LangChain is explicitly rejected. The three reasons are documented. The `AIPort` protocol is the documented alternative.

**Established:**
The rejection is consistent with the broader technology selection framework: LangChain fails the "can it be replaced in <2 weeks?" test (its abstractions permeate application code), the "has it existed 5+ years?" test (LangChain was released in October 2022), and possibly the "can a single person maintain it?" test given the complexity.

**Observation:**
The "rapid abstraction churn" criticism is specifically accurate for LangChain's 2023–2024 development trajectory. Whether this criticism remains valid in 2026 (when the strategy was written) is not established from the document.

**Unknown:**
Whether VANI considered any alternative AI orchestration frameworks (LlamaIndex, Haystack, etc.) or only LangChain. The rejection section lists only LangChain.

## What I Learned

The 50-year horizon makes framework adoption decisions different from typical software projects. For a 1–2 year project, LangChain's productivity benefits might outweigh the maintenance costs. For a 50-year project, any framework that has already broken its API multiple times in 2 years is a poor long-term bet.

The "leaky abstraction" problem is specifically important for AI provider abstractions because the differences between providers (different context window sizes, different tool calling APIs, different streaming behaviors, different rate limits) are not incidental — they represent fundamental capability differences that a good abstraction must either expose or consciously hide.

## Broader Principle

When deciding whether to adopt an orchestration framework vs. build a custom abstraction layer:
- If your codebase will last <3 years: use the framework, save development time
- If your codebase will last 10+ years: implement narrow port contracts, accept the development overhead, preserve control over your abstraction boundaries

The custom `AIPort` protocol is a smaller investment than LangChain adoption, but produces more stable, maintainable code over decades because the abstraction boundary is under your control.

## Technical References

- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 19.3 (LangChain rejection)
- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 4.3 (AIPort protocol)
- `docs/architecture/AI_MODELS.md` — P3 (Contracts Over APIs)
- `docs/architecture/TECHNOLOGY_STRATEGY.md` — Section 14 (Replacement Strategy)

## Source Confidence

HIGH

The rejection decision is explicitly documented with stated reasons. The `AIPort` protocol alternative is defined in the strategy document with code. Both documents are marked canonical.

---

## Content Value

Technical Depth: 4/5
Engineering Insight: 5/5
Originality: 4/5
Evidence Quality: 4/5
Story Value: 4/5

Overall: **High**

The LangChain rejection is concrete and specific with three documented reasons. The `AIPort` protocol alternative demonstrates the practical alternative. The 50-year horizon argument for "why not LangChain" is a genuinely distinctive framing of a common debate. "Direct API calls + custom contracts are more maintainable long-term" is a quotable, defensible position.

---

## Publication Notes

No sensitive material. Safe to publish. (Note: avoid making this sound like a direct attack on LangChain; frame it as a principled technology selection decision for specific project constraints.)
