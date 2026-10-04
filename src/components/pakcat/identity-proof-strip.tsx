"use client";

import React from "react";

export function IdentityProofStrip() {
  const pillars = [
    {
      label: "AI",
      sub: "Agents · LLMs · Cognitive Loops",
      detail: "Autonomous execution & prompt independence",
    },
    {
      label: "Systems",
      sub: "Runtimes · Kernels · Memory",
      detail: "Stateful persistence & acyclic architectures",
    },
    {
      label: "Automation",
      sub: "Pipelines · Sandboxes · Invariants",
      detail: "Truth boundary enforcement & zero empty success",
    },
    {
      label: "Research",
      sub: "Benchmarking · Post-Mortems · First Principles",
      detail: "Empirical failure audits over hype claims",
    },
    {
      label: "Products",
      sub: "Software · Workbenches · Interfaces",
      detail: "Turning ideas into usable, stable tools",
    },
  ];

  return (
    <div className="relative z-10 border-y border-[var(--line)] bg-[var(--panel)]/50 backdrop-blur-md py-6 sm:py-8">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-brass)] shadow-[0_0_8px_var(--accent-glow)]" />
            <span className="font-mono text-xs text-[var(--accent-brass)] tracking-widest uppercase">
              TECHNICAL SCOPE // ALL-ROUNDER DISCIPLINE
            </span>
          </div>
          <p className="font-mono text-xs text-[var(--muted)]">
            &ldquo;An all-rounder builder who learns whatever is necessary to solve the problem.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.label}
              className="p-3 sm:p-3.5 rounded-sm border border-[var(--line)] bg-[var(--bg)]/60 hover:border-[var(--accent-brass)]/50 transition-colors"
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-sans font-bold text-base sm:text-lg text-[var(--ink)]">
                  {pillar.label}
                </span>
                <span className="text-[10px] font-mono text-[var(--accent-brass)]">●</span>
              </div>
              <p className="font-mono text-[11px] text-[var(--accent-gold)] mb-1">
                {pillar.sub}
              </p>
              <p className="font-body text-xs text-[var(--muted)] leading-tight">
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
