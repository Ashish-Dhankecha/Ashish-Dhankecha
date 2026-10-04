"use client";

import React from "react";
import { ScrambleText } from "./scramble-text";

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
        "Analyze the objective from first principles. Understand the mathematical bounds, user requirements, and core constraints before writing a single line of code.",
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
    <section id="process" aria-labelledby="process-heading" className="relative z-10">
      <div className="section-container section-padding">
        {/* Section Header */}
        <div className="mb-10 reveal reveal-up visible">
          <span className="section-number">
            <ScrambleText text="05 // how i work" />
          </span>
          <h2
            id="process-heading"
            className="text-3xl md:text-4xl font-bold text-[var(--ink)] mt-3 font-sans"
          >
            How I Work
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base mt-2 max-w-2xl font-body">
            A disciplined 6-step loop from first principles to reliable software.
            Reinforcing the core identity: understand, learn what is necessary, and make it happen.
          </p>
        </div>

        {/* 6-Step Grid (3 cols on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className={`stagger-${
                (idx % 6) + 1
              } brutal-card p-6 reveal reveal-scale visible rounded-sm flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-[var(--line)] pb-3">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-[var(--accent-brass)]">
                    {item.step}
                  </span>
                  <span className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider">
                    PHASE {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[var(--ink)] font-sans mb-1">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-[var(--accent-gold)] mb-3">
                  {item.tagline}
                </p>

                <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reinforcing Callout */}
        <div className="mt-10 p-5 rounded-sm border border-[var(--accent-brass)]/40 bg-[var(--panel)]/60 text-center reveal reveal-up visible">
          <p className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest mb-1">
            CORE EXECUTION PRINCIPLE
          </p>
          <p className="font-sans font-bold text-lg sm:text-xl text-[var(--ink)]">
            &ldquo;I don&apos;t need to know everything before I start. I need to know how to figure it out.&rdquo;
          </p>
          <p className="font-mono text-xs text-[var(--accent-gold)] mt-2 font-semibold">
            I WILL MAKE IT HAPPEN. NO MATTER WHAT.
          </p>
        </div>
      </div>
    </section>
  );
}
