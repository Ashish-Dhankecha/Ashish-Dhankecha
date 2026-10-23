import React from "react";
import { ProjectExecutionFlow } from "@/types/project-case-study";

interface ExecutionFlowProps {
  executionFlow: ProjectExecutionFlow;
}

export function ExecutionFlow({ executionFlow }: ExecutionFlowProps) {
  const example = executionFlow.concreteExample;

  return (
    <section className="py-16 md:py-24 border-b border-white/10 bg-black/40">
      <div className="section-container">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
              06 // HOW IT WORKS · EXECUTION FLOW TRACE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-sans tracking-tight">
            {executionFlow.title}
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-sans leading-relaxed max-w-3xl mt-3">
            {executionFlow.description}
          </p>
        </div>

        {/* Concrete Example Container */}
        <div className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-8 shadow-2xl">
          {/* User Input Callout */}
          <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider block mb-1.5 font-semibold">
              [ STIMULUS INPUT ]
            </span>
            <p className="font-mono text-xs sm:text-sm text-white font-medium">
              {example.input}
            </p>
          </div>

          {/* Sequential Step Trace */}
          <div className="space-y-4">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider block font-semibold">
              [ SUB-CYCLE EXECUTION PATH ]
            </span>

            <div className="space-y-4 relative before:absolute before:top-3 before:bottom-3 before:left-4 before:w-px before:bg-white/15">
              {example.steps.map((st, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 relative pl-1"
                >
                  <div className="w-7 h-7 rounded-full bg-black border border-emerald-500/70 flex items-center justify-center shrink-0 z-10 text-[10px] font-mono text-emerald-400 font-bold shadow-md shadow-emerald-500/20">
                    {idx + 1}
                  </div>

                  <div className="flex-1 p-4 bg-white/[0.02] border border-white/10 rounded-xl space-y-2 hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <span className="font-mono text-xs font-bold text-white">
                        {st.phase}
                      </span>
                      <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        {st.subsystem}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                      {st.action}
                    </p>

                    <div className="text-[11px] font-mono text-white/50 pt-2 border-t border-white/10 flex items-center gap-2">
                      <span className="text-cyan-400 font-semibold">↳ State Mutation:</span>
                      <span className="text-white/80">{st.stateChange}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Output Callout */}
          <div className="p-5 bg-emerald-950/20 border-l-2 border-emerald-500 rounded-r-xl border-y border-r border-white/10">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider block mb-1.5 font-semibold">
              [ RESOLVED OUTPUT ]
            </span>
            <p className="font-sans text-xs sm:text-sm text-white/90 font-medium leading-relaxed">
              {example.output}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
