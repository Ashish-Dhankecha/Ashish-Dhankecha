"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Magnetic } from "./magnetic-button";

interface TypeLine {
  id: string;
  text: string;
  speed: number;
  pauseAfter: number;
}

const HERO_LINES: TypeLine[] = [
  { id: "greeting", text: "Hi, I'm Ashish Dhankecha.", speed: 20, pauseAfter: 140 },
  { id: "role", text: "AI Developer & Systems Builder", speed: 18, pauseAfter: 130 },
  {
    id: "mission",
    text: "I build AI systems, software, experiments, and products — whatever the problem demands.",
    speed: 14,
    pauseAfter: 140,
  },
  { id: "skill", text: "MY ALL-ROUNDER SKILL", speed: 18, pauseAfter: 130 },
  { id: "resolve", text: "I WILL MAKE IT HAPPEN.", speed: 20, pauseAfter: 120 },
  { id: "resolve-sub", text: "No matter what.", speed: 18, pauseAfter: 140 },
  {
    id: "supporting",
    text: "I don't need to know everything before I start. I need to know how to figure it out.",
    speed: 14,
    pauseAfter: 150,
  },
  {
    id: "creed-1",
    text: "I don't limit myself to one stack, framework, or discipline.",
    speed: 13,
    pauseAfter: 85,
  },
  {
    id: "creed-2",
    text: "If something needs to be learned, I learn it.",
    speed: 13,
    pauseAfter: 85,
  },
  {
    id: "creed-3",
    text: "If something needs to be built, I build it.",
    speed: 13,
    pauseAfter: 85,
  },
  {
    id: "creed-4",
    text: "If something breaks, I figure out why.",
    speed: 13,
    pauseAfter: 85,
  },
  {
    id: "creed-5",
    text: "If the obvious approach doesn't work, I find another one.",
    speed: 13,
    pauseAfter: 160,
  },
];

function TerminalCursor({ active = true, className = "" }: { active?: boolean; className?: string }) {
  if (!active) return null;
  return (
    <span
      className={`inline-block w-2.5 h-[1.1em] ml-1 bg-[var(--accent-brass)] shadow-[0_0_10px_var(--accent-glow)] align-middle cursor-blink ${className}`}
      aria-hidden="true"
    />
  );
}

