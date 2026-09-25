---
title: 'Silent Deprecation: Discovering a Dead SDK Through Startup Warnings'
slug: deprecated-gemini-sdk-startup-warning
content_type: DEBUGGING_DISCOVERY
project: LEO
status: Documented
date: '2026-06-28'
topics:
- sdk-deprecation
- startup-diagnostics
- dependency-management
- gemini-api
evidence_level: high
publishable: true
description: 'LEO''s startup log revealed a `FutureWarning` on every boot: `google.generativeai`
  (the Gemini Python SDK) was deprecated in favor of `google.genai`, with a migration
  required before the old package was removed.'
---

# Silent Deprecation: Discovering a Dead SDK Through Startup Warnings

## Content Type

DEBUGGING_DISCOVERY

## Project

LEO — AI Operating Companion

## Date

2026-06-28 (startup log timestamp)

## Status

Documented — deprecation identified; migration not documented

## One-Line Summary

LEO's startup log revealed a `FutureWarning` on every boot: `google.generativeai` (the Gemini Python SDK) was deprecated in favor of `google.genai`, with a migration required before the old package was removed.

## Context

LEO's backend used the `google.generativeai` Python package to call the Gemini API. Google deprecated this package and created a replacement: `google.genai`. The startup log captured this deprecation warning firing every time the application started.

## What Was Found

From `backend/startup.log` (lines 22-30):

```
FutureWarning: google.generativeai package is deprecated. Please install google-genai instead.
  import google.generativeai as genai
...
FutureWarning was raised and it indicates the library you are using is deprecated
and may be removed from a future release. Please install google-genai library.
```

The warning was emitted from within the package at import time, appearing before any application initialization. This warning fires on every startup, creating persistent noise in startup logs.

## Evidence

- `backend/startup.log` lines 22-30 — `FutureWarning` from `google.generativeai`
- `backend/requirements.txt` — `google-generativeai` in the dependencies list
- Absence of `google-genai` in `requirements.txt`

## Diagnosis

**Established:**
`google.generativeai` is deprecated. The startup log confirms the warning fires on every startup. `google-genai` is not in the requirements.

**Likely:**
The migration from `google.generativeai` to `google.genai` requires API changes beyond a simple import swap — the two packages have different class names and call signatures. This explains why the migration was not a quick fix.

**Unknown:**
Whether the application would break immediately upon package removal, or whether the deprecated package would continue to function until explicitly removed from PyPI.

## What Changed

No documented migration.

## What I Learned

SDK deprecation warnings in startup logs are easy to dismiss but should be tracked as technical debt. A `FutureWarning` on every startup creates log noise that can mask other important warnings. The migration cost is often higher than the import change alone — API differences between old and new SDKs require code-level updates throughout.

## Broader Principle

SDK deprecation warnings should trigger a scheduled migration task, not just log acknowledgment. The window between deprecation warning and removal is finite, and the longer a migration is deferred, the more disruptive the eventual forced upgrade becomes.

## Technical References

- `backend/startup.log` (lines 22-30)
- `backend/requirements.txt`

## Source Confidence

HIGH — Deprecation warning directly observed in startup log. Requirements file confirms the deprecated package.

---

## Content Value

Technical Depth: 2
Engineering Insight: 3
Originality: 2
Evidence Quality: 5
Story Value: 2

Overall: **Medium**

Common but well-evidenced scenario. The specific warning text and the log context make this concrete. Useful as a brief, specific example in a broader discussion of dependency management.

---

## Publication Notes

No sensitive material detected. The warning is from a public SDK deprecation.
