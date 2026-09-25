"use client";

import React from "react";
import Link from "next/link";
import { LabMetrics, LabProject } from "@/types/lab";

interface Props {
  metrics: LabMetrics;
  projects: LabProject[];
  onSelectCategory?: (category: string) => void;
  selectedCategory?: string;
}

export function LabArchiveIndexVisual({
  metrics,
  projects,
  onSelectCategory,
  selectedCategory,
}: Props) {
  const categoryOrder = [
    { key: "Architecture", label: "ARCHITECTURE" },
    { key: "Debugging", label: "DEBUGGING" },
    { key: "Engineering Notes", label: "ENGINEERING NOTES" },
    { key: "Experiments", label: "EXPERIMENTS" },
    { key: "Post-Mortems", label: "POST-MORTEMS" },
    { key: "System Design", label: "SYSTEM DESIGN" },
  ];

  return (
    <div className="w-full my-6 sm:my-8 bg-[#140A0D] rounded-xl border border-[#2D161C] p-4 sm:p-8 lg:p-10 font-mono shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-[#F5EBE1] relative overflow-hidden">
      {/* Subtle warm wine ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[150px] bg-gradient-to-b from-[#801D2C]/15 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-2xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Archival Ledger Header */}
        <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#8E7C79] mb-1 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DF7987] animate-pulse" />
          SYSTEM TELEMETRY · EMPIRICAL ARCHIVE CLASSIFICATION
        </div>
        <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#F5EBE1] tracking-tight my-1.5 sm:my-2">
          THE LAB ARCHIVE
        </h2>
        <div className="text-[11px] sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] text-[#DF7987] font-semibold mb-5 sm:mb-6">
          {String(metrics.total_projects).padStart(2, "0")} RUNTIMES /{" "}
          {String(metrics.total_pieces).padStart(2, "0")} VERIFIED DISPATCHES
        </div>

        <div className="w-full h-[1px] bg-[#2D161C] mb-5 sm:mb-6" />

        {/* Project Breakdown Rows */}
        <div className="w-full space-y-1 sm:space-y-2 mb-5 sm:mb-6">
          {projects.map((proj) => {
            const count = metrics.by_project[proj.id] || proj.pieces_count || 0;
            return (
              <Link
                key={proj.id}
                href={`#project-${proj.id}`}
                className="group flex items-center justify-between py-2.5 sm:py-2 border-b border-[#2D161C] text-xs sm:text-sm tracking-wider sm:tracking-widest text-[#D9C7B8] hover:text-[#DF7987] transition-colors min-h-[44px]"
              >
                <div className="flex items-center gap-2 sm:gap-3 text-left">
                  <span className="text-[#8E7C79] group-hover:text-[#DF7987] shrink-0">
                    {proj.number}
                  </span>
                  <span className="font-bold text-[#F5EBE1] group-hover:text-[#DF7987]">{proj.short_name.toUpperCase()}</span>
                  <span className="text-[10px] text-[#8E7C79] hidden md:inline tracking-normal font-sans">
                    ({proj.status})
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-xs sm:text-sm text-[#DF7987]">
                    {String(count).padStart(2, "0")}
                  </span>
                  <span className="text-[#8E7C79] group-hover:translate-x-0.5 group-hover:text-[#DF7987] transition-transform">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Category Rows with Dot Leaders */}
        <div className="w-full space-y-0.5 sm:space-y-1.5 pt-1">
          {categoryOrder.map((cat) => {
            const count = metrics.by_category[cat.key] || 0;
            if (count === 0) return null;
            const isSelected = selectedCategory === cat.key;

            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(cat.key)}
                className={`w-full group flex items-baseline justify-between py-2 sm:py-1.5 text-left text-[10px] sm:text-xs tracking-normal sm:tracking-wider transition-colors min-h-[44px] sm:min-h-0 cursor-pointer ${
                  isSelected
                    ? "text-[#DF7987] font-bold"
                    : "text-[#8E7C79] hover:text-[#F5EBE1]"
                }`}
              >
                <span className="whitespace-nowrap uppercase font-medium">
                  {cat.label}
                </span>
                <span className="flex-1 mx-1.5 sm:mx-3 border-b border-dotted border-[#3D1B24] relative top-[-3px]" />
                <span className="font-semibold whitespace-nowrap shrink-0 text-[#D9C7B8] group-hover:text-[#DF7987]">
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        <div className="w-full h-[1px] bg-[#2D161C] mt-5 sm:mt-6 mb-3" />

        <div className="flex flex-col sm:flex-row items-center justify-between w-full text-[9px] sm:text-[10px] text-[#8E7C79] uppercase tracking-wider gap-1">
          <span>SOURCE: /LAB-CONTENT/</span>
          <span className="text-[#34D399]">AUDIT: 100% EVIDENCE-BASED</span>
        </div>
      </div>
    </div>
  );
}
