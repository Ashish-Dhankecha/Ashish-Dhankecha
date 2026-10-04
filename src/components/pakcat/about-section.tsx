"use client";

import React from "react";
import Link from "next/link";
import { ScrambleText } from "./scramble-text";

export function AboutSection() {
  const labPrinciples = [
    {
      code: "01 // REAL FAILURES AUDITED",
      title: "Empirical Truth Over Hype",
      desc: "Documenting real system audits (like Ashi's initial 3/10 score and the vacuous success bug) rather than cherry-picked demos.",
    },
    {
      code: "02 // ARCHITECTURE ENFORCEMENT",
      title: "Invariants Verified in Code",
      desc: "Using AST static analysis (VANI) and package cycle checks (Ashi) so architectural rules are mechanically enforced, not merely suggested.",
    },
    {
      code: "03 // LOCAL FIRST SOVEREIGNTY",
      title: "Independent Execution",
      desc: "Optimizing sub-2B SLMs via llama.cpp and local SQLite/PostgreSQL schemas to run sovereign runtimes with zero external vendor lock-in.",
    },
    {
      code: "04 // RAPID CONSTRAINT ADAPTATION",
      title: "Depth + Execution Speed",
      desc: "Capable of spending months on a deep system like Ashi, while also building a complete on-premise workbench in a 1-day hackathon sprint (SIH26117).",
    },
  ];

  return (
    <section id="about" aria-labelledby="about-heading" className="relative z-10">
      <div className="section-container section-padding">
        {/* Section Header */}
        <div className="mb-10 reveal reveal-up visible">
          <span className="section-number">
            <ScrambleText text="01 // about" />
          </span>
          <h2
            id="about-heading"
            className="text-3xl md:text-4xl font-bold text-[var(--ink)] mt-3 font-sans"
          >
            Not just a portfolio. A build lab.
          </h2>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-start">
          {/* Left Column: Human narrative */}
          <div className="lg:col-span-3 space-y-6 reveal reveal-up visible">
            <p className="text-base sm:text-lg text-[var(--ink)]/90 leading-relaxed font-body">
              <strong className="text-[var(--accent-brass)]">Ashish Labs</strong> is where I document
              what I build, what I learn, what breaks, and what I figure out.
            </p>

            <p className="text-[var(--muted)] leading-relaxed font-body text-sm sm:text-base">
              I work across AI, software, systems, automation, research, and product development.
              Rather than treating language models as black-box magic or building superficial wrappers,
              my interest is in the systems around the model: deterministic execution kernels, structured
              episodic memory, tool sandboxes, and behavioral invariant verifiers.
            </p>

            {/* Core Creed block */}
            <div className="p-5 rounded-sm border-l-2 border-[var(--accent-brass)] bg-[var(--panel)]/60 my-4 space-y-2 font-mono text-xs sm:text-sm text-[var(--ink)]">
              <p className="text-[var(--accent-gold)] font-bold">
                I don&apos;t restrict myself to one stack.
              </p>
              <p className="text-[var(--muted)]">
                When a project requires a technology I don&apos;t know, <span className="text-[var(--ink)] font-semibold">I learn it.</span>
              </p>
              <p className="text-[var(--muted)]">
                When an approach fails, <span className="text-[var(--ink)] font-semibold">I investigate why.</span>
              </p>
              <p className="text-[var(--muted)]">
                When the obvious solution isn&apos;t enough, <span className="text-[var(--ink)] font-semibold">I find another way.</span>
              </p>
            </div>

            <p className="text-[var(--muted)] leading-relaxed font-body text-sm sm:text-base">
              I am a Computer Engineering bachelor&apos;s student at Shantilal Shah Engineering College.
              I treat every project as an engineering inquiry: measuring turn latencies, finding failure modes,
              and building systems from first principles.
            </p>

            {/* Signature Conclusion */}
            <div className="pt-2">
              <p className="font-sans font-bold text-lg sm:text-xl text-[var(--accent-gold)]">
                I will make it happen. No matter what.
              </p>
            </div>
          </div>

          {/* Right Column: Lab Invariants Card */}
          <div className="lg:col-span-2 reveal reveal-up visible">
            <div className="brutal-card p-4 sm:p-6 space-y-5 rounded-sm shadow-xl">
              <div className="border-b border-[var(--line)] pb-3 flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-wider">
                  {"// lab_invariants.json"}
                </span>
                <span className="font-mono text-[10px] text-[var(--accent-brass)] bg-[var(--accent-enamel)]/30 border border-[var(--accent-brass)]/50 px-2 py-0.5 rounded-sm">
                  LIVE EVIDENCE
                </span>
              </div>

              <div className="space-y-4">
                {labPrinciples.map((item) => (
                  <div key={item.code} className="space-y-1">
                    <span className="font-mono text-[10px] text-[var(--accent-brass)]">
                      {item.code}
                    </span>
                    <h4 className="text-sm font-semibold text-[var(--ink)] font-sans">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[var(--muted)] font-body leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--line)] pt-3 text-[11px] font-mono text-[var(--muted)] flex flex-col min-[380px]:flex-row min-[380px]:items-center justify-between gap-1.5">
                <span>Substrate: Linux / Python / uv</span>
                <Link
                  href="/lab"
                  className="text-[var(--accent-brass)] hover:text-[var(--accent-gold)] transition-colors underline"
                >
                  [browse 62 lab notes →]
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
