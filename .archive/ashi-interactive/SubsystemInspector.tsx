"use client";

import React from "react";
import { motion } from "framer-motion";

interface SubsystemInspectorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  system: any;
  onClose: () => void;
}

export function SubsystemInspector({ system, onClose }: SubsystemInspectorProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 md:p-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#03070b]/90 backdrop-blur-md pointer-events-auto"
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full max-w-5xl bg-[#05100a] border border-[#d4af37]/30 shadow-[0_0_50px_rgba(212,175,55,0.05)] overflow-hidden pointer-events-auto max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-[#05100a]/90 backdrop-blur-md border-b border-[#2a3b32]/50 p-6 flex justify-between items-center z-10">
          <div className="font-mono text-xs tracking-[0.2em] text-[#d4af37] uppercase flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            OBSERVATORY CONSOLE // {system.name}
          </div>
          <button onClick={onClose} className="font-mono text-[10px] uppercase tracking-widest text-[#f4ecd8]/40 hover:text-[#f4ecd8] transition-colors">
            [ CLOSE ]
          </button>
        </div>

        <div className="p-8 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            
            <div className="md:col-span-8">
              <h3 className="text-[10px] font-mono text-[#2a3b32] uppercase tracking-widest mb-4">Purpose</h3>
              <p className="text-xl md:text-3xl text-[#f4ecd8] font-light mb-16 leading-tight">
                {system.purpose}
              </p>

              <h3 className="text-[10px] font-mono text-[#2a3b32] uppercase tracking-widest mb-4">How it Works</h3>
              <p className="text-[#f4ecd8]/60 font-light mb-16 leading-relaxed">
                {system.howItWorks}
              </p>

              <div className="border border-[#c48b29]/30 p-6 bg-[#c48b29]/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#c48b29] to-transparent" />
                <span className="font-mono text-[10px] text-[#c48b29] uppercase tracking-widest block mb-4">Tradeoff / Limitation</span>
                <p className="text-sm font-light text-[#f4ecd8]/80">{system.tradeoff}</p>
              </div>
            </div>

            <div className="md:col-span-4 font-mono text-xs text-[#f4ecd8]/60 flex flex-col gap-12">
              
              <div>
                <div className="text-[10px] text-[#2a3b32] uppercase tracking-widest mb-3">STATE</div>
                <div className={`flex items-center gap-3 ${
                  system.status === 'VERIFIED' ? 'text-green-500' :
                  system.status === 'IMPLEMENTED' ? 'text-[#d4af37]' :
                  system.status === 'EXPERIMENTAL' ? 'text-purple-400' :
                  'text-gray-500'
                }`}>
                  <div className="w-1 h-1 rounded-full bg-current shadow-[0_0_5px_currentColor]" /> {system.status}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-[#2a3b32] uppercase tracking-widest mb-3">ORBITAL LAYER</div>
                <div className="text-[#f4ecd8]">{system.layerId}</div>
              </div>

              {system.keyFiles && system.keyFiles.length > 0 && (
                <div>
                  <div className="text-[10px] text-[#2a3b32] uppercase tracking-widest mb-3">SOURCE TRUTH</div>
                  <ul className="flex flex-col gap-2">
                    {system.keyFiles.map((f: string) => (
                      <li key={f} className="truncate text-[#f4ecd8]/80 hover:text-[#d4af37] cursor-pointer transition-colors" title={f}>
                        {f.split('/').pop()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-auto pt-12 border-t border-[#2a3b32]/30">
                <button className="w-full py-4 border border-[#2a3b32] text-[#f4ecd8] hover:border-[#d4af37] hover:text-[#d4af37] transition-colors uppercase tracking-widest text-[10px]">
                  [ EXPLORE SOURCE ]
                </button>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
