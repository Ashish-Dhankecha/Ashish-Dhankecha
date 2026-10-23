"use client";

import React, { useState } from "react";
import {
  ProjectArchitecture,
  ArchitectureComponent,
  ClaimVerificationStatus,
} from "@/types/project-case-study";

interface InteractiveArchitectureProps {
  architecture: ProjectArchitecture;
}

function StatusBadge({ status }: { status: ClaimVerificationStatus }) {
  const styles: Record<ClaimVerificationStatus, { text: string; bg: string; border: string }> = {
    VERIFIED: {
      text: "text-emerald-400",
      bg: "bg-emerald-950/40",
      border: "border-emerald-500/40",
    },
    IMPLEMENTED: {
      text: "text-cyan-400",
      bg: "bg-cyan-950/40",
      border: "border-cyan-500/40",
    },
    EXPERIMENTAL: {
      text: "text-amber-400",
      bg: "bg-amber-950/40",
      border: "border-amber-500/40",
    },
    PARTIAL: {
      text: "text-yellow-300",
      bg: "bg-yellow-950/30",
      border: "border-yellow-600/40",
    },
    PLANNED: {
      text: "text-blue-300",
      bg: "bg-blue-950/30",
      border: "border-blue-500/40",
    },
    FAILED: {
      text: "text-rose-400",
      bg: "bg-rose-950/40",
      border: "border-rose-500/40",
    },
    DEPRECATED: {
      text: "text-zinc-400",
      bg: "bg-zinc-900/60",
      border: "border-zinc-700/50",
    },
  };

  const current = styles[status] || styles.IMPLEMENTED;

  return (
    <span
      className={`font-mono text-[10px] uppercase px-2.5 py-0.5 rounded-full border ${current.text} ${current.bg} ${current.border}`}
    >
      {status}
    </span>
  );
}

export function InteractiveArchitecture({
  architecture,
}: InteractiveArchitectureProps) {
  // Default to the first component of the first layer
  const firstComponent =
    architecture.layers[0]?.components[0] || null;
  const [selectedComponent, setSelectedComponent] =
    useState<ArchitectureComponent | null>(firstComponent);

  return (
    <section id="architecture" className="py-16 md:py-24 border-b border-white/10 bg-[#050505]">
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
              05 // SYSTEM ARCHITECTURE &amp; SUBSYSTEM TOPOLOGY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-sans tracking-tight">
            Stratified Architectural Layers
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-sans leading-relaxed max-w-3xl mt-3">
            {architecture.overview} Click on any subsystem node below to inspect its operational mechanism,
            verified claim status, and engineering trade-offs.
          </p>
        </div>

        {/* Interactive Workspace Grid: Layers Diagram on Left/Top, Inspector on Right/Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Architecture Layers (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {architecture.layers.map((layer) => (
              <div
                key={layer.layerId}
                className="p-5 sm:p-6 rounded-2xl glass-card border border-white/10 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-3 border-b border-white/10">
                  <h3 className="font-mono text-xs font-bold text-emerald-400 tracking-wider">
                    {layer.name}
                  </h3>
                  <span className="text-[11px] text-white/50 font-sans">
                    {layer.description}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                  {layer.components.map((comp) => {
                    const isSelected = selectedComponent?.id === comp.id;
                    return (
                      <button
                        key={comp.id}
                        type="button"
                        onClick={() => setSelectedComponent(comp)}
                        className={`text-left p-3 rounded-xl border transition-all text-xs font-mono flex flex-col justify-between gap-2.5 ${
                          isSelected
                            ? "bg-emerald-950/40 border-emerald-500 text-white shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-500/50"
                            : "bg-white/[0.02] border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.05] text-white/80"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className="font-bold text-white truncate">
                            {comp.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <StatusBadge status={comp.status} />
                          <span
                            className={`text-xs ${
                              isSelected
                                ? "text-emerald-400 font-semibold"
                                : "text-white/40"
                            }`}
                          >
                            {isSelected ? "● ACTIVE" : "INSPECT →"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Subsystem Inspector Panel (Right 5 Cols - Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="glass-card p-6 sm:p-7 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden bg-[#0A0A0A]/95 backdrop-blur-xl">
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-5 border-b border-white/10">
                <span className="font-mono text-[11px] text-emerald-400 uppercase tracking-wider font-semibold">
                  [ SUBSYSTEM INSPECTOR ]
                </span>
                {selectedComponent && (
                  <StatusBadge status={selectedComponent.status} />
                )}
              </div>

              {selectedComponent ? (
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xl font-bold text-white font-sans">
                      {selectedComponent.name}
                    </h4>
                    <p className="text-xs font-mono text-emerald-400/80 mt-1">
                      Identifier: {selectedComponent.id}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block font-semibold">
                      CORE PURPOSE &amp; INVARIANT
                    </span>
                    <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
                      {selectedComponent.purpose}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-4 border-t border-white/10">
                    <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider block font-semibold">
                      HOW IT WORKS IN CODE
                    </span>
                    <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
                      {selectedComponent.howItWorks}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-4 border-t border-white/10">
                    <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider block font-semibold">
                      ENGINEERING TRADE-OFF
                    </span>
                    <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed italic bg-white/[0.02] p-3 rounded-xl border border-white/10">
                      &ldquo;{selectedComponent.tradeoff}&rdquo;
                    </p>
                  </div>

                  {selectedComponent.keyFiles && selectedComponent.keyFiles.length > 0 && (
                    <div className="space-y-1.5 pt-4 border-t border-white/10">
                      <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider block font-semibold">
                        REPOSITORY SOURCE REFERENCES
                      </span>
                      <div className="space-y-1.5">
                        {selectedComponent.keyFiles.map((file) => (
                          <div
                            key={file}
                            className="font-mono text-[11px] text-white/70 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/10 truncate"
                          >
                            {file}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center text-xs font-mono text-white/40">
                  Select a subsystem node to inspect implementation details.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
