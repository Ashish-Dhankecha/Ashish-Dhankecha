"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function MemoryNebula() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-48 w-full min-h-[120vh] relative flex items-center justify-center overflow-hidden">
      
      {/* Nebula Background */}
      <motion.div 
        style={{ scale, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#082236]/30 via-[#03070b]/80 to-[#03070b]" />
        
        {/* Dust particles */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at center, #2a3b32 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </motion.div>

      <div className="relative z-10 w-full max-w-[90vw] mx-auto px-4 md:px-12 flex flex-col items-center">
        <h2 className="text-[10vw] md:text-9xl font-light tracking-tighter text-[#f4ecd8] opacity-10 mb-24">
          MEMORY
        </h2>

        <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center">
          
          {/* Episodic */}
          <motion.div 
            animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute top-[10%] left-[15%] text-center"
          >
            <div className="w-32 h-32 rounded-full border border-[#2a3b32]/50 flex items-center justify-center relative">
              <div className="absolute w-2 h-2 rounded-full bg-[#f4ecd8]/40" />
            </div>
            <div className="font-mono text-[10px] text-[#f4ecd8]/60 mt-4 tracking-widest uppercase">Episodic</div>
          </motion.div>

          {/* Semantic */}
          <motion.div 
            animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[10%] right-[15%] text-center"
          >
            <div className="w-48 h-48 rounded-full border border-[#2a3b32]/30 flex items-center justify-center relative">
               <div className="absolute w-1 h-1 rounded-full bg-[#c48b29]/60 shadow-[0_0_10px_#c48b29]" />
            </div>
            <div className="font-mono text-[10px] text-[#c48b29] mt-4 tracking-widest uppercase">Semantic</div>
          </motion.div>

          {/* Working / Retrieval */}
          <div className="absolute text-center z-20">
            <div className="w-16 h-16 rounded-full bg-[#051410] border border-[#d4af37] shadow-[0_0_30px_#051410] flex items-center justify-center relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute inset-0 rounded-full border-t border-[#d4af37]"
              />
              <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
            </div>
            <div className="font-mono text-[10px] text-[#d4af37] mt-4 tracking-widest uppercase">Working Context</div>
          </div>

          {/* Data particles converging */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <motion.path 
              d="M 200 150 Q 400 200 450 200" 
              fill="none" 
              stroke="#f4ecd8" 
              strokeWidth="0.5" 
              strokeDasharray="4 4" 
            />
            <motion.path 
              d="M 600 250 Q 500 200 450 200" 
              fill="none" 
              stroke="#c48b29" 
              strokeWidth="0.5" 
              strokeDasharray="4 4" 
            />
          </svg>

        </div>
        
        <p className="mt-24 text-center text-[#f4ecd8]/50 max-w-lg font-light text-sm">
          Ashi separates vector semantic search from relational episodic histories, running explicit contradiction checks before merging them into a working context.
        </p>
      </div>
    </section>
  );
}
