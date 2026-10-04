import React from "react";
import { ProjectProblem, ProjectConcept } from "@/types/project-case-study";

interface ProblemConceptProps {
  problem: ProjectProblem;
  concept: ProjectConcept;
}

export function ProblemConcept({ problem, concept }: ProblemConceptProps) {
  return (
    <section className="py-16 md:py-20 border-b border-[var(--line)]">
      <div className="section-container space-y-16">
        {/* ============================================================== */}
        {/* 03 — THE PROBLEM                                               */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
              03 // THE PROBLEM
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ink)] font-sans tracking-tight mb-4">
            {problem.headline}
          </h2>

          <div className="p-4 sm:p-5 mb-8 bg-[var(--accent-enamel)]/20 border-l-2 border-[var(--accent-brass)] rounded-r-sm">
            <span className="font-mono text-[11px] text-[var(--accent-gold)] uppercase tracking-wider block mb-1">
              [ CORE INQUIRY ]
            </span>
            <p className="text-base sm:text-lg font-sans font-medium text-[var(--ink)] italic">
              &ldquo;{problem.coreQuestion}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-[var(--muted)] font-body leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[var(--ink)] font-sans">
                Why Standard Chatbots &amp; Agent Frameworks Failed
              </h3>
              <p>{problem.whyNotChatbot}</p>
              <p className="pt-2">{problem.contextSummary}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[var(--ink)] font-sans">
                Specific Technical Failure Modes
              </h3>
              <ul className="space-y-2.5">
                {problem.existingLimitations.map((lim, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <span className="text-[var(--accent-brass)] font-mono shrink-0 mt-0.5">
                      ✕
                    </span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>

              <div className="p-3.5 bg-[var(--panel)] border border-[var(--line)] rounded-sm mt-4">
                <span className="font-mono text-[10px] text-[var(--accent-brass)] uppercase tracking-wider block mb-1">
                  [ ORIGINAL WORKING HYPOTHESIS ]
                </span>
                <p className="text-xs sm:text-sm text-[var(--ink)] font-sans">
                  {problem.originalHypothesis}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 04 — THE CONCEPT & ARCHITECTURAL IDEA                          */}
        {/* ============================================================== */}
        <div className="pt-12 border-t border-[var(--line)]">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
              04 // THE CONCEPT &amp; COGNITIVE CYCLE
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ink)] font-sans tracking-tight mb-4">
            {concept.headline}
          </h2>

          <p className="text-base sm:text-lg text-[var(--muted)] font-body leading-relaxed max-w-3xl mb-8">
            {concept.coreIdea}
          </p>

          {/* Sequential Step Cards with Flow Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {concept.flowSteps.map((step, index) => (
              <div
                key={step.step}
                className="brutal-card p-5 rounded-sm relative flex flex-col justify-between group hover:border-[var(--accent-brass)] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs">
                    <span className="text-[var(--accent-brass)] font-bold">
                      STEP {step.step}
                    </span>
                    <span className="text-[var(--muted)] text-[10px]">
                      CYCLE PHASE 0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[var(--ink)] font-sans mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[var(--line)]/50 flex items-center justify-between text-[10px] font-mono text-[var(--muted)]">
                  <span>INVARIANT ENFORCED</span>
                  <span className="text-[var(--accent-brass)] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
