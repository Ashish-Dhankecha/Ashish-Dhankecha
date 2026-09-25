"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  ArrowUpRight,
  ChevronRight,
  Code2,
  Cpu,
  GitBranch,
  Layers,
  Mail,
  Menu,
  Send,
  X,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";

// Sub-links for the Lab systems
const labSystems = [
  { name: "Ashi OS", slug: "ashi", count: "20" },
  { name: "LEO Runtime", slug: "leo", count: "21" },
  { name: "VANI Agent", slug: "vani", count: "21" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isLab = pathname?.startsWith("/lab");

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const menuOptions = [
    {
      index: "01",
      title: "Home",
      href: "/#home",
      subtitle: "Autonomous loop & neural runtime",
      icon: Cpu,
      isActive: pathname === "/" || pathname === "/#home",
    },
    {
      index: "02",
      title: "About",
      href: "/#about",
      subtitle: "Intellectual trajectory & principles",
      icon: GitBranch,
      isActive: false,
    },
    {
      index: "03",
      title: "Projects",
      href: "/#projects",
      subtitle: "Shipped systems & open-source codebases",
      icon: Layers,
      isActive: false,
      badge: "3 SYSTEMS",
    },
    {
      index: "04",
      title: "The Lab",
      href: "/lab",
      subtitle: "62 empirical notes, audits & benchmarks",
      icon: Activity,
      isActive: isLab,
      badge: "62 RECORDS",
      isFlagship: true,
    },
    {
      index: "05",
      title: "Skills",
      href: "/#skills",
      subtitle: "Languages, neural runtimes & infra stack",
      icon: Code2,
      isActive: false,
    },
    {
      index: "06",
      title: "Contact",
      href: "/#contact",
      subtitle: "Encrypted dispatch & collaboration",
      icon: Send,
      isActive: false,
    },
  ];

  return (
    <div className="md:hidden shrink-0 flex items-center">
      {/* High-Precision Terminal Trigger Button (Mobile Menu Option) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-label="Open navigation menu"
        className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-[#2D161C] bg-[#140A0D] hover:border-[#801D2C] hover:bg-[#1F1015] text-[#F5EBE1] active:scale-95 transition-all min-h-[42px] shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#801D2C] cursor-pointer"
      >
        <span className="w-2 h-2 rounded-full bg-[#DF7987] animate-pulse shadow-[0_0_8px_#DF7987] shrink-0" />
        <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#D9C7B8] group-hover:text-[#F5EBE1]">
          MENU
        </span>
        <Menu className="w-4 h-4 text-[#DF7987] group-hover:text-[#F5EBE1] transition-colors ml-0.5 shrink-0" />
      </button>

      {/* Full-Screen Modern Command Center Overlay (Portaled to body to break out of header stacking context) */}
      {isOpen && mounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="System Navigation Menu"
            className="fixed inset-0 z-[9999] flex flex-col bg-[#0C0608] text-[#F5EBE1] overflow-y-auto overscroll-contain animate-fade-in w-full h-full min-h-[100dvh]"
          >
            {/* Top Control Bar matching exact header height */}
            <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 h-16 sm:h-20 border-b border-[#2D161C] bg-[#0C0608]/95 backdrop-blur-xl shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#1A0C11] border border-[#3D1E25] flex items-center justify-center text-[#DF7987] shrink-0 shadow-sm">
                  <span className="text-xs">✦</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-sm font-bold tracking-tight text-[#F5EBE1]">
                    ASHISH DHANKECHA
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#8E7C79]">
                    SYSTEM DIRECTORY {"//"} NAV
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation menu"
                className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2D161C] bg-[#140A0D] hover:border-[#801D2C] hover:bg-[#1C0E13] text-[#D9C7B8] hover:text-[#F5EBE1] font-mono text-xs uppercase tracking-wider transition-all min-h-[40px] justify-center active:scale-95 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#801D2C] cursor-pointer"
              >
                <span className="text-[11px] font-bold group-hover:text-[#DF7987]">CLOSE</span>
                <X className="w-4 h-4 text-[#DF7987] group-hover:rotate-90 transition-transform duration-200" aria-hidden="true" />
              </button>
            </div>

          {/* Navigation Content Deck */}
          <div className="flex-1 px-4 sm:px-6 py-5 space-y-5 max-w-md mx-auto w-full pb-10">
            {/* Telemetry Header */}
            <div className="flex items-center justify-between font-mono text-[10px] text-[#8E7C79] uppercase tracking-widest px-1">
              <div className="flex items-center gap-1.5 text-[#DF7987] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DF7987] animate-pulse" />
                <span>COMMAND DECK {"//"} DIRECTORY</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#E598A3] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DF7987]" />
                <span>SYSTEM ACTIVE</span>
              </div>
            </div>

            {/* Redesigned Tactile Menu Option Cards */}
            <nav aria-label="Mobile Navigation Options" className="space-y-2.5">
              {menuOptions.map((opt) => {
                const IconComponent = opt.icon;

                return (
                  <Link
                    key={opt.title}
                    href={opt.href}
                    onClick={() => setIsOpen(false)}
                    className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all duration-200 min-h-[66px] active:scale-[0.99] ${
                      opt.isActive
                        ? "border-[#801D2C] bg-[#1E0D13] shadow-[0_0_20px_rgba(128,29,44,0.2)] border-l-4 border-l-[#801D2C]"
                        : "border-[#2D161C] bg-[#140A0D] hover:border-[#801D2C]/60 hover:bg-[#1A0C11]"
                    }`}
                  >
                    {/* Left Section: Icon + Title Stack */}
                    <div className="flex items-center gap-3.5 min-w-0 pr-2">
                      {/* Tech Icon Tile */}
                      <div
                        className={`w-11 h-11 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                          opt.isActive
                            ? "border-[#801D2C] bg-[#801D2C]/20 text-[#DF7987] shadow-[0_0_12px_rgba(128,29,44,0.3)]"
                            : "border-[#2D161C] bg-[#0C0608] text-[#8E7C79] group-hover:border-[#801D2C]/50 group-hover:text-[#DF7987] group-hover:bg-[#160B0F]"
                        }`}
                      >
                        <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
                      </div>

                      {/* Content: Index + Title + Subtitle */}
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[11px] font-bold text-[#DF7987] tracking-wider">
                            {opt.index} {"//"}
                          </span>
                          <span className="font-sans text-base font-bold tracking-tight text-[#F5EBE1] group-hover:text-[#DF7987] transition-colors">
                            {opt.title}
                          </span>
                          {opt.isActive && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[8.5px] font-mono uppercase tracking-wider bg-[#801D2C]/20 text-[#DF7987] border border-[#801D2C]/40 font-semibold">
                              <span className="w-1 h-1 rounded-full bg-[#DF7987] animate-pulse" />
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[11px] text-[#8E7C79] leading-snug mt-0.5 truncate">
                          {opt.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Right Section: Badge + Chevron */}
                    <div className="flex items-center gap-2 shrink-0">
                      {opt.badge && (
                        <span className="px-2 py-0.5 rounded-full border border-[#801D2C]/50 bg-[#260E15] text-[#DF7987] font-mono text-[9.5px] uppercase tracking-wider font-semibold">
                          {opt.badge}
                        </span>
                      )}
                      <div
                        className={`w-7 h-7 rounded-md border flex items-center justify-center transition-all ${
                          opt.isActive
                            ? "border-[#801D2C] bg-[#801D2C]/20 text-[#DF7987]"
                            : "border-[#2D161C] bg-[#0C0608] text-[#8E7C79] group-hover:border-[#801D2C]/50 group-hover:text-[#DF7987] group-hover:translate-x-0.5"
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Quick 1-Tap Lab Subsystems Jump */}
            <div className="p-3.5 rounded-xl border border-[#2D161C] bg-[#140A0D] space-y-2.5">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#8E7C79] px-0.5">
                <div className="flex items-center gap-1.5 text-[#DF7987] font-semibold">
                  <Activity className="w-3 h-3" />
                  <span>LAB SUBSYSTEMS DIRECT JUMP</span>
                </div>
                <span className="text-[#8E7C79] font-mono">3 ARCHITECTURES</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {labSystems.map((sys) => (
                  <Link
                    key={sys.slug}
                    href={`/lab/${sys.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="p-2.5 rounded-lg border border-[#2D161C] bg-[#0C0608] hover:border-[#801D2C] hover:bg-[#1A0C11] transition-all text-center group min-h-[48px] flex flex-col justify-center items-center active:scale-95 shadow-sm"
                  >
                    <span className="font-mono text-xs font-bold text-[#F5EBE1] group-hover:text-[#DF7987] truncate w-full">
                      {sys.name}
                    </span>
                    <span className="font-mono text-[9px] text-[#DF7987] mt-0.5">
                      {sys.count} entries
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Primary Dispatch CTA */}
            <div>
              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-3.5 px-4 rounded-full bg-[#801D2C] hover:bg-[#A6263A] text-[#F5EBE1] font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(128,29,44,0.3)] min-h-[50px] active:scale-[0.98]"
              >
                <span>Available for Projects ✦</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>

            {/* External Profile Channels */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8E7C79] block px-0.5">
                COMMUNICATION CHANNELS
              </span>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <a
                  href="https://github.com/Ashish-Dhankecha"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-[#2D161C] bg-[#140A0D] hover:border-[#801D2C] hover:bg-[#1A0C11] text-[#D9C7B8] hover:text-[#F5EBE1] flex items-center justify-center gap-1.5 transition-all min-h-[44px] active:scale-95 shadow-sm"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-[#DF7987]" />
                  <span className="text-[11px] font-semibold">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-[#2D161C] bg-[#140A0D] hover:border-[#801D2C] hover:bg-[#1A0C11] text-[#D9C7B8] hover:text-[#F5EBE1] flex items-center justify-center gap-1.5 transition-all min-h-[44px] active:scale-95 shadow-sm"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#DF7987]" />
                  <span className="text-[11px] font-semibold">LinkedIn</span>
                </a>
                <a
                  href="mailto:ashishdhankecha256@gmail.com"
                  className="p-2.5 rounded-lg border border-[#2D161C] bg-[#140A0D] hover:border-[#801D2C] hover:bg-[#1A0C11] text-[#D9C7B8] hover:text-[#F5EBE1] flex items-center justify-center gap-1.5 transition-all min-h-[44px] active:scale-95 shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5 text-[#DF7987]" />
                  <span className="text-[11px] font-semibold">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Footer */}
          <div className="p-4 sm:p-5 border-t border-[#2D161C] bg-[#0C0608] text-center font-mono text-[10px] text-[#8E7C79] shrink-0">
            <div className="flex items-center justify-center gap-2 text-[#D9C7B8] mb-0.5">
              <span className="text-[#F5EBE1] font-semibold">{siteConfig.name}</span>
              <span>·</span>
              <span className="text-[#DF7987]">AI Systems Engineering</span>
            </div>
            <div>DETERMINISTIC RUNTIMES &middot; 2026</div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
