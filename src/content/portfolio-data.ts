export interface ProjectDossier {
  id: string;
  number: string;
  title: string;
  tagline: string;
  status: string;
  year: string;
  technologies: string[];
  overview: string;
  architecture: string;
  problem: string;
  designDecisions: string[];
  implementation: string;
  failureModes: string[];
  testing: string;
  currentState: string;
  githubUrl?: string;
}

export interface EngineeringNote {
  id: string;
  issue: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  statusLabel: string;
  content: {
    sections: {
      heading?: string;
      paragraphs: string[];
    }[];
  };
}

export const heroContent = {
  sectionNumber: "/ 01",
  eyebrow: "ENGINEER · LEARNER · BUILDER",
  headline: {
    line1: "Building",
    line2: "intelligent",
    line3: "systems.",
  },
  supportingParagraphs: [
    "I'm Ashish Dhankecha, a Computer Engineering student focused on artificial intelligence, software systems, and real-world problem solving.",
    "I learn from first principles, build through experimentation, and document what I discover.",
  ],
  ctaPrimary: {
    label: "View My Work",
    href: "#projects",
  },
  ctaSecondary: {
    label: "About Me",
    href: "#about",
  },
  plateMetadata: {
    label: "IDEAS → SYSTEMS → IMPACT",
    year: "2026",
    caption: "SYSTEM / 001",
    subcaption: "FIRST-PRINCIPLES ARCHITECTURE & CONTROL",
  },
};

export const heroPhilosophy = {
  statement:
    "I believe meaningful technology is built by understanding deeply, building carefully, and improving continuously.",
};

export const currentlyMarkers = [
  { label: "AI SYSTEMS", detail: "Autonomous loops & agent runtime exploration" },
  { label: "REAL-WORLD PROJECTS", detail: "Software engineering grounded in utility" },
  { label: "CONTINUOUS LEARNING", detail: "Mathematical foundations to modern architectures" },
  { label: "LONG-TERM BUILDING", detail: "Systems engineered for durability and rigor" },
];

export const philosophyStripWords = [
  "Learn",
  "Build",
  "Solve",
  "Document",
  "Improve",
];

export const featuredAshiContent = {
  sectionNumber: "/ 02",
  badge: "FEATURED PROJECT",
  title: "Ashi",
  subtitle: "An Autonomous AI Operating System",
  description:
    "A long-term project exploring reliable, stateful, and autonomous AI systems that can plan, reason, act, verify, and learn.",
  status: "Active Research & Core Engineering",
  year: "2026",
  paradigm: "Stateful Execution Kernel & Autonomous Loops",
  whyTitle: "Why I'm building it.",
  whyText: [
    "Current AI systems are becoming increasingly capable. My interest is in what happens around the model:",
    "How should an intelligent system remember? How should it decide when to act? How should it recover from failure? How should its actions be evaluated? How should long-running work remain reliable?",
    "Ashi is my attempt to explore those questions through engineering.",
  ],
  githubUrl: "https://github.com/Ashish-Dhankecha",
};

