"use client";

import React, { useState } from "react";
import { ArrowRight, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface CapabilityLoopStep {
  number: string;
  label: string;
  detail: string;
}

interface CapabilityLoopProps {
  label: string;
  kicker: string;
  steps: CapabilityLoopStep[];
  className?: string;
}

export function CapabilityLoop({
  label,
  kicker,
  steps,
  className,
}: CapabilityLoopProps) {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "rounded border border-[#1E293B] bg-[#0D1117] p-4 sm:p-8 space-y-4 sm:space-y-6 select-none",
        className
      )}
    >
      {/* Plate Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1E293B] pb-3 sm:pb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan font-semibold">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400">
          <RotateCw className="w-3 h-3 text-cyber-cyan animate-spin-slow" />
          <span>{kicker}</span>
        </div>
      </div>

      {/* Process Nodes: Desktop Horizontal / Mobile Clean Responsive Wrap */}
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-2 lg:gap-3">
          {steps.map((step, idx) => {
            const isHovered = activeStep === step.number;
            const isLast = idx === steps.length - 1;

            return (
              <div
                key={step.number}
                onMouseEnter={() => setActiveStep(step.number)}
                onMouseLeave={() => setActiveStep(null)}
                tabIndex={0}
                role="region"
                aria-label={`Loop Step ${step.number}: ${step.label}`}
                onFocus={() => setActiveStep(step.number)}
                onBlur={() => setActiveStep(null)}
                className={cn(
                  "p-3 sm:p-4 rounded border transition-all duration-200 flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyber-cyan",
                  isLast ? "col-span-2 sm:col-span-1" : "col-span-1",
                  isHovered
                    ? "border-cyber-cyan bg-[#151D2A] shadow-md shadow-cyber-cyan/10 -translate-y-0.5"
                    : "border-[#1E293B] bg-[#070A0F] hover:border-[#334155]"
                )}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-slate-400 pb-1.5 sm:pb-2 border-b border-[#1E293B]">
                    <span
                      className={cn(
                        "transition-colors",
                        isHovered ? "text-cyber-cyan font-bold" : ""
                      )}
                    >
                      [ {step.number} ]
                    </span>
                    {!isLast ? (
                      <ArrowRight className="w-2.5 h-2.5 text-slate-400 group-hover:text-cyber-cyan group-hover:translate-x-0.5 transition-all" />
                    ) : (
                      <RotateCw className="w-2.5 h-2.5 text-cyber-cyan group-hover:rotate-180 transition-transform duration-300" />
                    )}
                  </div>

                  <h3
                    className={cn(
                      "font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider mt-2 sm:mt-2.5 transition-colors",
                      isHovered ? "text-cyber-cyan" : "text-white"
                    )}
                  >
                    {step.label}
                  </h3>
                </div>

                <p className="text-[10px] sm:text-[11px] text-slate-400 font-sans leading-snug mt-2 sm:mt-3 pt-1.5 sm:pt-2 border-t border-[#1E293B]">
                  {step.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Closed Loop Legend */}
      <div className="pt-2 border-t border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-400 tracking-wider uppercase gap-1">
        <span>CLOSED ITERATION PROTOCOL // DETERMINISTIC EMPIRICAL FEEDBACK</span>
        <span className="text-cyber-cyan font-semibold">CYCLE: ACTIVE VERIFICATION</span>
      </div>
    </div>
  );
}
