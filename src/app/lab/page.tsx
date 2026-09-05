"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FlaskConical,
  ChevronRight,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { AgentSandboxSimulator } from "@/components/lab/agent-sandbox-simulator";
import { BenchmarkMatrix } from "@/components/lab/benchmark-matrix";
import { labTelemetry, labExperiments, invariantTests, LabExperiment } from "@/content/lab-data";

export default function LabPage() {
  const [activeExperiment, setActiveExperiment] = useState<LabExperiment | null>(null);
  const [selectedLr, setSelectedLr] = useState<"0.001" | "0.01" | "0.1">("0.01");

  // Simulated loss curves based on selected LR
  const lossCurves = {
    "0.001": [
      { step: 0, loss: 2.45 },
      { step: 100, loss: 2.12 },
      { step: 200, loss: 1.84 },
      { step: 300, loss: 1.62 },
      { step: 400, loss: 1.45 },
      { step: 500, loss: 1.32 },
    ],
    "0.01": [
      { step: 0, loss: 2.45 },
      { step: 100, loss: 1.42 },
      { step: 200, loss: 0.88 },
      { step: 300, loss: 0.54 },
      { step: 400, loss: 0.38 },
      { step: 500, loss: 0.29 },
    ],
    "0.1": [
      { step: 0, loss: 2.45 },
      { step: 100, loss: 1.15 },
      { step: 200, loss: 1.68 },
      { step: 300, loss: 2.14 },
      { step: 400, loss: 3.82 },
      { step: 500, loss: 5.41 },
    ],
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-[#F8FAFC] pb-24 selection:bg-[#0284C7] selection:text-white">
      {/* =========================================================================
          FACILITY TELEMETRY STRIP & STATUS TICKER
          ========================================================================= */}
      <div className="border-b border-[#1E293B] bg-[#0A0E17] py-2.5 font-mono text-[11px] text-[#94A3B8]">
        <Container width="wide">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-[#38BDF8] hover:text-[#7DD3FC] transition-colors font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>RETURN TO ARCHIVE</span>
              </Link>
              <span className="text-[#334155] hidden sm:inline">&middot;</span>
              <span className="text-[#CBD5E1]">{labTelemetry.facilityId}</span>
              <span className="text-[#334155] hidden sm:inline">&middot;</span>
              <span className="text-[#64748B] hidden md:inline">{labTelemetry.environment}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-semibold">ALL BENCHES ONLINE</span>
              </div>
              <span className="text-[#64748B]">LATENCY: {labTelemetry.systemLatency}</span>
            </div>
          </div>
        </Container>
      </div>

      {/* =========================================================================
          LAB HERO HEADER
          ========================================================================= */}
      <section className="py-12 sm:py-16 border-b border-[#1E293B] bg-[#0B101B]/60 relative overflow-hidden">
        {/* Subtle high-tech grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#38BDF8 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        <Container width="wide">
          <div className="max-w-4xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-[#0284C7]/40 bg-[#0284C7]/10 text-[#38BDF8] font-mono text-xs uppercase tracking-widest">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>RESEARCH &amp; SYSTEMS BENCH // 2026</span>
            </div>

            <h1 className="font-mono text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#F8FAFC]">
              Experimental Systems <span className="text-[#38BDF8]">&amp;</span> AI Laboratory
            </h1>

            <p className="text-sm sm:text-base text-[#94A3B8] font-sans leading-relaxed max-w-2xl">
              A dedicated research workbench for testing autonomous agent loops, empirical model benchmarks, first-principles algorithms, and runtime invariants against real-world failures.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 font-mono">
              <div className="p-3 border border-[#1E293B] bg-[#0E1420]/80">
                <span className="text-[10px] text-[#64748B] uppercase block">ACTIVE EXPERIMENTS</span>
                <span className="text-lg font-bold text-[#F8FAFC]">04 Running</span>
              </div>
              <div className="p-3 border border-[#1E293B] bg-[#0E1420]/80">
                <span className="text-[10px] text-[#64748B] uppercase block">ASSERTION PASS RATE</span>
                <span className="text-lg font-bold text-emerald-400">99.82%</span>
              </div>
              <div className="p-3 border border-[#1E293B] bg-[#0E1420]/80">
                <span className="text-[10px] text-[#64748B] uppercase block">VRAM ALLOCATION</span>
                <span className="text-lg font-bold text-[#38BDF8]">24.0 GB</span>
              </div>
              <div className="p-3 border border-[#1E293B] bg-[#0E1420]/80">
                <span className="text-[10px] text-[#64748B] uppercase block">INVARIANT SENTINELS</span>
                <span className="text-lg font-bold text-[#F59E0B]">6 Armed</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BENCH 01: AUTONOMOUS AGENT EXECUTION SANDBOX (INTERACTIVE)
          ========================================================================= */}
      <section className="py-12 sm:py-16 border-b border-[#1E293B]">
        <Container width="wide">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#38BDF8] font-semibold">[ BENCH / 01 ]</span>
                <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
                  AUTONOMOUS AGENT EXECUTION ENGINE
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase text-emerald-400 border border-emerald-500/30 px-2 py-0.5 bg-emerald-950/20">
                LIVE SIMULATOR
              </span>
            </div>

            <AgentSandboxSimulator />
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BENCH 02: MODEL INFERENCE & QUANTIZATION MATRIX (INTERACTIVE)
          ========================================================================= */}
      <section className="py-12 sm:py-16 border-b border-[#1E293B] bg-[#0A0E17]/40">
        <Container width="wide">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#38BDF8] font-semibold">[ BENCH / 02 ]</span>
                <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
                  MODEL INFERENCE &amp; LATENCY PROFILER
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase text-[#38BDF8] border border-[#0284C7]/40 px-2 py-0.5 bg-[#0284C7]/10">
                SORTABLE PROFILES
              </span>
            </div>

            <BenchmarkMatrix />
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BENCH 03: FIRST-PRINCIPLES NEURAL OPTIMIZER & GRADIENT SIMULATOR
          ========================================================================= */}
      <section className="py-12 sm:py-16 border-b border-[#1E293B]">
        <Container width="wide">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#38BDF8] font-semibold">[ BENCH / 03 ]</span>
                <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
                  FIRST-PRINCIPLES GRADIENT FLOW &amp; LOSS SURFACE
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase text-[#F59E0B] border border-[#F59E0B]/30 px-2 py-0.5 bg-[#F59E0B]/10">
                MATH SIMULATION
              </span>
            </div>

            <div className="border border-[#1E293B] bg-[#0E1420] p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
                <div>
                  <h3 className="font-mono text-base font-semibold text-[#F8FAFC]">
                    Learning Rate &amp; Loss Landscape Dynamics
                  </h3>
                  <p className="text-xs font-mono text-[#94A3B8] mt-1">
                    Simulated multi-layer perceptron training on synthetic regression surface.
                  </p>
                </div>

                {/* LR Selector */}
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-[#64748B] text-[10px] uppercase">Learning Rate (&eta;):</span>
                  {(["0.001", "0.01", "0.1"] as const).map((lr) => (
                    <button
                      key={lr}
                      type="button"
                      onClick={() => setSelectedLr(lr)}
                      className={`px-2.5 py-1 border transition-all ${
                        selectedLr === lr
                          ? "border-[#38BDF8] bg-[#0284C7]/20 text-[#38BDF8] font-bold"
                          : "border-[#1E293B] bg-[#111726]/60 text-[#94A3B8] hover:border-[#334155]"
                      }`}
                    >
                      {lr} {lr === "0.01" ? "(Optimal)" : lr === "0.1" ? "(Divergent)" : "(Slow)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Loss Chart SVG Visualization */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 bg-[#070A0F] border border-[#1E293B] p-4">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#64748B] pb-2 border-b border-[#1E293B]">
                    <span>LOSS TRAJECTORY (J(&theta;) vs STEP)</span>
                    <span className={selectedLr === "0.1" ? "text-[#F59E0B]" : "text-emerald-400"}>
                      {selectedLr === "0.1" ? "STATUS: LOSS EXPLODING" : "STATUS: CONVERGING"}
                    </span>
                  </div>

                  <div className="h-48 w-full pt-4 flex items-end">
                    <svg className="w-full h-full" viewBox="0 0 500 150" fill="none">
                      {/* Grid lines */}
                      <line x1="0" y1="30" x2="500" y2="30" stroke="#1E293B" strokeDasharray="3 3" />
                      <line x1="0" y1="75" x2="500" y2="75" stroke="#1E293B" strokeDasharray="3 3" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="#1E293B" strokeDasharray="3 3" />

                      {/* Loss curve path */}
                      {(() => {
                        const pts = lossCurves[selectedLr];
                        const maxVal = selectedLr === "0.1" ? 6.0 : 3.0;
                        const coords = pts.map((p, i) => {
                          const x = (i / (pts.length - 1)) * 480 + 10;
                          const y = 140 - (p.loss / maxVal) * 120;
                          return `${x},${y}`;
                        });
                        const pathD = `M ${coords.join(" L ")}`;

                        return (
                          <>
                            <path
                              d={pathD}
                              stroke={selectedLr === "0.1" ? "#EF4444" : "#10B981"}
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              fill="none"
                            />
                            {pts.map((p, i) => {
                              const x = (i / (pts.length - 1)) * 480 + 10;
                              const y = 140 - (p.loss / maxVal) * 120;
                              return (
                                <circle
                                  key={p.step}
                                  cx={x}
                                  cy={y}
                                  r="4"
                                  fill="#070A0F"
                                  stroke={selectedLr === "0.1" ? "#EF4444" : "#10B981"}
                                  strokeWidth="2"
                                />
                              );
                            })}
                          </>
                        );
                      })()}
                    </svg>
                  </div>

                  <div className="flex justify-between font-mono text-[9px] text-[#64748B] pt-2 border-t border-[#1E293B]">
                    <span>STEP 0</span>
                    <span>STEP 100</span>
                    <span>STEP 200</span>
                    <span>STEP 300</span>
                    <span>STEP 400</span>
                    <span>STEP 500</span>
                  </div>
                </div>

                {/* Mathematical Notes */}
                <div className="lg:col-span-4 space-y-3 font-mono text-xs">
                  <div className="p-3 border border-[#1E293B] bg-[#111726]/40">
                    <span className="text-[10px] text-[#64748B] uppercase block">EXPERIMENT STATUS</span>
                    <p className="text-[#F8FAFC] font-semibold mt-1">
                      {selectedLr === "0.01"
                        ? "Optimal Hyperparameter State"
                        : selectedLr === "0.1"
                        ? "Gradient Explosion Detected"
                        : "Sub-optimal Plateau"}
                    </p>
                    <p className="text-[11px] text-[#94A3B8] mt-1.5 leading-relaxed">
                      {selectedLr === "0.01"
                        ? "Gradient norm stabilizes within 0.04 tolerance with steady exponential decay."
                        : selectedLr === "0.1"
                        ? "Large updates overshoot the minima basin, producing NaN loss if unclipped."
                        : "Requires 4.8x more steps to reach equivalent convergence threshold."}
                    </p>
                  </div>

                  <div className="p-3 border border-[#1E293B] bg-[#111726]/40 text-[11px] text-[#94A3B8]">
                    <span className="text-[#38BDF8] block font-bold mb-1">NUMERICAL STABILITY PRINCIPLE</span>
                    Always subtract max(z) prior to computing exp(z) in softmax layers to prevent IEEE-754 64-bit float overflow.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BENCH 04: ACTIVE LAB DISPATCHES & EMPIRICAL HYPOTHESES
          ========================================================================= */}
      <section className="py-12 sm:py-16 border-b border-[#1E293B] bg-[#0A0E17]/40">
        <Container width="wide">
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#38BDF8] font-semibold">[ BENCH / 04 ]</span>
                <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
                  ACTIVE RESEARCH DISPATCHES &amp; HYPOTHESES
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase text-[#64748B]">
                EMPIRICAL NOTES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {labExperiments.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => setActiveExperiment(exp)}
                  className="p-6 border border-[#1E293B] bg-[#0E1420] hover:border-[#38BDF8] transition-all cursor-pointer group flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-[#38BDF8] font-semibold">{exp.code}</span>
                      <span
                        className={`px-2 py-0.5 border ${
                          exp.status === "ACTIVE_BENCH"
                            ? "border-emerald-500/40 text-emerald-400 bg-emerald-950/20"
                            : exp.status === "VERIFIED"
                            ? "border-[#0284C7]/40 text-[#38BDF8] bg-[#0284C7]/10"
                            : "border-[#F59E0B]/40 text-[#F59E0B] bg-[#F59E0B]/10"
                        }`}
                      >
                        {exp.status}
                      </span>
                    </div>

                    <h3 className="font-mono text-base font-semibold text-[#F8FAFC] group-hover:text-[#38BDF8] transition-colors leading-snug">
                      {exp.title}
                    </h3>

                    <p className="font-sans text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                      {exp.hypothesis}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between font-mono text-[11px] text-[#64748B]">
                    <span>{exp.specs.runtime}</span>
                    <div className="flex items-center gap-1 text-[#38BDF8] group-hover:translate-x-1 transition-transform">
                      <span>View Dossier</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          BENCH 05: INVARIANT SENTINEL & SAFETY ASSERTIONS
          ========================================================================= */}
      <section className="py-12 sm:py-16 border-b border-[#1E293B]">
        <Container width="wide">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#38BDF8] font-semibold">[ BENCH / 05 ]</span>
                <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
                  SYSTEM INVARIANT SENTINEL SUITE
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase text-emerald-400 border border-emerald-500/30 px-2 py-0.5 bg-emerald-950/20">
                6/6 PASSING
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {invariantTests.map((inv) => (
                <div key={inv.id} className="p-4 border border-[#1E293B] bg-[#0E1420] space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-[#38BDF8]">{inv.id}</span>
                    <span className="text-emerald-400 font-semibold">{inv.status}</span>
                  </div>

                  <h4 className="font-mono text-xs font-semibold text-[#F8FAFC]">{inv.rule}</h4>

                  <p className="font-sans text-xs text-[#94A3B8] leading-relaxed">
                    {inv.description}
                  </p>

                  <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between font-mono text-[10px]">
                    <span className="text-[#64748B] font-mono truncate max-w-[170px]">{inv.assertion}</span>
                    <span className="text-emerald-400">{inv.latency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          LAB CALL TO COLLABORATE
          ========================================================================= */}
      <section className="py-16 sm:py-20 text-center bg-[#0B101B]/40">
        <Container width="wide">
          <div className="max-w-xl mx-auto space-y-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#38BDF8] block">
              RESEARCH COLLABORATION
            </span>
            <h2 className="font-mono text-2xl sm:text-3xl font-light text-[#F8FAFC]">
              Have a difficult systems or AI problem to benchmark?
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-sans leading-relaxed">
              I am interested in running empirical experiments, building reliable autonomous primitives, and testing edge cases.
            </p>

            <div className="pt-4 flex items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="px-5 py-2.5 border border-[#38BDF8] bg-[#0284C7] hover:bg-[#0369A1] text-white font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Propose an Experiment
              </Link>
              <Link
                href="/"
                className="px-5 py-2.5 border border-[#334155] bg-[#111726] hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Return to Portfolio
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          EXPERIMENT DOSSIER MODAL
          ========================================================================= */}
      {activeExperiment && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-2xl bg-[#0E1420] border border-[#38BDF8] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto font-mono">
            <div className="flex items-start justify-between border-b border-[#1E293B] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#38BDF8] block mb-1">
                  LAB DISPATCH // {activeExperiment.code}
                </span>
                <h3 className="text-lg font-bold text-[#F8FAFC] leading-snug">
                  {activeExperiment.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveExperiment(null)}
                className="p-1.5 border border-[#334155] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#38BDF8] transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-[#CBD5E1]">
              <div className="p-3 border border-[#1E293B] bg-[#070A0F]">
                <span className="text-[9px] uppercase text-[#64748B] block mb-1">CORE HYPOTHESIS</span>
                <p className="text-[#F8FAFC]">{activeExperiment.hypothesis}</p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase text-[#64748B] block">EMPIRICAL OBSERVATIONS</span>
                <ul className="space-y-1.5 list-disc pl-4 text-[#94A3B8]">
                  {activeExperiment.details.map((det, i) => (
                    <li key={i}>{det}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 border border-[#1E293B] bg-[#111726]/60">
                <span className="text-[9px] uppercase text-emerald-400 block mb-1">KEY FINDING</span>
                <p className="text-[#F8FAFC]">{activeExperiment.findings}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between text-xs text-[#64748B]">
              <span>Runtime: {activeExperiment.specs.runtime}</span>
              <button
                type="button"
                onClick={() => setActiveExperiment(null)}
                className="px-4 py-1.5 border border-[#334155] bg-[#161F30] text-[#F8FAFC] hover:bg-[#1E293B] transition-colors"
              >
                Close Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
