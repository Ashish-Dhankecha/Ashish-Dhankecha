---
title: Using LangGraph for Conversational State Machines in LEO
slug: langgraph-conversational-state-machines
content_type: ENGINEERING_NOTE
project: LEO
status: Completed
date: 'null'
topics:
- langgraph
- state-machines
- conversational-ai
- node-routing
evidence_level: medium
publishable: true
description: LEO used LangGraph to implement conversational execution as a state machine
  with distinct nodes (ChatNode, CodingNode, FastChatNode, memory management nodes),
  routing user requests to the appropriate node based on intent classification.
---

# Using LangGraph for Conversational State Machines in LEO

## Content Type

ENGINEERING_NOTE

## Project

LEO — AI Operating Companion

## Date

UNKNOWN

## Status

Completed — LangGraph integration functional and tested

## One-Line Summary

LEO used LangGraph to implement conversational execution as a state machine with distinct nodes (ChatNode, CodingNode, FastChatNode, memory management nodes), routing user requests to the appropriate node based on intent classification.

## Context

LangGraph is a library for building stateful, multi-step LLM applications as directed graphs. LEO used it as the execution backbone for the Conversation Layer — the component that processes user requests and routes them to specific capability nodes.

## The Architecture

From the regression report, the following nodes were confirmed functional:
- `ChatNode` — general conversation, profile queries, memory operations
- `CodingNode` — coding requests (Python, C++, SQL, Java, Bash, Docker, regex, FastAPI)
- `FastChatNode` — fast local bypass for common patterns (7-10ms response time)
- Memory management nodes — handling `forget memory`, `add memory`, `show memories`

The semantic router (`app/services/semantic_router.py`) used Gemini to classify intent into routing categories. The LangGraph graph then directed execution to the appropriate node.

## What Happened

The regression suite (Section B) confirmed 10 LangGraph scenarios all passing. Examples:

- "Remember that I prefer dark theme for IDEs." → ChatNode bypassed logic planner
- "Recall all my coding preferences." → ChatNode with personality stats loaded
- "Forget memory 1." → memory_management node, parsed and executed
- "What is our relationship stage?" → ChatNode, returned "NEW" stage
- "Add a memory that my name is Ashish." → Memory parsed, recorded, integrated into stats

Coding node examples (Section C, 10/10 passing):
- "Write a Python script to sort a list using bubble sort." → CodingNode
- "Implement binary search in C++." → CodingNode
- "Write a Dockerfile for a Python app." → CodingNode

The `FastChatNode` was a key optimization — simple greetings were routed locally without an LLM call, achieving 7-10ms response times.

The semantic router bug (Gemini returning array vs object) affected some LangGraph node routing and was fixed before the final regression run.

## Evidence

- `backend/REGRESSION_REPORT.md` — Section B (LangGraph scenarios) and Section C (multi-provider scenarios): all 20 tests passing
- `backend/requirements.txt` — `langgraph` listed as dependency
- `backend/REGRESSION_REPORT.md` — FastChatNode timing: 9ms, 10ms, 7ms
- `backend/audit_results.txt` — `app/conversation/execution/provider_adapters.py` mentions `UniversalMockAdapter`

## Diagnosis

**Established:**
LangGraph was used as the conversational execution graph. All tested routing scenarios passed. The FastChatNode fast path provided sub-10ms response for greetings.

**Likely:**
The semantic router + LangGraph combination formed a two-stage routing system: (1) LLM-based intent classification (Gemini), (2) LangGraph graph execution with intent-specific nodes. This is a sound architecture for intent-aware conversational execution.

**Unknown:**
The full LangGraph graph structure (number of nodes, edge conditions, state schema). Whether the LangGraph integration connected into the Cognitive OS (Interconnect, Scheduler) or bypassed it to call the Provider Platform directly.

## What I Learned

LangGraph's state machine model maps naturally to conversational AI: each node is a distinct capability, edges are routing conditions, and the graph state carries conversation context. The FastChatNode optimization demonstrates that not all conversational nodes need LLM execution — pattern-matched responses can be served from a local lookup at a fraction of the cost.

## Broader Principle

Conversational AI routing benefits from a tiered approach: fast local paths for predictable patterns → intent classification for ambiguous inputs → capability-specific nodes for complex execution.

## Technical References

- `backend/requirements.txt` (langgraph dependency)
- `backend/REGRESSION_REPORT.md` (Sections B and C)
- `backend/app/conversation/execution/` directory
- `backend/app/services/semantic_router.py`

## Source Confidence

MEDIUM — LangGraph usage confirmed through requirements and regression report. Internal graph structure not directly examined.

---

## Content Value

Technical Depth: 3
Engineering Insight: 3
Originality: 2
Evidence Quality: 4
Story Value: 3

Overall: **Medium**

LangGraph integration is reasonably documented. The FastChatNode fast path and the semantic router bug context are the most interesting elements. Evidence is solid but the internal LangGraph structure is not directly examined.

---

## Publication Notes

No sensitive material detected.
