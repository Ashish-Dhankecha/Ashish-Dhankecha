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
    <section className="py-16 md:py-20 border-b border-[var(--line)]">
      <div className="section-container">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
              11 // SYSTEM EVOLUTION &amp; ITERATION TIMELINE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ink)] font-sans tracking-tight">
            Iterative Development History
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] font-body leading-relaxed max-w-3xl mt-2">
            Systems evolve through empirical feedback loops. Select any phase below to inspect what changed,
            the architectural rationale, and the concrete result.
          </p>
        </div>

        {/* Timeline Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
          {timeline.map((event, idx) => {
            const isActive = activePhaseIndex === idx;
            return (
              <button
                key={event.phase}
                type="button"
                onClick={() => setActivePhaseIndex(idx)}
                className={`p-3 text-left rounded-sm border transition-all text-xs font-mono space-y-1 ${
                  isActive
                    ? "bg-[var(--accent-enamel)]/40 border-[var(--accent-brass)] shadow-md ring-1 ring-[var(--accent-brass)]"
                    : "bg-[var(--panel)] border-[var(--line)] hover:border-[var(--accent-brass)]/50"
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[var(--accent-brass)] font-bold">
                    {event.phase}
                  </span>
                  <span className="text-[var(--muted)]">{event.date}</span>
                </div>
                <div className="font-bold text-[var(--ink)] truncate font-sans">
                  {event.title}
                </div>
                <div className="text-[10px] text-[var(--accent-gold)]">
                  {isActive ? "● VIEWING" : "SELECT →"}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Deep Dive Detail Card */}
        {activeEvent && (
          <div className="brutal-card p-6 sm:p-8 rounded-sm border-[var(--border-strong)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-4 border-b border-[var(--line)]">
              <div>
                <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-wider block mb-1">
                  {activeEvent.phase} · {activeEvent.date}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] font-sans">
                  {activeEvent.title}
                </h3>
              </div>
              <span className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1 rounded-sm shrink-0">
                STATUS: {activeEvent.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm font-body">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-[var(--accent-gold)] uppercase tracking-wider block">
                    WHAT CHANGED IN THE CODEBASE
                  </span>
                  <p className="text-[var(--ink)] leading-relaxed">
                    {activeEvent.whatChanged}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-[var(--accent-brass)] uppercase tracking-wider block">
                    ARCHITECTURAL RATIONALE (WHY)
                  </span>
                  <p className="text-[var(--muted)] leading-relaxed">
                    {activeEvent.why}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-[var(--accent-brass)] uppercase tracking-wider block">
                    CONCRETE IMPLEMENTATION
                  </span>
                  <p className="text-[var(--muted)] leading-relaxed">
                    {activeEvent.implementation}
                  </p>
                </div>

                <div className="p-4 bg-[var(--accent-enamel)]/30 border-l-2 border-[var(--accent-brass)] rounded-r-sm space-y-1">
                  <span className="font-mono text-[10px] text-[var(--accent-gold)] uppercase tracking-wider block">
                    MEASURED RESULT
                  </span>
                  <p className="font-bold text-[var(--ink)] font-sans text-xs sm:text-sm">
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
