"use client";

import React from "react";
import { motion } from "framer-motion";

interface OpeningSceneProps {
  onFinish: () => void;
}

export function OpeningScene({ onFinish }: OpeningSceneProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#03070b] text-[#f4ecd8] overflow-hidden">
      
      {/* 1. Point of light appears */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 1], scale: [0, 1.5, 1] }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute w-2 h-2 rounded-full bg-[#f4ecd8] shadow-[0_0_20px_#f4ecd8]"
      />

      {/* 2. Core forms */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute w-32 h-32 rounded-full border border-[#2a3b32]/50 flex items-center justify-center"
      >
        <div className="w-16 h-16 rounded-full border border-[#2a3b32] flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-[#0a1410] border border-[#d4af37] shadow-[0_0_15px_#d4af37]" />
        </div>
      </motion.div>

      {/* 3. Orbital structure / Subsystems appear */}
      <motion.div
        initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 2, delay: 1.8, ease: "easeOut" }}
        className="absolute w-[600px] h-[600px] rounded-full border border-[#2a3b32]/30 flex items-center justify-center"
      >
        <div className="absolute top-0 w-3 h-3 rounded-full bg-[#c48b29] shadow-[0_0_10px_#c48b29]" />
        <div className="absolute bottom-0 w-2 h-2 rounded-full bg-[#d4af37]" />
        <div className="absolute left-0 w-2 h-2 rounded-full bg-[#f4ecd8]" />
      </motion.div>

      {/* 4. Enormous text emerges */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mix-blend-screen">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
          className="text-[15vw] font-black tracking-tighter leading-none text-[#f4ecd8]/90"
        >
          ASHI
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.5 }}
          className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-[#d4af37] mt-8 text-center"
        >
          Personal Cognitive<br className="md:hidden" /> Operating System
        </motion.div>
      </div>

      <button 
        onClick={onFinish}
        className="absolute bottom-8 right-8 text-xs font-mono tracking-widest text-[#f4ecd8]/30 hover:text-[#f4ecd8] transition-colors"
      >
        [ SKIP ]
      </button>
    </div>
  );
}
