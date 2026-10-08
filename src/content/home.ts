/** Homepage copy. Facts must trace to a repository, a lab note, or Ashish's own record. */

export const inventor = {
  name: "Ashish Dhankecha",
  role: "AI developer and systems builder",
  education: "BE Computer Engineering, SSASIT Surat, 2024 to present",
  claim: "I build AI systems and publish where they fail.",
  paragraphs: [
    "I'm a Computer Engineering student working on artificial intelligence, software systems and real-world problem solving.",
    "I take difficult ideas apart, understand how they work, rebuild them, and test them against reality. My interest is the system around the model: memory, state, verification, recovery.",
    "I don't limit myself to one stack. If something needs to be learned, I learn it. If something needs to be built, I build it. If something breaks, I find out why.",
  ],
};

export interface RecordEntry {
  period: string;
  title: string;
  subtitle: string;
  summary: string;
  takeaway: string;
  href?: string;
}

export const recordOfWork: RecordEntry[] = [
  {
    period: "Jul 2024 – present",
    title: "Bachelor of Engineering, Computer Engineering",
    subtitle: "SSASIT, Surat",
    summary:
      "Computer architecture, operating systems, compilers, algorithms, discrete mathematics and systems programming. Studying the machinery before trusting the abstractions.",
    takeaway: "Foundation: computer science fundamentals.",
  },
  {
    period: "16 Jun – 10 Jul 2026",
    title: "Leo",
    subtitle: "AI companion OS and forensic architecture audit",
    summary:
      "Modelled an AI companion as an operating-system kernel with 43 cognitive subsystems and multi-tier memory. An automated audit found 281 direct-database calls bypassing the memory gateway, and showed that 297 passing mock tests hid 11 broken live integrations.",
    takeaway: "Architecture without automated enforcement rots into debt.",
    href: "/projects/leo",
  },
  {
    period: "10 – 16 Jul 2026",
    title: "Vani",
    subtitle: "Local-first cognitive OS with a 50-year horizon",
    summary:
      "No cloud infrastructure. Rejected LangChain for direct AIPort contracts, replaced a graph database with SQLite property tables, and built an AST guardian that makes layer violations fail the build.",
    takeaway: "Small protocols and mechanical invariants keep code alive for decades.",
    href: "/projects/vani",
  },
  {
    period: "16 Jul 2026 – present",
    title: "ÆON",
    subtitle: "Personal cognitive operating system, flagship",
    summary:
      "A 34-package uv monorepo. Audited the live system (first score 3/10), found and removed the vacuous-success bug, and cut local llama.cpp turn latency from 32.8 s to 5.4 s.",
    takeaway: "Persistent memory, truth boundaries and acyclic structure.",
    href: "/projects/ashi",
  },
  {
    period: "30 Aug 2026",
    title: "SIH26117",
    subtitle: "Air-gapped agentic workbench, Smart India Hackathon",
    summary:
      "An on-premise agentic workbench for confidential industrial sites: local Qwen models, an evidence-gated retrieval boundary, sandboxed execution and a workspace UI, built in a single sprint.",
    takeaway: "Months on a deep system, or one day under hard constraints.",
    href: "/projects/sih",
  },
];

export const fields = [
  {
    title: "Foundations",
    subtitle: "Mathematics, computer science, algorithms",
    line: "Understand the underlying principles.",
  },
  {
    title: "Intelligence",
    subtitle: "Machine learning, deep learning, LLMs",
    line: "Understand how machines learn, represent, reason and generate.",
  },
  {
    title: "Systems",
    subtitle: "Distributed systems, infrastructure, architecture",
    line: "Turn intelligence into reliable computation.",
  },
  {
    title: "Autonomy",
    subtitle: "Agents, memory, planning, tools, evaluation",
    line: "Build systems capable of sustained execution.",
  },
  {
    title: "Research",
    subtitle: "Experiments, new architectures, reinforcement learning",
    line: "Move from implementing known ideas toward discovering better ones.",
  },
  {
    title: "Creation",
    subtitle: "Products, research systems, companies",
    line: "Turn difficult technical problems into systems that matter.",
  },
];

