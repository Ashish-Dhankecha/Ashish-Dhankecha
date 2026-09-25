---
title: 'litellm''s Undeclared fastapi Dependency: A Hidden Import That Broke Tool
  Calling'
slug: litellm-hidden-fastapi-dependency-ashi
content_type: DEBUGGING_DISCOVERY
project: Ashi
status: Fixed
date: '2026-08-11'
topics:
- dependencies
- debugging
- python-packaging
- llm-tooling
- litellm
evidence_level: high
publishable: true
description: "`litellm.acompletion` with `tools=` failed for all providers as `APIConnectionError:\
  \ No module named 'fastapi'`, because litellm conditionally imports fastapi and\
  \ orjson when handling tool-calling responses \u2014 two packages litellm's own\
  \ `pyproject.toml` does not declare as dependencies."
---

# litellm's Undeclared fastapi Dependency: A Hidden Import That Broke Tool Calling

## Content Type

DEBUGGING DISCOVERY

## Project

Ashi — Personal Cognitive Operating System

## Date

2026-08-11

## Status

Fixed

## One-Line Summary

`litellm.acompletion` with `tools=` failed for all providers as `APIConnectionError: No module named 'fastapi'`, because litellm conditionally imports fastapi and orjson when handling tool-calling responses — two packages litellm's own `pyproject.toml` does not declare as dependencies.

## Context

Phase T attempted to wire Ashi's planning layer to use `litellm.acompletion` with the `tools=` parameter, enabling structured tool-calling responses instead of free-text JSON parsing. The initial implementation appeared correct — the correct litellm API, properly formatted tool definitions.

## The Question

Why does `litellm.acompletion(model=..., messages=..., tools=[...])` fail with `APIConnectionError: No module named 'fastapi'` for every provider?

## Initial Approach

The error message was confusing: `APIConnectionError` suggests a network failure, but `No module named 'fastapi'` is an import error. These don't belong together in a normal exception chain. Direct inspection of the litellm stack trace.

## What Happened

The stack trace revealed:

```
litellm.acompletion(tools=[...])
  → litellm/main.py: _check_tool_call_supported()
  → litellm/mcp_handler.py: MCPHandler.__init__()
  → import fastapi  # ← ImportError
  → caught and re-raised as APIConnectionError
```

`litellm` imports `fastapi` and `orjson` at MCP handler initialization time, which is triggered when `tools=` is present in an `acompletion` call. Both packages are used by litellm's MCP (Model Context Protocol) integration. Neither is declared in litellm's `pyproject.toml` as a required dependency — they are optional extras that litellm expects to be present if MCP functionality is used.

When `fastapi` is not installed in the environment, the import fails. litellm catches the `ImportError` internally and re-raises it as `APIConnectionError` — a misleading re-wrapping that makes the problem look like a network failure rather than a missing package.

**The fix:**

Add `fastapi` and `orjson` to `ashi-llm`'s own `pyproject.toml` as explicit declared dependencies. They are not needed by Ashi's code directly — only by litellm's MCP handler when tool-calling is active. But since Ashi uses litellm with tool-calling, they are transitive runtime requirements.

```toml
# packages/ashi-llm/pyproject.toml
dependencies = [
    "litellm>=1.x",
    "fastapi>=0.100",  # required by litellm MCP handler when tools= is used
    "orjson>=3.9",     # same
    ...
]
```

After adding both: `litellm.acompletion` with `tools=` succeeds for all providers.

## Evidence

- Stack trace from failed `acompletion(tools=[...])` call
- `litellm/mcp_handler.py` — conditional `import fastapi` at initialization
- `packages/ashi-llm/pyproject.toml` — before/after dependency declarations
- `CLAUDE.md` — documents this as a known production bug in the "Known Bugs Fixed" section
- `reports/behavioral-audit/BEHAVIORAL_INTEGRITY_AUDIT.md` — litellm tool calling listed as blocking Phase T

## Diagnosis

**Established:**

litellm does not declare all of its operational dependencies in its own package manifest. This is a known class of issue in the Python ecosystem: a package that works in many environments (where fastapi is commonly installed as part of a web framework stack) silently breaks in environments where it is installed as a minimal inference library (no fastapi present).

The error re-wrapping — catching `ImportError` and re-raising as `APIConnectionError` — is litellm's own behavior. This makes the problem nearly impossible to diagnose from the error message alone: the error names a network connection class with a message about a missing package, with no indication the failure is at import time in a different module.

## What Changed

Two explicit dependency declarations in `packages/ashi-llm/pyproject.toml`. No litellm code was modified.

## What I Learned

Dependency declarations in `pyproject.toml` must include all runtime requirements — including transitive ones that a library leaves as implicit. "Works in my environment" is not a guarantee that a minimal installation will work. Any library that conditionally imports other packages should declare those packages as extras or required dependencies. When it doesn't, the consuming project must pick up the slack.

Error re-wrapping that changes the exception class (from `ImportError` to `APIConnectionError`) destroys diagnostic information. The original exception contained the name of the missing module; the re-wrapped exception contained a network-connection class with an unexpected message. If litellm had let the original `ImportError` propagate (or wrapped it as `MissingDependencyError`), the diagnosis would have taken seconds instead of tracing through litellm source.

## What I Would Do Differently

Test tool-calling in an isolated environment (a fresh venv with only declared dependencies, not the developer's full environment) before the first production use. If the isolated environment had been used for the initial test, the missing-fastapi failure would have appeared immediately, in the test environment, with no confusing re-wrapping.

## Broader Principle

When a library wraps an `ImportError` as another exception class — especially a class associated with infrastructure failures rather than code correctness — it signals the library treats missing optional dependencies as runtime failures rather than configuration errors. Add a note to the integration that documents this: "if tool-calling fails with an unexpected error class, check that fastapi and orjson are installed."

For any library that uses "optional" features that are actually required for your use case, declare those optional features' dependencies explicitly in your own manifest. Your package must be self-contained: running `pip install your-package` must produce a working installation for your intended use, not an installation that works for basic cases and silently fails for your specific feature use.

## Technical References

- `packages/ashi-llm/pyproject.toml`
- `litellm/mcp_handler.py` — `import fastapi` conditional
- `litellm/main.py` — `_check_tool_call_supported()`
- `CLAUDE.md` — "litellm tool calling fix"

## Source Confidence

HIGH — the exact import path in litellm was traced from the stack trace. The fix was tested by adding the dependencies and confirming successful tool-calling responses.

---

## Content Value

Technical Depth: 3
Engineering Insight: 4
Originality: 4
Evidence Quality: 4
Story Value: 3

**Overall: Medium-High**

The error-rewriting pattern (ImportError → APIConnectionError) is a precise, counterintuitive diagnostic gotcha. Any developer who has debugged litellm in a minimal Python environment will recognize this situation immediately. The diagnosis method — following the stack trace through litellm source — is directly applicable.

---

## Publication Notes

References to litellm, fastapi, and orjson are to public open-source packages. The diagnosis describes litellm's internal behavior in terms of its source code (publicly available). No credentials or private data. Safe to publish.
