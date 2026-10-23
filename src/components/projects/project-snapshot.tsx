import React from "react";
import { ProjectSnapshotData } from "@/types/project-case-study";

interface ProjectSnapshotProps {
  snapshot: ProjectSnapshotData;
}

export function ProjectSnapshot({ snapshot }: ProjectSnapshotProps) {
  return (
    <section className="py-12 border-b border-white/10 bg-black/40">
      <div className="section-container">
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
            02 // TECHNICAL SNAPSHOT &amp; SPECIFICATION
          </span>
        </div>

        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl glass-card border border-white/10 shadow-2xl font-mono text-xs">
          <div className="space-y-1.5">
            <span className="text-emerald-400 text-[10px] uppercase block tracking-wider font-semibold">
              [ SYSTEM TYPE ]
            </span>
            <p className="text-white font-semibold text-sm">
              {snapshot.type}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-emerald-400 text-[10px] uppercase block tracking-wider font-semibold">
              [ INCEPTION DATE ]
            </span>
            <p className="text-white font-semibold text-sm">
              {snapshot.started}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-emerald-400 text-[10px] uppercase block tracking-wider font-semibold">
              [ PRIMARY LANGUAGE ]
            </span>
            <p className="text-white font-semibold text-sm">
              {snapshot.primaryLanguage}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-emerald-400 text-[10px] uppercase block tracking-wider font-semibold">
              [ SCALE &amp; FOOTPRINT ]
            </span>
            <p className="text-white font-semibold text-sm">
              {snapshot.scale}
            </p>
          </div>

          <div className="col-span-1 min-[360px]:col-span-2 md:col-span-2 space-y-1.5 pt-4 border-t border-white/10">
            <span className="text-emerald-400 text-[10px] uppercase block tracking-wider font-semibold">
              [ DOMAIN &amp; PARADIGM ]
            </span>
            <p className="text-white/70 text-xs font-sans leading-relaxed">
              {snapshot.domain}
            </p>
          </div>

          <div className="col-span-1 min-[360px]:col-span-2 md:col-span-2 space-y-1.5 pt-4 border-t border-white/10">
            <span className="text-emerald-400 text-[10px] uppercase block tracking-wider font-semibold">
              [ ARCHITECTURE STYLE ]
            </span>
            <p className="text-white/70 text-xs font-sans leading-relaxed">
              {snapshot.architectureStyle}
            </p>
          </div>

          <div className="col-span-1 min-[360px]:col-span-2 md:col-span-4 space-y-3 pt-4 border-t border-white/10">
            <span className="text-emerald-400 text-[10px] uppercase block tracking-wider font-semibold">
              [ CORE TECHNOLOGIES &amp; LIBRARIES ]
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {snapshot.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/80 text-xs font-mono hover:border-emerald-500/40 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
