"use client";

import React from "react";
import Link from "next/link";

const bentoProjects = [
  {
    id: "ashi",
    title: "ÆON Cognitive OS",
    badge: "Flagship Monorepo",
    desc: "A 28-package autonomous AI operating system built from first principles. Features episodic memory, tool sandboxing, and strict acyclic graph architecture verified in code.",
    tags: ["Python", "llama.cpp", "FastAPI", "SQLite", "Monorepo"],
    href: "/projects/ashi",
    github: "https://github.com/Ashish-Dhankecha",
    stats: "28 Packages • 5.4s Latency",
  },
  {
    id: "sih",
    title: "SIH26117 Sovereign Workbench",
    badge: "Air-Gapped Prototype",
    desc: "Confidential on-premise AI developer workbench built during a 1-day hackathon sprint. Runs fully offline with zero telemetry or cloud dependencies.",
    tags: ["Qwen-SLM", "Docker", "Fastify", "Air-Gapped"],
    href: "/projects/sih",
    github: "https://github.com/Ashish-Dhankecha",
    stats: "1-Day Sprint • 0 External Calls",
  },
  {
    id: "vani",
    title: "VANI 50-Year OS",
    badge: "Sovereign Architecture",
    desc: "Resilient software system built to run without changes for decades. Employs AST static analysis guardians to physically reject architectural violations.",
    tags: ["AST Analysis", "Python", "Static Typing", "Zero-Churn"],
    href: "/projects/vani",
    github: "https://github.com/Ashish-Dhankecha",
    stats: "AST Guardian • Invariant Verified",
  },
  {
    id: "leo",
    title: "LEO Companion Kernel",
    badge: "Forensic Audit",
    desc: "Companion runtime designed with a Cognitive Memory Management Unit and rigorous post-mortem documentation of real cognitive failures.",
    tags: ["Multimodal", "CMMU", "PyTorch", "Auditing"],
    href: "/projects/leo",
    github: "https://github.com/Ashish-Dhankecha",
    stats: "Real Audits • Honest Post-Mortem",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative z-10 py-20 px-4 sm:px-6">
      <div className="section-container">
        {/* Section Header with mal1k.xyz signature gradient line */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-sm text-emerald-400 font-semibold tracking-wider">
            02.
          </span>
          <h2
            id="projects-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans"
          >
            Featured Systems
          </h2>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        {/* Bento Grid with Spotlight Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {bentoProjects.map((p) => (
            <div
              key={p.id}
              className="group glass-card p-6 sm:p-7 rounded-2xl border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all duration-300 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full glass border border-white/10 text-emerald-400">
                    {p.badge}
                  </span>
                  <span className="font-mono text-[11px] text-white/40">
                    {p.stats}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-white font-sans flex items-center gap-2 mb-3">
                  <span>{p.title}</span>
                  <span className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-sm">
                    ↗
                  </span>
                </h3>

                <p className="text-sm text-white/60 leading-relaxed font-body mb-6">
                  {p.desc}
                </p>
              </div>

              <div>
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono glass border border-white/5 text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <Link
                    href={p.href}
                    className="text-xs font-medium text-white hover:underline flex items-center gap-1"
                  >
                    Read Architecture Case Study <span>→</span>
                  </Link>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white/40 hover:text-white/80 transition-colors ml-auto"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation & Raw Lab Access */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/projects"
            className="glass-card p-5 rounded-2xl border border-white/10 flex items-center justify-between hover:border-white/25 group transition-all"
          >
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                Deep Systems Directory
              </span>
              <span className="text-sm font-semibold text-white group-hover:text-white">
                View All Systems &amp; Case Studies
              </span>
            </div>
            <span className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-transform text-sm font-bold">
              →
            </span>
          </Link>

          <Link
            href="/lab"
            className="glass-card p-5 rounded-2xl border border-white/10 flex items-center justify-between hover:border-white/25 group transition-all"
          >
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                Raw Unfiltered Access
              </span>
              <span className="text-sm font-semibold text-white group-hover:text-white">
                The Lab Archive (62 Notes &amp; ADRs)
              </span>
            </div>
            <span className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-transform text-sm font-bold">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
