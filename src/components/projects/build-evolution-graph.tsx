import React from "react";
import Link from "next/link";

export function BuildEvolutionGraph() {
  return (
    <section className="py-12 bg-[var(--panel)]/30 border-y border-[var(--line)]">
      <div className="section-container">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
            SYSTEM LINEAGE &amp; BUILD EVOLUTION
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] font-sans mb-3">
          Architectural Lineage: How the Systems Evolved
        </h3>
        <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed max-w-3xl mb-8">
          Ashi did not emerge in a vacuum. It is the direct culmination of rigorous evolutionary milestones—where
          architectural failures in Leo informed the static AST verification of Vani, which crystallized into the
          monorepo discipline of Ashi.
        </p>

        {/* Desktop / Tablet Horizontal Lineage & Mobile Vertical Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Evolutionary Spine (9 Cols) */}
          <div className="lg:col-span-8 p-5 sm:p-6 bg-[var(--panel)] border border-[var(--line)] rounded-sm space-y-4">
            <span className="font-mono text-[10px] text-[var(--accent-brass)] uppercase tracking-wider block">
              [ CORE COGNITIVE OS LINEAGE ]
            </span>

            <div className="space-y-4 relative before:absolute before:top-4 before:bottom-4 before:left-4 before:w-px before:bg-[var(--accent-brass)]/40">
              {/* Foundation: Computer Engineering */}
              <div className="flex items-start gap-3 pl-1">
                <div className="w-7 h-7 rounded-full bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center shrink-0 z-10 text-[10px] font-mono text-[var(--muted)]">
                  00
                </div>
                <div className="flex-1 p-3 bg-[var(--bg)]/70 border border-[var(--line)] rounded-sm">
                  <span className="text-[10px] font-mono text-[var(--muted)] block">
                    FOUNDATION · JULY 2024 — PRESENT
                  </span>
                  <h4 className="text-sm font-bold text-[var(--ink)] font-sans">
                    Computer Engineering (B.E.) · Shantilal Shah Engineering College
                  </h4>
                  <p className="text-xs text-[var(--muted)] font-body mt-0.5">
                    Operating systems, discrete mathematics, computer architecture, and distributed systems fundamentals.
                  </p>
                </div>
              </div>

              {/* Step 1: LEO */}
              <div className="flex items-start gap-3 pl-1">
                <div className="w-7 h-7 rounded-full bg-[var(--bg)] border border-[var(--accent-brass)] flex items-center justify-center shrink-0 z-10 text-[10px] font-mono text-[var(--accent-brass)] font-bold">
                  01
                </div>
                <Link
                  href="/projects/leo"
                  className="flex-1 p-3 bg-[var(--bg)]/90 border border-[var(--line)] hover:border-[var(--accent-brass)] rounded-sm group transition-colors block"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-[10px] font-mono text-[var(--accent-brass)]">
                      LATE 2025 — MID 2026 · EXPLORATORY PROTOTYPE
                    </span>
                    <span className="text-[10px] font-mono text-[var(--accent-gold)]">
                      READ CASE STUDY →
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[var(--ink)] font-sans group-hover:text-[var(--accent-gold)] transition-colors">
                    Leo — Open Cognitive Operating System
                  </h4>
                  <p className="text-xs text-[var(--muted)] font-body mt-0.5">
                    Pioneered the Cognitive Kernel and CMMU. A Phase 28 audit exposed 281 direct database violations, proving that rules without mechanical enforcement will fail.
                  </p>
                </Link>
              </div>

              {/* Step 2: VANI */}
              <div className="flex items-start gap-3 pl-1">
                <div className="w-7 h-7 rounded-full bg-[var(--bg)] border border-emerald-500 flex items-center justify-center shrink-0 z-10 text-[10px] font-mono text-emerald-400 font-bold">
                  02
                </div>
                <Link
                  href="/projects/vani"
                  className="flex-1 p-3 bg-[var(--bg)]/90 border border-[var(--line)] hover:border-emerald-500/70 rounded-sm group transition-colors block"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-[10px] font-mono text-emerald-400">
                      MID 2026 — LATE 2026 · ARCHITECTURAL DISCIPLINE
                    </span>
                    <span className="text-[10px] font-mono text-[var(--accent-gold)]">
                      READ CASE STUDY →
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[var(--ink)] font-sans group-hover:text-[var(--accent-gold)] transition-colors">
                    Vani — Sovereign Local-First Cognitive OS
                  </h4>
                  <p className="text-xs text-[var(--muted)] font-body mt-0.5">
                    Engineered for 50-year longevity with zero cloud dependencies. Replaced Neo4j with SQLite property tables and built an automated AST Guardian to eliminate architectural violations.
                  </p>
                </Link>
              </div>

              {/* Step 3: ASHI */}
              <div className="flex items-start gap-3 pl-1">
                <div className="w-7 h-7 rounded-full bg-[var(--accent-enamel)] border border-[var(--accent-brass)] flex items-center justify-center shrink-0 z-10 text-[10px] font-mono text-[var(--accent-gold)] font-bold shadow-md shadow-[var(--accent-glow)]">
                  03
                </div>
                <Link
                  href="/projects/ashi"
                  className="flex-1 p-4 bg-[var(--accent-enamel)]/30 border border-[var(--accent-brass)] rounded-sm group transition-colors block shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-[10px] font-mono text-[var(--accent-gold)] font-semibold">
                      JULY 2026 — PRESENT · FLAGSHIP SYSTEM
                    </span>
                    <span className="text-[10px] font-mono text-[var(--accent-gold)] font-bold">
                      FLAGSHIP CASE STUDY →
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[var(--ink)] font-sans group-hover:text-[var(--accent-gold)] transition-colors mt-1">
                    Ashi — Personal Cognitive Operating System
                  </h4>
                  <p className="text-xs text-[var(--muted)] font-body mt-1">
                    The active culmination: 28-package uv monorepo, local llama.cpp SLM inference (5.4s latency), append-only event ledger, empirical behavioral testing, and verified truth boundaries.
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* Parallel Track: Hackathon Execution (4 Cols) */}
          <div className="lg:col-span-4 p-5 sm:p-6 bg-[var(--panel)] border border-[var(--line)] rounded-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[var(--accent-gold)] uppercase tracking-wider block">
                  [ RAPID HACKATHON TRACK ]
                </span>
                <span className="font-mono text-[10px] text-[var(--muted)]">
                  30 AUG 2026
                </span>
              </div>

              <h4 className="text-base font-bold text-[var(--ink)] font-sans">
                SIH26117 — Sovereign AI Workbench
              </h4>

              <p className="text-xs text-[var(--muted)] font-body leading-relaxed">
                Demonstrated high-velocity systems engineering under extreme constraints: built an air-gapped sovereign
                workbench for industrial facilities (MRPL) in a single-day sprint with local SLMs, EvidenceGate RAG, and OOXML validation.
              </p>

              <div className="p-3 bg-[var(--bg)]/90 border border-[var(--line)] rounded-sm text-xs font-mono text-[var(--muted)] space-y-1">
                <span className="text-[var(--accent-brass)] font-semibold block text-[10px]">
                  ENGINEERING CONTRAST:
                </span>
                <p className="text-[11px] font-sans italic">
                  &ldquo;Ashi represents months of foundational rigor; SIH proves the ability to execute rapidly when constraints demand it.&rdquo;
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--line)]">
              <Link
                href="/projects/sih"
                className="w-full text-center block font-mono text-xs px-3 py-2 bg-[var(--panel)] hover:bg-[var(--line)] border border-[var(--accent-brass)] text-[var(--ink)] transition-colors rounded-sm"
              >
                [READ SIH HACKATHON CASE STUDY →]
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
