"use client";

import React from "react";
import { ScrambleText } from "./scramble-text";

interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

export function ExpertiseSection() {
  const items: ExpertiseItem[] = [
    {
      id: "ai-systems",
      title: "AI Systems & Cognitive Architecture",
      description:
        "Architecting multi-subsystem cognitive operating systems with decoupled kernels, atomic boot sequences, and structured message interconnects.",
      icon: (
        <svg className="w-7 h-7 text-pakcat-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      tags: ["Acyclic Monorepo", "uv Workspace", "FastAPI", "Decoupled Kernel", "Python"],
    },
    {
      id: "agent-integrity",
      title: "Autonomous Agents & Execution Integrity",
      description:
        "Building reliable autonomous loops that eliminate vacuous success bugs, mandate concrete execution evidence, and support atomic state rollbacks.",
      icon: (
        <svg className="w-7 h-7 text-pakcat-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      tags: ["Autonomous Loops", "Truth Boundaries", "Action Integrity", "Tool Sandbox", "Evaluation"],
    },
    {
      id: "ml-dl",
      title: "Machine Learning & Deep Learning",
      description:
        "Deriving neural architectures from first principles: self-attention matrices, multi-head transformer blocks, gradient backprop, and loss formulations.",
      icon: (
        <svg className="w-7 h-7 text-pakcat-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      tags: ["PyTorch", "Transformers", "Linear Algebra", "Calculus", "Attention Mechanisms"],
    },
    {
      id: "memory-systems",
      title: "Cognitive Memory & Persistence",
      description:
        "Designing resilient multi-tier memory hierarchies (episodic, semantic, procedural) backed by relational stores and SQLite with zero vendor lock-in.",
      icon: (
        <svg className="w-7 h-7 text-pakcat-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
      tags: ["PostgreSQL", "SQLite", "Vector Search", "Episodic Memory", "State Schema"],
    },
    {
      id: "ast-guardians",
      title: "AST Static Analysis & Architecture Guardians",
      description:
        "Constructing compile-time analysis engines that inspect Python ASTs to forbid package dependency cycles and block direct-database bypassing.",
      icon: (
        <svg className="w-7 h-7 text-pakcat-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
      tags: ["AST Analysis", "Invariant Gates", "Dependency Cycle Prevention", "CI/CD Rules"],
    },
    {
      id: "local-inference",
      title: "Local Inference & Latency Optimization",
      description:
        "Evaluating and profiling sub-2B small language models on consumer hardware, reducing turn latency from 32.8s to 5.4s using optimized llama.cpp runtimes.",
      icon: (
        <svg className="w-7 h-7 text-pakcat-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 14 14" />
        </svg>
      ),
      tags: ["llama.cpp", "GGUF", "Quantization", "Latency Profiling", "SLMs", "Edge AI"],
    },
  ];

  return (
    <section id="expertise" aria-labelledby="expertise-heading" className="relative z-10">
      <div className="section-container section-padding">
        {/* Header */}
        <div className="mb-10 reveal reveal-up visible">
          <span className="section-number">
            <ScrambleText text="02 // expertise" />
          </span>
          <h2
            id="expertise-heading"
            className="text-3xl md:text-4xl font-bold text-pakcat-text-primary mt-3 font-sans"
          >
            Core Expertise
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`brutal-card p-6 reveal reveal-scale visible rounded-sm flex flex-col justify-between stagger-${
                (idx % 6) + 1
              }`}
            >
              <div>
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-pakcat-text-primary mb-2 font-sans">
                  {item.title}
                </h3>
                <p className="text-sm text-pakcat-text-secondary mb-4 font-body leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto pt-2">
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
