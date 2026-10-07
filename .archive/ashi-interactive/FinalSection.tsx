"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectCaseStudy } from "@/types/project-case-study";

interface FinalSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any;
}

export function FinalSection({ project }: FinalSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <section ref={containerRef} className="py-48 w-full min-h-[150vh] bg-[#03070b] text-[#f4ecd8] flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Zoom out: Entire cognitive universe visible */}
      <motion.div 
        style={{ scale, opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] rounded-full border border-[#2a3b32]/10 flex items-center justify-center">
          <div className="absolute w-[60%] h-[60%] rounded-full border border-[#2a3b32]/15" />
          <div className="absolute w-[30%] h-[30%] rounded-full border border-[#2a3b32]/20" />
          
          <div className="w-16 h-16 rounded-full border border-[#d4af37]/30 flex items-center justify-center bg-[#0a1410]/80">
            <div className="w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_15px_#d4af37]" />
          </div>

          {/* Subsystems floating around */}
          {['MEMORY', 'PERCEPTION', 'REASONING', 'PLANNING', 'EXECUTION', 'REFLECTION'].map((sys, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 300;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div 
                key={sys}
                className="absolute font-mono text-[8px] text-[#2a3b32] tracking-[0.3em]"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                {sys}
              </div>
            );
          })}
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center z-10"
      >
        <h2 className="text-[18vw] font-black tracking-tighter leading-none mb-8 text-transparent mix-blend-screen" style={{ WebkitTextStroke: '1px rgba(244, 236, 216, 0.8)' }}>
          ASHI
        </h2>
        
        <div className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-[#d4af37] mb-6">
          PERSONAL COGNITIVE OPERATING SYSTEM
        </div>
        
        <div className="font-mono text-[10px] text-[#2a3b32] tracking-widest uppercase mb-24">
          16 JUL 2026 → PRESENT // STILL BUILDING.
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link href={project.links[0]?.url || "https://github.com/Ashish-Dhankecha"} target="_blank" className="px-8 py-4 border border-[#d4af37] bg-[#d4af37]/5 font-mono text-[10px] uppercase tracking-widest text-[#d4af37] hover:bg-[#d4af37] hover:text-[#03070b] transition-colors">
            [ EXPLORE SOURCE ]
          </Link>
          <Link href={project.links[2]?.url || "/lab/ashi/019-monorepo-architecture-overview"} className="px-8 py-4 border border-[#2a3b32] font-mono text-[10px] uppercase tracking-widest text-[#f4ecd8]/60 hover:border-[#f4ecd8] hover:text-[#f4ecd8] transition-colors">
            [ ARCHITECTURE ]
          </Link>
          <Link href={project.links[1]?.url || "/lab/ashi"} className="px-8 py-4 border border-[#2a3b32] font-mono text-[10px] uppercase tracking-widest text-[#f4ecd8]/60 hover:border-[#f4ecd8] hover:text-[#f4ecd8] transition-colors">
            [ LAB NOTES ]
          </Link>
        </div>
      </motion.div>
      
    </section>
  );
}
