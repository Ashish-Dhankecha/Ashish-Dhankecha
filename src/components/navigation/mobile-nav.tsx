"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Mail,
  Menu,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { mainNav } from "@/config/nav";
import { siteConfig } from "@/config/site";

// Sub-links for the Lab systems
const labSystems = [
  { name: "Ashi OS", slug: "ashi", count: "20" },
  { name: "LEO Runtime", slug: "leo", count: "21" },
  { name: "VANI Agent", slug: "vani", count: "21" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isLab = pathname?.startsWith("/lab");

  // Close on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll and handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* High-Tech Terminal Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-label="Open system navigation menu"
        className="flex items-center gap-2 px-3 py-2 rounded border border-[#1E293B] bg-[#0D1117] hover:border-cyber-cyan/60 hover:bg-[#151D2A] text-slate-200 hover:text-white transition-all min-h-[44px] min-w-[44px] shadow-xs active:scale-95"
      >
        <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse shadow-[0_0_8px_#38BDF8]" />
        <span className="font-mono text-xs uppercase tracking-wider font-semibold text-slate-200">
          MENU
        </span>
        <Menu className="w-4 h-4 text-cyber-cyan ml-0.5" aria-hidden="true" />
      </button>

      {/* Full-Screen Command Center Overlay */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="System Command Navigation"
          className="fixed inset-0 z-50 flex flex-col bg-[#070A0F] text-[#F8FAFC] overflow-y-auto animate-fade-in"
        >
          {/* Top Control Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 h-16 sm:h-20 border-b border-[#1E293B] bg-[#070A0F]/95 backdrop-blur-xl shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-7 h-7 rounded bg-[#0D1117] border border-[#1E293B] flex items-center justify-center text-cyber-cyan">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xs sm:text-sm font-bold tracking-tight text-white">
                  ASHISH DHANKECHA
                </span>
                <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse" />
                  <span>SYSTEM COMMAND // NAV</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#1E293B] bg-[#0D1117] hover:border-cyber-cyan hover:text-white text-slate-300 font-mono text-xs uppercase tracking-wider transition-all min-h-[44px] min-w-[44px] justify-center active:scale-95"
            >
              <X className="w-4 h-4 text-cyber-cyan" aria-hidden="true" />
              <span className="text-[11px] font-semibold">CLOSE</span>
            </button>
          </div>

          {/* Scrollable Navigation Body */}
          <div className="flex-1 px-4 sm:px-6 py-6 space-y-6 max-w-lg mx-auto w-full">
            {/* Telemetry Status Strip */}
            <div className="p-3 rounded border border-[#1E293B] bg-[#0D1117] flex items-center justify-between font-mono text-[10px] text-slate-400">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-cyber-cyan shrink-0" />
                <span className="uppercase tracking-wider">KERNEL: ONLINE</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyber-emerald">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-ping" />
                <span>SPEC: DETERMINISTIC</span>
              </div>
            </div>

            {/* Primary Navigation Cards */}
            <nav aria-label="Mobile Main Navigation" className="space-y-2">
              {mainNav.map((item) => {
                const isHomeLink = item.href === "/#home" || item.href === "#home";
                const isLabLink = item.href === "/lab";
                const isItemActive = isLabLink
                  ? isLab
                  : pathname === "/" && isHomeLink;

                const subtitles: Record<string, string> = {
                  Home: "Autonomous OS & agentic runtime overview",
                  About: "Systems trajectory, intellect & background",
                  Projects: "Production architectures & codebases",
                  Lab: "62 empirical notes, audits & decisions",
                  Skills: "Core runtimes, languages & infra stack",
                  Contact: "Direct dispatch & collaboration channels",
                };

                return (
                  <div key={item.title} className="space-y-1.5">
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`group block p-3.5 rounded border transition-all ${
                        isItemActive
                          ? "bg-[#0D1117] border-cyber-cyan/60 shadow-[0_0_20px_rgba(56,189,248,0.1)]"
                          : "bg-[#0D1117]/60 border-[#1E293B] hover:bg-[#151D2A] hover:border-cyber-cyan/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-xs font-semibold ${
                              isItemActive
                                ? "text-cyber-cyan"
                                : "text-slate-500 group-hover:text-cyber-cyan"
                            }`}
                          >
                            {`// ${item.index}`}
                          </span>
                          <span className="font-sans text-base font-bold tracking-tight text-white group-hover:text-cyber-cyan transition-colors">
                            {item.title}
                          </span>

                          {isLabLink && (
                            <span className="px-2 py-0.5 rounded border border-cyber-cyan/40 bg-cyber-cyan/15 text-cyber-cyan font-mono text-[9px] uppercase tracking-wider font-semibold">
                              62 RECORDS
                            </span>
                          )}
                        </div>

                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${
                            isItemActive
                              ? "text-cyber-cyan translate-x-1"
                              : "text-slate-500 group-hover:text-cyber-cyan group-hover:translate-x-1"
                          }`}
                        />
                      </div>

                      {subtitles[item.title] && (
                        <p className="font-sans text-xs text-slate-400 mt-1 pl-7 leading-relaxed">
                          {subtitles[item.title]}
                        </p>
                      )}
                    </Link>

                    {/* Quick-Access Lab Project Sub-Chips (when on/under Lab) */}
                    {isLabLink && (
                      <div className="grid grid-cols-3 gap-2 pl-7 pt-1 pb-1">
                        {labSystems.map((sys) => (
                          <Link
                            key={sys.slug}
                            href={`/lab/${sys.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded border border-[#1E293B] bg-[#070A0F] hover:border-cyber-cyan/50 hover:bg-[#0D1117] transition-all text-center group min-h-[40px] flex flex-col justify-center"
                          >
                            <span className="font-mono text-[11px] font-semibold text-slate-200 group-hover:text-cyber-cyan truncate">
                              {sys.name}
                            </span>
                            <span className="font-mono text-[9px] text-slate-500">
                              {sys.count} pieces
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Quick Dispatch Contact Action */}
            <div className="pt-2">
              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-3.5 px-4 rounded border border-cyber-cyan bg-cyber-cyan/10 hover:bg-cyber-cyan hover:text-obsidian-dark text-cyber-cyan font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(56,189,248,0.15)] min-h-[48px] active:scale-95"
              >
                <Zap className="w-4 h-4 shrink-0 fill-current" />
                <span>Initialize Contact / Dispatch</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>

            {/* External Profiles & Channels */}
            <div className="pt-4 border-t border-[#1E293B] space-y-2.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 block">
                EXTERNAL CHANNELS & PROFILES
              </span>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <a
                  href="https://github.com/Ashish-Dhankecha"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded border border-[#1E293B] bg-[#0D1117] hover:border-cyber-cyan/60 hover:text-cyber-cyan text-slate-300 flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span className="text-[11px]">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded border border-[#1E293B] bg-[#0D1117] hover:border-cyber-cyan/60 hover:text-cyber-cyan text-slate-300 flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span className="text-[11px]">LinkedIn</span>
                </a>
                <a
                  href="mailto:ashishdhankecha256@gmail.com"
                  className="p-2.5 rounded border border-[#1E293B] bg-[#0D1117] hover:border-cyber-cyan/60 hover:text-cyber-cyan text-slate-300 flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Terminal Footer */}
          <div className="p-4 sm:p-6 border-t border-[#1E293B] bg-[#070A0F] text-center font-mono text-[10px] text-slate-500 shrink-0">
            <div className="flex items-center justify-center gap-2 text-slate-400 mb-1">
              <span className="text-white font-semibold">{siteConfig.name}</span>
              <span>·</span>
              <span className="text-cyber-cyan">AI Systems Engineering</span>
            </div>
            <div>DETERMINISTIC AGENT RUNTIMES · {new Date().getFullYear()}</div>
          </div>
        </div>
      )}
    </div>
  );
}
