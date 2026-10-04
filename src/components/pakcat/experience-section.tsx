"use client";

import React from "react";
import { ScrambleText } from "./scramble-text";

interface JourneyItem {
  id: string;
  period: string;
  type: "academic" | "experiment" | "flagship" | "hackathon";
  title: string;
  subtitle: string;
  summary: string;
  takeaway: string;
  tags: string[];
}

export function ExperienceSection() {
  const journey: JourneyItem[] = [
    {
      id: "academic",
      period: "JULY 2024 — PRESENT",
      type: "academic",
      title: "Bachelor of Engineering — Computer Engineering",
      subtitle: "SSASIT, Surat · Ongoing",
      summary:
        "Academic foundation covering computer architecture, operating systems, compiler theory, Linux kernels, algorithms, discrete mathematics, and systems-level programming. Studying the underlying machinery before trusting high-level abstractions.",
      takeaway: "Foundation: rigorous computer science fundamentals from first principles.",
      tags: ["Computer Engineering", "Operating Systems", "Algorithms", "Linux", "Data Structures"],
    },
    {
      id: "leo",
      period: "16 JUNE 2026 — 10 JULY 2026",
      type: "experiment",
      title: "LEO — AI Companion OS & Forensic Architecture Audit",
      subtitle: "Personal Technical Experiment",
      summary:
        "An ambitious research exploration into modeling an AI companion as an operating system kernel with 43 cognitive subsystems and multi-tier memory. An automated forensic audit revealed 281 direct-database violations bypassing the CMMU gateway and proved that 297 mock tests masked 11 broken live integrations.",
      takeaway: "Hard lesson learned: Architecture without automated compile-time enforcement rots into debt.",
      tags: ["Python", "FastAPI", "PostgreSQL", "Neo4j", "Redis", "CMMU", "Forensic Audit"],
    },
    {
      id: "vani",
      period: "10 JULY 2026 — 16 JULY 2026",
      type: "experiment",
      title: "VANI — 50-Year Sovereign AI Operating System",
      subtitle: "Personal Technical Experiment",
      summary:
        "Engineered a sovereign AI operating system with zero external cloud infrastructure. Formally rejected LangChain in favor of raw AIPort contracts, replaced complex graph databases with SQLite property schemas, and constructed an AST Static Analysis Guardian to mechanically enforce subsystem hierarchy.",
      takeaway: "Evolution: direct minimal protocols and AST invariants make code durable for decades.",
      tags: ["Python", "Strict Typing", "SQLite", "AST Analysis", "Zero Cloud", "Longevity"],
    },
    {
      id: "ashi",
      period: "16 JULY 2026 — PRESENT",
      type: "flagship",
      title: "Ashi — Personal Cognitive AI Operating System",
      subtitle: "Flagship Long-Term Project",
      summary:
        "Architecting an autonomous personal AI operating system across 28 decoupled packages in a Python uv monorepo. Subjected the live system to empirical audits (initial score 3/10), discovered and eliminated the Vacuous Success Bug, and optimized native llama.cpp sub-2B SLM runtimes to drop turn latency from 32.8s to 5.4s.",
      takeaway: "Flagship: persistent stateful memory, truth boundary verification, and acyclic systems.",
      tags: ["Python", "uv Monorepo", "PostgreSQL", "llama.cpp", "FastAPI", "Cognitive OS"],
    },
    {
      id: "sih",
      period: "30 AUGUST 2026",
      type: "hackathon",
      title: "SIH26117 — Sovereign On-Premise Agentic AI Workbench",
      subtitle: "Built During a Rapid Hackathon Sprint",
      summary:
        "Engineered a secure-by-default, air-gapped on-premise agentic workbench for confidential industrial environments under tight hackathon constraints. Integrated local Qwen SLMs, RAG pipeline, isolated process sandboxing, and interactive workspace UI in a single rapid sprint.",
      takeaway: "Execution contrast: I can spend months on deep systems, but also ship working software in 24 hours under constraints.",
      tags: ["FastAPI", "Qwen SLM", "RAG", "Docker Sandbox", "TypeScript", "Rapid Execution"],
    },
  ];

  return (
    <section id="journey" aria-labelledby="journey-heading" className="relative z-10">
      <div className="section-container section-padding">
        {/* Section Header */}
        <div className="mb-10 reveal reveal-up visible">
          <span className="section-number">
            <ScrambleText text="03 // build journey" />
          </span>
          <h2
            id="journey-heading"
            className="text-3xl md:text-4xl font-bold text-[var(--ink)] mt-3 font-sans"
          >
            Build Journey
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base mt-2 max-w-2xl font-body">
            Evolution from academic foundation to cognitive experiments, rapid sprints, and large-scale systems.
            Honest engineering milestones with real dates, failures, and lessons.
          </p>
        </div>

        {/* Conceptual Tree Visualizer */}
        <div className="mb-12 brutal-card p-4 sm:p-5 rounded-sm font-mono text-xs text-[var(--muted)] overflow-x-auto select-none">
          <div className="text-[10px] text-[var(--accent-brass)] uppercase tracking-wider mb-2 font-bold">
            {"// TRAJECTORY: FOUNDATION → EXPERIMENTATION → ITERATION → LARGER SYSTEM"}
          </div>
          <pre className="text-[11px] leading-relaxed text-[var(--ink)]/80">
{`JUL 2024  ─── Computer Engineering (SSASIT, Surat)
    │
JUN 2026  ─── LEO (43 Subsystems & Forensic Audit)
    │
JUL 2026  ─── VANI (50-Year Sovereign OS & AST Guardian)
    │
JUL 2026  ─── ASHI ─────────────────────────────────────── PRESENT (Flagship Cognitive OS)
    │
AUG 2026  └── SIH26117 (Rapid Hackathon Sprint)`}
          </pre>
        </div>

        {/* Timeline Sequence */}
        <div className="relative">
          {/* Vertical Track Line */}
          <div className="absolute left-3 sm:left-4 md:left-6 top-0 bottom-0 w-px bg-[var(--line)]" />

          <div className="space-y-6 sm:space-y-8">
            {journey.map((item, idx) => {
              const isFlagship = item.type === "flagship";
              const isHackathon = item.type === "hackathon";

              return (
                <div
                  key={item.id}
                  className={`stagger-${(idx % 5) + 1} relative pl-8 min-[380px]:pl-10 sm:pl-12 md:pl-16 reveal reveal-up visible`}
                >
                  {/* Glowing Track Node */}
                  <div
                    className={`absolute left-1.5 sm:left-2.5 md:left-[1.125rem] top-4 w-3.5 h-3.5 rounded-full border ${
                      isFlagship
                        ? "bg-[var(--accent-brass)] border-[var(--accent-gold)] shadow-[0_0_12px_var(--accent-glow-strong)]"
                        : isHackathon
                        ? "bg-[var(--accent-enamel-bright)] border-[var(--accent-brass)] shadow-[0_0_8px_var(--accent-glow)]"
                        : "bg-[var(--panel)] border-[var(--accent-brass)]"
                    }`}
                  />

                  {/* Card */}
                  <div
                    className={`brutal-card p-4 sm:p-6 rounded-sm ${
                      isFlagship
                        ? "border-[var(--accent-brass)]/60 bg-[var(--panel)]/90 shadow-xl"
                        : isHackathon
                        ? "border-[var(--accent-enamel-bright)]/40"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {isFlagship && (
                          <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-[var(--accent-brass)] text-[#101b17] font-bold">
                            FLAGSHIP
                          </span>
                        )}
                        {isHackathon && (
                          <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-[var(--accent-enamel)] text-[var(--ink)] font-bold">
                            HACKATHON SPRINT
                          </span>
                        )}
                        <h3 className="text-lg font-bold text-[var(--ink)] font-sans">
                          {item.title}
                        </h3>
                      </div>
                      <span className="font-mono text-xs text-[var(--accent-brass)] shrink-0 font-medium">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-xs font-mono text-[var(--accent-gold)] mb-3">
                      {item.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed mb-4">
                      {item.summary}
                    </p>

                    <div className="p-3 bg-[var(--bg)]/50 border border-[var(--line)] rounded-sm mb-4">
                      <span className="font-mono text-[10px] text-[var(--accent-brass)] uppercase block mb-0.5">
                        [ INSIGHT &amp; LESSON ]
                      </span>
                      <p className="font-body text-xs text-[var(--ink)]/90 italic">
                        {item.takeaway}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="brutal-tag text-[10px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
