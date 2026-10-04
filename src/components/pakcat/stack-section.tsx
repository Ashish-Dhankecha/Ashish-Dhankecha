"use client";

import React from "react";
import { ScrambleText } from "./scramble-text";

interface StackCategory {
  category: string;
  label: string;
  tags: string[];
}

export function StackSection() {
  const stackData: StackCategory[] = [
    {
      category: "AI / ML",
      label: "Intelligence Runtimes",
      tags: ["PyTorch", "Transformers", "llama.cpp", "Local SLMs (Qwen, Llama)", "GGUF Quantization", "RAG Pipelines", "Embeddings"],
    },
    {
      category: "Languages",
      label: "Core Syntax",
      tags: ["Python (Primary / Strict Typing)", "TypeScript", "C / C++", "SQL", "Bash"],
    },
    {
      category: "Systems",
      label: "Architecture & Runtimes",
      tags: ["OS Architecture", "AsyncIO", "Event Bus Runtimes", "AST Static Analysis", "Process Sandboxing", "Acyclic Monorepos"],
    },
    {
      category: "Databases",
      label: "Persistence",
      tags: ["PostgreSQL", "SQLite (WAL Mode)", "Vector Stores", "Relational Schemas"],
    },
    {
      category: "Infrastructure",
      label: "Environment & Deploy",
      tags: ["Linux (Ubuntu / Debian)", "Docker", "Local-First Architecture", "Git Version Control"],
    },
    {
      category: "Frontend / Backend",
      label: "Application Layer",
      tags: ["FastAPI", "Next.js", "React", "Tailwind CSS", "REST APIs"],
    },
    {
      category: "Developer Tools",
      label: "Workflow & Testing",
      tags: ["uv Monorepo Tooling", "pytest", "Git", "VS Code", "Linux Terminal CLI"],
    },
  ];

  return (
    <section id="stack" aria-labelledby="techstack-heading" className="relative z-10">
      <div className="section-container section-padding">
        {/* Section Header */}
        <div className="mb-10 reveal reveal-up visible">
          <span className="section-number">
            <ScrambleText text="06 // tech stack" />
          </span>
          <h2
            id="techstack-heading"
            className="text-3xl md:text-4xl font-bold text-[var(--ink)] mt-3 font-sans"
          >
            Tech Stack
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base mt-2 max-w-2xl font-body">
            Genuinely known and actively used tools across AI systems, software, and lab experiments.
            No arbitrary percentages or meaningless skill meters.
          </p>
        </div>

        {/* Categorized Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {stackData.map((item, idx) => (
            <div
              key={item.category}
              className={`stagger-${
                (idx % 4) + 1
              } brutal-card p-5 reveal reveal-up visible rounded-sm flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-mono text-sm font-bold text-[var(--accent-brass)]">
                    &gt; {item.category}
                  </h3>
                  <span className="text-[10px] font-mono text-[var(--muted)]">
                    [{String(idx + 1).padStart(2, "0")}]
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[var(--muted)] mb-3">
                  {item.label}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--line)]">
                {item.tags.map((tag) => (
                  <span key={tag} className="brutal-tag text-[10px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
