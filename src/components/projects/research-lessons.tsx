import React from "react";
import { ProjectResearch, ProjectLesson } from "@/types/project-case-study";

interface ResearchLessonsProps {
  research: ProjectResearch;
  lessons: ProjectLesson;
}

export function ResearchLessons({ research, lessons }: ResearchLessonsProps) {
  return (
    <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--panel)]/20">
      <div className="section-container space-y-16">
        {/* ============================================================== */}
        {/* 15 — RESEARCH & EXPERIMENTS                                    */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
              15 // RESEARCH DIRECTIONS &amp; EMPIRICAL EXPERIMENTS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ink)] font-sans tracking-tight">
            {research.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-5 bg-[var(--panel)] border border-[var(--line)] rounded-sm space-y-3">
              <span className="font-mono text-[11px] text-emerald-400 uppercase tracking-wider block font-semibold">
                [ VERIFIED WORKING ENGINEERING ]
              </span>
              <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed">
                {research.existingEngineering}
              </p>
            </div>

            <div className="p-5 bg-[var(--panel)] border border-[var(--line)] rounded-sm space-y-3">
              <span className="font-mono text-[11px] text-[var(--accent-gold)] uppercase tracking-wider block font-semibold">
                [ EXPERIMENTAL HYPOTHESES (UNVALIDATED) ]
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-[var(--muted)] font-body">
                {research.experimentalDirections.map((dir, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[var(--accent-gold)] font-mono">→</span>
                    <span>{dir}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {research.potentialContributions.length > 0 && (
            <div className="p-5 mt-4 bg-[var(--bg)]/80 border border-[var(--line)] rounded-sm space-y-2">
              <span className="font-mono text-[10px] text-[var(--accent-brass)] uppercase tracking-wider block">
                [ CANDIDATE RESEARCH CONTRIBUTIONS ]
              </span>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--ink)] font-sans">
                {research.potentialContributions.map((cont, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-2">
                    <span className="text-[var(--accent-brass)] font-mono">★</span>
                    <span>{cont}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {research.unimplementedClaimsNotes && (
            <div className="p-3.5 mt-3 bg-amber-950/20 border border-amber-800/40 rounded-sm text-xs font-mono text-amber-300">
              <span className="font-bold">HONESTY NOTICE: </span>
              {research.unimplementedClaimsNotes}
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* 16 — WHAT I LEARNED                                            */}
        {/* ============================================================== */}
        <div className="pt-12 border-t border-[var(--line)]">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
              16 // WHAT THIS PROJECT TAUGHT ME
            </span>
          </div>

          <div className="p-6 sm:p-8 bg-[var(--accent-enamel)]/20 border-l-4 border-[var(--accent-brass)] rounded-r-sm mb-8">
            <p className="text-base sm:text-xl font-sans font-medium text-[var(--ink)] italic leading-relaxed">
              &ldquo;{lessons.quote}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {lessons.takeaways.map((item, idx) => (
              <div
                key={idx}
                className="brutal-card p-5 sm:p-6 rounded-sm space-y-2"
              >
                <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--accent-brass)] font-bold">
                  <span>TAKEAWAY 0{idx + 1}</span>
                </div>
                <h3 className="text-base font-bold text-[var(--ink)] font-sans">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed pt-1">
                  {item.insight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
