"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
      className="sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-200 bg-[#0C0608]/90 border-b border-[#2D161C] text-[#F5EBE1]"
    >
      <Container width="wide">
        <div className="flex items-center justify-between h-16 sm:h-20 w-full gap-2 sm:gap-4">
          {/* Personal Wordmark & Editorial badge */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — Home`}
            className="group flex items-center gap-2.5 sm:gap-3 min-w-0 shrink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#801D2C]"
          >
            <div className="w-7 h-7 rounded-full bg-[#1A0C11] border border-[#3D1E25] flex items-center justify-center text-[#DF7987] group-hover:border-[#801D2C] group-hover:text-[#F5EBE1] transition-all shrink-0">
              <span className="text-xs">✦</span>
            </div>
            <span className="font-serif text-sm sm:text-base lg:text-lg tracking-wider font-semibold text-[#F5EBE1] group-hover:text-[#DF7987] transition-colors truncate uppercase">
              ASHISH DHANKECHA
            </span>

            {isLab ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#801D2C]/50 bg-[#260E15] text-[#DF7987] font-mono text-[9px] uppercase tracking-widest font-medium shrink-0 hidden sm:inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DF7987] animate-pulse" />
                LAB ARCHIVE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#3D1E25] bg-[#180A0E] text-[#D9C7B8] font-mono text-[9px] uppercase tracking-widest font-medium shrink-0 hidden sm:inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-[#801D2C] animate-pulse" />
                AI SYSTEMS ARCHITECT
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
              className="group hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all rounded-full border border-[#801D2C]/60 bg-[#220B11] text-[#F5EBE1] hover:bg-[#801D2C] hover:border-[#A6263A] hover:text-white shadow-sm"
            >
              <span>Available for Projects</span>
              <span className="text-[#DF7987] group-hover:text-white transition-colors">✦</span>
            </Link>

            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
