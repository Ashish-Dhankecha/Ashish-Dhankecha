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
        className={`p-2 border transition-colors focus-visible:outline-none focus-visible:ring-2 ${
          isLab
            ? "border-[#1E293B] bg-[#111726] text-[#F8FAFC] hover:border-[#38BDF8] focus-visible:ring-[#38BDF8]"
            : "border-[#D8D4CB] bg-[#F3F0E8] text-[#111111] hover:border-[#111111] focus-visible:ring-[#173B70]"
        }`}
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div
            className={`relative w-full max-w-xs p-6 shadow-2xl flex flex-col justify-between z-10 animate-slide-down border-l ${
              isLab
                ? "bg-[#0A0D14] border-[#1E293B] text-[#F8FAFC]"
                : "bg-[#F3F0E8] border-[#D8D4CB] text-[#111111]"
            }`}
          >
            <div>
              <div
                className={`flex items-center justify-between pb-6 border-b ${
                  isLab ? "border-[#1E293B]" : "border-[#D8D4CB]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-xs uppercase tracking-widest ${
                      isLab ? "text-[#94A3B8]" : "text-[#555555]"
                    }`}
                  >
                    Navigation Index
                  </span>
                  {isLab && (
                    <span className="px-1.5 py-0.5 border border-emerald-500/40 bg-emerald-950/40 text-emerald-400 font-mono text-[8px] uppercase">
                      LAB
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className={`p-1.5 border transition-colors focus-visible:outline-none focus-visible:ring-1 ${
                    isLab
                      ? "border-[#1E293B] text-[#F8FAFC] hover:border-[#38BDF8] hover:bg-[#111726] focus-visible:ring-[#38BDF8]"
                      : "border-[#D8D4CB] text-[#111111] hover:border-[#111111] hover:bg-[#EDE8DE] focus-visible:ring-[#173B70]"
                  }`}
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
                      className={`px-3 py-2.5 text-sm transition-colors flex items-center justify-between border-b group ${
                        isLab
                          ? `border-[#1E293B]/60 ${
                              isItemActive
                                ? "text-[#38BDF8] bg-[#111726]/60 font-medium"
                                : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#111726]"
                            }`
                          : `border-[#D8D4CB]/50 ${
                              isItemActive
                                ? "text-[#173B70] bg-[#EDE8DE] font-medium"
                                : "text-[#555555] hover:text-[#111111] hover:bg-[#EDE8DE]/70"
                            }`
                      }`}
                    >
                      <div className="flex items-baseline gap-2.5">
                        {item.index && (
                          <span
                            className={`font-mono text-xs transition-colors ${
                              isLab
                                ? isItemActive
                                  ? "text-[#38BDF8]"
                                  : "text-[#64748B] group-hover:text-[#38BDF8]"
                                : isItemActive
                                ? "text-[#173B70]"
                                : "text-[#8B8579] group-hover:text-[#173B70]"
                            }`}
                          >
                            {item.index}
                          </span>
                        )}
                        <span className="font-sans text-sm font-medium">
                          {item.title}
                        </span>
                        {item.href === "/lab" && (
                          <span className="text-[8px] font-mono uppercase tracking-widest px-1 py-0.2 bg-[#0284C7] text-white">
                            EXP
                          </span>
                        )}
                      </div>
                      <ArrowUpRight
                        className={`w-3.5 h-3.5 transition-opacity ${
                          isItemActive
                            ? "opacity-100 text-[#38BDF8]"
                            : isLab
                            ? "opacity-0 group-hover:opacity-100 text-[#38BDF8]"
                            : "opacity-0 group-hover:opacity-100 text-[#173B70]"
                        }`}
                      />
                    </Link>
                  );
                })}

                <div className="pt-6 mt-4">
                  <Link
                    href="/#contact"
                    onClick={() => setIsOpen(false)}
                    className={`w-full py-3 px-4 text-center font-mono uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-colors ${
                      isLab
                        ? "border border-[#38BDF8] bg-[#0284C7] text-white hover:bg-[#0369A1]"
                        : "border border-[#111111] bg-[#111111] text-[#F3F0E8] hover:bg-[#173B70] hover:border-[#173B70]"
                    }`}
                  >
                    <span>Let&apos;s Connect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </nav>
            </div>

            <div
              className={`pt-6 border-t ${
                isLab ? "border-[#1E293B]" : "border-[#D8D4CB]"
              }`}
            >
              <p
                className={`font-display text-base font-normal ${
                  isLab ? "text-[#F8FAFC]" : "text-[#111111]"
                }`}
              >
                {siteConfig.name}
              </p>
              <p
                className={`font-mono text-[11px] mt-0.5 ${
                  isLab ? "text-[#64748B]" : "text-[#555555]"
                }`}
              >
                Computer Engineering Student &middot; AI Systems Builder
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
