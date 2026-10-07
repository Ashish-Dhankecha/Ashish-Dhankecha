"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCaseStudy } from "@/types/project-case-study";
import { SubsystemInspector } from "./SubsystemInspector";

interface ArchitectureExplorerProps {
  project: ProjectCaseStudy;
}

export function ArchitectureExplorer({ project }: ArchitectureExplorerProps) {
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedSystem, setSelectedSystem] = useState<any | null>(null);

  const layers = project.architecture.layers;

  return (
    <section className="py-32 w-full bg-[#03070b] relative overflow-hidden min-h-screen">
      
      {/* Grid background for engineering mode */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#f4ecd8 1px, transparent 1px), linear-gradient(90deg, #f4ecd8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-[90vw] mx-auto px-4 md:px-12 relative z-10">
        
        <div className="mb-24">
          <h2 className="text-[6vw] md:text-6xl font-light tracking-tighter mb-4 text-[#f4ecd8]">
            SYSTEM ARCHITECTURE
          </h2>
          <div className="font-mono text-xs text-[#2a3b32] uppercase tracking-[0.2em] mb-8">
            ORBITAL MAP // ENGINEERING MODE
          </div>
          <p className="text-[#c48b29] font-light text-sm max-w-xl">
            {project.architecture.overview}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          {layers.map((layer) => {
            const isSelected = selectedLayerId === layer.layerId;
            const isFaded = selectedLayerId !== null && !isSelected;

            return (
              <div 
                key={layer.layerId}
                className={`transition-all duration-500 border-b border-[#2a3b32]/30 ${isFaded ? 'opacity-20' : 'opacity-100'} ${isSelected ? 'bg-[#05100a]/50' : 'hover:bg-[#05100a]/20'}`}
              >
                <button 
                  onClick={() => setSelectedLayerId(isSelected ? null : layer.layerId)}
                  className="w-full text-left py-8 px-4 md:px-8 flex justify-between items-center group"
                >
                  <div className="flex items-center">
                    <span className="font-mono text-[#2a3b32] mr-8 text-sm group-hover:text-[#d4af37] transition-colors">{layer.layerId}</span>
                    <span className="text-2xl md:text-4xl font-light tracking-tight">{layer.name.replace(`${layer.layerId} — `, '')}</span>
                  </div>
                  <div className="font-mono text-[10px] text-[#2a3b32] uppercase tracking-widest hidden md:block">
                    {isSelected ? '[ COLLAPSE ]' : '[ EXPLORE ]'}
                  </div>
                </button>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 md:p-8 pt-0">
                        <p className="text-[#f4ecd8]/50 text-sm mb-12 max-w-3xl font-light">
                          {layer.description}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {layer.components.map((comp) => (
                            <button
                              key={comp.id}
                              onClick={() => setSelectedSystem({...comp, layerId: layer.layerId})}
                              className="text-left p-6 border border-[#2a3b32]/50 hover:border-[#d4af37] transition-colors group relative overflow-hidden bg-[#03070b]"
                            >
                              <div className="absolute top-6 right-6">
                                <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor] ${
                                  comp.status === 'VERIFIED' ? 'bg-green-500 text-green-500' :
                                  comp.status === 'IMPLEMENTED' ? 'bg-[#d4af37] text-[#d4af37]' :
                                  comp.status === 'EXPERIMENTAL' ? 'bg-purple-500 text-purple-500' :
                                  'bg-gray-500 text-gray-500'
                                }`} />
                              </div>
                              <h4 className="font-mono font-bold text-xs mb-3 text-[#f4ecd8] group-hover:text-[#d4af37] transition-colors">{comp.name}</h4>
                              <p className="text-xs text-[#f4ecd8]/40 line-clamp-2 font-light">{comp.purpose}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedSystem && (
          <SubsystemInspector 
            system={selectedSystem} 
            onClose={() => setSelectedSystem(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
