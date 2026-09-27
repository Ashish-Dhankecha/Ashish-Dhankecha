"use client";

import React from "react";
import { ScrambleText } from "./scramble-text";

export function AboutSection() {
  const bullets = [
    "First-principles engineering over superficial AI demos",
    "Empirical audits over hypothetical capability claims",
    "Acyclic architectures with automated compile-time AST enforcement",
    "Local-first sovereignty with zero vendor cloud lock-in",
    "Execution evidence required before marking any plan completed",
    "Sub-2B SLM model optimization with quantified turn latencies",
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
            className="text-3xl md:text-4xl font-bold text-pakcat-text-primary mt-3 font-sans"
          >
            Not just a portfolio. A build lab.
          </h2>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Text */}
          <div className="lg:col-span-3 space-y-6 reveal reveal-up visible">
            <p className="text-pakcat-text-secondary leading-relaxed font-body">
              Ashish Labs is where I collect the systems I architect, break, measure, and harden. 
              Rather than treating language models as magic black boxes or building superficial prompt wrappers, 
              my work focuses on what happens around the model: deterministic execution kernels, structured episodic memory, 
              tool execution sandboxes, and behavioral invariant verifiers.
            </p>
            <p className="text-pakcat-text-secondary leading-relaxed font-body">
              The focus is not only showing final dashboards, but explaining the real architectural engineering: 
              the mathematical derivations, state schemas, dependency graphs, latency cascade mitigations, 
              and what was learned when systems failed live empirical audits.
            </p>
            <p className="text-pakcat-text-secondary leading-relaxed font-body">
              Alongside personal cognitive operating systems like Ashi, LEO, and VANI, I build foundational experiments 
              to understand transformer attention, model quantization with llama.cpp, and systems infrastructure from absolute scratch.
            </p>
          </div>

          {/* Right Invariants Card */}
          <div className="lg:col-span-2 reveal reveal-up visible">
            <div className="brutal-card p-6 space-y-4 rounded-sm">
              <div className="border-b border-[#3B121E] pb-3 mb-2 flex items-center justify-between">
                <span className="font-mono text-xs text-[#E27D95] uppercase tracking-wider">
                  {"// lab_invariants.json"}
                </span>
                <span className="font-mono text-xs text-[#E27D95] bg-[#80142B]/25 border border-[#80142B]/50 px-2 py-0.5 rounded-sm">
                  [ENFORCED]
                </span>
              </div>
              {bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="font-mono text-sm text-[#E27D95] mt-0.5 shrink-0">
                    &gt;
                  </span>
                  <span className="text-pakcat-text-secondary text-sm font-body">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
