---
title: 'The Event Bus Architecture: Why VANI Services Never Call Each Other Directly'
slug: event-bus-no-direct-calls
content_type: ARCHITECTURE_DECISION
project: VANI
status: "Implemented \u2014 Phase 0 (Event System)"
date: '2026'
topics:
- event-driven-architecture
- message-bus
- loose-coupling
- cognitive-systems
- dead-letter-queue
evidence_level: high
publishable: true
description: "VANI prohibits direct service-to-service calls \u2014 all inter-service\
  \ communication must go through the Cognitive Interconnect (Event Bus), with publishers\
  \ unaware of subscribers and subscribers unaware of publishers."
---

# The Event Bus Architecture: Why VANI Services Never Call Each Other Directly

## Content Type

ARCHITECTURE DECISION

## Project

VANI (Cognitive Operating System)

## Date

2026

## Status

Implemented — Phase 0 (Event System); ADR-007 accepted (Phase 1)

## One-Line Summary

VANI prohibits direct service-to-service calls — all inter-service communication must go through the Cognitive Interconnect (Event Bus), with publishers unaware of subscribers and subscribers unaware of publishers.

## Context

The Event Bus (called the "Cognitive Interconnect") was one of the 13 Phase 0 subsystems. ADR-007 formalized its use as the mandatory integration mechanism for Phase 1 services. The rejection of direct service calls is documented in both the event bus architecture spec and ADR-007.

## The Decision

From `docs/architecture/EVENT_BUS.md`:
> "Publishers never communicate directly with subscribers. Subscribers never know the publisher."

From ADR-007:
> "Services must not invoke another service directly, depend on another service's implementation, or create private event buses."

From Phase 1 Architecture (`docs/phases/phase1/ARCHITECTURE.md`):
> "Direct service-to-service communication is prohibited."

## What the Event Bus Provides

The Cognitive Interconnect consists of six internal components:

1. **Event Models** — Immutable event structures with required fields (Event ID, Event Type, Version, Timestamp, Producer, Payload, Metadata)
2. **Subscription Registry** — Tracks which services subscribe to which event types
3. **Event Router** — Determines which subscribers receive each event (routing policy, topic matching, priority resolution)
4. **Event Dispatcher** — Delivers events to subscribers (retry policy, delivery acknowledgements, dead letter queue forwarding)
5. **Middleware Pipeline** — Validation, schema checking, producer identity verification
6. **Dead Letter Queue** — Handles events that cannot be delivered

## The Event Lifecycle

```
Event Created
      ↓
Published
      ↓
Event Envelope Created
      ↓
Middleware Pipeline (validation, schema check)
      ↓
Validated
      ↓
Queued
      ↓
Routed (Event Router determines subscribers)
      ↓
Dispatched (Event Dispatcher delivers)
      ↓
Delivered
      ↓
Processed
      ↓
Completed
```

If delivery fails: Retry Policy → Dead Letter Queue → Diagnostic Event.

**The separation of Router and Dispatcher is explicit:**
> "Routing never performs delivery. Delivery never performs routing. Services never implement routing logic."

## Event Priorities

Events define priorities: Critical → High → Normal → Low → Background.

## Why Not Direct Calls?

From ADR-007, the rejected alternatives:

**Rejected: Direct service method calls**
- "Introduces tight coupling between services. Services cannot be replaced, reordered, or modified without cascading changes to other services."
- "Violates FOUNDATION.md Architectural Law 3: Domain Ownership."

**Rejected: Shared global state**
- "Violates FOUNDATION.md Architectural Law 6: No Global Mutable State."
- "Makes concurrent access unpredictable."

## Evidence

- `docs/architecture/EVENT_BUS.md` — Event Bus architecture (420 lines, 6,980 bytes)
- `docs/adr/ADR-007-event-capability.md` — Event-driven integration decision
- `docs/phases/phase1/ARCHITECTURE.md` — "Direct service-to-service communication is prohibited" (line 267)
- `src/runtime/events/` — Event System source directory
- Phase 0 Event System listed in IMPLEMENTATION_REPORT.md as completed

## Diagnosis

**Established:**
The Event Bus is implemented (Phase 0 subsystem). Direct service calls are prohibited in Phase 1 architecture and ADR-007. The six-component internal structure is documented in the architecture spec.

**Established:**
The Dead Letter Queue exists as an explicit failure handling mechanism — events that cannot be delivered do not silently disappear.

**Established:**
Event priority levels are defined: Critical, High, Normal, Low, Background.

**Observation:**
The requirement for immutable event payloads ("immutable events" in Event Bus design principles) aligns with the broader FOUNDATION.md Law 4: "Immutable Shared State." Events are snapshots of what happened, not mutable objects.

**Established:**
The event structure requires a Producer field — every event's source is tracked. This supports observability and debugging.

## What I Learned

The Dead Letter Queue is architecturally significant: it means events cannot silently fail. In a system with no direct calls (everything is async event delivery), silent failures would be catastrophic — you'd have no idea that a service never received a critical event. The DLQ ensures failures are observable and recoverable.

The separation of Router (which subscribers receive the event?) from Dispatcher (deliver the event to them) is a good example of single-responsibility applied at the infrastructure level. Most event bus implementations mix these, which makes routing policy changes require modifying the delivery code.

## Broader Principle

Event-driven communication is not appropriate for every system. For VANI's continuous runtime OS model (many subsystems running simultaneously, autonomous cognitive cycles, no request-response), it is appropriate because:
1. Cognitive subsystems should not know about each other's implementation
2. Autonomous operations (scheduler jobs, consolidation tasks) don't have a "caller" to return to
3. The same event can trigger actions in multiple subsystems simultaneously

For a system that is primarily request-response (web API, CLI tool), event-driven communication adds complexity without commensurate benefit.

## Technical References

- `docs/architecture/EVENT_BUS.md` — Full event bus architecture
- `docs/adr/ADR-007-event-capability.md` — Formal ADR
- `docs/phases/phase1/ARCHITECTURE.md` — Section 8 (Communication Model)
- `src/runtime/events/` — Event System source

## Source Confidence

HIGH

The Event Bus architecture is detailed (420 lines), internally consistent, and the Phase 0 implementation is confirmed by both the changelog and source directory. The "no direct calls" prohibition is stated in three separate documents (ADR-007, Phase 1 Architecture, Event Bus spec).

---

## Content Value

Technical Depth: 4/5
Engineering Insight: 4/5
Originality: 3/5
Evidence Quality: 5/5
Story Value: 3/5

Overall: **High**

The six-component Event Bus with explicit Router/Dispatcher separation and Dead Letter Queue is well-designed and concretely documented. The "no direct service calls" prohibition and its justification (domain ownership, loose coupling) is a clean, architectural principle. The event lifecycle diagram is publishable as-is.

---

## Publication Notes

No sensitive material. Safe to publish.