export const selectedProjects: ProjectDossier[] = [
  {
    id: "ashi",
    number: "01",
    title: "Ashi",
    tagline: "Autonomous AI system research and engineering.",
    status: "Active Core Build",
    year: "2026",
    technologies: ["Python", "PyTorch", "Linux", "Systems Architecture"],
    overview:
      "Ashi is an ongoing exploration into reliable agentic computing. Rather than treating an LLM as a chatbot, Ashi treats the model as an untrusted reasoning engine connected to explicit state, structured memory, sandboxed execution environments, and deterministic verification gates.",
    architecture:
      "The runtime separates cognition from execution: Memory (episodic & semantic store) ↔ Planning (multi-step decomposition & hypothesis trees) ↓ Core Kernel ↙ ↘ Tool Sandbox & Execution Pipeline ↓ Evaluation & Invariant Verifier.",
    problem:
      "Most autonomous agent frameworks fail because of uncontrolled context drift, silent tool errors, hallucinated task completion, and inability to rollback state after unexpected tool outputs.",
    designDecisions: [
      "Explicit State Over Hidden Memory: Every decision and intermediate artifact is logged into an immutable append-only ledger.",
      "Deterministic Verification Step: An agent cannot declare a sub-goal completed without passing an external invariant check.",
      "Failure Recovery as a First-Class Primitive: Errors trigger systematic fallback plans instead of infinite retry loops.",
    ],
    implementation:
      "Implemented in Python with modular runtime boundaries, asynchronous dispatch, structured schema validation, and isolated process sandboxing on Linux.",
    failureModes: [
      "Context saturation causing forgotten constraints during deep iteration.",
      "Tool schema mismatches when external dependencies change signatures.",
      "Premature convergence on suboptimal solutions without sufficient exploration.",
    ],
    testing:
      "Evaluated across synthetic multi-step programming and file manipulation benchmarks with strict assertion checking.",
    currentState:
      "Active core development. Focus is on state consistency, verifiable action logging, and resilient tool dispatch.",
    githubUrl: "https://github.com/Ashish-Dhankecha",
  },
  {
    id: "cognitive-event-log",
    number: "02",
    title: "Cognitive Event Log",
    tagline: "Tamper-evident event history and reconstruction.",
    status: "Active Project",
    year: "2025–2026",
    technologies: ["Python", "Cryptographic Hashing", "SQLite", "System Design"],
    overview:
      "A deterministic logging library that records internal reasoning steps, external API tool interactions, and state mutations into a cryptographically hashed, append-only chronological chain.",
    architecture:
      "Each execution event produces a structured record (timestamp, actor ID, payload, parent hash, state digest) forming an audit tree capable of post-hoc verification and linear state replay.",
    problem:
      "Debugging autonomous agents is difficult because stochastic model outputs make bugs non-reproducible. Without verifiable history, inspecting why an agent took a destructive or erroneous step is guesswork.",
    designDecisions: [
      "Hash-chained nodes ensure history cannot be modified retroactively without invalidating root digests.",
      "Decoupled storage backends: works in-memory during testing, spills to disk for persistent runs.",
      "Replay harness: allows feeding logged state back into verification pipelines for post-mortem analysis.",
    ],
    implementation:
      "Written in Python with zero heavy dependencies for high portability and minimal runtime overhead.",
    failureModes: [
      "Large payload serialization overhead for image or binary data.",
      "Clock skew across distributed processes (mitigated via logical sequence counters).",
    ],
    testing:
      "Unit tests verifying chain integrity, mutation detection, and deterministic replay accuracy.",
    currentState:
      "Working prototype with unit test suite; evaluating integration as the backing storage for Ashi's execution trace.",
    githubUrl: "https://github.com/Ashish-Dhankecha",
  },
  {
    id: "agent-evaluation-system",
    number: "03",
    title: "Agent Evaluation System",
    tagline: "Evaluating reliability and execution of AI agents.",
    status: "Prototype & Benchmarking",
    year: "2025–2026",
    technologies: ["Python", "Benchmarks", "Failure Analysis", "Execution Sandbox"],
    overview:
      "An evaluation framework designed to score AI agent execution on real tasks by measuring task completion correctness, error recovery rates, and tool efficiency rather than conversational fluency.",
    architecture:
      "Sandbox Orchestrator → Task Injector → Agent Under Test → Trace Collector → Invariant Evaluator & Metric Reporter.",
    problem:
      "Standard LLM benchmarks (MMLU, HumanEval) measure static single-turn prediction, not the ability of an autonomous agent to navigate multi-step environments, handle errors, and verify results over extended horizons.",
    designDecisions: [
      "Black-box evaluation: evaluates agents purely on final state changes and execution traces.",
      "Differential failure taxonomy: categorizes failures into planning errors, tool syntax errors, environment timeout, and invariant violation.",
      "Reproducible environments: clean state resets prior to each test scenario.",
    ],
    implementation:
      "Python harness with containerized sandbox environments and standardized test case manifests.",
    failureModes: [
      "Flaky network calls when agents test against remote services.",
      "Non-deterministic task runtimes causing timing variability.",
    ],
    testing:
      "Tested against a suite of 20+ structured synthetic programming and configuration challenges.",
    currentState:
      "Experimental harness used for measuring iterative improvements in agent planning logic.",
    githubUrl: "https://github.com/Ashish-Dhankecha",
  },
  {
    id: "machine-learning-experiments",
    number: "04",
    title: "Machine Learning Experiments",
    tagline: "Implementations and experiments from first principles.",
    status: "Continuous Study & Implementation",
    year: "2025–2026",
    technologies: ["Python", "PyTorch", "Linear Algebra", "NumPy"],
    overview:
      "A collection of educational and experimental implementations of core machine learning algorithms and neural network architectures built from first principles to deeply internalize the mathematics.",
    architecture:
      "Structured into modular computational graphs: forward passes, automatic/manual backward passes, optimization step implementations, and evaluation loops.",
    problem:
      "Relying solely on high-level APIs like Hugging Face or Scikit-learn creates an illusion of understanding without grasping gradient flow, numerical stability, parameter initialization, and loss surface geometry.",
    designDecisions: [
      "Implement backpropagation manually using NumPy prior to moving to PyTorch autograd.",
      "Profile matrix multiplication and memory access patterns to understand computational bottlenecks.",
      "Document failure cases and gradient pathologies (vanishing/exploding gradients) with visual loss curves.",
    ],
    implementation:
      "Python notebooks and standalone scripts implementing perceptrons, multi-layer MLPs, self-attention mechanisms, and minimal transformer blocks.",
    failureModes: [
      "Numerical overflow in naive softmax and cross-entropy implementations.",
      "Vanishing gradients in deep unnormalized networks without residual connections.",
    ],
    testing:
      "Validated against PyTorch reference outputs for gradient agreement to within 1e-5 tolerance.",
    currentState:
      "Active personal repository of foundational implementations supporting ongoing university coursework and independent AI research.",
    githubUrl: "https://github.com/Ashish-Dhankecha",
  },
];

