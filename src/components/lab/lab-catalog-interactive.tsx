"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { LabFiltersSearch } from "./lab-filters-search";
import { ContentReaderModal } from "./content-reader-modal";
import { LabPiece, LabMetrics } from "@/types/lab";
import { getLabPieceBySlug } from "@/lib/lab";

interface Props {
  initialPieces: LabPiece[];
  metrics: LabMetrics;
}

export function LabCatalogInteractive({ initialPieces, metrics }: Props) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePiece, setActivePiece] = useState<LabPiece | null>(null);

  // Sync with URL search params (e.g. ?piece=slug)
  useEffect(() => {
    const pieceSlug = searchParams?.get("piece") || searchParams?.get("slug");
    if (pieceSlug) {
      const match = getLabPieceBySlug(pieceSlug);
      if (match) {
        setActivePiece(match);
      }
    }
  }, [searchParams]);

  // Filter pieces by category and search query
  const filteredPieces = useMemo(() => {
    return initialPieces.filter((piece) => {
      // Category match
      if (selectedCategory !== "All" && piece.category_group !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = piece.title.toLowerCase().includes(q);
        const inSummary = piece.one_line_summary.toLowerCase().includes(q);
        const inTopics = piece.topics.some((t) => t.toLowerCase().includes(q));
        const inProject = piece.project.toLowerCase().includes(q);
        const inType = piece.content_type_display.toLowerCase().includes(q);
        return inTitle || inSummary || inTopics || inProject || inType;
      }
      return true;
    });
  }, [initialPieces, selectedCategory, searchQuery]);

  const handleOpenPiece = (piece: LabPiece) => {
    setActivePiece(piece);
    const url = new URL(window.location.href);
    url.searchParams.set("piece", piece.slug);
    window.history.pushState({}, "", url.toString());
  };

  const handleCloseModal = () => {
    setActivePiece(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("piece");
    url.searchParams.delete("slug");
    window.history.pushState({}, "", url.toString());
  };

  return (
    <section id="archive-catalog" className="my-10 sm:my-16 pt-6 sm:pt-10 border-t border-[var(--line)]">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--line)] pb-3 sm:pb-4 mb-4 sm:mb-6">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--accent-brass)] font-semibold">
            COMPLETE TECHNICAL RECORD · {metrics.total_pieces} PIECES
          </div>
          <h2 className="font-sans text-xl sm:text-3xl text-[var(--ink)] font-semibold tracking-tight mt-0.5 sm:mt-1">
            Forensic Archive Records
          </h2>
        </div>
        <div className="font-mono text-[11px] sm:text-xs text-[var(--muted)]">
          SHOWING{" "}
          <span className="text-[var(--accent-brass)] font-semibold">
            {String(filteredPieces.length).padStart(2, "0")}
          </span>{" "}
          OF {String(metrics.total_pieces).padStart(2, "0")} RECORDS
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <LabFiltersSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categoryCounts={metrics.by_category}
        totalCount={metrics.total_pieces}
      />

      {/* Pieces Grid / List */}
      {filteredPieces.length === 0 ? (
        <div className="p-8 sm:p-12 text-center bg-[var(--panel)] border border-[var(--line)] rounded-xl font-mono text-xs text-[var(--muted)]">
          NO ARCHIVE PIECES MATCH YOUR CURRENT FILTER CRITERIA.
          <div className="mt-4">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 bg-[var(--accent-brass)] hover:bg-[var(--accent-brass-hover)] text-[var(--ink)] border border-[var(--accent-brass-hover)] font-bold uppercase tracking-wider rounded-lg transition-colors min-h-[44px]"
            >
              RESET FILTERS
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {filteredPieces.map((piece) => {
            const subtleConfidence =
              piece.evidence_level === "high"
                ? "DOCUMENTED / HIGH CONFIDENCE"
                : `EVIDENCE: ${piece.evidence_level.toUpperCase()}`;

            return (
              <div
                key={piece.slug}
                onClick={() => handleOpenPiece(piece)}
                className="group cursor-pointer p-4 sm:p-6 bg-[var(--panel)] border border-[var(--line)] hover:border-[var(--accent-brass)] hover:bg-[var(--panel-hover)] rounded-xl transition-all flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              >
                <div>
                  {/* Card Eyebrow */}
                  <div className="flex items-center justify-between font-mono text-[10px] text-[var(--muted)] mb-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <span className="font-semibold text-[var(--accent-brass)]">
                        {piece.project.toUpperCase()}
                      </span>
                      <span className="text-[var(--border-subtle)]">·</span>
                      <span className="px-2 py-0.5 bg-[var(--bg)] border border-[var(--line)] rounded uppercase text-[9px] sm:text-[10px] text-[var(--muted)]">
                        {piece.content_type_display}
                      </span>
                    </div>
                    <span className="text-[var(--muted)] shrink-0">
                      #{String(piece.order).padStart(3, "0")}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-sans text-base sm:text-lg font-semibold text-[var(--ink)] group-hover:text-[var(--accent-brass)] transition-colors leading-snug mb-2">
                    {piece.title}
                  </h3>

                  {/* One-Line Summary */}
                  <p className="font-sans text-xs sm:text-sm text-[var(--muted)] line-clamp-2 leading-relaxed mb-4">
                    {piece.one_line_summary}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between font-mono text-[10px] text-[var(--muted)] gap-2">
                  <span className="truncate">{subtleConfidence}</span>
                  <span className="text-[var(--accent-brass)] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                    READ →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Reader */}
      <ContentReaderModal piece={activePiece} onClose={handleCloseModal} />
    </section>
  );
}
