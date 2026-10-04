import React from "react";
import { HardProblem } from "@/types/project-case-study";

interface DifficultProblemsProps {
  problems: HardProblem[];
}

export function DifficultProblems({ problems }: DifficultProblemsProps) {
  return (
    <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--panel)]/20">
      <div className="section-container">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
              09 // HARD PROBLEMS &amp; PATHOLOGICAL EDGE CASES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ink)] font-sans tracking-tight">
            Complex Problems Encountered
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] font-body leading-relaxed max-w-3xl mt-2">
            The engineering challenges that resisted simple tutorial solutions—requiring deep root-cause diagnosis,
            Linux kernel tracing, and iterative architectural refactors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob, idx) => (
            <div
              key={idx}
              className="brutal-card p-5 sm:p-6 rounded-sm flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-[var(--line)]">
                  <span className="font-mono text-[10px] text-[var(--accent-brass)] uppercase tracking-wider font-semibold">
                    HARD PROBLEM 0{idx + 1}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400">
                    ● RESOLVED
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[var(--ink)] font-sans">
                  {prob.title}
                </h3>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-[var(--accent-gold)] uppercase tracking-wider block">
                    WHY IT WAS DIFFICULT
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed">
                    {prob.whyDifficult}
                  </p>
                </div>

                <div className="p-3 bg-[var(--bg)]/80 border border-rose-900/40 rounded-sm space-y-1 text-xs">
                  <span className="font-mono text-[10px] text-rose-400 uppercase tracking-wider block font-semibold">
                    WHAT FAILED INITIALLY
                  </span>
                  <p className="text-[var(--muted)] font-body leading-relaxed">
                    {prob.whatFailed}
                  </p>
                </div>

                <div className="p-3 bg-[var(--accent-enamel)]/30 border border-[var(--accent-brass)]/50 rounded-sm space-y-1 text-xs">
                  <span className="font-mono text-[10px] text-[var(--accent-gold)] uppercase tracking-wider block font-semibold">
                    FINAL WORKING APPROACH
                  </span>
                  <p className="text-[var(--ink)] font-body leading-relaxed">
                    {prob.finalApproach}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--line)] font-mono text-[11px] text-[var(--muted)] flex items-center justify-between">
                <span>Current State:</span>
                <span className="text-[var(--accent-brass)] font-medium">
                  {prob.currentState}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