export const aboutContent = {
  sectionNumber: "/ 03",
  eyebrow: "BIOGRAPHICAL STATEMENT",
  headline: "Curious mind.\nBuilds for impact.",
  narrativeParagraphs: [
    "I'm a Computer Engineering student interested in artificial intelligence, software systems, and real-world problem solving.",
    "I enjoy taking difficult ideas apart, understanding how they work, rebuilding them, and testing them against reality.",
  ],
  currentPathHeadline: "My current path is centered around:",
  focusDisciplines: [
    { title: "Machine Learning", desc: "Foundational algorithms, optimization, and statistical learning theory." },
    { title: "Deep Learning", desc: "Neural architectures, representation learning, and backpropagation dynamics." },
    { title: "LLMs", desc: "Transformer mechanisms, attention patterns, context window dynamics, and inference." },
    { title: "AI Agents", desc: "Multi-step reasoning, tool orchestration, state persistence, and self-critique." },
    { title: "AI Systems", desc: "The software and hardware runtime surrounding models to ensure reliable execution." },
    { title: "Distributed Systems", desc: "Concurrency, state replication, RPC protocols, and fault isolation." },
    { title: "Evaluation & Verification", desc: "Empirical benchmarking, deterministic assertions, and failure analysis." },
  ],
};

export interface TrajectoryStage {
  number: string;
  stageCode: string;
  title: string;
  subtitle: string;
  description: string;
  supportingTopics: string[];
  annotation: string;
  layerConcept: string;
}

export interface TheDirectionContent {
  sectionNumber: string;
  label: string;
  eyebrow: string;
  headline: string;
  intro: {
    lead: string;
    body: string;
  };
  trajectory: TrajectoryStage[];
  longTermGoal: {
    label: string;
    statement: {
      prefix: string;
      term1: string;
      arrow1: string;
      term2: string;
      arrow2: string;
      term3: string;
      arrow3: string;
      term4: string;
      suffix: string;
    };
  };
  capabilityLoop: {
    label: string;
    kicker: string;
    steps: {
      number: string;
      label: string;
      detail: string;
    }[];
  };
  ambition: {
    label: string;
    paragraphs: string[];
  };
  ashiBridge: {
    label: string;
    title: string;
    subtitle: string;
    description: string;
    ctaPrimary: {
      label: string;
      href: string;
    };
    ctaSecondary: {
      label: string;
      href: string;
    };
  };
}

