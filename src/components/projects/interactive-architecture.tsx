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
      border: "border-emerald-800/60",
    },
    IMPLEMENTED: {
      text: "text-[var(--accent-gold)]",
      bg: "bg-[var(--accent-enamel)]/40",
      border: "border-[var(--accent-brass)]/60",
    },
    EXPERIMENTAL: {
      text: "text-amber-400",
      bg: "bg-amber-950/40",
      border: "border-amber-800/60",
    },
    PARTIAL: {
      text: "text-yellow-300",
      bg: "bg-yellow-950/30",
      border: "border-yellow-700/50",
    },
    PLANNED: {
      text: "text-blue-300",
      bg: "bg-blue-950/30",
      border: "border-blue-800/50",
    },
    FAILED: {
      text: "text-rose-400",
      bg: "bg-rose-950/40",
      border: "border-rose-800/60",
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
      className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded-sm border ${current.text} ${current.bg} ${current.border}`}
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
    <section id="architecture" className="py-16 md:py-20 border-b border-[var(--line)]">
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
              05 // SYSTEM ARCHITECTURE &amp; SUBSYSTEM TOPOLOGY
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ink)] font-sans tracking-tight">
            Stratified Architectural Layers
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] font-body leading-relaxed max-w-3xl mt-3">
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
                className="p-4 sm:p-5 bg-[var(--panel)] border border-[var(--line)] rounded-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-2 border-b border-[var(--line)]/60">
                  <h3 className="font-mono text-xs font-bold text-[var(--accent-brass)] tracking-wider">
                    {layer.name}
                  </h3>
                  <span className="text-[11px] text-[var(--muted)] font-body">
                    {layer.description}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                  {layer.components.map((comp) => {
                    const isSelected = selectedComponent?.id === comp.id;
                    return (
                      <button
                        key={comp.id}
                        type="button"
                        onClick={() => setSelectedComponent(comp)}
                        className={`text-left p-2.5 rounded-sm border transition-all text-xs font-mono flex flex-col justify-between gap-2 ${
                          isSelected
                            ? "bg-[var(--accent-enamel)]/40 border-[var(--accent-brass)] shadow-md shadow-[var(--accent-glow)] ring-1 ring-[var(--accent-brass)]"
                            : "bg-[var(--bg)]/80 border-[var(--line)] hover:border-[var(--accent-brass)]/70 hover:bg-[var(--panel)]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className="font-bold text-[var(--ink)] truncate">
                            {comp.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                          <StatusBadge status={comp.status} />
                          <span
                            className={`text-xs ${
                              isSelected
                                ? "text-[var(--accent-brass)]"
                                : "text-[var(--muted)] opacity-60"
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
            <div className="brutal-card p-4 sm:p-6 rounded-sm border-[var(--border-strong)] shadow-xl relative overflow-hidden bg-[var(--panel)]">
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--line)]">
                <span className="font-mono text-[11px] text-[var(--accent-brass)] uppercase tracking-wider font-semibold">
                  [ SUBSYSTEM INSPECTOR ]
                </span>
                {selectedComponent && (
                  <StatusBadge status={selectedComponent.status} />
                )}
              </div>

              {selectedComponent ? (
                <div className="space-y-5">
                  <div>
                    <h4 className="text-xl font-bold text-[var(--ink)] font-sans">
                      {selectedComponent.name}
                    </h4>
                    <p className="text-xs font-mono text-[var(--muted)] mt-1">
                      Identifier: {selectedComponent.id}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-mono text-[10px] text-[var(--accent-brass)] uppercase tracking-wider block">
                      CORE PURPOSE &amp; INVARIANT
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--ink)] font-body leading-relaxed">
                      {selectedComponent.purpose}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-[var(--line)]">
                    <span className="font-mono text-[10px] text-[var(--accent-brass)] uppercase tracking-wider block">
                      HOW IT WORKS IN CODE
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed">
                      {selectedComponent.howItWorks}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-[var(--line)]">
                    <span className="font-mono text-[10px] text-[var(--accent-gold)] uppercase tracking-wider block">
                      ENGINEERING TRADE-OFF
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--muted)] font-body leading-relaxed italic bg-[var(--bg)]/50 p-2.5 rounded-sm border border-[var(--line)]">
                      &ldquo;{selectedComponent.tradeoff}&rdquo;
                    </p>
                  </div>

                  {selectedComponent.keyFiles && selectedComponent.keyFiles.length > 0 && (
                    <div className="space-y-1.5 pt-3 border-t border-[var(--line)]">
                      <span className="font-mono text-[10px] text-[var(--accent-brass)] uppercase tracking-wider block">
                        REPOSITORY SOURCE REFERENCES
                      </span>
                      <div className="space-y-1">
                        {selectedComponent.keyFiles.map((file) => (
                          <div
                            key={file}
                            className="font-mono text-[11px] text-[var(--ink-secondary)] bg-[var(--bg)] px-2 py-1 rounded-sm border border-[var(--line)] truncate"
                          >
                            {file}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center text-xs font-mono text-[var(--muted)]">
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
