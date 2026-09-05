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
        "border border-[#D8D4CB] bg-[#EDE8DE]/30 p-6 sm:p-8 space-y-6 select-none",
        className
      )}
    >
      {/* Plate Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D8D4CB] pb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#173B70]" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#173B70] font-semibold">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#8B8579]">
          <RotateCw className="w-3 h-3 text-[#173B70] animate-spin-slow" />
          <span>{kicker}</span>
        </div>
      </div>

      {/* Process Nodes: Desktop Horizontal / Mobile Clean Responsive Wrap */}
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-2 lg:gap-3">
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
                  "p-3.5 sm:p-4 border transition-all duration-200 flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#173B70]",
                  isHovered
                    ? "border-[#173B70] bg-[#F3F0E8] shadow-sm -translate-y-0.5"
                    : "border-[#D8D4CB] bg-[#F3F0E8] hover:border-[#111111]"
                )}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#8B8579] pb-2 border-b border-[#D8D4CB]/60">
                    <span
                      className={cn(
                        "transition-colors",
                        isHovered ? "text-[#173B70] font-bold" : ""
                      )}
                    >
                      [ {step.number} ]
                    </span>
                    {!isLast ? (
                      <ArrowRight className="w-2.5 h-2.5 text-[#8B8579] group-hover:text-[#173B70] group-hover:translate-x-0.5 transition-all" />
                    ) : (
                      <RotateCw className="w-2.5 h-2.5 text-[#173B70] group-hover:rotate-180 transition-transform duration-300" />
                    )}
                  </div>

                  <h3
                    className={cn(
                      "font-mono text-xs font-semibold uppercase tracking-wider mt-2.5 transition-colors",
                      isHovered ? "text-[#173B70]" : "text-[#111111]"
                    )}
                  >
                    {step.label}
                  </h3>
                </div>

                <p className="text-[11px] text-[#555555] font-sans leading-snug mt-3 pt-2 border-t border-[#D8D4CB]/40">
                  {step.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Closed Loop Legend */}
      <div className="pt-2 border-t border-[#D8D4CB] flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono text-[#8B8579] tracking-wider uppercase gap-1">
        <span>CLOSED ITERATION PROTOCOL // NON-LINEAR EMPIRICAL FEEDBACK</span>
        <span className="text-[#555555]">CYCLE: CONTINUOUS REFINEMENT</span>
      </div>
    </div>
  );
}
