import React from "react";
import { ProjectCodeExploration } from "@/types/project-case-study";

interface CodeExplorationProps {
  exploration: ProjectCodeExploration;
}

export function CodeExploration({ exploration }: CodeExplorationProps) {
  return (
    <section className="py-16 md:py-20 border-b border-[var(--line)] bg-[var(--panel)]/10">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs text-[var(--accent-brass)] uppercase tracking-widest font-semibold">
                19 // REPOSITORY CODE EXPLORATION
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ink)] font-sans tracking-tight">
              Selected Implementation Snippets
            </h2>
            <p className="text-sm sm:text-base text-[var(--muted)] font-body leading-relaxed max-w-2xl mt-2">
              Concise, representative snippets demonstrating architectural invariants, runtime guards, and
              first-principles engineering.
            </p>
          </div>

          {exploration.githubUrl && (
            <a
              href={exploration.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2 bg-[var(--panel)] hover:bg-[var(--line)] border border-[var(--accent-brass)] text-[var(--ink)] transition-colors rounded-sm shrink-0 shadow-sm"
            >
              <span>[VIEW FULL SOURCE ON GITHUB]</span>
              <span className="text-[var(--accent-brass)]">↗</span>
            </a>
          )}
        </div>

        <div className="space-y-6">
          {exploration.localSnippets.map((snippet, idx) => (
            <div
              key={idx}
              className="brutal-card rounded-sm overflow-hidden border-[var(--border-strong)]"
            >
              {/* Snippet Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-5 py-3 bg-[var(--bg)] border-b border-[var(--line)] font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-[var(--accent-gold)] font-bold">
                    {snippet.title}
                  </span>
                  <span className="text-[var(--muted)]">·</span>
                  <span className="text-[var(--muted)] truncate max-w-xs sm:max-w-md">
                    {snippet.filename}
                  </span>
                </div>
                <span className="text-[10px] text-[var(--accent-brass)] uppercase bg-[var(--panel)] px-2 py-0.5 rounded-sm border border-[var(--line)]">
                  {snippet.language}
                </span>
              </div>

              {/* Code Content */}
              <div className="p-5 overflow-x-auto bg-[#0a120f] font-mono text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
                <pre>
                  <code>{snippet.code}</code>
                </pre>
              </div>

              {/* Explanation Footer */}
              <div className="px-5 py-3 bg-[var(--panel)] border-t border-[var(--line)] text-xs text-[var(--muted)] font-body">
                <strong className="text-[var(--ink)] font-sans">Why this matters: </strong>
                {snippet.explanation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
