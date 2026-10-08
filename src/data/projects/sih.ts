import { ProjectCaseStudy } from "@/types/project-case-study";

export const sihCaseStudy: ProjectCaseStudy = {
  id: "sih",
  slug: "sih",
  title: "SIH26117",
  subtitle: "Sovereign On-Premise Agentic AI Workbench",
  tagline: "A fully air-gapped, on-premise agentic AI workbench built during a 1-day hackathon sprint for confidential industrial environments.",
  startDate: "30 August 2026",
  endDate: "30 August 2026",
  status: "MAINTAINED",
  statusLabel: "Completed Hackathon Prototype · 1-Day Sprint",
  isFlagship: false,
  accentColor: "#ffe4a5",
  summary:
    "Built in a rapid 1-day hackathon sprint for Smart India Hackathon 2026, SIH26117 is an air-gapped, on-premise agentic AI workbench designed for confidential industrial operations (specifically MRPL). It combines local Qwen SLM inference, an EvidenceGate RAG boundary that prevents hallucinations, deep OOXML artifact validation, and Linux unshare sandbox execution.",
  links: [
    {
      label: "Technical Inventory",
      url: "/lab/sih/01_REPOSITORY_INVENTORY",
      type: "docs",
    },
    {
      label: "Master Technical Report",
      url: "/lab/sih/30_MASTER_TECHNICAL_REPORT",
      type: "docs",
    },
  ],
  snapshot: {
    type: "Air-Gapped Sovereign AI Workbench (Hackathon)",
    started: "30 August 2026",
    status: "Completed Prototype · Verified in Sandbox",
    primaryLanguage: "Python / TypeScript (React + Vite)",
    stack: [
      "Python 3.11",
      "FastAPI",
      "React 18",
      "Vite",
      "ChromaDB",
      "Local Qwen SLM",
      "EasyOCR / Moondream",
      "Linux unshare",
      "Docker",
    ],
    domain: "Industrial Sovereign AI / Air-Gapped Agents / Document Synthesis",
    scale: "1,582 Files · 137k Lines · 573 Python Modules · 1-Day Hackathon Sprint",
    architectureStyle: "Decoupled ReAct Orchestrator · Dual Evidence Gates · Sandbox Isolation",
    verificationRatio: "100% Air-Gapped (Zero External Network Egress)",
  },
  problem: {
    headline: "Deploying Agentic AI in Critical Industrial Infrastructure",
    coreQuestion:
      "How do you provide engineers at high-security industrial facilities (e.g., MRPL - Mangalore Refinery and Petrochemicals Limited) with autonomous AI tools to analyze technical SOPs and inspection logs without a single byte leaving the facility's local network?",
    whyNotChatbot:
      "Cloud LLMs (OpenAI, Anthropic, Google Cloud) are legally and operationally unusable in sensitive national infrastructure and refinery operations due to strict data sovereignty mandates. Furthermore, standard RAG systems hallucinate citations, and generic agents cannot generate validated, professional engineering deliverables (structured DOCX, PPTX with charts, PDF audit logs) in air-gapped environments.",
    existingLimitations: [
      "Zero internet connectivity allowed: commercial cloud API endpoints are strictly inaccessible.",
      "Industrial SOPs require 100% auditable citations; standard vector search hallucinates procedural steps.",
      "Generated documents must strictly conform to Microsoft Office OOXML specifications without corrupting formatting.",
      "Complex agent execution must be interruptible without corrupting local workbench state.",
    ],
    originalHypothesis:
      "By combining a local quantized SLM (Qwen) with a decoupled 7-phase state-machine orchestrator, an explicit EvidenceGate that verifies RAG citations, and an OOXML ArtifactQualityGate, an autonomous workbench can operate with zero cloud egress while matching cloud assistant capabilities.",
    contextSummary:
      "Developed during the Smart India Hackathon on 30 August 2026 under extreme time constraints, demonstrating the ability to pivot from long-term research engineering to high-velocity, production-ready hackathon execution.",
  },
  concept: {
    headline: "The Air-Gapped Sovereign Workbench",
    coreIdea:
      "Industrial engineers drag-and-drop confidential inspection logs and SOPs into a local workspace. A decoupled orchestrator decomposes tasks, queries an audited local vector store (`EvidenceGate`), executes tools in an isolated Linux `unshare` sandbox, and verifies generated documents before delivery.",
    diagramTitle: "SIH26117 Sovereign Architecture Flow",
    flowSteps: [
      {
        step: "01",
        title: "Workspace Ingestion",
        description:
          "User uploads SOPs, piping P&ID diagrams, and inspection logs. Multimodal extractors (EasyOCR/Moondream) parse schematics locally.",
      },
      {
        step: "02",
        title: "Decoupled Task Decomposition",
        description:
          "The FastAPI TaskClassifier categorizes intent and delegates to the 7-phase Orchestrator (Planner, Selector, Executor).",
      },
      {
        step: "03",
        title: "Audited Retrieval (EvidenceGate)",
        description:
          "ChromaDB retrieves local SOP chunks. The EvidenceGate runs a secondary verification pass ensuring the model only references verified passages.",
      },
      {
        step: "04",
        title: "Linux Sandbox Execution",
        description:
          "Code execution and automated calculations occur within an isolated Linux `unshare` namespace with zero network permissions.",
      },
      {
        step: "05",
        title: "Artifact Quality Gate",
        description:
          "Generated DOCX, PPTX, or PDF files are parsed and structurally validated against OOXML specifications before being handed to the user.",
      },
    ],
  },
  architecture: {
    overview:
      "SIH26117 enforces a strict physical and logical boundary between the browser workspace and the sovereign backend engine, with decoupled mockable orchestrator components.",
    layers: [
      {
        layerId: "Frontend",
        name: "1. Workspace Interface (React / Vite)",
        description: "Modern desktop workspace for document inspection, task tracking, and artifact previews.",
        components: [
          {
            id: "workspace-ui",
            name: "React Workspace (`frontend/src/`)",
            status: "IMPLEMENTED",
            purpose: "Interactive user interface featuring split-pane document viewers, streaming responses, and progress graphs.",
            howItWorks: "Vite + TypeScript SPA communicating over local REST and streaming Server-Sent Events.",
            tradeoff: "Built rapidly with pragmatic UI components rather than a custom bespoke design system.",
          },
        ],
      },
      {
        layerId: "Backend-Core",
        name: "2. Sovereign Orchestrator Engine (FastAPI)",
        description: "Decoupled 7-phase execution loop coordinating planning, verification, and tool dispatch.",
        components: [
          {
            id: "decoupled-orchestrator",
            name: "7-Phase ReAct Orchestrator (`backend/core/orchestrator/`)",
            status: "IMPLEMENTED",
            purpose: "Separates agent logic into Planner, ActionSelector, Executor, Observer, Verifier, Synthesizer, and Deliverer.",
            howItWorks: "State machine with parallel Mock interfaces (`MockPlanner`, `MockExecutor`) for instant offline testing.",
            tradeoff: "Additional code structure compared to simple 20-line ReAct prompt loops.",
            keyFiles: ["backend/core/orchestrator/components.py"],
          },
          {
            id: "sqlite-task-store",
            name: "Interruptible Task Store (`backend/core/data/`)",
            status: "IMPLEMENTED",
            purpose: "Persists task progress in SQLite and allows mid-execution user cancellation.",
            howItWorks: "The execution loop polls task state flags in SQLite between steps; users can cancel long operations safely.",
            tradeoff: "Single-node SQLite limits horizontal scaling across multiple servers.",
          },
        ],
      },
      {
        layerId: "Evidence-Quality",
        name: "3. Verification & Quality Gates",
        description: "Strict gates ensuring zero hallucinations and corruption-free document generation.",
        components: [
          {
            id: "evidence-gate",
            name: "EvidenceGate RAG Guard (`backend/core/knowledge/`)",
            status: "IMPLEMENTED",
            purpose: "Structurally audits RAG context retrieval to guarantee 100% truthful SOP citations.",
            howItWorks: "Separates global organization SOPs from transient task files. Validates citations against source hashes.",
            tradeoff: "Rejects ambiguous queries if matching confidence is below threshold.",
          },
          {
            id: "artifact-quality-gate",
            name: "ArtifactQualityGate (`backend/core/artifacts/`)",
            status: "IMPLEMENTED",
            purpose: "Deep OOXML validation of generated Office files (DOCX, PPTX, XLSX) and PDFs.",
            howItWorks: "Unpacks generated archives and parses internal XML structures to guarantee file integrity before download.",
            tradeoff: "Adds 200–400ms verification delay per generated presentation or report.",
          },
        ],
      },
      {
        layerId: "Sandbox",
        name: "4. Isolation & Multimodal Engine",
        description: "Local execution sandbox and offline vision/OCR extractors.",
        components: [
          {
            id: "unshare-sandbox",
            name: "Linux Namespace Sandbox (`backend/core/sandbox/`)",
            status: "IMPLEMENTED",
            purpose: "Isolates Python and bash tool execution from the host operating system.",
            howItWorks: "Utilizes Linux `unshare` to restrict network namespaces, mount points, and process trees.",
            tradeoff: "Requires Linux host system with appropriate namespace permissions.",
          },
          {
            id: "multimodal-pipeline",
            name: "Local OCR & Vision (`backend/core/multimodal/`)",
            status: "IMPLEMENTED",
            purpose: "Extracts text from scanned refinery schematics and inspection logs.",
            howItWorks: "EasyOCR for technical text and Moondream for visual diagram question answering.",
            tradeoff: "CPU-intensive during batch PDF page rasterization.",
          },
        ],
      },
    ],
  },
  executionFlow: {
    title: "Execution Flow: Industrial SOP Compliance Audit",
    description:
      "An illustrative walk-through, written to show the flow (not a captured log), of how SIH26117 audits a refinery maintenance report against internal safety SOPs and generates a certified presentation.",
    concreteExample: {
      input: "Engineer uploads 'Boiler Inspection Report 2026.pdf' and requests: 'Verify compliance against MRPL Safety SOP 402 and generate a summary slide deck.'",
      steps: [
        {
          phase: "01. Intake & Classification",
          subsystem: "FastAPI Gateway",
          action: "TaskClassifier tags task as `COMPLIANCE_AUDIT_WITH_DELIVERABLE` with dual file attachments.",
          stateChange: "Task initialized in SQLite task store with status `RUNNING`.",
        },
        {
          phase: "02. Parsing & OCR",
          subsystem: "Multimodal Engine",
          action: "Rasterizes PDF pages and runs EasyOCR to extract valve pressure readings and weld inspection dates.",
          stateChange: "Structured text and tables indexed into ChromaDB task collection.",
        },
        {
          phase: "03. Audited RAG Retrieval",
          subsystem: "EvidenceGate",
          action: "Retrieves clauses from MRPL Safety SOP 402. Matches pressure thresholds and flags 1 safety discrepancy.",
          stateChange: "Evidence bundle verified with cryptographic hash citations.",
        },
        {
          phase: "04. Sandboxed Analysis",
          subsystem: "Unshare Sandbox",
          action: "Executes Python calculation script inside isolated namespace to verify pressure safety margins.",
          stateChange: "Script outputs exact delta: Boiler #3 exceeds safe operating threshold by 12 PSI.",
        },
        {
          phase: "05. Deliverable Synthesis",
          subsystem: "Artifact Generator",
          action: "Compiles PowerPoint deck (`.pptx`) with visual compliance tables and flagged hazard notices.",
          stateChange: "Raw OOXML presentation created in memory.",
        },
        {
          phase: "06. Quality Certification",
          subsystem: "ArtifactQualityGate",
          action: "Inspects `.pptx` XML DOM, verifying slide layouts, font embeddings, and table schema validity.",
          stateChange: "Artifact certified and saved to workspace downloads.",
        },
      ],
      output:
        "Certified compliance audit report delivered with 1 flagged violation (Boiler #3 +12 PSI) and verified PPTX presentation ready for plant safety review.",
    },
  },
  engineeringDecisions: [
    {
      id: "adr-sih-evidence-gate",
      title: "EvidenceGate RAG Guard vs Direct Prompt Augmentation",
      context:
        "In industrial facilities like refineries, hallucinated safety standards can cause physical equipment damage or severe safety hazards.",
      optionsConsidered: [
        {
          option: "Direct prompt stuffing (dump all retrieved text into LLM context)",
          pros: "Trivial to implement in 10 minutes.",
          cons: "Model freely hallucinates when retrieved context is ambiguous or incomplete.",
        },
        {
          option: "Two-stage EvidenceGate with citation integrity checks",
          pros: "Structurally verifies that every claim in the output maps to an exact retrieved text snippet with document and line references.",
          cons: "Requires secondary validation logic and increases response time by ~1.2s.",
        },
      ],
      choice: "Two-stage EvidenceGate",
      why: "Zero tolerance for hallucination in industrial SOP compliance. The system must reject ambiguous answers rather than guess.",
      tradeoff: "Slight latency penalty for the verification pass.",
    },
    {
      id: "adr-sih-mock-orchestrator",
      title: "Parallel Mock Interfaces for Rapid Hackathon Development",
      context:
        "During a 1-day hackathon, the frontend and backend developers need to work concurrently without waiting for local SLM weights to download or fine-tune.",
      optionsConsidered: [
        {
          option: "Develop frontend only after backend AI pipeline is 100% working",
          pros: "Tests real system from day one.",
          cons: "Guaranteed to fail hackathon deadlines due to idle waiting time.",
        },
        {
          option: "Architect decoupled interfaces with parallel Mock implementations",
          pros: "Frontend developed seamlessly against `MockPlanner` and `MockExecutor` while backend perfected model quantization and sandboxing.",
          cons: "Requires maintaining mock implementations alongside real classes.",
        },
      ],
      choice: "Decoupled Orchestrator with First-Class Mocks",
      why: "Allowed full-speed parallel development during the high-pressure hackathon sprint, enabling completion of both UI and AI pipelines in 24 hours.",
      tradeoff: "Required disciplined contract design before writing code.",
    },
  ],
  hardProblems: [
    {
      title: "Air-Gapped Document Generation Without Microsoft Office",
      whyDifficult:
        "Refinery workers demand standard `.pptx` and `.docx` files. Generating clean Office documents on a headless Linux server without MS Office installed often yields corrupted files or broken XML formatting.",
      initialApproach:
        "Basic `python-docx` and `python-pptx` template filling.",
      whatFailed:
        "Dynamic chart injection corrupted OOXML relationships, causing PowerPoint to show the dreaded 'This file contains unreadable content' dialog upon opening.",
      finalApproach:
        "Engineered the `ArtifactQualityGate`: an automated validator that unzips the generated file, verifies the XML schema against Microsoft OOXML standards, and repairs broken relationship IDs before user download.",
      currentState:
        "100% clean document delivery across DOCX, PPTX, and XLSX formats.",
    },
    {
      title: "Mid-Execution Task Cancellation in Long-Running Workflows",
      whyDifficult:
        "Analyzing 50-page refinery logs with local models can take several minutes. If an engineer realizes they uploaded the wrong document, they need to cancel execution immediately without freezing the server.",
      initialApproach:
        "Killing the background Python worker thread with `thread.terminate()`.",
      whatFailed:
        "Abrupt thread termination left SQLite connection locks orphaned, bricking subsequent database queries.",
      finalApproach:
        "Implemented SQLite state polling: the orchestrator checks a task `cancel_requested` flag at every step transition, allowing graceful cleanup and resource release.",
      currentState:
        "Instant, safe cancellation of multi-step agent plans within 200ms.",
    },
  ],
  failuresAndLessons: [
    {
      title: "CPU Bottleneck During Heavy Slide Templating",
      badge: "PERFORMANCE LIMITATION",
      failure:
        "When generating 20+ slides with embedded vector charts simultaneously, the FastAPI server pinned all CPU cores at 100%, causing UI health check timeouts.",
      rootCause:
        "Headless chart rasterization and XML manipulation were running synchronously on the main event loop thread instead of in a background process pool.",
      attemptedFix:
        "Limit slide decks to a maximum of 5 slides.",
      finalFix:
        "Offloaded document rendering to an asynchronous background worker pool with worker concurrency throttled to `os.cpu_count() - 1`.",
      lesson:
        "In on-premise environments without elastic cloud GPUs, CPU starvation is the primary threat to API responsiveness. Never run heavy file synthesis on the async event loop.",
      verifiedEvidence: "lab-content/Sih/30_MASTER_TECHNICAL_REPORT.md",
    },
  ],
  timeline: [
    {
      phase: "Sprint Hour 0–4",
      date: "30 August 2026",
      title: "Problem Scoping & Contract Definition",
      whatChanged: "Defined industrial requirements (MRPL compliance), air-gapped constraints, and orchestrator contracts.",
      why: "Establish clear boundaries before writing code under extreme time pressure.",
      implementation: "Created `backend/core/orchestrator/components.py` with mock interfaces.",
      result: "Frontend and backend teams began working in parallel immediately.",
      status: "COMPLETED",
    },
    {
      phase: "Sprint Hour 5–14",
      date: "30 August 2026",
      title: "Core Sovereign Engine & EvidenceGate",
      whatChanged: "Implemented local Qwen SLM inference, ChromaDB RAG, and EvidenceGate citation auditor.",
      why: "Guarantee zero hallucinations on technical refinery SOPs.",
      implementation: "Built two-stage retrieval verification and unshare namespace sandbox.",
      result: "Local RAG queries returning auditable, verified SOP citations.",
      status: "COMPLETED",
    },
    {
      phase: "Sprint Hour 15–24",
      date: "30 August 2026",
      title: "ArtifactQualityGate & End-to-End Integration",
      whatChanged: "Connected React workspace to FastAPI backend; built OOXML quality gate.",
      why: "Deliver polished, non-corrupted DOCX/PPTX deliverables for the final hackathon demonstration.",
      implementation: "Integrated unshare sandbox, slide generator, and live document preview.",
      result: "Flawless live demonstration of air-gapped refinery compliance analysis.",
      status: "COMPLETED",
    },
  ],
  verification: {
    headline: "Hackathon Sprint Verification & Air-Gap Certification",
    testSuiteSummary:
      "SIH26117 was verified through end-to-end acceptance scripts testing offline document analysis, sandbox command isolation, and artifact structural validity.",
    metrics: [
      {
        label: "Air-Gap Enforcement",
        value: "0 External Calls",
        context: "100% of network traffic blocked via Linux unshare sandbox; all inference runs on local hardware.",
        status: "pass",
      },
      {
        label: "Repository Scale",
        value: "137,027 Lines",
        context: "Across 1,582 files (573 Python backend files, 66 TypeScript/React frontend files).",
        status: "pass",
      },
      {
        label: "Artifact Schema Conformance",
        value: "100%",
        context: "All generated DOCX and PPTX files pass OOXML structural schema verification.",
        status: "pass",
      },
      {
        label: "Cancellation Latency",
        value: "<200ms",
        context: "Graceful abort of long-running agent workflows without database lock corruption.",
        status: "pass",
      },
    ],
    methodology:
      "Evaluated using a test suite of real-world refinery documents (`test_doc/`) including piping inspection logs, valve maintenance manuals, and MRPL Safety SOP manifests.",
    auditResults: [
      {
        auditName: "Air-Gapped Sovereign Security Audit",
        scoreOrVerdict: "VERIFIED SOVEREIGN",
        details:
          "Confirmed zero outgoing HTTP/TCP requests during full execution cycles using packet capture monitoring (`tcpdump`).",
        uncoveredFlaws: [
          "Heavy concurrent document templating can saturate CPU cores on low-spec hardware.",
        ],
      },
    ],
  },
  research: {
    title: "Innovations in Air-Gapped Industrial Agents",
    existingEngineering:
      "Engineered an air-gapped sovereign AI workbench combining local SLMs, EvidenceGate RAG, and OOXML artifact generation.",
    experimentalDirections: [
      "EvidenceGate as a General RAG Verification Primitive: Treating retrieval as a formal audit rather than prompt decoration.",
      "Hardware-isolated SLM workbenches for national critical infrastructure.",
    ],
    potentialContributions: [
      "Case study in executing rapid, high-complexity systems engineering within a strict 24-hour hackathon window.",
    ],
  },
  lessons: {
    quote:
      "Deep systems like ÆON require months of careful architectural iteration; hackathons require decisive execution under strict constraints. Being an all-rounder engineer means mastering both modes.",
    takeaways: [
      {
        title: "Mock Interfaces Accelerate Velocity",
        insight:
          "Designing clean contracts with parallel mock implementations allowed UI and AI development to proceed simultaneously without blocking.",
      },
      {
        title: "RAG Demands an Evidence Gate",
        insight:
          "In high-stakes industrial environments, RAG cannot be a simple top-k prompt injector. It requires a dedicated verification gate that checks evidence before generation proceeds.",
      },
      {
        title: "Verify the Artifact, Not Just the Model",
        insight:
          "Users care about the final file. Building an ArtifactQualityGate to inspect OOXML schemas prevented broken downloads and proved production readiness.",
      },
    ],
  },
  currentState: {
    status: "MAINTAINED",
    summary:
      "SIH26117 was successfully completed and demonstrated at the Smart India Hackathon on 30 August 2026. It serves as an active prototype and architectural proof-of-concept for industrial sovereign AI.",
    whatWorks: [
      "Complete air-gapped FastAPI backend with local Qwen SLM and EasyOCR.",
      "React/Vite desktop workspace with split-screen document and preview modes.",
      "EvidenceGate RAG with verifiable citations against industrial SOPs.",
      "ArtifactQualityGate producing certified DOCX and PPTX files.",
      "Linux unshare sandbox preventing network leaks and filesystem traversal.",
    ],
    whatIsIncomplete: [
      "Horizontal multi-node scaling (currently single-node SQLite architecture).",
      "Dynamic GPU memory scheduling across multiple concurrent users.",
    ],
    whatRemains: [
      "Packaged as a standalone ISO/Docker appliance for direct deployment on refinery edge servers.",
    ],
    whatIWouldChangeToday: [
      "I would integrate asynchronous Celery/Redis task queues for slide generation rather than in-process threading.",
    ],
  },
  next: {
    statusNotice: "Maintained as an open research prototype for industrial sovereignty.",
    items: [
      {
        title: "Edge Appliance Packaging",
        type: "PLANNED",
        description:
          "Packaging the entire stack into a turnkey single-ISO installer for air-gapped server racks.",
      },
    ],
  },
  lineage: {
    roleInEvolution:
      "A parallel demonstration of rapid, high-intensity execution under tight hackathon constraints, complementing the long-horizon research of ÆON.",
  },
};
