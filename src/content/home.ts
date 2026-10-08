/** Homepage copy. Facts must trace to a repository, a lab note, or Ashish's own record. */

export const inventor = {
  name: "Ashish Dhankecha",
  role: "AI developer and systems builder",
  education: "BE Computer Engineering, SSASIT Surat, 2024 to present",
  claim: "I build AI systems from first principles, and file every one with its evidence.",
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
    takeaway: "Foundation: computer science from first principles.",
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

export const materials = [
  { category: "AI / ML", items: ["PyTorch", "Transformers", "llama.cpp", "Local SLMs (Qwen, Llama)", "GGUF quantization", "RAG pipelines", "Embeddings"] },
  { category: "Languages", items: ["Python", "TypeScript", "C / C++", "SQL", "Bash"] },
  { category: "Systems", items: ["OS architecture", "asyncio", "Event-bus runtimes", "AST static analysis", "Process sandboxing", "Acyclic monorepos"] },
  { category: "Data", items: ["PostgreSQL", "SQLite (WAL)", "Vector stores", "Relational schemas"] },
  { category: "Infrastructure", items: ["Linux", "Docker", "Local-first architecture", "Git"] },
  { category: "Application", items: ["FastAPI", "Next.js", "React", "Tailwind CSS", "REST APIs"] },
  { category: "Tooling", items: ["uv workspaces", "pytest", "Git", "VS Code", "Linux CLI"] },
];
