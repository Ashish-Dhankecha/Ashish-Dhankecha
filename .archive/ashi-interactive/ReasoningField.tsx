"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ReasoningField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const path1Opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.1]);
  const path2Opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.1]);
  const path3Opacity = useTransform(scrollYProgress, [0, 0.5, 0.6], [0.2, 1, 1]);
  
  const path3Glow = useTransform(scrollYProgress, [0.5, 0.6], ["#2a3b32", "#d4af37"]);

  return (
    <section ref={containerRef} className="py-32 w-full min-h-screen relative flex items-center justify-center">
      <div className="max-w-[90vw] mx-auto px-4 md:px-12 w-full">
        
        <div className="mb-24">
          <h2 className="text-[8vw] md:text-8xl font-light tracking-tighter text-[#f4ecd8] mb-4">
            REASONING FIELD
          </h2>
          <div className="font-mono text-xs text-[#2a3b32] uppercase tracking-[0.2em]">
            CONCEPTUAL VISUALIZATION // DECISION SPACE
          </div>
        </div>

        <div className="relative w-full max-w-2xl mx-auto h-[400px] flex flex-col items-center">
          
          {/* Origin */}
          <div className="w-4 h-4 rounded-full bg-[#f4ecd8] shadow-[0_0_15px_#f4ecd8] mb-12 relative z-10" />

          {/* Paths */}
          <div className="relative flex justify-between w-full h-[200px]">
            
            {/* Path 1 (Fades) */}
            <motion.div style={{ opacity: path1Opacity }} className="flex flex-col items-center w-1/3">
              <svg className="h-[150px] w-full" preserveAspectRatio="none">
                <path d="M 100 0 L 50 150" stroke="#2a3b32" strokeWidth="1" fill="none" />
              </svg>
              <div className="w-2 h-2 rounded-full bg-[#2a3b32] mt-4" />
            </motion.div>

            {/* Path 2 (Fades) */}
            <motion.div style={{ opacity: path2Opacity }} className="flex flex-col items-center w-1/3">
              <svg className="h-[150px] w-full" preserveAspectRatio="none">
                <path d="M 50 0 L 50 150" stroke="#2a3b32" strokeWidth="1" fill="none" />
              </svg>
              <div className="w-2 h-2 rounded-full bg-[#2a3b32] mt-4" />
            </motion.div>

            {/* Path 3 (Emphasized) */}
            <motion.div style={{ opacity: path3Opacity }} className="flex flex-col items-center w-1/3">
              <svg className="h-[150px] w-full overflow-visible" preserveAspectRatio="none">
                <motion.path 
                  d="M 0 0 L 50 150" 
                  stroke={path3Glow} 
                  strokeWidth="2" 
                  fill="none" 
                  style={{ filter: 'drop-shadow(0px 0px 4px #d4af37)' }}
                />
              </svg>
              <motion.div 
                style={{ backgroundColor: path3Glow }}
                className="w-3 h-3 rounded-full mt-4 shadow-[0_0_10px_#d4af37]" 
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-mono text-[9px] text-[#d4af37] uppercase tracking-widest mt-6 absolute -bottom-12"
              >
                Selected Trajectory
              </motion.div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
