"use client";

import React, { useEffect, useRef } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { ProjectDossier } from "@/content/portfolio-data";

interface ProjectDossierModalProps {
  project: ProjectDossier | null;
  onClose: () => void;
}

export function ProjectDossierModal({
  project,
  onClose,
}: ProjectDossierModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="project-dossier-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Body */}
      <div
        className="relative w-full max-w-4xl h-full sm:h-auto max-h-full sm:max-h-[92vh] bg-[#0D1117] border-0 sm:border border-[#1E293B] shadow-2xl rounded-none sm:rounded-lg p-4 sm:p-10 md:p-12 my-auto overflow-y-auto text-[#F8FAFC] flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Plate */}
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-3 sm:pb-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs uppercase tracking-widest flex-wrap">
            <span className="text-cyber-cyan font-semibold">PROJECT / {project.number}</span>
            <span className="text-slate-600">&middot;</span>
            <span className="text-slate-400">{project.year}</span>
            <span className="text-slate-600">&middot;</span>
            <span className="bg-cyber-cyan/10 px-2 py-0.5 rounded border border-cyber-cyan/30 text-cyber-cyan text-[10px] font-medium">
              {project.status}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close dossier"
            className="p-2 rounded border border-[#1E293B] bg-[#070A0F] text-slate-400 hover:text-white hover:border-cyber-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
          <h2
            id="project-dossier-title"
            className="font-sans text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight"
          >
            {project.title}
          </h2>
          <p className="font-mono text-sm sm:text-base text-cyber-cyan">
            {project.tagline}
          </p>

          {/* Technology badges */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-mono rounded border border-[#1E293B] bg-[#070A0F] text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-[#1E293B] mb-6 sm:mb-8" />

        {/* Structured Dossier Sections */}
        <div className="space-y-6 sm:space-y-8 text-xs sm:text-base leading-relaxed divide-y divide-[#1E293B]">
          {/* Section: Overview */}
          <div className="space-y-2.5 sm:space-y-3 pt-2">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan font-semibold">
              01 // OVERVIEW
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Section: Architecture */}
          <div className="space-y-2.5 sm:space-y-3 pt-5 sm:pt-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan font-semibold">
              02 // ARCHITECTURE
            </h3>
            <div className="p-3.5 sm:p-4 rounded bg-[#070A0F] border border-[#1E293B] font-mono text-[11px] sm:text-xs leading-relaxed text-slate-300 break-words">
              {project.architecture}
            </div>
          </div>

          {/* Section: Problem */}
          <div className="space-y-2.5 sm:space-y-3 pt-5 sm:pt-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan font-semibold">
              03 // PROBLEM DEFINITION
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Section: Design Decisions */}
          <div className="space-y-2.5 sm:space-y-3 pt-5 sm:pt-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan font-semibold">
              04 // DESIGN DECISIONS
            </h3>
            <ul className="space-y-2 text-slate-300">
              {project.designDecisions.map((dec, i) => (
                <li key={i} className="flex items-start gap-2 sm:gap-2.5">
                  <span className="font-mono text-xs text-cyber-cyan font-semibold mt-0.5">
                    &bull;
                  </span>
                  <span>{dec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Implementation */}
          <div className="space-y-2.5 sm:space-y-3 pt-5 sm:pt-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan font-semibold">
              05 // IMPLEMENTATION
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {project.implementation}
            </p>
          </div>

          {/* Section: Failure Modes */}
          <div className="space-y-2.5 sm:space-y-3 pt-5 sm:pt-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan font-semibold">
              06 // OBSERVED FAILURE MODES
            </h3>
            <ul className="space-y-2 text-slate-400">
              {project.failureModes.map((fm, i) => (
                <li key={i} className="flex items-start gap-2 sm:gap-2.5">
                  <span className="font-mono text-xs text-amber-400 mt-0.5 shrink-0">
                    [!]
                  </span>
                  <span className="text-slate-300">{fm}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Testing & Results */}
          <div className="space-y-2.5 sm:space-y-3 pt-5 sm:pt-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan font-semibold">
              07 // TESTING &amp; VERIFICATION
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {project.testing}
            </p>
          </div>

          {/* Section: Code & Repository */}
          <div className="space-y-3 sm:space-y-4 pt-5 sm:pt-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan font-semibold">
              08 // CURRENT STATE &amp; REPOSITORY
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {project.currentState}
            </p>

            {project.githubUrl && (
              <div className="pt-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded border border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan font-mono text-xs uppercase tracking-wider hover:bg-cyber-cyan hover:text-obsidian-dark font-semibold transition-colors min-h-[44px]"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Inspect Code on GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full h-[1px] bg-[#1E293B] mt-8 sm:mt-10 mb-4 sm:mb-6" />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto py-2.5 px-6 rounded border border-[#1E293B] bg-[#070A0F] text-slate-300 hover:text-white hover:border-cyber-cyan uppercase font-mono text-xs tracking-wider transition-colors text-center min-h-[44px]"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
