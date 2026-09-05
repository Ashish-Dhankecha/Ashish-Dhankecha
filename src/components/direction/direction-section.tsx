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
      className="py-20 sm:py-28 lg:py-32 border-b border-[#D8D4CB] bg-[#F3F0E8] text-[#111111] relative"
    >
      <Container width="wide">
        <div className="space-y-16 sm:space-y-24">
          {/* =========================================================================
              2. SECTION LABEL PLATE: / 04  ─────────  THE DIRECTION
              ========================================================================= */}
          <div className="flex items-center justify-between border-b border-[#D8D4CB] pb-4">
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[#555555] uppercase">
              <span className="text-[#173B70] font-semibold">{sectionNumber}</span>
              <span className="w-8 sm:w-12 h-[1px] bg-[#D8D4CB]" />
              <span className="text-[#111111]">{label}</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#8B8579] uppercase">
              <Compass className="w-3 h-3 text-[#173B70]" />
              <span>TECHNICAL TRAJECTORY &amp; HORIZON</span>
            </div>
          </div>

          {/* =========================================================================
              3, 4, 12. TWO-COLUMN EDITORIAL COMPOSITION
              LEFT: Headline, Introduction, Abstract Architectural Schematic
              RIGHT: 6-Stage Capability Progression Diagram
              ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Manifesto & Architectural Drawing */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
              {/* Primary Headline */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8B8579] block mb-3">
                  PERSONAL TRAJECTORY // INTELLECTUAL DIRECTION
                </span>
                <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-[4.25rem] xl:text-[4.75rem] leading-[0.98] tracking-tight text-[#111111]">
                  {headline.split("\n").map((line, lIdx) => (
                    <span key={lIdx} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
              </div>

              {/* Introduction Copy */}
              <div className="space-y-4 max-w-[580px] text-base sm:text-lg text-[#555555] font-sans leading-relaxed">
                <p className="text-[#111111] font-normal">{intro.lead}</p>
                <p>{intro.body}</p>
              </div>

              {/* Subtle Hairline Rule */}
              <div className="w-full h-[1px] bg-[#D8D4CB]" />

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
          <div className="pt-12 border-t border-[#D8D4CB]">
            <div className="p-8 sm:p-12 lg:p-14 border border-[#111111] bg-[#EDE8DE]/40 relative overflow-hidden">
              {/* Monograph Watermark / Background Coordinate */}
              <div
                className="absolute right-4 bottom-2 font-mono text-[5rem] sm:text-[7rem] font-bold text-[#D8D4CB]/30 select-none pointer-events-none -z-0"
                aria-hidden="true"
              >
                04
              </div>

              <div className="relative z-10 max-w-4xl space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-[#173B70]" />
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#173B70] font-semibold">
                    {longTermGoal.label}
                  </span>
                </div>

                <p className="font-display font-light text-2xl sm:text-3xl lg:text-4xl sm:leading-snug text-[#111111]">
                  {longTermGoal.statement.prefix}
                  <span className="font-normal underline underline-offset-8 decoration-[#173B70]/50 text-[#111111]">
                    {longTermGoal.statement.term1}
                  </span>
                  <span className="text-[#173B70] font-mono text-xl sm:text-2xl px-1">
                    {longTermGoal.statement.arrow1}
                  </span>
                  <span className="font-normal underline underline-offset-8 decoration-[#173B70]/50 text-[#111111]">
                    {longTermGoal.statement.term2}
                  </span>
                  <span className="text-[#173B70] font-mono text-xl sm:text-2xl px-1">
                    {longTermGoal.statement.arrow2}
                  </span>
                  <span className="font-normal underline underline-offset-8 decoration-[#173B70]/50 text-[#111111]">
                    {longTermGoal.statement.term3}
                  </span>
                  <span className="text-[#173B70] font-mono text-xl sm:text-2xl px-1">
                    {longTermGoal.statement.arrow3}
                  </span>
                  <span className="font-normal underline underline-offset-8 decoration-[#173B70]/50 text-[#111111]">
                    {longTermGoal.statement.term4}
                  </span>
                  {longTermGoal.statement.suffix}
                </p>

                <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#8B8579]">
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
          <div className="pt-8 border-t border-[#D8D4CB]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Looking Further (Ambition Without Arrogance) */}
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8B8579]" />
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#555555]">
                    {ambition.label}
                  </span>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#555555] font-sans leading-relaxed">
                  {ambition.paragraphs.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                <div className="pt-2 text-xs font-mono text-[#8B8579]">
                  <span>DISCIPLINE // MATHEMATICS &middot; ML &middot; SYSTEMS &middot; RESEARCH</span>
                </div>
              </div>

              {/* One Experiment in that Direction: Ashi Bridge */}
              <div className="lg:col-span-6 border border-[#D8D4CB] bg-[#EDE8DE]/40 p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between border-b border-[#D8D4CB] pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#173B70] font-semibold">
                    {ashiBridge.label}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8B8579]">
                    ACTIVE RUNTIME
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-light text-[#111111]">
                    {ashiBridge.title}
                  </h3>
                  <p className="font-display italic text-sm text-[#555555] mt-0.5">
                    {ashiBridge.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#111111] font-sans leading-relaxed">
                  {ashiBridge.description}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#D8D4CB]">
                  <Link
                    href={ashiBridge.ctaPrimary.href}
                    onClick={handleExploreAshiClick}
                    className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-[#F3F0E8] font-mono text-xs uppercase tracking-wider hover:bg-[#173B70] transition-colors shadow-sm cursor-pointer"
                  >
                    <span>{ashiBridge.ctaPrimary.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <Link
                    href={ashiBridge.ctaSecondary.href}
                    className="font-mono text-xs uppercase tracking-widest text-[#555555] hover:text-[#111111] underline underline-offset-4 decoration-[#D8D4CB] hover:decoration-[#111111] transition-colors"
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
