---
title: 'SPACE BAR Does Nothing: Four Real Bugs Found Only by Actually Running the
  Product'
slug: m5-voice-bugs-only-visible-live-ashi
content_type: POST_MORTEM
project: Ashi
status: Fixed
date: '2026-08-14'
topics:
- debugging
- voice-interfaces
- browser
- concurrency
- full-stack
evidence_level: high
publishable: true
description: "The M5 implementation was declared \"implemented\" with a browser UI\
  \ showing `ONLINE` and `PRESS SPACE TO TALK` \u2014 but ONLINE was hardcoded JSX\
  \ text that never checked the backend, and the spacebar had zero keydown handler\
  \ anywhere in the codebase."
---

# SPACE BAR Does Nothing: Four Real Bugs Found Only by Actually Running the Product

## Content Type

POST-MORTEM

## Project

Ashi — Personal Cognitive Operating System

## Date

2026-08-14

## Status

Fixed

## One-Line Summary

The M5 implementation was declared "implemented" with a browser UI showing `ONLINE` and `PRESS SPACE TO TALK` — but ONLINE was hardcoded JSX text that never checked the backend, and the spacebar had zero keydown handler anywhere in the codebase.

## Context

Ashi M5 (Multimodal & Ambient) added a browser frontend with voice interaction (`ashi-frontend`). The initial M5 slice built the backend voice pipeline (ALSA/CLI path, `ashi voice`) and the browser UI. M5.1 was a stabilization pass: "trace a real product failure to its actual root causes and fix them."

The mission was explicit: "Do not solve the screenshot by making the UI prettier."

## The Question

Why does the frontend show `ONLINE` while the console shows `Failed to fetch`, and why does PRESS SPACE TO TALK do nothing?

## Initial Approach

Code trace from the browser screenshot (real, taken with real DevTools open): `ONLINE ●` in the header, `Failed to fetch` in the console, `PRESS SPACE TO TALK` button visible.

Read the actual code before changing anything. No assumption made about what was or wasn't implemented.

## What Happened

**Root cause 1: ONLINE was hardcoded static JSX text.**

`CognitiveField.tsx` rendered `<span>ONLINE ●</span>` — literal JSX, not a component reading from any state. It would display "ONLINE" even with no backend process running at all. The `ONLINE` indicator and `Failed to fetch` error were not contradictory signals — the error came from `TextConsole.tsx`, which was correctly reporting a real fetch failure; the `ONLINE` text was a static label that had never been connected to actual backend health.

**Root cause 2: PRESS SPACE TO TALK had zero keydown handler anywhere in the codebase.**

Full grep for any Space-key binding: none existed. The M5 first slice had built the backend ALSA/CLI voice path (`ashi voice` command) but never built a browser voice transport. The UI copy promised a feature that had no implementation behind it.

**Root cause 3: `Failed to fetch` was already working correctly.**

This was not a bug. `TextConsole.tsx` was surfacing a real, correctly handled error. The bug was the false `ONLINE` label next to it, not the error message itself.

**Fix applied:**

- `ashi-frontend/src/state/connection/store.tsx` (new): real `GET /health` polling every 5s, 3s timeout, exposing `CONNECTING`/`ONLINE`/`OFFLINE`
- `CognitiveField.tsx`: `ONLINE` indicator driven by real connection state; `TextConsole.tsx` input disabled with truthful "Ashi backend unavailable" when OFFLINE — the `ONLINE + Failed to fetch` contradiction is now structurally impossible
- `ashi-frontend/src/interaction/VoiceController.tsx` (new): missing browser voice transport — `getUserMedia`/`MediaRecorder` push-to-talk on Space
- `apps/ashi/src/ashi/app/api_server.py`: `POST /voice/turn` endpoint — real ASR → cognition → TTS pipeline

**Four additional bugs found only after the fix was exercised live:**

| # | Bug | Root cause | How found |
|---|---|---|---|
| 1 | Fast Space tap silently did nothing | `startRecording` awaited `getUserMedia` before `MediaRecorder.start()`; a fast release landed inside that async window | Live testing with actual rapid key presses |
| 2 | Near-instant tap crashed backend (500) | Very short WebM blob → PyAV/ffmpeg `EOFError` / `InvalidDataError` | Live testing with accidental brief taps |
| 3 | Two overlapping requests produced `InvalidTurnTransitionError` (500) | `/turn` and `/voice/turn` both read-then-mutated `current_session.state.turn_phase` with no serialization | Concurrent accidental text+voice input |
| 4 | Bug 3's crash left the session wedged at `THINKING` forever — across restarts | `SessionState.turn_phase` is persisted; no recovery path existed | Observing persistent failure after crash |

None of these four bugs could have been found without actually using the product in a browser. They are all timing- or interaction-shape-dependent.

