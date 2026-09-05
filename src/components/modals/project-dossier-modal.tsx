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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Body */}
      <div
        className="relative w-full max-w-4xl bg-[#F3F0E8] border border-[#111111] shadow-2xl p-6 sm:p-10 md:p-12 my-auto max-h-[92vh] overflow-y-auto text-[#111111] flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Plate */}
        <div className="flex items-center justify-between border-b border-[#D8D4CB] pb-4 mb-8">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
            <span className="text-[#173B70] font-semibold">PROJECT / {project.number}</span>
            <span className="text-[#D8D4CB]">&middot;</span>
            <span className="text-[#555555]">{project.year}</span>
            <span className="text-[#D8D4CB]">&middot;</span>
            <span className="bg-[#EDE8DE] px-2 py-0.5 border border-[#D8D4CB] text-[#111111]">
              {project.status}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close dossier"
            className="p-1.5 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#F3F0E8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173B70]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-3 mb-8">
          <h2
            id="project-dossier-title"
            className="font-display text-3xl sm:text-5xl font-light text-[#111111] tracking-tight"
          >
            {project.title}
          </h2>
          <p className="font-display italic text-lg sm:text-xl text-[#555555]">
            {project.tagline}
          </p>

          {/* Technology badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono border border-[#D8D4CB] bg-[#EDE8DE]/60 text-[#111111]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-[#111111] mb-8" />

        {/* Structured Dossier Sections */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed divide-y divide-[#D8D4CB]">
          {/* Section: Overview */}
          <div className="space-y-3 pt-2">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#173B70] font-semibold">
              01 // OVERVIEW
            </h3>
            <p className="text-[#111111] leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Section: Architecture */}
          <div className="space-y-3 pt-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#173B70] font-semibold">
              02 // ARCHITECTURE
            </h3>
            <div className="p-4 bg-[#EDE8DE] border border-[#D8D4CB] font-mono text-xs leading-relaxed text-[#111111]">
              {project.architecture}
            </div>
          </div>

          {/* Section: Problem */}
          <div className="space-y-3 pt-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#173B70] font-semibold">
              03 // PROBLEM DEFINITION
            </h3>
            <p className="text-[#111111] leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Section: Design Decisions */}
          <div className="space-y-3 pt-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#173B70] font-semibold">
              04 // DESIGN DECISIONS
            </h3>
            <ul className="space-y-2 text-[#111111]">
              {project.designDecisions.map((dec, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-[#173B70] font-semibold mt-0.5">
                    &bull;
                  </span>
                  <span>{dec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Implementation */}
          <div className="space-y-3 pt-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#173B70] font-semibold">
              05 // IMPLEMENTATION
            </h3>
            <p className="text-[#111111] leading-relaxed">
              {project.implementation}
            </p>
          </div>

          {/* Section: Failure Modes */}
          <div className="space-y-3 pt-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#173B70] font-semibold">
              06 // OBSERVED FAILURE MODES
            </h3>
            <ul className="space-y-2 text-[#555555]">
              {project.failureModes.map((fm, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-[#8B8579] mt-0.5">
                    [x]
                  </span>
                  <span className="text-[#111111]">{fm}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Testing & Results */}
          <div className="space-y-3 pt-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#173B70] font-semibold">
              07 // TESTING &amp; VERIFICATION
            </h3>
            <p className="text-[#111111] leading-relaxed">
              {project.testing}
            </p>
          </div>

          {/* Section: Code & Repository */}
          <div className="space-y-4 pt-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#173B70] font-semibold">
              08 // CURRENT STATE &amp; REPOSITORY
            </h3>
            <p className="text-[#111111] leading-relaxed">
              {project.currentState}
            </p>

            {project.githubUrl && (
              <div className="pt-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#111111] bg-[#111111] text-[#F3F0E8] font-mono text-xs uppercase tracking-wider hover:bg-[#173B70] hover:border-[#173B70] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Inspect Code on GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full h-[1px] bg-[#D8D4CB] mt-10 mb-6" />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-6 border border-[#111111] bg-[#111111] text-[#F3F0E8] hover:bg-[#173B70] hover:border-[#173B70] uppercase font-mono text-xs tracking-wider transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
