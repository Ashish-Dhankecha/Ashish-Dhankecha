"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Copy, Check, ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/container";
import { AshiArchitectureDiagram } from "@/components/architecture/ashi-architecture";
import { DirectionSection } from "@/components/direction/direction-section";
import { NoteReaderModal } from "@/components/modals/note-reader-modal";
import { ProjectDossierModal } from "@/components/modals/project-dossier-modal";
import { TechMarquee } from "@/components/ui/tech-marquee";
import {
  heroContent,
  heroPhilosophy,
  currentlyMarkers,
  featuredAshiContent,
  selectedProjects,
  aboutContent,
  currentFocusTimeline,
  engineeringPrinciples,
  engineeringNotes,
  skillsGrouped,
  personalBrandStatement,
  contactContent,
  ProjectDossier,
  EngineeringNote,
} from "@/content/portfolio-data";
import { getLabMetrics } from "@/lib/lab";

export default function HomePage() {
  const labMetrics = getLabMetrics();
  // Modal states
  const [activeNote, setActiveNote] = useState<EngineeringNote | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectDossier | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(contactContent.email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = contactContent.email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      setCopiedEmail(false);
    }
  };

  return (
    <div className="w-full flex flex-col flex-1 bg-[#070A0F] text-[#F8FAFC]">
      {/* Anchor for Home */}
      <div id="home" className="sr-only" aria-hidden="true" />

      {/* =========================================================================
          / 01 HERO SECTION: AI SYSTEMS DEVELOPER & AUTONOMOUS RUNTIMES
          ========================================================================= */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#1E293B] bg-[#070A0F]">
        <Container width="wide">
          {/* Eyebrow & Issue Kicker */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-slate-400 uppercase mb-6 sm:mb-10">
            <span className="text-cyber-cyan font-semibold">{heroContent.sectionNumber}</span>
            <span className="w-6 sm:w-8 h-[1px] bg-[#1E293B]" />
            <span className="text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse" />
              AI SYSTEMS ARCHITECT &middot; AUTONOMOUS RUNTIMES
            </span>
          </div>

          {/* Expansive AI Developer Headline */}
          <div className="max-w-4xl mb-6 sm:mb-8">
            <h1 className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-[4.5rem] leading-[1.08] sm:leading-[1.02] tracking-tight text-white">
              ARCHITECTING AUTONOMOUS{" "}
              <span className="text-cyber-cyan block sm:inline">
                AI OPERATING SYSTEMS
              </span>{" "}
              &amp; AGENTIC RUNTIMES.
            </h1>
          </div>

          {/* Live System Telemetry Strip */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 sm:mb-10 font-mono text-[11px]">
            <span className="px-2.5 py-1 rounded border border-cyber-emerald/40 bg-cyber-emerald/10 text-cyber-emerald flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse" />
              KERNEL: ACTIVE &middot; DETERMINISTIC
            </span>
            <span className="px-2.5 py-1 rounded border border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
              {labMetrics.total_pieces} VERIFIED BENCHMARKS
            </span>
            <span className="px-2.5 py-1 rounded border border-[#1E293B] bg-[#0E1420] text-slate-400 hidden sm:inline-flex">
              EVALUATION: ZERO FABRICATION
            </span>
          </div>

          {/* Supporting Bio & CTAs */}
          <div className="max-w-2xl space-y-6 sm:space-y-8">
            <div className="space-y-3.5 sm:space-y-4">
              {heroContent.supportingParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-2">
              <Link
                href={heroContent.ctaPrimary.href}
                className="w-full sm:w-auto justify-center group inline-flex items-center gap-2 px-6 py-3 rounded bg-cyber-cyan text-obsidian-dark font-mono text-xs uppercase tracking-wider font-bold hover:bg-cyber-cyan/90 transition-colors shadow-sm min-h-[44px]"
              >
                <span>{heroContent.ctaPrimary.label}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href={heroContent.ctaSecondary.href}
                className="font-mono text-xs uppercase tracking-widest text-slate-400 hover:text-cyber-cyan transition-all py-2 text-center sm:text-left flex items-center justify-center sm:justify-start gap-1"
              >
                <span>{heroContent.ctaSecondary.label}</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          HERO PHILOSOPHY: RESTRAINED ENGINEERING AXIOM
          ========================================================================= */}
      <section className="py-10 sm:py-14 border-b border-[#1E293B] bg-[#0D1117]">
        <Container width="wide">
          <div className="max-w-3xl border-l-2 border-cyber-cyan pl-4 sm:pl-6 space-y-2">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-cyber-cyan block">
              ENGINEERING AXIOM // FIRST PRINCIPLES
            </span>
            <p className="font-sans text-lg sm:text-2xl text-white font-medium leading-relaxed">
              &ldquo;{heroPhilosophy.statement}&rdquo;
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          CURRENTLY: CONCEPTUAL MARKERS / PROOF STRIP
          ========================================================================= */}
      <section className="py-10 sm:py-14 border-b border-[#1E293B] bg-[#070A0F]">
        <Container width="wide">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-3 mb-6 sm:mb-8">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-slate-400">
              CURRENT FOCUS &middot; ACTIVE HORIZON
            </span>
            <span className="font-mono text-[10px] text-cyber-cyan">2026 CYCLE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {currentlyMarkers.map((marker, idx) => (
              <div
                key={marker.label}
                className="p-4 sm:p-5 rounded border border-[#1E293B] bg-[#0D1117] space-y-2 hover:border-cyber-cyan/50 hover:bg-[#151D2A] transition-all"
              >
                <div className="flex items-baseline justify-between font-mono text-[10px] text-slate-400">
                  <span className="text-cyber-cyan">[ 0{idx + 1} ]</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
                </div>
                <h2 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-semibold pt-1">
                  {marker.label}
                </h2>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {marker.detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          TOOLS & TECHNOLOGIES: INFINITE MOVING MARQUEE TICKER
          ========================================================================= */}
      <TechMarquee />

      {/* =========================================================================
          / 02 FEATURED PROJECT: ASHI (AN AUTONOMOUS AI OPERATING SYSTEM)
          ========================================================================= */}
      <section id="ashi-section" className="py-14 sm:py-24 border-b border-[#1E293B] bg-[#070A0F]">
        <Container width="wide">
          <div className="space-y-8 sm:space-y-12">
            {/* Header Plate */}
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3 sm:pb-4">
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-slate-400">
                <span className="text-cyber-cyan font-semibold">{featuredAshiContent.sectionNumber}</span>{" "}
                {featuredAshiContent.badge}
              </span>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-cyber-emerald flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse" />
                {featuredAshiContent.status}
              </span>
            </div>

            {/* Main Specification Card */}
            <div className="rounded-lg border border-[#1E293B] bg-[#0D1117] p-4 sm:p-10 lg:p-12 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
                {/* Left: Overview, Specs & Action */}
                <div className="lg:col-span-5 space-y-5 sm:space-y-6">
                  <div>
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-cyber-cyan block mb-1">
                      LONG-TERM RESEARCH INITIATIVE
                    </span>
                    <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {featuredAshiContent.title}
                    </h2>
                    <p className="font-mono text-xs sm:text-sm text-cyber-cyan mt-1">
                      {featuredAshiContent.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                    {featuredAshiContent.description}
                  </p>

                  {/* Architecture metadata ledger */}
                  <div className="border-t border-b border-[#1E293B] py-3 space-y-1.5 sm:space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
                      <span className="text-slate-400">PARADIGM</span>
                      <span className="text-white font-medium text-right">
                        {featuredAshiContent.paradigm}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1E293B]/60">
                      <span className="text-slate-400">STATE LEDGER</span>
                      <span className="text-cyber-cyan font-medium">Deterministic &amp; Auditable</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">ENGINEERING CYCLE</span>
                      <span className="text-cyber-emerald font-medium">Active Development</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveProject(selectedProjects[0])}
                      className="w-full sm:w-auto justify-center group inline-flex items-center gap-2 px-6 py-2.5 rounded bg-cyber-cyan text-obsidian-dark font-mono text-xs uppercase tracking-wider font-bold hover:bg-cyber-cyan/90 transition-colors shadow-sm cursor-pointer min-h-[44px]"
                    >
                      <span>Explore Ashi</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    <a
                      href={featuredAshiContent.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-2.5 rounded border border-[#334155] bg-[#070A0F] text-slate-200 font-mono text-xs uppercase tracking-wider hover:border-cyber-cyan hover:text-white transition-colors min-h-[44px]"
                    >
                      <span>View on GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Right: Architectural Drawing Schematic */}
                <div className="lg:col-span-7">
                  <AshiArchitectureDiagram />
                </div>
              </div>
            </div>

            {/* "Why I'm Building It" Section */}
            <div className="rounded border border-[#1E293B] bg-[#0D1117] p-5 sm:p-10 max-w-4xl">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-cyber-cyan font-semibold block mb-2">
                INTELLECTUAL CURIOSITY // FIRST PRINCIPLES
              </span>
              <h3 className="font-sans text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                {featuredAshiContent.whyTitle}
              </h3>

              <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {featuredAshiContent.whyText.map((paragraph, pIdx) => (
                  <p key={pIdx} className={pIdx === 1 ? "font-mono text-xs bg-[#070A0F] p-3.5 sm:p-4 rounded border-l-2 border-cyber-cyan text-slate-300 leading-relaxed" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          / 03 ABOUT: BIOGRAPHICAL STATEMENT & TECHNICAL FOCUS
          ========================================================================= */}
      <section id="about" className="py-14 sm:py-24 border-b border-[#1E293B] bg-[#070A0F]">
        <Container width="wide">
          <div className="space-y-8 sm:space-y-12">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3 sm:pb-4">
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-slate-400">
                <span className="text-cyber-cyan font-semibold">{aboutContent.sectionNumber}</span>{" "}
                {aboutContent.eyebrow}
              </span>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-slate-400">
                FOUNDATIONAL PRINCIPLES
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Left Column: Personal Narrative */}
              <div className="lg:col-span-5 space-y-5 sm:space-y-6">
                <h2 className="font-sans font-bold text-3xl sm:text-4xl text-white leading-tight whitespace-pre-line">
                  {aboutContent.headline}
                </h2>

                <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {aboutContent.narrativeParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="pt-2 sm:pt-4">
                  <Link
                    href="#contact"
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 py-3 rounded border border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan font-mono text-xs uppercase tracking-wider font-semibold hover:bg-cyber-cyan hover:text-obsidian-dark transition-all min-h-[44px]"
                  >
                    <span>Connect Directly</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: 7 Focused Disciplines */}
              <div className="lg:col-span-7 space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan font-semibold block">
                  {aboutContent.currentPathHeadline}
                </span>

                <div className="divide-y divide-[#1E293B] border-t border-b border-[#1E293B]">
                  {aboutContent.focusDisciplines.map((item, idx) => (
                    <div key={item.title} className="py-3 sm:py-3.5 flex items-start gap-4 group">
                      <span className="font-mono text-xs text-cyber-cyan font-semibold pt-0.5">
                        0{idx + 1}
                      </span>
                      <div className="space-y-0.5">
                        <h4 className="font-sans text-sm font-semibold text-white group-hover:text-cyber-cyan transition-colors">
                          {item.title}
                        </h4>
                        <p className="font-sans text-xs text-slate-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          CURRENT FOCUS: VERTICAL PROGRESSION TIMELINE
          ========================================================================= */}
      <section className="py-20 sm:py-24 border-b border-[#1E293B] bg-[#0D1117]">
        <Container width="wide">
          <div className="space-y-10 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#1E293B] pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyber-cyan font-semibold block">
                  CHRONOLOGICAL RIGOR
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white">
                  {currentFocusTimeline.title}
                </h2>
              </div>
              <p className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                {currentFocusTimeline.year} &middot; {currentFocusTimeline.subtitle}
              </p>
            </div>

            {/* Vertical progression steps */}
            <div className="divide-y divide-[#1E293B] border-t border-b border-[#1E293B]">
              {currentFocusTimeline.stages.map((stg) => (
                <div
                  key={stg.topic}
                  className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-[#151D2A] px-2 sm:px-4 rounded transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="font-mono text-xs text-cyber-cyan font-semibold">
                      {stg.level}
                    </span>
                    <div>
                      <h3 className="font-sans text-base sm:text-lg text-white font-medium group-hover:text-cyber-cyan transition-colors">
                        {stg.topic}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {stg.detail}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-wider text-cyber-cyan bg-[#070A0F] px-2.5 py-1 rounded border border-cyber-cyan/30 self-start sm:self-auto">
                    {stg.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          HOW I BUILD: ENGINEERING PRINCIPLES
          ========================================================================= */}
      <section className="py-20 sm:py-24 border-b border-[#1E293B] bg-[#070A0F]">
        <Container width="wide">
          <div className="space-y-12">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
                METHODOLOGY &amp; PRINCIPLES
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-cyber-emerald flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse" />
                DETERMINISTIC SYSTEMS
              </span>
            </div>

            <div className="max-w-xl">
              <h2 className="font-sans text-3xl sm:text-4xl text-white font-bold">
                How I Build
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                Core operating principles governing every autonomous kernel, model evaluation, and line of code.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {engineeringPrinciples.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-[#1E293B] bg-[#0D1117] p-5 sm:p-6 flex flex-col space-y-3 hover:border-cyber-cyan/50 hover:bg-[#151D2A] transition-all"
                >
                  <span className="font-mono text-xs text-cyber-cyan uppercase tracking-widest font-semibold">
                    {item.number} {"//"} PRINCIPLE
                  </span>
                  <h3 className="font-sans text-lg sm:text-xl text-white font-bold">
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs text-cyber-cyan leading-relaxed border-l border-cyber-cyan/50 pl-2">
                    &ldquo;{item.rule}&rdquo;
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {item.elaboration}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          / 04 THE DIRECTION: PERSONAL & TECHNICAL TRAJECTORY
          ========================================================================= */}
      <DirectionSection
        onExploreAshi={() => setActiveProject(selectedProjects[0])}
      />

      {/* =========================================================================
          / 05 SELECTED WORK: EDITORIAL GRID & TECHNICAL DOSSIERS
          ========================================================================= */}
      <section id="projects" className="py-14 sm:py-24 border-b border-[#1E293B] bg-[#070A0F]">
        <Container width="wide">
          <div className="space-y-8 sm:space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-[#1E293B] pb-3 sm:pb-4">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 block">
                  <span className="text-cyber-cyan font-semibold">/ 05</span> SELECTED WORK
                </span>
                <h2 className="font-sans text-2xl sm:text-4xl text-white font-bold">
                  Engineered Systems &amp; Runtimes
                </h2>
              </div>

              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-cyber-cyan">
                VERIFIED IMPLEMENTATIONS ONLY
              </span>
            </div>

            {/* 4 Selected Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {selectedProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-lg border border-[#1E293B] bg-[#0D1117] p-5 sm:p-8 flex flex-col justify-between hover:border-cyber-cyan/60 hover:bg-[#151D2A] transition-all group shadow-md"
                >
                  <div className="space-y-3.5 sm:space-y-4">
                    {/* Top Kicker */}
                    <div className="flex items-center justify-between font-mono text-xs border-b border-[#1E293B] pb-2.5 sm:pb-3 text-slate-400">
                      <span className="text-cyber-cyan font-semibold">[ {proj.number} ]</span>
                      <span className="bg-cyber-cyan/10 px-2 py-0.5 rounded border border-cyber-cyan/30 text-cyber-cyan text-[10px] font-medium">
                        {proj.status}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="font-sans text-xl sm:text-2xl text-white font-bold group-hover:text-cyber-cyan transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                        {proj.tagline}
                      </p>
                    </div>

                    {/* Technology list */}
                    <div className="flex flex-wrap gap-1.5 pt-1.5 sm:pt-2">
                      {proj.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded border border-[#1E293B] bg-[#070A0F] text-[10px] sm:text-[11px] font-mono text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action: Open Full Technical Dossier */}
                  <div className="pt-6 sm:pt-8 mt-5 sm:mt-6 border-t border-[#1E293B] flex items-center justify-between">
                    <span className="font-mono text-[10px] sm:text-[11px] text-slate-400">
                      CYCLE: {proj.year}
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveProject(proj)}
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-cyber-cyan hover:text-white group-hover:translate-x-0.5 transition-all cursor-pointer min-h-[44px] py-1 font-semibold"
                    >
                      <span>View Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          / 06 THE LAB: WHERE IDEAS MEET REALITY (EDITORIAL BRIDGE)
          ========================================================================= */}
      <section id="lab" className="py-14 sm:py-24 border-b border-[#1E293B] bg-[#0D1117]">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2.5 sm:gap-3 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-slate-400 uppercase">
                <span className="text-cyber-cyan font-semibold">/ 06</span>
                <span className="w-5 sm:w-8 h-[1px] bg-[#1E293B]" />
                <span className="text-white">THE LAB</span>
              </div>

              <h2 className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.08] sm:leading-[1.02] tracking-tight">
                Empirical AI Systems Laboratory.
              </h2>

              <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                <span className="font-bold text-cyber-cyan">
                  {labMetrics.total_pieces} records
                </span>{" "}
                of authentic engineering history across Ashi, LEO, and VANI.
              </p>

              {/* 4 Core Tenet Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1 sm:pt-2 font-mono text-xs">
                <div className="p-2.5 sm:p-3 rounded bg-[#070A0F] border border-[#1E293B]">
                  <span className="text-[9px] sm:text-[10px] text-cyber-cyan block mb-0.5 sm:mb-1">01</span>
                  <span className="font-semibold text-white text-[11px] sm:text-xs">Failures.</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded bg-[#070A0F] border border-[#1E293B]">
                  <span className="text-[9px] sm:text-[10px] text-cyber-cyan block mb-0.5 sm:mb-1">02</span>
                  <span className="font-semibold text-white text-[11px] sm:text-xs">Experiments.</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded bg-[#070A0F] border border-[#1E293B]">
                  <span className="text-[9px] sm:text-[10px] text-cyber-cyan block mb-0.5 sm:mb-1">03</span>
                  <span className="font-semibold text-white text-[11px] sm:text-xs">Architecture.</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded bg-[#070A0F] border border-[#1E293B]">
                  <span className="text-[9px] sm:text-[10px] text-cyber-cyan block mb-0.5 sm:mb-1">04</span>
                  <span className="font-semibold text-white text-[11px] sm:text-xs">Lessons.</span>
                </div>
              </div>

              <div className="pt-2 sm:pt-4">
                <Link
                  href="/lab"
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 rounded bg-cyber-cyan text-obsidian-dark font-mono text-xs uppercase tracking-wider font-bold hover:bg-cyber-cyan/90 transition-colors shadow-sm min-h-[44px]"
                >
                  <span>Explore the Lab</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Right Archival Record Card */}
            <div className="w-full lg:col-span-5 p-4 sm:p-7 rounded-lg bg-[#070A0F] border border-[#1E293B] font-mono text-xs space-y-3 sm:space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-2.5 text-slate-400">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-cyber-cyan font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
                  ARCHIVE TELEMETRY
                </span>
                <span className="text-[10px] text-slate-400">
                  {String(labMetrics.total_projects).padStart(2, "0")} RUNTIMES / {String(labMetrics.total_pieces).padStart(2, "0")} RECORDS
                </span>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Link
                  href="/lab/ashi"
                  className="flex items-center justify-between py-2 sm:py-1.5 border-b border-[#1E293B] text-slate-200 hover:text-cyber-cyan transition-colors min-h-[38px]"
                >
                  <span className="text-[11px] sm:text-xs font-semibold">01 ASHI (OPERATING SYSTEM)</span>
                  <span className="font-bold text-cyber-cyan">{labMetrics.by_project.ashi || 20}</span>
                </Link>
                <Link
                  href="/lab/leo"
                  className="flex items-center justify-between py-2 sm:py-1.5 border-b border-[#1E293B] text-slate-200 hover:text-cyber-cyan transition-colors min-h-[38px]"
                >
                  <span className="text-[11px] sm:text-xs font-semibold">02 LEO (AI COMPANION)</span>
                  <span className="font-bold text-cyber-cyan">{labMetrics.by_project.leo || 21}</span>
                </Link>
                <Link
                  href="/lab/vani"
                  className="flex items-center justify-between py-2 sm:py-1.5 border-b border-[#1E293B] text-slate-200 hover:text-cyber-cyan transition-colors min-h-[38px]"
                >
                  <span className="text-[11px] sm:text-xs font-semibold">03 VANI (COGNITIVE OS)</span>
                  <span className="font-bold text-cyber-cyan">{labMetrics.by_project.vani || 21}</span>
                </Link>
              </div>

              <div className="pt-2 text-[10px] sm:text-[11px] font-sans text-slate-400 leading-relaxed border-t border-[#1E293B]">
                Every record is backed by authentic commits, phase documents, ADRs, or test logs. Zero marketing claims.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          / 07 ENGINEERING NOTES: THINKING THROUGH THE WORK
          ========================================================================= */}
      <section id="writing" className="py-14 sm:py-24 border-b border-[#1E293B] bg-[#070A0F]">
        <Container width="wide">
          <div className="space-y-8 sm:space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-[#1E293B] pb-3 sm:pb-4">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 block">
                  <span className="text-cyber-cyan font-semibold">/ 07</span> ENGINEERING NOTES
                </span>
                <h2 className="font-sans text-2xl sm:text-4xl text-white font-bold">
                  Thinking through the work.
                </h2>
              </div>

              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-slate-400">
                AUTHENTIC WORKING DISPATCHES
              </span>
            </div>

            {/* 3 Editorial Journal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {engineeringNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => setActiveNote(note)}
                  className="flex flex-col justify-between p-5 sm:p-7 rounded-lg border border-[#1E293B] bg-[#0D1117] hover:border-cyber-cyan/60 hover:bg-[#151D2A] transition-all group min-h-[230px] sm:min-h-[250px] cursor-pointer shadow-md"
                >
                  <div className="space-y-3.5 sm:space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-[#1E293B] pb-2.5 sm:pb-3">
                      <span className="text-cyber-cyan font-semibold">{note.issue}</span>
                      <span className="text-slate-500">{note.date}</span>
                    </div>

                    <h3 className="font-sans text-base sm:text-lg font-bold text-white group-hover:text-cyber-cyan transition-colors leading-snug">
                      {note.title}
                    </h3>

                    <p className="text-xs font-mono text-cyber-cyan">
                      {note.readTime} &middot; {note.statusLabel}
                    </p>
                  </div>

                  <div className="pt-4 sm:pt-6 border-t border-[#1E293B] mt-4">
                    <p className="font-mono text-xs text-slate-400 leading-relaxed line-clamp-2">
                      &ldquo;{note.excerpt}&rdquo;
                    </p>
                    <div className="flex items-center justify-end gap-1 font-mono text-[11px] uppercase tracking-wider text-cyber-cyan pt-3 sm:pt-4 group-hover:translate-x-1 transition-transform min-h-[36px] font-semibold">
                      <span>Read Note</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          / 06 TOOLS & TECHNOLOGIES: GROUPED & AUTHENTIC
          ========================================================================= */}
      <section id="skills" className="py-14 sm:py-24 border-b border-[#1E293B] bg-[#0D1117]">
        <Container width="wide">
          <div className="space-y-8 sm:space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-[#1E293B] pb-3 sm:pb-4">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 block">
                  <span className="text-cyber-cyan font-semibold">{skillsGrouped.sectionNumber}</span>{" "}
                  {skillsGrouped.eyebrow}
                </span>
                <h2 className="font-sans text-2xl sm:text-4xl text-white font-bold">
                  {skillsGrouped.title}
                </h2>
              </div>

              <p className="font-mono text-xs text-slate-400 max-w-xs sm:text-right">
                {skillsGrouped.subtitle}
              </p>
            </div>

            {/* 2 Grouped Categories (AI/ML and Systems) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
              {skillsGrouped.categories.map((category) => (
                <div
                  key={category.name}
                  className="rounded-lg border border-[#1E293B] bg-[#070A0F] p-5 sm:p-8 space-y-4 sm:space-y-6 shadow-md"
                >
                  <div className="border-b border-[#1E293B] pb-3">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan font-semibold">
                      {category.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {category.description}
                    </p>
                  </div>

                  <div className="divide-y divide-[#1E293B]">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="py-2.5 sm:py-3 flex items-baseline justify-between gap-3 sm:gap-4"
                      >
                        <span className="font-mono text-xs sm:text-sm text-cyber-cyan font-medium shrink-0">
                          [ {item.name} ]
                        </span>
                        <span className="font-sans text-xs text-slate-300 text-right">
                          {item.context}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          PERSONAL BRAND STATEMENT: QUIET FULL-WIDTH RESTRAINT
          ========================================================================= */}
      <section className="py-16 sm:py-28 border-b border-[#1E293B] bg-[#070A0F] text-center">
        <Container width="content">
          <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-cyber-cyan block">
              CAREER DIRECTION // SYSTEM HORIZON
            </span>
            <p className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
              &ldquo;{personalBrandStatement.quote}&rdquo;
            </p>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-slate-400 pt-1 sm:pt-2">
              {personalBrandStatement.subtext}
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          / 07 CONTACT: UNDERSTATED COLLABORATION INVITATION
          ========================================================================= */}
      <section id="contact" className="py-14 sm:py-24 border-b border-[#1E293B] bg-[#0D1117]">
        <Container width="wide">
          <div className="space-y-8 sm:space-y-12">
            <div className="flex items-center justify-between border-b border-[#1E293B] pb-3 sm:pb-4">
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-slate-400">
                <span className="text-cyber-cyan font-semibold">{contactContent.sectionNumber}</span>{" "}
                {contactContent.eyebrow}
              </span>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-cyber-emerald flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse" />
                COMMUNICATION CHANNEL ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Left Column: Direct Invitation */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <h2 className="font-sans font-bold text-3xl sm:text-4xl text-white leading-tight">
                  &ldquo;{contactContent.headline}&rdquo;
                </h2>
                <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-xl">
                  {contactContent.supportingText}
                </p>

                {/* Email quick action card */}
                <div className="p-4 sm:p-6 rounded-lg border border-[#1E293B] bg-[#070A0F] max-w-lg space-y-2.5 sm:space-y-3">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-cyber-cyan block font-semibold">
                    DIRECT DISPATCH &middot; PGP/EMAIL
                  </span>
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <span className="font-mono text-xs sm:text-sm text-slate-200 truncate">
                      {contactContent.email}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded border border-cyber-cyan/50 bg-cyber-cyan/15 text-cyber-cyan hover:bg-cyber-cyan hover:text-obsidian-dark text-xs font-mono uppercase tracking-wider transition-colors shrink-0 font-semibold min-h-[44px]"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-cyber-emerald" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Links */}
              <div className="lg:col-span-5 space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyber-cyan font-semibold block">
                  PROFILES &amp; REPOSITORIES
                </span>

                <div className="divide-y divide-[#1E293B] border-t border-b border-[#1E293B]">
                  {contactContent.links.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="py-3.5 sm:py-4 flex items-center justify-between text-xs sm:text-sm font-mono text-slate-300 hover:text-cyber-cyan group transition-colors min-h-[44px]"
                    >
                      <div className="flex items-baseline gap-2.5 sm:gap-3">
                        <span className="text-cyber-cyan font-semibold">
                          [ {link.platform} ]
                        </span>
                        <span className="text-white">{link.label}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyber-cyan group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          INTERACTIVE MODALS: ACCESSIBLE EDITORIAL READING SPACES
          ========================================================================= */}
      <NoteReaderModal
        note={activeNote}
        onClose={() => setActiveNote(null)}
        onSelectNote={(note) => setActiveNote(note)}
        allNotes={engineeringNotes}
      />

      <ProjectDossierModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}
