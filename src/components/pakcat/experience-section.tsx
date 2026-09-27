"use client";

import React from "react";
import { ScrambleText } from "./scramble-text";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

export function ExperienceSection() {
  const experiences: ExperienceItem[] = [
    {
      company: "Ashish Labs / Ashi Cognitive OS",
      role: "Lead AI Systems Architect",
      period: "November 2025 – Present",
      description:
        "Architecting an autonomous personal AI operating system across 28 decoupled packages in a Python uv monorepo. Eliminating latency cascades (32.8s to 5.4s), conducting empirical audits, eliminating vacuous success loops, and deploying local sub-2B inference runtimes.",
    },
    {
      company: "VANI Sovereign OS Project",
      role: "Core Kernel & AST Guardian Engineer",
      period: "January 2026 – Present",
      description:
        "Engineered a 50-year sovereign AI operating system with zero external cloud infrastructure. Built custom event buses, raw AIPort contracts, and an AST Static Analysis Guardian to block architectural drift and database bypasses.",
    },
    {
      company: "LEO Companion OS Exploration",
      role: "Cognitive Subsystems Researcher",
      period: "August 2025 – 2026",
      description:
        "Designed 43 cognitive subsystems and multi-tier memory (working, episodic, semantic, procedural). Authored the automated forensic audit that detected 281 direct-database violations, leading to strict AST architecture enforcement.",
    },
    {
      company: "First-Principles AI Foundations",
      role: "ML & Systems Researcher",
      period: "2024 – 2025",
      description:
        "Rigorous first-principles derivation of transformers, attention matrices, and backpropagation dynamics. Evaluated 6 sub-2B models on consumer hardware and stabilized llama.cpp runtime cancellation hooks.",
    },
    {
      company: "Computer Engineering Background",
      role: "B.E. Computer Engineering",
      period: "2022 – 2026",
      description:
        "Academic and engineering training across computer architecture, operating systems, compiler theory, Linux kernels, and distributed systems.",
    },
  ];

  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative z-10">
      <div className="section-container section-padding">
        {/* Section Header */}
        <div className="mb-12 reveal reveal-up visible">
          <span className="section-number">
            <ScrambleText text="04 // experience" />
          </span>
          <h2
            id="experience-heading"
            className="text-3xl md:text-4xl font-bold text-pakcat-text-primary mt-3 font-sans"
          >
            Experience across product, R&amp;D, and engineering.
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Ruler Line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-pakcat-border" />

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div
                key={exp.company}
                className={`stagger-${(idx % 4) + 1} relative pl-12 md:pl-16 reveal reveal-up visible`}
              >
                {/* Glowing Node Dot */}
                <div className="absolute left-2.5 md:left-[1.125rem] top-2 w-3 h-3 bg-[#80142B] border border-[#E27D95] rounded-none shadow-[0_0_10px_rgba(226,125,149,0.7)]" />

                {/* Brutal Card */}
                <div className="brutal-card p-6 rounded-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-pakcat-text-primary font-sans">
                      {exp.company}
                    </h3>
                    <span className="font-mono text-xs text-pakcat-text-secondary">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-[#E27D95] mb-3">
                    {exp.role}
                  </p>
                  <p className="text-sm text-pakcat-text-secondary font-body leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
