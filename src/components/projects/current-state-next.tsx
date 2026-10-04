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
    ACTIVE: "text-emerald-400 bg-emerald-950/40 border-emerald-800/60",
    MAINTAINED: "text-[var(--accent-gold)] bg-[var(--accent-enamel)]/40 border-[var(--accent-brass)]/60",
    EXPERIMENTAL: "text-amber-400 bg-amber-950/40 border-amber-800/60",
    ARCHIVED: "text-zinc-400 bg-zinc-900/60 border-zinc-700/50",
    SUPERSEDED: "text-amber-300 bg-amber-950/30 border-amber-700/50",
  }[currentState.status];

  return (
    <section className="py-16 md:py-20 border-b border-[var(--line)]">
      <div className="section-container space-y-16">
        {/* ============================================================== */}
        {/* 17 — CURRENT STATE                                             */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
              17 // CURRENT STATE &amp; PRODUCTION STATUS
            </span>
            <span
              className={`font-mono text-xs uppercase px-3 py-1 rounded-sm border font-semibold ${statusColors}`}
            >
              ● {currentState.status}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ink)] font-sans tracking-tight mb-3">
            Honest Status Assessment
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] font-body leading-relaxed max-w-3xl mb-8">
            {currentState.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What Works */}
            <div className="p-5 bg-[var(--panel)] border border-[var(--line)] rounded-sm space-y-3">
              <span className="font-mono text-[11px] text-emerald-400 uppercase tracking-wider block font-semibold">
                ✓ WHAT CURRENTLY WORKS &amp; PASSES TESTS
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-[var(--ink)] font-sans">
                {currentState.whatWorks.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-mono mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What is Incomplete / Unfinished */}
            <div className="p-5 bg-[var(--panel)] border border-[var(--line)] rounded-sm space-y-3">
              <span className="font-mono text-[11px] text-amber-400 uppercase tracking-wider block font-semibold">
                ⚠ WHAT IS INCOMPLETE OR DEFERRED
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-[var(--muted)] font-sans">
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
              <div className="p-5 bg-[var(--bg)]/90 border border-[var(--line)] rounded-sm space-y-3">
                <span className="font-mono text-[11px] text-[var(--accent-brass)] uppercase tracking-wider block font-semibold">
                  [ LONG-HORIZON WORK REMAINING ]
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--muted)] font-body">
                  {currentState.whatRemains.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--accent-brass)] font-mono">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What I Would Change Today */}
            {currentState.whatIWouldChangeToday.length > 0 && (
              <div className="p-5 bg-[var(--accent-enamel)]/20 border border-[var(--accent-brass)]/40 rounded-sm space-y-3">
                <span className="font-mono text-[11px] text-[var(--accent-gold)] uppercase tracking-wider block font-semibold">
                  [ HINDSIGHT: WHAT I WOULD CHANGE TODAY ]
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--ink)] font-body italic">
                  {currentState.whatIWouldChangeToday.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--accent-gold)] font-mono not-italic">⚡</span>
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
        <div className="pt-12 border-t border-[var(--line)]">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
              18 // WHAT&apos;S NEXT · FUTURE PLANS
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] font-sans mb-2">
            Documented Future Directions
          </h3>

          <p className="text-xs font-mono text-amber-300 mb-6 bg-amber-950/20 p-2.5 rounded-sm border border-amber-800/40 inline-block">
            ⚠ {next.statusNotice}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {next.items.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-[var(--panel)] border border-[var(--line)] rounded-sm space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-[var(--accent-gold)] uppercase tracking-wider block">
                    [{item.type}]
                  </span>
                  <h4 className="font-bold text-base text-[var(--ink)] font-sans">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--line)]/40 font-mono text-[10px] text-[var(--muted)]">
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
