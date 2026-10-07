"use client";

import React, { useState, useEffect } from "react";
import { ProjectCaseStudy } from "@/types/project-case-study";
import { OpeningScene } from "./OpeningScene";
import { HeroScene } from "./HeroScene";
import { CognitiveFlow } from "./CognitiveFlow";
import { MemoryNebula } from "./MemoryNebula";
import { ReasoningField } from "./ReasoningField";
import { ArchitectureExplorer } from "./ArchitectureExplorer";
import { EvidenceMode } from "./EvidenceMode";
import { ProjectEvolution } from "./ProjectEvolution";
import { FinalSection } from "./FinalSection";

interface AshiWorldProps {
  project: ProjectCaseStudy;
}

export function AshiWorld({ project }: AshiWorldProps) {
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // Hide standard layout header/footer if needed, but for now we just render over it
    // Wait for the cinematic intro to complete
    const timer = setTimeout(() => {
      setIntroFinished(true);
    }, 4500); // Intro takes a bit longer to form the universe
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full bg-[#03070b] text-[#f4ecd8] selection:bg-[#d4af37] selection:text-[#03070b] overflow-hidden font-sans">
      
      {/* Universal Space Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#03070b]" />
        {/* Subtle atmospheric glow */}
        <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, #061826 0%, transparent 60%), radial-gradient(circle at 80% 80%, #051410 0%, transparent 50%)' }} />
        {/* Very sparse starfield */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #f4ecd8 1px, transparent 1px)', backgroundSize: '120px 120px', backgroundPosition: '0 0, 60px 60px' }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #f4ecd8 1.5px, transparent 1.5px)', backgroundSize: '250px 250px', backgroundPosition: '30px 40px' }} />
      </div>

      <div className="relative z-10">
        {!introFinished && (
          <OpeningScene onFinish={() => setIntroFinished(true)} />
        )}
        
        <div 
          className="transition-opacity duration-1000 flex flex-col items-center w-full"
          style={{ opacity: introFinished ? 1 : 0, pointerEvents: introFinished ? 'auto' : 'none' }}
        >
          <HeroScene />
          <CognitiveFlow project={project} />
          <MemoryNebula />
          <ReasoningField />
          <ArchitectureExplorer project={project} />
          <EvidenceMode project={project} />
          <ProjectEvolution project={project} />
          <FinalSection project={project} />
        </div>
      </div>
    </div>
  );
}
