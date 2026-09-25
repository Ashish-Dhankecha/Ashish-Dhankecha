---
title: 'The Governance Hierarchy: How Documentation Governs Engineering Decisions
  in VANI'
slug: governance-hierarchy-documentation
content_type: SYSTEM_DESIGN
project: VANI
status: "Canonical \u2014 frozen"
date: '2026'
topics:
- engineering-governance
- architectural-decision-records
- documentation
- engineering-process
- software-methodology
evidence_level: high
publishable: true
description: "VANI uses a formal governance hierarchy in which every engineering decision\
  \ has a documented authority level, and lower-authority decisions cannot override\
  \ higher-authority ones \u2014 creating a document-driven engineering constitution."
---

# The Governance Hierarchy: How Documentation Governs Engineering Decisions in VANI

## Content Type

SYSTEM DESIGN

## Project

VANI (Cognitive Operating System)

## Date

2026

## Status

Canonical — frozen per GOVERNANCE.md v2.0

## One-Line Summary

VANI uses a formal governance hierarchy in which every engineering decision has a documented authority level, and lower-authority decisions cannot override higher-authority ones — creating a document-driven engineering constitution.

## Context

Most software projects have informal governance: senior engineers make decisions, junior engineers follow, PRs are reviewed, and the decisions live in people's heads. VANI codifies a formal document hierarchy that governs every decision from vision to implementation.

`GOVERNANCE.md` defines this hierarchy as version 2.0 (indicating the governance system itself has evolved).

## The Governance Hierarchy

```
VISION.md                    ← Frozen (Architecture Constitution)
        ↓
FOUNDATION.md                ← Frozen (Architectural Laws)
        ↓
Accepted ACPs                ← Architecture Change Proposals
        ↓
Accepted ADRs                ← Architectural Decision Records
        ↓
Engineering Program          ← Phase planning and delivery
        ↓
Technology Strategy          ← Technology selection decisions
        ↓
AI Models Document           ← AI-specific decisions
        ↓
Architecture Documents       ← Subsystem architecture specs
        ↓
Specifications               ← Detailed implementation specs
        ↓
Implementation               ← Source code
        ↓
Certification                ← Validation evidence
```

"Higher authority always overrides lower authority."

## How Each Level Works

**VISION.md** — Frozen. Cannot be changed without an approved ACP. Defines what VANI is, what it is not, and the core architectural invariants. Questions at this level: "Is VANI a chatbot?" "Does VANI prioritize local execution?"

**FOUNDATION.md** — Frozen. The 10 Architectural Laws. Questions at this level: "Can this module have global mutable state?" "Can services call each other directly?" Violations require ACPs.

**ACPs (Architecture Change Proposals)** — Formal process for proposing changes to frozen architecture. Like a Constitutional Amendment process. Required before modifying VISION.md or FOUNDATION.md constraints.

**ADRs (Architectural Decision Records)** — Decisions about how to implement architecture. Questions at this level: "Should we use constructor DI or service locator?" "Should logging be centralized or per-service?" ADRs can be superseded by later ADRs but cannot contradict FOUNDATION.md.

**Engineering Program** — Phase plans, milestones, delivery timelines. Governed by accepted ADRs.

**Technology Strategy / AI Models** — Technology selections that serve the architecture. Cannot contradict ADRs.

**Architecture Documents** — Per-subsystem architecture specs. Each must follow the Foundation laws and accepted ADRs.

**Specifications / Implementation / Certification** — Bottom layers. Implementation follows specifications; certification validates implementation.

## The ADR Process

From `docs/adr/README.md`:

ADR lifecycle: Draft → Review → Accepted → Superseded → Deprecated

ADRs are required for:
- New subsystem frameworks
- Communication mechanism changes
- Security model changes
- Data storage changes
- External API introductions
- Cross-domain interface changes

ADRs are NOT required for:
- Internal refactoring within existing architecture
- Adding tests
- Performance optimization within existing design
- Documentation updates

Approval pipeline: Author → Architecture Review → Lead Approval → Merge

## The ACP Process

For changes to frozen components (FOUNDATION.md, VISION.md), an Architecture Change Proposal is required. From `FOUNDATION.md`:

ACP is required when:
- Modifying a frozen architectural document
- Changing a principle in FOUNDATION.md or VISION.md
- Modifying architectural laws
- Introducing an architectural pattern that contradicts existing laws

## Evidence

- `docs/architecture/GOVERNANCE.md` — Governance hierarchy (version 2.0, frozen)
- `docs/architecture/FOUNDATION.md` — ADR and ACP process sections
- `docs/adr/README.md` — ADR lifecycle, required triggers, not-required triggers, approval pipeline
- `docs/adr/ADR-001` through `ADR-008` — Accepted ADRs (Phase 1)
- `docs/vision/VISION.md` — "Frozen (Architecture Constitution)" status

## Diagnosis

**Established:**
The governance hierarchy is documented in GOVERNANCE.md v2.0 and cross-referenced in FOUNDATION.md. The ADR process with lifecycle states (Draft → Review → Accepted → Superseded → Deprecated) is implemented.

**Established:**
8 ADRs have been accepted through this process (Phase 1). The frozen status of VISION.md and FOUNDATION.md is explicitly marked.

**Established:**
The ACP process is defined for frozen components. No ACPs have been filed yet (Phase 0 and early Phase 1 haven't required modifying frozen architecture).

**Observation:**
The governance system is more elaborate than most single-developer projects need. The system is explicitly designed for a 50-year lifespan with a single developer — creating formal governance now means future collaborators (or the future developer's future self) have documented decision history.

**Observation:**
All 8 ADRs have "Date: YYYY-MM-DD" (unfilled). This is a gap in the governance process — ADRs without dates lose temporal context.

## What I Learned

A governance hierarchy makes implicit authority explicit. Most projects have a de facto authority hierarchy (founder > senior engineers > junior engineers) that is never documented. When the founder or senior engineer leaves, the authority structure is lost. Documenting it creates a persistent, inspectable decision framework.

The "documentation is architecture" principle: VANI explicitly states "Documentation Is Part of the Architecture" in its lessons learned. The governance hierarchy is not separate from the architecture — it is the architecture's maintenance system.

## Broader Principle

For any long-lived system (more than 3 years), documenting the authority structure of architectural decisions produces more long-term value than speed of delivery. The alternative — decisions living in people's heads — creates technical debt every time someone leaves the project. For a single-developer project with a 50-year horizon, the "decision history" value of ADRs is even more important because the developer will forget what they decided and why.

## Technical References

- `docs/architecture/GOVERNANCE.md` — Governance hierarchy, engineering workflow, ACP process
- `docs/adr/README.md` — ADR lifecycle and process
- `docs/architecture/FOUNDATION.md` — ADR/ACP process sections (lines 654–696)
- `docs/vision/VISION.md` — Frozen constitution

## Source Confidence

HIGH

The governance hierarchy is explicitly documented in GOVERNANCE.md. The ADR process is confirmed by the existence of 8 accepted ADRs. The frozen status of VISION.md and FOUNDATION.md is explicitly marked.

---

## Content Value

Technical Depth: 3/5
Engineering Insight: 4/5
Originality: 3/5
Evidence Quality: 5/5
Story Value: 3/5

Overall: **Medium-High**

The formal governance hierarchy for a single-developer personal project is interesting precisely because it is over-engineered by conventional standards. This choice — to apply enterprise-grade governance to a personal project — is a concrete demonstration of the long-horizon thinking. The ADR date gap (all 8 have "YYYY-MM-DD") is an authentic documentation artifact.

---

## Publication Notes

No sensitive material. Safe to publish.
