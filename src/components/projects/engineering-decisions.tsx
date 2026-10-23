import React from "react";
import Link from "next/link";
import { EngineeringDecision } from "@/types/project-case-study";

interface EngineeringDecisionsProps {
  decisions: EngineeringDecision[];
}

export function EngineeringDecisions({ decisions }: EngineeringDecisionsProps) {
  return (
    <section className="py-16 md:py-24 border-b border-white/10 bg-[#050505]">
      <div className="section-container">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
              08 // ARCHITECTURAL DECISION RECORDS (ADRs)
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-sans tracking-tight">
            Key Engineering Decisions
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-sans leading-relaxed max-w-3xl mt-3">
            Software architecture is defined by the trade-offs you accept. Every major technology choice was
            evaluated against alternatives, codified in formal ADRs, and stress-tested against real workloads.
          </p>
        </div>

        <div className="space-y-8">
          {decisions.map((decision) => (
            <div
              key={decision.id}
              className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 shadow-2xl"
            >
              {/* ADR Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  {decision.adrNumber && (
                    <span className="font-mono text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-semibold">
                      {decision.adrNumber}
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                    {decision.title}
                  </h3>
                </div>
                {decision.evidencePath && (
                  <span className="text-[11px] font-mono text-white/50">
                    Evidence:{" "}
                    <Link
                      href={
                        decision.evidencePath.startsWith("lab-content/")
                          ? `/lab/${decision.evidencePath.replace(/^lab-content\//, "").replace(/\.md$/, "").toLowerCase()}`
                          : `/${decision.evidencePath.replace(/\.md$/, "")}`
                      }
                      className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
                    >
                      [{decision.evidencePath.split("/").pop()}]
                    </Link>
                  </span>
                )}
              </div>

              {/* Context */}
              <div className="space-y-1.5">
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider block font-semibold">
                  CONTEXT &amp; PROBLEM
                </span>
                <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                  {decision.context}
                </p>
              </div>

              {/* Options Considered Grid */}
              <div className="space-y-3">
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider block font-semibold">
                  OPTIONS EVALUATED
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {decision.optionsConsidered.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className="p-4 bg-white/[0.02] border border-white/10 rounded-xl space-y-2.5 text-xs font-mono"
                    >
                      <div className="font-bold text-white border-b border-white/10 pb-2">
                        {opt.option}
                      </div>
                      <div className="space-y-1.5 text-[11px]">
                        <p className="text-emerald-400 flex items-start gap-1">
                          <span className="font-bold shrink-0">+ PRO:</span> {opt.pros}
                        </p>
                        <p className="text-rose-400 flex items-start gap-1">
                          <span className="font-bold shrink-0">- CON:</span> {opt.cons}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Choice, Why & Trade-off */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="p-5 bg-emerald-950/20 border-l-2 border-emerald-500 rounded-r-xl border-y border-r border-white/10 space-y-1.5">
                  <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider block font-semibold">
                    SELECTED CHOICE &amp; RATIONALE
                  </span>
                  <p className="font-sans font-bold text-sm text-white">
                    {decision.choice}
                  </p>
                  <p className="text-xs text-white/70 font-sans leading-relaxed pt-1">
                    {decision.why}
                  </p>
                </div>

                <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl space-y-1.5">
                  <span className="font-mono text-xs text-amber-400 uppercase tracking-wider block font-semibold">
                    ACCEPTED TRADE-OFF
                  </span>
                  <p className="text-xs text-white/70 font-sans leading-relaxed italic">
                    &ldquo;{decision.tradeoff}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