export function HeroSection() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsDone(true);
      return;
    }

    if (isDone) return;

    const currentLine = HERO_LINES[lineIndex];
    if (!currentLine) {
      setIsDone(true);
      return;
    }

    if (charIndex < currentLine.text.length) {
      const timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, currentLine.speed);
      return () => clearTimeout(timer);
    } else {
      if (lineIndex < HERO_LINES.length - 1) {
        const pauseTimer = setTimeout(() => {
          setLineIndex((prev) => prev + 1);
          setCharIndex(0);
        }, currentLine.pauseAfter);
        return () => clearTimeout(pauseTimer);
      } else {
        setIsDone(true);
      }
    }
  }, [lineIndex, charIndex, isDone]);

  const handleSkip = useCallback(() => {
    setIsDone(true);
    setLineIndex(HERO_LINES.length - 1);
    setCharIndex(HERO_LINES[HERO_LINES.length - 1].text.length);
  }, []);

  const handleReplay = useCallback(() => {
    setIsDone(false);
    setLineIndex(0);
    setCharIndex(0);
  }, []);

  const getLineContent = useCallback(
    (idx: number): string => {
      if (isDone || idx < lineIndex) {
        return HERO_LINES[idx].text;
      }
      if (idx === lineIndex) {
        return HERO_LINES[idx].text.slice(0, charIndex);
      }
      return "";
    },
    [isDone, lineIndex, charIndex]
  );

  const hasStarted = useCallback(
    (idx: number): boolean => {
      if (isDone) return true;
      return idx <= lineIndex;
    },
    [isDone, lineIndex]
  );

  // Line 0 parsing: "Hi, I'm Ashish Dhankecha."
  // Prefix: "Hi, I'm " (length: 8)
  // Name: "Ashish Dhankecha." (length: 17)
  const line0Content = getLineContent(0);
  const line0Greeting = line0Content.slice(0, 8);
  const line0Name = line0Content.length > 8 ? line0Content.slice(8) : "";

  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative z-10 pt-24 sm:pt-36 pb-12 sm:pb-20 overflow-hidden">
      {/* Ambient Banker Lamp Illumination Glow */}
      <div
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,var(--accent-glow)_0%,rgba(37,71,55,0.12)_50%,transparent_70%)] blur-3xl -z-10"
        aria-hidden="true"
      />

      {/* Screen Reader SEO Fallback */}
      <div className="sr-only">
        <h1>Hi, I&apos;m Ashish Dhankecha.</h1>
        <h2>AI Developer &amp; Systems Builder</h2>
        <p>I build AI systems, software, experiments, and products — whatever the problem demands.</p>
        <p>MY ALL-ROUNDER SKILL</p>
        <p>I WILL MAKE IT HAPPEN. No matter what.</p>
        <p>I don&apos;t need to know everything before I start. I need to know how to figure it out.</p>
        <p>I don&apos;t limit myself to one stack, framework, or discipline.</p>
        <p>If something needs to be learned, I learn it.</p>
        <p>If something needs to be built, I build it.</p>
        <p>If something breaks, I figure out why.</p>
        <p>If the obvious approach doesn&apos;t work, I find another one.</p>
      </div>

      <div className="section-container">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center reveal reveal-up visible">
          {/* Line 0: Headline with perfect mobile typography */}
          <div className="mb-4 sm:mb-6 min-h-[4.5rem] sm:min-h-[5.5rem] flex items-center justify-center w-full">
            <h1
              id="hero-heading"
              className="w-full tracking-tight text-[var(--ink)] leading-[1.15] flex flex-col sm:flex-row items-center sm:items-baseline justify-center gap-y-1 sm:gap-x-4 max-w-full px-1"
            >
              <span className="font-sans font-bold text-2xl min-[360px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--ink)]/90 shrink-0">
                {line0Greeting}
                {lineIndex === 0 && line0Content.length <= 8 && (
                  <TerminalCursor active={!isDone} />
                )}
              </span>
              {line0Name && (
                <span className="relative inline-block font-script font-normal text-[2.15rem] min-[360px]:text-[2.65rem] min-[400px]:text-[3.1rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] text-[var(--accent-brass)] tracking-normal sm:tracking-wide px-2 max-w-full drop-shadow-[0_0_35px_var(--accent-glow)] break-words leading-tight sm:leading-none">
                  {line0Name}
                  {lineIndex === 0 && line0Content.length > 8 && (
                    <TerminalCursor active={!isDone} />
                  )}
                </span>
              )}
            </h1>
          </div>

          {/* Line 1: Primary Identity */}
          {hasStarted(1) && (
            <h2 className="text-lg min-[360px]:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug mb-3 sm:mb-4 text-[var(--accent-brass)] font-sans max-w-3xl flex items-center justify-center flex-wrap px-2">
              <span>{getLineContent(1)}</span>
              <TerminalCursor active={!isDone && lineIndex === 1} />
            </h2>
          )}

          {/* Line 2: What I build */}
          {hasStarted(2) && (
            <p className="text-sm min-[360px]:text-base sm:text-lg md:text-xl text-[var(--ink)]/90 leading-relaxed mb-5 sm:mb-6 max-w-2xl font-body px-2">
              {getLineContent(2)}
              <TerminalCursor active={!isDone && lineIndex === 2} className="h-[0.9em] w-2" />
            </p>
          )}

          {/* Line 3: Signature Principle Badge */}
          {hasStarted(3) && (
            <div className="mb-4 flex justify-center px-2">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-[var(--accent-brass)]/50 bg-[var(--panel)] text-[var(--accent-gold)] font-mono text-[11px] sm:text-xs md:text-sm uppercase tracking-wider sm:tracking-widest shadow-sm shadow-[var(--accent-glow)]">
                <span className="text-[var(--accent-brass)]">✦</span>
                <span>{getLineContent(3)}</span>
                <TerminalCursor active={!isDone && lineIndex === 3} className="h-[0.9em] w-2" />
              </div>
            </div>
          )}

          {/* Lines 4 & 5: The Core Creed */}
          {hasStarted(4) && (
            <div className="mb-4 text-center space-y-1 px-2">
              <div className="font-sans font-extrabold text-xl min-[360px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[var(--accent-gold)] tracking-tight drop-shadow-[0_0_25px_var(--accent-glow)]">
                <span>{getLineContent(4)}</span>
                <TerminalCursor active={!isDone && lineIndex === 4} />
              </div>
              {hasStarted(5) && (
                <div className="text-base min-[360px]:text-lg sm:text-xl md:text-2xl font-medium text-[var(--muted)] italic font-body">
                  <span>{getLineContent(5)}</span>
                  <TerminalCursor active={!isDone && lineIndex === 5} />
                </div>
              )}
            </div>
          )}

          {/* Line 6: Supporting Truth */}
          {hasStarted(6) && (
            <p className="text-sm sm:text-base text-[var(--muted)] font-mono max-w-xl mx-auto mb-8">
              &ldquo;{getLineContent(6)}&rdquo;
              <TerminalCursor active={!isDone && lineIndex === 6} className="h-[0.85em] w-1.5" />
            </p>
          )}

          {/* Lines 7 to 11: What that means */}
          {hasStarted(7) && (
            <div className="w-full max-w-2xl mx-auto mb-8 brutal-card rounded-sm p-4 sm:p-6 text-left font-mono text-xs sm:text-sm text-[var(--ink)]/90 shadow-2xl relative">
              <div className="border-b border-[var(--line)] pb-3 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-enamel)] shadow-[0_0_6px_var(--accent-glow)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#bf9c62]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffe4a5]" />
                  <span className="text-[var(--muted)] text-[11px] font-mono ml-2">What that means</span>
                </div>
                <span className="text-[10px] text-[var(--accent-brass)] tracking-widest uppercase">
                  FIRST PRINCIPLES
                </span>
              </div>

              <div className="space-y-2.5">
                {[7, 8, 9, 10, 11].map((idx) => {
                  if (!hasStarted(idx)) return null;
                  return (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="text-[var(--accent-brass)] select-none shrink-0 font-bold">&gt;</span>
                      <p className="leading-relaxed">
                        {getLineContent(idx)}
                        <TerminalCursor
                          active={(!isDone && lineIndex === idx) || (isDone && idx === 11)}
                          className="h-[0.9em] w-2"
                        />
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Interactive controls: Skip / Replay */}
          <div className="flex items-center justify-center gap-3 text-xs font-mono text-[var(--muted)] mb-8">
            {!isDone ? (
              <button
                type="button"
                onClick={handleSkip}
                className="hover:text-[var(--accent-brass)] transition-colors underline underline-offset-4 decoration-dotted cursor-pointer"
                aria-label="Skip typing animation"
              >
                [Skip typing ⏭]
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReplay}
                className="hover:text-[var(--accent-brass)] transition-colors underline underline-offset-4 decoration-dotted cursor-pointer"
                aria-label="Replay typing animation"
              >
                [↺ Replay typing]
              </button>
            )}
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8 w-full max-w-xs sm:max-w-none">
            <Magnetic>
              <a
                href="#projects"
                className="w-full sm:w-auto text-center inline-block font-mono text-sm bg-[var(--accent-enamel)] text-[var(--ink)] px-5 py-3 sm:px-7 sm:py-3.5 border border-[var(--accent-brass)] hover:bg-[var(--accent-enamel-bright)] hover:border-[var(--accent-gold)] transition-all rounded-sm font-medium shadow-lg shadow-[var(--accent-glow)]"
              >
                [ VIEW MY WORK ]
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="#contact"
                className="w-full sm:w-auto text-center inline-block font-mono text-sm border border-[var(--line)] text-[var(--accent-brass)] px-5 py-3 sm:px-7 sm:py-3.5 hover:border-[var(--accent-brass)] hover:bg-[var(--panel-hover)] transition-all rounded-sm font-medium"
              >
                [ GET IN TOUCH ]
              </a>
            </Magnetic>
          </div>

          {/* Secondary Links: GitHub, LinkedIn, X, Email */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono text-[var(--muted)] mb-8 sm:mb-10 px-2">
            <a
              href="https://github.com/Ashish-Dhankecha"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-brass)] transition-colors"
            >
              [GITHUB]
            </a>
            <span className="text-[var(--line-strong)]">/</span>
            <a
              href="https://linkedin.com/in/ashish-dhankecha"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-brass)] transition-colors"
            >
              [LINKEDIN]
            </a>
            <span className="text-[var(--line-strong)]">/</span>
            <a
              href="https://x.com/Ashish-Dhankecha"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent-brass)] transition-colors"
            >
              [X]
            </a>
            <span className="text-[var(--line-strong)]">/</span>
            <a
              href="mailto:ashishdhankecha256@gmail.com"
              className="hover:text-[var(--accent-brass)] transition-colors"
            >
              [EMAIL]
            </a>
          </div>

          {/* Honest Builder Metrics Strip */}
          <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-6 pt-6 sm:pt-8 border-t border-[var(--line)]">
            <div className="text-center p-2 rounded-sm bg-[var(--panel)]/40 sm:bg-transparent border border-[var(--line)]/50 sm:border-0">
              <span className="font-mono text-[var(--accent-brass)] text-xl min-[360px]:text-2xl sm:text-3xl font-bold">2024</span>
              <p className="text-[11px] sm:text-xs text-[var(--muted)] mt-1 font-body">Computer Engineering (Ongoing)</p>
            </div>
            <div className="text-center p-2 rounded-sm bg-[var(--panel)]/40 sm:bg-transparent border border-[var(--line)]/50 sm:border-0">
              <span className="font-mono text-[var(--accent-brass)] text-xl min-[360px]:text-2xl sm:text-3xl font-bold">3</span>
              <p className="text-[11px] sm:text-xs text-[var(--muted)] mt-1 font-body">AI Systems (Ashi, LEO, VANI)</p>
            </div>
            <div className="text-center p-2 rounded-sm bg-[var(--panel)]/40 sm:bg-transparent border border-[var(--line)]/50 sm:border-0">
              <span className="font-mono text-[var(--accent-brass)] text-xl min-[360px]:text-2xl sm:text-3xl font-bold">62+</span>
              <p className="text-[11px] sm:text-xs text-[var(--muted)] mt-1 font-body">Lab Notes &amp; ADR Audits</p>
            </div>
            <div className="text-center p-2 rounded-sm bg-[var(--panel)]/40 sm:bg-transparent border border-[var(--line)]/50 sm:border-0">
              <span className="font-mono text-[var(--accent-brass)] text-xl min-[360px]:text-2xl sm:text-3xl font-bold">100%</span>
              <p className="text-[11px] sm:text-xs text-[var(--muted)] mt-1 font-body">first principles build</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
