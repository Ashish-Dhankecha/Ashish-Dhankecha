"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";
import { Container } from "@/components/layout/container";
import { theDirectionContent } from "@/content/portfolio-data";
import { ArchitecturalStackDrawing } from "./architectural-stack-drawing";
import { CapabilityTrajectory } from "./capability-trajectory";
import { CapabilityLoop } from "./capability-loop";

interface DirectionSectionProps {
  onExploreAshi?: () => void;
}

export function DirectionSection({ onExploreAshi }: DirectionSectionProps) {
  const [activeStage, setActiveStage] = useState<string | null>(null);

  const {
    sectionNumber,
    label,
    headline,
    intro,
    trajectory,
    longTermGoal,
    capabilityLoop,
    ambition,
    ashiBridge,
  } = theDirectionContent;

  const handleExploreAshiClick = (e: React.MouseEvent) => {
    if (onExploreAshi) {
      e.preventDefault();
      onExploreAshi();
    }
  };

  return (
    <section
      id="direction"
      className="py-14 sm:py-24 lg:py-32 border-b border-[#1E293B] bg-[#070A0F] text-[#F8FAFC] relative"
    >
      <Container width="wide">
        <div className="space-y-12 sm:space-y-20 lg:space-y-24">
          {/* =========================================================================
              2. SECTION LABEL PLATE: / 04  ─────────  THE DIRECTION
              ========================================================================= */}
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
            <div className="flex items-center gap-2.5 sm:gap-3 text-[10px] sm:text-xs font-mono tracking-[0.2em] text-slate-400 uppercase">
              <span className="text-cyber-cyan font-semibold">{sectionNumber}</span>
              <span className="w-6 sm:w-12 h-[1px] bg-[#1E293B]" />
              <span className="text-white">{label}</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-widest text-slate-400 uppercase">
              <Compass className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>TECHNICAL TRAJECTORY &amp; HORIZON</span>
            </div>
          </div>

          {/* =========================================================================
              3, 4, 12. TWO-COLUMN EDITORIAL COMPOSITION
              LEFT: Headline, Introduction, Abstract Architectural Schematic
              RIGHT: 6-Stage Capability Progression Diagram
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left Column: Manifesto & Architectural Drawing */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8 lg:sticky lg:top-28">
              {/* Primary Headline */}
              <div>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-cyber-cyan block mb-2 sm:mb-3">
                  SYSTEMS TRAJECTORY // INTELLECTUAL DIRECTION
                </span>
                <h2 className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-[4rem] leading-[1.08] sm:leading-[1.02] tracking-tight text-white">
                  {headline.split("\n").map((line, lIdx) => (
                    <span key={lIdx} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
              </div>

              {/* Introduction Copy */}
              <div className="space-y-3.5 sm:space-y-4 max-w-[580px] text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                <p className="text-white font-medium">{intro.lead}</p>
                <p className="text-slate-400">{intro.body}</p>
              </div>

              {/* Subtle Hairline Rule */}
              <div className="w-full h-[1px] bg-[#1E293B]" />

              {/* Architectural Monograph Schematic */}
              <ArchitecturalStackDrawing
                activeStage={activeStage}
                onHoverStage={(stage) => setActiveStage(stage)}
              />
            </div>

            {/* Right Column: 6-Stage Progression Trajectory */}
            <div className="lg:col-span-7">
              <CapabilityTrajectory
                stages={trajectory}
                activeStage={activeStage}
                onSelectStage={(stage) => setActiveStage(stage)}
              />
            </div>
          </div>

          {/* =========================================================================
              14. THE LONG-TERM GOAL (MAJOR EDITORIAL STATEMENT)
              ========================================================================= */}
          <div className="pt-8 sm:pt-12 border-t border-[#1E293B]">
            <div className="p-5 sm:p-10 lg:p-14 rounded border border-[#1E293B] bg-[#0D1117] relative overflow-hidden">
              {/* Monograph Watermark / Background Coordinate */}
              <div
                className="absolute right-3 bottom-1 font-mono text-[4rem] sm:text-[7rem] font-bold text-slate-800/30 select-none pointer-events-none -z-0"
                aria-hidden="true"
              >
                04
              </div>

              <div className="relative z-10 max-w-4xl space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-cyber-cyan font-semibold">
                    {longTermGoal.label}
                  </span>
                </div>

                <p className="font-sans font-bold text-xl sm:text-3xl lg:text-4xl leading-snug sm:leading-snug text-white">
                  {longTermGoal.statement.prefix}{" "}
                  <span className="inline-flex items-baseline flex-wrap gap-x-2 gap-y-1">
                    <span className="text-cyber-cyan font-mono font-semibold">
                      {longTermGoal.statement.term1}
                    </span>
                    <span className="text-slate-500 font-mono text-base sm:text-2xl px-0.5">
                      {longTermGoal.statement.arrow1}
                    </span>
                    <span className="text-cyber-cyan font-mono font-semibold">
                      {longTermGoal.statement.term2}
                    </span>
                    <span className="text-slate-500 font-mono text-base sm:text-2xl px-0.5">
                      {longTermGoal.statement.arrow2}
                    </span>
                    <span className="text-cyber-cyan font-mono font-semibold">
                      {longTermGoal.statement.term3}
                    </span>
                    <span className="text-slate-500 font-mono text-base sm:text-2xl px-0.5">
                      {longTermGoal.statement.arrow3}
                    </span>
                    <span className="text-cyber-cyan font-mono font-semibold">
                      {longTermGoal.statement.term4}
                    </span>
                  </span>
                  {" "}{longTermGoal.statement.suffix}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono text-slate-400">
                  <span>FOUNDATION &middot; COGNITION &middot; INFRASTRUCTURE &middot; AGENCY</span>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              15. CAPABILITY LOOP (7-STAGE ENGINEERING PROCESS DIAGRAM)
              ========================================================================= */}
          <div>
            <CapabilityLoop
              label={capabilityLoop.label}
              kicker={capabilityLoop.kicker}
              steps={capabilityLoop.steps}
            />
          </div>

          {/* =========================================================================
              16 & 17. LOWER EDITORIAL SPLIT
              LEFT: Looking Further (The Bigger Ambition)
              RIGHT: Editorial Bridge (Ashi as One Experiment in that Direction)
              ========================================================================= */}
          <div className="pt-6 sm:pt-8 border-t border-[#1E293B]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              {/* Looking Further (Ambition Without Arrogance) */}
              <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-slate-300">
                    {ambition.label}
                  </span>
                </div>

                <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-base text-slate-400 font-sans leading-relaxed">
                  {ambition.paragraphs.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                <div className="pt-1 sm:pt-2 text-[10px] sm:text-xs font-mono text-slate-500">
                  <span>DISCIPLINE // MATHEMATICS &middot; ML &middot; SYSTEMS &middot; RESEARCH</span>
                </div>
              </div>

              {/* One Experiment in that Direction: Ashi Bridge */}
              <div className="lg:col-span-6 rounded border border-[#1E293B] bg-[#0D1117] p-5 sm:p-8 space-y-4 sm:space-y-5">
                <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyber-cyan font-semibold">
                    {ashiBridge.label}
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-cyber-emerald flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse" />
                    ACTIVE RUNTIME
                  </span>
                </div>

                <div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {ashiBridge.title}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-cyber-cyan mt-1">
                    {ashiBridge.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {ashiBridge.description}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-3 border-t border-[#1E293B]">
                  <Link
                    href={ashiBridge.ctaPrimary.href}
                    onClick={handleExploreAshiClick}
                    className="w-full sm:w-auto justify-center group inline-flex items-center gap-2 px-5 py-2.5 rounded bg-cyber-cyan text-obsidian-dark font-mono text-xs uppercase tracking-wider hover:bg-cyber-cyan/90 transition-colors font-bold shadow-sm cursor-pointer min-h-[44px]"
                  >
                    <span>{ashiBridge.ctaPrimary.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <Link
                    href={ashiBridge.ctaSecondary.href}
                    className="font-mono text-xs uppercase tracking-widest text-slate-400 hover:text-cyber-cyan transition-colors py-2 text-center sm:text-left"
                  >
                    {ashiBridge.ctaSecondary.label} &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
