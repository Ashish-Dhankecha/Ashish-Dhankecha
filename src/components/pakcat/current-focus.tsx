"use client";

import React from "react";
import Link from "next/link";
import { ScrambleText } from "./scramble-text";

export function CurrentFocusSection() {
  return (
    <section id="focus" aria-labelledby="focus-heading" className="relative z-10">
      <div className="section-container section-padding">
        {/* Section Header */}
        <div className="mb-10 reveal reveal-up visible">
          <span className="section-number">
            <ScrambleText text="07 // current focus" />
          </span>
          <h2
            id="focus-heading"
            className="text-3xl md:text-4xl font-bold text-[var(--ink)] mt-3 font-sans"
          >
            Current Focus
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base mt-2 max-w-2xl font-body">
            Active development and empirical inquiries currently underway in the lab.
          </p>
        </div>

        {/* 2-Column Living Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal reveal-scale visible">
          {/* Card 1: Currently Building */}
          <div className="brutal-card p-4 sm:p-8 rounded-sm border-[var(--accent-brass)]/40 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-brass)] shadow-[0_0_8px_var(--accent-glow)]" />
                  <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-wider font-semibold">
                    CURRENTLY BUILDING
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[var(--muted)]">
                  ACTIVE REPO
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] font-sans">
                  Ashi — Cognitive AI Operating System
                </h3>
                <p className="text-xs font-mono text-[var(--accent-brass)] mt-1">
                  Acyclic 28-package uv Monorepo
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed">
                Refining Ashi&apos;s autonomous loops, persistent episodic memory schemas, and deterministic truth
                boundary gates. Actively stress-testing multi-step tool execution so that empty completions are strictly
                rejected and only verifiable actions evaluate to success.
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono text-[var(--ink)]/90">
                <div className="flex items-start gap-2">
                  <span className="text-[var(--accent-brass)] shrink-0">→</span>
                  <span>Persistent episodic memory indexing in PostgreSQL / SQLite</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[var(--accent-brass)] shrink-0">→</span>
                  <span>Deterministic execution proof gates (vacuous success elimination)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[var(--accent-brass)] shrink-0">→</span>
                  <span>24µs ambient perception loop benchmarks</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--line)] mt-6 flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-1.5">
              <span className="text-[11px] font-mono text-[var(--muted)]">Substrate: Linux / uv</span>
              <Link
                href="/lab/ashi"
                className="text-xs font-mono text-[var(--accent-brass)] hover:text-[var(--accent-gold)] underline font-medium"
              >
                [Inspect Ashi Lab Notes →]
              </Link>
            </div>
          </div>

          {/* Card 2: Currently Exploring */}
          <div className="brutal-card p-4 sm:p-8 rounded-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-enamel-bright)] shadow-[0_0_8px_var(--accent-glow)]" />
                  <span className="font-mono text-xs text-[var(--accent-gold)] uppercase tracking-wider font-semibold">
                    CURRENTLY EXPLORING
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[var(--muted)]">
                  RESEARCH &amp; AUDITS
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] font-sans">
                  Local SLM Quantization &amp; Latency Optimization
                </h3>
                <p className="text-xs font-mono text-[var(--accent-gold)] mt-1">
                  llama.cpp / Sub-2B Model Benchmarks
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed">
                Investigating the capability ceiling of sub-2B language models on consumer hardware.
                Eliminating turn latency cascades (dropped from 32.8s to 5.4s), fixing native cancellation segfaults,
                and testing strict AST static analysis invariants for zero-drift architecture.
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono text-[var(--ink)]/90">
                <div className="flex items-start gap-2">
                  <span className="text-[var(--accent-gold)] shrink-0">→</span>
                  <span>Q4_K_M GGUF quantization under 2.4GB VRAM constraints</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[var(--accent-gold)] shrink-0">→</span>
                  <span>AST Architecture Guardian automated CI import validation</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[var(--accent-gold)] shrink-0">→</span>
                  <span>Academic study: Computer Engineering at Shantilal Shah Engineering College</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--line)] mt-6 flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-1.5">
              <span className="text-[11px] font-mono text-[var(--muted)]">Focus: Empirical Invariants</span>
              <Link
                href="/lab"
                className="text-xs font-mono text-[var(--accent-brass)] hover:text-[var(--accent-gold)] underline font-medium"
              >
                [Browse All 62 Research Notes →]
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