export const theDirectionContent: TheDirectionContent = {
  sectionNumber: "/ 04",
  label: "THE DIRECTION",
  eyebrow: "CAPABILITY TRAJECTORY",
  headline: "Becoming the kind of engineer\nwho can build what doesn't exist yet.",
  intro: {
    lead: "I don't want to spend my career only using the systems others build.",
    body: "I want to understand the foundations deeply enough to design, build, and eventually lead the development of systems that push what technology can do.",
  },
  trajectory: [
    {
      number: "01",
      stageCode: "CAPABILITY / 01",
      title: "FOUNDATIONS",
      subtitle: "Mathematics · Computer Science · Algorithms",
      description: "Understand the underlying principles.",
      supportingTopics: [
        "LINEAR ALGEBRA",
        "PROBABILITY",
        "CALCULUS",
        "DATA STRUCTURES",
        "ALGORITHMS",
      ],
      annotation: "First Principles Rigor",
      layerConcept: "Mathematical substrate & algorithmic correctness",
    },
    {
      number: "02",
      stageCode: "CAPABILITY / 02",
      title: "INTELLIGENCE",
      subtitle: "Machine Learning · Deep Learning · LLMs",
      description: "Understand how machines learn, represent, reason, and generate.",
      supportingTopics: [
        "MACHINE LEARNING",
        "DEEP LEARNING",
        "TRANSFORMERS",
        "LLMs",
        "POST-TRAINING",
      ],
      annotation: "Neural & Statistical Cognition",
      layerConcept: "Optimization geometry & representation spaces",
    },
    {
      number: "03",
      stageCode: "CAPABILITY / 03",
      title: "SYSTEMS",
      subtitle: "Distributed Systems · Infrastructure · Architecture",
      description: "Turn intelligence into reliable computation.",
      supportingTopics: [
        "DISTRIBUTED SYSTEMS",
        "DATABASES",
        "NETWORKING",
        "OPERATING SYSTEMS",
        "COMPUTER ARCHITECTURE",
      ],
      annotation: "Deterministic Execution Scale",
      layerConcept: "Fault isolation, memory boundaries & concurrency",
    },
    {
      number: "04",
      stageCode: "CAPABILITY / 04",
      title: "AUTONOMY",
      subtitle: "Agents · Memory · Planning · Tools · Evaluation",
      description: "Build systems capable of sustained execution.",
      supportingTopics: [
        "MEMORY",
        "PLANNING",
        "TOOL USE",
        "EXECUTION",
        "VERIFICATION",
        "RECOVERY",
      ],
      annotation: "Closed-Loop Agency",
      layerConcept: "Persistent state, invariant gates & error recovery",
    },
    {
      number: "05",
      stageCode: "CAPABILITY / 05",
      title: "RESEARCH",
      subtitle: "Experiments · New Architectures · Reinforcement Learning",
      description: "Move from implementing known ideas toward discovering better ones.",
      supportingTopics: [
        "EXPERIMENTATION",
        "EVALUATION",
        "RL",
        "RLVR",
        "NEW ARCHITECTURES",
        "FAILURE ANALYSIS",
      ],
      annotation: "Empirical Discovery",
      layerConcept: "Hypothesis testing, reward synthesis & falsification",
    },
    {
      number: "06",
      stageCode: "CAPABILITY / 06",
      title: "CREATION",
      subtitle: "Products · Research Systems · Companies",
      description: "Turn difficult technical problems into systems that matter.",
      supportingTopics: [
        "ENDURING SYSTEMS",
        "MISSION-CRITICAL UTILITY",
        "DEEP ARCHITECTURE",
        "NOVEL CAPABILITY",
      ],
      annotation: "Enduring Technical Reality",
      layerConcept: "Translating fundamental breakthroughs into lasting software",
    },
  ],
  longTermGoal: {
    label: "THE LONG-TERM GOAL",
    statement: {
      prefix: "To become an engineer and researcher capable of taking a difficult problem from ",
      term1: "first principles",
      arrow1: " → ",
      term2: "research",
      arrow2: " → ",
      term3: "system",
      arrow3: " → ",
      term4: "reality",
      suffix: ".",
    },
  },
  capabilityLoop: {
    label: "ENGINEERING CAPABILITY LOOP",
    kicker: "CONTINUOUS DISCOVERY & REFINEMENT CYCLE",
    steps: [
      { number: "01", label: "UNDERSTAND", detail: "Deconstruct laws and constraints from first principles" },
      { number: "02", label: "DISCOVER", detail: "Formulate hypotheses and empirical investigations" },
      { number: "03", label: "DESIGN", detail: "Architect invariants, state ledgers, and boundaries" },
      { number: "04", label: "BUILD", detail: "Implement with deterministic software rigor" },
      { number: "05", label: "VERIFY", detail: "Subject systems to stress, mutation, and invariant checks" },
      { number: "06", label: "DEPLOY", detail: "Integrate into active operating runtime environments" },
      { number: "07", label: "IMPROVE", detail: "Analyze failure modes and extract architectural gains" },
    ],
  },
  ambition: {
    label: "LOOKING FURTHER",
    paragraphs: [
      "Eventually, I want to work at the frontier of AI and intelligent systems — not simply by using increasingly capable models, but by understanding what is required to turn intelligence into reliable, autonomous systems.",
      "That means becoming deeply capable across mathematics, machine learning, computer systems, research, and engineering — and eventually using those capabilities to build things that would be difficult for a small team to build today.",
    ],
  },
  ashiBridge: {
    label: "ONE EXPERIMENT IN THAT DIRECTION",
    title: "Ashi",
    subtitle: "An Autonomous AI Operating System",
    description:
      "Ashi is one of the ways I'm exploring this path today — a long-term attempt to understand what it takes to build AI systems with persistent state, reasoning, tools, verification, and autonomous execution.",
    ctaPrimary: {
      label: "Explore Ashi",
      href: "#ashi-section",
    },
    ctaSecondary: {
      label: "View the architecture",
      href: "#ashi-section",
    },
  },
};

