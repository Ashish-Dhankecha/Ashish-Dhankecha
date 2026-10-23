"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const TYPEWRITER_PHRASES = [
  "AI Systems & Cognitive Architecture",
  "Multi-Agent Swarms & Autonomous Runtimes",
  "Local SLM Inference & llama.cpp Quantization",
  "Full-Stack Engineering & Micro-Frontends",
  "I WILL MAKE IT HAPPEN. No matter what.",
];

export function HeroSection() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroCardRef = useRef<HTMLDivElement | null>(null);

  // Typewriter effect
  useEffect(() => {
    const current = TYPEWRITER_PHRASES[phraseIdx];
    const typingSpeed = isDeleting ? 30 : 65;

    if (!isDeleting && displayText === current) {
      const pauseTimer = setTimeout(() => setIsDeleting(true), 2400);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting ? current.substring(0, prev.length - 1) : current.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIdx]);

  // 3D Tilt Effect on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroCardRef.current) return;
    const rect = heroCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / (rect.height / 2)) * 6;
    const rotY = (x / (rect.width / 2)) * 6;
    setMousePos({ x: rotY, y: rotX });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden"
    >
      <div
        ref={heroCardRef}
        style={{
          transform: `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        className="w-full max-w-5xl mx-auto flex flex-col items-center"
      >
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/10 text-xs font-mono text-white/70 mb-8 select-none shadow-sm hover:border-white/20 transition-colors">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Building AI systems & autonomous agents</span>
        </div>

        {/* Massive Typographic Clamped Header (mal1k.xyz signature style) */}
        <h1
          className="font-extrabold tracking-tighter uppercase leading-[0.88] mb-6 select-none"
          style={{ fontSize: "clamp(3.5rem, 13vw, 9.5rem)" }}
        >
          <span className="block text-white drop-shadow-[0_4px_30px_rgba(255,255,255,0.15)]">
            ASHISH
          </span>
          <span className="block text-white/40 tracking-tight">
            DHANKECHA
          </span>
        </h1>

        {/* Typewriter Terminal line with glowing caret */}
        <div className="font-mono text-base sm:text-lg md:text-xl text-white/70 mb-10 h-10 flex items-center justify-center gap-2 max-w-3xl px-2">
          <span className="text-white/40 font-bold">&gt;</span>
          <span className="text-white tracking-wide">{displayText}</span>
          <span className="terminal-cursor" />
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <Link
            href="/#projects"
            className="px-7 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] active:scale-[0.98]"
          >
            Explore Systems →
          </Link>
          <Link
            href="/#contact"
            className="px-7 py-3 rounded-full glass border border-white/10 font-semibold text-sm text-white/80 hover:text-white hover:border-white/30 transition-all hover:bg-white/5 active:scale-[0.98]"
          >
            Get in Touch
          </Link>
          <Link
            href="/lab"
            className="px-5 py-3 rounded-full glass border border-white/10 font-mono text-xs text-white/60 hover:text-white hover:border-white/20 transition-all"
          >
            /lab archive (62 notes)
          </Link>
        </div>

        {/* Supporting Creed Quote */}
        <p className="text-xs sm:text-sm text-white/45 font-mono max-w-xl mx-auto italic mb-10">
          &ldquo;I don&apos;t need to know everything before I start. I need to know how to figure it out.&rdquo;
        </p>

        {/* Hardware & Invariants Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 w-full max-w-4xl text-left">
          <div className="glass-card p-3 rounded-xl border border-white/[0.08]">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">Architecture</span>
            <span className="text-xs sm:text-sm font-mono font-medium text-white/90">28 Monorepo Packages</span>
          </div>
          <div className="glass-card p-3 rounded-xl border border-white/[0.08]">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">Inference Engine</span>
            <span className="text-xs sm:text-sm font-mono font-medium text-white/90">Local quantized SLMs</span>
          </div>
          <div className="glass-card p-3 rounded-xl border border-white/[0.08]">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">Invariants</span>
            <span className="text-xs sm:text-sm font-mono font-medium text-emerald-400">100% Graph Checked</span>
          </div>
          <div className="glass-card p-3 rounded-xl border border-white/[0.08]">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">Runtime</span>
            <span className="text-xs sm:text-sm font-mono font-medium text-white/90">Linux / Arch / uv</span>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-white animate-bounce" />
        </div>
      </div>
    </section>
  );
}
