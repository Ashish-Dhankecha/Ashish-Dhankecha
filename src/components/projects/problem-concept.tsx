import React from "react";
import { ProjectProblem, ProjectConcept } from "@/types/project-case-study";

interface ProblemConceptProps {
  problem: ProjectProblem;
  concept: ProjectConcept;
}

export function ProblemConcept({ problem, concept }: ProblemConceptProps) {
  return (
    <section className="py-16 md:py-24 border-b border-white/10 bg-[#050505]">
      <div className="section-container space-y-16">
        {/* ============================================================== */}
        {/* 03 — THE PROBLEM                                               */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
              03 // THE PROBLEM
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-sans tracking-tight mb-6">
            {problem.headline}
          </h2>

          <div className="p-6 sm:p-7 mb-10 bg-emerald-950/20 border-l-2 border-emerald-500 rounded-r-2xl border-y border-r border-white/10">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider block mb-2 font-semibold">
              [ CORE INQUIRY ]
            </span>
            <p className="text-lg sm:text-xl font-sans font-medium text-white italic leading-relaxed">
              &ldquo;{problem.coreQuestion}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-white/60 font-sans leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-sans">
                Why Standard Chatbots &amp; Agent Frameworks Failed
              </h3>
              <p>{problem.whyNotChatbot}</p>
              <p className="pt-2">{problem.contextSummary}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-sans">
                Specific Technical Failure Modes
              </h3>
              <ul className="space-y-3">
                {problem.existingLimitations.map((lim, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                    <span className="text-rose-400 font-mono shrink-0 mt-0.5">
                      ✕
                    </span>
                    <span className="text-white/80">{lim}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 sm:p-5 bg-white/[0.02] border border-white/10 rounded-xl mt-6">
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block mb-1.5 font-semibold">
                  [ ORIGINAL WORKING HYPOTHESIS ]
                </span>
                <p className="text-xs sm:text-sm text-white/90 font-sans leading-relaxed">
                  {problem.originalHypothesis}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 04 — THE CONCEPT & ARCHITECTURAL IDEA                          */}
        {/* ============================================================== */}
        <div className="pt-14 border-t border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
              04 // THE CONCEPT &amp; COGNITIVE CYCLE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-sans tracking-tight mb-4">
            {concept.headline}
          </h2>

          <p className="text-base sm:text-lg text-white/60 font-sans leading-relaxed max-w-3xl mb-10">
            {concept.coreIdea}
          </p>

          {/* Sequential Step Cards with Flow Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {concept.flowSteps.map((step, index) => (
              <div
                key={step.step}
                className="glass-card p-6 rounded-2xl border border-white/10 relative flex flex-col justify-between group hover:border-emerald-500/50 hover:bg-white/[0.04] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 font-mono text-xs">
                    <span className="text-emerald-400 font-bold">
                      STEP {step.step}
                    </span>
                    <span className="text-white/40 text-[10px]">
                      CYCLE PHASE 0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-sans mb-2 group-hover:text-emerald-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
                  <span className="text-emerald-400/80">INVARIANT ENFORCED</span>
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">
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
