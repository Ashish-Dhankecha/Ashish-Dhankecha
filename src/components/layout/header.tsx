"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Terminal } from "lucide-react";
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
      className="sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-200 bg-[#070A0F]/90 border-b border-[#1E293B] text-[#F8FAFC]"
    >
      <Container width="wide">
        <div className="flex items-center justify-between h-16 sm:h-20 w-full gap-2 sm:gap-4">
          {/* Personal Wordmark & AI telemetry */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — Home`}
            className="group flex items-center gap-2.5 sm:gap-3 min-w-0 shrink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyber-cyan"
          >
            <div className="w-7 h-7 rounded bg-[#0E1420] border border-[#1E293B] flex items-center justify-center text-cyber-cyan group-hover:border-cyber-cyan/50 transition-colors shrink-0">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-sans text-sm sm:text-base lg:text-lg font-bold tracking-tight text-white group-hover:text-cyber-cyan transition-colors truncate">
              ASHISH DHANKECHA
            </span>

            {isLab ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan font-mono text-[10px] uppercase tracking-widest font-medium shrink-0 hidden sm:inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
                LAB / ARCHIVE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-cyber-emerald/40 bg-cyber-emerald/10 text-cyber-emerald font-mono text-[10px] uppercase tracking-wider font-medium shrink-0 hidden sm:inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse" />
                AI SYSTEMS DEV
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <NavLinks />
          </div>

          {/* Right Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <Link
              href="/#contact"
              className="group hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-all rounded border border-[#334155] bg-[#0E1420] text-slate-200 hover:border-cyber-cyan hover:text-white hover:bg-[#151D2A]"
            >
              <span>Initialize Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyber-cyan transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
