import React from "react";
import Link from "next/link";
import { ProjectCaseStudy } from "@/types/project-case-study";

interface ProjectHeroProps {
  project: ProjectCaseStudy;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const isFlagship = project.isFlagship;

  return (
    <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 border-b border-[var(--line)] overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_top,var(--accent-glow-strong)_0%,transparent_70%)] blur-3xl opacity-60"
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Top Breadcrumb & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono">
            <Link
              href="/projects"
              className="text-[var(--accent-brass)] hover:underline flex items-center gap-1"
            >
              ← ALL SYSTEMS
            </Link>
            <span className="text-[var(--line)]">/</span>
            <span className="text-[var(--muted)] uppercase tracking-wider">
              CASE STUDY // {project.slug}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isFlagship && (
              <span className="font-mono text-[11px] text-[var(--accent-gold)] bg-[var(--accent-enamel)]/40 border border-[var(--accent-brass)]/70 px-2.5 py-0.5 rounded-sm shadow-sm flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-brass)] animate-pulse" />
                FLAGSHIP COGNITIVE SYSTEM
              </span>
            )}
            <span className="font-mono text-[11px] text-[var(--muted)] border border-[var(--line)] bg-[var(--panel)] px-2.5 py-0.5 rounded-sm">
              {project.statusLabel}
            </span>
          </div>
        </div>

        {/* Title, Subtitle & Timeline */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[var(--ink)] font-sans tracking-tight break-words max-w-full">
              {project.title}
            </h1>
            <span className="font-mono text-xs sm:text-base text-[var(--accent-brass)] font-medium">
              {project.startDate} — {project.endDate}
            </span>
          </div>

          <p className="text-lg sm:text-2xl text-[var(--ink-secondary)] font-sans font-medium leading-snug">
            {project.subtitle}
          </p>

          <p className="text-base sm:text-lg text-[var(--muted)] font-body leading-relaxed max-w-3xl pt-2">
            {project.summary}
          </p>
        </div>

        {/* External & Research Links */}
        <div className="flex flex-wrap items-center gap-3 pt-8 mt-6 border-t border-[var(--line)]">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 font-mono text-xs px-3.5 py-1.5 bg-[var(--panel)] hover:bg-[var(--line)] border border-[var(--line)] hover:border-[var(--accent-brass)] text-[var(--ink)] transition-colors rounded-sm shadow-sm"
            >
              <span>[{link.label.toUpperCase()}]</span>
              <span className="text-[var(--accent-brass)]">↗</span>
            </a>
          ))}
          {project.snapshot.verificationRatio && (
            <span className="ml-auto font-mono text-xs text-[var(--muted)] hidden sm:inline-block">
              Invariant Audit:{" "}
              <strong className="text-[var(--accent-gold)] font-medium">
                {project.snapshot.verificationRatio}
              </strong>
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
