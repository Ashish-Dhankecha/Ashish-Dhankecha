import { Person, Project, ResearchItem, WritingItem } from "@/types/content";

/**
 * Structural placeholder content for Phase 0 verification.
 * Adheres strictly to the rule: No fabricated credentials, metrics, or claims.
 */
export const foundationPerson: Person = {
  name: "Ashish Dhankecha",
  tagline: "Founder, Researcher, Technical Builder",
  roles: [
    "Systems Architecture",
    "First-Principles Research",
    "Software Engineering",
  ],
  bio: [
    "Building software systems, conducting technical research, and exploring foundational models and architectures.",
  ],
  socials: [
    {
      platform: "GitHub",
      url: "https://github.com",
      label: "Code & Open Source",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com",
      label: "Professional Profile",
    },
  ],
};

export const sampleStructuralProjects: Project[] = [
  {
    id: "proj-01",
    slug: "systems-architecture",
    title: "Distributed Compute & Execution Engine",
    tagline: "High-throughput execution runtime for deterministic workloads",
    description:
      "A prototype architecture exploring low-latency IPC, memory-mapped state serialization, and distributed job orchestration.",
    year: "2026",
    status: "active",
    category: "Systems Engineering",
    technologies: ["TypeScript", "Rust", "Node.js"],
    featured: true,
  },
  {
    id: "proj-02",
    slug: "neural-interfaces",
    title: "Contextual Memory & Retrieval Primitives",
    tagline: "Graph-indexed hybrid retrieval for agentic memory systems",
    description:
      "Exploratory indexing primitives evaluating sparse-dense vector combination strategies and hierarchical memory consolidation.",
    year: "2025",
    status: "research",
    category: "AI / ML",
    technologies: ["Python", "PyTorch", "TypeScript"],
    featured: true,
  },
];

export const sampleStructuralResearch: ResearchItem[] = [
  {
    id: "res-01",
    slug: "deterministic-execution-guarantees",
    title: "Deterministic Execution Guarantees in Heterogeneous Tooling",
    summary:
      "An investigation into boundary enforcement, sandbox lifecycle management, and reproducible state transitions.",
    year: "2026",
    status: "in-progress",
    topics: ["Systems Architecture", "Execution Sandboxes", "Determinism"],
  },
  {
    id: "res-02",
    slug: "multi-agent-coordination-dynamics",
    title: "Coordination Dynamics in Asynchronous Multi-Agent Systems",
    summary:
      "Notes on consensus overhead, message delivery semantics, and deadlock mitigation in decentralized agents.",
    year: "2025",
    status: "note",
    topics: ["Distributed Systems", "Agentic Systems", "Consensus"],
  },
];

export const sampleStructuralWriting: WritingItem[] = [
  {
    id: "wri-01",
    slug: "first-principles-system-design",
    title: "First-Principles Thinking in Complex Software Systems",
    summary:
      "Why decomposing requirements to foundational constraints outperforms pattern-matching against standard templates.",
    publishedAt: "2026-01-15",
    readTime: "6 min read",
    tags: ["Systems Thinking", "Engineering", "Architecture"],
  },
];
