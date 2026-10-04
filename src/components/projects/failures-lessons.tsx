import React from "react";
import Link from "next/link";
import { FailureAndLesson } from "@/types/project-case-study";

interface FailuresLessonsProps {
  failures: FailureAndLesson[];
}

export function FailuresLessons({ failures }: FailuresLessonsProps) {
  return (
    <section className="py-16 md:py-20 border-b border-[var(--line)] bg-black/40">
      <div className="section-container">
        {/* Header with high visual distinction */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]" />
            <span className="font-mono text-xs text-rose-400 uppercase tracking-widest font-semibold">
              10 // WHAT BROKE · EMPIRICAL FAILURES &amp; POST-MORTEMS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ink)] font-sans tracking-tight">
            Failures, Bugs &amp; Root Causes
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] font-body leading-relaxed max-w-3xl mt-2">
            Engineering credibility is proven by how you handle failure. These are real, documented post-mortems
            from live operation—demonstrating root-cause discovery, architectural interlocks, and lessons learned.
          </p>
        </div>

        <div className="space-y-6">
          {failures.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-6 md:p-8 bg-[var(--panel)] border-l-4 border-l-rose-500 border-y border-r border-[var(--border-strong)] rounded-r-sm space-y-5 shadow-lg relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-3 border-b border-[var(--line)]">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-[11px] text-rose-400 bg-rose-950/50 border border-rose-800/60 px-2 py-0.5 rounded-sm font-semibold">
                    {item.badge || "POST-MORTEM"}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--ink)] font-sans">
                    {item.title}
                  </h3>
                </div>
                {item.verifiedEvidence && (
                  <span className="text-[11px] font-mono text-[var(--muted)]">
                    Lab Report:{" "}
                    <Link
                      href={`/${item.verifiedEvidence.replace(/\.md$/, "")}`}
                      className="text-[var(--accent-brass)] hover:underline"
                    >
                      [{item.verifiedEvidence.split("/").pop()}]
                    </Link>
                  </span>
                )}
              </div>

              {/* The Failure & Root Cause in 2 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-4 bg-[var(--bg)]/90 border border-rose-900/30 rounded-sm space-y-1.5">
                  <span className="font-mono text-[10px] text-rose-400 uppercase tracking-wider block font-semibold">
                    WHAT BROKE / SYMPTOM
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--ink)] font-body leading-relaxed">
                    {item.failure}
                  </p>
                </div>

                <div className="p-4 bg-[var(--bg)]/90 border border-[var(--line)] rounded-sm space-y-1.5">
                  <span className="font-mono text-[10px] text-[var(--accent-gold)] uppercase tracking-wider block font-semibold">
                    TECHNICAL ROOT CAUSE
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed">
                    {item.rootCause}
                  </p>
                </div>
              </div>

              {/* Attempted vs Final Fix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-wider block">
                    ATTEMPTED (NAIVE) FIX
                  </span>
                  <p className="text-[var(--muted)] font-body leading-relaxed p-3 bg-[var(--bg)]/40 border border-[var(--line)] rounded-sm">
                    {item.attemptedFix}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block font-semibold">
                    FINAL ARCHITECTURAL RESOLUTION
                  </span>
                  <p className="text-[var(--ink)] font-body leading-relaxed p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-sm">
                    {item.finalFix}
                  </p>
                </div>
              </div>

              {/* Engineering Lesson Banner */}
              <div className="p-4 bg-[var(--accent-enamel)]/20 border-t border-[var(--accent-brass)]/40 rounded-sm flex items-start gap-3">
                <span className="font-mono text-sm text-[var(--accent-brass)] shrink-0 font-bold">
                  ⚡ LESSON:
                </span>
                <p className="text-xs sm:text-sm font-sans font-medium text-[var(--ink)] leading-relaxed italic">
                  &ldquo;{item.lesson}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
