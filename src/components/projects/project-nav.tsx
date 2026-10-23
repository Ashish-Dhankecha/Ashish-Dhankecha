import React from "react";
import Link from "next/link";
import { ProjectCaseStudy } from "@/types/project-case-study";
import { allProjects } from "@/data/projects";

interface ProjectNavProps {
  currentProject: ProjectCaseStudy;
  previousProject: ProjectCaseStudy | null;
  nextProject: ProjectCaseStudy | null;
}

export function ProjectNav({
  currentProject,
  previousProject,
  nextProject,
}: ProjectNavProps) {
  const otherProjects = allProjects.filter(
    (p) => p.slug !== currentProject.slug
  );

  return (
    <footer className="py-16 md:py-24 border-t border-white/10 bg-black/60">
      <div className="section-container space-y-16">
        {/* Next / Previous Project Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            {previousProject ? (
              <Link
                href={`/projects/${previousProject.slug}`}
                className="group inline-flex flex-col text-left"
              >
                <span className="font-mono text-xs text-emerald-400 group-hover:underline flex items-center gap-1.5 transition-colors">
                  ← PREVIOUS SYSTEM
                </span>
                <span className="text-xl sm:text-2xl font-bold text-white font-sans group-hover:text-emerald-300 transition-colors mt-1">
                  {previousProject.title}
                </span>
              </Link>
            ) : (
              <span className="font-mono text-xs text-white/40">
                [FIRST PROJECT IN DOSSIER]
              </span>
            )}
          </div>

          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-emerald-500/50 text-white transition-all shadow-sm"
            >
              [← ALL CASE STUDIES]
            </Link>
          </div>

          <div className="sm:text-right">
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group inline-flex flex-col sm:items-end text-left sm:text-right"
              >
                <span className="font-mono text-xs text-emerald-400 group-hover:underline flex items-center gap-1.5 justify-end transition-colors">
                  NEXT SYSTEM →
                </span>
                <span className="text-xl sm:text-2xl font-bold text-white font-sans group-hover:text-emerald-300 transition-colors mt-1">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <span className="font-mono text-xs text-white/40">
                [LAST PROJECT IN DOSSIER]
              </span>
            )}
          </div>
        </div>

        {/* Explore Another System Cards */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-8">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
              EXPLORE ANOTHER SYSTEM
            </span>
            <Link
              href="/projects"
              className="font-mono text-xs text-white/50 hover:text-emerald-400 transition-colors"
            >
              View Full Index →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="glass-card p-6 sm:p-7 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-emerald-500/50 hover:bg-white/[0.04] transition-all shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                    <span className="text-emerald-400 font-semibold uppercase">
                      {p.snapshot.type}
                    </span>
                    <span className="text-white/40">{p.startDate}</span>
                  </div>

                  <h4 className="text-xl font-bold text-white font-sans group-hover:text-emerald-300 transition-colors">
                    {p.title}
                  </h4>

                  <p className="text-xs text-white/60 font-sans line-clamp-2 leading-relaxed">
                    {p.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs text-white/50">
                  <span className="truncate max-w-[180px]">{p.statusLabel}</span>
                  <span className="text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0">
                    READ CASE STUDY →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
