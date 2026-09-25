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
      <div className="flex flex-col xs:flex-row xs:items-baseline justify-between gap-2 border-b border-[#2D161C] pb-3 sm:pb-4 mb-6 sm:mb-8">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#DF7987] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DF7987] animate-pulse" />
            PRIMARY ARCHITECTURAL INDEX
          </div>
          <h2 className="font-sans text-xl sm:text-3xl text-[#F5EBE1] font-bold mt-0.5 sm:mt-1">
            Research Projects &amp; Runtimes
          </h2>
        </div>
        <div className="font-mono text-[11px] sm:text-xs text-[#8E7C79]">
          <span className="text-[#DF7987] font-bold">
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
            className="flex flex-col justify-between p-5 sm:p-7 rounded-xl bg-[#140A0D] border border-[#2D161C] hover:border-[#801D2C] hover:bg-[#1F1015] transition-all group shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3 sm:mb-4 font-mono text-xs">
                <span className="text-xs font-semibold text-[#DF7987]">
                  / {proj.number}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#801D2C]/20 border border-[#801D2C]/40 text-[9px] sm:text-[10px] uppercase tracking-wider text-[#DF7987] font-medium">
                  {proj.status}
                </span>
              </div>

              {/* Title & Short Name */}
              <h3 className="font-sans text-xl sm:text-2xl text-[#F5EBE1] font-bold mb-2 group-hover:text-[#DF7987] transition-colors leading-tight">
                {proj.name}
              </h3>

              {/* Documented Period */}
              <div className="font-mono text-[10px] sm:text-[11px] text-[#8E7C79] uppercase tracking-wider mb-3 sm:mb-4">
                PERIOD: {proj.documented_period} &middot;{" "}
                <span className="text-[#DF7987] font-semibold">
                  {String(proj.pieces_count).padStart(2, "0")} DISPATCHES
                </span>
              </div>

              {/* Problem / Summary */}
              <p className="font-sans text-xs sm:text-sm text-[#D9C7B8] leading-relaxed mb-5 sm:mb-6">
                {proj.one_line_summary}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mb-5 sm:mb-6">
                {proj.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-md bg-[#0C0608] border border-[#2D161C] font-mono text-[10px] text-[#D9C7B8]"
                  >
                    {tech}
                  </span>
                ))}
                {proj.technologies.length > 4 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#8E7C79]">
                    +{proj.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-[#2D161C]">
              <Link
                href={`/lab/${proj.id}`}
                className="w-full inline-flex items-center justify-between px-4 py-3 sm:py-2.5 rounded-lg border border-[#801D2C]/50 bg-[#801D2C]/15 text-[#DF7987] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#801D2C] hover:text-[#F5EBE1] hover:border-[#A6263A] transition-colors min-h-[44px]"
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
