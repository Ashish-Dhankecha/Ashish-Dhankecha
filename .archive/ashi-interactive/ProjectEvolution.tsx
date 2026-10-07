"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectCaseStudy } from "@/types/project-case-study";

interface ProjectEvolutionProps {
  project: ProjectCaseStudy;
}

export function ProjectEvolution({ project }: ProjectEvolutionProps) {
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0.8, 1], [0, 150]);

  return (
    <section className="py-48 w-full bg-[#03070b] text-[#f4ecd8] relative overflow-hidden">
      
      <motion.div style={{ y: yOffset }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #c48b29 1px, transparent 1px)', backgroundSize: '150px 150px', backgroundPosition: '20px 20px' }} />
      </motion.div>

      <div className="max-w-[90vw] mx-auto px-4 md:px-12 relative z-10">
        
        <div className="mb-48 text-center">
          <h2 className="text-[6vw] md:text-7xl font-light tracking-tighter mb-6">
            JOURNEY THROUGH SPACE
          </h2>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#c48b29]">
            LEO → VANI → ASHI
          </div>
        </div>

        <div className="relative">
          {/* Main Trajectory Line */}
          <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#2a3b32]/0 via-[#2a3b32] to-[#2a3b32]/0 transform md:-translate-x-1/2 z-0" />
          
          <div className="flex flex-col gap-32 md:gap-48">
            {project.timeline.map((event, idx) => {
              const isEven = idx % 2 === 0;
              
              return (
                <div key={idx} className={`relative flex items-center md:justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Destination Node */}
                  <div className="absolute left-[19px] md:left-1/2 w-3 h-3 rounded-full bg-[#03070b] border border-[#d4af37] transform md:-translate-x-1/2 z-10 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-5/12" />

                  {/* Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}
                  >
                    <div className="font-mono text-[10px] text-[#c48b29] tracking-[0.2em] mb-4 uppercase">{event.date} // {event.phase}</div>
                    <h3 className="text-3xl md:text-4xl font-light mb-8">{event.title}</h3>
                    
                    <div className="flex flex-col gap-6 font-light">
                      <div>
                        <div className="font-mono text-[9px] text-[#2a3b32] mb-2 uppercase tracking-widest">WHAT WAS BUILT</div>
                        <p className="text-[#f4ecd8]/60 text-sm">{event.whatChanged}</p>
                      </div>
                      <div>
                        <div className="font-mono text-[9px] text-[#2a3b32] mb-2 uppercase tracking-widest">WHAT WAS LEARNED</div>
                        <p className="text-[#f4ecd8]/60 text-sm italic">{event.why}</p>
                      </div>
                      <div className="border-t border-[#2a3b32]/30 pt-4 mt-2">
                        <div className="font-mono text-[9px] text-[#d4af37] mb-2 uppercase tracking-widest">SURVIVED / RESULT</div>
                        <p className="text-[#f4ecd8]/90 text-sm">{event.result}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
