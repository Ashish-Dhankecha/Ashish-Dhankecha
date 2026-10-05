"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LabProject } from "@/types/lab";

interface Props {
  projects: LabProject[];
}

export function ProjectIndex({ projects }: Props) {
  return (
    <section className="my-8 sm:my-12">
      <div className="flex flex-col xs:flex-row xs:items-baseline justify-between gap-2 border-b border-[var(--line)] pb-3 sm:pb-4 mb-6 sm:mb-8">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--accent-brass)] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-brass)] animate-pulse" />
            PRIMARY ARCHITECTURAL INDEX
          </div>
          <h2 className="font-sans text-xl sm:text-3xl text-[var(--ink)] font-bold mt-0.5 sm:mt-1">
            Research Projects &amp; Runtimes
          </h2>
        </div>
        <div className="font-mono text-[11px] sm:text-xs text-[var(--muted)]">
          <span className="text-[var(--accent-brass)] font-bold">
            {String(projects.length).padStart(2, "0")}
          </span>{" "}
          INVESTIGATIONS
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            id={`project-card-${proj.id}`}
            className="flex flex-col justify-between p-5 sm:p-7 rounded-xl bg-[var(--panel)] border border-[var(--line)] hover:border-[var(--accent-brass)] hover:bg-[var(--panel-hover)] transition-all group shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3 sm:mb-4 font-mono text-xs">
                <span className="text-xs font-semibold text-[var(--accent-brass)]">
                  / {proj.number}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-brass)]/20 border border-[var(--accent-brass)]/40 text-[9px] sm:text-[10px] uppercase tracking-wider text-[var(--accent-brass)] font-medium">
                  {proj.status}
                </span>
              </div>

              {/* Title & Short Name */}
              <h3 className="font-sans text-xl sm:text-2xl text-[var(--ink)] font-bold mb-2 group-hover:text-[var(--accent-brass)] transition-colors leading-tight">
                {proj.name}
              </h3>

              {/* Documented Period */}
              <div className="font-mono text-[10px] sm:text-[11px] text-[var(--muted)] uppercase tracking-wider mb-3 sm:mb-4">
                PERIOD: {proj.documented_period} &middot;{" "}
                <span className="text-[var(--accent-brass)] font-semibold">
                  {String(proj.pieces_count).padStart(2, "0")} DISPATCHES
                </span>
              </div>

              {/* Problem / Summary */}
              <p className="font-sans text-xs sm:text-sm text-[var(--muted)] leading-relaxed mb-5 sm:mb-6">
                {proj.one_line_summary}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mb-5 sm:mb-6">
                {proj.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-md bg-[var(--bg)] border border-[var(--line)] font-mono text-[10px] text-[var(--muted)]"
                  >
                    {tech}
                  </span>
                ))}
                {proj.technologies.length > 4 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--muted)]">
                    +{proj.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-[var(--line)]">
              <Link
                href={`/lab/${proj.id}`}
                className="w-full inline-flex items-center justify-between px-4 py-3 sm:py-2.5 rounded-lg border border-[var(--accent-brass)]/50 bg-[var(--accent-brass)]/15 text-[var(--accent-brass)] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[var(--accent-brass)] hover:text-[var(--ink)] hover:border-[var(--accent-brass-hover)] transition-colors min-h-[44px]"
              >
                <span>Explore Project Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
