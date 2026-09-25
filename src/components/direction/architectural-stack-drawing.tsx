"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ArchitecturalStackDrawingProps {
  activeStage?: string | null;
  onHoverStage?: (stageNumber: string | null) => void;
  className?: string;
}

const LAYERS = [
  {
    number: "06",
    title: "CREATION",
    type: "SYNTHESIS & UTILITY",
    y: 28,
    height: 38,
    widthRatio: 1.0,
    accent: true,
  },
  {
    number: "05",
    title: "RESEARCH",
    type: "EMPIRICAL DISCOVERY",
    y: 74,
    height: 38,
    widthRatio: 0.94,
    accent: false,
  },
  {
    number: "04",
    title: "AUTONOMY",
    type: "STATEFUL AGENCY & KERNEL",
    y: 120,
    height: 38,
    widthRatio: 0.88,
    accent: true,
  },
  {
    number: "03",
    title: "SYSTEMS",
    type: "COMPUTATION & RUNTIME",
    y: 166,
    height: 38,
    widthRatio: 0.82,
    accent: false,
  },
  {
    number: "02",
    title: "INTELLIGENCE",
    type: "REPRESENTATION & LEARNING",
    y: 212,
    height: 38,
    widthRatio: 0.76,
    accent: false,
  },
  {
    number: "01",
    title: "FOUNDATIONS",
    type: "MATHEMATICAL SUBSTRATE",
    y: 258,
    height: 38,
    widthRatio: 0.70,
    accent: false,
  },
];

export function ArchitecturalStackDrawing({
  activeStage,
  onHoverStage,
  className,
}: ArchitecturalStackDrawingProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#2D161C] bg-[#140A0D] p-4 sm:p-6 select-none relative shadow-xl",
        className
      )}
    >
      {/* Plate Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2D161C] pb-2.5 sm:pb-3 text-[10px] font-mono tracking-widest text-[#8E7C79] uppercase gap-1">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DF7987]" />
          <span className="text-[#F5EBE1] font-semibold">
            FIG. 04A // CAPABILITY STACK SCHEMATIC
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] text-[#8E7C79]">ORDER: FOUNDATION → REALITY</span>
      </div>

      {/* Drawing Canvas */}
      <div className="pt-3 sm:pt-4 pb-1 sm:pb-2">
        <svg
          viewBox="0 0 540 316"
          className="w-full h-auto"
          aria-label="Abstract technical diagram showing layered progression from foundations to creation"
        >
          <defs>
            <style>{`
              @media (max-width: 640px) {
                .arch-layer-type { display: none !important; }
              }
            `}</style>
            {/* Fine Grid Pattern */}
            <pattern
              id="archGrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="#2D161C"
                strokeWidth="0.5"
                strokeOpacity="0.8"
              />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width="540" height="316" fill="url(#archGrid)" />

          {/* Central Alignment Axis */}
          <line
            x1="270"
            y1="10"
            x2="270"
            y2="306"
            stroke="#801D2C"
            strokeWidth="0.8"
            strokeDasharray="2 3"
            strokeOpacity="0.6"
          />

          {/* Lateral Dimension Guides */}
          <line
            x1="30"
            y1="20"
            x2="30"
            y2="300"
            stroke="#2D161C"
            strokeWidth="0.6"
          />
          <line
            x1="24"
            y1="20"
            x2="36"
            y2="20"
            stroke="#2D161C"
            strokeWidth="0.6"
          />
          <line
            x1="24"
            y1="300"
            x2="36"
            y2="300"
            stroke="#2D161C"
            strokeWidth="0.6"
          />

          <text
            x="20"
            y="160"
            fontSize="8"
            fontFamily="monospace"
            fill="#8E7C79"
            letterSpacing="0.2em"
            transform="rotate(-90 20 160)"
            textAnchor="middle"
          >
            CAPABILITY HORIZON (BROADER SCOPE ↑)
          </text>

          {/* The Stack Layers */}
          {LAYERS.map((layer) => {
            const isActive = activeStage === layer.number;
            const fullW = 440;
            const currentW = fullW * layer.widthRatio;
            const x = 270 - currentW / 2;

            return (
              <g
                key={layer.number}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => onHoverStage?.(layer.number)}
                onMouseLeave={() => onHoverStage?.(null)}
                tabIndex={0}
                role="button"
                aria-label={`Layer ${layer.number}: ${layer.title}`}
              >
                {/* Structural Box */}
                <rect
                  x={x}
                  y={layer.y}
                  width={currentW}
                  height={layer.height}
                  fill={
                    isActive
                      ? "#240D15"
                      : "#0C0608"
                  }
                  stroke={
                    isActive
                      ? "#801D2C"
                      : layer.accent
                      ? "#4A202A"
                      : "#2D161C"
                  }
                  strokeWidth={isActive ? "1.5" : "1"}
                  className="transition-colors duration-200"
                  rx="6"
                />

                {/* Left Number Tag */}
                <text
                  x={x + 14}
                  y={layer.y + 23}
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="600"
                  fill={isActive ? "#DF7987" : "#8E7C79"}
                  letterSpacing="0.1em"
                >
                  {layer.number}
                </text>

                {/* Title */}
                <text
                  x={x + 44}
                  y={layer.y + 23}
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="600"
                  letterSpacing="0.15em"
                  fill={isActive ? "#DF7987" : "#F5EBE1"}
                >
                  {layer.title}
                </text>

                {/* Subtitle / Type */}
                <text
                  x={x + currentW - 14}
                  y={layer.y + 23}
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="end"
                  letterSpacing="0.1em"
                  fill={isActive ? "#D9C7B8" : "#8E7C79"}
                  className="arch-layer-type"
                >
                  {layer.type}
                </text>

                {/* Accent tick marks on corners */}
                <line
                  x1={x}
                  y1={layer.y + layer.height / 2}
                  x2={x + 4}
                  y2={layer.y + layer.height / 2}
                  stroke={isActive ? "#DF7987" : "#4A202A"}
                  strokeWidth="1"
                />
                <line
                  x1={x + currentW - 4}
                  y1={layer.y + layer.height / 2}
                  x2={x + currentW}
                  y2={layer.y + layer.height / 2}
                  stroke={isActive ? "#DF7987" : "#4A202A"}
                  strokeWidth="1"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Footer metadata legend */}
      <div className="pt-2 border-t border-[#2D161C] flex flex-wrap items-center justify-between text-[9px] font-mono text-[#8E7C79] tracking-wider uppercase">
        <span>SCHEMATIC REF // DIR-2026-LAYERED</span>
        <span className="text-[#DF7987]">RUNTIME: DETERMINISTIC STACK</span>
      </div>
    </div>
  );
}
