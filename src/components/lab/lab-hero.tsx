import React from "react";
import { Container } from "@/components/layout/container";
import { LabMetrics } from "@/types/lab";

interface Props {
  metrics: LabMetrics;
}

export function LabHero({ metrics }: Props) {
  return (
    <section className="relative pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-18 lg:pb-16 border-b border-[#1E293B] bg-[#070A0F]">
      <Container width="wide">
        {/* Eyebrow & Kicker */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-slate-400 uppercase mb-5 sm:mb-8">
          <span className="text-cyber-cyan font-semibold">/ 06</span>
          <span className="w-5 sm:w-8 h-[1px] bg-[#1E293B]" />
          <span className="text-white flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
            THE LAB &middot; EMPIRICAL AI SYSTEMS ARCHIVE
          </span>
        </div>

        {/* Monumental Headline */}
        <div className="max-w-4xl mb-5 sm:mb-8">
          <h1 className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.08] sm:leading-[1.02] tracking-tight">
            Empirical experiments, architectures, <br className="hidden sm:inline" />
            <span className="text-cyber-cyan">and system failures worth</span> understanding.
          </h1>
        </div>

        {/* Restrained Editorial Quote */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <p className="font-sans text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed">
            An authoritative technical research archive of architectural decisions, failure analyses,
            deterministic test logs, and memory benchmarks from active AI systems. Zero synthetic claims.
          </p>
        </div>

        {/* Metadata Telemetry Plate (Responsive Dynamic Bar) */}
        <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 pt-5 sm:pt-6 border-t border-[#1E293B] font-mono text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse shrink-0" />
            <span className="text-white font-semibold">ARCHIVE ACTIVE</span>
          </div>
          <span className="text-slate-600 hidden xs:inline">/</span>
          <div>
            <span className="text-cyber-cyan font-bold">
              {String(metrics.total_projects).padStart(2, "0")}
            </span>{" "}
            RUNTIMES
          </div>
          <span className="text-slate-600 hidden xs:inline">/</span>
          <div>
            <span className="text-cyber-cyan font-bold">
              {String(metrics.total_pieces).padStart(2, "0")}
            </span>{" "}
            VERIFIED RECORDS
          </div>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <div className="hidden sm:block text-slate-300">EVIDENCE LEVEL: HIGH</div>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <div className="hidden sm:block text-slate-400">REVISION 2026</div>
        </div>
      </Container>
    </section>
  );
}
