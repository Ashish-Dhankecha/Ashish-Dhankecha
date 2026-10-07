"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function MobileDeviceScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -10]);

  return (
    <section ref={containerRef} className="py-48 w-full bg-[#d4af37] text-[#0a0f0d] relative overflow-hidden flex flex-col items-center justify-center min-h-[120vh]">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #0a0f0d 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="text-center mb-16 relative z-10 px-4">
        <h2 className="text-[10vw] md:text-8xl font-black tracking-tighter leading-none mb-4">
          MULTIMODAL
        </h2>
        <div className="font-mono text-sm tracking-widest uppercase">
          Voice // Desktop AT-SPI // Text
        </div>
      </div>

      <motion.div 
        style={{ y, scale, rotateX, perspective: 1000 }}
        className="relative z-10 w-[320px] h-[650px] rounded-[3rem] border-8 border-[#0a0f0d] bg-[#05100a] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0a0f0d] rounded-full z-20" />
        
        {/* Screen Content */}
        <div className="flex-1 p-6 pt-16 flex flex-col justify-between text-[#f4ecd8]">
          
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-[#2a3b32] p-4 rounded-2xl rounded-tl-sm w-4/5 text-sm"
            >
              Did we finish fixing the database deadlock issue from yesterday?
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.8 }}
              className="bg-[#d4af37] text-[#0a0f0d] p-4 rounded-2xl rounded-tr-sm w-5/6 self-end ml-auto text-sm"
            >
              <span className="font-bold">Yes.</span> ADR 0137 was applied in commit 8f21ca yesterday at 18:30. All destructive tests now enforce ASHI_ALLOW_DESTRUCTIVE_TESTS=1.
            </motion.div>
          </div>

          <div className="mt-8 border-t border-[#2a3b32] pt-4">
            <div className="flex justify-between items-center text-xs font-mono text-[#2a3b32] mb-4">
              <span>ACTIVE PIPELINE</span>
              <span className="text-[#d4af37]">08. LEDGER</span>
            </div>
            
            <div className="h-1 bg-[#2a3b32] w-full rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-[#d4af37]"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
