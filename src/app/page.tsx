"use client";

import React, { useEffect } from "react";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll";
import { AmbientParticles } from "@/components/pakcat/ambient-particles";
import { ScrollProgressBar } from "@/components/pakcat/scroll-progress";
import { HeroSection } from "@/components/pakcat/hero-section";
import { IdentityProofStrip } from "@/components/pakcat/identity-proof-strip";
import { AboutSection } from "@/components/pakcat/about-section";
import { ProjectsSection } from "@/components/pakcat/projects-section";
import { ExperienceSection } from "@/components/pakcat/experience-section";
import { ExpertiseSection } from "@/components/pakcat/expertise-section";
import { ProcessSection } from "@/components/pakcat/process-section";
import { StackSection } from "@/components/pakcat/stack-section";
import { CurrentFocusSection } from "@/components/pakcat/current-focus";
import { ContactSection } from "@/components/pakcat/contact-section";

export default function HomePage() {
  useEffect(() => {
    // Reveal animation observer
    const elements = document.querySelectorAll(
      ".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale"
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black overflow-x-hidden">
        {/* Background 2.5D Canvas Particles & Lighting */}
        <AmbientParticles />
        <ScrollProgressBar />

        {/* Ambient Void Glows */}
        <div
          className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,255,255,0.06),transparent_70%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(16,185,129,0.04),transparent_70%)]"
          aria-hidden="true"
        />

        {/* Main Single-Page Sections */}
        <div className="relative z-10 flex flex-col">
          <HeroSection />
          <IdentityProofStrip />
          <AboutSection />
          <ProjectsSection />
          <ExperienceSection />
          <ExpertiseSection />
          <ProcessSection />
          <StackSection />
          <CurrentFocusSection />
          <ContactSection />
        </div>
      </div>
    </SmoothScrollProvider>
  );
}
