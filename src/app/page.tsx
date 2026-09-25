"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Copy, Check, ExternalLink, Globe } from "lucide-react";
import { Container } from "@/components/layout/container";
import { AshiArchitectureDiagram } from "@/components/architecture/ashi-architecture";
import { DirectionSection } from "@/components/direction/direction-section";
import { NoteReaderModal } from "@/components/modals/note-reader-modal";
import { ProjectDossierModal } from "@/components/modals/project-dossier-modal";
import { TechMarquee } from "@/components/ui/tech-marquee";
import {
  featuredAshiContent,
  selectedProjects,
  aboutContent,
  currentFocusTimeline,
  engineeringPrinciples,
  engineeringNotes,
  skillsGrouped,
  personalBrandStatement,
  contactContent,
  processSteps,
  kindWords,
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
    <div className="w-full flex flex-col flex-1 bg-[#0C0608] text-[#F5EBE1]">
      {/* Anchor for Home */}
      <div id="home" className="sr-only" aria-hidden="true" />

      {/* =========================================================================
          / 01 HERO SECTION: LUXURY VELVET THEME (WITH USER'S REQUESTED TEXT & COMPOSITION)
          ========================================================================= */}
      <section className="relative w-full py-20 sm:py-24 md:py-28 lg:py-32 bg-[#0C0608] border-b border-[#2D161C] overflow-hidden select-none">
        {/* Deep Velvet Radial Background Glow */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#3D141C_0%,#1A070B_50%,#0C0608_100%)] opacity-95"
          aria-hidden="true"
        />

        {/* Ambient Circular Halo Glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[350px] sm:h-[450px] rounded-full bg-[radial-gradient(circle,#6B212F_0%,#2D0E15_55%,transparent_75%)] opacity-70 blur-3xl"
          aria-hidden="true"
        />

        {/* Technical Subtle Wine Grid Overlay */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(45,22,28,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,22,28,0.4)_1px,transparent_1px)] bg-[size:40px_40px] opacity-80"
          aria-hidden="true"
        />

        <Container width="wide" className="relative z-10">
          <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
            {/* Top Pill: Open for Collaboration */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full border border-[#4A202A] bg-[#1A0A0F]/90 text-[#F5EBE1] text-xs sm:text-sm font-mono uppercase tracking-[0.2em] shadow-lg shadow-[#801D2C]/15 backdrop-blur-md transition-all hover:border-[#801D2C]">
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#10B981]/50 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                </span>
                <span>Open for Collaboration</span>
              </div>
            </div>

            {/* Main Headline: "Hi, I'm Ashish Dhankecha" — Script Style matching reference */}
            <div className="text-center mb-6 sm:mb-8 px-2 w-full">
              <h1 className="font-serif font-bold text-3xl sm:text-5xl md:text-[3.25rem] lg:text-[3.75rem] xl:text-[4.25rem] tracking-tight text-[#F5EBE1] leading-[1.2] inline-flex flex-wrap md:flex-nowrap items-baseline justify-center gap-x-3.5 sm:gap-x-5 whitespace-normal md:whitespace-nowrap">
                <span className="shrink-0 text-[#E2D4C7]">Hi, I&apos;m</span>
                <span className="relative inline-block font-script font-normal text-5xl sm:text-7xl md:text-[4.75rem] lg:text-[5.5rem] xl:text-[6.25rem] text-[#DF7987] shrink-0 pb-1 sm:pb-2 tracking-wide drop-shadow-[0_0_20px_rgba(223,121,135,0.55)]">
                  Ashish Dhankecha
                </span>
              </h1>
            </div>

            {/* Editorial Bio Statement & Location (Directly from User Reference) */}
            <div className="max-w-xl mx-auto text-center space-y-6 sm:space-y-7 px-4">
              <p className="font-sans text-base sm:text-lg md:text-xl text-[#D9C7B8] leading-relaxed font-normal">
                I&apos;m an AI Systems Architect &amp; Designer, crafting elegant, functional, and user-centered digital operating systems.
              </p>

              <div className="flex items-center justify-center gap-3 pt-1">
                <div className="flex flex-col items-center sm:items-end text-center sm:text-right font-mono text-xs sm:text-sm tracking-[0.22em] uppercase leading-tight space-y-1">
                  <span className="text-[#DF7987] font-semibold">BASED IN INDIA</span>
                  <span className="text-[#D9C7B8]/80 text-[11px] sm:text-xs tracking-[0.25em]">WORKING WORLDWIDE</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#4A202A] bg-[#140A0D] flex items-center justify-center text-[#DF7987] shadow-sm shrink-0">
                  <Globe className="w-4 h-4 text-[#DF7987]" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Editorial Tech Ticker Ribbon */}
      <div className="border-b border-[#2D161C] bg-[#10070A] py-3.5 overflow-hidden">
        <TechMarquee />
      </div>

      {/* =========================================================================
          SELECTED PROJECTS: 3-COLUMN EDITORIAL SHOWCASE (DIRECT FROM REFERENCE)
          ========================================================================= */}
      <section id="projects" className="py-16 sm:py-24 border-b border-[#2D161C] bg-[#0C0608]">
        <Container width="wide">
          <div className="space-y-10 sm:space-y-14">
            {/* Header Plate */}
            <div className="flex items-center justify-between border-b border-[#2D161C] pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#F5EBE1] font-semibold">
                  SELECTED PROJECTS
                </span>
                <span className="text-[#DF7987]">✦</span>
              </div>

              <Link
                href="/lab"
                className="group flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#D9C7B8] hover:text-[#DF7987] transition-colors"
              >
                <span>VIEW ALL PROJECTS</span>
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>

            {/* 3-Column Editorial Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Card 01: VELVET / ASHI OS */}
              <div
                onClick={() => setActiveProject(selectedProjects[0])}
                className="group flex flex-col justify-between rounded-xl border border-[#2D161C] bg-[#140A0D] p-5 sm:p-6 hover:border-[#801D2C] hover:bg-[#1A0C11] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#801D2C]/15"
              >
                <div className="space-y-4">
                  {/* Card Title & Category */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs text-[#DF7987] font-semibold block">01</span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5EBE1] group-hover:text-[#DF7987] transition-colors mt-0.5">
                        VELVET / ASHI
                      </h3>
                      <p className="font-mono text-[11px] text-[#8E7C79] uppercase tracking-wider">
                        Autonomous AI OS &middot; Kernel
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#8E7C79] group-hover:text-[#DF7987] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  {/* Frame Preview Mockup */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#2D161C] bg-[#0C0608] p-4 flex flex-col justify-between group-hover:border-[#4A202A] transition-colors">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#DF7987] block">
                        ARCHITECTURE KERNEL
                      </span>
                      <p className="font-serif text-lg text-[#F5EBE1] font-semibold leading-tight">
                        Elevating Systems with Purpose
                      </p>
                    </div>

                    <div className="p-3 rounded bg-[#160B0F] border border-[#2D161C] space-y-1">
                      <div className="flex justify-between font-mono text-[9px] text-[#8E7C79]">
                        <span>COORDINATOR</span>
                        <span className="text-[#DF7987]">DETERMINISTIC</span>
                      </div>
                      <div className="w-full bg-[#2D161C] h-1 rounded-full overflow-hidden">
                        <div className="bg-[#801D2C] h-full w-4/5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pill Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-[#2D161C]">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#220B11] border border-[#4A202A] text-[#F5EBE1]">
                    AI KERNEL
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#220B11] border border-[#4A202A] text-[#D9C7B8]">
                    AUTONOMOUS
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#220B11] border border-[#4A202A] text-[#D9C7B8]">
                    STATE MACHINE
                  </span>
                </div>
              </div>

              {/* Card 02: AURORA / LEO */}
              <div
                onClick={() => setActiveProject(selectedProjects[1])}
                className="group flex flex-col justify-between rounded-xl border border-[#2D161C] bg-[#140A0D] p-5 sm:p-6 hover:border-[#801D2C] hover:bg-[#1A0C11] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#801D2C]/15"
              >
                <div className="space-y-4">
                  {/* Card Title & Category */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs text-[#DF7987] font-semibold block">02</span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5EBE1] group-hover:text-[#DF7987] transition-colors mt-0.5">
                        AURORA / LEO
                      </h3>
                      <p className="font-mono text-[11px] text-[#8E7C79] uppercase tracking-wider">
                        Empathetic Agent &middot; Memory
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#8E7C79] group-hover:text-[#DF7987] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  {/* Frame Preview Mockup */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#2D161C] bg-[#0C0608] p-4 flex flex-col justify-between group-hover:border-[#4A202A] transition-colors">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#DF7987] block">
                        COGNITIVE COMPANION
                      </span>
                      <p className="font-serif text-lg text-[#F5EBE1] font-semibold leading-tight">
                        Timeless Architecture, Modern Flow
                      </p>
                    </div>

                    <div className="p-3 rounded bg-[#160B0F] border border-[#2D161C] space-y-1">
                      <div className="flex justify-between font-mono text-[9px] text-[#8E7C79]">
                        <span>EPISODIC GRAPH</span>
                        <span className="text-[#DF7987]">PERSISTENT</span>
                      </div>
                      <div className="w-full bg-[#2D161C] h-1 rounded-full overflow-hidden">
                        <div className="bg-[#DF7987] h-full w-3/4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pill Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-[#2D161C]">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#220B11] border border-[#4A202A] text-[#F5EBE1]">
                    MULTI-AGENT
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#220B11] border border-[#4A202A] text-[#D9C7B8]">
                    EPISODIC MEMORY
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#220B11] border border-[#4A202A] text-[#D9C7B8]">
                    SPEECH &amp; VISION
                  </span>
                </div>
              </div>

              {/* Card 03: MINDSPACE / VANI */}
              <div
                onClick={() => setActiveProject(selectedProjects[2])}
                className="group flex flex-col justify-between rounded-xl border border-[#2D161C] bg-[#140A0D] p-5 sm:p-6 hover:border-[#801D2C] hover:bg-[#1A0C11] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#801D2C]/15"
              >
                <div className="space-y-4">
                  {/* Card Title & Category */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs text-[#DF7987] font-semibold block">03</span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5EBE1] group-hover:text-[#DF7987] transition-colors mt-0.5">
                        MINDSPACE / VANI
                      </h3>
                      <p className="font-mono text-[11px] text-[#8E7C79] uppercase tracking-wider">
                        Multimodal Voice &middot; Low Latency
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#8E7C79] group-hover:text-[#DF7987] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  {/* Frame Preview Mockup */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#2D161C] bg-[#0C0608] p-4 flex flex-col justify-between group-hover:border-[#4A202A] transition-colors">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#DF7987] block">
                        COGNITIVE OS
                      </span>
                      <p className="font-serif text-lg text-[#F5EBE1] font-semibold leading-tight">
                        Focus, Reason, Elevate
                      </p>
                    </div>

                    <div className="p-3 rounded bg-[#160B0F] border border-[#2D161C] space-y-1">
                      <div className="flex justify-between font-mono text-[9px] text-[#8E7C79]">
                        <span>AUDIO STREAM</span>
                        <span className="text-[#DF7987]">&lt; 180ms</span>
                      </div>
                      <div className="w-full bg-[#2D161C] h-1 rounded-full overflow-hidden">
                        <div className="bg-[#A6263A] h-full w-9/10" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pill Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-[#2D161C]">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#220B11] border border-[#4A202A] text-[#F5EBE1]">
                    LOW-LATENCY
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#220B11] border border-[#4A202A] text-[#D9C7B8]">
                    REASONING
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#220B11] border border-[#4A202A] text-[#D9C7B8]">
                    S2S RUNTIME
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          MY PROCESS & TOOLS I USE: SPLIT EDITORIAL SECTION (FROM REFERENCE)
          ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[#2D161C] bg-[#0C0608]">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: MY PROCESS ✦ */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-2 border-b border-[#2D161C] pb-3">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#F5EBE1] font-semibold">
                  MY PROCESS
                </span>
                <span className="text-[#DF7987]">✦</span>
              </div>

              <div className="space-y-4">
                {processSteps.map((step) => (
                  <div
                    key={step.number}
                    className="p-3.5 rounded-lg border border-[#2D161C] bg-[#140A0D] hover:border-[#801D2C]/60 hover:bg-[#1A0C11] transition-all group"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-[#DF7987] font-semibold">
                        {step.number}
                      </span>
                      <h4 className="font-sans text-xs sm:text-sm uppercase tracking-wider font-bold text-[#F5EBE1] group-hover:text-[#DF7987] transition-colors">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#8E7C79] font-sans mt-1 pl-7 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Center: Mood Medallion / Petal Vignette from Reference */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-2xl border border-[#2D161C] bg-[#12080B] shadow-xl relative overflow-hidden self-stretch">
              <div className="absolute inset-0 bg-radial from-[#801D2C]/30 via-transparent to-transparent blur-xl pointer-events-none" />

              {/* Decorative Circular Petal Blossom graphic */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-[#3D0F18] via-[#801D2C] to-[#DF7987] p-1 flex items-center justify-center mb-6 shadow-2xl relative">
                <div className="w-full h-full rounded-full bg-[#140A0D] flex items-center justify-center p-3">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-radial from-[#A6263A] to-[#2B0B13] flex items-center justify-center text-2xl text-[#F5EBE1]">
                    ✦
                  </div>
                </div>
              </div>

              <div className="relative z-10 space-y-2 max-w-xs">
                <p className="font-serif text-lg sm:text-xl text-[#F5EBE1] font-medium leading-relaxed italic">
                  &ldquo;A thoughtful process for meaningful results.&rdquo;
                </p>
                <span className="font-mono text-[10px] text-[#DF7987] tracking-widest uppercase block pt-1">
                  FIRST-PRINCIPLES RIGOR
                </span>
              </div>
            </div>

            {/* Right: TOOLS I USE ✦ */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-2 border-b border-[#2D161C] pb-3">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#F5EBE1] font-semibold">
                  TOOLS I USE
                </span>
                <span className="text-[#DF7987]">✦</span>
              </div>

              {/* Grid of Tool Badges */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {[
                  { name: "Python", cat: "CORE RESEARCH" },
                  { name: "PyTorch", cat: "DEEP LEARNING" },
                  { name: "TypeScript", cat: "FRONTEND & RUNTIME" },
                  { name: "Next.js", cat: "WEB SYSTEMS" },
                  { name: "FastAPI", cat: "ASYNC APIS" },
                  { name: "Docker", cat: "CONTAINERIZATION" },
                  { name: "Linux", cat: "KERNEL & POSIX" },
                  { name: "Tailwind CSS", cat: "DESIGN SYSTEMS" },
                  { name: "PostgreSQL", cat: "DATA PERSISTENCE" },
                  { name: "LangChain", cat: "AGENT ORCHESTRATION" },
                  { name: "Hugging Face", cat: "TRANSFORMERS" },
                  { name: "Figma", cat: "UI/UX DESIGN" },
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className="p-3 rounded-lg border border-[#2D161C] bg-[#140A0D] hover:border-[#801D2C] hover:bg-[#1C0E13] transition-all group"
                  >
                    <div className="font-mono text-xs font-bold text-[#F5EBE1] group-hover:text-[#DF7987] transition-colors">
                      {tool.name}
                    </div>
                    <div className="font-mono text-[9px] text-[#8E7C79] uppercase tracking-wider mt-0.5">
                      {tool.cat}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-1 text-center sm:text-left">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8E7C79]">
                  &amp; MORE COMPREHENSIVE TOOLS
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          KIND WORDS: TESTIMONIALS & RIGOR (DIRECT FROM REFERENCE)
          ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[#2D161C] bg-[#0C0608]">
        <Container width="wide">
          <div className="space-y-10 sm:space-y-12">
            <div className="flex items-center gap-2 border-b border-[#2D161C] pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#F5EBE1] font-semibold">
                KIND WORDS
              </span>
              <span className="text-[#DF7987]">✦</span>
            </div>

            {/* 3 Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {kindWords.map((kw) => (
                <div
                  key={kw.id}
                  className="rounded-xl border border-[#2D161C] bg-[#140A0D] p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-[#801D2C]/60 hover:bg-[#180C10] transition-all shadow-md group"
                >
                  <div className="space-y-3">
                    <span className="text-3xl font-serif text-[#DF7987] block leading-none select-none">
                      &ldquo;
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-[#D9C7B8] leading-relaxed">
                      {kw.quote}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#2D161C] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#240D15] border border-[#4A202A] flex items-center justify-center text-xs font-mono font-bold text-[#DF7987]">
                      {kw.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-sans text-xs font-bold text-[#F5EBE1]">
                        {kw.author}
                      </div>
                      <div className="font-mono text-[10px] text-[#8E7C79]">
                        {kw.role}, {kw.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          / 02 FEATURED PROJECT: ASHI (AN AUTONOMOUS AI OPERATING SYSTEM)
          ========================================================================= */}
      <section id="ashi-section" className="py-14 sm:py-24 border-b border-[#2D161C] bg-[#0C0608]">
        <Container width="wide">
          <div className="space-y-8 sm:space-y-12">
            {/* Header Plate */}
            <div className="flex items-center justify-between border-b border-[#2D161C] pb-3 sm:pb-4">
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#D9C7B8]/70">
                <span className="text-[#DF7987] font-semibold">{featuredAshiContent.sectionNumber}</span>{" "}
                {featuredAshiContent.badge}
              </span>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#E598A3] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DF7987] animate-pulse" />
                {featuredAshiContent.status}
              </span>
            </div>

            {/* Main Specification Card */}
            <div className="rounded-xl border border-[#2D161C] bg-[#140A0D] p-5 sm:p-10 lg:p-12 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
                {/* Left: Overview, Specs & Action */}
                <div className="lg:col-span-5 space-y-5 sm:space-y-6">
                  <div>
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#DF7987] block mb-1">
                      LONG-TERM RESEARCH INITIATIVE
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#F5EBE1] tracking-tight">
                      {featuredAshiContent.title}
                    </h2>
                    <p className="font-mono text-xs sm:text-sm text-[#DF7987] mt-1">
                      {featuredAshiContent.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#D9C7B8] font-sans leading-relaxed">
                    {featuredAshiContent.description}
                  </p>

                  {/* Architecture metadata ledger */}
                  <div className="border-t border-b border-[#2D161C] py-3 space-y-1.5 sm:space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-[#2D161C]/60">
                      <span className="text-[#8E7C79]">PARADIGM</span>
                      <span className="text-[#F5EBE1] font-medium text-right">
                        {featuredAshiContent.paradigm}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#2D161C]/60">
                      <span className="text-[#8E7C79]">STATE LEDGER</span>
                      <span className="text-[#DF7987] font-medium">Deterministic &amp; Auditable</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#8E7C79]">ENGINEERING CYCLE</span>
                      <span className="text-[#E598A3] font-medium">Active Development</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveProject(selectedProjects[0])}
                      className="w-full sm:w-auto justify-center group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#801D2C] hover:bg-[#A6263A] text-[#F5EBE1] font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-md cursor-pointer min-h-[44px]"
                    >
                      <span>Explore Ashi</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    <a
                      href={featuredAshiContent.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#3D1E25] bg-[#0C0608] text-[#D9C7B8] font-mono text-xs uppercase tracking-wider hover:border-[#801D2C] hover:text-[#F5EBE1] transition-colors min-h-[44px]"
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
            <div className="rounded-xl border border-[#2D161C] bg-[#140A0D] p-5 sm:p-10 max-w-4xl shadow-lg">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#DF7987] font-semibold block mb-2">
                INTELLECTUAL CURIOSITY // FIRST PRINCIPLES
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5EBE1] mb-3 sm:mb-4">
                {featuredAshiContent.whyTitle}
              </h3>

              <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm text-[#D9C7B8] leading-relaxed">
                {featuredAshiContent.whyText.map((paragraph, pIdx) => (
                  <p key={pIdx} className={pIdx === 1 ? "font-mono text-xs bg-[#0C0608] p-3.5 sm:p-4 rounded-lg border-l-2 border-[#801D2C] text-[#F5EBE1] leading-relaxed" : ""}>
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
      <section id="about" className="py-14 sm:py-24 border-b border-[#2D161C] bg-[#0C0608]">
        <Container width="wide">
          <div className="space-y-8 sm:space-y-12">
            <div className="flex items-center justify-between border-b border-[#2D161C] pb-3 sm:pb-4">
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#D9C7B8]/70">
                <span className="text-[#DF7987] font-semibold">{aboutContent.sectionNumber}</span>{" "}
                {aboutContent.eyebrow}
              </span>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#8E7C79]">
                FOUNDATIONAL PRINCIPLES
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Left Column: Personal Narrative */}
              <div className="lg:col-span-5 space-y-5 sm:space-y-6">
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#F5EBE1] leading-tight whitespace-pre-line">
                  {aboutContent.headline}
                </h2>

                <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm text-[#D9C7B8] leading-relaxed">
                  {aboutContent.narrativeParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="pt-2 sm:pt-4">
                  <Link
                    href="#contact"
                    className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#801D2C]/60 bg-[#240D15] text-[#F5EBE1] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#801D2C] transition-all min-h-[44px]"
                  >
                    <span>Connect Directly</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: 7 Focused Disciplines */}
              <div className="lg:col-span-7 space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#DF7987] font-semibold block">
                  {aboutContent.currentPathHeadline}
                </span>

                <div className="divide-y divide-[#2D161C] border-t border-b border-[#2D161C]">
                  {aboutContent.focusDisciplines.map((item, idx) => (
                    <div key={item.title} className="py-3 sm:py-3.5 flex items-start gap-4 group">
                      <span className="font-mono text-xs text-[#DF7987] font-semibold pt-0.5">
                        0{idx + 1}
                      </span>
                      <div className="space-y-0.5">
                        <h4 className="font-sans text-sm font-semibold text-[#F5EBE1] group-hover:text-[#DF7987] transition-colors">
                          {item.title}
                        </h4>
                        <p className="font-sans text-xs text-[#8E7C79] leading-relaxed">
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
      <section className="py-20 sm:py-24 border-b border-[#2D161C] bg-[#140A0D]">
        <Container width="wide">
          <div className="space-y-10 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#2D161C] pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#DF7987] font-semibold block">
                  CHRONOLOGICAL RIGOR
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5EBE1]">
                  {currentFocusTimeline.title}
                </h2>
              </div>
              <p className="font-mono text-xs text-[#8E7C79] uppercase tracking-wider">
                {currentFocusTimeline.year} &middot; {currentFocusTimeline.subtitle}
              </p>
            </div>

            {/* Vertical progression steps */}
            <div className="divide-y divide-[#2D161C] border-t border-b border-[#2D161C]">
              {currentFocusTimeline.stages.map((stg) => (
                <div
                  key={stg.topic}
                  className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-[#1F1015] px-2 sm:px-4 rounded-lg transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="font-mono text-xs text-[#DF7987] font-semibold">
                      {stg.level}
                    </span>
                    <div>
                      <h3 className="font-sans text-base sm:text-lg text-[#F5EBE1] font-medium group-hover:text-[#DF7987] transition-colors">
                        {stg.topic}
                      </h3>
                      <p className="text-xs text-[#8E7C79] mt-0.5">
                        {stg.detail}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#DF7987] bg-[#0C0608] px-2.5 py-1 rounded-full border border-[#801D2C]/40 self-start sm:self-auto">
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
      <section className="py-20 sm:py-24 border-b border-[#2D161C] bg-[#0C0608]">
        <Container width="wide">
          <div className="space-y-12">
            <div className="flex items-center justify-between border-b border-[#2D161C] pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D9C7B8]/70">
                METHODOLOGY &amp; PRINCIPLES
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#E598A3] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DF7987] animate-pulse" />
                DETERMINISTIC SYSTEMS
              </span>
            </div>

            <div className="max-w-xl">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F5EBE1] font-bold">
                How I Build
              </h2>
              <p className="text-xs sm:text-sm text-[#8E7C79] mt-2 leading-relaxed">
                Core operating principles governing every autonomous kernel, model evaluation, and line of code.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {engineeringPrinciples.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#2D161C] bg-[#140A0D] p-5 sm:p-6 flex flex-col space-y-3 hover:border-[#801D2C]/60 hover:bg-[#1C0E13] transition-all shadow-md"
                >
                  <span className="font-mono text-xs text-[#DF7987] uppercase tracking-widest font-semibold">
                    {item.number} {"//"} PRINCIPLE
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-[#F5EBE1] font-bold">
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs text-[#DF7987] leading-relaxed border-l-2 border-[#801D2C] pl-2.5">
                    &ldquo;{item.rule}&rdquo;
                  </p>
                  <p className="text-xs text-[#8E7C79] leading-relaxed pt-1">
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
          / 06 THE LAB: WHERE IDEAS MEET REALITY (EDITORIAL BRIDGE)
          ========================================================================= */}
      <section id="lab" className="py-14 sm:py-24 border-b border-[#2D161C] bg-[#140A0D]">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2.5 sm:gap-3 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-[#D9C7B8]/70 uppercase">
                <span className="text-[#DF7987] font-semibold">/ 06</span>
                <span className="w-5 sm:w-8 h-[1px] bg-[#2D161C]" />
                <span className="text-[#F5EBE1]">THE LAB</span>
              </div>

              <h2 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#F5EBE1] leading-[1.08] sm:leading-[1.02] tracking-tight">
                Empirical AI Systems Laboratory.
              </h2>

              <p className="font-sans text-base sm:text-lg text-[#D9C7B8] leading-relaxed max-w-xl">
                <span className="font-bold text-[#DF7987]">
                  {labMetrics.total_pieces} records
                </span>{" "}
                of authentic engineering history across Ashi, LEO, and VANI.
              </p>

              {/* 4 Core Tenet Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1 sm:pt-2 font-mono text-xs">
                <div className="p-2.5 sm:p-3 rounded-lg bg-[#0C0608] border border-[#2D161C]">
                  <span className="text-[9px] sm:text-[10px] text-[#DF7987] block mb-0.5 sm:mb-1">01</span>
                  <span className="font-semibold text-[#F5EBE1] text-[11px] sm:text-xs">Failures.</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-lg bg-[#0C0608] border border-[#2D161C]">
                  <span className="text-[9px] sm:text-[10px] text-[#DF7987] block mb-0.5 sm:mb-1">02</span>
                  <span className="font-semibold text-[#F5EBE1] text-[11px] sm:text-xs">Experiments.</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-lg bg-[#0C0608] border border-[#2D161C]">
                  <span className="text-[9px] sm:text-[10px] text-[#DF7987] block mb-0.5 sm:mb-1">03</span>
                  <span className="font-semibold text-[#F5EBE1] text-[11px] sm:text-xs">Architecture.</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-lg bg-[#0C0608] border border-[#2D161C]">
                  <span className="text-[9px] sm:text-[10px] text-[#DF7987] block mb-0.5 sm:mb-1">04</span>
                  <span className="font-semibold text-[#F5EBE1] text-[11px] sm:text-xs">Lessons.</span>
                </div>
              </div>

              <div className="pt-2 sm:pt-4">
                <Link
                  href="/lab"
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#801D2C] hover:bg-[#A6263A] text-[#F5EBE1] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-lg shadow-[#801D2C]/20 min-h-[44px]"
                >
                  <span>Explore the Lab</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Right Archival Record Card */}
            <div className="w-full lg:col-span-5 p-4 sm:p-7 rounded-xl bg-[#0C0608] border border-[#2D161C] font-mono text-xs space-y-3 sm:space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#2D161C] pb-2.5 text-[#8E7C79]">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#DF7987] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DF7987] animate-pulse" />
                  ARCHIVE TELEMETRY
                </span>
                <span className="text-[10px] text-[#8E7C79]">
                  {String(labMetrics.total_projects).padStart(2, "0")} RUNTIMES / {String(labMetrics.total_pieces).padStart(2, "0")} RECORDS
                </span>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Link
                  href="/lab/ashi"
                  className="flex items-center justify-between py-2 sm:py-1.5 border-b border-[#2D161C] text-[#F5EBE1] hover:text-[#DF7987] transition-colors min-h-[38px]"
                >
                  <span className="text-[11px] sm:text-xs font-semibold">01 ASHI (OPERATING SYSTEM)</span>
                  <span className="font-bold text-[#DF7987]">{labMetrics.by_project.ashi || 20}</span>
                </Link>
                <Link
                  href="/lab/leo"
                  className="flex items-center justify-between py-2 sm:py-1.5 border-b border-[#2D161C] text-[#F5EBE1] hover:text-[#DF7987] transition-colors min-h-[38px]"
                >
                  <span className="text-[11px] sm:text-xs font-semibold">02 LEO (AI COMPANION)</span>
                  <span className="font-bold text-[#DF7987]">{labMetrics.by_project.leo || 21}</span>
                </Link>
                <Link
                  href="/lab/vani"
                  className="flex items-center justify-between py-2 sm:py-1.5 border-b border-[#2D161C] text-[#F5EBE1] hover:text-[#DF7987] transition-colors min-h-[38px]"
                >
                  <span className="text-[11px] sm:text-xs font-semibold">03 VANI (COGNITIVE OS)</span>
                  <span className="font-bold text-[#DF7987]">{labMetrics.by_project.vani || 21}</span>
                </Link>
              </div>

              <div className="pt-2 text-[10px] sm:text-[11px] font-sans text-[#8E7C79] leading-relaxed border-t border-[#2D161C]">
                Every record is backed by authentic commits, phase documents, ADRs, or test logs. Zero marketing claims.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          / 07 ENGINEERING NOTES: THINKING THROUGH THE WORK
          ========================================================================= */}
      <section id="writing" className="py-14 sm:py-24 border-b border-[#2D161C] bg-[#0C0608]">
        <Container width="wide">
          <div className="space-y-8 sm:space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-[#2D161C] pb-3 sm:pb-4">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D9C7B8]/70 block">
                  <span className="text-[#DF7987] font-semibold">/ 07</span> ENGINEERING NOTES
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl text-[#F5EBE1] font-bold">
                  Thinking through the work.
                </h2>
              </div>

              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#8E7C79]">
                AUTHENTIC WORKING DISPATCHES
              </span>
            </div>

            {/* 3 Editorial Journal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {engineeringNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => setActiveNote(note)}
                  className="flex flex-col justify-between p-5 sm:p-7 rounded-xl border border-[#2D161C] bg-[#140A0D] hover:border-[#801D2C]/80 hover:bg-[#1A0C11] transition-all group min-h-[230px] sm:min-h-[250px] cursor-pointer shadow-md"
                >
                  <div className="space-y-3.5 sm:space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-[#8E7C79] border-b border-[#2D161C] pb-2.5 sm:pb-3">
                      <span className="text-[#DF7987] font-semibold">{note.issue}</span>
                      <span className="text-[#8E7C79]">{note.date}</span>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#F5EBE1] group-hover:text-[#DF7987] transition-colors leading-snug">
                      {note.title}
                    </h3>

                    <p className="text-xs font-mono text-[#DF7987]">
                      {note.readTime} &middot; {note.statusLabel}
                    </p>
                  </div>

                  <div className="pt-4 sm:pt-6 border-t border-[#2D161C] mt-4">
                    <p className="font-mono text-xs text-[#8E7C79] leading-relaxed line-clamp-2">
                      &ldquo;{note.excerpt}&rdquo;
                    </p>
                    <div className="flex items-center justify-end gap-1 font-mono text-[11px] uppercase tracking-wider text-[#DF7987] pt-3 sm:pt-4 group-hover:translate-x-1 transition-transform min-h-[36px] font-semibold">
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
      <section id="skills" className="py-14 sm:py-24 border-b border-[#2D161C] bg-[#140A0D]">
        <Container width="wide">
          <div className="space-y-8 sm:space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-[#2D161C] pb-3 sm:pb-4">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D9C7B8]/70 block">
                  <span className="text-[#DF7987] font-semibold">{skillsGrouped.sectionNumber}</span>{" "}
                  {skillsGrouped.eyebrow}
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl text-[#F5EBE1] font-bold">
                  {skillsGrouped.title}
                </h2>
              </div>

              <p className="font-mono text-xs text-[#8E7C79] max-w-xs sm:text-right">
                {skillsGrouped.subtitle}
              </p>
            </div>

            {/* 2 Grouped Categories (AI/ML and Systems) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
              {skillsGrouped.categories.map((category) => (
                <div
                  key={category.name}
                  className="rounded-xl border border-[#2D161C] bg-[#0C0608] p-5 sm:p-8 space-y-4 sm:space-y-6 shadow-md"
                >
                  <div className="border-b border-[#2D161C] pb-3">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#DF7987] font-semibold">
                      {category.name}
                    </h3>
                    <p className="text-xs text-[#8E7C79] mt-1">
                      {category.description}
                    </p>
                  </div>

                  <div className="divide-y divide-[#2D161C]">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="py-2.5 sm:py-3 flex items-baseline justify-between gap-3 sm:gap-4"
                      >
                        <span className="font-mono text-xs sm:text-sm text-[#DF7987] font-medium shrink-0">
                          [ {item.name} ]
                        </span>
                        <span className="font-sans text-xs text-[#D9C7B8] text-right">
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
      <section className="py-16 sm:py-28 border-b border-[#2D161C] bg-[#0C0608] text-center">
        <Container width="content">
          <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#DF7987] block">
              CAREER DIRECTION // SYSTEM HORIZON
            </span>
            <p className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#F5EBE1] leading-tight">
              &ldquo;{personalBrandStatement.quote}&rdquo;
            </p>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#8E7C79] pt-1 sm:pt-2">
              {personalBrandStatement.subtext}
            </p>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          / 07 CONTACT: UNDERSTATED COLLABORATION INVITATION
          ========================================================================= */}
      <section id="contact" className="py-14 sm:py-24 border-b border-[#2D161C] bg-[#140A0D]">
        <Container width="wide">
          <div className="space-y-8 sm:space-y-12">
            <div className="flex items-center justify-between border-b border-[#2D161C] pb-3 sm:pb-4">
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#D9C7B8]/70">
                <span className="text-[#DF7987] font-semibold">{contactContent.sectionNumber}</span>{" "}
                {contactContent.eyebrow}
              </span>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#E598A3] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DF7987] animate-pulse" />
                COMMUNICATION CHANNEL ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Left Column: Direct Invitation */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#F5EBE1] leading-tight">
                  &ldquo;{contactContent.headline}&rdquo;
                </h2>
                <p className="text-sm sm:text-base text-[#D9C7B8] font-sans leading-relaxed max-w-xl">
                  {contactContent.supportingText}
                </p>

                {/* Email quick action card */}
                <div className="p-4 sm:p-6 rounded-xl border border-[#2D161C] bg-[#0C0608] max-w-lg space-y-2.5 sm:space-y-3">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#DF7987] block font-semibold">
                    DIRECT DISPATCH &middot; PGP/EMAIL
                  </span>
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <span className="font-mono text-xs sm:text-sm text-[#F5EBE1] truncate">
                      {contactContent.email}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#801D2C]/60 bg-[#240D15] text-[#F5EBE1] hover:bg-[#801D2C] text-xs font-mono uppercase tracking-wider transition-colors shrink-0 font-semibold min-h-[44px]"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#DF7987]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#DF7987]" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Links */}
              <div className="lg:col-span-5 space-y-4">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#DF7987] font-semibold block">
                  PROFILES &amp; REPOSITORIES
                </span>

                <div className="divide-y divide-[#2D161C] border-t border-b border-[#2D161C]">
                  {contactContent.links.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="py-3.5 sm:py-4 flex items-center justify-between text-xs sm:text-sm font-mono text-[#D9C7B8] hover:text-[#DF7987] group transition-colors min-h-[44px]"
                    >
                      <div className="flex items-baseline gap-2.5 sm:gap-3">
                        <span className="text-[#DF7987] font-semibold">
                          [ {link.platform} ]
                        </span>
                        <span className="text-[#F5EBE1]">{link.label}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#8E7C79] group-hover:text-[#DF7987] group-hover:translate-x-0.5 transition-transform" />
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