export const currentFocusTimeline = {
  title: "CURRENT FOCUS",
  subtitle: "Progression through foundational disciplines",
  year: "2026",
  stages: [
    {
      level: "01",
      topic: "MATHEMATICAL FOUNDATIONS",
      detail: "Linear algebra, multivariate calculus, probability & statistics.",
      status: "Active Foundation",
    },
    {
      level: "02",
      topic: "Machine Learning",
      detail: "Classical learning theory, loss landscapes, optimization techniques.",
      status: "Active Study",
    },
    {
      level: "03",
      topic: "Deep Learning",
      detail: "Neural networks, gradient dynamics, representation representations.",
      status: "Active Implementation",
    },
    {
      level: "04",
      topic: "Transformers & LLMs",
      detail: "Self-attention mechanics, tokenization, positional embeddings, inference pipelines.",
      status: "Active Exploration",
    },
    {
      level: "05",
      topic: "AI Agents",
      detail: "Planning routines, action validation, tool abstraction, context synthesis.",
      status: "Active Engineering",
    },
    {
      level: "06",
      topic: "AI Systems",
      detail: "Runtime integrity, process isolation, memory architectures, latency guarantees.",
      status: "Active Engineering",
    },
    {
      level: "07",
      topic: "Ashi",
      detail: "Flagship synthesis of reliable autonomous runtime primitives.",
      status: "Active Long-Term Project",
    },
  ],
};

export const engineeringPrinciples = [
  {
    number: "01",
    title: "UNDERSTAND FIRST",
    rule: "Understand the underlying mechanism before relying on the abstraction.",
    elaboration:
      "Libraries and frameworks simplify execution, but true leverage comes from knowing what happens underneath the hood.",
  },
  {
    number: "02",
    title: "BUILD",
    rule: "Turn ideas into working systems.",
    elaboration:
      "Theory becomes meaningful when translated into code, executed in real environments, and subjected to real inputs.",
  },
  {
    number: "03",
    title: "MEASURE",
    rule: "Use experiments, benchmarks, and failure analysis to determine what actually works.",
    elaboration:
      "Intuition is a starting hypothesis; empirical data, edge-case testing, and benchmark metrics determine reality.",
  },
  {
    number: "04",
    title: "IMPROVE",
    rule: "Iterate from evidence rather than assumption.",
    elaboration:
      "Engineering maturity is reflected in the willingness to dissect failures, identify root causes, and refine systematically.",
  },
];

