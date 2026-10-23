"use client";

import React from "react";

export function IdentityProofStrip() {
  const pillars = [
    {
      label: "AI",
      sub: "Agents · SLMs · Cognitive Loops",
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
      sub: "Benchmarking · Post-Mortems",
      detail: "Empirical failure audits over hype claims",
    },
    {
      label: "Products",
      sub: "Software · Workbenches · UIs",
      detail: "Turning ideas into usable, stable tools",
    },
  ];

  return (
    <div className="relative z-10 border-y border-white/[0.08] glass-card py-8 px-4 sm:px-6">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-white/70 tracking-widest uppercase">
              Technical Scope // All-Rounder Discipline
            </span>
          </div>
          <p className="font-mono text-xs text-white/40 italic">
            &ldquo;An all-rounder builder who learns whatever is necessary to solve the problem.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.label}
              className="p-4 rounded-xl glass border border-white/5 hover:border-white/20 transition-all group"
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-sans font-bold text-base sm:text-lg text-white group-hover:text-emerald-400 transition-colors">
                  {pillar.label}
                </span>
                <span className="text-[10px] font-mono text-emerald-400">●</span>
              </div>
              <p className="font-mono text-[11px] text-white/70 mb-1">
                {pillar.sub}
              </p>
              <p className="font-body text-xs text-white/45 leading-tight">
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
