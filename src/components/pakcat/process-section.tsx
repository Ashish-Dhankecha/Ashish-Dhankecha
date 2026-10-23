"use client";

import React from "react";

interface ProcessStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
}

export function ProcessSection() {
  const steps: ProcessStep[] = [
    {
      step: "01",
      title: "Understand",
      tagline: "Break the problem down.",
      description:
        "Analyze the objective from first principles. Understand the mathematical bounds, requirements, and constraints before writing a single line of code.",
    },
    {
      step: "02",
      title: "Learn",
      tagline: "Identify what I don't know.",
      description:
        "Never fear unfamiliar tools. Investigate missing knowledge, study source code, read papers, and quickly master whatever technology the problem demands.",
    },
    {
      step: "03",
      title: "Architect",
      tagline: "Design the simplest system that can work.",
      description:
        "Define explicit subsystem boundaries, write architectural decision records (ADRs), avoid dependency bloat, and establish mechanical invariant gates.",
    },
    {
      step: "04",
      title: "Build",
      tagline: "Turn the design into reality.",
      description:
        "Write clean, strictly typed, modular code. Implement execution kernels, event buses, data schemas, and interfaces with mechanical empathy.",
    },
    {
      step: "05",
      title: "Test",
      tagline: "Try to break it.",
      description:
        "Subject the live implementation to empirical stress tests: benchmark latencies, evaluate failure modes, and detect mock-testing illusions.",
    },
    {
      step: "06",
      title: "Improve",
      tagline: "Fix what fails.",
      description:
        "Eliminate vacuous successes, patch root causes rather than symptoms, harden truth boundaries, and iterate until the system is rock solid.",
    },
  ];

  return (
    <section id="process" aria-labelledby="process-heading" className="relative z-10 py-20 px-4 sm:px-6">
      <div className="section-container">
        {/* Section Header with mal1k.xyz signature gradient line */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-sm text-emerald-400 font-semibold tracking-wider">
            05.
          </span>
          <h2
            id="process-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans"
          >
            How I Work
          </h2>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        <p className="text-white/50 text-sm sm:text-base mb-12 max-w-2xl font-body">
          A disciplined 6-step loop from first principles to reliable, verifiable software.
        </p>

        {/* 6-Step Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((item) => (
            <div
              key={item.step}
              className="glass-card p-6 sm:p-7 rounded-2xl border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
                  <span className="font-mono text-3xl font-extrabold text-white">
                    {item.step}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest px-2 py-0.5 rounded-full glass border border-emerald-500/20">
                    Phase {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-sans mb-1">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-white/50 mb-3">
                  {item.tagline}
                </p>

                <p className="text-xs sm:text-sm text-white/70 font-body leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Execution Principle Callout */}
        <div className="glass-card p-8 rounded-2xl border border-white/15 text-center relative overflow-hidden">
          <p className="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-2">
            Core Execution Principle
          </p>
          <p className="font-sans font-bold text-lg sm:text-2xl text-white max-w-2xl mx-auto mb-2">
            &ldquo;I don&apos;t need to know everything before I start. I need to know how to figure it out.&rdquo;
          </p>
          <p className="font-mono text-xs text-white/60 font-semibold tracking-wider">
            I WILL MAKE IT HAPPEN. NO MATTER WHAT.
          </p>
        </div>
      </div>
    </section>
  );
}
