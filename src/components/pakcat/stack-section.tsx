"use client";

import React from "react";

interface StackCategory {
  category: string;
  label: string;
  tags: string[];
}

export function StackSection() {
  const stackData: StackCategory[] = [
    {
      category: "AI & Intelligence",
      label: "Runtimes & Model Inference",
      tags: ["PyTorch", "Transformers", "llama.cpp", "Local SLMs (Qwen, Llama)", "GGUF Quantization", "RAG Pipelines", "Embeddings", "vLLM"],
    },
    {
      category: "Languages",
      label: "Core Syntax & Compilers",
      tags: ["Python (Strict / Typings)", "TypeScript", "C / C++", "SQL", "Bash / Shell"],
    },
    {
      category: "Systems Engineering",
      label: "Architecture & Verification",
      tags: ["Monorepo Workspaces", "AsyncIO", "Event Bus Runtimes", "AST Static Guardians", "Process Sandboxing", "Acyclic Graph Checks"],
    },
    {
      category: "Persistence & DBs",
      label: "Storage & State",
      tags: ["PostgreSQL", "SQLite (WAL Mode)", "ChromaDB / Vector", "Structured Memory Schemas"],
    },
    {
      category: "Infrastructure & DevOps",
      label: "Environment & Tooling",
      tags: ["Linux (Ubuntu / Debian / Arch)", "Docker", "uv Package Manager", "Git CI/CD", "Local-First Architecture"],
    },
    {
      category: "Web & UI Engineering",
      label: "Frontend & Interfaces",
      tags: ["Next.js 15", "React 19", "Tailwind CSS", "Lenis Smooth Scroll", "HTML5 Canvas 2.5D", "REST & WebSocket"],
    },
  ];

  return (
    <section id="stack" aria-labelledby="techstack-heading" className="relative z-10 py-20 px-4 sm:px-6">
      <div className="section-container">
        {/* Section Header with mal1k.xyz signature gradient line */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-sm text-emerald-400 font-semibold tracking-wider">
            03.
          </span>
          <h2
            id="techstack-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans"
          >
            Skills &amp; Technologies
          </h2>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        <p className="text-white/50 text-sm sm:text-base mb-12 max-w-2xl font-body">
          Technologies and tools I genuinely use to build cognitive AI systems, software, and autonomous runtimes.
        </p>

        {/* Categorized Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackData.map((item, idx) => (
            <div
              key={item.category}
              className="glass-card p-6 rounded-2xl border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-sans font-bold text-base text-white">
                    {item.category}
                  </h3>
                  <span className="text-[10px] font-mono text-white/30">
                    0{idx + 1}
                  </span>
                </div>
                <p className="text-xs font-mono text-emerald-400/80 mb-4">
                  {item.label}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono glass border border-white/10 text-white/80 hover:text-white hover:border-white/30 hover:bg-white/10 transition-colors"
                  >
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
