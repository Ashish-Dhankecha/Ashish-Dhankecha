"use client";

import React from "react";
import Link from "next/link";

export function CurrentFocusSection() {
  return (
    <section id="focus" aria-labelledby="focus-heading" className="relative z-10 py-20 px-4 sm:px-6">
      <div className="section-container">
        {/* Section Header with mal1k.xyz signature gradient line */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-sm text-emerald-400 font-semibold tracking-wider">
            06.
          </span>
          <h2
            id="focus-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans"
          >
            Current Focus
          </h2>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        <p className="text-white/50 text-sm sm:text-base mb-12 max-w-2xl font-body">
          Active developments and empirical inquiries currently underway in the lab.
        </p>

        {/* 2-Column Living Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Currently Building */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-emerald-500/20 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider font-semibold">
                    Currently Building
                  </span>
                </div>
                <span className="font-mono text-[10px] text-white/40">
                  Active Monorepo
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                  ÆON — Cognitive AI Operating System
                </h3>
                <p className="text-xs font-mono text-emerald-400/80 mt-1">
                  Acyclic 28-package uv Monorepo
                </p>
              </div>

              <p className="text-xs sm:text-sm text-white/70 font-body leading-relaxed">
                Refining ÆON&apos;s autonomous loops, persistent episodic memory schemas, and deterministic truth
                boundary gates. Actively stress-testing multi-step tool execution so that empty completions are strictly
                rejected and only verifiable actions evaluate to success.
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono text-white/80">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 shrink-0">→</span>
                  <span>Persistent episodic memory indexing in PostgreSQL / SQLite</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 shrink-0">→</span>
                  <span>Deterministic execution proof gates (vacuous success elimination)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 shrink-0">→</span>
                  <span>Sub-6s local SLM inference optimization via llama.cpp</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-2">
              <span className="text-[11px] font-mono text-white/40">Substrate: Linux / uv</span>
              <Link
                href="/lab"
                className="text-xs font-mono text-emerald-400 hover:underline font-medium"
              >
                Inspect ÆON Lab Notes →
              </Link>
            </div>
          </div>

          {/* Card 2: Currently Exploring */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                    Currently Exploring
                  </span>
                </div>
                <span className="font-mono text-[10px] text-white/40">
                  Research &amp; Audits
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                  Quantized SLM Benchmarking &amp; Tool Runtimes
                </h3>
                <p className="text-xs font-mono text-cyan-400/80 mt-1">
                  Empirical Latency vs Reasoning Depth
                </p>
              </div>

              <p className="text-xs sm:text-sm text-white/70 font-body leading-relaxed">
                Empirically measuring sub-2B parameter models (Qwen 2.5 1.5B, Llama 3.2 1B) under varying quantization
                levels (Q4_K_M vs Q8_0) across consumer hardware. Auditing structured JSON generation reliability and zero-shot tool invocation.
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono text-white/80">
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 shrink-0">→</span>
                  <span>Benchmarking llama.cpp metal / CPU backend quantization</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 shrink-0">→</span>
                  <span>Testing AST invariant guardians against architectural decay</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 shrink-0">→</span>
                  <span>Building autonomous software synthesis sandboxes</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6 flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-2">
              <span className="text-[11px] font-mono text-white/40">Hardware: Linux / CUDA / CPU</span>
              <Link
                href="/projects"
                className="text-xs font-mono text-cyan-400 hover:underline font-medium"
              >
                View Benchmark Analysis →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
