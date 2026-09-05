"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function HeroArchitecturalPlate({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border border-[#111111] bg-[#111111] p-2 sm:p-2.5 shadow-xl text-[#F3F0E8] select-none",
        className
      )}
    >
      {/* Top Technical Metadata Header */}
      <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] px-3 py-2 border-b border-[#333333] text-[#A09D95]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#173B70]" />
          <span>IDEAS → SYSTEMS → IMPACT</span>
        </div>
        <span className="text-[#F3F0E8] font-semibold">2026</span>
      </div>

      {/* Main Architectural Visual Frame */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full bg-[#181818] overflow-hidden my-1 border border-[#262626] flex items-center justify-center p-6">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Abstract Brutalist Architectural Geometry (SVG vector drawing) */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full max-w-[320px] max-h-[320px] relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Coordinate Frame Lines */}
          <line x1="40" y1="200" x2="360" y2="200" stroke="#333333" strokeWidth="0.8" strokeDasharray="2 4" />
          <line x1="200" y1="40" x2="200" y2="360" stroke="#333333" strokeWidth="0.8" strokeDasharray="2 4" />
          <circle cx="200" cy="200" r="140" stroke="#2B2B2B" strokeWidth="0.8" />
          <circle cx="200" cy="200" r="80" stroke="#2B2B2B" strokeWidth="0.8" strokeDasharray="3 3" />

          {/* Isometric Monolith / Brutalist Solid Forms */}
          {/* Main Block Foundation */}
          <polygon
            points="200,70 320,140 320,260 200,330 80,260 80,140"
            stroke="#666666"
            strokeWidth="1.2"
            fill="#1E1E1E"
          />

          {/* Top Facet (Light plane) */}
          <polygon
            points="200,70 320,140 200,210 80,140"
            fill="#2A2A2A"
            stroke="#888888"
            strokeWidth="1"
          />

          {/* Left Facet (Shadow plane) */}
          <polygon
            points="80,140 200,210 200,330 80,260"
            fill="#151515"
            stroke="#555555"
            strokeWidth="1"
          />

          {/* Right Facet (Midtone plane) */}
          <polygon
            points="200,210 320,140 320,260 200,330"
            fill="#1A1A1A"
            stroke="#555555"
            strokeWidth="1"
          />

          {/* Precision Architectural Inset Core */}
          <polygon
            points="200,110 270,150 200,190 130,150"
            fill="#111111"
            stroke="#173B70"
            strokeWidth="1.5"
          />
          <polygon
            points="130,150 200,190 200,270 130,230"
            fill="#0D1624"
            stroke="#173B70"
            strokeWidth="1"
          />
          <polygon
            points="200,190 270,150 270,230 200,270"
            fill="#131E31"
            stroke="#173B70"
            strokeWidth="1"
          />

          {/* Central Blue Core Node */}
          <circle cx="200" cy="190" r="3.5" fill="#F3F0E8" />
          <circle cx="200" cy="190" r="8" stroke="#173B70" strokeWidth="1" strokeDasharray="2 2" />

          {/* Dimension Guidelines & Engineering Callouts */}
          <line x1="80" y1="130" x2="320" y2="130" stroke="#444444" strokeWidth="0.8" />
          <line x1="80" y1="125" x2="80" y2="135" stroke="#888888" strokeWidth="0.8" />
          <line x1="320" y1="125" x2="320" y2="135" stroke="#888888" strokeWidth="0.8" />
          <text x="200" y="122" fill="#8B8579" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="0.2em">
            SPAN: 240u
          </text>

          {/* Right vertical dimension */}
          <line x1="335" y1="140" x2="335" y2="260" stroke="#444444" strokeWidth="0.8" />
          <line x1="330" y1="140" x2="340" y2="140" stroke="#888888" strokeWidth="0.8" />
          <line x1="330" y1="260" x2="340" y2="260" stroke="#888888" strokeWidth="0.8" />
          <text x="345" y="203" fill="#8B8579" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">
            H: 120u
          </text>

          {/* Tiny structural nodes */}
          <rect x="78" y="138" width="4" height="4" fill="#888888" />
          <rect x="318" y="138" width="4" height="4" fill="#888888" />
          <rect x="198" y="68" width="4" height="4" fill="#888888" />
          <rect x="198" y="328" width="4" height="4" fill="#888888" />
        </svg>

        {/* Subtle corner registration marks */}
        <div className="absolute top-2 left-2 text-[#444444] font-mono text-[9px]">+</div>
        <div className="absolute top-2 right-2 text-[#444444] font-mono text-[9px]">+</div>
        <div className="absolute bottom-2 left-2 text-[#444444] font-mono text-[9px]">+</div>
        <div className="absolute bottom-2 right-2 text-[#444444] font-mono text-[9px]">+</div>
      </div>

      {/* Bottom Editorial Caption Card Inside Frame */}
      <div className="bg-[#EDE8DE] text-[#111111] p-3.5 sm:p-4 border border-[#333333]">
        <div className="flex items-center justify-between border-b border-[#D8D4CB] pb-2 mb-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#555555]">
            SYSTEM / 001
          </span>
          <span className="font-mono text-[9px] tracking-wider text-[#173B70] font-semibold">
            STATE: ACTIVE KERNEL
          </span>
        </div>
        <h3 className="font-display text-sm sm:text-base font-normal tracking-tight text-[#111111]">
          First-Principles Architecture &middot; <span className="italic text-[#555555]">Computational Blueprint</span>
        </h3>
      </div>
    </div>
  );
}
