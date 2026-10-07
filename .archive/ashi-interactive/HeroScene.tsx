"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroScene() {
  const { scrollY } = useScroll();
  
  // As user scrolls down, the universe elements shift
  const coreY = useTransform(scrollY, [0, 800], [0, 150]);
  const coreScale = useTransform(scrollY, [0, 800], [1, 1.2]);
  const titleY = useTransform(scrollY, [0, 800], [0, -100]);
  const titleOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const orbitRotate = useTransform(scrollY, [0, 1000], [0, 45]);

  return (
    <section className="relative w-full h-[130vh] flex flex-col justify-center items-center overflow-hidden pt-24">
      
      {/* Central Core & Orbital Structure */}
      <motion.div 
        style={{ y: coreY, scale: coreScale }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div 
          style={{ rotate: orbitRotate }}
          className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center"
        >
          {/* Main Orbit Ring */}
          <div className="absolute w-full h-full rounded-full border border-[#2a3b32]/40" />
          <div className="absolute w-[80%] h-[80%] rounded-full border border-[#2a3b32]/20" />
          <div className="absolute w-[60%] h-[60%] rounded-full border border-[#2a3b32]/10" />
          
          {/* Constellation Nodes */}
          <div className="absolute top-[-5%] left-[20%] font-mono text-[10px] text-[#f4ecd8]/60 flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#f4ecd8] shadow-[0_0_5px_#f4ecd8]" /> IDENTITY
          </div>
          <div className="absolute top-[20%] right-[-5%] font-mono text-[10px] text-[#c48b29] flex items-center gap-2 flex-row-reverse">
            <div className="w-2 h-2 rounded-full bg-[#c48b29] shadow-[0_0_8px_#c48b29]" /> KNOWLEDGE
          </div>
          <div className="absolute bottom-[10%] left-[-10%] font-mono text-[10px] text-[#2a3b32] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2a3b32]" /> PERCEPTION
          </div>
          <div className="absolute bottom-[-15%] right-[30%] font-mono text-[10px] text-[#d4af37] flex items-center gap-2 flex-row-reverse">
            <div className="w-1 h-1 rounded-full bg-[#d4af37] shadow-[0_0_5px_#d4af37]" /> REASONING
          </div>

          {/* Core */}
          <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border border-[#2a3b32] flex items-center justify-center bg-[#03070b]/80 backdrop-blur-sm">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-[#d4af37]/30"
            />
            <div className="w-4 h-4 rounded-full bg-[#03070b] border-2 border-[#d4af37] shadow-[0_0_20px_#d4af37]" />
            <div className="absolute -bottom-8 font-mono text-[9px] tracking-widest text-[#d4af37] uppercase">Ashi Core</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Typography layer */}
      <motion.div 
        style={{ y: titleY, opacity: titleOpacity }}
        className="z-10 text-center w-full max-w-[90vw] mx-auto pointer-events-none mix-blend-screen"
      >
        <h1 className="text-[18vw] font-black tracking-tighter leading-none m-0 p-0 text-[#f4ecd8]">
          ASHI
        </h1>
        <div className="mt-8 font-mono text-sm md:text-base tracking-[0.4em] uppercase text-[#d4af37]">
          Personal Cognitive Operating System
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 flex flex-col items-center gap-4 text-[#2a3b32]"
      >
        <div className="font-mono text-[9px] uppercase tracking-widest">Enter System</div>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#2a3b32] to-transparent" />
      </motion.div>
    </section>
  );
}
