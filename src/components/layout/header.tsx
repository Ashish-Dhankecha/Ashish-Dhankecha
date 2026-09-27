"use client";

import React, { useState } from "react";
import Link from "next/link";
import { triggerMeow } from "@/components/pakcat/meow-toast";

const NAV_ITEMS = [
  { label: "00. Home", href: "#hero" },
  { label: "01. About", href: "#about" },
  { label: "02. Expertise", href: "#expertise" },
  { label: "03. Systems", href: "#projects" },
  { label: "04. Journey", href: "#experience" },
  { label: "05. Process", href: "#process" },
  { label: "06. Stack", href: "#stack" },
  { label: "07. Contact", href: "#contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    triggerMeow("meow! [nav cat awakened]");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-pakcat-surface/95 backdrop-blur border-b border-pakcat-border transition-all duration-300">
      <nav aria-label="Main navigation" className="section-container flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href="#hero"
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 group"
        >
          <span className="font-mono text-[#E27D95] text-sm group-hover:text-[#F0A0B5] transition-colors">
            /\_/\
          </span>
          <span className="text-lg font-bold text-pakcat-text-primary font-sans tracking-tight">
            Ashish Labs
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 border border-[#5A1A2C] text-[#E27D95] bg-[#280A15]/60 font-mono text-[10px] ml-1.5 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E27D95] animate-pulse shadow-[0_0_6px_rgba(226,125,149,0.8)]" />
            SYS.READY
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs xl:text-sm font-mono text-pakcat-text-secondary hover:text-pakcat-text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="font-mono text-xs bg-[#80142B] text-[#F7ECEF] px-4 py-2 border border-[#B02242] hover:bg-[#9B223D] transition-colors rounded-sm hidden sm:inline-block shadow-sm shadow-[#80142B]/30"
          >
            [GET IN TOUCH]
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-pakcat-text-secondary hover:text-pakcat-text-primary border border-pakcat-border rounded-sm font-mono text-xs"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "[✕ CLOSE]" : "[☰ MENU]"}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-pakcat-surface border-b border-pakcat-border px-6 py-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-mono text-pakcat-text-secondary hover:text-pakcat-accent p-2 border border-pakcat-border rounded-sm block"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-pakcat-border">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center block font-mono text-xs bg-[#80142B] text-[#F7ECEF] px-4 py-2.5 border border-[#B02242] hover:bg-[#9B223D] transition-colors rounded-sm shadow-sm shadow-[#80142B]/30"
            >
              [CONTACT ME]
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
