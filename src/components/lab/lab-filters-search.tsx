"use client";

import React, { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
}

export function LabFiltersSearch({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categoryCounts,
  totalCount,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categories = [
    { key: "All", label: "ALL", count: totalCount },
    { key: "Architecture", label: "ARCHITECTURE", count: categoryCounts["Architecture"] || 0 },
    { key: "Debugging", label: "DEBUGGING", count: categoryCounts["Debugging"] || 0 },
    { key: "Engineering Notes", label: "ENGINEERING NOTES", count: categoryCounts["Engineering Notes"] || 0 },
    { key: "Experiments", label: "EXPERIMENTS", count: categoryCounts["Experiments"] || 0 },
    { key: "Post-Mortems", label: "POST-MORTEMS", count: categoryCounts["Post-Mortems"] || 0 },
  ];

  return (
    <div className="w-full my-6 sm:my-8 space-y-3 sm:space-y-4 font-mono text-xs">
      {/* Category Pills Row - Swipeable on mobile with edge-to-edge touch */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-x">
        <span className="text-[10px] uppercase tracking-wider text-[#8E7C79] shrink-0 mr-1 hidden sm:inline">
          DISCIPLINE:
        </span>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => onCategoryChange(cat.key)}
              className={`px-3.5 py-2 sm:py-1.5 whitespace-nowrap transition-colors border text-[11px] sm:text-xs min-h-[38px] sm:min-h-0 shrink-0 rounded-lg ${
                isSelected
                  ? "bg-[#801D2C]/20 text-[#DF7987] border-[#801D2C]/60 shadow-[0_0_12px_rgba(128,29,44,0.25)] font-semibold"
                  : "bg-[#140A0D] text-[#8E7C79] border-[#2D161C] hover:border-[#801D2C]/60 hover:text-[#F5EBE1]"
              }`}
            >
              <span>{cat.label}</span>
              <span className="ml-1 opacity-60">
                ({String(cat.count).padStart(2, "0")})
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 absolute left-3.5 text-[#8E7C79] pointer-events-none shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter archive by title, keyword, or failure mode..."
          className="w-full bg-[#140A0D] border border-[#2D161C] pl-10 pr-10 py-3 sm:py-2.5 text-base sm:text-xs text-[#F5EBE1] placeholder-[#8E7C79] focus:outline-none focus:border-[#801D2C] focus:ring-1 focus:ring-[#801D2C]/40 transition-all rounded-xl min-h-[44px]"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="absolute right-1 text-[#8E7C79] hover:text-[#DF7987] transition-colors w-10 h-10 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
