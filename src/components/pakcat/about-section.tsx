"use client";

import React from "react";
import { TerminalCard } from "./terminal-card";

export function AboutSection() {
  const labPrinciples = [
    {
      code: "01 // EMPIRICAL TRUTH OVER HYPE",
      title: "Audited Failure Modes",
      desc: "Documenting real system audits (like ÆON's initial 3/10 score and vacuous success bugs) rather than superficial wrapper demos.",
    },
    {
      code: "02 // ARCHITECTURE ENFORCEMENT",
      title: "Invariants in Code",
      desc: "Using AST static analysis (VANI) and package cycle checks (ÆON) so architectural boundaries are mechanically verified.",
    },
    {
      code: "03 // LOCAL FIRST SOVEREIGNTY",
      title: "Independent Execution",
      desc: "Optimizing sub-2B SLMs via llama.cpp and local SQLite/PostgreSQL schemas to run sovereign runtimes with zero vendor lock-in.",
    },
    {
      code: "04 // RAPID ADAPTATION",
      title: "Depth + Velocity",
      desc: "Spending months engineering deep multi-agent kernels, while equally capable of shipping a complete on-premise workbench in a 1-day sprint.",
    },
  ];

  return (
    <section id="about" aria-labelledby="about-heading" className="relative z-10 py-20 px-4 sm:px-6">
      <div className="section-container">
        {/* Section Header with mal1k.xyz signature gradient line */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-sm text-emerald-400 font-semibold tracking-wider">
            01.
          </span>
          <h2
            id="about-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans"
          >
            About Me
          </h2>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        {/* 2-Column Split: Narrative on Left, Terminal Simulator on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-14">
          {/* Left Column: Human narrative & creed */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-lg sm:text-xl text-white/90 font-medium leading-relaxed">
              I am an AI Developer &amp; Systems Builder based in Gujarat, India.
              I build cognitive runtimes, autonomous agent swarms, and software from first principles.
            </p>

            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              Rather than treating large language models as black-box magic or building superficial wrappers,
              my interest is in the systems around the intelligence: deterministic execution kernels, structured
              episodic memory, tool sandboxes, and behavioral invariant verifiers.
            </p>

            {/* Core Creed Glass Box */}
            <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2.5 font-mono text-xs sm:text-sm text-white/90 shadow-xl">
              <p className="text-white font-bold flex items-center gap-2">
                <span className="text-emerald-400">✦</span>
                <span>The Core Creed</span>
              </p>
              <p className="text-white/60">
                I don&apos;t restrict myself to one stack. When a project requires a technology I don&apos;t know,{" "}
                <span className="text-white font-semibold">I learn it.</span>
              </p>
              <p className="text-white/60">
                When an approach fails,{" "}
                <span className="text-white font-semibold">I investigate why.</span>
              </p>
              <p className="text-white/60">
                When the obvious solution isn&apos;t enough,{" "}
                <span className="text-white font-semibold">I find another way.</span>
              </p>
            </div>

            <p className="text-sm sm:text-base text-white/60 leading-relaxed">
              Currently pursuing Computer Engineering at SSASIT, Surat.
              I treat every project as an empirical engineering inquiry: measuring turn latencies, finding failure modes,
              and eliminating vacuous successes.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-emerald-400 font-mono text-xs">●</span>
              <p className="font-sans font-bold text-base sm:text-lg text-white">
                I WILL MAKE IT HAPPEN. No matter what.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive macOS Terminal Simulator */}
          <div className="lg:col-span-6">
            <TerminalCard />
          </div>
        </div>

        {/* 4 Core Invariants Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {labPrinciples.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-5 rounded-2xl border border-white/[0.08] flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] text-white/40 block mb-2 tracking-wider">
                  {item.code}
                </span>
                <h3 className="text-sm font-bold text-white font-sans mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-body">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
