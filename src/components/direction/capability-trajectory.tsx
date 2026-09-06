"use client";

import React, { useState } from "react";
import { ArrowDown, ChevronRight } from "lucide-react";
import { TrajectoryStage } from "@/content/portfolio-data";
import { cn } from "@/lib/utils";

interface CapabilityTrajectoryProps {
  stages: TrajectoryStage[];
  activeStage: string | null;
  onSelectStage: (stageNumber: string | null) => void;
  className?: string;
}

export function CapabilityTrajectory({
  stages,
  activeStage,
  onSelectStage,
  className,
}: CapabilityTrajectoryProps) {
  // Allow keyboard/touch expansion
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    "01": true,
    "02": false,
    "03": false,
    "04": true,
    "05": false,
    "06": true,
  });

  const toggleStage = (number: string) => {
    setExpandedStages((prev) => ({
      ...prev,
      [number]: !prev[number],
    }));
  };

  return (
    <div className={cn("relative space-y-6 sm:space-y-8", className)}>
      {/* Editorial Plate Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1E293B] pb-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase gap-1.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
          <span className="text-white font-semibold">
            FIG. 04B // PROGRESSIVE CAPABILITY SPECIFICATION
          </span>
        </div>
        <span className="text-slate-500">[ STAGES 01 &rarr; 06 ]</span>
      </div>

      {/* Trajectory Items Container with Vertical Guide Line */}
      <div className="relative pl-5 sm:pl-8 space-y-5 sm:space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-4 before:bottom-6 before:w-[1px] before:bg-[#1E293B]">
        {stages.map((stage, idx) => {
          const isSelected = activeStage === stage.number;
          const isExpanded = expandedStages[stage.number] ?? false;
          const isLast = idx === stages.length - 1;

          return (
            <div
              key={stage.number}
              className="relative group transition-all duration-200"
              onMouseEnter={() => onSelectStage(stage.number)}
              onMouseLeave={() => onSelectStage(null)}
            >
              {/* Timeline Connector Node on the left line */}
              <div
                className={cn(
                  "absolute -left-5 sm:-left-8 top-5 -translate-x-1/2 w-3.5 h-3.5 rounded-full border bg-[#070A0F] flex items-center justify-center transition-all duration-200",
                  isSelected
                    ? "border-cyber-cyan bg-cyber-cyan shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                    : "border-[#334155] group-hover:border-cyber-cyan"
                )}
                aria-hidden="true"
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors duration-200",
                    isSelected ? "bg-obsidian-dark" : "bg-slate-500 group-hover:bg-cyber-cyan"
                  )}
                />
              </div>

              {/* Trajectory Card Plate */}
              <div
                tabIndex={0}
                role="region"
                aria-label={`${stage.stageCode}: ${stage.title}`}
                onFocus={() => onSelectStage(stage.number)}
                onBlur={() => onSelectStage(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleStage(stage.number);
                  }
                }}
                className={cn(
                  "p-4 sm:p-7 rounded border transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyber-cyan",
                  isSelected
                    ? "border-cyber-cyan/60 bg-[#151D2A] shadow-lg shadow-cyber-cyan/5"
                    : "border-[#1E293B] bg-[#0D1117] hover:border-[#334155] hover:bg-[#111827]"
                )}
              >
                {/* Stage Header Plate */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#1E293B] pb-2.5 sm:pb-3 text-xs font-mono gap-1.5">
                  <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                    <span
                      className={cn(
                        "font-semibold transition-colors duration-200",
                        isSelected ? "text-cyber-cyan" : "text-white"
                      )}
                    >
                      [ {stage.number} ]
                    </span>
                    <span className="text-slate-400 text-[10px] tracking-widest uppercase">
                      {stage.stageCode}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono self-start sm:self-auto">
                    {stage.annotation}
                  </span>
                </div>

                {/* Stage Title and Subtitle */}
                <div className="pt-3 sm:pt-4 space-y-1.5">
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <h3
                      className={cn(
                        "font-sans text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-200",
                        isSelected ? "text-cyber-cyan" : "text-white"
                      )}
                    >
                      {stage.title}
                    </h3>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStage(stage.number);
                      }}
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? "Collapse" : "Expand"} topics for ${stage.title}`}
                      className="p-2 rounded border border-[#1E293B] bg-[#070A0F] text-slate-400 hover:text-white hover:border-cyber-cyan text-xs font-mono transition-colors sm:hidden cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
                    >
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isExpanded ? "rotate-90" : ""
                        )}
                      />
                    </button>
                  </div>

                  <p className="font-mono text-xs text-cyber-cyan/80">
                    {stage.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed pt-2.5 sm:pt-3">
                  &ldquo;{stage.description}&rdquo;
                </p>

                {/* Layer concept annotation */}
                <div className="pt-2 text-xs font-mono text-slate-400">
                  <span className="text-cyber-cyan">&sect;</span> {stage.layerConcept}
                </div>

                {/* Supporting Topics: Always visible on desktop hover/focus; expandable on mobile */}
                <div
                  className={cn(
                    "pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-[#1E293B] transition-all duration-200",
                    isExpanded ? "block" : "hidden sm:block"
                  )}
                >
                  <div className="flex items-center justify-between pb-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                      CORE CAPABILITIES &amp; RUNTIMES
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[10px] text-cyber-cyan transition-opacity duration-200",
                        isSelected ? "opacity-100" : "opacity-0 sm:group-hover:opacity-100"
                      )}
                    >
                      ACTIVE STACK &rarr;
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {stage.supportingTopics.map((topic) => (
                      <span
                        key={topic}
                        className={cn(
                          "px-2.5 py-1 rounded border text-[10px] sm:text-[11px] font-mono tracking-wider transition-all duration-200",
                          isSelected
                            ? "border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan font-medium"
                            : "border-[#1E293B] bg-[#070A0F] text-slate-300 group-hover:border-[#334155] group-hover:text-white"
                        )}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connecting Down Arrow between stages */}
              {!isLast && (
                <div
                  className="flex items-center justify-center py-2 text-slate-500 group-hover:text-cyber-cyan transition-colors duration-200"
                  aria-hidden="true"
                >
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
                    <span className="w-4 h-[1px] bg-[#1E293B]" />
                    <ArrowDown className="w-3 h-3 transition-transform group-hover:translate-y-0.5 duration-200" />
                    <span className="w-4 h-[1px] bg-[#1E293B]" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
