"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Container } from "./container";
import { NavLinks } from "@/components/navigation/nav-links";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { siteConfig } from "@/config/site";

export function Header() {
  const pathname = usePathname();
  const isLab = pathname?.startsWith("/lab");

  return (
    <header
      role="banner"
      className={`sticky top-0 z-50 w-full backdrop-blur-sm transition-colors duration-200 ${
        isLab
          ? "bg-[#0A0D14]/95 border-b border-[#1E293B] text-[#F3F0E8]"
          : "bg-[#F3F0E8]/95 border-b border-[#D8D4CB] text-[#111111]"
      }`}
    >
      <Container width="wide">
        <div className="flex items-center justify-between h-20">
          {/* Personal Wordmark */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — Home`}
            className="group flex items-baseline gap-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#173B70]"
          >
            <span
              className={`font-display text-xl sm:text-2xl font-light tracking-tight transition-colors ${
                isLab
                  ? "text-[#F8FAFC] hover:text-[#38BDF8]"
                  : "text-[#111111] hover:text-[#173B70]"
              }`}
            >
              ASHISH DHANKECHA
            </span>

            {isLab ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-emerald-500/40 bg-emerald-950/40 text-emerald-400 font-mono text-[9px] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LAB ACTIVE
              </span>
            ) : (
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#555555] hidden lg:inline-block">
                ENGINEER · BUILDER
              </span>
            )}
          </Link>

          {/* Desktop Navigation (01 Home to 06 Contact, with 04 Lab) */}
          <div className="hidden md:flex items-center">
            <NavLinks />
          </div>

          {/* Right Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className={`group hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                isLab
                  ? "border border-[#334155] bg-[#111726] text-[#F8FAFC] hover:bg-[#1E293B] hover:border-[#38BDF8] hover:text-[#38BDF8]"
                  : "border border-[#111111] text-[#111111] hover:bg-[#173B70] hover:border-[#173B70] hover:text-[#F3F0E8]"
              }`}
            >
              <span>Let&apos;s Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
