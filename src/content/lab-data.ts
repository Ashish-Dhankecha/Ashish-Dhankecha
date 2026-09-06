export interface LabResearchItem {
  id: string;
  code: string;
  slug: string;
  title: string;
  contentType: "ARCHITECTURE_DECISION" | "BENCHMARK_REPORT" | "SYSTEM_POSTMORTEM" | "THEORY_NOTE";
  project: string;
  projectFullName: string;
  status: "Active" | "Partial" | "Verified" | "Archived";
  statusDetail: string;
  date: string | null;
  rawDate: string;
  topics: string[];
  evidenceLevel: "high" | "medium" | "low";
  publishable: boolean;
  oneLineSummary: string;
  context: {
    visionQuote: string;
    description: string;
  };
  question: string;
  initialApproach: {
    subsystems: {
      number: number;
      name: string;
      role: string;
      description: string;
    }[];
    bootSequence: string;
    layerHierarchy: string[];
    rules: string[];
  };
  whatHappened: {
    summary: string;
    bootTime: string;
    kernelComponents: string[];
    violationFinding: string;
    violationReportFile: string;
    violationCount: number;
  };
  evidence: {
    file: string;
    description: string;
  }[];
  diagnosis: {
    established: string;
    likely: string;
    unknown: string;
  };
  whatChanged: string;
  whatILearned: string;
  whatIWouldDoDifferently: string;
  broaderPrinciple: string;
  technicalReferences: string[];
  sourceConfidence: {
    level: "HIGH" | "MEDIUM" | "LOW";
    detail: string;
  };
  contentValue: {
    technicalDepth: number;
    engineeringInsight: number;
    originality: number;
    evidenceQuality: number;
    storyValue: number;
    overall: "High" | "Medium" | "Low";
    commentary: string;
  };
  publicationNotes: string;
}

export interface LabExperiment {
  id: string;
  code: string;
  title: string;
  hypothesis: string;
  domain: "AI Agents" | "Systems Runtime" | "Model Optimization" | "First-Principles ML";
  status: "ACTIVE_BENCH" | "VERIFIED" | "STRESS_TESTING" | "PROTOTYPE";
  date: string;
  specs: {
    runtime: string;
    iterations: number;
    passRate: string;
    throughput?: string;
  };
  details: string[];
  findings: string;
}

export interface InvariantTest {
  id: string;
  rule: string;
  description: string;
  status: "PASSING" | "MONITORING";
  latency: string;
  assertion: string;
}

export const labTelemetry = {
  facilityId: "ASHISH-LAB // RESEARCH-BENCH-01",
  environment: "UBUNTU-SYSTEMS // PYTORCH 2.6 // CUDA 12.4",
  activeNodes: 4,
  gpuVram: "24.0 GB / 24.0 GB ALLOCATED",
  systemLatency: "1.29 ms",
  determinismRate: "99.82%",
  activeCycle: "2026 CYCLE",
  activeDispatches: 1,
};

