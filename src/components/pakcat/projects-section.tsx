"use client";

import React from "react";
import Link from "next/link";
import { ScrambleText } from "./scramble-text";
import { ProjectStack, ProjectItem } from "./project-stack";

const projects: ProjectItem[] = [
  {
    title: "Ashi OS",
    tag: "FLAGSHIP SYSTEM",
    description: "A 28-package personal AI operating system built from first principles with a strict acyclic graph and 5.4s latency inference.",
    href: "/projects/ashi",
    accent: "#d8ae79"
  },
  {
    title: "SIH26117 Workbench",
    tag: "HACKATHON SPRINT",
    description: "Air-gapped on-premise workbench for confidential environments. Built in a rapid 1-day hackathon sprint with Qwen SLM.",
    href: "/projects/sih",
    accent: "#93b4ff"
  },
  {
    title: "LEO Companion",
    tag: "RESEARCH AUDIT",
    description: "An ambitious exploration modeling an AI companion as an operating system kernel with a Cognitive Memory Management Unit.",
    href: "/projects/leo",
    accent: "#bdacf0"
  },
  {
    title: "VANI 50-Year OS",
    tag: "ZERO CLOUD",
    description: "Built as a direct counter-reaction to fragile AI abstraction churn. AST architecture guardian & zero-infrastructure strategy.",
    href: "/projects/vani",
    accent: "#7ee0b8"
  },
  {
    title: "Sub-2B Benchmark",
    tag: "EMPIRICAL BENCHMARK",
    description: "Comprehensive benchmarking of 6 small language models on consumer hardware, optimizing llama.cpp for ultra-low latency.",
    href: "/projects/ashi#architecture",
    accent: "#ffb493"
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative z-10">
      <div className="section-container section-padding">
        {/* Section Header */}
        <div className="mb-12 reveal reveal-up visible">
          <span className="section-number">
            <ScrambleText text="02 // systems & experiments" />
          </span>
          <h2
            id="projects-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--ink)] mt-3 font-sans"
          >
            Things I&apos;ve Built
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base mt-2 max-w-2xl font-body">
            Flagship cognitive operating systems, empirical failure post-mortems, and rapid hackathon prototypes.
            Documented with real code, architecture decision records, and honest failure logs.
          </p>
        </div>

        {/* Project Stack */}
        <div className="reveal reveal-up visible">
          <ProjectStack items={projects} />
        </div>

        {/* Global CTAs */}
        <div className="mt-16 flex flex-col gap-8 reveal reveal-up visible">
          {/* Main Projects CTA */}
          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center text-center gap-2 font-mono text-xs sm:text-sm px-4 py-3 sm:px-6 sm:py-3.5 bg-[var(--panel)] hover:bg-[var(--panel-hover)] border border-[var(--accent-brass)] text-[var(--ink)] transition-all rounded-sm font-semibold shadow-lg hover:shadow-[var(--accent-glow)] max-w-full flex-wrap leading-relaxed"
            >
              <span>[ EXPLORE THE FULL DEEP CASE STUDY SYSTEM &amp; SYSTEM LINEAGE (/projects) ]</span>
              <span className="text-[var(--accent-gold)]">→</span>
            </Link>
          </div>

          {/* Big Beautiful Lab Archive CTA */}
          <Link
            href="/lab"
            className="group relative overflow-hidden brutal-card p-6 sm:p-8 lg:p-10 rounded-sm border-[var(--border-strong)] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 w-full"
          >
            {/* Ambient subtle glow for the lab */}
            <div
              className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 bg-[radial-gradient(circle,var(--accent-glow)_0%,transparent_70%)] blur-2xl"
              aria-hidden="true"
            />
            
            <div className="relative z-10 text-left flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="lamp-badge">
                  RAW UNFILTERED ACCESS
                </span>
                <span className="font-mono text-[10px] text-[var(--accent-brass)] bg-[var(--accent-enamel)]/30 border border-[var(--accent-brass)]/50 px-2 py-0.5 rounded-sm">
                  62 RECORDS
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--ink)] font-sans tracking-tight mb-2">
                The Lab Archive
              </h3>
              <p className="text-[var(--muted)] text-sm sm:text-base font-body leading-relaxed max-w-2xl">
                Raw engineering post-mortems, architecture decision records (ADRs), and honest failure logs. No marketing fluff, just the raw reality of building complex cognitive systems.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <div
                className="inline-flex items-center justify-center gap-3 font-mono text-xs sm:text-sm px-6 py-4 bg-[var(--accent-enamel)] border border-[var(--accent-brass)] text-[var(--ink)] rounded-sm font-semibold shadow-md shadow-[var(--accent-glow)] group-hover:bg-[var(--accent-enamel-bright)] group-hover:border-[var(--accent-gold)] transition-colors"
              >
                <span>[ ENTER THE LAB ]</span>
                <span className="text-[var(--accent-gold)]">→</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
