"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ScrambleText } from "./scramble-text";

export interface LabReport {
  id: string;
  number: string;
  status: string;
  domain: string;
  category: "all" | "os" | "agents" | "inference" | "analysis";
  title: string;
  description: string;
  problem: string;
  solution: string;
  empiricalFindings: string;
  tags: string[];
  githubUrl?: string;
  labUrl?: string;
}

const LAB_REPORTS: LabReport[] = [
  {
    id: "ashi",
    number: "#01",
    status: "[ACTIVE / PROD]",
    domain: "AI Systems / Python / uv Monorepo",
    category: "os",
    title: "Ashi — Personal Cognitive Operating System",
    description:
      "A 28-package personal AI operating system built from first principles to think alongside one person, running locally with cloud fallback and acyclic architecture.",
    problem:
      "Autonomous personal AI operating persistently across days must avoid silent empty completions, maintain stateful memory across sessions, and execute inference without turn latency cascades.",
    solution:
      "Engineered an acyclic 28-package Python monorepo using uv workspaces. Built decoupled cognitive layers, eliminated Ollama to drop turn latency from 32.8s to 5.4s, and established 24µs ambient perception.",
    empiricalFindings:
      "Empirical audit uncovered the Vacuous Success Bug where empty plans scored 100% achieved in 370ms. Rewrote verification gates to require concrete execution evidence before marking goals complete.",
    tags: ["Python", "uv Monorepo", "PostgreSQL", "llama.cpp", "FastAPI", "AsyncIO", "Cognitive OS"],
    githubUrl: "https://github.com/Ashish-Dhankecha",
    labUrl: "/lab",
  },
  {
    id: "leo",
    number: "#02",
    status: "[ARCHIVED RESEARCH]",
    domain: "OS Architecture / Cognitive Memory / Audit",
    category: "analysis",
    title: "LEO — AI Companion Operating System & Forensic Audit",
    description:
      "An ambitious research exploration into modeling an intelligent companion as an operating system kernel with 43 cognitive subsystems and multi-tier memory.",
    problem:
      "Can an intelligent companion be structured as an operating system with a CMMU (Cognitive Memory Management Unit) and Interconnect without collapsing under architectural drift?",
    solution:
      "Defined 43 granular cognitive subsystems, atomic boot rollbacks, and multi-tier memory (working, episodic, semantic, procedural) across relational and vector stores.",
    empiricalFindings:
      "Automated forensic audit revealed an implementation reality gap: 281 direct-database violations bypassed the CMMU gatekeeper, and 297 mock tests masked 11 broken real-world integrations.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Neo4j", "Redis", "CMMU", "Forensic Audit"],
    githubUrl: "https://github.com/Ashish-Dhankecha",
    labUrl: "/lab",
  },
  {
    id: "vani",
    number: "#03",
    status: "[PHASE 0 CERTIFIED]",
    domain: "50-Year Longevity / Zero Cloud / AST Guardian",
    category: "os",
    title: "VANI — 50-Year Sovereign AI Operating System",
    description:
      "A personal AI system engineered with zero external cloud infrastructure, strict AST certification, custom event bus, and complete local sovereignty.",
    problem:
      "How to build an AI operating system intended to run for 50 years without succumbing to vendor churn, graph database deprecation, or framework abstraction collapse?",
    solution:
      "Completed full kernel, deterministic boot sequence, event bus, and cognitive scheduler with zero external cloud dependencies. Replaced LangChain with raw AIPort contracts and SQLite schemas.",
    empiricalFindings:
      "Built an AST Architecture Guardian that runs in CI to statically verify that zero modules bypass architectural layers, guaranteeing zero-dependency drift over decades.",
    tags: ["Python", "Strict Typing", "SQLite", "AST Analysis", "Zero Cloud", "Longevity"],
    githubUrl: "https://github.com/Ashish-Dhankecha",
    labUrl: "/lab",
  },
  {
    id: "sub2b-inference",
    number: "#04",
    status: "[BENCHMARKED]",
    domain: "Inference Engine / llama.cpp / Quantization",
    category: "inference",
    title: "Sub-2B SLM Local Inference Engine & Benchmarking",
    description:
      "Comprehensive evaluation of 6 sub-2B small language models on consumer hardware to establish the empirical capability ceiling for local-first cognitive systems.",
    problem:
      "Local AI systems require sub-2-second turn latencies to maintain interactive conversational flow, but small models frequently suffer from output truncation and provider timeout cascades.",
    solution:
      "Benchmarked models via raw llama.cpp bindings. Discovered llama.cpp cancellation segfaults during abrupt user interruptions, wrote defensive signal handling, and quantized weights to Q4_K_M.",
    empiricalFindings:
      "Eliminating the Ollama proxy layer and running native llama.cpp reduced per-turn inference overhead from 32.8s down to 5.4s while stabilizing memory footprint under 2.4GB VRAM.",
    tags: ["llama.cpp", "GGUF", "Sub-2B SLM", "Quantization", "C++", "Profiling", "Edge AI"],
    githubUrl: "https://github.com/Ashish-Dhankecha",
    labUrl: "/lab",
  },
  {
    id: "vacuous-success",
    number: "#05",
    status: "[SOLVED & HARDENED]",
    domain: "Autonomous Execution / Truth Boundaries",
    category: "agents",
    title: "Vacuous Success Bug Eliminator & Invariant Verifier",
    description:
      "Algorithmic verification system preventing autonomous agents from falsely marking empty or unexecuted plans as successfully completed tasks.",
    problem:
      "In traditional agent loops, if an LLM outputs an empty plan or invalid tool invocation, standard unit tests frequently pass vacuously because zero tasks failed.",
    solution:
      "Engineered deterministic truth boundary assertions: every task marked 'ACHIEVED' must present cryptographic execution proofs, filesystem diffs, or verifiable HTTP responses.",
    empiricalFindings:
      "Eliminated 100% of false-positive achievements in Ashi's test suite, raising live behavioral evaluation integrity from 3/10 to 9.4/10 across multi-step execution runs.",
    tags: ["Agent Loops", "Truth Boundaries", "Verification", "Testing", "Python", "Invariants"],
    githubUrl: "https://github.com/Ashish-Dhankecha",
    labUrl: "/lab",
  },
  {
    id: "cognitive-event-log",
    number: "#06",
    status: "[SHIPPED]",
    domain: "Event Log / Stateful Persistence / Telemetry",
    category: "agents",
    title: "Cognitive Event Stream & Verifiable Execution Log",
    description:
      "Append-only, immutable event log capturing every cognitive step, perception tick, and tool invocation with nanosecond timestamps and causal graphs.",
    problem:
      "Debugging complex cognitive loops without reproducible state history makes diagnosing multi-turn reasoning degradation nearly impossible.",
    solution:
      "Implemented a high-throughput event bus writing to WAL-mode SQLite and PostgreSQL. Structured every thought, tool call, and invariant check into an immutable causal sequence.",
    empiricalFindings:
      "Enables instant deterministic replay of failed agent trajectories, pinpointing prompt drift or tool timeout cascades within seconds.",
    tags: ["Event Bus", "Append-Only", "SQLite WAL", "Observability", "Telemetry", "Audit"],
    githubUrl: "https://github.com/Ashish-Dhankecha",
    labUrl: "/lab",
  },
];

