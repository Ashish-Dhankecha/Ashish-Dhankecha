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
      <div className="flex flex-col xs:flex-row xs:items-baseline justify-between gap-2 border-b border-[#1E293B] pb-3 sm:pb-4 mb-6 sm:mb-8">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyber-cyan font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
            PRIMARY ARCHITECTURAL INDEX
          </div>
          <h2 className="font-sans text-xl sm:text-3xl text-white font-bold mt-0.5 sm:mt-1">
            Research Projects &amp; Runtimes
          </h2>
        </div>
        <div className="font-mono text-[11px] sm:text-xs text-slate-400">
          <span className="text-cyber-cyan font-bold">
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
            className="flex flex-col justify-between p-5 sm:p-7 rounded-lg bg-[#0D1117] border border-[#1E293B] hover:border-cyber-cyan/60 hover:bg-[#151D2A] transition-all group shadow-md"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3 sm:mb-4 font-mono text-xs">
                <span className="text-xs font-semibold text-cyber-cyan">
                  / {proj.number}
                </span>
                <span className="px-2 py-0.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 text-[9px] sm:text-[10px] uppercase tracking-wider text-cyber-cyan font-medium">
                  {proj.status}
                </span>
              </div>

              {/* Title & Short Name */}
              <h3 className="font-sans text-xl sm:text-2xl text-white font-bold mb-2 group-hover:text-cyber-cyan transition-colors leading-tight">
                {proj.name}
              </h3>

              {/* Documented Period */}
              <div className="font-mono text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider mb-3 sm:mb-4">
                PERIOD: {proj.documented_period} &middot;{" "}
                <span className="text-cyber-cyan font-semibold">
                  {String(proj.pieces_count).padStart(2, "0")} DISPATCHES
                </span>
              </div>

              {/* Problem / Summary */}
              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 sm:mb-6">
                {proj.one_line_summary}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mb-5 sm:mb-6">
                {proj.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-[#070A0F] border border-[#1E293B] font-mono text-[10px] text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
                {proj.technologies.length > 4 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                    +{proj.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-[#1E293B]">
              <Link
                href={`/lab/${proj.id}`}
                className="w-full inline-flex items-center justify-between px-4 py-3 sm:py-2.5 rounded border border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan font-mono text-xs uppercase tracking-wider font-semibold hover:bg-cyber-cyan hover:text-obsidian-dark transition-colors min-h-[44px]"
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
