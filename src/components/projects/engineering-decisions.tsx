import React from "react";
import Link from "next/link";
import { EngineeringDecision } from "@/types/project-case-study";

interface EngineeringDecisionsProps {
  decisions: EngineeringDecision[];
}

export function EngineeringDecisions({ decisions }: EngineeringDecisionsProps) {
  return (
    <section className="py-16 md:py-20 border-b border-[var(--line)]">
      <div className="section-container">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
              08 // ARCHITECTURAL DECISION RECORDS (ADRs)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ink)] font-sans tracking-tight">
            Key Engineering Decisions
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] font-body leading-relaxed max-w-3xl mt-2">
            Software architecture is defined by the trade-offs you accept. Every major technology choice was
            evaluated against alternatives, codified in formal ADRs, and stress-tested against real workloads.
          </p>
        </div>

        <div className="space-y-6">
          {decisions.map((decision) => (
            <div
              key={decision.id}
              className="brutal-card p-6 sm:p-8 rounded-sm border-[var(--border-strong)] space-y-5"
            >
              {/* ADR Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-3 border-b border-[var(--line)]">
                <div className="flex items-center gap-3">
                  {decision.adrNumber && (
                    <span className="font-mono text-xs text-[var(--accent-gold)] bg-[var(--accent-enamel)]/40 border border-[var(--accent-brass)]/50 px-2 py-0.5 rounded-sm font-semibold">
                      {decision.adrNumber}
                    </span>
                  )}
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--ink)] font-sans">
                    {decision.title}
                  </h3>
                </div>
                {decision.evidencePath && (
                  <span className="text-[11px] font-mono text-[var(--muted)]">
                    Evidence:{" "}
                    <Link
                      href={`/${decision.evidencePath.replace(/\.md$/, "")}`}
                      className="text-[var(--accent-brass)] hover:underline"
                    >
                      [{decision.evidencePath.split("/").pop()}]
                    </Link>
                  </span>
                )}
              </div>

              {/* Context */}
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-[var(--accent-brass)] uppercase tracking-wider block">
                  CONTEXT &amp; PROBLEM
                </span>
                <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed">
                  {decision.context}
                </p>
              </div>

              {/* Options Considered Grid */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-[var(--accent-brass)] uppercase tracking-wider block">
                  OPTIONS EVALUATED
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {decision.optionsConsidered.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className="p-3 bg-[var(--bg)]/70 border border-[var(--line)] rounded-sm space-y-2 text-xs font-mono"
                    >
                      <div className="font-bold text-[var(--ink)] border-b border-[var(--line)]/50 pb-1">
                        {opt.option}
                      </div>
                      <div className="space-y-1 text-[11px]">
                        <p className="text-emerald-400">
                          <span className="font-bold">+ PRO:</span> {opt.pros}
                        </p>
                        <p className="text-rose-400">
                          <span className="font-bold">- CON:</span> {opt.cons}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Choice, Why & Trade-off */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[var(--line)]">
                <div className="p-4 bg-[var(--accent-enamel)]/20 border-l-2 border-[var(--accent-brass)] rounded-r-sm space-y-1">
                  <span className="font-mono text-[10px] text-[var(--accent-gold)] uppercase tracking-wider block">
                    SELECTED CHOICE &amp; RATIONALE
                  </span>
                  <p className="font-sans font-bold text-xs sm:text-sm text-[var(--ink)]">
                    {decision.choice}
                  </p>
                  <p className="text-xs text-[var(--muted)] font-body leading-relaxed pt-1">
                    {decision.why}
                  </p>
                </div>

                <div className="p-4 bg-[var(--bg)]/90 border border-[var(--line)] rounded-sm space-y-1">
                  <span className="font-mono text-[10px] text-[var(--accent-gold)] uppercase tracking-wider block">
                    ACCEPTED TRADE-OFF
                  </span>
                  <p className="text-xs text-[var(--muted)] font-body leading-relaxed italic">
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
