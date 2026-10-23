"use client";

import React, { useState } from "react";
import { TimelineEvent } from "@/types/project-case-study";

interface ProjectTimelineProps {
  timeline: TimelineEvent[];
}

export function ProjectTimeline({ timeline }: ProjectTimelineProps) {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const activeEvent = timeline[activePhaseIndex] || timeline[0];

  return (
    <section className="py-16 md:py-24 border-b border-white/10 bg-[#050505]">
      <div className="section-container">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
              11 // SYSTEM EVOLUTION &amp; ITERATION TIMELINE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-sans tracking-tight">
            Iterative Development History
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-sans leading-relaxed max-w-3xl mt-3">
            Systems evolve through empirical feedback loops. Select any phase below to inspect what changed,
            the architectural rationale, and the concrete result.
          </p>
        </div>

        {/* Timeline Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {timeline.map((event, idx) => {
            const isActive = activePhaseIndex === idx;
            return (
              <button
                key={event.phase}
                type="button"
                onClick={() => setActivePhaseIndex(idx)}
                className={`p-4 text-left rounded-xl border transition-all text-xs font-mono space-y-1.5 ${
                  isActive
                    ? "bg-emerald-950/40 border-emerald-500 text-white shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-500/50"
                    : "bg-white/[0.02] border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.04] text-white/70"
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-emerald-400 font-bold">
                    {event.phase}
                  </span>
                  <span className="text-white/40">{event.date}</span>
                </div>
                <div className="font-bold text-white truncate font-sans text-sm">
                  {event.title}
                </div>
                <div className="text-[10px] text-emerald-400 font-medium">
                  {isActive ? "● VIEWING" : "SELECT →"}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Deep Dive Detail Card */}
        {activeEvent && (
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-5 border-b border-white/10">
              <div>
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider block mb-1 font-semibold">
                  {activeEvent.phase} · {activeEvent.date}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                  {activeEvent.title}
                </h3>
              </div>
              <span className="font-mono text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-500/40 px-3.5 py-1 rounded-full shrink-0">
                STATUS: {activeEvent.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm font-sans">
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block font-semibold">
                    WHAT CHANGED IN THE CODEBASE
                  </span>
                  <p className="text-white/90 leading-relaxed">
                    {activeEvent.whatChanged}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider block font-semibold">
                    ARCHITECTURAL RATIONALE (WHY)
                  </span>
                  <p className="text-white/60 leading-relaxed">
                    {activeEvent.why}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider block font-semibold">
                    CONCRETE IMPLEMENTATION
                  </span>
                  <p className="text-white/60 leading-relaxed">
                    {activeEvent.implementation}
                  </p>
                </div>

                <div className="p-5 bg-emerald-950/20 border-l-2 border-emerald-500 rounded-r-xl border-y border-r border-white/10 space-y-1.5">
                  <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block font-semibold">
                    MEASURED RESULT
                  </span>
                  <p className="text-white/90 leading-relaxed font-medium">
                    {activeEvent.result}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
