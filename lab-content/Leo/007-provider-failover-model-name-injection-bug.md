---
title: 'Cross-Provider Failover Bug: Physical Model Names Lost in Abstraction'
slug: provider-failover-model-name-injection-bug
content_type: DEBUGGING_DISCOVERY
project: LEO
status: Completed
date: 'null'
topics:
- provider-failover
- ai-routing
- abstraction-leakage
- debugging
evidence_level: high
publishable: true
description: LEO's multi-provider failover crashed with "model must be provided" errors
  because the ModelRouter passed abstract configuration parameters instead of concrete
  physical model names to fallback providers.
---

# Cross-Provider Failover Bug: Physical Model Names Lost in Abstraction

## Content Type

DEBUGGING_DISCOVERY

## Project

LEO — AI Operating Companion

## Date

UNKNOWN (documented in regression report)

## Status

Completed — bug found and fixed

## One-Line Summary

LEO's multi-provider failover crashed with "model must be provided" errors because the ModelRouter passed abstract configuration parameters instead of concrete physical model names to fallback providers.

## Context

LEO's Provider Platform supported multiple AI providers (Gemini, NVIDIA, OpenRouter). When Gemini hit rate limits (429 errors), the system was expected to fail over to a secondary provider automatically.

## The Question

Why did the ProviderFailoverManager crash with "model must be provided" specifically during cross-provider failover and not during primary execution?

## Initial Approach

The ModelRouter was responsible for directing execution requests to the appropriate provider. The ProviderFailoverManager handled the fallback logic when a provider failed or was rate-limited.

## What Happened

Under high load or quota exhaustion, the `ProviderFailoverManager` crashed:

```
model must be provided
```

The root cause: the `ModelRouter` was passing abstract configuration parameters to the failover loop without extracting and injecting the concrete physical model names for fallback providers.

When using the primary provider (Gemini), the physical model name was correctly set through the normal request path. When failing over to OpenRouter (a different provider), the failover loop needed to resolve which physical model to use on OpenRouter — but the abstract configuration passed through didn't include the concrete model identifier for the fallback provider.

**Fix:**
- Refactored `ModelRouter` to retrieve configurations from the model registry per-provider
- Updated `ProviderFailoverManager` to dynamically match physical model tiers (Primary, Secondary, Emergency) during failover loops
- Mapped OpenRouter fallback availability to `openai/gpt-oss-120b:free` as the default emergency free tier

**Verification:**
Artificial Gemini 429 rate limit triggers were used to test the fix. The system cleanly failed over to OpenRouter and executed tasks with zero interruptions.

## Evidence

- `backend/REGRESSION_REPORT.md` — Issue B: root cause, fix, and verification
- `backend/startup.log` — model configuration log: `CHAT MODEL: gemini-3.1-flash-lite`, `CODING MODEL: deepseek-ai/deepseek-v4-pro`, etc.

## Diagnosis

**Established:**
The abstract capability routing worked correctly for the primary path. The failover path failed because abstract parameters were forwarded without re-resolving the concrete model identifier for the target fallback provider.

**Likely:**
The model registry stores provider-specific model configurations (primary, secondary, emergency tiers). The failover loop needed to query this registry per-provider at failover time, not carry over the original provider's configuration.

**Unknown:**
Whether the emergency tier fallback (`openai/gpt-oss-120b:free`) was fully validated for all capability types (chat, code, reasoning).

## What Changed

`ModelRouter` was refactored to retrieve configurations from the model registry and inject them into the failover pipeline. `ProviderFailoverManager` was updated to dynamically resolve model tiers per-provider during failover.

## What I Learned

Provider abstraction at the capability level does not eliminate the need for concrete model resolution at the physical execution layer. Each provider has its own model identifier namespace. Failover requires re-resolving the physical model identifier for the target provider, not forwarding the source provider's configuration.

## What I Would Do Differently

**Hindsight observation:** Integration tests that specifically inject provider failures (rate limits, unavailability) and verify that the fallback executes successfully with the correct model are essential. These tests should be part of the standard suite, not discovered during regression.

## Broader Principle

In multi-provider systems, failover paths require the same level of configuration resolution as primary paths. Abstract routing that works for primary providers may fail for fallback providers if model identifiers are provider-specific and not re-resolved at failover time.

## Technical References

- `backend/REGRESSION_REPORT.md` (Issue B)
- `backend/startup.log` (model configuration section)

## Source Confidence

HIGH — Explicit root cause, fix, and artificial-trigger verification documented in regression report.

---

## Content Value

Technical Depth: 3
Engineering Insight: 4
Originality: 3
Evidence Quality: 4
Story Value: 3

Overall: **Medium-High**

A specific, non-obvious failover bug with a clean root cause. The lesson (abstract routing parameters are not sufficient for cross-provider failover) is broadly applicable to multi-provider AI systems. Evidence is solid.

---

## Publication Notes

Model names visible (`openai/gpt-oss-120b:free`, `gemini-3.1-flash-lite`, etc.). These are public identifiers. No sensitive credentials detected.
