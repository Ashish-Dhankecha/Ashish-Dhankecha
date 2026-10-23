import React from "react";
import { ProjectResearch, ProjectLesson } from "@/types/project-case-study";

interface ResearchLessonsProps {
  research: ProjectResearch;
  lessons: ProjectLesson;
}

export function ResearchLessons({ research, lessons }: ResearchLessonsProps) {
  return (
    <section className="py-16 md:py-24 border-b border-white/10 bg-black/40">
      <div className="section-container space-y-16">
        {/* ============================================================== */}
        {/* 15 — RESEARCH & EXPERIMENTS                                    */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
              15 // RESEARCH DIRECTIONS &amp; EMPIRICAL EXPERIMENTS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-sans tracking-tight">
            {research.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 shadow-xl">
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider block font-semibold">
                [ VERIFIED WORKING ENGINEERING ]
              </span>
              <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                {research.existingEngineering}
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 shadow-xl">
              <span className="font-mono text-xs text-amber-400 uppercase tracking-wider block font-semibold">
                [ EXPERIMENTAL HYPOTHESES (UNVALIDATED) ]
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/70 font-sans">
                {research.experimentalDirections.map((dir, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-mono">→</span>
                    <span>{dir}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {research.potentialContributions.length > 0 && (
            <div className="p-6 mt-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider block font-semibold">
                [ CANDIDATE RESEARCH CONTRIBUTIONS ]
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-white/90 font-sans">
                {research.potentialContributions.map((cont, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono">★</span>
                    <span>{cont}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {research.unimplementedClaimsNotes && (
            <div className="p-4 mt-4 bg-amber-950/20 border border-amber-500/30 rounded-xl text-xs font-mono text-amber-300">
              <span className="font-bold">HONESTY NOTICE: </span>
              {research.unimplementedClaimsNotes}
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* 16 — WHAT I LEARNED                                            */}
        {/* ============================================================== */}
        <div className="pt-14 border-t border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
              16 // WHAT THIS PROJECT TAUGHT ME
            </span>
          </div>

          <div className="p-6 sm:p-8 bg-emerald-950/20 border-l-4 border-emerald-500 rounded-r-2xl border-y border-r border-white/10 mb-10 shadow-xl">
            <p className="text-lg sm:text-2xl font-sans font-medium text-white italic leading-relaxed">
              &ldquo;{lessons.quote}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {lessons.takeaways.map((item, idx) => (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 shadow-xl hover:border-emerald-500/40 hover:bg-white/[0.03] transition-all"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold">
                  <span>TAKEAWAY 0{idx + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-white font-sans">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed pt-1">
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