export const engineeringNotes: EngineeringNote[] = [
  {
    id: "note-01",
    issue: "NOTE / 01",
    title: "Ashi Engineering Note #01: Verifiable Cognitive History",
    subtitle: "Designing trustworthy history for autonomous systems.",
    category: "AI Systems & Architecture",
    date: "August 2025",
    readTime: "4 min read",
    excerpt:
      "I don't want an agent to merely claim what happened. I want it to produce a verifiable execution trace that can be audited, replayed, and proven.",
    statusLabel: "[Working Note — Draft in Progress]",
    content: {
      sections: [
        {
          heading: "The Core Problem of Agent Amnesia & Revisionism",
          paragraphs: [
            "Current autonomous agents operate with conversational context windows that are fragile, transient, and non-deterministic. When an agent executes a multi-step task involving 15 tool calls over 20 minutes, standard implementations concatenate string logs back into the prompt.",
            "This approach introduces two fundamental failure modes: context saturation (where early system instructions get dropped) and historical drift (where intermediate failures get hallucinated away during self-summarization).",
          ],
        },
        {
          heading: "From String Buffers to Immutable Event Graphs",
          paragraphs: [
            "In Ashi, we approach state history not as natural language memory, but as an append-only cryptographic event log. Every tool invocation, environment response, and intermediate planning branch is treated as an immutable transaction.",
            "Each event record contains: a monotonic sequence ID, a timestamp, an actor token, a serialized payload hash, and the SHA-256 digest of the previous state.",
            "By structuring cognitive history as a directed acyclic graph (DAG) of state transitions, we gain three crucial properties: deterministic replay for debugging, mathematical proof against state tampering, and the ability to cleanly branch or backtrack when an action violates system invariants.",
          ],
        },
        {
          heading: "Current Engineering Status",
          paragraphs: [
            "The initial prototype of this cryptographic event log is being implemented as a standalone library (Cognitive Event Log) before integration into the Ashi kernel runtime.",
            "Early observations indicate that decoupling memory verification from model generation reduces catastrophic runaway loops by allowing an external verifier to halt execution the moment an invariant fails.",
          ],
        },
      ],
    },
  },
  {
    id: "note-02",
    issue: "NOTE / 02",
    title: "Designing Reliable AI Systems",
    subtitle: "What changes when AI systems must execute rather than simply generate?",
    category: "Systems Architecture",
    date: "July 2025",
    readTime: "5 min read",
    excerpt:
      "When models transition from chat interfaces to execution engines, standard software engineering discipline — isolation, determinism, and invariants — becomes essential.",
    statusLabel: "[Working Note — Draft in Progress]",
    content: {
      sections: [
        {
          heading: "The Execution Boundary",
          paragraphs: [
            "A language model generating text is harmless; an autonomous agent dispatching shell commands, editing filesystem trees, and making network calls is an active software process with side effects.",
            "Traditional software engineering assumes deterministic functions: given input X, function F returns output Y. Neural models are fundamentally stochastic and open-ended. When you connect an open-ended probability distribution to an operating system interface, traditional error handling breaks down.",
          ],
        },
        {
          heading: "Three Foundational Invariants",
          paragraphs: [
            "1. Sandboxed Blast Radius: No agent execution should run directly in the host environment without explicit resource caps, ephemeral filesystem overlays, and network restriction.",
            "2. State Snapshotting: Prior to executing any irreversible action (such as file modification or database writes), the runtime must create an atomic rollback checkpoint.",
            "3. Separate Evaluators: An agent must never be the sole judge of its own success. The entity that performs the task cannot be the entity that certifies the task.",
          ],
        },
        {
          heading: "Path Forward",
          paragraphs: [
            "Exploring these boundaries forms the core of my research interest in AI systems. The bottleneck of autonomous computing is rarely model intelligence; it is runtime reliability, verification, and failure recovery.",
          ],
        },
      ],
    },
  },
  {
    id: "note-03",
    issue: "NOTE / 03",
    title: "Learning AI From First Principles",
    subtitle: "The path from mathematical foundations to modern AI systems.",
    category: "Methodology & Foundations",
    date: "July 2025",
    readTime: "4 min read",
    excerpt:
      "The path from mathematical foundations to modern AI systems: studying mechanisms from the ground up rather than consuming high-level wrappers.",
    statusLabel: "[Working Note — Personal Study Notes]",
    content: {
      sections: [
        {
          heading: "The Danger of Premature Abstraction",
          paragraphs: [
            "In modern AI, it is trivially easy to pip install a library, copy three lines of Python, and call an API to generate remarkable results. But treating deep learning as a collection of black-box APIs creates a fragile foundation.",
            "When a production system experiences catastrophic forgetting, loss divergence, numerical instability, or latency degradation, an API consumer is stuck.",
          ],
        },
        {
          heading: "The First-Principles Discipline",
          paragraphs: [
            "My approach to Computer Engineering is rooted in understanding the underlying machinery before trusting the abstraction:",
            "• Understand the linear algebra of matrix transformations before calling PyTorch linear layers.",
            "• Implement backpropagation and gradient descent by hand with NumPy before relying on autograd.",
            "• Study attention score normalization and token projection dynamics before building agent pipelines.",
            "This takes longer, but it compounds exponentially over decades.",
          ],
        },
        {
          heading: "Long-Term Commitment",
          paragraphs: [
            "Engineering maturity is not measured by the speed at which one can assemble a demo; it is measured by the clarity with which one understands the foundational laws governing the system.",
          ],
        },
      ],
    },
  },
];

