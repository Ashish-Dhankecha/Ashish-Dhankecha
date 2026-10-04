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
    <footer className="py-16 md:py-20 border-t border-[var(--line)] bg-[var(--panel)]/40">
      <div className="section-container space-y-12">
        {/* Next / Previous Project Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-[var(--line)]">
          <div>
            {previousProject ? (
              <Link
                href={`/projects/${previousProject.slug}`}
                className="group inline-flex flex-col text-left"
              >
                <span className="font-mono text-xs text-[var(--accent-brass)] group-hover:underline flex items-center gap-1">
                  ← PREVIOUS SYSTEM
                </span>
                <span className="text-base sm:text-lg font-bold text-[var(--ink)] font-sans group-hover:text-[var(--accent-gold)] transition-colors">
                  {previousProject.title}
                </span>
              </Link>
            ) : (
              <span className="font-mono text-xs text-[var(--muted)] opacity-60">
                [FIRST PROJECT IN DOSSIER]
              </span>
            )}
          </div>

          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2 bg-[var(--panel)] hover:bg-[var(--line)] border border-[var(--line)] hover:border-[var(--accent-brass)] text-[var(--ink)] transition-colors rounded-sm shadow-sm"
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
                <span className="font-mono text-xs text-[var(--accent-brass)] group-hover:underline flex items-center gap-1 justify-end">
                  NEXT SYSTEM →
                </span>
                <span className="text-base sm:text-lg font-bold text-[var(--ink)] font-sans group-hover:text-[var(--accent-gold)] transition-colors">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <span className="font-mono text-xs text-[var(--muted)] opacity-60">
                [LAST PROJECT IN DOSSIER]
              </span>
            )}
          </div>
        </div>

        {/* Explore Another System Cards */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-6">
            <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
              EXPLORE ANOTHER SYSTEM
            </span>
            <Link
              href="/projects"
              className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent-brass)] transition-colors"
            >
              View Full Index →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="brutal-card p-5 rounded-sm flex flex-col justify-between group hover:border-[var(--accent-brass)] transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                    <span className="text-[var(--accent-brass)] font-semibold uppercase">
                      {p.snapshot.type}
                    </span>
                    <span className="text-[var(--muted)]">{p.startDate}</span>
                  </div>

                  <h4 className="text-lg font-bold text-[var(--ink)] font-sans group-hover:text-[var(--accent-gold)] transition-colors">
                    {p.title}
                  </h4>

                  <p className="text-xs text-[var(--muted)] font-body line-clamp-2 leading-relaxed">
                    {p.tagline}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-[var(--line)]/50 flex items-center justify-between font-mono text-[11px] text-[var(--muted)]">
                  <span>{p.statusLabel}</span>
                  <span className="text-[var(--accent-brass)] group-hover:translate-x-1 transition-transform">
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
