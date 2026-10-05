import React from "react";
import { Container } from "@/components/layout/container";
import { LabMetrics } from "@/types/lab";

interface Props {
  metrics: LabMetrics;
}

export function LabHero({ metrics }: Props) {
  return (
    <section className="relative pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-18 lg:pb-16 border-b border-[var(--line)] bg-[var(--bg)] overflow-hidden">
      {/* Deep Velvet Radial Background Glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,var(--bg)_0%,var(--bg)_50%,var(--bg)_100%)] opacity-95"
        aria-hidden="true"
      />

      {/* Technical Subtle Wine Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(45,22,28,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,22,28,0.35)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70"
        aria-hidden="true"
      />

      <Container width="wide" className="relative z-10">
        {/* Eyebrow & Kicker */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-[var(--muted)] uppercase mb-5 sm:mb-8">
          <span className="text-[var(--accent-brass)] font-semibold">/ 06</span>
          <span className="w-5 sm:w-8 h-[1px] bg-[var(--line)]" />
          <span className="text-[var(--ink)] flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-brass)] animate-pulse" />
            THE LAB &middot; EMPIRICAL AI SYSTEMS ARCHIVE
          </span>
        </div>

        {/* Monumental Headline */}
        <div className="max-w-4xl mb-5 sm:mb-8">
          <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-[var(--ink)] leading-[1.08] sm:leading-[1.02] tracking-tight">
            Empirical experiments, architectures, <br className="hidden sm:inline" />
            <span className="text-[var(--accent-brass)]">and system failures worth</span> understanding.
          </h1>
        </div>

        {/* Restrained Editorial Quote */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <p className="font-sans text-sm sm:text-base lg:text-lg text-[var(--muted)] leading-relaxed">
            An authoritative technical research archive of architectural decisions, failure analyses,
            deterministic test logs, and memory benchmarks from active AI systems. Zero synthetic claims.
          </p>
        </div>

        {/* Metadata Telemetry Plate (Responsive Dynamic Bar) */}
        <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 pt-5 sm:pt-6 border-t border-[var(--line)] font-mono text-[10px] sm:text-[11px] text-[var(--muted)] uppercase tracking-wider">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
            <span className="text-[var(--ink)] font-semibold">ARCHIVE ACTIVE</span>
          </div>
          <span className="text-[var(--border-subtle)] hidden xs:inline">/</span>
          <div>
            <span className="text-[var(--accent-brass)] font-bold">
              {String(metrics.total_projects).padStart(2, "0")}
            </span>{" "}
            RUNTIMES
          </div>
          <span className="text-[var(--border-subtle)] hidden xs:inline">/</span>
          <div>
            <span className="text-[var(--accent-brass)] font-bold">
              {String(metrics.total_pieces).padStart(2, "0")}
            </span>{" "}
            VERIFIED RECORDS
          </div>
          <span className="text-[var(--border-subtle)] hidden sm:inline">/</span>
          <div className="hidden sm:block text-[var(--muted)]">EVIDENCE LEVEL: HIGH</div>
          <span className="text-[var(--border-subtle)] hidden sm:inline">/</span>
          <div className="hidden sm:block text-[var(--muted)]">REVISION 2026</div>
        </div>
      </Container>
    </section>
  );
}
