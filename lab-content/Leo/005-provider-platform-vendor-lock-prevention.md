---
title: 'Preventing AI Vendor Lock-In: The LEO Provider Platform Design'
slug: provider-platform-vendor-lock-prevention
content_type: ARCHITECTURE_DECISION
project: LEO
status: Completed
date: 'null'
topics:
- ai-provider-abstraction
- vendor-independence
- capability-routing
- provider-failover
evidence_level: high
publishable: true
description: LEO built a Provider Platform that routes AI capability requests (chat,
  code, reasoning) to registered providers without any component outside the platform
  knowing which specific provider or model was used.
---

# Preventing AI Vendor Lock-In: The LEO Provider Platform Design

## Content Type

ARCHITECTURE_DECISION

## Project

LEO — AI Operating Companion

## Date

UNKNOWN (Phase 27 label in documentation; startup log dated June 2026)

## Status

Completed — Provider Platform implemented and functional

## One-Line Summary

LEO built a Provider Platform that routes AI capability requests (chat, code, reasoning) to registered providers without any component outside the platform knowing which specific provider or model was used.

## Context

A common problem in AI systems is vendor lock-in: application code directly references specific AI providers (Gemini API calls, OpenAI client, etc.), making it difficult to swap providers or add fallbacks.

LEO established an absolute architectural rule (ADR-002 in `docs/09_DECISION_RECORDS.md`):

> **Direct Gemini calls are forbidden to prevent vendor lock-in and enable capability routing.**

The Provider Platform (Phase 27, `docs/11_PROVIDER_PLATFORM.md`) was built as the exclusive intermediary between the cognitive OS and all AI models.

## The Question

How do you structure an AI system so that business logic never has knowledge of which specific AI model or vendor executes a given operation?

## Initial Approach

The Provider Platform was designed with these components:

1. **Unified Provider Interface** — standardized contract all providers must implement
2. **Capability Registry** — maps abstract capabilities (`chat`, `reason`, `plan`) to providers
3. **Provider Registry** — active, configured provider instances
4. **Model Registry** — specific models per provider, with context windows and capability metadata
5. **Cognitive Orchestrator** — receives capability execution requests from the OS, selects the optimal provider/model based on execution policies, dispatches the task
6. **Execution Policies** — cost-optimized, latency-optimized, privacy-enforced routing rules
7. **Lifecycle & Health** — provider initialization, warmup, health monitoring, graceful degradation

The startup log (`backend/startup.log`) confirms the Provider Platform loaded at startup with:
- `ACTIVE_PROVIDER=gemini`
- `GEMINI_CAPABILITIES=chat,code,reasoning,embeddings,streaming,vision,function_calling,audio_input`
- `NVIDIA_CAPABILITIES=chat,code,reasoning,embeddings`
- `GEMINI_PROVIDER_AVAILABLE=True`, `NVIDIA_PROVIDER_AVAILABLE=True`
- Multiple model configurations per provider

The architecture mandated capability-based routing: code requests `execute_capability("chat")`, not `call_gemini()`.

## What Happened

The Provider Platform was functional. The startup log shows it successfully loaded and registered both Gemini and NVIDIA providers.

The multi-provider failover was specifically tested in the regression report (`backend/REGRESSION_REPORT.md`):
- Scenarios 21-30 tested coding requests through the `CodingNode`, all passing
- Cross-provider failover was tested by artificially triggering Gemini 429 rate limit errors
- The system cleanly failed over to OpenRouter, executing tasks with zero interruptions
- The failover fix involved mapping physical model tiers (Primary, Secondary, Emergency) dynamically during failover loops

One provider-level bug was discovered and fixed during regression testing:

**Issue B: Physical Model Argument Loss on Cross-Provider Failover**
- Symptom: `ProviderFailoverManager` crashed with "model must be provided" errors under high load/quota exhaustion
- Root Cause: `ModelRouter` passed abstract configuration parameters without extracting concrete physical model names for fallback providers
- Fix: Refactored `ModelRouter` to retrieve configurations from the model registry and inject them into the failover pipeline. Mapped OpenRouter fallback to `openai/gpt-oss-120b:free`

