import React from "react";
import Link from "next/link";
import { FailureAndLesson } from "@/types/project-case-study";

interface FailuresLessonsProps {
  failures: FailureAndLesson[];
}

export function FailuresLessons({ failures }: FailuresLessonsProps) {
  return (
    <section className="py-16 md:py-24 border-b border-white/10 bg-[#050505]">
      <div className="section-container">
        {/* Header with high visual distinction */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)] animate-pulse" />
            <span className="font-mono text-xs text-rose-400 uppercase tracking-widest font-semibold">
              10 // WHAT BROKE · EMPIRICAL FAILURES &amp; POST-MORTEMS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-sans tracking-tight">
            Failures, Bugs &amp; Root Causes
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-sans leading-relaxed max-w-3xl mt-3">
            Engineering credibility is proven by how you handle failure. These are real, documented post-mortems
            from live operation—demonstrating root-cause discovery, architectural interlocks, and lessons learned.
          </p>
        </div>

        <div className="space-y-8">
          {failures.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-6 sm:p-8 rounded-2xl border-l-4 border-l-rose-500 border-y border-r border-white/10 space-y-6 shadow-2xl relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 pb-4 border-b border-white/10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-rose-400 bg-rose-950/60 border border-rose-500/40 px-3 py-0.5 rounded-full font-semibold">
                    {item.badge || "POST-MORTEM"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                    {item.title}
                  </h3>
                </div>
                {item.verifiedEvidence && (
                  <span className="text-[11px] font-mono text-white/50">
                    Lab Report:{" "}
                    <Link
                      href={
                        item.verifiedEvidence.startsWith("lab-content/")
                          ? `/lab/${item.verifiedEvidence.replace(/^lab-content\//, "").replace(/\.md$/, "").toLowerCase()}`
                          : `/${item.verifiedEvidence.replace(/\.md$/, "")}`
                      }
                      className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
                    >
                      [{item.verifiedEvidence.split("/").pop()}]
                    </Link>
                  </span>
                )}
              </div>

              {/* The Failure & Root Cause in 2 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 bg-rose-950/20 border border-rose-500/30 rounded-xl space-y-2">
                  <span className="font-mono text-xs text-rose-400 uppercase tracking-wider block font-semibold">
                    WHAT BROKE / SYMPTOM
                  </span>
                  <p className="text-xs sm:text-sm text-white/90 font-sans leading-relaxed">
                    {item.failure}
                  </p>
                </div>

                <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl space-y-2">
                  <span className="font-mono text-xs text-amber-400 uppercase tracking-wider block font-semibold">
                    TECHNICAL ROOT CAUSE
                  </span>
                  <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                    {item.rootCause}
                  </p>
                </div>
              </div>

              {/* Attempted vs Final Fix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider block font-semibold">
                    ATTEMPTED (NAIVE) FIX
                  </span>
                  <p className="text-white/60 font-sans leading-relaxed p-4 bg-white/[0.02] border border-white/10 rounded-xl">
                    {item.attemptedFix}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block font-semibold">
                    FINAL ARCHITECTURAL RESOLUTION
                  </span>
                  <p className="text-white/90 font-sans leading-relaxed p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl">
                    {item.finalFix}
                  </p>
                </div>
              </div>

              {/* Engineering Lesson Banner */}
              <div className="p-5 bg-emerald-950/20 border border-emerald-500/40 rounded-xl flex items-start gap-3">
                <span className="font-mono text-xs text-emerald-400 shrink-0 font-bold">
                  ⚡ LESSON:
                </span>
                <p className="text-xs sm:text-sm font-sans font-medium text-white/90 leading-relaxed italic">
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
