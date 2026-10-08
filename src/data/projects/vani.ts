import { ProjectCaseStudy } from "@/types/project-case-study";

export const vaniCaseStudy: ProjectCaseStudy = {
  id: "vani",
  slug: "vani",
  title: "Vani",
  subtitle: "Sovereign Local-First Cognitive Operating System",
  tagline: "A cognitive operating system engineered for 50-year longevity with zero cloud infrastructure and an automated AST Architecture Guardian.",
  startDate: "10 July 2026",
  endDate: "16 July 2026",
  status: "SUPERSEDED",
  statusLabel: "Sovereign Architecture Milestone · Precursor to ÆON",
  isFlagship: false,
  accentColor: "#436a58",
  summary:
    "Vani was engineered as a reaction against fragile cloud-dependent AI frameworks. Designed around a 50-year longevity mandate, it eliminated external Docker and cloud services in favor of pure SQLite, introduced an AST Architecture Guardian to make import violations impossible, and treated AI models as interchangeable fuel rather than core identity.",
  links: [
    {
      label: "Lab Notes: AST Guardian",
      url: "/lab/vani/architecture-guardian-ast-analysis",
      type: "notes",
    },
    {
      label: "Why LangChain Was Rejected",
      url: "/lab/vani/rejecting-langchain-direct-contracts",
      type: "docs",
    },
    {
      label: "Graph Database Rejection",
      url: "/lab/vani/graph-database-rejection-sqlite",
      type: "docs",
    },
  ],
  snapshot: {
    type: "Sovereign Local-First Cognitive OS",
    started: "10 July 2026",
    status: "Completed Architecture Milestone · Evolved into ÆON",
    primaryLanguage: "Python 3.12 (Strict Typing / Mypy Strict)",
    stack: [
      "Python 3.12",
      "SQLite 3",
      "Python AST Static Analysis",
      "Mypy Strict",
      "Ruff",
      "PyTest",
    ],
    domain: "Local-First AI / Long-Term Software Durability / Static Architecture Verification",
    scale: "13,772 Lines · Zero External Daemons · 100% Deterministic Boot",
    architectureStyle: "Layered Composition Root · AST-Enforced Layer Invariants · Clean Port Architecture",
    verificationRatio: "100% Architecture Conformance via AST Static Analysis",
  },
  problem: {
    headline: "The Fragility of Cloud AI & Framework Churn",
    coreQuestion:
      "How do you design a personal cognitive operating system that will still boot, run, and read its memory 50 years from today without relying on proprietary cloud APIs, external database servers, or volatile third-party frameworks?",
    whyNotChatbot:
      "Modern AI development is plagued by transient framework abstractions (LangChain, LlamaIndex) that change APIs monthly, hide prompts behind opaque wrappers, and force dependencies on complex microservices (Docker, Redis, Neo4j). If an external API changes its pricing, revokes a key, or shuts down, the user's personal companion dies with it.",
    existingLimitations: [
      "Reliance on cloud LLM APIs makes personal cognitive data vulnerable to vendor deprecation and privacy leaks.",
      "Polyglot database stacks (like Leo's Redis + Postgres + Neo4j) are impossible to maintain over decades.",
      "Third-party agent frameworks introduce leaky abstractions, infinite hidden retry loops, and security vulnerabilities.",
      "Architectural guidelines in past projects eroded because violations were not caught at compile time.",
    ],
    originalHypothesis:
      "True sovereignty requires zero infrastructure dependencies. By building directly on Python and SQLite, enforcing strict import rules via a custom AST parser, and treating AI models as pluggable 'fuel' behind abstract ports, an AI companion can achieve multi-decade durability.",
    contextSummary:
      "Vani was created to correct the architectural drift discovered in Leo (where 281 violations bypassed memory gatekeepers). It established the principle: 'Architecture Before Implementation'.",
  },
  concept: {
    headline: "The 50-Year Longevity Mandate & Models as Fuel",
    coreIdea:
      "A personal AI system's value is its accumulated memory and identity, not the specific neural network generating tokens. Neural models are interchangeable fuel (`AIPort`); the cognitive OS and its SQLite records must remain sovereign, local, and durable forever.",
    diagramTitle: "Vani Layered Architecture & AST Guardian Boundary",
    flowSteps: [
      {
        step: "01",
        title: "Deterministic Kernel Boot",
        description:
          "The Composition Root initializes core subsystems in a strict, single-threaded boot sequence without background daemon dependencies.",
      },
      {
        step: "02",
        title: "AST Guardian CI Gate",
        description:
          "Before any test runs, the AST Static Analysis Guardian parses every Python file into an Abstract Syntax Tree to ensure no illegal upward imports exist.",
      },
      {
        step: "03",
        title: "Event-Driven Cognitive Cycle",
        description:
          "Perceptions and commands trigger typed events on an in-process, synchronous event bus with deterministic dispatching.",
      },
      {
        step: "04",
        title: "SQLite Sovereign Storage",
        description:
          "Working, episodic, and associative semantic data are stored in a single SQLite file using relational property tables and recursive CTEs.",
      },
      {
        step: "05",
        title: "Pluggable AIPort Execution",
        description:
          "Cognitive planning invokes the abstract `AIPort` protocol. If the local model changes or an API goes dark, a new adapter is swapped without modifying cognitive logic.",
      },
    ],
  },
  architecture: {
    overview:
      "Vani enforced a strict 4-tier layer hierarchy with an external AST Guardian running in CI to physically prevent the architectural violations that plagued Leo.",
    layers: [
      {
        layerId: "Layer 0",
        name: "Layer 0 — Foundation Contracts & Port Protocols",
        description: "Zero external dependencies. Pure abstract interfaces, contracts, exceptions, and data models.",
        components: [
          {
            id: "contracts",
            name: "Contracts & Port Protocols (`src/runtime/contracts/`)",
            status: "VERIFIED",
            purpose: "Defines abstract protocols (`AIPort`, `StoragePort`, `EventBusPort`) that higher layers program against.",
            howItWorks: "Python `typing.Protocol` classes enforcing structural subtyping without runtime overhead.",
            tradeoff: "Requires upfront interface design before writing any functional logic.",
          },
          {
            id: "ast-guardian",
            name: "AST Architecture Guardian (`tools/guardian/`)",
            status: "VERIFIED",
            purpose: "Static analysis script inspecting the AST of every file to enforce import boundaries.",
            howItWorks: "Parses Python ASTs, validates all `import` statements against layer matrices, and fails CI on violations.",
            tradeoff: "Build fails if a developer takes an informal shortcut.",
          },
        ],
      },
      {
        layerId: "Layer 1",
        name: "Layer 1 — Core Runtime Substrate",
        description: "Event bus, configuration, and SQLite single-file persistence.",
        components: [
          {
            id: "event-bus",
            name: "Synchronous Event Bus (`src/runtime/events/`)",
            status: "VERIFIED",
            purpose: "Deterministic in-process event delivery mechanism for all cognitive state changes.",
            howItWorks: "Publish-subscribe pattern with type-checked event payloads and synchronous execution guarantees.",
            tradeoff: "Synchronous dispatch requires handlers to avoid long blocking I/O.",
          },
          {
            id: "sqlite-store",
            name: "Single-File SQLite Engine (`src/runtime/storage/`)",
            status: "VERIFIED",
            purpose: "Zero-dependency persistence for episodic logs and associative property graphs.",
            howItWorks: "Replaced Neo4j with SQLite recursive CTEs; data lives in a single portable `.db` file.",
            tradeoff: "Recursive CTEs for deep graph traversals are slower than native Cypher engines at scale.",
          },
        ],
      },
      {
        layerId: "Layer 2",
        name: "Layer 2 — Cognitive Kernel & Scheduler",
        description: "State-machine execution loop, temporal scheduling, and health verification.",
        components: [
          {
            id: "cognitive-loop",
            name: "Cognitive Tick Loop (`src/runtime/loop/`)",
            status: "IMPLEMENTED",
            purpose: "Drives discrete cognitive processing ticks, state transitions, and health checks.",
            howItWorks: "Manages state transitions: `IDLE` -> `PERCEIVING` -> `REASONING` -> `ACTING` -> `COMMITTING`.",
            tradeoff: "Strict state machines require explicit error transition handling for every tool failure.",
          },
          {
            id: "scheduler",
            name: "Task Scheduler (`src/runtime/scheduler/`)",
            status: "IMPLEMENTED",
            purpose: "Deterministic priority scheduling of internal tasks without threading complexity.",
            howItWorks: "Single-threaded async scheduler resolving task dependencies.",
            tradeoff: "CPU-bound tasks require careful yield points to avoid starving the event bus.",
          },
        ],
      },
      {
        layerId: "Layer 3",
        name: "Layer 3 — Pluggable AI Adapters (AIPort)",
        description: "Concrete model providers implementing the clean AIPort contract.",
        components: [
          {
            id: "ai-port-adapters",
            name: "Local / Remote Model Adapters (`src/runtime/ai/`)",
            status: "IMPLEMENTED",
            purpose: "Translates abstract cognitive generation requests into concrete local SLM or API calls.",
            howItWorks: "Interchangeable drivers adhering to `AIPort`. Swapping providers requires 1 config line.",
            tradeoff: "Lowest-common-denominator prompt abstractions across radically different models.",
          },
        ],
      },
    ],
  },
  executionFlow: {
    title: "Execution Flow: Sovereign Knowledge Ingestion",
    description:
      "How Vani ingests and indexes user information locally without contacting cloud services or spawning external database daemons.",
    concreteExample: {
      input: "User records personal preference: 'I prefer concise architectural summaries without conversational fluff.'",
      steps: [
        {
          phase: "01. Input Normalization",
          subsystem: "Input Adapter",
          action: "Wraps text into a typed `UserFactEvent` with SHA-256 integrity hash.",
          stateChange: "Event emitted to Event Bus.",
        },
        {
          phase: "02. Event Routing",
          subsystem: "Event Bus",
          action: "Synchronously delivers event to the Cognitive Loop and Knowledge Subsystem.",
          stateChange: "Subscribers activated deterministically.",
        },
        {
          phase: "03. Local Extraction",
          subsystem: "AIPort (Local SLM Adapter)",
          action: "Local model extracts entity-attribute-value triple: `(User, preference_style, concise)`.",
          stateChange: "Triple validated against schema.",
        },
        {
          phase: "04. SQLite Persistence",
          subsystem: "SQLite Storage Engine",
          action: "Writes triple into `property_graph` table and appends event to `audit_log` within a single ACID transaction.",
          stateChange: "SQLite WAL committed to disk.",
        },
        {
          phase: "05. Verification",
          subsystem: "Health Monitor",
          action: "Verifies database integrity pragma (`PRAGMA quick_check;`) returns 'ok'.",
          stateChange: "System returns to IDLE state.",
        },
      ],
      output:
        "Preference recorded locally in SQLite. Zero bytes transmitted over network. Database portable as a single file.",
    },
  },
  engineeringDecisions: [
    {
      id: "adr-vani-ast-guardian",
      adrNumber: "ADR-009",
      title: "AST Architecture Guardian vs Written Architecture Guidelines",
      context:
        "Leo's 281 architectural violations proved that written documentation, checklists, and code reviews inevitably fail under development pressure.",
      optionsConsidered: [
        {
          option: "More detailed architecture documentation and PR checklists",
          pros: "Zero engineering effort to write.",
          cons: "Ignored during rapid coding sessions; does not stop bad code from merging.",
        },
        {
          option: "Python AST Static Analysis Guardian running in pre-commit and CI",
          pros: "Build breaks immediately if an unauthorized import occurs. Enforces 100% mechanical conformance.",
          cons: "Requires maintaining custom AST parsing logic in the repository.",
        },
      ],
      choice: "Python AST Static Analysis Guardian",
      why: "Made architectural drift physically impossible. In Vani, an engineer could not import a database session inside an API router even if they tried.",
      tradeoff: "Adds ~1.5s to CI test execution time to parse all project syntax trees.",
      evidencePath: "lab-content/Vani/009-architecture-guardian-ast.md",
    },
    {
      id: "adr-vani-rejecting-langchain",
      adrNumber: "ADR-014",
      title: "Rejection of LangChain and LlamaIndex",
      context:
        "Initial prototypes considered using established agent frameworks to accelerate development.",
      optionsConsidered: [
        {
          option: "Adopt LangChain / LlamaIndex",
          pros: "Off-the-shelf abstractions for chains, prompts, and vector search.",
          cons: "Massive dependency bloat (hundreds of transient packages), frequent breaking changes, hidden prompt injection surfaces, uncontrolled while-loops, difficult debugging.",
        },
        {
          option: "Build Bespoke First-Principles Runtime on Python Standard Library",
          pros: "Zero bloat, complete control over prompt assembly and state transitions, multi-decade durability.",
          cons: "Must write custom event loops and prompt staging from scratch.",
        },
      ],
      choice: "Bespoke First-Principles Runtime",
      why: "A personal cognitive operating system cannot outsource its core reasoning kernel to a volatile venture-backed Python library that rewrites its API every six months.",
      tradeoff: "Spent 2 weeks writing foundational event bus and scheduling contracts.",
      evidencePath: "lab-content/Vani/014-rejecting-langchain.md",
    },
    {
      id: "adr-vani-sqlite-over-neo4j",
      adrNumber: "ADR-003",
      title: "Rejection of Graph Databases (Neo4j) in Favor of SQLite Property Tables",
      context:
        "Leo used Neo4j for semantic relationships. Maintaining Neo4j required a JVM, 1.5GB of RAM, and continuous Docker daemon management, violating the 50-year longevity mandate.",
      optionsConsidered: [
        {
          option: "Retain Neo4j",
          pros: "Native Cypher query language, optimized graph traversal algorithms.",
          cons: "JVM overhead, Docker dependency, difficult backups, risk of software obsolescence.",
        },
        {
          option: "Relational Property Tables in SQLite with Recursive CTEs",
          pros: "Zero-configuration single file, runs on literally every operating system, guaranteed readable for decades, negligible memory footprint.",
          cons: "Writing multi-hop graph queries requires more complex SQL CTE syntax.",
        },
      ],
      choice: "SQLite Relational Property Tables",
      why: "SQLite is one of the most thoroughly tested, durable software libraries in human history. A personal cognitive archive stored in SQLite will be readable in 2076.",
      tradeoff: "Slightly more complex query logic for multi-hop relationship lookups.",
      evidencePath: "lab-content/Vani/003-graph-database-rejection.md",
    },
  ],
  hardProblems: [
    {
      title: "Graph Traversal Without a Graph Database",
      whyDifficult:
        "Personal memory requires exploring relationship networks (e.g., 'Find all people connected to Project X who were mentioned in meetings last week'). Doing this in relational SQL can cause combinatorial query explosion.",
      initialApproach:
        "Naive recursive Python queries fetching nodes one by one.",
      whatFailed:
        "N+1 query problem caused multi-second retrieval times for 4-hop relationship lookups.",
      finalApproach:
        "Constructed optimized Common Table Expressions (Recursive CTEs) in SQLite with depth bounding and cycle detection visited-sets.",
      currentState:
        "Sub-10ms response times for up to 5 hops across 50,000 relational triples.",
    },
    {
      title: "Model Obsolescence & The 'AIPort' Abstraction",
      whyDifficult:
        "Different LLMs have radically different capabilities, context windows, and tool-call syntaxes. Coupling prompt structures to GPT-4 or Claude 3 means the system breaks when those models are deprecated.",
      initialApproach:
        "Model-specific prompt formatting branches scattered across the codebase.",
      whatFailed:
        "Branching logic metastasized across 15 files, making it terrifying to test a new local model.",
      finalApproach:
        "Formalized the `AIPort` protocol: higher-order cognitive systems produce pure semantic requests (`TaskGoal`, `ContextBundle`), and provider adapters handle model-specific token formatting.",
      currentState:
        "Successfully decoupled cognitive logic from model APIs; models can be swapped via single configuration flags.",
    },
  ],
  failuresAndLessons: [
    {
      title: "Phase 0 Documentation vs Implementation Desynchronization",
      badge: "GOVERNANCE DESYNC",
      failure:
        "The project README stated that Vani was in 'Phase 0 (Skeleton: no active runtime)' when in reality 13,000+ lines of sophisticated event loops, schedulers, and storage modules were already implemented and tested.",
      rootCause:
        "Rigorous adherence to 'Architecture Before Implementation' led to spending weeks crafting architectural governance documents while the README was neglected and remained frozen at day-one boilerplate.",
      attemptedFix:
        "Periodic manual documentation reviews.",
      finalFix:
        "Instituted an automated documentation audit script that compares git commits and lines of code against claimed project status.",
      lesson:
        "Documentation debt is just as real as code debt. When engineering moves faster than docs, the repository lies to external observers about its actual state.",
      verifiedEvidence: "lab-content/Vani/CLAIM_VERIFICATION.md",
    },
  ],
  timeline: [
    {
      phase: "Phase 0",
      date: "Mid 2026",
      title: "Constitution & AST Guardian Genesis",
      whatChanged: "Established Foundation Laws, clean Port protocols, and the Python AST Static Analysis Guardian.",
      why: "Ensure that Leo's 281 architectural violations could never physically happen again.",
      implementation: "Created `tools/guardian` and defined `src/runtime/contracts/`.",
      result: "100% mechanical enforcement of layer boundaries.",
      status: "COMPLETED",
    },
    {
      phase: "Phase 1",
      date: "Mid–Late 2026",
      title: "Zero-Infrastructure Engine & SQLite Graph",
      whatChanged: "Eliminated Neo4j and Docker; implemented recursive CTE property graph on SQLite.",
      why: "Achieve the 50-year longevity mandate with zero external service dependencies.",
      implementation: "Wrote custom SQLite migration engine and recursive query builders.",
      result: "Single-file `.db` portability with sub-10ms graph queries.",
      status: "COMPLETED",
    },
    {
      phase: "Phase 2",
      date: "Late 2026",
      title: "Transition & Architectural Merge into ÆON",
      whatChanged: "Synthesized Vani's AST rigor and SQLite longevity into the 28-package uv monorepo of ÆON.",
      why: "Expand scope to encompass local SLM inference, multimodality, and empirical soak testing.",
      implementation: "Migrated Vani's domain contracts into ÆON's foundation layers.",
      result: "Vani archived as an architectural success; core DNA active in ÆON.",
      status: "PIVOT",
    },
  ],
  verification: {
    headline: "Mechanical Conformance & Zero-Violation Certification",
    testSuiteSummary:
      "Vani achieved a flawless 100% architectural conformance record through its automated AST Guardian, proving that compiler-level enforcement eliminates architectural drift.",
    metrics: [
      {
        label: "AST Architecture Violations",
        value: "0",
        context: "Zero illegal imports across 13,000+ lines of Python code.",
        status: "pass",
      },
      {
        label: "External Runtime Daemons",
        value: "0",
        context: "Runs directly on Python standard library + SQLite with zero Docker containers.",
        status: "pass",
      },
      {
        label: "Type Safety (Mypy Strict)",
        value: "100%",
        context: "All contracts, events, and loop state machines pass strict static type analysis.",
        status: "pass",
      },
      {
        label: "Database Longevity Score",
        value: "50 Years",
        context: "SQLite storage format guaranteed readable across any OS platform indefinitely.",
        status: "pass",
      },
    ],
    methodology:
      "Every git commit was audited by the AST Guardian, scanning import trees for layer violations. Test suites used in-memory SQLite instances to verify deterministic event bus dispatching without external network calls.",
    auditResults: [
      {
        auditName: "AST Guardian Static Analysis Audit",
        scoreOrVerdict: "ZERO VIOLATIONS (100% CONFORMANCE)",
        details:
          "Confirmed that not a single higher-layer module was imported by lower-layer foundations, and direct database access was strictly isolated to storage adapters.",
        uncoveredFlaws: [
          "README documentation lagged 13,000 lines behind actual codebase implementation.",
        ],
      },
    ],
  },
  research: {
    title: "Key Contributions to Software Longevity",
    existingEngineering:
      "Developed a complete zero-cloud cognitive substrate with SQLite-backed property graphs and AST import gatekeeping.",
    experimentalDirections: [
      "50-Year Portable Cognitive Spec: Standardizing personal cognitive archives into self-describing SQLite schemas.",
      "Compiler-enforced architectural governance for solo engineers.",
    ],
    potentialContributions: [
      "Demonstration of replacing heavy graph databases (Neo4j) with recursive CTEs in personal knowledge systems.",
    ],
  },
  lessons: {
    quote:
      "If software cannot run without a cloud subscription or Docker orchestrator, it does not belong to you. True intelligence systems must be built to last decades, not sprint cycles.",
    takeaways: [
      {
        title: "Longevity Requires Radical Simplicity",
        insight:
          "Every external service you add (Redis, Neo4j, Docker) is a timer counting down to an operational failure. SQLite and the standard library survive when everything else breaks.",
      },
      {
        title: "The AST Guardian Works",
        insight:
          "Leo had 281 architectural violations; Vani had zero. The difference was entirely mechanical: Leo used documentation, Vani used a Python AST parser that broke the build.",
      },
      {
        title: "Models Are Fuel, Architecture Is Engine",
        insight:
          "Never couple your system's core identity or memory to a specific LLM API. Decouple reasoning from token generation through strict port protocols.",
      },
    ],
  },
  currentState: {
    status: "SUPERSEDED",
    summary:
      "Vani completed its architectural mission and was superseded by ÆON. Its core design principles—AST enforcement, zero cloud bloat, and models as fuel—live on in ÆON's foundation layers.",
    whatWorks: [
      "AST Static Analysis Guardian with 100% layer enforcement.",
      "Zero-daemon cognitive event bus and SQLite property graph.",
      "Strictly typed `AIPort` protocol isolating model dependencies.",
    ],
    whatIsIncomplete: [
      "High-level autonomous planning was intentionally deferred to Phase 2 (which occurred inside ÆON).",
    ],
    whatRemains: [
      "Serves as an architectural textbook and clean template for sovereign, local-first Python software.",
    ],
    whatIWouldChangeToday: [
      "I would integrate local SLM inference (llama.cpp) earlier in the prototyping phase.",
    ],
  },
  next: {
    statusNotice: "Vani's architectural lineage continues directly in ÆON.",
    items: [
      {
        title: "ÆON Monorepo Evolution",
        type: "PLANNED",
        description:
          "Vani's AST layer enforcement evolved into ÆON's automated `test_substrate_architecture_invariants.py`.",
      },
    ],
  },
  lineage: {
    predecessor: {
      slug: "leo",
      name: "Leo",
      relationship: "Vani was created directly to eliminate Leo's 281 architectural violations and database sprawl.",
    },
    successor: {
      slug: "aeon",
      name: "ÆON",
      relationship: "ÆON expanded Vani's sovereign architecture into a 28-package uv monorepo with local SLM execution.",
    },
    roleInEvolution:
      "The critical transitional bridge where architectural discipline, static verification, and local-first sovereignty became non-negotiable foundations.",
  },
};
