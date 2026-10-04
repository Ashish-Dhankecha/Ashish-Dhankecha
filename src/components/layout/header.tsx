"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { num: "01", label: "About", href: "/#about" },
  { num: "02", label: "Systems", href: "/projects" },
  { num: "03", label: "Journey", href: "/#journey" },
  { num: "04", label: "What I Build", href: "/#what-i-build" },
  { num: "05", label: "How I Work", href: "/#process" },
  { num: "06", label: "Stack", href: "/#stack" },
  { num: "07", label: "Focus", href: "/#focus" },
  { num: "08", label: "Contact", href: "/#contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--line)] shadow-lg shadow-black/20 py-3"
          : "bg-[var(--bg)]/60 backdrop-blur-md border-b border-[var(--line)]/40 py-4"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="section-container flex items-center justify-between gap-4"
      >
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group whitespace-nowrap shrink-0 select-none"
        >
          <span className="font-mono text-xs px-2 py-0.5 rounded border border-[var(--line)] bg-[var(--panel)] text-[var(--accent-brass)] group-hover:border-[var(--accent-brass)] transition-colors shadow-sm">
            /\_/\
          </span>
          <span className="text-base sm:text-lg font-bold text-[var(--ink)] font-sans tracking-tight">
            Ashish <span className="text-[var(--accent-brass)] font-medium">Labs</span>
          </span>
        </Link>

        {/* Desktop Nav Links: Single-line pill items with subtle brass numbers */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--panel)] transition-all whitespace-nowrap"
            >
              <span className="font-mono text-[10px] text-[var(--accent-brass)] opacity-60 group-hover:opacity-100 transition-opacity">
                {item.num}.
              </span>
              <span className="font-sans font-medium tracking-tight">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Right CTA Button & Mobile Menu Button */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/#contact"
            className="whitespace-nowrap hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-sans font-semibold bg-gradient-to-r from-[#d4a568] via-[#e5ca97] to-[#bf9c62] text-[#0f1b15] hover:brightness-110 shadow-sm shadow-[rgba(212,165,104,0.3)] transition-all active:scale-[0.98]"
          >
            <span>Get in Touch</span>
            <span className="text-[11px] font-bold" aria-hidden="true">→</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden px-2.5 py-1.5 text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--line)] bg-[var(--panel)] rounded-md font-mono text-xs transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? "[✕]" : "[☰ MENU]"}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--panel)] border-b border-[var(--line)] px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4 shadow-2xl animate-fade-in max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-2 sm:gap-2.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 sm:p-2.5 border border-[var(--line)] rounded-lg bg-[var(--bg)]/80 text-xs font-sans text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--accent-brass)] transition-all min-w-0"
              >
                <span className="font-mono text-[10px] text-[var(--accent-brass)] shrink-0">
                  {item.num}.
                </span>
                <span className="font-medium truncate">{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t border-[var(--line)]">
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full justify-center inline-flex items-center gap-1.5 py-2.5 rounded-lg text-xs font-sans font-semibold bg-gradient-to-r from-[#d4a568] via-[#e5ca97] to-[#bf9c62] text-[#0f1b15] shadow-md shadow-[rgba(212,165,104,0.3)]"
            >
              <span>Get in Touch</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