export const longTermGoal =
  "To become an engineer and researcher who can take a difficult problem from first principles to research, to system, to reality.";

export const method = [
  {
    title: "Understand",
    line: "Break the problem down.",
    detail:
      "Work out the bounds, the requirements and the constraints before writing a line of code.",
  },
  {
    title: "Learn",
    line: "Find what I don't know.",
    detail: "Read the source, read the papers, and learn whatever the problem demands.",
  },
  {
    title: "Architect",
    line: "Design the simplest system that can work.",
    detail:
      "Explicit subsystem boundaries, written decision records, few dependencies, mechanical invariant gates.",
  },
  {
    title: "Build",
    line: "Turn the design into reality.",
    detail: "Strictly typed, modular code: kernels, event buses, schemas and interfaces.",
  },
  {
    title: "Test",
    line: "Try to break it.",
    detail: "Benchmark latency, provoke failure modes, and catch tests that pass against mocks only.",
  },
  {
    title: "Improve",
    line: "Fix what fails.",
    detail: "Remove vacuous successes, fix root causes, harden truth boundaries, repeat.",
  },
];

export interface MaterialItem {
  name: string;
  projects: ("Leo" | "Vani" | "ÆON" | "SIH26117")[];
}

export interface MaterialCategory {
  category: string;
  items: MaterialItem[];
}

export const materials: MaterialCategory[] = [
  {
    category: "AI / ML",
    items: [
      { name: "PyTorch", projects: ["ÆON"] },
      { name: "Transformers", projects: ["Leo", "ÆON"] },
      { name: "llama.cpp", projects: ["ÆON"] },
      { name: "Local SLMs (Qwen, Llama)", projects: ["ÆON", "SIH26117"] },
      { name: "GGUF quantization", projects: ["ÆON"] },
      { name: "RAG pipelines", projects: ["ÆON", "SIH26117"] },
      { name: "Embeddings", projects: ["Leo", "ÆON", "SIH26117"] },
    ],
  },
  {
    category: "Languages",
    items: [
      { name: "Python", projects: ["Leo", "Vani", "ÆON", "SIH26117"] },
      { name: "TypeScript", projects: ["Leo", "SIH26117"] },
      { name: "SQL", projects: ["Leo", "Vani", "ÆON"] },
      { name: "Bash", projects: ["Leo", "SIH26117"] },
    ],
  },
  {
    category: "Systems",
    items: [
      { name: "OS architecture", projects: ["Leo", "Vani", "ÆON"] },
      { name: "asyncio", projects: ["Leo", "ÆON", "SIH26117"] },
      { name: "Event-bus runtimes", projects: ["Leo", "ÆON"] },
      { name: "AST static analysis", projects: ["Vani"] },
      { name: "Process sandboxing", projects: ["ÆON", "SIH26117"] },
      { name: "Acyclic monorepos", projects: ["ÆON"] },
    ],
  },
  {
    category: "Data",
    items: [
      { name: "PostgreSQL", projects: ["Leo", "ÆON"] },
      { name: "SQLite (WAL)", projects: ["Vani", "ÆON"] },
      { name: "Vector stores", projects: ["Leo", "SIH26117"] },
      { name: "Relational schemas", projects: ["Leo", "ÆON"] },
    ],
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Linux", projects: ["Leo", "SIH26117", "ÆON"] },
      { name: "Docker", projects: ["Leo", "ÆON", "SIH26117"] },
      { name: "Local-first architecture", projects: ["Vani", "ÆON", "SIH26117"] },
      { name: "Git", projects: ["Leo", "Vani", "ÆON", "SIH26117"] },
    ],
  },
  {
    category: "Application",
    items: [
      { name: "FastAPI", projects: ["Leo", "SIH26117", "ÆON"] },
      { name: "React", projects: ["Leo", "SIH26117"] },
      { name: "Tailwind CSS", projects: ["SIH26117"] },
      { name: "REST APIs", projects: ["Leo", "SIH26117"] },
    ],
  },
  {
    category: "Tooling",
    items: [
      { name: "uv workspaces", projects: ["ÆON"] },
      { name: "pytest", projects: ["Leo", "Vani", "ÆON", "SIH26117"] },
    ],
  },
];
