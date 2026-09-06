import React from "react";
import { EvolutionaryFlow as EvolutionaryFlowType } from "@/types/lab";

interface Props {
  flow: EvolutionaryFlowType;
  title?: string;
  subtitle?: string;
}

const STEPS = [
  {
    key: "what_i_thought" as const,
    num: "01",
    label: "WHAT I THOUGHT",
    desc: "Initial assumption, hypothesis, or design model",
    tone: "border-[#1E293B]",
  },
  {
    key: "what_happened" as const,
    num: "02",
    label: "WHAT HAPPENED",
    desc: "Empirical discovery, audit failure, or edge case",
    tone: "border-[#1E293B]",
  },
  {
    key: "what_i_learned" as const,
    num: "03",
    label: "WHAT I LEARNED",
    desc: "Underlying mechanism and systemic diagnosis",
    tone: "border-[#1E293B]",
  },
  {
    key: "what_i_do_differently_now" as const,
    num: "04",
    label: "WHAT I DO DIFFERENTLY NOW",
    desc: "Architectural invariant, gate, or enduring practice",
    tone: "border-[#38BDF8]/50 shadow-[0_0_12px_rgba(56,189,248,0.1)]",
  },
];

export function EvolutionaryFlowComponent({
  flow,
  title = "Evolutionary Trajectory",
  subtitle = "How experience and failure converted initial assumptions into architectural discipline.",
}: Props) {
  const hasContent = STEPS.some((step) => Boolean(flow[step.key]));
  if (!hasContent) return null;

  return (
    <div className="w-full my-6 sm:my-8 p-4 sm:p-8 bg-[#0D1117] border border-[#1E293B]">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 sm:gap-2 border-b border-[#1E293B] pb-3 sm:pb-4">
        <div>
          <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-[#38BDF8] font-semibold">
            EVOLUTIONARY FLOW · INTELLECTUAL CONTINUITY
          </div>
          <h3 className="font-sans text-lg sm:text-2xl text-[#F8FAFC] font-semibold tracking-tight mt-0.5 sm:mt-1">
            {title}
          </h3>
        </div>
        <p className="text-[11px] sm:text-xs font-sans text-slate-400 max-w-md leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STEPS.map((step, idx) => {
          const content = flow[step.key];
          if (!content) return null;

          return (
            <div
              key={step.key}
              className={`relative flex flex-col justify-between p-4 sm:p-5 bg-[#070A0F] border ${step.tone} transition-colors hover:border-[#38BDF8]/40`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
                  <span className="font-mono text-[10px] text-slate-500 tracking-widest font-semibold">
                    {step.num}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#38BDF8] font-medium">
                    {idx < 3 ? "→ ITERATION" : "★ PRACTICE"}
                  </span>
                </div>

                <div className="font-mono text-xs uppercase tracking-wider text-[#F8FAFC] font-semibold mb-1">
                  {step.label}
                </div>
                <div className="text-[11px] font-sans text-slate-500 mb-2.5 sm:mb-3 leading-snug">
                  {step.desc}
                </div>

                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  {content}
                </p>
              </div>

              <div className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#1E293B] text-[9px] font-mono text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>STEP {step.num} OF 04</span>
                {idx < 3 && (
                  <span className="md:hidden text-[#38BDF8]">↓ NEXT</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
