"use client";

import React from "react";
import { ScrambleText } from "./scramble-text";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export function ProcessSection() {
  const steps: ProcessStep[] = [
    {
      step: "01",
      title: "Decompose",
      description:
        "Understand the problem from first principles: derive the mathematics, map data structures, and analyze computational bounds.",
    },
    {
      step: "02",
      title: "Architect",
      description:
        "Define acyclic subsystem boundaries, formalize state contracts, write ADRs, and create automated AST invariant checks.",
    },
    {
      step: "03",
      title: "Build",
      description:
        "Implement decoupled kernels, persistent relational stores, tool execution sandboxes, and native local inference bindings.",
    },
    {
      step: "04",
      title: "Audit",
      description:
        "Subject the live system to empirical stress testing: eliminate vacuous success bugs, profile turn latencies, and measure failure modes.",
    },
    {
      step: "05",
      title: "Harden",
      description:
        "Freeze core substrate code, seal architectural truth boundaries, and turn failure discoveries into permanent automated tests.",
    },
  ];

  return (
    <section id="process" aria-labelledby="process-heading" className="relative z-10">
      <div className="section-container section-padding">
        {/* Section Header */}
        <div className="mb-12 reveal reveal-up visible">
          <span className="section-number">
            <ScrambleText text="05 // process" />
          </span>
          <h2
            id="process-heading"
            className="text-3xl md:text-4xl font-bold text-pakcat-text-primary mt-3 font-sans"
          >
            How I turn ideas into working products.
          </h2>
        </div>

        {/* Steps Flow with Arrows */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          {steps.map((item, idx) => (
            <React.Fragment key={item.step}>
              <div
                className={`stagger-${
                  idx + 1
                } flex-1 brutal-card p-6 reveal reveal-scale visible relative rounded-sm flex flex-col justify-between`}
              >
                <div>
                  <div className="font-mono text-4xl font-bold text-[#E27D95] mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-pakcat-text-primary mb-2 font-sans">
                    {item.title}
                  </h3>
                  <p className="text-sm text-pakcat-text-secondary font-body leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className="hidden lg:flex items-center justify-center text-[#5A1A2C] font-mono text-xl select-none"
                  aria-hidden="true"
                >
                  →
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
