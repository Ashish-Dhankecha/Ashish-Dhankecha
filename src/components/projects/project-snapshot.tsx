import React from "react";
import { ProjectSnapshotData } from "@/types/project-case-study";

interface ProjectSnapshotProps {
  snapshot: ProjectSnapshotData;
}

export function ProjectSnapshot({ snapshot }: ProjectSnapshotProps) {
  return (
    <section className="py-8 bg-[var(--panel)]/40 border-b border-[var(--line)]">
      <div className="section-container">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
            02 // TECHNICAL SNAPSHOT &amp; SPECIFICATION
          </span>
        </div>

        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 bg-[var(--panel)] border border-[var(--border-strong)] rounded-sm shadow-sm font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[var(--accent-brass)] text-[10px] uppercase block tracking-wider">
              [ SYSTEM TYPE ]
            </span>
            <p className="text-[var(--ink)] font-semibold text-sm">
              {snapshot.type}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[var(--accent-brass)] text-[10px] uppercase block tracking-wider">
              [ INCEPTION DATE ]
            </span>
            <p className="text-[var(--ink)] font-semibold text-sm">
              {snapshot.started}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[var(--accent-brass)] text-[10px] uppercase block tracking-wider">
              [ PRIMARY LANGUAGE ]
            </span>
            <p className="text-[var(--ink)] font-semibold text-sm">
              {snapshot.primaryLanguage}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[var(--accent-brass)] text-[10px] uppercase block tracking-wider">
              [ SCALE &amp; FOOTPRINT ]
            </span>
            <p className="text-[var(--ink)] font-semibold text-sm">
              {snapshot.scale}
            </p>
          </div>

          <div className="col-span-1 min-[360px]:col-span-2 md:col-span-2 space-y-1 pt-3 border-t border-[var(--line)]">
            <span className="text-[var(--accent-brass)] text-[10px] uppercase block tracking-wider">
              [ DOMAIN &amp; PARADIGM ]
            </span>
            <p className="text-[var(--muted)] text-xs font-sans">
              {snapshot.domain}
            </p>
          </div>

          <div className="col-span-1 min-[360px]:col-span-2 md:col-span-2 space-y-1 pt-3 border-t border-[var(--line)]">
            <span className="text-[var(--accent-brass)] text-[10px] uppercase block tracking-wider">
              [ ARCHITECTURE STYLE ]
            </span>
            <p className="text-[var(--muted)] text-xs font-sans">
              {snapshot.architectureStyle}
            </p>
          </div>

          <div className="col-span-1 min-[360px]:col-span-2 md:col-span-4 space-y-2 pt-3 border-t border-[var(--line)]">
            <span className="text-[var(--accent-brass)] text-[10px] uppercase block tracking-wider">
              [ CORE TECHNOLOGIES &amp; LIBRARIES ]
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {snapshot.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-sm bg-[var(--bg)] border border-[var(--line)] text-[var(--ink)] text-[11px]"
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
