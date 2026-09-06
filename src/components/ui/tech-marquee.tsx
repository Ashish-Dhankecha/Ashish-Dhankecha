"use client";

import React from "react";

// =============================================================================
// Vector SVG Icons for User-Specified Tools & Technologies
// Exact 12 items requested:
// Python, Java, C, DSA, Git, PostgreSQL, NumPy, Pandas, Linux, GitHub, Hugging Face, AI Agents
// =============================================================================

function PythonIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M11.91 2c-5.08 0-4.75 2.2-4.75 2.2l.01 2.28h4.82v.69H5.21S2 6.79 2 11.93c0 5.14 2.8 4.96 2.8 4.96h1.67v-2.34s-.09-2.8 2.76-2.8h4.75s2.68.04 2.68-2.61V4.68S16.99 2 11.91 2zm-2.6 1.48a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"
        fill="#3776AB"
      />
      <path
        d="M12.09 22c5.08 0 4.75-2.2 4.75-2.2l-.01-2.28h-4.82v-.69h6.78s3.21.38 3.21-4.76c0-5.14-2.8-4.96-2.8-4.96h-1.67v2.34s.09 2.8-2.76 2.8H9.79s-2.68-.04-2.68 2.61v4.45S7.01 22 12.09 22zm2.6-1.48a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z"
        fill="#FFD43B"
      />
    </svg>
  );
}

function JavaIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" className={className} fill="none">
      {/* Steam lines */}
      <path
        d="M8.5 7c.6-1.2 1.6-2 1.5-3.2-.4.6-.6 1.4 0 2 .4.4.9.8 0 1.6M12 6.2c.8-1.2 2-2 1.8-3.2-.4.6-.6 1.4 0 2 .5.4 1 .8 0 1.6M15 7c.6-1.2 1.6-2 1.5-3.2-.4.6-.6 1.4 0 2 .4.4.9.8 0 1.6"
        stroke="#EA2D2E"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {/* Cup body */}
      <path
        d="M5 10.5h11v4.8c0 2.2-1.8 3.7-4.2 3.7H9.2C6.8 19 5 17.5 5 15.3v-4.8z"
        fill="#5382A1"
      />
      {/* Handle */}
      <path
        d="M16 11.5h1.2a2.2 2.2 0 0 1 0 4.4H16"
        stroke="#5382A1"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Base / Saucer */}
      <path
        d="M4.5 20.5c3.5.9 9.5.9 13 0"
        stroke="#EA2D2E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" className={className} fill="none">
      <path d="M12 2.5 3 7.7v8.6l9 5.2 9-5.2V7.7L12 2.5z" fill="#00599C" />
      <path
        d="M12 7c-2.8 0-4.5 1.8-4.5 5s1.7 5 4.5 5c1.8 0 3.1-.7 3.8-1.5l-1.4-1.3c-.6.6-1.4 1-2.4 1-1.6 0-2.4-1.2-2.4-3.2s.8-3.2 2.4-3.2c1 0 1.8.4 2.4 1l1.4-1.3C15.1 7.7 13.8 7 12 7z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function DsaIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" className={className} fill="none">
      {/* Graph branches */}
      <path
        d="M12 7.5v3M12 10.5 7.5 15M12 10.5l4.5 4.5"
        stroke="#38BDF8"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Root Node */}
      <circle cx="12" cy="5.5" r="3" fill="#38BDF8" />
      <circle cx="12" cy="5.5" r="1.2" fill="#070A0F" />
      {/* Left Child Node */}
      <circle cx="7" cy="17" r="2.8" fill="#38BDF8" />
      <circle cx="7" cy="17" r="1" fill="#070A0F" />
      {/* Right Child Node */}
      <circle cx="17" cy="17" r="2.8" fill="#38BDF8" />
      <circle cx="17" cy="17" r="1" fill="#070A0F" />
    </svg>
  );
}

function GitIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M21.7 10.6 13.4 2.3c-.8-.8-2.1-.8-2.9 0L8.4 4.4l3.7 3.7c.6-.2 1.3-.1 1.8.4.5.5.7 1.2.4 1.8l3.5 3.5c.6-.2 1.3-.1 1.8.4.8.8.8 2.1 0 2.9s-2.1.8-2.9 0c-.6-.6-.7-1.4-.4-2.1L13 11.5v4.9c.2.1.4.3.6.5.8.8.8 2.1 0 2.9s-2.1.8-2.9 0-2.1-.8 0-2.9c.2-.2.4-.4.6-.5V11c-.4-.2-.8-.6-1-.9L6.5 6.3 2.3 10.5c-.8.8-.8 2.1 0 2.9l8.3 8.3c.8.8 2.1.8 2.9 0l8.2-8.2c.8-.8.8-2.1 0-2.9z"
        fill="#F05032"
      />
    </svg>
  );
}

function PostgresIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12.02 2.5c-4.46 0-7.86 3.06-8.35 7.15-.35 2.87.63 5.48 2.55 7.23v3.62h2.2v-2.61c1.13.41 2.37.61 3.6.61 4.97 0 9.02-3.8 9.02-8.5 0-4.14-4.04-7.5-9.02-7.5zm-3.5 11.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm5.5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
        fill="#336791"
      />
    </svg>
  );
}

function NumpyIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" className={className} fill="none">
      <path d="M12 2.5 3.5 7.5v9l8.5 5 8.5-5v-9L12 2.5z" fill="#013243" />
      <path d="M12 2.5v19M3.5 7.5l17 10M20.5 7.5l-17 10" stroke="#4DABCF" strokeWidth="1.2" />
      <path d="M7 16V8l5 8V8" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 8v8h3" stroke="#4DABCF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PandasIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" className={className} fill="none">
      <rect x="3" y="11" width="3.5" height="9" rx="1.5" fill="#150458" />
      <rect x="7.8" y="4" width="3.5" height="16" rx="1.5" fill="#FF4336" />
      <rect x="12.6" y="8" width="3.5" height="12" rx="1.5" fill="#00A9E0" />
      <rect x="17.4" y="12" width="3.5" height="8" rx="1.5" fill="#FFC700" />
    </svg>
  );
}

function LinuxIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 2c-3.1 0-5 2.5-5 6 0 1.8.4 3.7 1.1 5.1C7.3 14 6.8 15.2 6.8 16.5c0 2.5 2.2 4.5 5.2 4.5s5.2-2 5.2-4.5c0-1.3-.5-2.5-1.3-3.4.7-1.4 1.1-3.3 1.1-5.1 0-3.5-1.9-6-5-6z"
        fill="#111111"
      />
      <ellipse cx="10.2" cy="7.2" rx="0.8" ry="1.2" fill="#FCC624" />
      <ellipse cx="13.8" cy="7.2" rx="0.8" ry="1.2" fill="#FCC624" />
      <path d="M11 9.5h2l-1 1.8z" fill="#E95420" />
      <path d="M7 19.5c1 1.5 3 2 5 2s4-.5 5-2c-.5-1-2.5-1.8-5-1.8s-4.5.8-5 1.8z" fill="#FCC624" />
    </svg>
  );
}

function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" className={className} fill="#111111">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function HuggingFaceIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" className={className} fill="none">
      <circle cx="12" cy="12" r="10" fill="#FFD21E" />
      <circle cx="8.5" cy="10" r="1.5" fill="#111111" />
      <circle cx="15.5" cy="10" r="1.5" fill="#111111" />
      <path d="M8 14.5c1.2 1.5 2.6 2 4 2s2.8-.5 4-2" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 11c-.5 1.5 0 3.5 1.5 4" stroke="#FF9D00" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 11c.5 1.5 0 3.5-1.5 4" stroke="#FF9D00" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AgentIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" className={className} fill="none">
      <rect x="3" y="4" width="18" height="15" rx="3" fill="#38BDF8" />
      <circle cx="8.5" cy="11.5" r="2" fill="#070A0F" />
      <circle cx="15.5" cy="11.5" r="2" fill="#070A0F" />
      <path d="M12 2v2M8 19v3M16 19v3" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// =============================================================================
// Tech Items Definition (Strictly 12 User-Requested Items)
// =============================================================================

export interface TechItem {
  name: string;
  category: string;
  Icon: React.ComponentType<{ className?: string }>;
}

export const techStackItems: TechItem[] = [
  { name: "Python", category: "Core AI / Research", Icon: PythonIcon },
  { name: "Java", category: "OOP & Systems", Icon: JavaIcon },
  { name: "C", category: "Low-Level Systems", Icon: CIcon },
  { name: "DSA", category: "Data Structures & Algos", Icon: DsaIcon },
  { name: "Git", category: "Version Control", Icon: GitIcon },
  { name: "PostgreSQL", category: "Relational Database", Icon: PostgresIcon },
  { name: "NumPy", category: "Vectorized Math", Icon: NumpyIcon },
  { name: "Pandas", category: "Data Analysis", Icon: PandasIcon },
  { name: "Linux", category: "OS & Kernel", Icon: LinuxIcon },
  { name: "GitHub", category: "Code Collaboration", Icon: GithubIcon },
  { name: "Hugging Face", category: "Transformers / LLMs", Icon: HuggingFaceIcon },
  { name: "AI Agents", category: "Autonomous Loops", Icon: AgentIcon },
];

// =============================================================================
// TechMarquee Component
// Endless, seamless moving marquee ticker of tools and technologies with their logos
// =============================================================================

export function TechMarquee() {
  return (
    <section
      aria-label="Core Tools & Technologies Ticker"
      className="py-5 sm:py-6 border-b border-[#1E293B] bg-[#070A0F] overflow-hidden relative group"
    >
      {/* Top subtle technical label strip */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400">
            ENGINEERING STACK &middot; CORE RUNTIMES
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-wider text-cyber-cyan hidden sm:inline uppercase">
          [ ACTIVE ENVIRONMENT &middot; CONTINUOUS EVALUATION ]
        </span>
      </div>

      {/* Subtle edge gradient masks for gentle fade in/out */}
      <div
        className="pointer-events-none absolute left-0 top-12 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#070A0F] to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-12 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#070A0F] to-transparent z-10"
        aria-hidden="true"
      />

      {/* Marquee Track (Seamless Loop) */}
      <div className="flex select-none overflow-hidden">
        <div className="animate-marquee flex items-center gap-3 sm:gap-4 py-1">
          {/* Set 1 */}
          {techStackItems.map((item, idx) => (
            <div
              key={`tech-1-${item.name}-${idx}`}
              className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded border border-[#1E293B] bg-[#0D1117] hover:bg-[#151D2A] hover:border-cyber-cyan/60 transition-all shrink-0 cursor-default shadow-xs"
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <item.Icon className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-white">
                {item.name}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 border-l border-[#1E293B] pl-2.5 hidden xs:inline">
                {item.category}
              </span>
            </div>
          ))}

          {/* Set 2 (Identical duplicate for 100% seamless infinite loop) */}
          {techStackItems.map((item, idx) => (
            <div
              key={`tech-2-${item.name}-${idx}`}
              aria-hidden="true"
              className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded border border-[#1E293B] bg-[#0D1117] hover:bg-[#151D2A] hover:border-cyber-cyan/60 transition-all shrink-0 cursor-default shadow-xs"
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <item.Icon className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-white">
                {item.name}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 border-l border-[#1E293B] pl-2.5 hidden xs:inline">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
