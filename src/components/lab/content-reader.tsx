"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CornerDownRight, FileText } from "lucide-react";
import { LabPiece } from "@/types/lab";
import { MarkdownRenderer } from "./markdown-renderer";
import { EvolutionaryFlowComponent } from "./evolutionary-flow";
import { getAdjacentPiecesInProject, getRelatedPieces } from "@/lib/lab";

interface Props {
  piece: LabPiece;
  isModal?: boolean;
  onClose?: () => void;
}

export function ContentReader({ piece, isModal = false, onClose }: Props) {
  const { prev, next } = getAdjacentPiecesInProject(piece);
  const { sameProject, broaderLab } = getRelatedPieces(piece, 3);

  // Distinguish evidence label subtly per user refinement #8
  const subtleConfidence =
    piece.evidence_level === "high"
      ? "DOCUMENTED / HIGH CONFIDENCE"
      : `EVIDENCE: ${piece.evidence_level.toUpperCase()}`;

  return (
    <article className="w-full max-w-4xl mx-auto bg-[#070A0F] text-[#F8FAFC]">
      {/* Top Breadcrumb / Action Bar */}
      <div className="flex items-center justify-between py-3 sm:py-4 border-b border-[#1E293B] font-mono text-[11px] sm:text-xs uppercase tracking-wider text-slate-400">
        <div className="flex items-center gap-1.5 sm:gap-2 truncate mr-2">
          <Link
            href={`/lab/${piece.project_slug}`}
            className="flex items-center gap-1 sm:gap-1.5 text-[#38BDF8] hover:underline shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="truncate">{piece.project.toUpperCase()} DOSSIER</span>
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-[#38BDF8] font-semibold shrink-0">
            #{String(piece.order).padStart(3, "0")}
          </span>
        </div>

        {isModal && onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close reader"
            className="px-2.5 py-1 bg-[#0D1117] border border-[#1E293B] hover:border-[#38BDF8] text-slate-300 transition-colors shrink-0 text-[10px] sm:text-xs min-h-[36px] flex items-center"
          >
            ESC ✕
          </button>
        )}
      </div>

      {/* Header Plate */}
      <header className="pt-6 sm:pt-8 pb-5 sm:pb-6 border-b border-[#1E293B]">
        <div className="flex flex-wrap items-center gap-2 mb-2.5 sm:mb-3">
          <span className="px-2 py-0.5 bg-[#0D1117] border border-[#1E293B] font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#38BDF8] font-semibold">
            {piece.content_type_display}
          </span>
          <span className="text-[11px] sm:text-xs font-mono text-slate-500">
            {piece.status}
          </span>
        </div>

        <h1 className="font-sans font-bold text-2xl sm:text-4xl lg:text-5xl text-[#F8FAFC] leading-tight sm:leading-[1.08] tracking-tight mb-5 sm:mb-6">
          {piece.title}
        </h1>

        {/* Technical Metadata Matrix (Subtle & Restrained) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 p-3.5 sm:p-4 bg-[#0D1117] border border-[#1E293B] font-mono text-[10px] sm:text-[11px]">
          <div>
            <div className="text-slate-500 uppercase text-[9px] tracking-widest">
              PROJECT
            </div>
            <div className="text-[#F8FAFC] font-semibold mt-0.5 truncate">
              {piece.project}
            </div>
          </div>
          <div>
            <div className="text-slate-500 uppercase text-[9px] tracking-widest">
              DATE
            </div>
            <div className="text-slate-300 font-semibold mt-0.5 truncate">
              {piece.date || "DOCUMENTED (UNDATED)"}
            </div>
          </div>
          <div>
            <div className="text-slate-500 uppercase text-[9px] tracking-widest">
              CONFIDENCE
            </div>
            <div className="text-[#38BDF8] font-semibold mt-0.5 truncate">
              {subtleConfidence}
            </div>
          </div>
          <div>
            <div className="text-slate-500 uppercase text-[9px] tracking-widest">
              SOURCE ARTIFACT
            </div>
            <div className="text-slate-400 truncate mt-0.5 font-mono" title={piece.source_file}>
              {piece.source_file_basename}
            </div>
          </div>
        </div>

        {/* Topics */}
        {piece.topics && piece.topics.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-3 sm:mt-4">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-500 mr-1">
              TOPICS:
            </span>
            {piece.topics.map((topic) => (
              <span
                key={topic}
                className="px-1.5 sm:px-2 py-0.5 bg-[#0D1117] text-slate-400 font-mono text-[9px] sm:text-[10px] tracking-wide border border-[#1E293B]"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* One-Line Summary Callout */}
      {piece.one_line_summary && (
        <section className="my-6 sm:my-8 p-4 sm:p-6 bg-[#0D1117] border-l-4 border-[#38BDF8] border-y border-r border-[#1E293B]">
          <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#38BDF8] font-semibold mb-1">
            CORE DISCOVERY · ONE-LINE SUMMARY
          </div>
          <p className="font-sans text-sm sm:text-lg text-slate-200 leading-relaxed italic">
            &ldquo;{piece.one_line_summary}&rdquo;
          </p>
        </section>
      )}

      {/* Evolutionary Flow */}
      {piece.evolutionary_flow && (
        <EvolutionaryFlowComponent
          flow={piece.evolutionary_flow}
          title="Experiment Evolution"
          subtitle="The progression from initial intent to diagnostic reality and permanent practice."
        />
      )}

      {/* Main Body: Dynamic Markdown Sections */}
      <div className="space-y-6 sm:space-y-8 my-6 sm:my-8">
        {piece.sections && piece.sections.length > 0 ? (
          piece.sections.map((section, idx) => (
            <section key={idx} className="pb-5 sm:pb-6 border-b border-[#1E293B] last:border-b-0">
              <h2 className="font-sans font-semibold tracking-tight text-xl sm:text-2xl text-[#F8FAFC] mb-2 sm:mb-3">
                {section.title}
              </h2>
              <MarkdownRenderer content={section.content} />
            </section>
          ))
        ) : (
          <MarkdownRenderer content={piece.raw_body} />
        )}
      </div>

      {/* Technical References & Anchors */}
      {piece.technical_references && piece.technical_references.length > 0 && (
        <section className="my-8 sm:my-10 p-4 sm:p-6 bg-[#0D1117] border border-[#1E293B]">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#38BDF8] font-semibold mb-3">
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>SOURCE CODE ANCHORS & TECHNICAL REFERENCES</span>
          </div>
          <div className="space-y-2 font-mono text-[11px] sm:text-xs text-slate-300">
            {piece.technical_references.map((ref, i) => (
              <div key={i} className="flex items-start gap-2">
                <CornerDownRight className="w-3 h-3 text-[#38BDF8] shrink-0 mt-0.5" />
                <code className="bg-[#070A0F] px-1.5 py-0.5 break-all border border-[#1E293B] text-[#38BDF8] leading-normal">
                  {ref}
                </code>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sequential Navigation Bar */}
      <nav className="my-8 sm:my-10 pt-5 sm:pt-6 border-t border-[#1E293B] grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {prev ? (
          <Link
            href={`/lab/${prev.project_slug}/${prev.slug}`}
            className="group p-3.5 sm:p-4 bg-[#0D1117] border border-[#1E293B] hover:border-[#38BDF8]/50 hover:bg-[#151D2A] transition-all flex flex-col justify-between min-h-[54px]"
          >
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-500 flex items-center gap-1 group-hover:text-[#38BDF8]">
              <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1 shrink-0" />
              PREVIOUS IN {piece.project.toUpperCase()}
            </span>
            <span className="font-sans font-medium text-sm sm:text-base text-[#F8FAFC] group-hover:text-[#38BDF8] line-clamp-2 mt-1">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div className="p-3.5 sm:p-4 bg-[#0D1117]/40 border border-[#1E293B] text-[9px] sm:text-[10px] font-mono text-slate-600 uppercase tracking-wider flex items-center min-h-[54px]">
            START OF {piece.project.toUpperCase()} ARCHIVE
          </div>
        )}

        {next ? (
          <Link
            href={`/lab/${next.project_slug}/${next.slug}`}
            className="group p-3.5 sm:p-4 bg-[#0D1117] border border-[#1E293B] hover:border-[#38BDF8]/50 hover:bg-[#151D2A] transition-all flex flex-col justify-between text-left sm:text-right min-h-[54px]"
          >
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-500 flex items-center sm:justify-end gap-1 group-hover:text-[#38BDF8]">
              NEXT IN {piece.project.toUpperCase()}
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1 shrink-0" />
            </span>
            <span className="font-sans font-medium text-sm sm:text-base text-[#F8FAFC] group-hover:text-[#38BDF8] line-clamp-2 mt-1">
              {next.title}
            </span>
          </Link>
        ) : (
          <div className="p-3.5 sm:p-4 bg-[#0D1117]/40 border border-[#1E293B] text-[9px] sm:text-[10px] font-mono text-slate-600 uppercase tracking-wider flex items-center justify-start sm:justify-end text-left sm:text-right min-h-[54px]">
            END OF {piece.project.toUpperCase()} ARCHIVE
          </div>
        )}
      </nav>

      {/* Related Pieces (Same Project & Broader Lab) */}
      <section className="my-10 sm:my-12 pt-6 sm:pt-8 border-t border-[#1E293B]">
        <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-slate-500 mb-5 sm:mb-6">
          RELATED RECORDS & CROSS-PROJECT CONTINUITY
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Same Project */}
          <div className="space-y-2.5 sm:space-y-3">
            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#38BDF8] font-semibold border-b border-[#1E293B] pb-1">
              MORE FROM {piece.project.toUpperCase()}
            </div>
            {sameProject.map((item) => (
              <Link
                key={item.slug}
                href={`/lab/${item.project_slug}/${item.slug}`}
                className="group block p-3 bg-[#0D1117] border border-[#1E293B] hover:border-[#38BDF8]/40 hover:bg-[#151D2A] transition-colors"
              >
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-500 mb-1">
                  <span>{item.content_type_display}</span>
                  <span>{item.status}</span>
                </div>
                <h4 className="font-sans font-medium text-xs sm:text-sm text-[#F8FAFC] group-hover:text-[#38BDF8] leading-snug">
                  {item.title}
                </h4>
              </Link>
            ))}
          </div>

          {/* Broader Lab */}
          <div className="space-y-2.5 sm:space-y-3">
            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#38BDF8] font-semibold border-b border-[#1E293B] pb-1">
              ACROSS THE BROADER LAB
            </div>
            {broaderLab.map((item) => (
              <Link
                key={item.slug}
                href={`/lab/${item.project_slug}/${item.slug}`}
                className="group block p-3 bg-[#0D1117] border border-[#1E293B] hover:border-[#38BDF8]/40 hover:bg-[#151D2A] transition-colors"
              >
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-500 mb-1">
                  <span className="font-semibold text-[#38BDF8]">
                    {item.project}
                  </span>
                  <span>{item.content_type_display}</span>
                </div>
                <h4 className="font-sans font-medium text-xs sm:text-sm text-[#F8FAFC] group-hover:text-[#38BDF8] leading-snug">
                  {item.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Top / Project Action */}
      <div className="pt-4 sm:pt-6 pb-10 sm:pb-12 text-center">
        <Link
          href={`/lab/${piece.project_slug}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#38BDF8] text-[#070A0F] font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#38BDF8]/90 transition-colors min-h-[44px]"
        >
          <span>Return to {piece.project} Dossier</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}
