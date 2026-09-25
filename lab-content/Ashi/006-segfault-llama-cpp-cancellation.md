---
title: A Segfault in llama.cpp from an Abandoned Generation Thread
slug: segfault-llama-cpp-cancellation-ashi
content_type: DEBUGGING_DISCOVERY
project: Ashi
status: Fixed
date: '2026-08-05'
topics:
- llm-inference
- concurrency
- asyncio
- native-code
- debugging
- llama-cpp
evidence_level: high
publishable: true
description: A cancellation design that signaled the event loop without waiting for
  the background thread to exit caused a process-level segmentation fault inside llama.cpp,
  because llama.cpp's native context is not safe for concurrent access.
---

# A Segfault in llama.cpp from an Abandoned Generation Thread

## Content Type

DEBUGGING DISCOVERY

## Project

Ashi — Personal Cognitive Operating System

## Date

2026-08-05

## Status

Fixed

## One-Line Summary

A cancellation design that signaled the event loop without waiting for the background thread to exit caused a process-level segmentation fault inside llama.cpp, because llama.cpp's native context is not safe for concurrent access.

## Context

Phase I.2 was implementing `LlamaCppBackend` — the first real inference backend, wrapping `llama-cpp-python` for CPU-only local GGUF model inference. The backend needed to support cancellation: when an outer `asyncio` task was cancelled (e.g. user disconnect, timeout), the in-flight generation should stop without hanging the process.

## The Question

How do you implement genuine, prompt cancellation of a GGUF generation that runs inside a native C library, from an asyncio coroutine?

## Initial Approach

The initial design: set a `threading.Event` stop flag when cancellation is requested, then immediately let `CancelledError` propagate to the caller. The background producer thread would eventually notice the flag and stop.

This looked correct: the flag was set, the caller got its cancellation signal promptly, and the thread would clean up on its own.

## What Happened

The first cancellation test caused a **process-level segmentation fault** inside `llama_cpp/_internals.py`'s `decode`, not a Python exception.

The crash was reproduced consistently before the fix. Zero occurrences in 3 repeated full runs after the fix.

**Root cause:** the initial design set the stop flag and immediately let `CancelledError` propagate — but "the caller's `await` returned" is not the same as "the background thread has stopped." A caller treating the cancellation return as "the backend is now idle" could immediately call `unload()` or submit a new request, which would touch or close the same `llama_cpp.Llama` object the abandoned thread was still mid-`llama_decode` on.

`llama.cpp` is not safe against concurrent use of one context. This is documented at the native library level. A race between `llama_decode` in one thread and `close()` or a second generation start in another thread is a native memory violation — Python's exception handling cannot intercept it, because it happens below the CPython layer.

## Evidence

- `packages/ashi-inference/src/ashi/inference/backends/llama_cpp_backend.py` — `LlamaCppBackend.generate()`
- Section 7 of `docs/phases/phase-i2-production-backend.md` — "Disclosed finding: a real native crash"
- Reproduction: consistent segfault on cancellation before fix; zero after
- The fix is described in the ADR and in the code's own inline comments

## Diagnosis

**Established:**

The problem is the gap between "the asyncio coroutine has been notified of cancellation" and "the native background thread has actually stopped executing inside the native library." These are two different events. Signaling the first without waiting for the second leaves the native library in an undefined state.

The underlying constraint: `llama.cpp` exposes no decode-abort hook in its low-level C API. Cancellation must be implemented cooperatively, by streaming generation token-by-token and checking a stop signal between tokens. "Cooperative" means the thread has to *notice* the stop signal — it cannot be interrupted mid-token.

**Observation:**

The subprocess architecture (`llama-server`) was considered specifically because it would isolate crashes: a segfault in a subprocess kills the subprocess, not the entire always-on process. This investigation confirmed the crash was real. The subprocess option was still rejected, but the decision was made with awareness of the real risk, not by ignoring it.

## What Changed

**Fix:** `LlamaCppBackend` now holds one `asyncio.Lock` per `profile_id`, acquired for the entire duration of both `generate()` and `unload()`. On an externally-delivered `CancelledError` (not on self-detected timeout or normal completion), `generate()` explicitly `awaits` the producer's executor future — guaranteeing the background thread has genuinely stopped — before releasing the lock and propagating cancellation to the caller.

This bounds cancellation latency by one token's CPU cost rather than "instant." This is the necessary and correct trade for correctness here — not a compromise.

The test that discovered the bug became the regression test: `test_inference_llama_cpp_backend_real.py` includes a cancellation test against a real loaded model.

## What I Learned

`asyncio.wait_for()` / `Task.cancel()` cannot preempt a `run_in_executor` future once the underlying OS thread is already running inside a non-cooperative C call. Cancelling the outer awaiting task does not stop the thread — the `await` simply doesn't return until the whole blocking call finishes regardless. "My coroutine got a CancelledError" does not mean "the background work has stopped."

For native libraries: "the library is not thread-safe" means you must serialize all access, including cleanup. A lock that covers both the generation call and the unload call is the correct boundary.

## What I Would Do Differently

Write the concurrent-access test before the cancellation test. The segfault appeared because cancellation exposed a race between an abandoned thread and subsequent API calls. A test that explicitly ran two concurrent requests against the same model would have found the race condition independently of the cancellation path.

## Broader Principle

When wrapping a native C library in an async Python interface, distinguish between:
1. "The coroutine notified the caller" (asyncio-level)
2. "The native thread has stopped" (OS-level)

These are different points in time. Any resource that must not be touched concurrently by the native library must be protected by a lock that spans the full gap between starting native work and confirming it has ended — not just the time the asyncio coroutine is awaited. Releasing a shared native resource before confirming the background thread has exited is undefined behavior territory, regardless of how clean the Python layer looks.

## Technical References

- `packages/ashi-inference/src/ashi/inference/backends/llama_cpp_backend.py` — `LlamaCppBackend.generate()`
- `docs/phases/phase-i2-production-backend.md` §4.1 "Why per-token streaming, not one blocking call", §7 "Disclosed finding"
- `packages/ashi-inference/tests/test_inference_llama_cpp_backend_real.py` — real-model cancellation test
- `packages/ashi-inference/tests/test_inference_llama_cpp_backend_fake.py` — `_FakeLlama` double

## Source Confidence

HIGH — the root cause is described in the implementation document, the specific code path is identified (`_internals.py`'s `decode`), the fix is present in the source, and the crash was reproducible before fix and absent after.

---

## Content Value

Technical Depth: 5
Engineering Insight: 5
Originality: 4
Evidence Quality: 4
Story Value: 4

**Overall: High**

This is a sharp, specific concurrency bug with a clear mechanism, a counterintuitive trigger (cancellation causing a crash), and a well-reasoned fix. The asyncio/native-thread gap is a real, underappreciated pitfall that applies to any Python code wrapping a non-thread-safe C library, making this broadly relevant beyond this project.

---

## Publication Notes

No credentials or private data. llama-cpp-python and llama.cpp are open-source libraries; the bug description discusses their documented thread-safety properties. Safe to publish.
