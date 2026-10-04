import React from "react";
import {
  ProjectVerification,
  ProjectPerformance,
  ProjectSecurity,
} from "@/types/project-case-study";

interface VerificationMetricsProps {
  verification: ProjectVerification;
  performance?: ProjectPerformance;
  security?: ProjectSecurity;
}

export function VerificationMetrics({
  verification,
  performance,
  security,
}: VerificationMetricsProps) {
  return (
    <section className="py-16 md:py-20 border-b border-[var(--line)]">
      <div className="section-container space-y-16">
        {/* ============================================================== */}
        {/* 12 — VERIFICATION & TESTING EVIDENCE                           */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
              12 // VERIFICATION &amp; EMPIRICAL TESTING
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ink)] font-sans tracking-tight">
            {verification.headline}
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] font-body leading-relaxed max-w-3xl mt-2 mb-8">
            {verification.testSuiteSummary}
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {verification.metrics.map((m, idx) => {
              const statusColors = {
                pass: "border-emerald-800/60 bg-emerald-950/20 text-emerald-400",
                fail: "border-rose-800/60 bg-rose-950/20 text-rose-400",
                partial: "border-amber-800/60 bg-amber-950/20 text-amber-400",
                audit: "border-[var(--accent-brass)]/60 bg-[var(--accent-enamel)]/30 text-[var(--accent-gold)]",
              }[m.status];

              return (
                <div
                  key={idx}
                  className="p-5 bg-[var(--panel)] border border-[var(--line)] rounded-sm space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-[var(--accent-brass)] uppercase tracking-wider block">
                      {m.label}
                    </span>
                    <div className="text-2xl sm:text-3xl font-bold font-mono text-[var(--ink)]">
                      {m.value}
                    </div>
                  </div>

                  <p className="text-xs text-[var(--muted)] font-body leading-relaxed pt-2 border-t border-[var(--line)]/50">
                    {m.context}
                  </p>

                  <div className="pt-1">
                    <span
                      className={`inline-block font-mono text-[9px] uppercase px-2 py-0.5 rounded-sm border ${statusColors}`}
                    >
                      {m.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Audit Results Table / Cards */}
          {verification.auditResults.length > 0 && (
            <div className="space-y-3">
              <span className="font-mono text-[10px] text-[var(--accent-brass)] uppercase tracking-wider block">
                [ FORMAL AUDIT FINDINGS ]
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {verification.auditResults.map((audit, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-4 sm:p-5 bg-[var(--bg)]/90 border border-[var(--line)] rounded-sm space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-[var(--line)] font-mono">
                      <span className="font-bold text-[var(--ink)]">
                        {audit.auditName}
                      </span>
                      <span className="text-[var(--accent-gold)] font-semibold">
                        {audit.scoreOrVerdict}
                      </span>
                    </div>

                    <p className="text-[var(--muted)] font-body leading-relaxed">
                      {audit.details}
                    </p>

                    {audit.uncoveredFlaws && audit.uncoveredFlaws.length > 0 && (
                      <div className="pt-2 border-t border-[var(--line)]/50 space-y-1 font-mono text-[11px]">
                        <span className="text-rose-400 block font-semibold">
                          Defects Documented:
                        </span>
                        <ul className="list-disc list-inside text-[var(--muted)] space-y-0.5">
                          {audit.uncoveredFlaws.map((flaw, fIdx) => (
                            <li key={fIdx}>{flaw}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* 13 — PERFORMANCE & BENCHMARKS (IF AVAILABLE)                   */}
        {/* ============================================================== */}
        {performance && (
          <div className="pt-12 border-t border-[var(--line)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
                13 // PERFORMANCE &amp; RESOURCE UTILIZATION
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] font-sans mb-3">
              Benchmarked Improvements
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed max-w-3xl mb-6">
              {performance.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {performance.benchmarks.map((bm, bIdx) => (
                <div
                  key={bIdx}
                  className="p-4 bg-[var(--panel)] border border-[var(--line)] rounded-sm space-y-2 font-mono text-xs"
                >
                  <span className="text-[var(--accent-brass)] block font-bold text-[11px]">
                    {bm.metric}
                  </span>
                  <div className="flex items-baseline gap-3 pt-1">
                    <span className="text-rose-400 line-through text-sm">
                      {bm.before}
                    </span>
                    <span className="text-[var(--muted)] text-[10px]">→</span>
                    <span className="text-emerald-400 font-bold text-base sm:text-lg">
                      {bm.after}
                    </span>
                    <span className="text-[var(--muted)] text-[10px] ml-auto">
                      {bm.unit}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--muted)] font-body pt-1 border-t border-[var(--line)]/50">
                    {bm.notes}
                  </p>
                </div>
              ))}
            </div>

            {performance.resourceFootprint && (
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-[var(--accent-brass)] uppercase tracking-wider block">
                  [ RESOURCE FOOTPRINT ]
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  {performance.resourceFootprint.map((rf, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-3 bg-[var(--bg)]/80 border border-[var(--line)] rounded-sm space-y-1"
                    >
                      <span className="text-[var(--ink)] font-bold block">
                        {rf.component}
                      </span>
                      <div className="flex items-center justify-between text-[11px] text-[var(--accent-gold)]">
                        <span>RAM: {rf.memory}</span>
                        <span>CPU: {rf.cpuOrLatency}</span>
                      </div>
                      <p className="text-[10px] text-[var(--muted)] pt-1 border-t border-[var(--line)]/40 font-body">
                        {rf.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* 14 — SECURITY & SANDBOXING (IF AVAILABLE)                      */}
        {/* ============================================================== */}
        {security && (
          <div className="pt-12 border-t border-[var(--line)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
                14 // SECURITY &amp; PROCESS SANDBOXING
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--ink)] font-sans mb-3">
              Threat Model &amp; Permission Boundaries
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed max-w-3xl mb-6">
              {security.threatModel}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono mb-4">
              <div className="p-4 bg-[var(--panel)] border border-emerald-900/40 rounded-sm space-y-2">
                <span className="text-emerald-400 font-bold block text-[11px] uppercase">
                  ✓ PERMITTED OPERATIONS (BOUNDED)
                </span>
                <ul className="space-y-1.5 text-[var(--ink-secondary)] font-body text-xs">
                  {security.accessControls.allowed.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-mono">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[var(--panel)] border border-rose-900/40 rounded-sm space-y-2">
                <span className="text-rose-400 font-bold block text-[11px] uppercase">
                  ✕ STRICTLY PROHIBITED ACTIONS
                </span>
                <ul className="space-y-1.5 text-[var(--muted)] font-body text-xs">
                  {security.accessControls.disallowed.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-mono">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3.5 bg-[var(--bg)]/90 border border-[var(--line)] rounded-sm text-xs font-mono text-[var(--muted)]">
              <span className="text-[var(--accent-gold)] font-bold">
                Sandboxing Implementation:{" "}
              </span>
              <span>{security.sandboxingMechanism}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
