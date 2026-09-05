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
      <div className="flex items-center justify-between border-b border-[#D8D4CB] pb-3 text-[10px] font-mono tracking-widest text-[#555555] uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#173B70]" />
          <span className="text-[#111111] font-semibold">
            FIG. 04B // PROGRESSIVE CAPABILITY SPECIFICATION
          </span>
        </div>
        <span className="text-[#8B8579]">[ STAGES 01 &rarr; 06 ]</span>
      </div>

      {/* Trajectory Items Container with Vertical Guide Line */}
      <div className="relative pl-6 sm:pl-8 space-y-6 sm:space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-4 before:bottom-6 before:w-[1px] before:bg-[#D8D4CB]">
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
                  "absolute -left-6 sm:-left-8 top-5 -translate-x-1/2 w-3.5 h-3.5 rounded-none border bg-[#F3F0E8] flex items-center justify-center transition-all duration-200",
                  isSelected
                    ? "border-[#173B70] bg-[#173B70]"
                    : "border-[#111111] group-hover:border-[#173B70]"
                )}
                aria-hidden="true"
              >
                <span
                  className={cn(
                    "w-1 h-1 transition-colors duration-200",
                    isSelected ? "bg-[#F3F0E8]" : "bg-[#111111] group-hover:bg-[#173B70]"
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
                  "p-5 sm:p-7 border transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#173B70]",
                  isSelected
                    ? "border-[#173B70] bg-[#EDE8DE]/70 shadow-sm"
                    : "border-[#D8D4CB] bg-[#EDE8DE]/30 hover:border-[#111111] hover:bg-[#EDE8DE]/50"
                )}
              >
                {/* Stage Header Plate */}
                <div className="flex items-baseline justify-between border-b border-[#D8D4CB] pb-3 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "font-semibold transition-colors duration-200",
                        isSelected ? "text-[#173B70]" : "text-[#111111]"
                      )}
                    >
                      [ {stage.number} ]
                    </span>
                    <span className="text-[#8B8579] text-[10px] tracking-widest uppercase">
                      {stage.stageCode}
                    </span>
                  </div>

                  <span className="text-[10px] text-[#8B8579] uppercase tracking-wider font-mono">
                    {stage.annotation}
                  </span>
                </div>

                {/* Stage Title and Subtitle */}
                <div className="pt-4 space-y-1.5">
                  <div className="flex items-center justify-between gap-4">
                    <h3
                      className={cn(
                        "font-display text-2xl sm:text-3xl font-light tracking-tight transition-colors duration-200",
                        isSelected ? "text-[#173B70]" : "text-[#111111]"
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
                      className="p-1.5 border border-[#D8D4CB] bg-[#F3F0E8] text-[#555555] hover:text-[#111111] hover:border-[#111111] text-xs font-mono transition-colors sm:hidden cursor-pointer"
                    >
                      <ChevronRight
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          isExpanded ? "rotate-90" : ""
                        )}
                      />
                    </button>
                  </div>

                  <p className="font-mono text-xs text-[#555555]">
                    {stage.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#111111] font-sans leading-relaxed pt-3">
                  &ldquo;{stage.description}&rdquo;
                </p>

                {/* Layer concept annotation */}
                <div className="pt-2 text-xs font-mono text-[#8B8579]">
                  <span className="text-[#173B70]">&sect;</span> {stage.layerConcept}
                </div>

                {/* Supporting Topics: Always visible on desktop hover/focus; expandable on mobile */}
                <div
                  className={cn(
                    "pt-4 mt-4 border-t border-[#D8D4CB]/60 transition-all duration-200",
                    isExpanded ? "block" : "hidden sm:block"
                  )}
                >
                  <div className="flex items-center justify-between pb-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#8B8579]">
                      CORE PRINCIPLES &amp; TOPICS
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[10px] text-[#173B70] transition-opacity duration-200",
                        isSelected ? "opacity-100" : "opacity-0 sm:group-hover:opacity-100"
                      )}
                    >
                      ACTIVE EXPLORATION &rarr;
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {stage.supportingTopics.map((topic) => (
                      <span
                        key={topic}
                        className={cn(
                          "px-2.5 py-1 border text-[10px] sm:text-[11px] font-mono tracking-wider transition-all duration-200",
                          isSelected
                            ? "border-[#173B70]/40 bg-[#F3F0E8] text-[#173B70] font-medium"
                            : "border-[#D8D4CB] bg-[#F3F0E8] text-[#555555] group-hover:border-[#B0A99C] group-hover:text-[#111111]"
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
                  className="flex items-center justify-center py-2 text-[#8B8579] group-hover:text-[#173B70] transition-colors duration-200"
                  aria-hidden="true"
                >
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
                    <span className="w-4 h-[1px] bg-[#D8D4CB]" />
                    <ArrowDown className="w-3 h-3 transition-transform group-hover:translate-y-0.5 duration-200" />
                    <span className="w-4 h-[1px] bg-[#D8D4CB]" />
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
