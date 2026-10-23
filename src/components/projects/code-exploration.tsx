import React from "react";
import { ProjectCodeExploration } from "@/types/project-case-study";

interface CodeExplorationProps {
  exploration: ProjectCodeExploration;
}

export function CodeExploration({ exploration }: CodeExplorationProps) {
  return (
    <section className="py-16 md:py-24 border-b border-white/10 bg-black/40">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
                19 // REPOSITORY CODE EXPLORATION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-sans tracking-tight">
              Selected Implementation Snippets
            </h2>
            <p className="text-sm sm:text-base text-white/60 font-sans leading-relaxed max-w-2xl mt-3">
              Concise, representative snippets demonstrating architectural invariants, runtime guards, and
              first-principles engineering.
            </p>
          </div>

          {exploration.githubUrl && (
            <a
              href={exploration.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/50 text-white transition-all shrink-0 shadow-sm"
            >
              <span>[VIEW FULL SOURCE ON GITHUB]</span>
              <span className="text-emerald-400">↗</span>
            </a>
          )}
        </div>

        <div className="space-y-8">
          {exploration.localSnippets.map((snippet, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              {/* Snippet Header / macOS bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-6 py-4 bg-white/[0.03] border-b border-white/10 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 mr-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-white font-bold">
                    {snippet.title}
                  </span>
                  <span className="text-white/30">·</span>
                  <span className="text-white/50 truncate max-w-xs sm:max-w-md">
                    {snippet.filename}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 uppercase bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  {snippet.language}
                </span>
              </div>

              {/* Code Content */}
              <div className="p-6 overflow-x-auto bg-[#070707] font-mono text-xs sm:text-sm text-emerald-300/90 leading-relaxed selection:bg-emerald-500/30">
                <pre>
                  <code>{snippet.code}</code>
                </pre>
              </div>

              {/* Explanation Footer */}
              <div className="px-6 py-4 bg-white/[0.02] border-t border-white/10 text-xs text-white/70 font-sans leading-relaxed">
                <strong className="text-white font-semibold">Why this matters: </strong>
                {snippet.explanation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
