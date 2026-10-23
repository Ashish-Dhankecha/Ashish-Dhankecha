"use client";

import React from "react";

interface BuildCategory {
  id: string;
  title: string;
  badge?: string;
  description: string;
  focus: string[];
  icon: React.ReactNode;
}

export function ExpertiseSection() {
  const categories: BuildCategory[] = [
    {
      id: "ai-systems",
      title: "AI Systems",
      badge: "Core Architecture",
      description:
        "Cognitive operating systems, execution kernels, and persistent state machines. Structuring AI systems around deterministic truth gates rather than raw prompt wrappers.",
      focus: ["Cognitive Kernels", "Acyclic Monorepos", "Stateful Persistence", "Subsystem Decoupling"],
      icon: (
        <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      id: "agents-automation",
      title: "Agents & Automation",
      badge: "Reliable Loops",
      description:
        "Autonomous execution loops, tool-calling pipelines, sandboxed execution environments, and invariant verifiers that eliminate vacuous success bugs.",
      focus: ["Autonomous Loops", "Truth Boundaries", "Tool Sandboxes", "Failure Recovery"],
      icon: (
        <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      id: "software-systems",
      title: "Software & Systems",
      badge: "Engineering Substrate",
      description:
        "Clean, maintainable software systems: Python uv monorepos, asyncio event dispatchers, Linux process isolation, relational databases, and AST static analysis.",
      focus: ["Python", "FastAPI", "PostgreSQL", "SQLite", "AST Analysis", "Linux"],
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      id: "ml-dl",
      title: "ML / Deep Learning",
      badge: "Foundations",
      description:
        "Understanding models from mathematical foundations: self-attention matrices, transformer architectures, backpropagation dynamics, and computational graphs.",
      focus: ["PyTorch", "Transformers", "Linear Algebra", "Calculus", "Loss Surfaces"],
      icon: (
        <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      id: "research-experiments",
      title: "Research & Experiments",
      badge: "Empirical Audits",
      description:
        "Rigorous stress-testing of AI runtimes: evaluating sub-2B SLMs on consumer hardware, profiling turn latencies, and conducting failure post-mortems.",
      focus: ["llama.cpp", "SLM Benchmarking", "Latency Optimization", "Failure Auditing"],
      icon: (
        <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 14 14" />
        </svg>
      ),
    },
    {
      id: "products",
      title: "Products & Tools",
      badge: "Real Utility",
      description:
        "Turning experimental architectures into usable software: agentic workbenches, terminal tools, fullstack web interfaces, and developer utilities.",
      focus: ["Agentic Workbenches", "Next.js / React", "Terminal UIs", "Rapid Prototypes"],
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      id: "whatever-it-takes",
      title: "Whatever It Takes",
      badge: "All-Rounder Philosophy",
      description:
        "I don't limit myself to one stack, framework, or discipline. If a problem requires mathematics, new infrastructure, or unfamiliar tools, I learn it and make it happen.",
      focus: ["Adaptability", "Rapid Learning", "First Principles", "Tenacity"],
      icon: (
        <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
  ];

  return (
    <section id="what-i-build" aria-labelledby="what-i-build-heading" className="relative z-10 py-20 px-4 sm:px-6">
      <div className="section-container">
        {/* Section Header with mal1k.xyz signature gradient line */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-sm text-emerald-400 font-semibold tracking-wider">
            07.
          </span>
          <h2
            id="what-i-build-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans"
          >
            What I Build
          </h2>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        <p className="text-white/50 text-sm sm:text-base mb-12 max-w-2xl font-body">
          Seven engineering domains where I apply first principles to build durable systems.
        </p>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`glass-card p-6 sm:p-7 rounded-2xl border ${
                cat.id === "whatever-it-takes"
                  ? "border-emerald-500/30 bg-emerald-950/10 md:col-span-2 lg:col-span-3"
                  : "border-white/[0.08]"
              } flex flex-col justify-between hover:border-white/20 transition-all duration-300`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl glass border border-white/10">
                    {cat.icon}
                  </div>
                  {cat.badge && (
                    <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider px-2.5 py-0.5 rounded-full glass border border-white/10">
                      {cat.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white font-sans mb-2">
                  {cat.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/60 font-body leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {cat.focus.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono glass border border-white/5 text-white/70"
                  >
                    {item}
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
