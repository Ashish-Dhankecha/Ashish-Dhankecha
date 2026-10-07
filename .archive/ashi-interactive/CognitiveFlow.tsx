"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ProjectCaseStudy } from "@/types/project-case-study";

interface FlowStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  step: any;
  index: number;
  progress: MotionValue<number>;
  totalSteps: number;
}

function FlowStep({ step, index, progress, totalSteps }: FlowStepProps) {
  const start = index / totalSteps;
  const end = (index + 1) / totalSteps;
  
  const isActive = useTransform(progress, [start, end], [0, 1]);
  const yOffset = useTransform(progress, [start, end], [30, 0]);
  const opacity = useTransform(progress, [start - 0.05, start, start + 0.1, end], [0, 0, 1, 1]);
  const signalY = useTransform(progress, [start, end], ["0%", "100%"]);

  return (
    <div className="relative pl-12 md:pl-48 pb-32 group">
      {/* The Signal Path */}
      <div className="absolute left-[23px] md:left-[63px] top-8 bottom-0 w-[1px] bg-[#2a3b32]/30 z-0 overflow-hidden">
        <motion.div 
          style={{ height: signalY }}
          className="w-full bg-[#f4ecd8] shadow-[0_0_10px_#f4ecd8]" 
        />
      </div>

      {/* Celestial Node */}
      <div className="absolute left-[18px] md:left-[58px] top-4 w-3 h-3 rounded-full bg-[#03070b] border border-[#2a3b32] z-10 flex items-center justify-center">
        <motion.div 
          style={{ scale: isActive, opacity: isActive }}
          className="w-1.5 h-1.5 rounded-full bg-[#f4ecd8] shadow-[0_0_8px_#f4ecd8]"
        />
      </div>

      <motion.div style={{ opacity, y: yOffset }} className="max-w-3xl">
        <div className="font-mono text-[10px] text-[#c48b29] mb-3 tracking-[0.2em] uppercase">{step.step} // SIGNAL NODE</div>
        <h3 className="text-4xl md:text-6xl font-light tracking-tight mb-6 text-[#f4ecd8]">{step.title}</h3>
        <p className="text-base md:text-lg text-[#f4ecd8]/60 leading-relaxed font-light">{step.description}</p>
        
        {/* Subtle environment response */}
        <motion.div 
          style={{ opacity: isActive }}
          className="mt-8 relative h-16 w-full max-w-sm border-t border-[#2a3b32]/30 flex items-end pb-2 gap-1"
        >
          {Array.from({ length: 20 }).map((_, i) => {
            // Deterministic pseudo-random values to prevent hydration errors
            const pseudoRandomHeight = 20 + ((i * 13.7 + index * 17.3) % 80);
            const pseudoRandomDuration = 2 + ((i * 3.1) % 2);
            
            return (
              <motion.div 
                key={i}
                initial={{ height: "10%" }}
                animate={{ height: `${pseudoRandomHeight}%` }}
                transition={{ repeat: Infinity, duration: pseudoRandomDuration, repeatType: "mirror" }}
                className="flex-1 bg-[#2a3b32]/40"
              />
            );
          })}
          <div className="absolute top-2 right-0 font-mono text-[8px] text-[#2a3b32]">SYSTEM RESPONSE</div>
        </motion.div>
      </motion.div>
    </div>
  );
}

interface CognitiveFlowProps {
  project: ProjectCaseStudy;
}

export function CognitiveFlow({ project }: CognitiveFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const steps = project.concept.flowSteps;

  return (
    <section ref={containerRef} className="py-48 w-full relative">
      <div className="max-w-[90vw] mx-auto px-4 md:px-12">
        
        <div className="mb-48 sticky top-32 z-10">
          <h2 className="text-[6vw] md:text-7xl font-light tracking-tighter leading-none mb-6 text-[#f4ecd8]">
            COGNITIVE PATHWAY
          </h2>
          <p className="text-lg md:text-xl text-[#c48b29] max-w-2xl font-light">
            {project.concept.coreIdea}
          </p>
        </div>

        <div className="relative mt-32">
          {/* Signal Origin */}
          <div className="relative pl-12 md:pl-48 pb-16">
            <div className="absolute left-[23px] md:left-[63px] top-0 bottom-0 w-[1px] bg-[#2a3b32]/30 z-0" />
            <div className="absolute left-[18px] md:left-[58px] top-0 w-3 h-3 rounded-full border border-[#f4ecd8] bg-[#f4ecd8] shadow-[0_0_15px_#f4ecd8]" />
            <div className="font-mono text-xs uppercase tracking-widest text-[#f4ecd8]">External Signal Input</div>
          </div>

          {steps.map((step, index) => (
            <FlowStep 
              key={index}
              step={step} 
              index={index} 
              progress={scrollYProgress} 
              totalSteps={steps.length} 
            />
          ))}

          {/* Reflection Loop Return */}
          <div className="relative pl-12 md:pl-48 pt-16">
            <div className="absolute left-[19px] md:left-[59px] top-0 w-2 h-2 rounded-full border border-[#c48b29] shadow-[0_0_10px_#c48b29]" />
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c48b29]">
              Observation Complete // Return to Core
            </div>
            
            <motion.div 
              style={{ opacity: useTransform(scrollYProgress, [0.9, 1], [0, 1]) }}
              className="mt-12 p-8 border border-[#2a3b32]/30 bg-[#051410]/50 backdrop-blur-sm max-w-xl"
            >
              <div className="font-mono text-xs text-[#d4af37] mb-4">LONGITUDINAL LOOP</div>
              <div className="text-[#f4ecd8]/60 text-sm font-light">
                Every executed action and resulting environmental change is committed to the append-only event ledger. This allows Ashi to asynchronously reflect on its own behavior across time.
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
