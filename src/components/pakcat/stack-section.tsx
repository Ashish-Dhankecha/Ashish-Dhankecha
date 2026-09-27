"use client";

import React from "react";
import { ScrambleText } from "./scramble-text";

interface StackCategory {
  category: string;
  tags: string[];
}

export function StackSection() {
  const stackData: StackCategory[] = [
    {
      category: "ai / systems",
      tags: ["PyTorch", "Transformers", "llama.cpp", "Sub-2B SLMs", "GGUF", "HuggingFace"],
    },
    {
      category: "languages",
      tags: ["Python (Strict Typing)", "TypeScript", "C++", "SQL", "Bash"],
    },
    {
      category: "architecture",
      tags: ["uv Monorepo", "AST Static Analysis", "Acyclic DAGs", "ADR Tooling", "Layer Invariants"],
    },
    {
      category: "memory & database",
      tags: ["PostgreSQL", "SQLite (WAL)", "Vector Embeddings", "Redis", "Episodic Stores"],
    },
    {
      category: "agent runtimes",
      tags: ["Autonomous Loops", "Truth Boundaries", "Action Integrity", "Tool Sandboxes", "Event Bus"],
    },
    {
      category: "verification & test",
      tags: ["Pytest", "Behavioral Invariants", "Turn Latency Profiling", "Mock Auditing", "CI Gates"],
    },
    {
      category: "infrastructure",
      tags: ["Linux (Debian/Ubuntu)", "Docker", "Git", "Local-First Runtimes", "Zero Vendor Lock-in"],
    },
    {
      category: "interfaces & backend",
      tags: ["FastAPI", "Next.js", "React", "Tailwind CSS", "Terminal CLI", "AsyncIO"],
    },
  ];

  return (
    <section id="stack" aria-labelledby="techstack-heading" className="relative z-10">
      <div className="section-container section-padding">
        {/* Section Header */}
        <div className="mb-12 reveal reveal-up visible">
          <span className="section-number">
            <ScrambleText text="06 // dependencies" />
          </span>
          <h2
            id="techstack-heading"
            className="text-3xl md:text-4xl font-bold text-pakcat-text-primary mt-3 font-sans"
          >
            Tech Stack
          </h2>
        </div>

        {/* 4x2 Grid of Brutal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stackData.map((item, idx) => (
            <div
              key={item.category}
              className={`stagger-${
                (idx % 4) + 1
              } brutal-card p-6 reveal reveal-up visible rounded-sm flex flex-col`}
            >
              <h3 className="font-mono text-sm text-[#E27D95] mb-4">
                <span className="text-[#E27D95]">&gt; </span>
                {item.category}
              </h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {item.tags.map((tag) => (
                  <span key={tag} className="brutal-tag">
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
