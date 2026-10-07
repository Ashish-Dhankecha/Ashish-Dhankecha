import { ProjectCaseStudy } from "@/types/project-case-study";

export const leoCaseStudy: ProjectCaseStudy = {
  id: "leo",
  slug: "leo",
  title: "Leo",
  subtitle: "Open-Architecture Cognitive Operating System",
  tagline: "An ambitious cognitive operating system mapping 43 subsystems that exposed the critical reality gap between architecture and implementation.",
  startDate: "16 June 2026",
  endDate: "10 July 2026",
  status: "SUPERSEDED",
  statusLabel: "Pioneering Milestone · Superseded by Vani & ÆON",
  isFlagship: false,
  accentColor: "#d4a568",
  summary:
    "Leo was an early, ambitious exploration into treating artificial intelligence as an operating system workload. It introduced a centralized cognitive kernel, a Cognitive Memory Management Unit (CMMU), and 43 granular subsystems, but a forensic Phase 28 audit uncovered 281 direct database violations that permanently reshaped my approach to engineering enforcement.",
  links: [
    {
      label: "GitHub Archive",
      url: "https://github.com/Ashish-Dhankecha",
      type: "github",
    },
    {
      label: "Lab Notes: 281 Violations",
      url: "/lab/leo/281-architectural-violations-phase-28",
      type: "notes",
    },
    {
      label: "CMMU Architecture Note",
      url: "/lab/leo/cmmu-cognitive-memory-management-unit",
      type: "docs",
    },
  ],
  snapshot: {
    type: "Cognitive Operating System Prototype",
    started: "16 June 2026",
    status: "Archived & Superseded by Vani / ÆON",
    primaryLanguage: "Python 3.11 / React 18",
    stack: [
      "Python 3.11",
      "FastAPI",
      "PostgreSQL (pgvector)",
      "Neo4j",
      "Redis",
      "Three.js",
      "Docker",
    ],
    domain: "Cognitive OS Kernel / Multi-Database Memory / Agent Scheduling",
    scale: "43 Subsystems · 3 Database Engines · 281 Audit Violations Documented",
    architectureStyle: "OS Kernel Metaphor · Centralized CMMU Gateway · DAG Scheduler",
    verificationRatio: "281 Architectural Invariant Bypasses Discovered in Phase 28",
  },
  problem: {
    headline: "Treating Agent Cognition as an Operating System Workload",
    coreQuestion:
      "Can we manage complex, long-running AI agent processes by applying proven operating system primitives—clocks, process schedulers, and memory management units—instead of linear while-loops?",
    whyNotChatbot:
      "Conventional AI agents were built as linear scripting loops (`while True: response = llm.chat(...)`). When background tasks ran concurrently with user conversations, systems suffered from priority inversion, state corruption, and runaway token expenses. There was no concept of process priority, temporal synchronization, or memory access arbitration.",
    existingLimitations: [
      "No mechanism for fast interactive queries to preempt long-running background reasoning.",
      "Fragmented state split across disparate caching, vector, and relational databases without transactional consistency.",
      "Lack of architectural governance allowed modules to bypass memory gatekeepers and directly query databases.",
      "Unit test suites heavily relied on mocks, creating a false impression of health while integration points rotted.",
    ],
    originalHypothesis:
      "By placing a Cognitive Kernel at the center of the system—featuring a temporal clock, a DAG scheduler, and a hardware-inspired Cognitive Memory Management Unit (CMMU)—an agent could coordinate 40+ specialized capabilities without deadlocks or priority inversion.",
    contextSummary:
      "Leo represented the foundational exploration phase of my systems thinking. It proved the power of OS-level scheduling for AI, but also provided my most valuable lesson in technical debt and architectural enforcement.",
  },
  concept: {
    headline: "The Operating System Metaphor for AI",
    coreIdea:
      "Cognitive actions are treated as OS processes scheduled across priority queues, synchronized by a temporal heartbeat, and restricted to accessing memory solely through a memory management gateway.",
    diagramTitle: "Leo Kernel & Subsystem Topology",
    flowSteps: [
      {
        step: "01",
        title: "Ingestion via UCI",
        description:
          "Events from WebSockets, Telegram, or REST arrive at the Unified Communication Interface and are normalized into system interrupts.",
      },
      {
        step: "02",
        title: "Kernel Synchronization",
        description:
          "The Cognitive Clock emits synchronization ticks, driving the DAG execution engine to resolve dependencies and allocate compute.",
      },
      {
        step: "03",
        title: "Priority DAG Scheduling",
        description:
          "Interactive user requests (Priority 1) pre-empt long-running background cognitive reflections (Priority 4).",
      },
      {
        step: "04",
        title: "CMMU Memory Mediation",
        description:
          "Subsystems request data via the CMMU, which translates virtual cognitive addresses to Redis (working), Postgres (episodic), or Neo4j (associative).",
      },
      {
        step: "05",
        title: "Cognitive Engine Execution",
        description:
          "Belief engines, conflict resolvers, and domain skills process state and yield outputs back through the UCI.",
      },
    ],
  },
  architecture: {
    overview:
      "Leo was designed with a centralized kernel coordinating 43 granular subsystems across four primary divisions: Kernel, CMMU, Cognition, and Interfaces.",
    layers: [
      {
        layerId: "Kernel",
        name: "1. Cognitive Kernel",
        description: "The core orchestration engine managing lifecycle, timing, and invariants.",
        components: [
          {
            id: "kernel-clock",
            name: "Cognitive Clock (`backend/app/kernel/clock/`)",
            status: "IMPLEMENTED",
            purpose: "Emits discrete temporal pulses to synchronize cognitive ticks across subsystems.",
            howItWorks: "Async timer driving periodic maintenance and scheduling cycles.",
            tradeoff: "Fixed tick rates introduce slight latency overhead for ad-hoc user events.",
          },
          {
            id: "kernel-scheduler",
            name: "DAG Scheduler (`backend/app/kernel/scheduler/`)",
            status: "IMPLEMENTED",
            purpose: "A directed acyclic graph execution engine resolving task dependencies with priority levels.",
            howItWorks: "Enqueues cognitive tasks with priorities (P1 Interactive to P4 Background).",
            tradeoff: "DAG construction overhead for trivial single-turn questions.",
          },
          {
            id: "kernel-guardian",
            name: "Architecture Guardian (`backend/app/kernel/guardian/`)",
            status: "PARTIAL",
            purpose: "Runtime validator intended to prevent structural drift and enforce layer boundaries.",
            howItWorks: "Monitored registered service calls against declared architectural rules.",
            tradeoff: "Could only intercept dynamic calls; failed to detect 281 static import bypasses.",
          },
        ],
      },
      {
        layerId: "CMMU",
        name: "2. Cognitive Memory Management Unit (CMMU)",
        description: "Unified gatekeeper intended to mediate all database interactions.",
        components: [
          {
            id: "cmmu-working",
            name: "Working Memory Manager (Redis)",
            status: "IMPLEMENTED",
            purpose: "High-speed ephemeral scratchpad for active conversational context.",
            howItWorks: "Key-value cache with TTL expiration policies.",
            tradeoff: "Data lost on Redis restarts without persistent snapshotting.",
          },
          {
            id: "cmmu-episodic",
            name: "Episodic Memory Manager (PostgreSQL + pgvector)",
            status: "IMPLEMENTED",
            purpose: "Long-term chronological timeline storage of past interactions.",
            howItWorks: "Vector similarity search combined with SQL relational filtering.",
            tradeoff: "Vector indexing overhead during high-volume batch writes.",
          },
          {
            id: "cmmu-associative",
            name: "Associative Knowledge Graph (Neo4j)",
            status: "IMPLEMENTED",
            purpose: "Semantic graph representing interconnected real-world entities and concepts.",
            howItWorks: "Cypher queries over labeled property graphs.",
            tradeoff: "Massive operational complexity and synchronization overhead across 3 databases.",
          },
        ],
      },
      {
        layerId: "Cognition",
        name: "3. Cognition Engines",
        description: "Higher-order reasoning, belief modeling, and conflict resolution modules.",
        components: [
          {
            id: "cognition-meta",
            name: "Meta-Cognition & Beliefs",
            status: "EXPERIMENTAL",
            purpose: "Models confidence scores, system self-awareness, and cognitive reflection.",
            howItWorks: "Calculates epistemic uncertainty over retrieved factual memories.",
            tradeoff: "Subject to model hallucination when evaluating its own confidence.",
          },
          {
            id: "cognition-contradiction",
            name: "Contradiction Resolution",
            status: "EXPERIMENTAL",
            purpose: "Detects and flags conflicting knowledge triples in the semantic graph.",
            howItWorks: "Runs pairwise semantic comparison between incoming facts and existing beliefs.",
            tradeoff: "High compute cost when scanning large associative subgraphs.",
          },
        ],
      },
      {
        layerId: "Interfaces",
        name: "4. Unified Communication & Presentation",
        description: "Multi-channel transport layer and 3D visualization frontend.",
        components: [
          {
            id: "uci-transport",
            name: "Unified Communication Interface (UCI)",
            status: "IMPLEMENTED",
            purpose: "Normalizes incoming messages across WebSockets, Telegram, and REST into unified interrupts.",
            howItWorks: "Adapter pattern converting third-party webhooks into internal Event objects.",
            tradeoff: "Required maintaining adapters for multiple disparate messaging protocols.",
          },
          {
            id: "threejs-frontend",
            name: "React 18 / Three.js 3D Visualizer",
            status: "IMPLEMENTED",
            purpose: "Real-time 3D visual workspace rendering cognitive states and memory nodes.",
            howItWorks: "WebGL canvas rendering graph clusters driven by WebSocket telemetry.",
            tradeoff: "High client-side GPU usage; distracting from core engineering utility.",
          },
        ],
      },
    ],
  },
  executionFlow: {
    title: "Execution Flow: Preemptive Cognitive Scheduling",
    description:
      "How Leo scheduled concurrent background thinking tasks and prioritized an incoming interactive user message.",
    concreteExample: {
      input: "Interactive user message arrives via WebSocket while background graph indexing is executing.",
      steps: [
        {
          phase: "01. Intake",
          subsystem: "UCI Gateway",
          action: "Catches WebSocket payload, tags as Priority 1 (Interactive), and signals Kernel Interconnect.",
          stateChange: "Interrupt queued in Scheduler mailbox.",
        },
        {
          phase: "02. Preemption",
          subsystem: "DAG Scheduler",
          action: "Pauses active Priority 4 (Associative Graph Indexing) task and saves execution checkpoint.",
          stateChange: "Compute resources reallocated to P1 task.",
        },
        {
          phase: "03. Memory Lookup",
          subsystem: "CMMU Gateway",
          action: "Fetches active session state from Redis working memory and recent episodic vectors from PostgreSQL.",
          stateChange: "Context assembled for reasoning pipeline.",
        },
        {
          phase: "04. Reasoning",
          subsystem: "Cognition Engine",
          action: "Executes LLM provider inference with automatic failover (Gemini -> Groq).",
          stateChange: "Response synthesized in 1.8s.",
        },
        {
          phase: "05. Dispatch & Resume",
          subsystem: "DAG Scheduler & UCI",
          action: "Emits response to user via WebSocket, then resumes the paused P4 background indexing task.",
          stateChange: "Background graph indexing resumes from checkpoint.",
        },
      ],
      output:
        "Instant user response delivered without interference from intensive background graph indexing.",
    },
  },
  engineeringDecisions: [
    {
      id: "adr-leo-dag-scheduler",
      title: "DAG Execution Engine vs Linear Event Loop",
      context:
        "Standard Python agents run synchronous `while True` loops that freeze the application whenever an external API or long-running tool is invoked.",
      optionsConsidered: [
        {
          option: "Simple asyncio event loop",
          pros: "Standard Python library, simple syntax.",
          cons: "No native priority queuing or dependency resolution across multi-step agent plans.",
        },
        {
          option: "Priority-aware DAG Scheduler",
          pros: "Explicit dependency graphs, priority preemption (P1 user chat over P4 memory consolidation).",
          cons: "Significant architectural complexity and scheduling overhead.",
        },
      ],
      choice: "Custom Priority DAG Scheduler",
      why: "Allowed background self-maintenance tasks to run continuously without degrading user interaction latency.",
      tradeoff: "Debugging task dependency deadlocks required building custom graph visualization tools.",
    },
    {
      id: "adr-leo-three-database-stack",
      title: "Three-Database Memory Architecture (Redis + Postgres + Neo4j)",
      context:
        "Different cognitive memories have different access patterns: working memory is fast key-value, episodic is chronological vector, and associative is a network graph.",
      optionsConsidered: [
        {
          option: "Single relational database (PostgreSQL alone)",
          pros: "Single connection pool, transactional ACID guarantees.",
          cons: "Complex recursive Cypher-like queries required for associative relationship traversal.",
        },
        {
          option: "Polyglot Persistence: Redis + Postgres + Neo4j mediated by CMMU",
          pros: "Optimal engine for each access pattern (sub-millisecond Redis cache, pgvector for history, Neo4j for graphs).",
          cons: "Enormous operational footprint, zero cross-database transaction guarantees, immense failure surface.",
        },
      ],
      choice: "Polyglot Persistence (Redis + Postgres + Neo4j)",
      why: "Attempted to replicate hardware computer architecture (L1 cache, RAM, NVMe) in cognitive software.",
      tradeoff: "Became the system's greatest source of technical debt; required managing 3 connection pools and Docker containers.",
    },
  ],
  hardProblems: [
    {
      title: "Cross-Database Distributed Consistency",
      whyDifficult:
        "When an agent formed a new memory, it had to write to Redis (working), PostgreSQL (episodic), and Neo4j (graph). If Neo4j timed out, the system entered a split-brain state.",
      initialApproach:
        "Sequential async writes in a single Python function.",
      whatFailed:
        "Network blips caused partial writes: an event was recorded in PostgreSQL but had no corresponding edges in Neo4j, corrupting semantic recall.",
      finalApproach:
        "Two-phase commit coordinator in the CMMU with a compensation rollback ledger.",
      currentState:
        "Functional but fragile. The sheer operational pain directly led to rejecting multi-database setups in Vani and ÆON.",
    },
    {
      title: "The Reality Gap: Architecture on Paper vs Code in Production",
      whyDifficult:
        "Designing an elegant architecture with 43 subsystems is easy; ensuring that every module respects those boundaries during rapid development is extraordinarily difficult.",
      initialApproach:
        "Wrote an elaborate 'Architecture Constitution' markdown document and established a 7-question pre-code checklist.",
      whatFailed:
        "Developers and fast coding sessions bypassed the checklist. By Phase 28, an automated audit revealed 281 direct database violations across the entire codebase.",
      finalApproach:
        "Recognized that written guidelines are worthless without automated build-breaking compiler/AST enforcement.",
      currentState:
        "Archived as Leo's most important engineering discovery, leading directly to Vani's AST Guardian.",
    },
  ],
  failuresAndLessons: [
    {
      title: "The Phase 28 Audit: 281 Direct Database Violations",
      badge: "CATASTROPHIC ARCHITECTURAL DRIFT",
      failure:
        "A Phase 28 automated audit of the entire codebase revealed 281 direct database calls that completely bypassed the central CMMU gateway.",
      rootCause:
        "The CMMU constraint was formalized after much of the application layer had already been written using direct SQLAlchemy `Session` queries. Because there was no CI linting rule preventing direct database imports, developers continued using direct connections for speed.",
      attemptedFix:
        "Documenting the violations in a 286-line markdown table (`phase_28_x_2_violation_report.md`) and requesting manual refactoring.",
      finalFix:
        "The violation count was so vast across all 43 subsystems that retroactive migration proved impractical. The project was archived, and its lessons were codified into Vani's 'Phase 0 Architecture Before Features' and AST static analysis guardian.",
      lesson:
        "An architectural rule that is not enforced by a compiler or CI linter does not exist. Retroactive architectural enforcement on a large codebase is a massive, often fatal engineering undertaking.",
      verifiedEvidence: "lab-content/Leo/004-281-violation-debt-architecture-enforcement.md",
    },
    {
      title: "The Mock Testing Trap: Green CI While Live Systems Rotted",
      badge: "TESTING METHODOLOGY FAILURE",
      failure:
        "Leo's test suite reported 95%+ pass rates, but the system repeatedly crashed when deployed against live databases and APIs.",
      rootCause:
        "Developers mocked out database connections and external LLM endpoints so heavily that tests were only verifying that Python functions could call mocked return values. Invariant violations and schema mismatches in live PostgreSQL and Neo4j queries were completely hidden.",
      attemptedFix:
        "Add more unit test cases with complex mock return structures.",
      finalFix:
        "Abandoned pure mock testing for cognitive architectures. Mandated live integration testing against disposable local container databases.",
      lesson:
        "Mocks verify your assumptions, not reality. Over-mocked test suites provide a dangerous illusion of security while live integrations decay.",
      verifiedEvidence: "lab-content/Leo/008-TESTING_AND_VERIFICATION.md",
    },
  ],
  timeline: [
    {
      phase: "Phase 1–10",
      date: "Late 2025",
      title: "Kernel Foundations & DAG Scheduling",
      whatChanged: "Implemented cognitive clock and priority-aware task execution engine.",
      why: "Solve agent priority inversion and enable concurrent background tasks.",
      implementation: "Python asyncio engine with custom graph resolution logic.",
      result: "Demonstrated preemptive scheduling of interactive user turns over background workers.",
      status: "COMPLETED",
    },
    {
      phase: "Phase 11–25",
      date: "Early 2026",
      title: "CMMU & Subsystem Explosion (43 Packages)",
      whatChanged: "Added Redis, PostgreSQL, and Neo4j; expanded architecture to 43 subsystems.",
      why: "Attempt to provide specialized memory tiers for different cognitive tasks.",
      implementation: "Constructed multi-database adapters and Three.js 3D visual workspace.",
      result: "Explosion in architectural complexity; rapid divergence between documentation and code.",
      status: "COMPLETED",
    },
    {
      phase: "Phase 28",
      date: "Mid 2026",
      title: "The Forensic Audit & Architectural Reckoning",
      whatChanged: "Ran automated audit against CMMU gateway rules.",
      why: "Verify codebase conformance to the Architecture Constitution.",
      implementation: "Scripted codebase scanner cataloging direct database access.",
      result: "Discovered 281 violations across all modules. Project superseded by Vani.",
      status: "PIVOT",
    },
  ],
  verification: {
    headline: "Forensic Audit Findings & Reality Gap Analysis",
    testSuiteSummary:
      "Leo maintained an extensive test suite, but a forensic Phase 28 audit exposed a profound disconnect between nominal test success and architectural conformance.",
    metrics: [
      {
        label: "Subsystems Defined",
        value: "43",
        context: "Granular separation across Kernel, Memory, Cognition, and Presentation layers.",
        status: "pass",
      },
      {
        label: "Database Engines Managed",
        value: "3",
        context: "Redis (Working) + PostgreSQL pgvector (Episodic) + Neo4j (Associative).",
        status: "audit",
      },
      {
        label: "Architectural Violations",
        value: "281",
        context: "Documented instances where application code bypassed the CMMU gatekeeper.",
        status: "fail",
      },
      {
        label: "Direct SQLAlchemy Sessions",
        value: "100%",
        context: "Essentially every repository module directly accessed SQLAlchemy rather than CMMU.",
        status: "fail",
      },
    ],
    methodology:
      "A custom static analysis script scanned all Python modules for direct imports of `Session`, `neo4j.GraphDatabase`, and `redis.Redis`, cross-referencing each call against the authorized CMMU gateway boundary.",
    auditResults: [
      {
        auditName: "Phase 28.X.2 Architectural Conformance Audit",
        scoreOrVerdict: "281 VIOLATIONS DOCUMENTED (FAILED CONFORMANCE)",
        details:
          "Audit revealed that the CMMU had become a decorative facade. Application code from API routers to anomaly managers established direct database connections.",
        uncoveredFlaws: [
          "281 direct database calls bypassing CMMU.",
          "Over-reliance on mock test suites masking live query syntax errors.",
          "High maintenance overhead of polyglot persistence (Redis + Postgres + Neo4j).",
        ],
      },
    ],
  },
  research: {
    title: "Key Explorations & Architectural Precedents",
    existingEngineering:
      "Engineered an OS-style cognitive kernel with temporal clock synchronization and priority task preemption.",
    experimentalDirections: [
      "Hardware-inspired MMU semantics (virtual addressing, paging, DMA) applied to AI cognitive memory.",
      "Real-time 3D WebGL memory topology visualization for inspecting agent knowledge clusters.",
    ],
    potentialContributions: [
      "Case study documenting the failure of retroactive architectural governance in solo/small-team AI codebases.",
    ],
  },
  lessons: {
    quote:
      "Leo was not a failure of vision, but a masterclass in engineering reality: an unenforced rule is a wish, polyglot databases create operational misery, and mock tests lie.",
    takeaways: [
      {
        title: "Rules Must Be Enforced at Compile Time",
        insight:
          "You cannot document your way to architectural purity. If an import is illegal, a linter or test must break the build the moment it is written.",
      },
      {
        title: "Reject Polyglot Persistence in Early Systems",
        insight:
          "Running Redis, PostgreSQL, and Neo4j simultaneously for a single agent introduces massive synchronization overhead. SQLite or PostgreSQL alone can handle 99% of early memory needs.",
      },
      {
        title: "Beware the Lure of Over-Granular Subsystems",
        insight:
          "Defining 43 subsystems before having a hardened core runtime creates immense maintenance friction and encourages developers to take shortcuts.",
      },
    ],
  },
  currentState: {
    status: "SUPERSEDED",
    summary:
      "Leo is permanently archived. Its architectural successes (DAG scheduler, temporal clock) and forensic audit lessons (281 violations) served as the direct conceptual foundation for Vani and ÆON.",
    whatWorks: [
      "DAG Scheduler with priority task preemption.",
      "Unified Communication Interface handling multi-channel transports.",
      "Comprehensive forensic documentation of architectural debt.",
    ],
    whatIsIncomplete: [
      "The CMMU migration was never completed due to 281 pervasive violations.",
      "Neo4j graph synchronization remained prone to split-brain states.",
    ],
    whatRemains: [
      "Archived repository serving as an open reference and engineering case study.",
    ],
    whatIWouldChangeToday: [
      "I would use a single database engine (PostgreSQL or SQLite) instead of three.",
      "I would enforce import boundaries with a CI AST linter from commit number one.",
      "I would build 5 core subsystems instead of 43 before writing application code.",
    ],
  },
  next: {
    statusNotice: "Leo is archived. Its active evolution continues in ÆON.",
    items: [
      {
        title: "Lineage Continuation in ÆON",
        type: "PLANNED",
        description:
          "The priority scheduling and cognitive clock primitives from Leo were redesigned into ÆON's 28-package acyclic monorepo.",
      },
    ],
  },
  lineage: {
    successor: {
      slug: "vani",
      name: "Vani",
      relationship: "Direct successor born from Leo's lessons; instituted the AST Guardian to make the 281 violations impossible.",
    },
    roleInEvolution:
      "The foundational prototype that proved the validity of operating system metaphors for AI while providing the definitive lesson in architectural debt.",
  },
};
