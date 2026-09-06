"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  GitBranch,
} from "lucide-react";
import { LabProject, LabPiece } from "@/types/lab";
import { EvolutionaryFlowComponent } from "./evolutionary-flow";

interface Props {
  project: LabProject;
  pieces: LabPiece[];
  isStandalonePage?: boolean;
}

export function ProjectDossierView({
  project,
  pieces,
  isStandalonePage = false,
}: Props) {
  const [selectedType, setSelectedType] = useState<string>("ALL");

  const availableTypes = [
    "ALL",
    ...Array.from(new Set(pieces.map((p) => p.category_group))),
  ];

  const filteredPieces =
    selectedType === "ALL"
      ? pieces
      : pieces.filter((p) => p.category_group === selectedType);

  return (
    <div
      id={`project-${project.id}`}
      className="w-full bg-[#070A0F] text-[#F8FAFC]"
    >
      {/* Back to Lab Link if standalone */}
      {isStandalonePage && (
        <div className="py-3 sm:py-4 border-b border-[#1E293B] font-mono text-[11px] sm:text-xs uppercase tracking-wider text-slate-400">
          <Link
            href="/lab"
            className="inline-flex items-center gap-1.5 text-[#38BDF8] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO ARCHIVE INDEX</span>
          </Link>
        </div>
      )}

      {/* Project Dossier Header Plate */}
      <header className="pt-6 sm:pt-8 pb-8 sm:pb-10 border-b border-[#1E293B]">
        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-slate-400 mb-2 sm:mb-3 flex-wrap">
          <span className="text-[#38BDF8] font-semibold">
            PROJECT DOSSIER / {project.number}
          </span>
          <span className="w-5 sm:w-6 h-[1px] bg-[#1E293B]" />
          <span className="px-2 py-0.5 bg-[#0D1117] border border-[#1E293B] text-[9px] sm:text-[10px] text-[#38BDF8]">
            {project.status}
          </span>
        </div>

        <h1 className="font-sans font-bold tracking-tight text-2xl sm:text-4xl lg:text-5xl text-[#F8FAFC] leading-tight mb-3 sm:mb-4">
          {project.name}
        </h1>

        <p className="font-sans text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl leading-relaxed mb-6 sm:mb-8">
          {project.problem_statement}
        </p>

        {/* Dynamic Project Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 p-3.5 sm:p-5 bg-[#0D1117] border border-[#1E293B] font-mono text-[10px] sm:text-xs">
          <div>
            <div className="text-[9px] text-slate-500 uppercase tracking-widest">
              DOCUMENTED PERIOD
            </div>
            <div className="text-[#F8FAFC] font-semibold mt-0.5 sm:mt-1 truncate">
              {project.documented_period}
            </div>
          </div>
          <div>
            <div className="text-[9px] text-slate-500 uppercase tracking-widest">
              INGESTED RECORDS
            </div>
            <div className="text-[#38BDF8] font-bold mt-0.5 sm:mt-1 truncate">
              {String(pieces.length).padStart(2, "0")} PIECES
            </div>
          </div>
          <div>
            <div className="text-[9px] text-slate-500 uppercase tracking-widest">
              STATUS
            </div>
            <div className="text-slate-200 font-medium mt-0.5 sm:mt-1 truncate">
              {project.status}
            </div>
          </div>
          <div>
            <div className="text-[9px] text-slate-500 uppercase tracking-widest">
              PRIMARY STACK
            </div>
            <div className="text-slate-300 truncate mt-0.5 sm:mt-1" title={project.technologies.join(", ")}>
              {project.technologies.slice(0, 3).join(", ")}
            </div>
          </div>
        </div>
      </header>

      {/* Project Story & Forensic Trajectory */}
      <section className="my-8 sm:my-10 p-5 sm:p-8 bg-[#0D1117] border border-[#1E293B]">
        <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-[#38BDF8] font-semibold mb-1.5 sm:mb-2">
          SYNTHESIS · AUTHENTIC PROJECT TRAJECTORY
        </div>
        <h2 className="font-sans text-xl sm:text-2xl text-[#F8FAFC] font-semibold tracking-tight mb-3 sm:mb-4">
          The Reality of What Was Built
        </h2>
        <p className="font-sans text-xs sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          {project.project_story}
        </p>
      </section>

      {/* Evidence-based Chronology: DOCUMENTED vs SEQUENCE */}
      <section className="my-8 sm:my-10 border border-[#1E293B] bg-[#0D1117] p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5 sm:gap-2 border-b border-[#1E293B] pb-3 sm:pb-4 mb-5 sm:mb-6">
          <div>
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-[#38BDF8] font-semibold">
              EVIDENCE-BASED CHRONOLOGY
            </div>
            <h3 className="font-sans text-xl sm:text-2xl text-[#F8FAFC] font-semibold tracking-tight mt-0.5 sm:mt-1">
              Documented Dates vs. Experimental Sequence
            </h3>
          </div>
          <div className="text-[10px] sm:text-xs font-mono text-slate-500">
            NO FABRICATED TIMELINES
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Column 1: DOCUMENTED CALENDAR MILESTONES */}
          <div className="space-y-3.5 sm:space-y-4">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-slate-200 font-semibold border-b border-[#1E293B] pb-2">
              <Calendar className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
              <span>DOCUMENTED (VERIFIED CALENDAR DATES)</span>
            </div>
            <div className="space-y-2.5 sm:space-y-3">
              {project.documented_milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-3.5 bg-[#070A0F] border border-[#1E293B] font-mono text-xs"
                >
                  <div className="flex items-center justify-between text-[#38BDF8] font-semibold mb-1">
                    <span>{m.date}</span>
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider">
                      VERIFIED
                    </span>
                  </div>
                  <div className="font-sans text-xs font-medium text-[#F8FAFC] mb-1">
                    {m.label}
                  </div>
                  <div className="font-sans text-[11px] text-slate-400 leading-relaxed">
                    {m.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: LOGICAL SEQUENCE OF EXPERIMENTS */}
          <div className="space-y-3.5 sm:space-y-4">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-slate-200 font-semibold border-b border-[#1E293B] pb-2">
              <GitBranch className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
              <span>SEQUENCE (LOGICAL EXPERIMENTAL FLOW)</span>
            </div>
            <div className="space-y-2.5 sm:space-y-3">
              {project.logical_sequence.map((seq, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-3.5 bg-[#070A0F] border border-[#1E293B] font-mono text-xs"
                >
                  <div className="flex items-center justify-between text-slate-400 font-semibold mb-1">
                    <span className="text-[#38BDF8]">STAGE {seq.step}</span>
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider">
                      PROGRESSION
                    </span>
                  </div>
                  <div className="font-sans text-xs font-medium text-[#F8FAFC] mb-1">
                    {seq.title}
                  </div>
                  <div className="font-sans text-[11px] text-slate-400 leading-relaxed">
                    {seq.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project-Level "What Changed" Evolutionary Flow */}
      <EvolutionaryFlowComponent
        flow={project.evolutionary_flow}
        title={`${project.short_name} Architectural Evolution`}
        subtitle="The progression from initial ambition through empirical reality into disciplined invariants."
      />

      {/* Cross-Project Relationships */}
      {project.cross_project_connections &&
        project.cross_project_connections.length > 0 && (
          <section className="my-8 sm:my-10 p-4 sm:p-6 bg-[#0D1117] border border-[#1E293B]">
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-[#38BDF8] font-semibold mb-1.5 sm:mb-2">
              CROSS-PROJECT LINEAGE & INTELLECTUAL CONTINUITY
            </div>
            <h3 className="font-sans text-lg sm:text-xl text-[#F8FAFC] font-semibold mb-3 sm:mb-4">
              How {project.short_name} Informed the Other Systems
            </h3>
            <ul className="space-y-2 font-sans text-xs sm:text-sm text-slate-300">
              {project.cross_project_connections.map((conn, idx) => (
                <li key={idx} className="flex items-start gap-2 sm:gap-2.5">
                  <span className="font-mono text-xs text-[#38BDF8] font-semibold mt-0.5">
                    ↳
                  </span>
                  <span>{conn}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

      {/* Project Pieces Catalog & Filter */}
      <section className="my-8 sm:my-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-[#1E293B] pb-3 sm:pb-4 mb-5 sm:mb-6">
          <div>
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-[#38BDF8] font-semibold">
              DOCUMENTED EXPERIMENTS & DECISIONS
            </div>
            <h3 className="font-sans text-xl sm:text-2xl text-[#F8FAFC] font-semibold tracking-tight mt-0.5 sm:mt-1">
              {project.short_name} Archive Records
            </h3>
          </div>

          {/* Filter Pills Row with Mobile Horizontal Swipe */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-x font-mono text-[11px]">
            {availableTypes.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedType(cat)}
                className={`px-3 py-1.5 sm:py-1 transition-colors uppercase whitespace-nowrap min-h-[36px] sm:min-h-0 shrink-0 border ${
                  selectedType === cat
                    ? "bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/50 font-semibold shadow-[0_0_12px_rgba(56,189,248,0.15)]"
                    : "bg-[#0D1117] text-slate-400 border-[#1E293B] hover:border-[#38BDF8]/40 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pieces List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredPieces.map((piece) => {
            const subtleConfidence =
              piece.evidence_level === "high"
                ? "DOCUMENTED / HIGH CONFIDENCE"
                : `EVIDENCE: ${piece.evidence_level.toUpperCase()}`;

            return (
              <Link
                key={piece.slug}
                href={`/lab/${piece.project_slug}/${piece.slug}`}
                className="group block p-4 sm:p-6 bg-[#0D1117] border border-[#1E293B] hover:border-[#38BDF8]/50 hover:bg-[#151D2A] transition-all"
              >
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px] text-slate-400 mb-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="font-semibold text-[#38BDF8]">
                      #{String(piece.order).padStart(3, "0")}
                    </span>
                    <span className="px-1.5 py-0.5 bg-[#070A0F] border border-[#1E293B] text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400">
                      {piece.content_type_display}
                    </span>
                    <span>{piece.status}</span>
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500 truncate">
                    {subtleConfidence}
                  </div>
                </div>

                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div>
                    <h4 className="font-sans text-base sm:text-lg font-semibold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors leading-snug mb-1.5 sm:mb-2">
                      {piece.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                      {piece.one_line_summary}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-[#38BDF8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 mt-1" />
                </div>

                {piece.topics && piece.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-[#1E293B]">
                    {piece.topics.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] sm:text-[10px] font-mono text-slate-500"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
