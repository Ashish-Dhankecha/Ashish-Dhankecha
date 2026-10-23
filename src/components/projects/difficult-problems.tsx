import React from "react";
import { HardProblem } from "@/types/project-case-study";

interface DifficultProblemsProps {
  problems: HardProblem[];
}

export function DifficultProblems({ problems }: DifficultProblemsProps) {
  return (
    <section className="py-16 md:py-24 border-b border-white/10 bg-black/40">
      <div className="section-container">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
              09 // HARD PROBLEMS &amp; PATHOLOGICAL EDGE CASES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-sans tracking-tight">
            Complex Problems Encountered
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-sans leading-relaxed max-w-3xl mt-3">
            The engineering challenges that resisted simple tutorial solutions—requiring deep root-cause diagnosis,
            Linux kernel tracing, and iterative architectural refactors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-6 shadow-2xl hover:border-emerald-500/40 hover:bg-white/[0.03] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider font-semibold">
                    HARD PROBLEM 0{idx + 1}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    RESOLVED
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-sans">
                  {prob.title}
                </h3>

                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block font-semibold">
                    WHY IT WAS DIFFICULT
                  </span>
                  <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                    {prob.whyDifficult}
                  </p>
                </div>

                <div className="p-4 bg-rose-950/20 border border-rose-500/30 rounded-xl space-y-1.5 text-xs">
                  <span className="font-mono text-[10px] text-rose-400 uppercase tracking-wider block font-semibold">
                    WHAT FAILED INITIALLY
                  </span>
                  <p className="text-white/70 font-sans leading-relaxed">
                    {prob.whatFailed}
                  </p>
                </div>

                <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-1.5 text-xs">
                  <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block font-semibold">
                    FINAL WORKING APPROACH
                  </span>
                  <p className="text-white/90 font-sans leading-relaxed">
                    {prob.finalApproach}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 font-mono text-xs text-white/50 flex items-center justify-between">
                <span>Current State:</span>
                <span className="text-emerald-400 font-medium">
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
