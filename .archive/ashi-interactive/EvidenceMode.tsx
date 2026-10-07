"use client";

import React from "react";
import { ProjectCaseStudy } from "@/types/project-case-study";

interface EvidenceModeProps {
  project: ProjectCaseStudy;
}

export function EvidenceMode({ project }: EvidenceModeProps) {
  return (
    <section className="py-48 w-full bg-[#03070b] text-[#f4ecd8] relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_#051410_0%,_transparent_70%)] opacity-30 pointer-events-none" />

      <div className="max-w-[90vw] mx-auto px-4 md:px-12 relative z-10">
        
        <div className="mb-32">
          <h2 className="text-[6vw] md:text-7xl font-light tracking-tighter mb-6">
            EVIDENCE OBSERVATORY
          </h2>
          <div className="font-mono text-[10px] text-[#2a3b32] uppercase tracking-[0.2em] mb-8">
            EMPIRICAL PROOF // FORENSIC ANALYSIS
          </div>
          <p className="text-[#f4ecd8]/60 font-light text-base max-w-2xl">
            {project.verification.testSuiteSummary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-48">
          {project.verification.metrics.map((metric, idx) => (
            <div key={idx} className="border-l border-[#2a3b32]/50 pl-8 py-4 flex flex-col justify-between hover:border-[#d4af37]/50 transition-colors group relative">
              <div className="absolute left-[-2px] top-4 w-[3px] h-0 bg-[#d4af37] group-hover:h-8 transition-all duration-300" />
              <div className="font-mono text-[10px] text-[#2a3b32] mb-12 tracking-widest uppercase">{metric.label}</div>
              <div>
                <div className={`text-4xl md:text-5xl font-light tracking-tighter mb-4 ${
                  metric.status === 'pass' ? 'text-[#d4af37]' : 
                  metric.status === 'fail' ? 'text-red-500/80' : 'text-purple-400/80'
                }`}>
                  {metric.value}
                </div>
                <div className="text-xs text-[#f4ecd8]/40 font-light leading-relaxed">{metric.context}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-[#2a3b32]/30 pt-32">
          <h3 className="text-4xl md:text-5xl font-light tracking-tighter mb-4">FAILURE CONSTELLATION</h3>
          <div className="font-mono text-[10px] text-[#2a3b32] uppercase tracking-[0.2em] mb-24">
            REAL SYSTEMS FAIL // DIAGNOSTIC LOG
          </div>
          
          <div className="flex flex-col gap-16 md:gap-24">
            {project.failuresAndLessons.map((failure, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-8 border-l border-[#3a1a1a]/50 pl-6 md:pl-12 py-4 relative group">
                <div className="absolute left-[-2px] top-4 w-[3px] h-0 bg-red-900/50 group-hover:h-full transition-all duration-700" />
                
                <div className="md:col-span-5">
                  <div className="font-mono text-[10px] text-red-500/70 tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/50 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    {failure.badge}
                  </div>
                  <h4 className="text-2xl md:text-3xl font-light leading-tight">{failure.title}</h4>
                </div>
                <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12 font-light text-sm">
                  <div>
                    <div className="font-mono text-[10px] text-[#2a3b32] mb-3 uppercase tracking-widest">ROOT CAUSE</div>
                    <p className="text-[#f4ecd8]/60 leading-relaxed">{failure.rootCause}</p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-[#2a3b32] mb-3 uppercase tracking-widest">FINAL FIX</div>
                    <p className="text-[#f4ecd8]/60 leading-relaxed">{failure.finalFix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