**Bug 1** has no automated regression test — this repository has no frontend test runner at all (`package.json` has no `test` script, no Vitest/Jest). This is disclosed rather than silently omitted.

**Bug 4** was repaired on the live, already-wedged session by directly calling `session_service.save()` after setting `turn_phase = None`. The already-wedged session was confirmed wedged by querying the live database, then confirmed fixed by a successful follow-up turn.

## Evidence

- Real browser screenshot: `ONLINE ●` + `Failed to fetch` in DevTools
- Grep output: zero Space-key handler in the codebase
- `ashi-frontend/src/components/CognitiveField.tsx` — hardcoded `<span>ONLINE ●</span>` (before fix)
- `apps/ashi/src/ashi/app/api_server.py` — `turn_lock` addition
- `packages/ashi-session/src/ashi/session/state.py` — `abort_turn()` method (new)
- `docs/phases/phase-m5-1-runtime-integration-report.md` — full M5.1 investigation

## Diagnosis

**Established:**

The M5 first slice built components that were in the code but not integrated: the backend voice path (`ashi voice`) but not a browser voice transport; the `ONLINE` label but not a health check connection to it. The gap between "there is code for this" and "this is actually working" requires exercising the product against the real running system, not reading the code.

"Implemented but not operational as a product" is a distinct state from "implemented." It requires a different verification method: actually using it, not reading it.

**The four live bugs:**

All four bugs share the same property: they are timing-dependent or interaction-shape-dependent. A fast key press, a very short audio blob, two simultaneous requests, a crash recovery path — none of these appear in a sequential, cooperative test scenario. They appear under real use, which is irregular, concurrent, and includes unexpected inputs.

## What Changed

After M5.1, the behavioral verification covered:
- Text chat: typed a real question, real LLM response rendered
- Connection state: killed the backend process — UI correctly flipped to `OFFLINE`; restarted — recovered to `ONLINE` without page refresh
- Canvas: pressed 'd', real diagram rendered live
- Voice: real push-to-talk cycle — `LISTENING...` → real mic recording → `THINKING...` → response spoken back

Full suite: 1,231 passed (up from 1,219). Zero regressions. Frontend `tsc -b` and `vite build` both clean.

## What I Learned

UI state that does not read from real application state is a category of lie, not a category of placeholder. `ONLINE ●` as a static string is not a "stub to be wired later" — it is an active claim that happens to always be wrong when the backend is down. Every visible UI element that represents a live system property must be wired to the actual source of that property before the feature is considered implemented.

The four bugs found under live testing were not edge cases — they were the first three unusual interactions a real user would attempt: a fast key press, a brief accidental tap, a concurrent request, and a crash. "Unusual" inputs are only unusual from the perspective of the happy path. They are normal from the perspective of a user actually using the product.

## What I Would Do Differently

Add the health polling connection state from the moment any status label is added to the UI. A connection store that reads from `GET /health` is not harder to write than a static `<span>ONLINE</span>` — it is simply a different decision about what the label means. Making every UI element that represents live state actually connected to that state from the start prevents a class of lies that accumulate silently.

## Broader Principle

"Implemented" and "operational" are different properties that require different verification methods. Code inspection verifies implementation. Actually using the product verifies operation. A feature is not operational until it has been exercised by a real user action (or a close approximation) against the real running system and observed to produce the expected result. Static analysis and unit tests cannot verify that a SPACE bar key press results in a browser recording starting — only doing it can.

## Technical References

- `ashi-frontend/src/state/connection/store.tsx`
- `ashi-frontend/src/interaction/VoiceController.tsx`
- `apps/ashi/src/ashi/app/api_server.py` — `turn_lock`, `POST /voice/turn`
- `packages/ashi-session/src/ashi/session/state.py` — `abort_turn()`
- `docs/phases/phase-m5-1-runtime-integration-report.md`

## Source Confidence

HIGH — every bug is documented with its root cause, reproduction steps, fix, and regression test (or explicit disclosure of why no automated test exists). The live browser verification is described in detail in the phase report.

---

## Content Value

Technical Depth: 4
Engineering Insight: 5
Originality: 4
Evidence Quality: 5
Story Value: 5

**Overall: High**

"PRESS SPACE TO TALK had zero keydown handler anywhere in the codebase" is a memorable line. The four bugs found only under live testing make a strong argument for product-level behavioral testing that no unit test can replicate. The session permanently wedged at `THINKING` and repaired by direct database surgery is a vivid detail.

---

## Publication Notes

References to browser APIs (`getUserMedia`, `MediaRecorder`), PyAV/ffmpeg, and WebM are all public web standards and open-source libraries. No credentials or private data. The browser screenshot would need to be cropped to remove any personal information visible in DevTools if it were included in a published version. Safe to publish in text form as written.
