"use client";

import React, { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import Link from "next/link";
import { LabPiece } from "@/types/lab";
import { ContentReader } from "./content-reader";

interface Props {
  piece: LabPiece | null;
  onClose: () => void;
}

export function ContentReaderModal({ piece, onClose }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (piece) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [piece, onClose]);

  if (!piece) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={piece.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 bg-[var(--bg)]/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-5xl h-full sm:h-auto max-h-full sm:max-h-[92vh] flex flex-col bg-[var(--bg)] border-0 sm:border border-[var(--line)] shadow-[0_0_80px_rgba(0,0,0,0.9)] sm:rounded-2xl overflow-hidden"
      >
        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 border-b border-[var(--line)] bg-[var(--panel)] font-mono text-xs text-[var(--muted)] shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-3 truncate mr-2">
            <span className="text-[var(--accent-brass)] font-semibold truncate text-[10px] sm:text-xs">
              LAB ARCHIVE
            </span>
            <span className="text-[var(--border-subtle)]">|</span>
            <span className="text-[var(--ink)] text-[10px] sm:text-xs truncate">
              {piece.project.toUpperCase()} · #{String(piece.order).padStart(3, "0")}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Link
              href={`/lab/${piece.project_slug}/${piece.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-[var(--muted)] hover:text-[var(--accent-brass)] uppercase transition-colors p-1.5 min-h-[44px]"
            >
              <span className="hidden xs:inline">FULL PAGE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[var(--border-subtle)]">|</span>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1 text-[11px] text-[var(--muted)] hover:text-[var(--accent-brass)] uppercase font-semibold transition-colors py-2 px-2.5 -mr-1 min-h-[44px] min-w-[44px] justify-center"
            >
              <X className="w-4 h-4" />
              <span>CLOSE</span>
            </button>
          </div>
        </div>

        {/* Scrollable Reader Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10">
          <ContentReader piece={piece} isModal onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
