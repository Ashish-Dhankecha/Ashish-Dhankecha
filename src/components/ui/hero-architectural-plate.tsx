"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function HeroArchitecturalPlate({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border border-[#1E293B] bg-[#0D1117] p-2 sm:p-2.5 shadow-2xl text-[#F8FAFC] select-none",
        className
      )}
    >
      {/* Top Technical Metadata Header */}
      <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] px-3 py-2 border-b border-[#1E293B] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse shadow-[0_0_8px_#38BDF8]" />
          <span>AUTONOMOUS AGENTS // SYSTEMS RUNTIME</span>
        </div>
        <span className="text-[#38BDF8] font-semibold font-mono">KERNEL: 2026</span>
      </div>

      {/* Main Architectural Visual Frame */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full bg-[#070A0F] overflow-hidden my-1 border border-[#1E293B] flex items-center justify-center p-6">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Abstract Architectural Schematic Geometry (SVG vector drawing) */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full max-w-[320px] max-h-[320px] relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Coordinate Frame Lines */}
          <line x1="40" y1="200" x2="360" y2="200" stroke="#1E293B" strokeWidth="0.8" strokeDasharray="2 4" />
          <line x1="200" y1="40" x2="200" y2="360" stroke="#1E293B" strokeWidth="0.8" strokeDasharray="2 4" />
          <circle cx="200" cy="200" r="140" stroke="#1E293B" strokeWidth="0.8" />
          <circle cx="200" cy="200" r="80" stroke="#1E293B" strokeWidth="0.8" strokeDasharray="3 3" />

          {/* Isometric Monolith / Solid Forms */}
          {/* Main Block Foundation */}
          <polygon
            points="200,70 320,140 320,260 200,330 80,260 80,140"
            stroke="#334155"
            strokeWidth="1.2"
            fill="#0B1017"
          />

          {/* Top Facet (Light plane) */}
          <polygon
            points="200,70 320,140 200,210 80,140"
            fill="#111827"
            stroke="#475569"
            strokeWidth="1"
          />

          {/* Left Facet (Shadow plane) */}
          <polygon
            points="80,140 200,210 200,330 80,260"
            fill="#080D14"
            stroke="#334155"
            strokeWidth="1"
          />

          {/* Right Facet (Midtone plane) */}
          <polygon
            points="200,210 320,140 320,260 200,330"
            fill="#0D131F"
            stroke="#334155"
            strokeWidth="1"
          />

          {/* Precision Architectural Inset Core */}
          <polygon
            points="200,110 270,150 200,190 130,150"
            fill="#070A0F"
            stroke="#38BDF8"
            strokeWidth="1.5"
          />
          <polygon
            points="130,150 200,190 200,270 130,230"
            fill="#071524"
            stroke="#38BDF8"
            strokeWidth="1"
          />
          <polygon
            points="200,190 270,150 270,230 200,270"
            fill="#091A2E"
            stroke="#38BDF8"
            strokeWidth="1"
          />

          {/* Central Cyber Core Node */}
          <circle cx="200" cy="190" r="4" fill="#38BDF8" />
          <circle cx="200" cy="190" r="10" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 2" />

          {/* Dimension Guidelines & Engineering Callouts */}
          <line x1="80" y1="130" x2="320" y2="130" stroke="#334155" strokeWidth="0.8" />
          <line x1="80" y1="125" x2="80" y2="135" stroke="#475569" strokeWidth="0.8" />
          <line x1="320" y1="125" x2="320" y2="135" stroke="#475569" strokeWidth="0.8" />
          <text x="200" y="122" fill="#38BDF8" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="0.2em">
            RUNTIME SPAN: 240μs
          </text>

          {/* Right vertical dimension */}
          <line x1="335" y1="140" x2="335" y2="260" stroke="#334155" strokeWidth="0.8" />
          <line x1="330" y1="140" x2="340" y2="140" stroke="#475569" strokeWidth="0.8" />
          <line x1="330" y1="260" x2="340" y2="260" stroke="#475569" strokeWidth="0.8" />
          <text x="345" y="203" fill="#64748B" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">
            L: 120
          </text>

          {/* Tiny structural nodes */}
          <rect x="78" y="138" width="4" height="4" fill="#38BDF8" />
          <rect x="318" y="138" width="4" height="4" fill="#38BDF8" />
          <rect x="198" y="68" width="4" height="4" fill="#38BDF8" />
          <rect x="198" y="328" width="4" height="4" fill="#38BDF8" />
        </svg>

        {/* Subtle corner registration marks */}
        <div className="absolute top-2 left-2 text-[#38BDF8]/40 font-mono text-[9px]">+</div>
        <div className="absolute top-2 right-2 text-[#38BDF8]/40 font-mono text-[9px]">+</div>
        <div className="absolute bottom-2 left-2 text-[#38BDF8]/40 font-mono text-[9px]">+</div>
        <div className="absolute bottom-2 right-2 text-[#38BDF8]/40 font-mono text-[9px]">+</div>
      </div>

      {/* Bottom Technical Caption Card Inside Frame */}
      <div className="bg-[#0D1117] text-[#F8FAFC] p-3.5 sm:p-4 border border-[#1E293B]">
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-2 mb-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400">
            SYSTEM // 001
          </span>
          <span className="font-mono text-[9px] tracking-wider text-[#38BDF8] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
            STATE: ACTIVE KERNEL
          </span>
        </div>
        <h3 className="font-sans text-sm sm:text-base font-semibold tracking-tight text-[#F8FAFC]">
          Deterministic Execution &middot; <span className="font-mono text-xs text-slate-400 font-normal">Stateful Agent Memory</span>
        </h3>
      </div>
    </div>
  );
}