The startup log also confirmed model-specific routing:
- `CHAT MODEL: gemini-3.1-flash-lite`
- `CODING MODEL: deepseek-ai/deepseek-v4-pro`
- `REASONING MODEL: nvidia/nemotron-3-ultra-550b-a55b`

## Evidence

- `docs/09_DECISION_RECORDS.md` — ADR-002 "Direct Gemini calls are forbidden"
- `docs/11_PROVIDER_PLATFORM.md` — Provider Platform architecture documentation
- `docs/01_ARCHITECTURE_PRINCIPLES.md` — "No component outside Provider Platform may have knowledge of specific AI models"
- `backend/startup.log` lines 19-41 — provider loading, capability registration, health status
- `backend/REGRESSION_REPORT.md` — Issue B: cross-provider failover bug and fix
- `backend/app/main.py` — `ProviderPlatformComponent` in boot sequence

## Diagnosis

**Established:**
The Provider Platform successfully loaded at startup, registered multiple providers with capability metadata, and handled cross-provider failover in regression testing. The failover bug (physical model argument loss) was found and fixed.

**Likely:**
The capability-based abstraction (`execute_capability("chat")` vs direct API calls) was adopted at the OS execution layer. Whether all application-layer code respected this is less certain — the audit results (`backend/audit_results.txt`) mention `app/providers/failover.py` still uses mock health since "Runtime Intelligence handles health dynamically now."

**Unknown:**
Whether the Conversation layer (which sits above the Cognitive OS) consistently routed through the Provider Platform rather than calling providers directly. The constraint "Conversation Layer MUST NOT call Gemini directly" is documented in `docs/03_LAYER_ARCHITECTURE.md`.

## What Changed

The `ModelRouter` was refactored to properly handle physical model name injection during cross-provider failover. The OpenRouter emergency fallback was set to `openai/gpt-oss-120b:free`.

## What I Learned

Cross-provider failover is more subtle than it appears. Passing abstract provider configuration through a failover loop fails when the fallback provider needs concrete model identifiers that were not included in the abstract configuration. The model registry must be consulted at failover time, not just at request initiation time.

## What I Would Do Differently

**Hindsight observation:** Testing failover paths should be a standard part of the regression suite, not discovered only when rate limits are hit in production. Artificial quota injection (as was done in regression testing) should be a permanent test fixture for all provider failover paths.

## Broader Principle

Vendor-agnostic AI routing requires resolving model identifiers at the physical layer, not at the abstract capability layer. Abstract capabilities must be resolved to concrete models at the point of execution, and that resolution must happen per-provider — not once at request initiation.

## Technical References

- `docs/09_DECISION_RECORDS.md` (ADR-001, ADR-002, ADR-003)
- `docs/11_PROVIDER_PLATFORM.md`
- `docs/01_ARCHITECTURE_PRINCIPLES.md` (Principle 4: Provider Independence)
- `backend/REGRESSION_REPORT.md` (Issue B)
- `backend/startup.log`

## Source Confidence

HIGH — Provider Platform startup confirmed in logs. Failover bug documented with symptoms, root cause, and fix. ADRs are explicit design decisions.

---

## Content Value

Technical Depth: 4
Engineering Insight: 4
Originality: 3
Evidence Quality: 4
Story Value: 4

Overall: **High**

Provider abstraction is a recognized pattern, but the specific failover bug (physical model argument loss) is a concrete, non-obvious failure mode. The evidence chain from ADR through implementation through regression bug is well-documented.

---

## Publication Notes

Model names visible in startup log (`gemini-3.1-flash-lite`, `deepseek-ai/deepseek-v4-pro`, `nvidia/nemotron-3-ultra-550b-a55b`, `openai/gpt-oss-120b:free`). These are public model identifiers, not credentials. No sensitive information detected.
