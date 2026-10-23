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
    <section className="py-16 md:py-24 border-b border-white/10 bg-[#050505]">
      <div className="section-container space-y-16">
        {/* ============================================================== */}
        {/* 12 — VERIFICATION & TESTING EVIDENCE                           */}
        {/* ============================================================== */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
              12 // VERIFICATION &amp; EMPIRICAL TESTING
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-sans tracking-tight">
            {verification.headline}
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-sans leading-relaxed max-w-3xl mt-3 mb-10">
            {verification.testSuiteSummary}
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {verification.metrics.map((m, idx) => {
              const statusColors = {
                pass: "border-emerald-500/40 bg-emerald-950/40 text-emerald-400",
                fail: "border-rose-500/40 bg-rose-950/40 text-rose-400",
                partial: "border-amber-500/40 bg-amber-950/40 text-amber-400",
                audit: "border-cyan-500/40 bg-cyan-950/40 text-cyan-400",
              }[m.status];

              return (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-1.5">
                    <span className="font-mono text-xs text-white/50 uppercase tracking-wider block font-semibold">
                      {m.label}
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                      {m.value}
                    </div>
                  </div>

                  <p className="text-xs text-white/60 font-sans leading-relaxed pt-3 border-t border-white/10">
                    {m.context}
                  </p>

                  <div className="pt-2">
                    <span
                      className={`inline-block font-mono text-[10px] uppercase px-2.5 py-0.5 rounded-full border ${statusColors}`}
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
            <div className="space-y-4">
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-wider block font-semibold">
                [ FORMAL AUDIT FINDINGS ]
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {verification.auditResults.map((audit, aIdx) => (
                  <div
                    key={aIdx}
                    className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10 font-mono">
                      <span className="font-bold text-white text-sm">
                        {audit.auditName}
                      </span>
                      <span className="text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        {audit.scoreOrVerdict}
                      </span>
                    </div>

                    <p className="text-white/70 font-sans leading-relaxed">
                      {audit.details}
                    </p>

                    {audit.uncoveredFlaws && audit.uncoveredFlaws.length > 0 && (
                      <div className="pt-3 border-t border-white/10 space-y-1.5 font-mono text-[11px]">
                        <span className="text-rose-400 block font-semibold">
                          Defects Documented:
                        </span>
                        <ul className="list-disc list-inside text-white/60 space-y-1">
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
          <div className="pt-14 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold">
                13 // PERFORMANCE &amp; RESOURCE UTILIZATION
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans mb-3">
              Benchmarked Improvements
            </h3>
            <p className="text-sm text-white/60 font-sans leading-relaxed max-w-3xl mb-8">
              {performance.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {performance.benchmarks.map((bm, bIdx) => (
                <div
                  key={bIdx}
                  className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 space-y-3 font-mono text-xs"
                >
                  <span className="text-cyan-400 block font-bold text-xs">
                    {bm.metric}
                  </span>
                  <div className="flex items-baseline gap-3 pt-1">
                    <span className="text-rose-400 line-through text-sm">
                      {bm.before}
                    </span>
                    <span className="text-white/40 text-xs">→</span>
                    <span className="text-emerald-400 font-extrabold text-xl">
                      {bm.after}
                    </span>
                    <span className="text-white/40 text-[10px] ml-auto">
                      {bm.unit}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 font-sans pt-2 border-t border-white/10 leading-relaxed">
                    {bm.notes}
                  </p>
                </div>
              ))}
            </div>

            {performance.resourceFootprint && (
              <div className="space-y-3">
                <span className="font-mono text-xs text-white/50 uppercase tracking-wider block font-semibold">
                  [ RESOURCE FOOTPRINT ]
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                  {performance.resourceFootprint.map((rf, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-4 bg-white/[0.02] border border-white/10 rounded-xl space-y-1.5"
                    >
                      <span className="text-white font-bold block">
                        {rf.component}
                      </span>
                      <div className="flex items-center justify-between text-[11px] text-cyan-400">
                        <span>RAM: {rf.memory}</span>
                        <span>CPU: {rf.cpuOrLatency}</span>
                      </div>
                      <p className="text-[10px] text-white/50 pt-2 border-t border-white/10 font-sans">
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
          <div className="pt-14 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
                14 // SECURITY &amp; PROCESS SANDBOXING
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans mb-3">
              Threat Model &amp; Permission Boundaries
            </h3>
            <p className="text-sm text-white/60 font-sans leading-relaxed max-w-3xl mb-8">
              {security.threatModel}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-mono mb-6">
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                <span className="text-emerald-400 font-bold block text-xs uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  PERMITTED OPERATIONS (BOUNDED)
                </span>
                <ul className="space-y-2 text-white/80 font-sans text-xs">
                  {security.accessControls.allowed.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-mono">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
                <span className="text-rose-400 font-bold block text-xs uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  STRICTLY PROHIBITED ACTIONS
                </span>
                <ul className="space-y-2 text-white/70 font-sans text-xs">
                  {security.accessControls.disallowed.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-mono">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl text-xs font-mono text-white/60">
              <span className="text-emerald-400 font-bold">
                Sandboxing Implementation:{" "}
              </span>
              <span className="text-white/80">{security.sandboxingMechanism}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
