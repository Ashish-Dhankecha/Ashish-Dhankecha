import React from "react";
import { ProjectCurrentState, ProjectNext } from "@/types/project-case-study";

interface CurrentStateNextProps {
  currentState: ProjectCurrentState;
  next: ProjectNext;
}

export function CurrentStateNext({
  currentState,
  next,
}: CurrentStateNextProps) {
  const statusColors = {
    ACTIVE: "text-emerald-400 bg-emerald-950/40 border-emerald-500/40",
    MAINTAINED: "text-cyan-400 bg-cyan-950/40 border-cyan-500/40",
    EXPERIMENTAL: "text-amber-400 bg-amber-950/40 border-amber-500/40",
    ARCHIVED: "text-zinc-400 bg-zinc-900/60 border-zinc-700/50",
    SUPERSEDED: "text-amber-300 bg-amber-950/30 border-amber-600/40",
  }[currentState.status];

  return (
    <section className="py-16 md:py-24 border-b border-white/10 bg-[#050505]">
      <div className="section-container space-y-16">
        {/* ============================================================== */}
        {/* 17 — CURRENT STATE                                             */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
              17 // CURRENT STATE &amp; PRODUCTION STATUS
            </span>
            <span
              className={`font-mono text-xs uppercase px-3.5 py-1 rounded-full border font-semibold flex items-center gap-1.5 ${statusColors}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {currentState.status}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-sans tracking-tight mb-4">
            Honest Status Assessment
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-sans leading-relaxed max-w-3xl mb-10">
            {currentState.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What Works */}
            <div className="glass-card p-6 sm:p-7 rounded-2xl border border-white/10 space-y-4 shadow-xl">
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider block font-semibold">
                ✓ WHAT CURRENTLY WORKS &amp; PASSES TESTS
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/90 font-sans">
                {currentState.whatWorks.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-mono mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What is Incomplete / Unfinished */}
            <div className="glass-card p-6 sm:p-7 rounded-2xl border border-white/10 space-y-4 shadow-xl">
              <span className="font-mono text-xs text-amber-400 uppercase tracking-wider block font-semibold">
                ⚠ WHAT IS INCOMPLETE OR DEFERRED
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/60 font-sans">
                {currentState.whatIsIncomplete.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-amber-400 font-mono mt-0.5">⚠</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Remains to be Done */}
            {currentState.whatRemains.length > 0 && (
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <span className="font-mono text-xs text-white/50 uppercase tracking-wider block font-semibold">
                  [ LONG-HORIZON WORK REMAINING ]
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-white/70 font-sans">
                  {currentState.whatRemains.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-mono">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What I Would Change Today */}
            {currentState.whatIWouldChangeToday.length > 0 && (
              <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider block font-semibold">
                  [ HINDSIGHT: WHAT I WOULD CHANGE TODAY ]
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-white/90 font-sans italic">
                  {currentState.whatIWouldChangeToday.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-mono not-italic">⚡</span>
                      <span>&ldquo;{item}&rdquo;</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 18 — WHAT'S NEXT                                               */}
        {/* ============================================================== */}
        <div className="pt-14 border-t border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
              18 // WHAT&apos;S NEXT · FUTURE PLANS
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans mb-3">
            Documented Future Directions
          </h3>

          <div className="text-xs font-mono text-amber-300 mb-8 bg-amber-950/20 p-3.5 rounded-xl border border-amber-500/30 inline-block">
            ⚠ {next.statusNotice}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {next.items.map((item, idx) => (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between shadow-xl hover:border-emerald-500/40 hover:bg-white/[0.03] transition-all"
              >
                <div className="space-y-2.5">
                  <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider block font-semibold">
                    [{item.type}]
                  </span>
                  <h4 className="font-bold text-base text-white font-sans">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 font-mono text-[10px] text-white/40">
                  <span>UNIMPLEMENTED SPECIFICATION</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
