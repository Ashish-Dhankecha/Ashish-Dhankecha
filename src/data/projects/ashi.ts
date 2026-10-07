import { ProjectCaseStudy } from "@/types/project-case-study";

export const ashiCaseStudy: ProjectCaseStudy = {
  id: "ashi",
  slug: "ashi",
  title: "ÆON",
  subtitle: "Personal Cognitive Operating System",
  tagline: "A 34-package personal AI operating system built from first principles for a single human user.",
  startDate: "16 July 2026",
  endDate: "Present",
  status: "ACTIVE",
  statusLabel: "Flagship Active Build · Core Runtime Verified",
  isFlagship: true,
  accentColor: "var(--accent-brass)",
  summary:
    "ÆON is an ambitious, stateful cognitive operating system designed from first principles to accumulate a longitudinal model of one person—their goals, habits, relationships, and cognitive processes—over years without suffering from context drift or hallucinated task completion.",
  links: [
    {
      label: "GitHub Monorepo",
      url: "https://github.com/Ashish-Dhankecha",
      type: "github",
    },
    {
      label: "Lab Notes & ADRs",
      url: "/lab/ashi",
      type: "notes",
    },
    {
      label: "Architecture Report",
      url: "/lab/ashi/ashi-monorepo-architecture-overview",
      type: "docs",
    },
  ],
  snapshot: {
    type: "Personal Cognitive Operating System (Monorepo)",
    started: "16 July 2026",
    status: "Active Research & Core Engineering",
    primaryLanguage: "Python 3.12 (uv Workspace)",
    stack: [
      "Python 3.12",
      "uv Monorepo",
      "PostgreSQL",
      "SQLite",
      "llama-cpp-python",
      "Qwen2.5-1.5B-Instruct",
      "FastAPI",
      "PyTest",
      "AT-SPI Linux",
    ],
    domain: "Cognitive Architecture / Agent Runtimes / Local SLMs",
    scale: "34 Packages · 282k Lines of Package Code · 6,458 Test Functions",
    architectureStyle: "Layered Monorepo · Strict Dependency Invariants · Tick-Driven Runtime",
    verificationRatio: "181 / 181 Architectural Invariant Tests Passed",
  },
  problem: {
    headline: "Why Stateless LLM Chatbots Fail as Persistent Companions",
    coreQuestion:
      "How do you build an AI system that maintains an accurate, evolving longitudinal model of one person over years without succumbing to memory pollution, context window saturation, and silent task failures?",
    whyNotChatbot:
      "A standard chatbot is fundamentally stateless. Each conversation resets to zero or relies on naive sliding context windows that discard history unpredictably. Standard agent frameworks (like LangChain) compound this by wrapping API calls in uninspected while-loops that hallucinate task completion, leak resources, and provide zero guarantees of long-term state consistency.",
    existingLimitations: [
      "Sliding context windows arbitrarily truncate deep personal history and user constraints.",
      "Vector database 'RAG' frequently merges contradictory facts because cosine similarity cannot distinguish negation (e.g., 'I quit smoking' vs 'I smoke').",
      "Standard agents suffer from 'Vacuous Success': returning status 200/Success when executing zero steps.",
      "Cloud API dependencies introduce 30+ second latency roundtrips and catastrophic quota failures.",
      "No architectural separation between memory retrieval, reasoning, expression, and execution permissions.",
    ],
    originalHypothesis:
      "A durable personal AI companion must not be built as a prompt wrapper. It must be engineered like an operating system: with an immutable append-only event log as ground truth, strict acyclic dependency layers, local SLM inference for bounded reasoning, and explicit permission boundaries separating proposal from execution.",
    contextSummary:
      "ÆON was started on 16 July 2026 after auditing previous iterations (Leo and Vani). It was designed from day one with a 28-package uv workspace where circular dependencies are prohibited by CI assertions.",
  },
  concept: {
    headline: "The Longitudinal Cognitive Cycle",
    coreIdea:
      "Every sensory input enters an immutable perception pipeline, is contextualized by long-term episodic/semantic memory, reasoned over by a local bounded inference engine, gated by strict permission boundaries, and recorded into an append-only event ledger for asynchronous reflection.",
    diagramTitle: "End-to-End Cognitive Loop",
    flowSteps: [
      {
        step: "01",
        title: "Perception & Interpretation",
        description:
          "Raw multimodal observations (text, voice, desktop window state) are validated and transformed into immutable cognitive frames, analyzing pragmatics and sentiment.",
      },
      {
        step: "02",
        title: "Contextualization & Worldstate",
        description:
          "The runtime queries the knowledge graph and relationship models to ground the input in historical user context and current environmental state.",
      },
      {
        step: "03",
        title: "Reasoning & Hypothesis Formulation",
        description:
          "Bounded local SLM inference (Qwen2.5-1.5B via llama.cpp) synthesizes hypotheses without network roundtrips, adhering to strict schema validation.",
      },
      {
        step: "04",
        title: "Planning & Permission Gating",
        description:
          "The planner translates hypotheses into goal trees. Actions are checked against hard permission boundaries before dispatching to the execution sandbox.",
      },
      {
        step: "05",
        title: "Expression Modulation",
        description:
          "Character and presence subsystems shape outbound responses—modulating tone, pacing, and challenge level without modifying core identity.",
      },
      {
        step: "06",
        title: "Immutable Event Ledger & Reflection",
        description:
          "Every thought, action, and outcome is committed to an append-only event log. An out-of-band reflection engine proposes state updates that a separate learning gatekeeper accepts or rejects.",
      },
    ],
  },
  architecture: {
    overview:
      "ÆON is organized into six strictly stratified architectural layers across 34 Python packages managed via uv workspaces. Cross-layer dependency violations are caught at CI time by structural invariant tests.",
    layers: [
      {
        layerId: "L0",
        name: "L0 — Pure Foundation",
        description: "Zero domain logic. Infrastructure primitives, configuration, and persistence.",
        components: [
          {
            id: "ashi-config",
            name: "ashi-config",
            status: "VERIFIED",
            purpose: "Hierarchical, type-safe settings loaded at startup with environment overrides.",
            howItWorks: "Pydantic-based configuration schemas with validation gates. Never imports higher layers.",
            tradeoff: "Rigid startup validation prevents hot-reloading certain low-level socket bindings.",
            keyFiles: ["packages/ashi-config/src/config/schema.py"],
          },
          {
            id: "ashi-observability",
            name: "ashi-observability",
            status: "VERIFIED",
            purpose: "Structured telemetry, OpenTelemetry tracing, and correlation ID propagation.",
            howItWorks: "Emits JSONL traces across all cognitive ticks and tool execution calls.",
            tradeoff: "Trace disk footprint requires periodic compaction on long soak runs.",
            keyFiles: ["packages/ashi-observability/src/tracing.py"],
          },
          {
            id: "ashi-storage",
            name: "ashi-storage",
            status: "VERIFIED",
            purpose: "Persistence layer with versioned schema migrations without third-party ORM bloat.",
            howItWorks: "Direct PostgreSQL and SQLite connections with explicit transaction wrappers.",
            tradeoff: "Manual migration SQL scripts required instead of automated Alembic autogeneration.",
            keyFiles: ["packages/ashi-storage/src/migrations/"],
          },
        ],
      },
      {
        layerId: "L1",
        name: "L1 — Domain Substrate",
        description: "Core data contracts, memory primitives, and immutable event streams.",
        components: [
          {
            id: "ashi-events",
            name: "ashi-events",
            status: "VERIFIED",
            purpose: "The immutable source of truth for the entire cognitive lifecycle.",
            howItWorks: "Append-only event stream recording perceptions, inferences, actions, and reflections with sequential IDs.",
            tradeoff: "Queries require index scanning; requires snapshotting for fast system recovery.",
            keyFiles: ["packages/ashi-events/src/event_bus.py"],
          },
          {
            id: "ashi-memory",
            name: "ashi-memory",
            status: "IMPLEMENTED",
            purpose: "Multi-tiered cognitive memory: working, episodic, semantic, and procedural.",
            howItWorks: "Separates vector semantic search from relational episodic histories with contradiction checks.",
            tradeoff: "Vector retrieval alone cannot detect negation; requires exact syntactic guardrails.",
            keyFiles: ["packages/ashi-memory/src/manager.py"],
          },
          {
            id: "ashi-identity",
            name: "ashi-identity",
            status: "VERIFIED",
            purpose: "Persistent core identity model, foundational beliefs, and communication invariants.",
            howItWorks: "Read-only for runtime ticks; only mutable via audited learning proposals.",
            tradeoff: "Inflexible during rapid multi-turn conversations by design.",
            keyFiles: ["packages/ashi-identity/src/model.py"],
          },
          {
            id: "ashi-session",
            name: "ashi-session",
            status: "VERIFIED",
            purpose: "Manages conversational boundaries, thread isolation, and turn lifecycles.",
            howItWorks: "Tracks active user engagement states, idle pauses, and session rollups.",
            tradeoff: "Session boundary timeouts require heuristic tuning for ambient computing.",
          },
          {
            id: "ashi-prompts",
            name: "ashi-prompts",
            status: "VERIFIED",
            purpose: "Managed prompt templates with strict schema enforcement and versioning.",
            howItWorks: "Jinja2-based strict templates preventing runtime prompt injection.",
            tradeoff: "Changes require package version bumps.",
          },
        ],
      },
      {
        layerId: "L2",
        name: "L2 — Cognitive Services",
        description: "Synthesis engines, local SLM inference, perception pipelines, and runtime tick loop.",
        components: [
          {
            id: "ashi-runtime",
            name: "ashi-runtime",
            status: "IMPLEMENTED",
            purpose: "The central tick-loop driver containing the workspace, attention manager, and executive control.",
            howItWorks: "Executes discrete cognitive ticks at configurable frequencies, polling contributors and dispatching tasks.",
            tradeoff: "Tick-based model introduces event polling delays compared to pure async event triggers.",
            keyFiles: ["packages/ashi-runtime/src/engine.py"],
          },
          {
            id: "ashi-inference",
            name: "ashi-inference",
            status: "IMPLEMENTED",
            purpose: "Local, bounded structured inference platform powered by llama-cpp-python.",
            howItWorks: "Loads Qwen2.5-1.5B-Instruct locally. Uses grammar-guided JSON schemas for deterministic tool calls.",
            tradeoff: "Sub-2B models exhibit a 18.2% no-action accuracy ceiling when prompts lack strict boundaries.",
            keyFiles: ["packages/ashi-inference/src/llama_cpp_backend.py"],
          },
          {
            id: "ashi-knowledge",
            name: "ashi-knowledge",
            status: "IMPLEMENTED",
            purpose: "Persistent property graph of user facts and confidence-weighted belief models.",
            howItWorks: "Maintains relational entity-attribute-value triples with explicit confidence scores (0.0 to 1.0).",
            tradeoff: "Graph joins incur latency penalties as the entity count scales past 10,000 nodes.",
          },
          {
            id: "ashi-reasoning",
            name: "ashi-reasoning",
            status: "PARTIAL",
            purpose: "Synthesizes world models from memory and knowledge to infer structured conclusions.",
            howItWorks: "Runs deductive and abductive inference chains over current attention frames.",
            tradeoff: "Heavy reliance on model reasoning capability; restricted behind validation gates.",
          },
          {
            id: "ashi-perception",
            name: "ashi-perception",
            status: "IMPLEMENTED",
            purpose: "Transforms raw sensory observations into immutable cognitive frames.",
            howItWorks: "Parses text, desktop AT-SPI window focus, and audio streams into normalized events.",
            tradeoff: "High frequency OS events require debouncing to prevent event loop saturation.",
          },
          {
            id: "ashi-interpretation",
            name: "ashi-interpretation",
            status: "PARTIAL",
            purpose: "Pragmatic analysis (detecting intent, ambiguity, emotion) prior to core reasoning.",
            howItWorks: "Fast classification pass evaluating conversational context and implicit instructions.",
            tradeoff: "Can misclassify dry humor or sarcasm without extensive few-shot examples.",
          },
        ],
      },
      {
        layerId: "L3",
        name: "L3 — Behavioral Intelligence",
        description: "Adaptive personality, planning, execution sandbox, and self-reflection.",
        components: [
          {
            id: "ashi-planning",
            name: "ashi-planning",
            status: "IMPLEMENTED",
            purpose: "Translates conclusions into persistent goal trees and action sequences.",
            howItWorks: "Generates multi-step plans with explicit preconditions and postconditions.",
            tradeoff: "Susceptible to 'vacuous success' if empty step arrays evaluate as successfully completed.",
          },
          {
            id: "ashi-execution",
            name: "ashi-execution",
            status: "IMPLEMENTED",
            purpose: "Tool dispatch, environment interaction, and strict permission boundary enforcement.",
            howItWorks: "Dispatches validated commands to isolated processes. Enforces read-only vs destructive constraints.",
            tradeoff: "Process isolation introduces process spawn latency overhead.",
          },
          {
            id: "ashi-reflection",
            name: "ashi-reflection",
            status: "EXPERIMENTAL",
            purpose: "Asynchronously audits the event log to propose memory updates and belief corrections.",
            howItWorks: "Runs during idle ticks. Emits 'Proposals'—cannot write directly to storage.",
            tradeoff: "Proposals can accumulate if the learning gatekeeper's acceptance criteria are too strict.",
          },
          {
            id: "ashi-learning",
            name: "ashi-learning",
            status: "EXPERIMENTAL",
            purpose: "Gatekeeper that validates and applies accepted reflection proposals.",
            howItWorks: "Evaluates proposal evidence against past history before committing state changes.",
            tradeoff: "Over-cautious acceptance can slow adaptation to legitimate user preference changes.",
          },
          {
            id: "ashi-character",
            name: "ashi-character",
            status: "VERIFIED",
            purpose: "Governs expression tone, intellectual challenge level, and conversational demeanor.",
            howItWorks: "Injects stylistic framing into generation prompts without mutating core identity.",
            tradeoff: "Requires continuous calibration to prevent overly dry or robotic tonality.",
          },
          {
            id: "ashi-worldstate",
            name: "ashi-worldstate",
            status: "IMPLEMENTED",
            purpose: "Persisted model of the user's external environment, ongoing projects, and active files.",
            howItWorks: "Tracks filesystem modifications, git branches, and IDE active buffers.",
            tradeoff: "Unbounded graph edges required introduction of ResourceLedger.",
          },
        ],
      },
      {
        layerId: "L4",
        name: "L4 — Integration & Generation",
        description: "LLM orchestration, credential pooling, failover, and prompt staging.",
        components: [
          {
            id: "ashi-llm",
            name: "ashi-llm",
            status: "IMPLEMENTED",
            purpose: "Multi-provider routing, credential pooling, quota management, and fallback mechanics.",
            howItWorks: "Routes requests between local llama.cpp and external APIs (Gemini/OpenAI) with rate-limit tracking.",
            tradeoff: "Complex failover state machine requires careful timeout tuning.",
          },
          {
            id: "ashi-pipeline",
            name: "ashi-pipeline",
            status: "VERIFIED",
            purpose: "Staging pipeline assembling context, memory, and prompts for final generation.",
            howItWorks: "Assembles token budgets deterministically, ensuring high-priority context is never truncated.",
            tradeoff: "Strict budget cuts lower-priority historical context during long exchanges.",
          },
        ],
      },
      {
        layerId: "L5",
        name: "L5 — Validation Infrastructure",
        description: "Out-of-band testing, simulation harnesses, and empirical capability benchmarks.",
        components: [
          {
            id: "ashi-soak",
            name: "ashi-soak",
            status: "VERIFIED",
            purpose: "Multi-hour soak test harness running synthetic user personas to detect leaks and drift.",
            howItWorks: "Injects hundreds of simulated user turns over 6+ hours, logging memory leaks and FD growth.",
            tradeoff: "High resource consumption during continuous testing.",
          },
          {
            id: "ashi-simulation",
            name: "ashi-simulation",
            status: "VERIFIED",
            purpose: "Simulated multi-agent digital life environment for testing conversational pacing.",
            howItWorks: "Mocks external tools and clocks to test agent behavior under compressed time.",
            tradeoff: "Synthetic user interactions do not fully capture human non-sequiturs.",
          },
          {
            id: "ashi-evaluation",
            name: "ashi-evaluation",
            status: "VERIFIED",
            purpose: "Empirical benchmark runner evaluating schema validity, tool accuracy, and regression tracking.",
            howItWorks: "Executes standardized evaluation suites across model quantizations (Q4, Q8, FP16).",
            tradeoff: "Requires deterministic scoring logic to prevent benchmark scorer bugs.",
          },
        ],
      },
    ],
  },
  executionFlow: {
    title: "Execution Trace: Contextualized File Investigation",
    description:
      "An illustrative walk-through, written to show the flow (not a captured log), of how ÆON processes a user request from sensory intake to sandboxed tool execution and immutable logging.",
    concreteExample: {
      input: "User asks: 'Did we finish fixing the database deadlock issue from yesterday?'",
      steps: [
        {
          phase: "01. Intake",
          subsystem: "ashi-perception",
          action: "Ingests raw text input, assigns global correlation ID `evt_9821_cycle`, and creates immutable input frame.",
          stateChange: "Event logged to append-only ledger.",
        },
        {
          phase: "02. Pragmatics",
          subsystem: "ashi-interpretation",
          action: "Identifies query as a status verification request regarding past engineering work. Flags implicit entity: 'database deadlock'.",
          stateChange: "Attention frame annotated with intent: `QUERY_STATUS`.",
        },
        {
          phase: "03. Recall",
          subsystem: "ashi-memory & ashi-knowledge",
          action: "Queries episodic history for 'database deadlock' within the last 48 hours. Retrieves commit SHA `8f21ca` and ADR 0137.",
          stateChange: "Working memory populated with 2 episodic references and verified ADR link.",
        },
        {
          phase: "04. Reasoning",
          subsystem: "ashi-inference",
          action: "Local Qwen2.5-1.5B model generates plan: query git log for recent commits on `db/pool.py` to verify fix deployment.",
          stateChange: "Plan proposal formulated: 1 inspection step.",
        },
        {
          phase: "05. Permission",
          subsystem: "ashi-execution",
          action: "Evaluates action against PermissionBoundary. Action is read-only git command: `ALLOWED_UNRESTRICTED`.",
          stateChange: "Command executed in subprocess sandbox: returns exit code 0 and patch evidence.",
        },
        {
          phase: "06. Verification",
          subsystem: "ashi-runtime",
          action: "Evaluates goal completion assertion. Confirms `_has_execution_evidence == True` before marking sub-goal complete.",
          stateChange: "Vacuous success guard satisfied. Plan state updated to `RESOLVED`.",
        },
        {
          phase: "07. Expression",
          subsystem: "ashi-character",
          action: "Formats response concisely with exact commit reference: 'Yes, ADR 0137 was applied in commit 8f21ca yesterday at 18:30.'",
          stateChange: "Final generation emitted to user interface.",
        },
        {
          phase: "08. Ledger",
          subsystem: "ashi-events",
          action: "Appends full cognitive cycle record (8 frames, 2 tools, 1 response) to PostgreSQL event store.",
          stateChange: "Cycle committed. Workspace state clean for next tick.",
        },
      ],
      output:
        "Yes, the database deadlock issue was resolved yesterday in commit 8f21ca (applying ADR 0137 interlock). All destructive tests now enforce `ASHI_ALLOW_DESTRUCTIVE_TESTS=1`.",
    },
  },
  engineeringDecisions: [
    {
      id: "adr-monorepo-uv",
      adrNumber: "ADR-001",
      title: "Monorepo with 28 Separate uv Packages vs Single Package Monolith",
      context:
        "As cognitive subsystems grew, developers in earlier projects (Leo) experienced massive circular dependencies and architectural drift where UI modules directly queried backend databases.",
      optionsConsidered: [
        {
          option: "Single large Python monolith",
          pros: "Fast initial development, single pyproject.toml, simple import paths.",
          cons: "Impossible to structurally prevent circular dependencies; code rot is inevitable over months.",
        },
        {
          option: "Multiple independent git repositories",
          pros: "Strict isolation.",
          cons: "Extreme release orchestration overhead; version hell for a solo research project.",
        },
        {
          option: "uv Workspace Monorepo with explicit package dependencies",
          pros: "Blazing fast builds, strict acyclic dependency enforcement, modular boundaries with local path links.",
          cons: "Requires precise dependency declarations in each package's pyproject.toml.",
        },
      ],
      choice: "uv Workspace Monorepo (28 packages)",
      why: "Allows structural architectural enforcement: CI runs `test_substrate_architecture_invariants.py` which compiles the dependency graph and fails if any illegal import or circular link exists.",
      tradeoff: "Slightly more boilerplate when creating new domain models shared across layers.",
      evidencePath: "lab-content/Ashi/019-monorepo-architecture-overview.md",
    },
    {
      id: "adr-llama-cpp-local-slm",
      adrNumber: "ADR-009",
      title: "Direct llama.cpp Binding vs Ollama Daemon",
      context:
        "Turn latency on local models was unacceptable (32.8s per turn) when routing through an intermediate Ollama HTTP daemon. Furthermore, cancellation during generation caused silent zombie processes.",
      optionsConsidered: [
        {
          option: "Ollama HTTP daemon",
          pros: "Simple REST API, easy model pulling.",
          cons: "Added 15-20s HTTP marshalling overhead, poor GPU memory retention, inability to handle SIGINT cancellations cleanly.",
        },
        {
          option: "In-process llama-cpp-python C-bindings",
          pros: "Direct GPU tensor access, zero HTTP serialization, sub-second TTFT (time-to-first-token), reduced turn latency to 5.4s.",
          cons: "Process-level segfault risks on improper thread cancellation (discovered in ADR 006).",
        },
      ],
      choice: "In-process llama-cpp-python C-bindings with cancellation safety wrapper",
      why: "Dropped end-to-end turn latency by 83.5% (from 32.8 seconds to 5.4 seconds), making local autonomous reasoning practical.",
      tradeoff: "Required custom signal handling to catch native C++ thread cancellation without crashing Python.",
      evidencePath: "lab-content/Ashi/009-ollama-removal.md",
    },
    {
      id: "adr-destructive-db-interlock",
      adrNumber: "ADR-0137",
      title: "Hard Interlock for Destructive Integration Tests",
      context:
        "During an automated test run, an integration test marked `@pytest.mark.postgres` truncated production-like tables on the developer workstation because test credentials pointed to the local database instance.",
      optionsConsidered: [
        {
          option: "Developer discipline / manual checklist",
          pros: "Zero code changes.",
          cons: "Guaranteed to fail eventually when tests are run in a hurry.",
        },
        {
          option: "Strict environment variable interlock and DB name inspection",
          pros: "Physically impossible to truncate tables unless the database name contains '_test' or 'ASHI_ALLOW_DESTRUCTIVE_TESTS=1' is set.",
          cons: "Tests fail with explicit error if run against default databases.",
        },
      ],
      choice: "Strict environment variable interlock (`ASHI_ALLOW_DESTRUCTIVE_TESTS=1`)",
      why: "Production databases and persistent development event stores must never be exposed to catastrophic data loss from test runners.",
      tradeoff: "Developers must set explicit environment flags when running live integration test suites.",
      evidencePath: "lab-content/Ashi/010-destructive-test-database-interlock.md",
    },
    {
      id: "adr-architecture-freeze",
      adrNumber: "ADR-018",
      title: "Architecture Freeze: Hardening Existing Subsystems Before Adding Voice M5",
      context:
        "The roadmap called for Phase M5 (live duplex voice streaming). However, live testing of core cognitive loops revealed intermittent hangs, FD leaks, and rate-limit reporting bugs.",
      optionsConsidered: [
        {
          option: "Proceed with voice feature implementation",
          pros: "Flashy demo capabilities, immediate visual/audio gratification.",
          cons: "Layers complex real-time audio on top of an unstable cognitive runtime; bugs become exponentially harder to diagnose.",
        },
        {
          option: "Declare architecture freeze and execute rigorous empirical audits",
          pros: "Exposed the 3/10 behavioral audit score, vacuous success bug, and AT-SPI descriptor leaks before they infected new features.",
          cons: "Delayed user-facing voice demo by 3 weeks.",
        },
      ],
      choice: "Architecture Freeze & Empirical Hardening",
      why: "A cognitive operating system is only as good as its foundation. Building voice over an unstable runtime is an amateur trap.",
      tradeoff: "Short-term feature velocity dropped to zero while reliability and test coverage surged.",
      evidencePath: "lab-content/Ashi/018-architecture-freeze-decision.md",
    },
  ],
  hardProblems: [
    {
      title: "Context Window Saturation vs Infinite Longitudinal History",
      whyDifficult:
        "A user generates hundreds of interactions daily. Feeding months of history into LLM context windows causes severe context dilution, exorbitant costs, and model hallucinations.",
      initialApproach:
        "Standard vector database search (ChromaDB) retrieving top-k similar conversation snippets.",
      whatFailed:
        "Cosine similarity failed on negation and temporal progression. Asking 'What is my current car?' returned discussions about buying an old car from 2 years ago with 0.88 similarity.",
      finalApproach:
        "Multi-tiered memory: Working memory (current session), Episodic memory (timestamped event log with temporal decay weighting), and a Semantic Property Graph with explicit contradiction resolution.",
      currentState:
        "Operational. Entities are versioned with confidence scores and explicit timestamps rather than pure embedding closeness.",
    },
    {
      id: "hard-atspi-leak",
      title: "AT-SPI Linux Accessibility Bus File Descriptor Leakage",
      whyDifficult:
        "Monitoring user desktop context (active window, document title) required querying the Linux AT-SPI accessibility bus every 2 seconds. In Linux, AT-SPI creates internal IPC sockets across GTK applications.",
      initialApproach:
        "Spawn a lightweight AT-SPI client instance on each perception tick.",
      whatFailed:
        "Each client connection leaked 3 pidfds inside GTK3 applications. Within 7 minutes of continuous operation, GTK3 desktop apps hit the 1024 FD limit and crashed system services (ibus, evolution-alarm) at 100% CPU.",
      finalApproach:
        "Architected a persistent singleton `HostDesktopObserver` that maintains a single long-lived D-Bus connection with bounded window tracking capped at 64 items.",
      currentState:
        "Zero descriptor leaks over 24-hour soak tests. CPU overhead remains below 0.3%.",
    },
    {
      id: "hard-sub2b-instruction",
      title: "Sub-2B Parameter Model Instruction Following Ceiling",
      whyDifficult:
        "To run entirely locally on consumer hardware without GPU fan screaming, ÆON targets 1.5B parameter models (Qwen2.5-1.5B). Smaller models struggle with multi-step reasoning and nested JSON syntax.",
      initialApproach:
        "Standard system prompts with few-shot examples requesting JSON output.",
      whatFailed:
        "Schema validity was 92.7%, but 'no-action accuracy' fell to 18.2%. When presented with casual user conversation, the model hallucinated tool calls 81.8% of the time instead of responding conversationally.",
      finalApproach:
        "Implemented a hard PermissionBoundary safeguard: local SLM output is passed through a deterministic heuristic gate that intercepts tool proposals and forces conversational fallback if confidence invariants fail.",
      currentState:
        "Local inference safely isolated behind PermissionBoundary. Schema validity: 98.4%, false tool invocation reduced to <4%.",
    },
  ],
  failuresAndLessons: [
    {
      title: "The Vacuous Success Bug: 85% of Plans Falsely Marked Completed",
      badge: "CRITICAL FAILURE",
      failure:
        "During Phase T action integrity testing, ÆON reported a 100% plan success rate. However, manual inspection revealed that 23 out of 27 plans executed exactly zero steps.",
      rootCause:
        "In Python, the built-in function `all([])` evaluates to `True`. When the planner produced an empty array of sub-goals `[]`, the completion check `all(step.is_complete for step in plan.steps)` evaluated to `True` instantly. The system declared victory without doing any work.",
      attemptedFix:
        "Add a check `if len(plan.steps) > 0` before checking `all()`.",
      finalFix:
        "Mandated that plans with zero steps yield `NO_ACTION_PROPOSAL`. Added an explicit architectural invariant: `ACHIEVED` status strictly requires `_has_execution_evidence == True`, verified by cryptographic event signatures.",
      lesson:
        "Never trust aggregate metrics or boolean reductions over collections without asserting non-empty evidence. A 100% pass rate is often a bug, not a victory.",
      verifiedEvidence: "lab-content/Ashi/001-vacuous-success-bug.md",
    },
    {
      title: "The 3/10 Behavioral Audit: Capability Reality Gap",
      badge: "EMPIRICAL POST-MORTEM",
      failure:
        "An objective behavioral audit against 10 real-world user scenarios resulted in a failing score of 3 out of 10. The system suffered from memory hallucinations, tool execution timeouts, and conversational repetition.",
      rootCause:
        "Development had focused on unit-testing individual packages in isolation. When wired together in the composition root, small timing mismatches and prompt assumptions cascaded into total system failures.",
      attemptedFix:
        "Tweak prompt weights and add retry loops around failed API calls.",
      finalFix:
        "Instituted an Architecture Freeze. Replaced manual ad-hoc testing with continuous soak tests (`ashi-soak`) and built the automated `ashi-evaluation` harness running 144 standardized test scenarios.",
      lesson:
        "Subsystem unit tests give a false sense of security. An AI operating system can only be certified through multi-turn behavioral soak testing with real environments.",
      verifiedEvidence: "lab-content/Ashi/002-behavioral-audit-three-out-of-ten.md",
    },
    {
      title: "llama.cpp Native Thread Segfault on User Cancellation",
      badge: "CRASH POST-MORTEM",
      failure:
        "When a user hit Ctrl+C or sent a new prompt while the local model was generating tokens, the entire Python process crashed with `SIGSEGV` (segmentation fault).",
      rootCause:
        "Python's `signal.signal` handler caught the interrupt and cleaned up memory buffers while the underlying C++ llama.cpp worker thread was actively writing tensors into shared memory.",
      attemptedFix:
        "Ignore interrupts during generation, forcing the user to wait for completion.",
      finalFix:
        "Built a thread-safe cancellation callback utilizing llama.cpp's native `llama_progress_callback` returning `True` to gracefully halt the C++ inference loop before triggering Python memory cleanup.",
      lesson:
        "Wrapping native C/C++ libraries in Python requires deep understanding of thread boundaries and signal propagation. High-level exceptions do not save you from native memory corruption.",
      verifiedEvidence: "lab-content/Ashi/006-segfault-llama-cpp-cancellation.md",
    },
    {
      title: "Rate Limit Health Signal Corruption",
      badge: "TELEMETRY BUG",
      failure:
        "When an upstream provider (Gemini API) returned HTTP 429 (Rate Limit Exceeded), the health monitor marked the entire subsystem as `DEAD` and permanently diverted all traffic to degraded fallbacks.",
      rootCause:
        "The health signal handler treated any non-200 HTTP code as a fatal connection drop rather than a temporary throttling signal.",
      attemptedFix:
        "Add a 5-minute cooldown timer before retrying the provider.",
      finalFix:
        "Introduced exponential backoff jitter with quota bucket tracking in `ashi-llm`. Distinguished `RATE_LIMITED` (transient) from `ENDPOINT_UNREACHABLE` (fatal).",
      lesson:
        "Status codes have semantics. Treating transient capacity limits as fatal crashes destroys system resilience.",
      verifiedEvidence: "lab-content/Ashi/008-rate-limit-health-signal-bug.md",
    },
  ],
  timeline: [
    {
      phase: "Phase 0",
      date: "16 July 2026",
      title: "Monorepo Genesis & Invariant Formulation",
      whatChanged: "Established the 28-package uv workspace and automated dependency graph linter.",
      why: "Prevent the circular dependency collapse that crippled earlier projects (Leo).",
      implementation: "Created `packages/` directory and wrote `test_substrate_architecture_invariants.py`.",
      result: "100% acyclic dependency graph enforced in CI.",
      status: "COMPLETED",
    },
    {
      phase: "Phase 1",
      date: "August 2026",
      title: "Domain Substrate & Event Sourcing",
      whatChanged: "Built immutable event ledger and multi-tier memory stores (Postgres + pgvector).",
      why: "Provide verifiable ground truth for every cognitive action.",
      implementation: "Implemented `ashi-events` and `ashi-storage` with transactional isolation.",
      result: "Sub-millisecond event commits; full replayability of agent execution traces.",
      status: "COMPLETED",
    },
    {
      phase: "Phase 2",
      date: "Late August 2026",
      title: "Local SLM Integration (llama.cpp)",
      whatChanged: "Integrated Qwen2.5-1.5B via llama-cpp-python, eliminating Ollama daemon.",
      why: "Drop turn latency from 32.8s to 5.4s and achieve full local sovereignty.",
      implementation: "Custom C-bindings with cancellation callbacks and JSON grammar constraints.",
      result: "83.5% latency reduction; zero external network egress during local ticks.",
      status: "VERIFIED",
    },
    {
      phase: "Phase 3",
      date: "September 2026",
      title: "Empirical Audits & Architecture Freeze",
      whatChanged: "Halted new feature development to audit system behavior under realistic soak testing.",
      why: "Uncovered 3/10 audit score, vacuous success bug, and AT-SPI descriptor leaks.",
      implementation: "Constructed `ashi-soak` and `ashi-evaluation` benchmark harnesses.",
      result: "Fixed vacuous success, solved GTK descriptor leaks, passed 181 invariant tests.",
      status: "VERIFIED",
    },
    {
      phase: "Phase 4",
      date: "October 2026 — Present",
      title: "Hardened Runtime & Long-Horizon Stability",
      whatChanged: "Stabilizing memory reflection pipelines and refining bounded planning gates.",
      why: "Ensure system can operate autonomously for weeks without memory pollution.",
      implementation: "ResourceLedger bounding algorithms and reflection proposal approval gates.",
      result: "Active daily dogfooding on developer workstation.",
      status: "EXPERIMENTAL",
    },
  ],
  verification: {
    headline: "Empirical Testing & Rigorous Verification",
    testSuiteSummary:
      "ÆON is verified through a dual testing regime: 181 deterministic architectural and unit invariant tests running in CI, combined with automated multi-hour soak benchmarks.",
    metrics: [
      {
        label: "Substrate Invariants",
        value: "181 / 181",
        context: "Acyclic dependency checks, composition root invariants, and storage isolation.",
        status: "pass",
      },
      {
        label: "End-to-End Turn Latency",
        value: "5.4s",
        context: "Reduced from 32.8s after eliminating Ollama daemon in favor of in-process llama.cpp.",
        status: "pass",
      },
      {
        label: "Initial Behavioral Audit",
        value: "3 / 10",
        context: "Failing score during first multi-turn real-world evaluation, triggering Architecture Freeze.",
        status: "fail",
      },
      {
        label: "Schema Validity vs Action",
        value: "92.7% / 18.2%",
        context: "1.5B model achieved high JSON validity but only 18.2% accuracy in knowing when NOT to act.",
        status: "audit",
      },
      {
        label: "Post-Freeze Certification",
        value: "100%",
        context: "Zero AT-SPI descriptor leaks over 6-hour soak runs; vacuous plans rejected.",
        status: "pass",
      },
    ],
    methodology:
      "Every pull request executes `pytest` with strict coverage and architectural invariant verification. Live database operations require disposable test instances (`ASHI_ALLOW_DESTRUCTIVE_TESTS=1`). Capability regressions are tested against a golden manifest of 144 evaluation prompts.",
    auditResults: [
      {
        auditName: "Phase T Action Integrity Audit",
        scoreOrVerdict: "FLAW DISCOVERED & RESOLVED",
        details:
          "Discovered that 23 of 27 plans evaluated as successful without performing steps due to Python's vacuous `all([]) == True` behavior.",
        uncoveredFlaws: [
          "Vacuous truth evaluations over empty lists.",
          "Missing execution evidence cryptographic checks.",
        ],
      },
      {
        auditName: "Phase F.2 Desktop Soak Audit",
        scoreOrVerdict: "RESOLVED AFTER ARCHITECTURE REFACTOR",
        details:
          "Discovered Linux AT-SPI accessibility bus was leaking 3 pidfds inside GTK3 applications every 2 seconds, crashing system daemons in 7 minutes.",
        uncoveredFlaws: [
          "D-Bus client connection accumulation.",
          "Unbounded window focus tracking history.",
        ],
      },
    ],
  },
  performance: {
    summary:
      "Performance optimization in ÆON focused on eliminating serialization hops and maximizing local GPU utilization without exceeding thermal or memory budgets.",
    benchmarks: [
      {
        metric: "Cognitive Turn Latency",
        before: "32.8s",
        after: "5.4s",
        unit: "seconds",
        notes: "Eliminated Ollama HTTP daemon overhead; bound directly to llama.cpp in-process.",
      },
      {
        metric: "Time to First Token (TTFT)",
        before: "4.2s",
        after: "0.45s",
        unit: "seconds",
        notes: "Cached prompt prefixes for static cognitive system prompts.",
      },
      {
        metric: "AT-SPI Perception Overhead",
        before: "100% CPU (Crash)",
        after: "<0.3% CPU",
        unit: "CPU usage",
        notes: "Singleton HostDesktopObserver replaced per-tick client spawning.",
      },
    ],
    resourceFootprint: [
      {
        component: "Core Cognitive Runtime",
        memory: "~240 MB",
        cpuOrLatency: "<2% idle CPU",
        notes: "Python runtime tick loop with in-memory attention buffers.",
      },
      {
        component: "Local SLM (Qwen2.5-1.5B Q4_K_M)",
        memory: "1.2 GB VRAM",
        cpuOrLatency: "45 tokens/sec",
        notes: "Offloaded to dedicated GPU tensors via llama-cpp-python.",
      },
      {
        component: "PostgreSQL Event Store",
        memory: "~180 MB",
        cpuOrLatency: "<1.2ms / event",
        notes: "Append-only tables indexed on correlation ID and timestamp.",
      },
    ],
  },
  security: {
    threatModel:
      "A personal AI agent possesses file access and execution capabilities. An unchecked agent can execute destructive commands, delete data, or leak credentials via prompt injection.",
    accessControls: {
      allowed: [
        "Read-only inspection of git repositories and workspace project files.",
        "Querying local episodic memory and knowledge property graphs.",
        "Generating structured text artifacts and reports.",
        "Emitting desktop notifications and audio cues.",
      ],
      disallowed: [
        "Executing unvetted shell commands without explicit interactive confirmation.",
        "Truncating or deleting non-disposable database tables.",
        "Accessing external network endpoints when running in local-only mode.",
        "Directly mutating identity traits or core beliefs without learning review.",
      ],
    },
    sandboxingMechanism:
      "All execution tools run within a sandboxed process boundary. File access is strictly constrained to whitelisted workspace paths using path canonicalization (`os.path.realpath`) and symlink traversal prevention.",
  },
  research: {
    title: "Research Directions & Empirical Findings",
    existingEngineering:
      "Built a production-grade cognitive operating system (28 packages at genesis, 34 today) with local SLM inference, event sourcing, and empirical validation tooling.",
    experimentalDirections: [
      "Dynamic Episodic Memory Compaction: Investigating lossless semantic summarization over multi-month event logs.",
      "Dual-Process SLM/LLM Orchestration: Using local 1.5B models for instant reflexive perception while delegating complex abductive planning to large models.",
      "Asynchronous Sleep/Reflection Cycles: Allowing the agent to process event histories during user downtime to refine belief graphs.",
    ],
    potentialContributions: [
      "Empirical evidence documenting the failure modes of sub-2B parameter models in agentic tool-use loops.",
      "A reproducible framework for testing architectural invariants and memory corruption in long-running agent monorepos.",
    ],
    unimplementedClaimsNotes:
      "Autonomous self-modification and continuous online weight adaptation remain theoretical research directions and are explicitly NOT implemented in production.",
  },
  lessons: {
    quote:
      "Building a cognitive system taught me that persistent memory is not simply vector search, and long-running agents require failure recovery and observability far more than clever prompt engineering.",
    takeaways: [
      {
        title: "Architecture Must Be Mechanically Enforced",
        insight:
          "Documentation, guidelines, and good intentions cannot prevent architectural drift. Only automated tests that inspect imports and fail CI can keep a codebase clean over months of development.",
      },
      {
        title: "Beware of Vacuous Success",
        insight:
          "The most insidious bugs are not crashes, but silent empty successes where the system reports 100% completion without performing any actions. Always verify positive execution evidence.",
      },
      {
        title: "Sub-2B Models Require Guardrails",
        insight:
          "Small local models have high schema validity but poor negative judgment. They must always be bounded by deterministic permission gates that intercept hallucinated tool invocations.",
      },
      {
        title: "Freeze Early, Audit Ruthlessly",
        insight:
          "When core behavior feels unpredictable, freezing feature development and building comprehensive soak tests is the only way to transform an unstable prototype into a serious engineering system.",
      },
    ],
  },
  currentState: {
    status: "ACTIVE",
    summary:
      "ÆON is actively maintained and dogfooded daily on the author's primary workstation. The core cognitive runtime, local inference, and memory stores are stable and verified.",
    whatWorks: [
      "uv monorepo (34 packages today, 28 at genesis) with 181 passing invariant tests.",
      "Local Qwen2.5-1.5B inference via llama.cpp with sub-6s turn latency.",
      "Append-only event log with replayable cognitive cycle traces.",
      "Persistent property graph and episodic memory retrieval.",
      "Desktop AT-SPI observer with zero file descriptor leaks.",
    ],
    whatIsIncomplete: [
      "Voice interaction (Phase M5) paused during architecture freeze; audio streaming pipeline requires final integration.",
      "Reflection engine proposals currently require manual approval before learning gatekeeper commits them.",
      "Android companion client in early prototype stage.",
    ],
    whatRemains: [
      "Long-horizon evaluation over 30+ consecutive days of live interaction.",
      "Automated consolidation of contradictory belief nodes in the knowledge graph.",
    ],
    whatIWouldChangeToday: [
      "I would integrate grammar-constrained sampling at the C++ layer from day one rather than attempting prompt-based JSON schemas.",
      "I would implement the ResourceLedger memory bounds earlier to prevent workspace growth explosions.",
    ],
  },
  next: {
    statusNotice:
      "The following items represent documented future development directions and are not yet verified in production.",
    items: [
      {
        title: "Duplex Audio Streaming Pipeline (Phase M5)",
        type: "PLANNED",
        description:
          "Resuming integration of real-time voice perception and TTS synthesis using local whisper and piper models with interruption handling.",
      },
      {
        title: "Autonomous Reflection Auto-Commit",
        type: "RESEARCH_DIRECTION",
        description:
          "Calibrating confidence thresholds to allow the learning gatekeeper to automatically commit high-confidence belief updates during idle ticks.",
      },
      {
        title: "Lightweight Android Presence Client",
        type: "PLANNED",
        description:
          "A mobile interface connecting over encrypted WebSockets to provide contextual awareness when away from the workstation.",
      },
    ],
  },
  codeExploration: {
    githubUrl: "https://github.com/Ashish-Dhankecha",
    localSnippets: [
      {
        title: "Substrate Architectural Invariant Linter",
        filename: "tests/test_substrate_architecture_invariants.py",
        language: "python",
        code: `def test_package_dependencies_are_strictly_acyclic():
    """Verify that the 28-package dependency graph contains zero cycles."""
    graph = build_workspace_dependency_graph()
    cycles = list(networkx.simple_cycles(graph))
    assert not cycles, f"Circular dependencies detected: {cycles}"

def test_layer_boundaries_are_respected():
    """L1 packages must never import L2 or L3 packages."""
    for package in get_packages_by_layer("L1"):
        forbidden_imports = find_imports_from_layers(package, ["L2", "L3", "L4"])
        assert not forbidden_imports, f"Illegal upward dependency in {package}: {forbidden_imports}"`,
        explanation:
          "Automated invariant test enforcing layered architecture and acyclic dependency graphs across every workspace package (28 at genesis, 34 today).",
      },
      {
        title: "Vacuous Success Guard in Goal Verifier",
        filename: "packages/ashi-planning/src/verifier.py",
        language: "python",
        code: `def verify_plan_completion(plan: GoalPlan) -> VerificationResult:
    # PREVENT VACUOUS SUCCESS BUG: all([]) is True in Python
    if not plan.steps:
        return VerificationResult(
            status=PlanStatus.REJECTED,
            reason="Empty plan cannot be marked achieved without execution evidence."
        )
    
    for step in plan.steps:
        if not step.has_execution_evidence:
            return VerificationResult(
                status=PlanStatus.INCOMPLETE,
                reason=f"Step {step.id} lacks cryptographic execution evidence."
            )
            
    return VerificationResult(status=PlanStatus.ACHIEVED, evidence_count=len(plan.steps))`,
        explanation:
          "Direct mitigation for the Vacuous Success Bug, ensuring no empty plan can claim successful execution.",
      },
    ],
  },
  lineage: {
    predecessor: {
      slug: "vani",
      name: "Vani",
      relationship: "Inherited zero-cloud philosophy, local-first runtime, and AST invariant enforcement.",
    },
    roleInEvolution:
      "ÆON is the flagship system representing the culmination of architectural lessons from Leo and Vani, built with industrial-grade monorepo discipline and empirical testing.",
  },
};
