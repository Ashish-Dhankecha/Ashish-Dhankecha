"use client";

import React from "react";
import Link from "next/link";
import { ScrambleText } from "./scramble-text";

export function ProjectsSection() {

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative z-10">
      <div className="section-container section-padding">
        {/* Section Header */}
        <div className="mb-12 reveal reveal-up visible">
          <span className="section-number">
            <ScrambleText text="02 // systems & experiments" />
          </span>
          <h2
            id="projects-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--ink)] mt-3 font-sans"
          >
            Things I&apos;ve Built
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base mt-2 max-w-2xl font-body">
            Flagship cognitive operating systems, empirical failure post-mortems, and rapid hackathon prototypes.
            Documented with real code, architecture decision records, and honest failure logs.
          </p>
        </div>

        {/* ============================================================== */}
        {/* 1. FLAGSHIP SYSTEM: ASHI                                       */}
        {/* ============================================================== */}
        <div className="mb-14 reveal reveal-up visible">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-brass)] shadow-[0_0_10px_var(--accent-glow-strong)]" />
            <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
              FLAGSHIP SYSTEM // ACTIVE LONG-TERM BUILD
            </span>
            <span className="font-mono text-xs text-[var(--muted)] ml-auto">
              16 July 2026 — Present
            </span>
          </div>

          <div className="brutal-card p-6 sm:p-8 lg:p-10 rounded-sm border-[var(--border-strong)] shadow-2xl relative overflow-hidden">
            {/* Ambient subtle glow */}
            <div
              className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 bg-[radial-gradient(circle,var(--accent-glow)_0%,transparent_70%)] blur-2xl"
              aria-hidden="true"
            />

            <div className="relative z-10 space-y-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--ink)] font-sans tracking-tight">
                    Ashi — Personal Cognitive Operating System
                  </h3>
                  <p className="text-sm sm:text-base font-mono text-[var(--accent-brass)] mt-1.5">
                    A 28-package personal AI operating system built from first principles
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-xs text-[var(--accent-gold)] bg-[var(--accent-enamel)]/40 border border-[var(--accent-brass)]/60 px-3 py-1 rounded-sm">
                    ● CORE RUNTIME ACTIVE
                  </span>
                </div>
              </div>

              {/* Problem & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[var(--line)]">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-wider">
                    [ PROBLEM SOLVED ]
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed">
                    Building an autonomous personal AI that operates persistently across days without suffering
                    from context drift, silent tool errors, hallucinated task completion, or turn latency cascades.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-wider">
                    [ WHAT MAKES IT INTERESTING ]
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed">
                    Acyclic 28-package Python uv monorepo. Subjected to live audits: scored 3/10 initially,
                    discovered the <strong className="text-[var(--ink)] font-medium">Vacuous Success Bug</strong> (empty plans marked 100% achieved),
                    instituted strict truth boundary assertions, and eliminated Ollama to drop turn latency from 32.8s to 5.4s.
                  </p>
                </div>
              </div>

              {/* Technical Breakdown Pillars */}
              <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-3 border-t border-[var(--line)] text-xs font-mono">
                <div className="p-3 bg-[var(--bg)]/50 border border-[var(--line)] rounded-sm">
                  <span className="text-[var(--accent-brass)] block text-[10px]">ARCHITECTURE</span>
                  <span className="text-[var(--ink)] font-semibold">28 uv Packages</span>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">Strict acyclic graph</p>
                </div>
                <div className="p-3 bg-[var(--bg)]/50 border border-[var(--line)] rounded-sm">
                  <span className="text-[var(--accent-brass)] block text-[10px]">INFERENCE</span>
                  <span className="text-[var(--ink)] font-semibold">llama.cpp SLM</span>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">5.4s latency (down from 32.8s)</p>
                </div>
                <div className="p-3 bg-[var(--bg)]/50 border border-[var(--line)] rounded-sm">
                  <span className="text-[var(--accent-brass)] block text-[10px]">INTEGRITY GATE</span>
                  <span className="text-[var(--ink)] font-semibold">Truth Boundaries</span>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">Vacuous success eliminated</p>
                </div>
                <div className="p-3 bg-[var(--bg)]/50 border border-[var(--line)] rounded-sm">
                  <span className="text-[var(--accent-brass)] block text-[10px]">STORAGE</span>
                  <span className="text-[var(--ink)] font-semibold">Postgres + SQLite</span>
                  <p className="text-[11px] text-[var(--muted)] mt-0.5">Acyclic relational store</p>
                </div>
              </div>

              {/* Tech Tags & CTAs */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-[var(--line)]">
                <div className="flex flex-wrap gap-1.5">
                  {["Python", "uv Monorepo", "PostgreSQL", "llama.cpp", "FastAPI", "AsyncIO", "Cognitive OS"].map((tech) => (
                    <span key={tech} className="brutal-tag text-[11px]">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Link
                    href="/projects/ashi"
                    className="inline-flex items-center gap-1.5 font-mono text-xs px-4 py-2 bg-[var(--accent-enamel)] text-[var(--ink)] border border-[var(--accent-brass)] hover:bg-[var(--accent-enamel-bright)] hover:border-[var(--accent-gold)] transition-colors rounded-sm font-semibold shadow-md shadow-[var(--accent-glow)]"
                  >
                    [ EXPLORE ASHI CASE STUDY → ]
                  </Link>
                  <Link
                    href="/lab/ashi"
                    className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent-brass)] transition-colors"
                  >
                    [Raw Lab ADRs]
                  </Link>
                  <a
                    href="https://github.com/Ashish-Dhankecha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent-brass)] transition-colors"
                  >
                    [GitHub]
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. OTHER SYSTEMS & EXPERIMENTS                                 */}
        {/* ============================================================== */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-[var(--line)]">
            <h3 className="font-mono text-xs sm:text-sm text-[var(--accent-brass)] tracking-widest uppercase font-semibold">
              OTHER SYSTEMS &amp; EXPERIMENTS
            </h3>
            <span className="text-xs font-mono text-[var(--muted)]">
              Real codebases · Empirical audits · Hackathon speed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card: SIH26117 Hackathon Sprint */}
            <div className="brutal-card p-6 rounded-sm flex flex-col justify-between border-[var(--accent-brass)]/40 hover:border-[var(--accent-brass)] transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] text-[var(--accent-gold)] bg-[var(--accent-enamel)]/40 border border-[var(--accent-brass)]/50 px-2 py-0.5 rounded-sm">
                    ★ BUILT DURING A HACKATHON
                  </span>
                  <span className="font-mono text-xs text-[var(--muted)]">
                    30 August 2026
                  </span>
                </div>

                <h4 className="text-xl font-bold text-[var(--ink)] font-sans mb-1">
                  SIH26117 — Sovereign Agentic AI Workbench
                </h4>
                <p className="text-xs font-mono text-[var(--accent-brass)] mb-3">
                  Air-gapped on-premise workbench for confidential environments
                </p>

                <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed mb-4">
                  <strong className="text-[var(--ink)] font-medium">Built in a rapid 1-day hackathon sprint:</strong> A complete sovereign
                  workbench enforcing a strict local-only policy (zero external network requests) with Qwen SLM inference,
                  isolated sandbox tool execution, RAG pipeline, and workspace management.
                </p>

                <div className="p-3 bg-[var(--bg)]/60 border border-[var(--line)] rounded-sm mb-4 text-xs font-mono text-[var(--muted)] space-y-1">
                  <p className="text-[var(--accent-gold)] font-medium">Core takeaway:</p>
                  <p>&ldquo;I can spend months on a deep system like Ashi, but I can also build a working solution rapidly when constraints demand it.&rdquo;</p>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["FastAPI", "Qwen SLM", "RAG", "Docker Sandbox", "Python", "TypeScript"].map((t) => (
                    <span key={t} className="brutal-tag text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--line)] text-xs font-mono">
                  <Link href="/projects/sih" className="text-[var(--accent-brass)] font-semibold hover:underline">
                    [Read SIH Case Study →]
                  </Link>
                  <a
                    href="https://github.com/Ashish-Dhankecha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--muted)] hover:text-[var(--accent-brass)]"
                  >
                    [GitHub]
                  </a>
                </div>
              </div>
            </div>

            {/* Card: LEO */}
            <div className="brutal-card p-6 rounded-sm flex flex-col justify-between hover:border-[var(--accent-brass)] transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] text-[var(--muted)] border border-[var(--line)] px-2 py-0.5 rounded-sm">
                    ARCHIVED RESEARCH // FORENSIC AUDIT
                  </span>
                  <span className="font-mono text-xs text-[var(--muted)]">
                    16 June – 10 July 2026
                  </span>
                </div>

                <h4 className="text-xl font-bold text-[var(--ink)] font-sans mb-1">
                  LEO — AI Companion OS &amp; Forensic Audit
                </h4>
                <p className="text-xs font-mono text-[var(--accent-brass)] mb-3">
                  43 cognitive subsystems &amp; multi-tier memory architecture
                </p>

                <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed mb-4">
                  An ambitious exploration modeling an AI companion as an operating system kernel with a Cognitive Memory Management
                  Unit (CMMU) and Interconnect. An automated audit exposed 281 direct-database bypasses and revealed that 297 mock tests
                  masked 11 broken live integrations—establishing the rule: architecture without enforcement rots.
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["Python", "FastAPI", "PostgreSQL", "Neo4j", "Redis", "CMMU", "Forensic Audit"].map((t) => (
                    <span key={t} className="brutal-tag text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--line)] text-xs font-mono">
                  <Link href="/projects/leo" className="text-[var(--accent-brass)] font-semibold hover:underline">
                    [Read Leo Case Study →]
                  </Link>
                  <Link href="/lab/leo" className="text-[var(--muted)] hover:text-[var(--accent-brass)]">
                    [21 Notes]
                  </Link>
                </div>
              </div>
            </div>

            {/* Card: VANI */}
            <div className="brutal-card p-6 rounded-sm flex flex-col justify-between hover:border-[var(--accent-brass)] transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] text-[var(--accent-brass)] border border-[var(--accent-brass)]/50 px-2 py-0.5 rounded-sm">
                    PHASE 0 CERTIFIED // ZERO CLOUD
                  </span>
                  <span className="font-mono text-xs text-[var(--muted)]">
                    10 July – 16 July 2026
                  </span>
                </div>

                <h4 className="text-xl font-bold text-[var(--ink)] font-sans mb-1">
                  VANI — 50-Year Sovereign AI Operating System
                </h4>
                <p className="text-xs font-mono text-[var(--accent-brass)] mb-3">
                  AST architecture guardian &amp; zero-infrastructure strategy
                </p>

                <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed mb-4">
                  Built as a direct counter-reaction to fragile AI abstraction churn. Formally rejected LangChain in favor of raw AIPort contracts,
                  rejected graph databases in favor of SQLite, and constructed an AST Static Analysis Guardian that mechanically blocks imports
                  violating subsystem layer hierarchies.
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["Python", "Strict Typing", "SQLite", "AST Static Analysis", "Custom Event Bus", "Longevity"].map((t) => (
                    <span key={t} className="brutal-tag text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--line)] text-xs font-mono">
                  <Link href="/projects/vani" className="text-[var(--accent-brass)] font-semibold hover:underline">
                    [Read Vani Case Study →]
                  </Link>
                  <Link href="/lab/vani" className="text-[var(--muted)] hover:text-[var(--accent-brass)]">
                    [21 ADRs]
                  </Link>
                </div>
              </div>
            </div>

            {/* Card: Sub-2B Local SLM Benchmark */}
            <div className="brutal-card p-6 rounded-sm flex flex-col justify-between hover:border-[var(--accent-brass)] transition-all">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] text-[var(--accent-brass)] border border-[var(--line)] px-2 py-0.5 rounded-sm">
                    EMPIRICAL BENCHMARK // LATENCY AUDIT
                  </span>
                  <span className="font-mono text-xs text-[var(--muted)]">
                    2026 Research
                  </span>
                </div>

                <h4 className="text-xl font-bold text-[var(--ink)] font-sans mb-1">
                  Sub-2B Local SLM Engine &amp; Latency Benchmark
                </h4>
                <p className="text-xs font-mono text-[var(--accent-brass)] mb-3">
                  llama.cpp profiling, segfault mitigation &amp; Q4_K_M quantization
                </p>

                <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed mb-4">
                  Comprehensive benchmarking of 6 small language models on consumer hardware. Discovered llama.cpp cancellation segfaults during
                  interrupted prompts, patched signal handlers, and eliminated Ollama proxy overhead to reduce turn latency from 32.8s to 5.4s
                  under 2.4GB VRAM.
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["llama.cpp", "GGUF", "Sub-2B SLM", "Quantization", "C++", "Latency Profiling"].map((t) => (
                    <span key={t} className="brutal-tag text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--line)] text-xs font-mono">
                  <Link href="/projects/ashi#architecture" className="text-[var(--accent-brass)] font-semibold hover:underline">
                    [Ashi SLM Integration →]
                  </Link>
                  <Link href="/lab/ashi/sub-2b-model-benchmark-ashi" className="text-[var(--muted)] hover:text-[var(--accent-brass)]">
                    [Benchmark]
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Case Study System CTA Banner */}
        <div className="mt-12 text-center reveal reveal-up visible space-y-4">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center text-center gap-2 font-mono text-xs sm:text-sm px-4 py-3 sm:px-6 sm:py-3.5 bg-[var(--panel)] hover:bg-[var(--line)] border border-[var(--accent-brass)] text-[var(--ink)] transition-all rounded-sm font-semibold shadow-lg hover:shadow-[var(--accent-glow)] max-w-full flex-wrap leading-relaxed"
          >
            <span>[ EXPLORE THE FULL DEEP CASE STUDY SYSTEM &amp; SYSTEM LINEAGE (/projects) ]</span>
            <span className="text-[var(--accent-gold)]">→</span>
          </Link>
          <div>
            <span className="text-xs font-mono text-[var(--muted)] mr-2">
              Looking for raw post-mortems and architecture decision records?
            </span>
            <Link
              href="/lab"
              className="text-xs font-mono text-[var(--accent-brass)] hover:text-[var(--accent-gold)] underline font-medium"
            >
              [Explore the 62-piece Raw Lab Archive →]
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
