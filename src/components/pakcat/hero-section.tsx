"use client";

import React, { useState, useEffect } from "react";
import { Magnetic } from "./magnetic-button";

export function HeroSection() {
  const [typedCommand, setTypedCommand] = useState("");
  const fullCommand = "> ./init_profile.sh --runtime cognitive_os";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullCommand.length) {
        setTypedCommand(fullCommand.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 45);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative z-10 pt-32 sm:pt-40 pb-16 sm:pb-24">
      {/* Ambient Burgundy Radial Glow */}
      <div
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(128,20,43,0.28)_0%,rgba(40,10,21,0.1)_50%,transparent_70%)] blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="section-container">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center reveal reveal-up visible">
          {/* Terminal prompt typewriter */}
          <div className="mb-6 inline-flex items-center justify-center px-4 py-1.5 border border-[#3B121E] bg-[#1B060D]/80 rounded-full shadow-sm">
            <span className="terminal-prompt font-mono text-xs sm:text-sm text-[#E27D95]">
              {typedCommand}
            </span>
            <span className="cursor-blink inline-block w-2 h-4 bg-[#E27D95] align-middle ml-1.5" />
          </div>

          {/* Main Signature Headline: "Hi, I'm Ashish Dhankecha" */}
          <div className="mb-6 sm:mb-8">
            <h1
              id="hero-heading"
              className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#F7ECEF] leading-[1.15] flex flex-wrap items-baseline justify-center gap-x-3.5 sm:gap-x-5"
            >
              <span className="shrink-0 text-[#EBD0D7]">Hi, I&apos;m</span>
              <span className="relative inline-block font-script font-normal text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] text-[#E8869E] shrink-0 pb-1 sm:pb-2 tracking-wide drop-shadow-[0_0_35px_rgba(232,134,158,0.65)]">
                Ashish Dhankecha
              </span>
            </h1>
          </div>

          {/* Sub-headline: First principles AI systems */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug mb-6 text-pakcat-text-primary font-sans max-w-3xl">
            Building <span className="text-[#E8869E]">AI systems</span> from{" "}
            <span className="text-[#E8869E]">first principles</span> across{" "}
            <span className="text-[#E8869E]">ML, agents, memory,</span> and{" "}
            <span className="text-[#E8869E]">autonomous execution.</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-pakcat-text-secondary leading-relaxed mb-8 max-w-2xl font-body">
            Personal build lab of{" "}
            <strong className="text-pakcat-text-primary font-medium">Ashish Dhankecha</strong> — 
            engineering autonomous cognitive architectures, local inference engines, and verifiable stateful runtimes with zero fragile abstractions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Magnetic>
              <a
                href="#projects"
                className="inline-block font-mono text-sm bg-[#80142B] text-[#F7ECEF] px-7 py-3.5 border border-[#B02242] hover:bg-[#9B223D] transition-all rounded-sm font-medium shadow-lg shadow-[#80142B]/40"
              >
                [VIEW SYSTEMS]
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="#contact"
                className="inline-block font-mono text-sm border border-[#5A1A2C] text-[#E27D95] px-7 py-3.5 hover:border-[#E27D95] hover:bg-[#280A15] transition-all rounded-sm"
              >
                [GET IN TOUCH]
              </a>
            </Magnetic>
          </div>

          {/* External Links */}
          <div className="flex items-center justify-center gap-4 text-xs font-mono text-pakcat-text-secondary mb-12">
            <a
              href="https://github.com/Ashish-Dhankecha"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E27D95] transition-colors"
            >
              [GITHUB]
            </a>
            <span className="text-[#5A1A2C]">/</span>
            <a
              href="https://linkedin.com/in/ashish-dhankecha"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E27D95] transition-colors"
            >
              [LINKEDIN]
            </a>
            <span className="text-[#5A1A2C]">/</span>
            <a
              href="mailto:ashishdhankecha.business@gmail.com"
              className="hover:text-[#E27D95] transition-colors"
            >
              [EMAIL]
            </a>
          </div>

          {/* Metrics Strip */}
          <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#3B121E]">
            <div className="text-center">
              <span className="font-mono text-[#E27D95] text-2xl sm:text-3xl font-bold">3+</span>
              <p className="text-xs text-pakcat-text-secondary mt-1 font-body">years research &amp; build</p>
            </div>
            <div className="text-center">
              <span className="font-mono text-[#E27D95] text-2xl sm:text-3xl font-bold">28+</span>
              <p className="text-xs text-pakcat-text-secondary mt-1 font-body">subsystems engineered</p>
            </div>
            <div className="text-center">
              <span className="font-mono text-[#E27D95] text-2xl sm:text-3xl font-bold">3</span>
              <p className="text-xs text-pakcat-text-secondary mt-1 font-body">OS archetypes (Ashi, Leo, Vani)</p>
            </div>
            <div className="text-center">
              <span className="font-mono text-[#E27D95] text-2xl sm:text-3xl font-bold">100%</span>
              <p className="text-xs text-pakcat-text-secondary mt-1 font-body">first principles</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