export const labResearch: LabResearchItem[] = [
  {
    id: "res-01",
    code: "RES-001",
    slug: "leo-cognitive-os-architecture-vision",
    title: "Designing a Cognitive Operating System: The LEO Architecture Vision",
    contentType: "ARCHITECTURE_DECISION",
    project: "LEO",
    projectFullName: "LEO — AI Operating Companion",
    status: "Partial",
    statusDetail: "Partial — core OS infrastructure implemented; behavior layer incomplete",
    date: null,
    rawDate: "UNKNOWN (development across multiple phases; latest evidence dated June 2026)",
    topics: [
      "cognitive-os",
      "systems-architecture",
      "ai-infrastructure",
      "operating-systems",
    ],
    evidenceLevel: "high",
    publishable: true,
    oneLineSummary:
      "LEO was designed as a Cognitive Operating System — an AI runtime modeled on OS primitives (kernel, scheduler, memory management, interrupt controller) rather than as an AI assistant or agent wrapper.",
    context: {
      visionQuote: "LEO IS: A Cognitive Operating System. It is explicitly stated NOT to be: a chatbot, an AI assistant wrapper, a prompt collection, or an agent framework.",
      description:
        "The design philosophy rejected the dominant model of AI-as-a-service — wrapping LLM APIs with application logic. Instead, it treated intelligence as a first-class OS concern requiring its own kernel, memory management unit, scheduler, and inter-process communication fabric.",
    },
    question:
      "Can AI applications be structured as operating systems — with formal subsystems, boot sequences, lifecycle management, and memory hierarchies — rather than as application-layer orchestrators sitting on top of LLM APIs?",
    initialApproach: {
      subsystems: [
        {
          number: 1,
          name: "Kernel",
          role: "Lifecycle Orchestrator",
          description: "Encapsulates KernelRuntime, BootManager, ShutdownManager, and LifecycleManager.",
        },
        {
          number: 2,
          name: "Clock",
          role: "Unified Temporal Heartbeat",
          description: "Provides synchronized, tick-based execution pulses driving all internal state transitions.",
        },
        {
          number: 3,
          name: "Scheduler",
          role: "Parallel Execution Engine",
          description: "Features out-of-order execution, warp grouping, hazard detection, and branch prediction advisories.",
        },
        {
          number: 4,
          name: "Interrupt Controller",
          role: "Async Event Dispatcher",
          description: "Handles asynchronous external and internal interrupts, task cancellation, and preemption.",
        },
        {
          number: 5,
          name: "Execution Graph",
          role: "DAG Dependency Resolver",
          description: "Constructs and resolves directed acyclic graphs of cognitive tasks and runtime barriers.",
        },
        {
          number: 6,
          name: "CMMU (Cognitive Memory Management Unit)",
          role: "Sole Memory Gatekeeper",
          description: "17 specialized components handling memory bus translation, page protection, bandwidth throttling, and cache coherence.",
        },
        {
          number: 7,
          name: "Interconnect",
          role: "Zero-Bypass Communication Bus",
          description: "Implements Network-on-Chip (NoC) routing topologies supporting P2P, multicast, and broadcast messaging.",
        },
        {
          number: 8,
          name: "Provider Platform",
          role: "Provider Abstraction Layer",
          description: "Uniform abstraction interface across all foundational AI model providers and local weights.",
        },
        {
          number: 9,
          name: "Architecture Guardian",
          role: "Runtime Constraint Validator",
          description: "Subscribes to 9 event types and dispatches across 6 runtime architectural validators.",
        },
      ],
      bootSequence:
        "Formally defined and immutable 12-step sequence (docs/14_BOOT_SEQUENCE.md). Components register with a Dependency Manager; topological boot order is resolved as a DAG with atomic rollback on failure.",
      layerHierarchy: [
        "Client",
        "Conversation",
        "Execution",
        "Cognitive OS",
        "Provider Platform",
        "Providers",
        "Models",
      ],
      rules: [
        "Skipping architectural layers is explicitly forbidden.",
        "Direct database access bypassing the CMMU is prohibited by design.",
        "The Scheduler responds strictly to Clock ticks rather than unthrottled loops.",
      ],
    },
    whatHappened: {
      summary:
        "The OS infrastructure was implemented across many phases. By Phase 26, a working Cognitive Kernel existed (`backend/app/cognition/kernel/core.py`). The boot sequence ran successfully, completing in approximately 1.29 seconds (confirmed in `backend/startup.log`).",
      bootTime: "1.29 seconds (DAG topological boot)",
      kernelComponents: [
        "CognitiveKernel facade wrapping KernelRuntime, BootManager, ShutdownManager, LifecycleManager",
        "Formal boot sequence with atomic rollback on failure (boot.py)",
        "Event-driven scheduler responding only to clock ticks (scheduler/core.py)",
        "Memory bus with address translation, protection, bandwidth throttling, and cache coherence (memory/bus.py)",
        "Interconnect implementing Network-on-Chip routing (P2P, multicast, broadcast) (interconnect/core.py)",
        "Architecture Guardian subscribing to 9 event types and dispatching to 6 validators (guardian/core.py)",
      ],
      violationFinding:
        "Phase 28 generated a 281-violation report (phase_28_x_2_violation_report.md) documenting that the vast majority of the application codebase bypassed the CMMU and directly accessed databases (PostgreSQL, Neo4j, Redis) using SQLAlchemy sessions.",
      violationReportFile: "phase_28_x_2_violation_report.md",
      violationCount: 281,
    },
    evidence: [
      {
        file: "docs/00_VISION.md",
        description: "Explicit OS-first framing declaring LEO as a Cognitive Operating System.",
      },
      {
        file: "docs/02_SYSTEM_ARCHITECTURE.md",
        description: "13 formal subsystems documented with architectural interfaces.",
      },
      {
        file: "docs/03_LAYER_ARCHITECTURE.md",
        description: "7-layer strict dependency hierarchy definition.",
      },
      {
        file: "docs/14_BOOT_SEQUENCE.md",
        description: "Immutable 12-step topological DAG boot sequence.",
      },
      {
        file: "backend/app/cognition/kernel/core.py",
        description: "CognitiveKernel facade implementation with runtime lifecycle control.",
      },
      {
        file: "backend/app/cognition/kernel/boot.py",
        description: "Topological DAG boot coordinator with atomic rollback on failure.",
      },
      {
        file: "backend/app/cognition/kernel/scheduler/core.py",
        description: "CognitiveScheduler with warp engine, out-of-order execution, and clock-tick driving.",
      },
      {
        file: "backend/app/cognition/kernel/memory/core.py",
        description: "CognitiveMemoryManagementUnit (CMMU) and memory bus arbiter.",
      },
      {
        file: "backend/app/cognition/kernel/interconnect/core.py",
        description: "CognitiveInterconnect implementing Network-on-Chip (NoC) message routing.",
      },
      {
        file: "backend/app/cognition/kernel/guardian/core.py",
        description: "CognitiveArchitectureGuardian with 9 event subscriptions and 6 validators.",
      },
      {
        file: "backend/startup.log",
        description: "Boot trace log confirming 1.29s total platform startup time.",
      },
      {
        file: "phase_28_x_2_violation_report.md",
        description: "Comprehensive audit report documenting 281 architectural layer bypasses.",
      },
    ],
    diagnosis: {
      established:
        "The OS-as-cognitive-runtime concept was taken beyond design documents. Actual kernel primitives were built and functional. The scheduler has out-of-order execution, warp grouping, hazard detection, branch prediction advisories, and is driven exclusively by clock ticks.",
      likely:
        "The architecture was modeled on actual OS design (memory paging, DMA transfers, cache coherence, address translation, Network-on-Chip interconnects). The CMMU has 17 specialized components.",
      unknown:
        "How much of the OS behavior was validated under realistic workloads versus only unit tests with mocked components.",
    },
    whatChanged:
      "After Phase 26/27 OS infrastructure was built, Phase 28 audited the entire codebase for violations. The 281-violation report was generated. No documented corrective migration was found.",
    whatILearned:
      "Building an AI system as an operating system requires committing to that paradigm everywhere — not just in the kernel layer. The violation report reveals that application code was written before or independently of the OS infrastructure, using direct database access. When the OS layer was built on top of legacy application code, the gap became systemic architectural debt.",
    whatIWouldDoDifferently:
      "An OS-first design requires building the OS interfaces first and then building application features exclusively through those interfaces. Building features first and retrofitting OS constraints after creates the exact violation pattern documented in the Phase 28 report.",
    broaderPrinciple:
      "Architectural constraints are only enforceable if established before the code that violates them is written. Retroactive enforcement on an existing codebase generates migration debt proportional to codebase size.",
    technicalReferences: [
      "backend/app/cognition/kernel/core.py",
      "backend/app/cognition/kernel/boot.py",
      "backend/app/cognition/kernel/scheduler/core.py",
      "backend/app/cognition/kernel/memory/core.py",
      "backend/app/cognition/kernel/interconnect/core.py",
      "backend/app/cognition/kernel/guardian/core.py",
      "docs/00_VISION.md",
      "docs/02_SYSTEM_ARCHITECTURE.md",
      "docs/14_BOOT_SEQUENCE.md",
      "backend/startup.log",
    ],
    sourceConfidence: {
      level: "HIGH",
      detail:
        "Direct implementation files, boot logs, and documentation all corroborate the described architecture.",
    },
    contentValue: {
      technicalDepth: 5,
      engineeringInsight: 5,
      originality: 5,
      evidenceQuality: 4,
      storyValue: 5,
      overall: "High",
      commentary:
        "Applying OS design patterns to an AI cognitive runtime is genuinely unusual and technically deep. The project is unusually concrete — it produced working implementations of each subsystem, not just design documents. The contrast between the ambitious OS architecture and the 281-violation gap provides a high-value engineering story.",
    },
    publicationNotes:
      "No sensitive material detected. No API keys, credentials, or private URLs present in this document.",
  },
];

export const labExperiments: LabExperiment[] = [];

export const invariantTests: InvariantTest[] = [];
