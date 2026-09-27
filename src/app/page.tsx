"use client";

import React, { useEffect } from "react";
import { AmbientParticles } from "@/components/pakcat/ambient-particles";
import { ScrollProgressBar } from "@/components/pakcat/scroll-progress";
import { BootScreen } from "@/components/pakcat/boot-screen";
import { MeowToast } from "@/components/pakcat/meow-toast";
import { HeroSection } from "@/components/pakcat/hero-section";
import { AboutSection } from "@/components/pakcat/about-section";
import { ExpertiseSection } from "@/components/pakcat/expertise-section";
import { ProjectsSection } from "@/components/pakcat/projects-section";
import { ExperienceSection } from "@/components/pakcat/experience-section";
import { ProcessSection } from "@/components/pakcat/process-section";
import { StackSection } from "@/components/pakcat/stack-section";
import { ContactSection } from "@/components/pakcat/contact-section";

export default function HomePage() {
  useEffect(() => {
    // Reveal animation observer matching PakCat Labs
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

    elements.forEach((el) => {
      observer.observe(el);
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        el.classList.add("visible");
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-pakcat-bg text-pakcat-text-primary overflow-x-hidden">
      {/* Background Particle and Texture Elements */}
      <AmbientParticles />
      <ScrollProgressBar />
      <BootScreen />
      <MeowToast />

      {/* Ambient Burgundy Radial Glows */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(128,20,43,0.18),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(90,26,44,0.14),transparent_70%)]"
        aria-hidden="true"
      />

      {/* Main Single-Page Sections matching PakCat Labs hierarchy */}
      <div className="relative z-10 flex flex-col">
        <HeroSection />
        <AboutSection />
        <ExpertiseSection />
        <ProjectsSection />
        <ExperienceSection />
        <ProcessSection />
        <StackSection />
        <ContactSection />
      </div>
    </div>
  );
}
