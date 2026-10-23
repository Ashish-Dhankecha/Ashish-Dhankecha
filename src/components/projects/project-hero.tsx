import React from "react";
import Link from "next/link";
import { ProjectCaseStudy } from "@/types/project-case-study";

interface ProjectHeroProps {
  project: ProjectCaseStudy;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const isFlagship = project.isFlagship;

  return (
    <section className="relative pt-28 pb-14 md:pt-36 md:pb-20 border-b border-white/10 overflow-hidden bg-[#050505]">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15)_0%,rgba(6,182,212,0.05)_50%,transparent_70%)] blur-3xl opacity-70"
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Top Breadcrumb & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono">
            <Link
              href="/projects"
              className="text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 transition-colors"
            >
              ← ALL SYSTEMS
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/50 uppercase tracking-wider">
              CASE STUDY // {project.slug}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isFlagship && (
              <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                FLAGSHIP COGNITIVE SYSTEM
              </span>
            )}
            <span className="font-mono text-[11px] text-white/60 border border-white/10 bg-white/[0.03] px-3 py-1 rounded-full backdrop-blur-md">
              {project.statusLabel}
            </span>
          </div>
        </div>

        {/* Title, Subtitle & Timeline */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white font-sans tracking-tight break-words max-w-full">
              {project.title}
            </h1>
            <span className="font-mono text-xs sm:text-sm text-emerald-400/80 px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/10">
              {project.startDate} — {project.endDate}
            </span>
          </div>

          <p className="text-lg sm:text-2xl text-white/80 font-sans font-medium leading-snug">
            {project.subtitle}
          </p>

          <p className="text-base sm:text-lg text-white/60 font-sans leading-relaxed max-w-3xl pt-2">
            {project.summary}
          </p>
        </div>

        {/* External & Research Links */}
        <div className="flex flex-wrap items-center gap-3 pt-8 mt-8 border-t border-white/10">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/50 text-white transition-all shadow-sm"
            >
              <span>[{link.label.toUpperCase()}]</span>
              <span className="text-emerald-400">↗</span>
            </a>
          ))}
          {project.snapshot.verificationRatio && (
            <span className="ml-auto font-mono text-xs text-white/50 hidden sm:inline-flex items-center gap-2 bg-white/[0.03] border border-white/10 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Invariant Audit:{" "}
              <strong className="text-emerald-400 font-medium">
                {project.snapshot.verificationRatio}
              </strong>
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
