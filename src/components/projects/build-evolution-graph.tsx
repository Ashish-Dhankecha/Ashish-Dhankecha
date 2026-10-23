import React from "react";
import Link from "next/link";

export function BuildEvolutionGraph() {
  return (
    <section className="py-16 md:py-24 border-y border-white/10 bg-black/40">
      <div className="section-container">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
            SYSTEM LINEAGE &amp; BUILD EVOLUTION
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans mb-3 tracking-tight">
          Architectural Lineage: How the Systems Evolved
        </h3>
        <p className="text-sm text-white/60 font-sans leading-relaxed max-w-3xl mb-10">
          ÆON did not emerge in a vacuum. It is the direct culmination of rigorous evolutionary milestones—where
          architectural failures in Leo informed the static AST verification of Vani, which crystallized into the
          monorepo discipline of ÆON.
        </p>

        {/* Desktop / Tablet Horizontal Lineage & Mobile Vertical Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Evolutionary Spine (8 Cols) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-6">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider block font-semibold">
              [ CORE COGNITIVE OS LINEAGE ]
            </span>

            <div className="space-y-4 relative before:absolute before:top-4 before:bottom-4 before:left-4 before:w-px before:bg-white/15">
              {/* Foundation: Computer Engineering */}
              <div className="flex items-start gap-3 pl-1">
                <div className="w-7 h-7 rounded-full bg-black border border-white/20 flex items-center justify-center shrink-0 z-10 text-[10px] font-mono text-white/50">
                  00
                </div>
                <div className="flex-1 p-4 bg-white/[0.02] border border-white/10 rounded-xl">
                  <span className="text-[10px] font-mono text-white/50 block">
                    FOUNDATION · JULY 2024 — PRESENT
                  </span>
                  <h4 className="text-sm font-bold text-white font-sans mt-0.5">
                    Computer Engineering (B.E.) · SSASIT, Surat
                  </h4>
                  <p className="text-xs text-white/60 font-sans mt-1 leading-relaxed">
                    Operating systems, discrete mathematics, computer architecture, and distributed systems fundamentals.
                  </p>
                </div>
              </div>

              {/* Step 1: LEO */}
              <div className="flex items-start gap-3 pl-1">
                <div className="w-7 h-7 rounded-full bg-black border border-cyan-500/50 flex items-center justify-center shrink-0 z-10 text-[10px] font-mono text-cyan-400 font-bold">
                  01
                </div>
                <Link
                  href="/projects/leo"
                  className="flex-1 p-4 bg-white/[0.02] border border-white/10 hover:border-cyan-500/50 hover:bg-white/[0.04] rounded-xl group transition-all block"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-[10px] font-mono text-cyan-400">
                      LATE 2025 — MID 2026 · EXPLORATORY PROTOTYPE
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
                      READ CASE STUDY →
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-sans group-hover:text-cyan-300 transition-colors mt-0.5">
                    Leo — Open Cognitive Operating System
                  </h4>
                  <p className="text-xs text-white/60 font-sans mt-1 leading-relaxed">
                    Pioneered the Cognitive Kernel and CMMU. A Phase 28 audit exposed 281 direct database violations, proving that rules without mechanical enforcement will fail.
                  </p>
                </Link>
              </div>

              {/* Step 2: VANI */}
              <div className="flex items-start gap-3 pl-1">
                <div className="w-7 h-7 rounded-full bg-black border border-violet-500/50 flex items-center justify-center shrink-0 z-10 text-[10px] font-mono text-violet-400 font-bold">
                  02
                </div>
                <Link
                  href="/projects/vani"
                  className="flex-1 p-4 bg-white/[0.02] border border-white/10 hover:border-violet-500/50 hover:bg-white/[0.04] rounded-xl group transition-all block"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-[10px] font-mono text-violet-400">
                      MID 2026 — LATE 2026 · ARCHITECTURAL DISCIPLINE
                    </span>
                    <span className="text-[10px] font-mono text-violet-400 font-bold group-hover:translate-x-1 transition-transform">
                      READ CASE STUDY →
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-sans group-hover:text-violet-300 transition-colors mt-0.5">
                    Vani — Sovereign Local-First Cognitive OS
                  </h4>
                  <p className="text-xs text-white/60 font-sans mt-1 leading-relaxed">
                    Engineered for 50-year longevity with zero cloud dependencies. Replaced Neo4j with SQLite property tables and built an automated AST Guardian to eliminate architectural violations.
                  </p>
                </Link>
              </div>

              {/* Step 3: ÆON */}
              <div className="flex items-start gap-3 pl-1">
                <div className="w-7 h-7 rounded-full bg-emerald-950/80 border border-emerald-500 flex items-center justify-center shrink-0 z-10 text-[10px] font-mono text-emerald-400 font-bold shadow-lg shadow-emerald-500/20">
                  03
                </div>
                <Link
                  href="/projects/ashi"
                  className="flex-1 p-5 bg-emerald-950/20 border border-emerald-500/40 hover:border-emerald-500/70 hover:bg-emerald-950/30 rounded-xl group transition-all block shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      JULY 2026 — PRESENT · FLAGSHIP SYSTEM
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                      FLAGSHIP CASE STUDY →
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white font-sans group-hover:text-emerald-300 transition-colors mt-1.5">
                    ÆON — Personal Cognitive Operating System
                  </h4>
                  <p className="text-xs text-white/70 font-sans mt-1 leading-relaxed">
                    The active culmination: 28-package uv monorepo, local llama.cpp SLM inference (5.4s latency), append-only event ledger, empirical behavioral testing, and verified truth boundaries.
                  </p>
                </Link>
              </div>
            </div>
          </div>

          {/* Parallel Track: Hackathon Execution (4 Cols) */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-amber-400 uppercase tracking-wider block font-semibold">
                  [ RAPID HACKATHON TRACK ]
                </span>
                <span className="font-mono text-[10px] text-white/50">
                  30 AUG 2026
                </span>
              </div>

              <h4 className="text-lg font-bold text-white font-sans">
                SIH26117 — Sovereign AI Workbench
              </h4>

              <p className="text-xs text-white/60 font-sans leading-relaxed">
                Demonstrated high-velocity systems engineering under extreme constraints: built an air-gapped sovereign
                workbench for industrial facilities (MRPL) in a single-day sprint with local SLMs, EvidenceGate RAG, and OOXML validation.
              </p>

              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl text-xs font-mono text-white/70 space-y-1.5">
                <span className="text-amber-400 font-semibold block text-[10px]">
                  ENGINEERING CONTRAST:
                </span>
                <p className="text-[11px] font-sans italic text-white/80">
                  &ldquo;ÆON represents months of foundational rigor; SIH proves the ability to execute rapidly when constraints demand it.&rdquo;
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/projects/sih"
                className="w-full text-center block font-mono text-xs px-4 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-amber-400/50 text-white transition-all shadow-sm"
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