export const skillsGrouped = {
  sectionNumber: "/ 07",
  eyebrow: "TECHNICAL INDEX",
  title: "Tools & Technologies",
  subtitle: "Technologies I actively use and study from first principles.",
  categories: [
    {
      name: "AI / MACHINE LEARNING",
      description: "Mathematical models, architectures, and agentic workflows.",
      items: [
        { name: "Python", context: "Primary engineering & research language" },
        { name: "PyTorch", context: "Model implementation, tensor compute, autograd" },
        { name: "Machine Learning", context: "Classical algorithms, loss functions, optimization" },
        { name: "Deep Learning", context: "Neural architectures, representation learning" },
        { name: "LLMs", context: "Attention mechanisms, embeddings, tokenization" },
        { name: "AI Agents", context: "Planning loops, state persistence, tool dispatch" },
      ],
    },
    {
      name: "SYSTEMS",
      description: "Infrastructure, runtime environments, and deterministic software engineering.",
      items: [
        { name: "Linux", context: "OS environment, shell scripting, process isolation" },
        { name: "Git", context: "Version control, branching workflows, commit hygiene" },
        { name: "Docker", context: "Sandboxed environments, containerized runtimes" },
        { name: "PostgreSQL", context: "Relational data modeling, ACID transactions" },
        { name: "FastAPI", context: "High-concurrency asynchronous API backends" },
        { name: "System Design", context: "Architectural boundaries, throughput, fault tolerance" },
      ],
    },
  ],
};

export const personalBrandStatement = {
  quote:
    "I want to spend my career understanding difficult problems and building systems capable of solving them.",
  subtext: "ASHISH DHANKECHA — COMPUTER ENGINEERING STUDENT & AI SYSTEMS BUILDER",
};

export const contactContent = {
  sectionNumber: "/ 08",
  eyebrow: "COMMUNICATION & COLLABORATION",
  headline: "Let's build something difficult.",
  supportingText:
    "I'm interested in meaningful technical work, research collaborations, ambitious projects, and conversations around AI and systems.",
  email: "ashishdhankecha256@gmail.com",
  links: [
    {
      platform: "GitHub",
      url: "https://github.com/Ashish-Dhankecha",
      label: "github.com/Ashish-Dhankecha",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com",
      label: "linkedin.com/in/ashishdhankecha",
    },
    {
      platform: "Email",
      url: "mailto:ashishdhankecha256@gmail.com",
      label: "ashishdhankecha256@gmail.com",
    },
  ],
};
