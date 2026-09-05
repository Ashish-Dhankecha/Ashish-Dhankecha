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

export default function HomePage() {
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
    <div className="w-full flex flex-col flex-1 bg-[#F3F0E8] text-[#111111]">
      {/* Anchor for Home */}
      <div id="home" className="sr-only" aria-hidden="true" />

      {/* =========================================================================
          / 01 HERO SECTION: MONUMENTAL EDITORIAL TYPOGRAPHY (FULL-WIDTH EXPANSIVE)
          ========================================================================= */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#D8D4CB] bg-[#F3F0E8]">
        <Container width="wide">
          {/* Eyebrow & Issue Kicker */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[#555555] uppercase mb-8 sm:mb-12">
            <span className="text-[#173B70] font-semibold">{heroContent.sectionNumber}</span>
            <span className="w-6 sm:w-8 h-[1px] bg-[#D8D4CB]" />
            <span className="text-[#111111]">{heroContent.eyebrow}</span>
          </div>

          {/* Expansive Headline */}
          <div className="max-w-4xl mb-8 sm:mb-10">
            <h1 className="font-display font-light text-5xl sm:text-6xl lg:text-[5.75rem] leading-[0.96] tracking-tight text-[#111111]">
              {heroContent.headline.line1} <br />
              <span className="italic font-normal text-[#111111]">
                {heroContent.headline.line2}
              </span>{" "}
              <br />
              {heroContent.headline.line3}
            </h1>
          </div>

          {/* Supporting Bio & CTAs */}
          <div className="max-w-2xl space-y-8">
            <div className="space-y-4">
              {heroContent.supportingParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="text-base sm:text-lg text-[#555555] font-sans leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-5 sm:gap-6 pt-2">
              <Link
                href={heroContent.ctaPrimary.href}
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#111111] text-[#F3F0E8] font-mono text-xs uppercase tracking-wider hover:bg-[#173B70] transition-colors shadow-sm"
              >
                <span>{heroContent.ctaPrimary.label}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href={heroContent.ctaSecondary.href}
                className="font-mono text-xs uppercase tracking-widest text-[#555555] hover:text-[#111111] underline underline-offset-8 decoration-[#D8D4CB] hover:decoration-[#111111] transition-all"
              >
                {heroContent.ctaSecondary.label} &mdash;
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          HERO PHILOSOPHY: RESTRAINED ENGINEERING AXIOM
          ========================================================================= */}
      <section className="py-12 sm:py-16 border-b border-[#D8D4CB] bg-[#F3F0E8]">
        <Container width="wide">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B8579] block mb-3">
              ENGINEERING AXIOM
            </span>
            <p className="font-display italic text-2xl sm:text-3xl lg:text-4xl text-[#111111] font-light leading-snug">
              &ldquo;{heroPhilosophy.statement}&rdquo;
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          CURRENTLY: CONCEPTUAL MARKERS / PROOF STRIP
          ========================================================================= */}
      <section className="py-12 sm:py-14 border-b border-[#D8D4CB] bg-[#EDE8DE]/40">
        <Container width="wide">
          <div className="flex items-center justify-between border-b border-[#D8D4CB] pb-3 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#555555]">
              CURRENT FOCUS &middot; ACTIVE HORIZON
            </span>
            <span className="font-mono text-[10px] text-[#8B8579]">2026 CYCLE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {currentlyMarkers.map((marker, idx) => (
              <div
                key={marker.label}
                className="p-5 border border-[#D8D4CB] bg-[#F3F0E8] space-y-2 hover:border-[#111111] transition-colors"
              >
                <div className="flex items-baseline justify-between font-mono text-[10px] text-[#8B8579]">
                  <span>[ 0{idx + 1} ]</span>
                  <span className="w-1.5 h-1.5 bg-[#173B70]" />
                </div>
                <h2 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[#111111] font-semibold pt-1">
                  {marker.label}
                </h2>
                <p className="text-xs text-[#555555] font-sans leading-relaxed">
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
      <section id="ashi-section" className="py-20 sm:py-24 border-b border-[#D8D4CB]">
        <Container width="wide">
          <div className="space-y-12">
            {/* Header Plate */}
            <div className="flex items-center justify-between border-b border-[#D8D4CB] pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#555555]">
                <span className="text-[#173B70] font-semibold">{featuredAshiContent.sectionNumber}</span>{" "}
                {featuredAshiContent.badge}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#8B8579]">
                {featuredAshiContent.status}
              </span>
            </div>

            {/* Main Specification Card */}
            <div className="border border-[#111111] bg-[#EDE8DE]/40 p-6 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                {/* Left: Overview, Specs & Action */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B8579] block mb-1">
                      LONG-TERM RESEARCH INITIATIVE
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-light text-[#111111] tracking-tight">
                      {featuredAshiContent.title}
                    </h2>
                    <p className="font-display italic text-lg sm:text-xl text-[#555555] mt-1">
                      {featuredAshiContent.subtitle}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#111111] font-sans leading-relaxed">
                    {featuredAshiContent.description}
                  </p>

                  {/* Architecture metadata ledger */}
                  <div className="border-t border-b border-[#D8D4CB] py-3.5 space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-[#D8D4CB]/50">
                      <span className="text-[#555555]">PARADIGM</span>
                      <span className="text-[#111111] font-medium text-right">
                        {featuredAshiContent.paradigm}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#D8D4CB]/50">
                      <span className="text-[#555555]">STATE LEDGER</span>
                      <span className="text-[#111111] font-medium">Deterministic &amp; Auditable</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#555555]">ENGINEERING CYCLE</span>
                      <span className="text-[#173B70] font-medium">Active Development</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveProject(selectedProjects[0])}
                      className="group inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-[#F3F0E8] font-mono text-xs uppercase tracking-wider hover:bg-[#173B70] transition-colors shadow-sm cursor-pointer"
                    >
                      <span>Explore Ashi</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    <a
                      href={featuredAshiContent.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 border border-[#111111] text-[#111111] font-mono text-xs uppercase tracking-wider hover:bg-[#F3F0E8] hover:border-[#173B70] transition-colors"
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
            <div className="border border-[#D8D4CB] bg-[#F3F0E8] p-6 sm:p-10 max-w-4xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#173B70] font-semibold block mb-2">
                INTELLECTUAL CURIOSITY // FIRST PRINCIPLES
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-light text-[#111111] mb-4">
                {featuredAshiContent.whyTitle}
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-[#111111] leading-relaxed">
                {featuredAshiContent.whyText.map((paragraph, pIdx) => (
                  <p key={pIdx} className={pIdx === 1 ? "font-mono text-xs sm:text-sm bg-[#EDE8DE] p-4 border-l-2 border-[#173B70] text-[#111111] leading-relaxed" : ""}>
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
      <section id="about" className="py-20 sm:py-24 border-b border-[#D8D4CB]">
        <Container width="wide">
          <div className="space-y-12">
            <div className="flex items-center justify-between border-b border-[#D8D4CB] pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#555555]">
                <span className="text-[#173B70] font-semibold">{aboutContent.sectionNumber}</span>{" "}
                {aboutContent.eyebrow}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#8B8579]">
                FOUNDATIONAL VALUES
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Personal Narrative */}
              <div className="lg:col-span-5 space-y-6">
                <h2 className="font-display font-light text-4xl sm:text-5xl text-[#111111] leading-tight whitespace-pre-line">
                  {aboutContent.headline}
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-[#555555] leading-relaxed">
                  {aboutContent.narrativeParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[#111111] text-[#111111] font-mono text-xs uppercase tracking-wider hover:bg-[#111111] hover:text-[#F3F0E8] transition-all"
                  >
                    <span>Connect Directly</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: 7 Focused Disciplines */}
              <div className="lg:col-span-7 space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#173B70] font-semibold block">
                  {aboutContent.currentPathHeadline}
                </span>

                <div className="divide-y divide-[#D8D4CB] border-t border-b border-[#D8D4CB]">
                  {aboutContent.focusDisciplines.map((item, idx) => (
                    <div key={item.title} className="py-3 sm:py-3.5 flex items-start gap-4 group">
                      <span className="font-mono text-xs text-[#8B8579] group-hover:text-[#173B70] transition-colors pt-0.5">
                        0{idx + 1}
                      </span>
                      <div className="space-y-0.5">
                        <h4 className="font-sans text-sm font-semibold text-[#111111]">
                          {item.title}
                        </h4>
                        <p className="font-sans text-xs text-[#555555] leading-relaxed">
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
      <section className="py-20 sm:py-24 border-b border-[#D8D4CB] bg-[#EDE8DE]/20">
        <Container width="wide">
          <div className="space-y-10 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#D8D4CB] pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#173B70] font-semibold block">
                  CHRONOLOGICAL RIGOR
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-light text-[#111111]">
                  {currentFocusTimeline.title}
                </h2>
              </div>
              <p className="font-mono text-xs text-[#555555] uppercase tracking-wider">
                {currentFocusTimeline.year} &middot; {currentFocusTimeline.subtitle}
              </p>
            </div>

            {/* Vertical progression steps */}
            <div className="divide-y divide-[#D8D4CB] border-t border-b border-[#D8D4CB]">
              {currentFocusTimeline.stages.map((stg) => (
                <div
                  key={stg.topic}
                  className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-[#EDE8DE]/40 px-2 sm:px-4 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="font-mono text-xs text-[#8B8579] group-hover:text-[#173B70] font-semibold">
                      {stg.level}
                    </span>
                    <div>
                      <h3 className="font-display text-lg sm:text-xl text-[#111111] font-normal group-hover:text-[#173B70] transition-colors">
                        {stg.topic}
                      </h3>
                      <p className="text-xs text-[#555555] mt-0.5">
                        {stg.detail}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#555555] bg-[#F3F0E8] px-2.5 py-1 border border-[#D8D4CB] self-start sm:self-auto">
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
      <section className="py-20 sm:py-24 border-b border-[#D8D4CB]">
        <Container width="wide">
          <div className="space-y-12">
            <div className="flex items-center justify-between border-b border-[#D8D4CB] pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#555555]">
                METHODOLOGY &amp; PRINCIPLES
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#8B8579]">
                ENGINEERING MATURITY
              </span>
            </div>

            <div className="max-w-xl">
              <h2 className="font-display text-3xl sm:text-4xl text-[#111111] font-light">
                How I Build
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] mt-2 leading-relaxed">
                Core operating principles governing every system, experiment, and line of code.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#D8D4CB]">
              {engineeringPrinciples.map((item, index) => (
                <div
                  key={item.title}
                  className={`flex flex-col space-y-4 ${
                    index > 0 ? "lg:pl-8" : ""
                  } ${index < 3 ? "lg:pr-8" : ""}`}
                >
                  <span className="font-mono text-xs text-[#173B70] uppercase tracking-widest font-semibold">
                    {item.number} {"//"} PRINCIPLE
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl text-[#111111] font-normal">
                    {item.title}
                  </h3>
                  <p className="font-display italic text-sm text-[#111111] leading-relaxed">
                    &ldquo;{item.rule}&rdquo;
                  </p>
                  <p className="text-xs text-[#555555] leading-relaxed pt-1">
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
      <section id="projects" className="py-20 sm:py-24 border-b border-[#D8D4CB]">
        <Container width="wide">
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D8D4CB] pb-4">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#555555] block">
                  <span className="text-[#173B70] font-semibold">/ 05</span> SELECTED WORK
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-[#111111] font-light">
                  Engineered Systems &amp; Experiments
                </h2>
              </div>

              <span className="font-mono text-xs uppercase tracking-wider text-[#8B8579]">
                VERIFIED IMPLEMENTATIONS ONLY
              </span>
            </div>

            {/* 4 Selected Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {selectedProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="border border-[#D8D4CB] bg-[#EDE8DE]/30 p-7 sm:p-8 flex flex-col justify-between hover:border-[#111111] transition-all group"
                >
                  <div className="space-y-4">
                    {/* Top Kicker */}
                    <div className="flex items-center justify-between font-mono text-xs border-b border-[#D8D4CB] pb-3 text-[#555555]">
                      <span className="text-[#173B70] font-semibold">[ {proj.number} ]</span>
                      <span className="bg-[#F3F0E8] px-2 py-0.5 border border-[#D8D4CB] text-[10px]">
                        {proj.status}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal group-hover:text-[#173B70] transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#555555] mt-1.5 leading-relaxed">
                        {proj.tagline}
                      </p>
                    </div>

                    {/* Technology list */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {proj.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 border border-[#D8D4CB] bg-[#F3F0E8] text-[11px] font-mono text-[#555555]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action: Open Full Technical Dossier */}
                  <div className="pt-8 mt-6 border-t border-[#D8D4CB] flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#8B8579]">
                      CYCLE: {proj.year}
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveProject(proj)}
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#111111] hover:text-[#173B70] group-hover:translate-x-0.5 transition-all cursor-pointer"
                    >
                      <span>View Project</span>
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
          / 06 ENGINEERING NOTES: THINKING THROUGH THE WORK
          ========================================================================= */}
      <section id="writing" className="py-20 sm:py-24 border-b border-[#D8D4CB]">
        <Container width="wide">
          <div className="space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D8D4CB] pb-4">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#555555] block">
                  <span className="text-[#173B70] font-semibold">/ 06</span> ENGINEERING NOTES
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-[#111111] font-light">
                  Thinking through the work.
                </h2>
              </div>

              <span className="font-mono text-xs uppercase tracking-wider text-[#8B8579]">
                AUTHENTIC WORKING DISPATCHES
              </span>
            </div>

            {/* 3 Editorial Journal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {engineeringNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => setActiveNote(note)}
                  className="flex flex-col justify-between p-7 border border-[#D8D4CB] bg-[#EDE8DE]/30 hover:border-[#111111] hover:bg-[#EDE8DE]/80 transition-all group min-h-[250px] cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-[#555555] border-b border-[#D8D4CB] pb-3">
                      <span className="text-[#173B70] font-semibold">{note.issue}</span>
                      <span className="text-[#8B8579]">{note.date}</span>
                    </div>

                    <h3 className="font-display text-xl font-normal text-[#111111] group-hover:text-[#173B70] transition-colors leading-snug">
                      {note.title}
                    </h3>

                    <p className="text-xs font-mono text-[#8B8579]">
                      {note.readTime} &middot; {note.statusLabel}
                    </p>
                  </div>

                  <div className="pt-6">
                    <p className="font-display italic text-xs text-[#555555] leading-relaxed">
                      &ldquo;{note.excerpt}&rdquo;
                    </p>
                    <div className="flex items-center justify-end gap-1 font-mono text-[11px] uppercase tracking-wider text-[#111111] pt-4 group-hover:translate-x-1 transition-transform">
                      <span>Read Note</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#173B70]" />
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
      <section id="skills" className="py-20 sm:py-24 border-b border-[#D8D4CB]">
        <Container width="wide">
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D8D4CB] pb-4">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#555555] block">
                  <span className="text-[#173B70] font-semibold">{skillsGrouped.sectionNumber}</span>{" "}
                  {skillsGrouped.eyebrow}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-[#111111] font-light">
                  {skillsGrouped.title}
                </h2>
              </div>

              <p className="font-mono text-xs text-[#8B8579] max-w-xs sm:text-right">
                {skillsGrouped.subtitle}
              </p>
            </div>

            {/* 2 Grouped Categories (AI/ML and Systems) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {skillsGrouped.categories.map((category) => (
                <div
                  key={category.name}
                  className="border border-[#D8D4CB] bg-[#EDE8DE]/30 p-6 sm:p-8 space-y-6"
                >
                  <div className="border-b border-[#D8D4CB] pb-3">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#173B70] font-semibold">
                      {category.name}
                    </h3>
                    <p className="text-xs text-[#555555] mt-1">
                      {category.description}
                    </p>
                  </div>

                  <div className="divide-y divide-[#D8D4CB]">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="py-3 flex items-baseline justify-between gap-4"
                      >
                        <span className="font-mono text-xs sm:text-sm text-[#111111] font-medium">
                          [ {item.name} ]
                        </span>
                        <span className="font-sans text-xs text-[#555555] text-right">
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
      <section className="py-24 sm:py-32 border-b border-[#D8D4CB] bg-[#F3F0E8] text-center">
        <Container width="content">
          <div className="space-y-6 max-w-2xl mx-auto">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8B8579] block">
              CAREER DIRECTION
            </span>
            <p className="font-display font-light text-3xl sm:text-4xl lg:text-5xl text-[#111111] leading-tight">
              &ldquo;{personalBrandStatement.quote}&rdquo;
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#555555] pt-2">
              {personalBrandStatement.subtext}
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          / 07 CONTACT: UNDERSTATED COLLABORATION INVITATION
          ========================================================================= */}
      <section id="contact" className="py-20 sm:py-24 border-b border-[#D8D4CB]">
        <Container width="wide">
          <div className="space-y-12">
            <div className="flex items-center justify-between border-b border-[#D8D4CB] pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#555555]">
                <span className="text-[#173B70] font-semibold">{contactContent.sectionNumber}</span>{" "}
                {contactContent.eyebrow}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#8B8579]">
                LET&apos;S CONNECT
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Direct Invitation */}
              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-display font-light text-4xl sm:text-5xl text-[#111111] leading-tight">
                  &ldquo;{contactContent.headline}&rdquo;
                </h2>
                <p className="text-base sm:text-lg text-[#555555] font-sans leading-relaxed max-w-xl">
                  {contactContent.supportingText}
                </p>

                {/* Email quick action card */}
                <div className="p-6 border border-[#D8D4CB] bg-[#EDE8DE]/40 max-w-lg space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8B8579] block">
                    DIRECT INQUIRIES
                  </span>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs sm:text-sm text-[#111111] truncate">
                      {contactContent.email}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#111111] bg-[#111111] text-[#F3F0E8] hover:bg-[#173B70] text-xs font-mono uppercase tracking-wider transition-colors shrink-0"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
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
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#173B70] font-semibold block">
                  PROFILES &amp; CHANNELS
                </span>

                <div className="divide-y divide-[#D8D4CB] border-t border-b border-[#D8D4CB]">
                  {contactContent.links.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="py-4 flex items-center justify-between text-xs sm:text-sm font-mono text-[#555555] hover:text-[#111111] group transition-colors"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="text-[#173B70] font-semibold">
                          [ {link.platform} ]
                        </span>
                        <span className="text-[#111111]">{link.label}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#8B8579] group-hover:text-[#173B70] transition-colors" />
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
