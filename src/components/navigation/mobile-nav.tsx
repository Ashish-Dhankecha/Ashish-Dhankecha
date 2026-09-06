"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { mainNav } from "@/config/nav";
import { siteConfig } from "@/config/site";

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
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-label="Open navigation menu"
        className="p-2.5 rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 border-[#1E293B] bg-[#0E1420] text-slate-200 hover:border-cyber-cyan hover:text-white focus-visible:ring-cyber-cyan min-h-[44px] min-w-[44px] flex items-center justify-center"
      >
        <Menu className="w-5 h-5" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 overflow-hidden flex justify-end"
        >
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div
            className="relative w-full max-w-xs p-6 shadow-2xl flex flex-col justify-between z-10 animate-slide-down border-l bg-[#070A0F] border-[#1E293B] text-[#F8FAFC]"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#1E293B]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
                    System Navigation
                  </span>
                  {isLab && (
                    <span className="px-1.5 py-0.5 rounded border border-cyber-cyan/30 bg-cyber-cyan/10 text-cyber-cyan font-mono text-[9px] uppercase font-medium">
                      LAB
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 rounded border border-[#1E293B] text-slate-400 hover:border-cyber-cyan hover:text-white hover:bg-[#0E1420] focus-visible:ring-cyber-cyan min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Mobile Navigation" className="flex flex-col gap-1 mt-6">
                {mainNav.map((item) => {
                  const isItemActive =
                    item.href === "/lab"
                      ? isLab
                      : pathname === "/" && (item.href === "/#home" || item.href === "#home");

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-3 py-3 rounded text-sm transition-colors flex items-center justify-between border-b border-[#1E293B]/50 group min-h-[44px] ${
                        isItemActive
                          ? "text-cyber-cyan bg-[#0E1420] border-cyber-cyan/30 font-semibold"
                          : "text-slate-300 hover:text-white hover:bg-[#0E1420]/70"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {item.index && (
                          <span
                            className={`font-mono text-xs transition-colors ${
                              isItemActive
                                ? "text-cyber-cyan"
                                : "text-slate-500 group-hover:text-cyber-cyan"
                            }`}
                          >
                            {item.index}
                          </span>
                        )}
                        <span className="font-sans text-sm font-medium">
                          {item.title}
                        </span>
                        {item.href === "/lab" && (
                          <span className="text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded border border-cyber-cyan/30 bg-cyber-cyan/10 text-cyber-cyan font-semibold">
                            ARCHIVE
                          </span>
                        )}
                      </div>
                      <ArrowUpRight
                        className={`w-4 h-4 transition-transform ${
                          isItemActive
                            ? "opacity-100 text-cyber-cyan"
                            : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-cyber-cyan"
                        }`}
                      />
                    </Link>
                  );
                })}

                <div className="pt-6 mt-4">
                  <Link
                    href="/#contact"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3 px-4 rounded text-center font-mono uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-colors border border-cyber-cyan/50 bg-cyber-cyan/10 text-cyber-cyan hover:bg-cyber-cyan hover:text-obsidian-dark font-semibold min-h-[44px]"
                  >
                    <span>Initialize Contact</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#1E293B]">
              <p className="font-sans text-sm font-bold text-white tracking-tight">
                {siteConfig.name}
              </p>
              <p className="font-mono text-[11px] mt-1 text-slate-400">
                AI Systems Engineer &middot; Kernel Architect
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
