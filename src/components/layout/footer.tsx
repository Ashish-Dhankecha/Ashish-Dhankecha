"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="relative z-10 border-t border-white/[0.08] bg-[#050505] py-16 px-4 sm:px-6 overflow-hidden"
    >
      <div className="section-container max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Signature Giant Strikethrough Headline (mal1k.xyz signature) */}
        <div className="mb-10 select-none">
          <p
            className="font-extrabold tracking-tighter uppercase text-white/90 leading-tight"
            style={{ fontSize: "clamp(2rem, 7vw, 4.5rem)" }}
          >
            <span className="line-through decoration-white/40 text-white/30 mr-2 sm:mr-4">
              Eat Sleep Repeat
            </span>
            <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
              Automate
            </span>
          </p>
        </div>

        {/* Minimal Navigation & Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-white/60 mb-8">
          <Link href="/#hero" className="hover:text-white transition-colors">
            {"// home"}
          </Link>
          <Link href="/#about" className="hover:text-white transition-colors">
            {"// about"}
          </Link>
          <Link href="/projects" className="hover:text-white transition-colors">
            {"// systems"}
          </Link>
          <Link href="/#stack" className="hover:text-white transition-colors">
            {"// stack"}
          </Link>
          <Link href="/lab" className="text-emerald-400 hover:underline transition-colors">
            {"// lab_archive"}
          </Link>
          <Link href="/#contact" className="hover:text-white transition-colors">
            {"// contact"}
          </Link>
        </div>

        {/* Telemetry Invariant Line */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass border border-white/10 text-[11px] font-mono text-white/40 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Status: All Systems Nominal</span>
          <span className="text-white/20">•</span>
          <span>Acyclic Invariants: 100%</span>
        </div>

        {/* Attribution & Copyright */}
        <p className="text-xs text-white/30 font-mono">
          &copy; {new Date().getFullYear()} Ashish Dhankecha. Built with Next.js 15, React 19, Lenis &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
