"use client";

import React from "react";

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
        "Academic foundation covering computer architecture, operating systems, compiler theory, Linux kernels, algorithms, discrete mathematics, and systems programming. Studying the underlying machinery before trusting high-level abstractions.",
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
      tags: ["Python", "FastAPI", "PostgreSQL", "CMMU", "Forensic Audit"],
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
      title: "ÆON — Personal Cognitive AI Operating System",
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
    <section id="journey" aria-labelledby="journey-heading" className="relative z-10 py-20 px-4 sm:px-6">
      <div className="section-container">
        {/* Section Header with mal1k.xyz signature gradient line */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-sm text-emerald-400 font-semibold tracking-wider">
            04.
          </span>
          <h2
            id="journey-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans"
          >
            Build Journey &amp; Milestones
          </h2>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        <p className="text-white/50 text-sm sm:text-base mb-10 max-w-2xl font-body">
          Evolution from academic fundamentals to cognitive experiments, rapid sprints, and large-scale acyclic systems.
        </p>

        {/* Conceptual Trajectory Tree in Glass Terminal */}
        <div className="mb-12 glass-card p-5 rounded-2xl border border-white/10 font-mono text-xs text-white/70 overflow-x-auto select-none">
          <div className="text-[10px] text-emerald-400 uppercase tracking-wider mb-2 font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{"// TRAJECTORY: FOUNDATION → EXPERIMENTATION → ITERATION → MONOREPO OS"}</span>
          </div>
          <pre className="text-[11px] leading-relaxed text-white/80">
{`JUL 2024  ─── Computer Engineering (SSASIT, Surat)
    │
JUN 2026  ─── LEO (43 Subsystems & Forensic Audit)
    │
JUL 2026  ─── VANI (50-Year Sovereign OS & AST Guardian)
    │
JUL 2026  ─── ÆON ──────────────────────────────────────── PRESENT (Flagship Cognitive OS)
    │
AUG 2026  └── SIH26117 (Rapid Hackathon Sprint)`}
          </pre>
        </div>

        {/* Timeline Sequence */}
        <div className="relative">
          {/* Vertical Track Line */}
          <div className="absolute left-3 sm:left-4 md:left-6 top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-6 sm:space-y-8">
            {journey.map((item) => {
              const isFlagship = item.type === "flagship";
              const isHackathon = item.type === "hackathon";

              return (
                <div
                  key={item.id}
                  className="relative pl-8 min-[380px]:pl-10 sm:pl-12 md:pl-16"
                >
                  {/* Track Node Beacon */}
                  <div
                    className={`absolute left-1.5 sm:left-2.5 md:left-[1.125rem] top-5 w-3.5 h-3.5 rounded-full border ${
                      isFlagship
                        ? "bg-emerald-400 border-white shadow-[0_0_12px_rgba(16,185,129,0.8)]"
                        : isHackathon
                        ? "bg-cyan-400 border-white shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                        : "bg-black border-white/40"
                    }`}
                  />

                  {/* Card */}
                  <div
                    className={`glass-card p-5 sm:p-7 rounded-2xl border ${
                      isFlagship
                        ? "border-emerald-500/30 bg-black/50 shadow-2xl"
                        : "border-white/[0.08]"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {isFlagship && (
                          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 font-bold">
                            FLAGSHIP
                          </span>
                        )}
                        {isHackathon && (
                          <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 font-bold">
                            HACKATHON SPRINT
                          </span>
                        )}
                        <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                          {item.title}
                        </h3>
                      </div>
                      <span className="font-mono text-xs text-white/50 shrink-0 font-medium">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-xs font-mono text-emerald-400/80 mb-3">
                      {item.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-white/70 font-body leading-relaxed mb-4">
                      {item.summary}
                    </p>

                    <div className="p-3.5 rounded-xl glass border border-white/10 mb-4">
                      <span className="font-mono text-[10px] text-white/40 uppercase block mb-1">
                        [ Insight &amp; Lesson ]
                      </span>
                      <p className="font-body text-xs text-white/90 italic">
                        {item.takeaway}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono glass border border-white/5 text-white/60"
                        >
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