type CategoryKey = "all" | "os" | "agents" | "inference" | "analysis";

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<CategoryKey>("all");
  const [expandedReports, setExpandedReports] = useState<Record<string, boolean>>({});

  const toggleReport = (id: string) => {
    setExpandedReports((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredReports = activeFilter === "all"
    ? LAB_REPORTS
    : LAB_REPORTS.filter((r) => r.category === activeFilter);

  const filterButtons: { label: string; key: CategoryKey }[] = [
    { label: "[ALL]", key: "all" },
    { label: "[COGNITIVE OS]", key: "os" },
    { label: "[AGENT INTEGRITY]", key: "agents" },
    { label: "[LOCAL INFERENCE]", key: "inference" },
    { label: "[STATIC ANALYSIS]", key: "analysis" },
  ];

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative z-10">
      <div className="section-container section-padding">
        {/* Section Header */}
        <div className="mb-8 reveal reveal-up visible max-w-3xl">
          <span className="section-number">
            <ScrambleText text="03 // shipped work" />
          </span>
          <h2
            id="projects-heading"
            className="text-3xl md:text-4xl font-bold text-pakcat-text-primary mt-3 font-sans"
          >
            Lab Reports & Systems
          </h2>
          <p className="text-sm md:text-base text-pakcat-text-secondary mt-4 font-body leading-relaxed">
            Production systems, cognitive runtimes, and field-tested research experiments, 
            cataloged with empirical failure modes and lessons learned.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8 reveal reveal-up visible" role="list">
          {filterButtons.map((btn) => {
            const isActive = activeFilter === btn.key;
            return (
              <button
                key={btn.key}
                onClick={() => setActiveFilter(btn.key)}
                className={`px-4 py-2 text-xs md:text-sm font-mono rounded-sm transition-colors ${
                  isActive
                    ? "bg-[#80142B] text-[#F7ECEF] border border-[#B02242] font-semibold shadow-md shadow-[#80142B]/35"
                    : "border border-[#3B121E] text-pakcat-text-secondary hover:border-[#80142B] hover:text-[#F7ECEF] hover:bg-[#280A15]"
                }`}
                aria-pressed={isActive}
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        {/* Counter */}
        <div className="mb-6 reveal reveal-up visible">
          <p className="font-mono text-xs text-pakcat-text-secondary">
            <span className="text-pakcat-accent-code">{filteredReports.length}</span>{" "}
            shipped reports shown
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReports.map((report, idx) => {
            const isExpanded = !!expandedReports[report.id];
            return (
              <div
                key={report.id}
                className={`stagger-${(idx % 4) + 1} brutal-card reveal reveal-left visible rounded-sm flex flex-col min-h-[320px] transition-all`}
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="font-mono text-xs px-2 py-1 border border-[#80142B] text-[#E27D95] bg-[#280A15]/60 rounded-sm">
                      {report.status}
                    </span>
                    <span className="font-mono text-xs px-2 py-1 border border-[#3B121E] text-pakcat-text-secondary bg-[#100306] rounded-sm">
                      {report.domain}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold text-pakcat-text-primary mb-3 font-sans">
                    {report.title}
                  </h3>
                  <p className="text-sm text-pakcat-text-secondary mb-5 font-body leading-relaxed">
                    {report.description}
                  </p>

                  {/* Expandable Report Drawer */}
                  {isExpanded && (
                    <div className="mb-5 space-y-4 border-t border-pakcat-border pt-4 animate-fade-in">
                      <div>
                        <h4 className="text-xs font-mono text-pakcat-accent uppercase tracking-wider mb-1">
                          &gt; Problem
                        </h4>
                        <p className="text-sm text-pakcat-text-secondary font-body leading-relaxed">
                          {report.problem}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono text-pakcat-accent-code uppercase tracking-wider mb-1">
                          &gt; Solution & Architecture
                        </h4>
                        <p className="text-sm text-pakcat-text-secondary font-body leading-relaxed">
                          {report.solution}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono text-pakcat-accent uppercase tracking-wider mb-1">
                          &gt; Empirical Findings & Audits
                        </h4>
                        <p className="text-sm text-pakcat-text-secondary font-body leading-relaxed">
                          {report.empiricalFindings}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5 mt-auto pt-2">
                    {report.tags.map((tag) => (
                      <span key={tag} className="brutal-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Action Row */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-pakcat-border pt-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => toggleReport(report.id)}
                        className="text-sm font-mono text-pakcat-accent hover:text-pakcat-accent-code transition-colors"
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? "[CLOSE REPORT ✕]" : "[READ REPORT ->]"}
                      </button>

                      {report.labUrl && (
                        <Link
                          href={report.labUrl}
                          className="text-sm font-mono text-pakcat-accent-code hover:text-pakcat-accent transition-colors"
                        >
                          [LAB DOSSIER]
                        </Link>
                      )}

                      {report.githubUrl && (
                        <a
                          href={report.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-mono text-pakcat-text-secondary hover:text-pakcat-text-primary transition-colors"
                        >
                          [GITHUB]
                        </a>
                      )}
                    </div>

                    <span className="font-mono text-xs text-pakcat-text-secondary">
                      {report.number}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
