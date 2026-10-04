import React from "react";
import { ProjectExecutionFlow } from "@/types/project-case-study";

interface ExecutionFlowProps {
  executionFlow: ProjectExecutionFlow;
}

export function ExecutionFlow({ executionFlow }: ExecutionFlowProps) {
  const example = executionFlow.concreteExample;

  return (
    <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--panel)]/20">
      <div className="section-container">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
              06 // HOW IT WORKS · EXECUTION FLOW TRACE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ink)] font-sans tracking-tight">
            {executionFlow.title}
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] font-body leading-relaxed max-w-3xl mt-2">
            {executionFlow.description}
          </p>
        </div>

        {/* Concrete Example Container */}
        <div className="p-5 sm:p-7 bg-[var(--panel)] border border-[var(--border-strong)] rounded-sm space-y-6 shadow-sm">
          {/* User Input Callout */}
          <div className="p-4 bg-[var(--bg)]/90 border border-[var(--line)] rounded-sm">
            <span className="font-mono text-[10px] text-[var(--accent-gold)] uppercase tracking-wider block mb-1">
              [ STIMULUS INPUT ]
            </span>
            <p className="font-mono text-xs sm:text-sm text-[var(--ink)] font-medium">
              {example.input}
            </p>
          </div>

          {/* Sequential Step Trace */}
          <div className="space-y-3">
            <span className="font-mono text-[10px] text-[var(--accent-brass)] uppercase tracking-wider block">
              [ SUB-CYCLE EXECUTION PATH ]
            </span>

            <div className="space-y-3 relative before:absolute before:top-3 before:bottom-3 before:left-4 before:w-px before:bg-[var(--line)]">
              {example.steps.map((st, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 relative pl-1"
                >
                  <div className="w-7 h-7 rounded-full bg-[var(--panel)] border border-[var(--accent-brass)] flex items-center justify-center shrink-0 z-10 text-[10px] font-mono text-[var(--accent-brass)] font-bold shadow-sm">
                    {idx + 1}
                  </div>

                  <div className="flex-1 p-3.5 bg-[var(--bg)]/50 border border-[var(--line)] rounded-sm space-y-1.5 hover:border-[var(--accent-brass)]/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <span className="font-mono text-xs font-bold text-[var(--ink)]">
                        {st.phase}
                      </span>
                      <span className="font-mono text-[11px] text-[var(--accent-brass)] bg-[var(--accent-enamel)]/30 px-2 py-0.5 rounded-sm">
                        {st.subsystem}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed">
                      {st.action}
                    </p>

                    <div className="text-[11px] font-mono text-[var(--ink-secondary)] pt-1 border-t border-[var(--line)]/40 flex items-center gap-1.5">
                      <span className="text-[var(--accent-gold)]">↳ State Mutation:</span>
                      <span>{st.stateChange}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Output Callout */}
          <div className="p-4 bg-[var(--accent-enamel)]/20 border-l-2 border-[var(--accent-brass)] rounded-r-sm">
            <span className="font-mono text-[10px] text-[var(--accent-gold)] uppercase tracking-wider block mb-1">
              [ RESOLVED OUTPUT ]
            </span>
            <p className="font-sans text-xs sm:text-sm text-[var(--ink)] font-medium leading-relaxed">
              {example.output}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
