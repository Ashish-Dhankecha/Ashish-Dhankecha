"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { id: "about", label: "About", href: "/#about" },
  { id: "projects", label: "Systems", href: "/#projects" },
  { id: "experience", label: "Journey", href: "/#journey" },
  { id: "stack", label: "Stack", href: "/#stack" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export function Header() {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      {/* Floating Glass Pill Dock */}
      <nav
        aria-label="Main Navigation"
        className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full glass-dock border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300"
      >
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono text-white/90 hover:text-white transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold tracking-tight text-sm font-sans">
            Ashish
          </span>
        </Link>

        {/* Divider */}
        <div className="hidden md:block w-px h-4 bg-white/10 mx-1" />

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white bg-white/10 shadow-sm border border-white/15"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Lab Link / CTA */}
        <div className="hidden sm:flex items-center gap-1.5 pl-1">
          <Link
            href="/lab"
            className="px-2.5 py-1 rounded-full text-[11px] font-mono text-white/50 hover:text-white/90 transition-colors"
          >
            /lab
          </Link>
          <Link
            href="/#contact"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white text-black hover:bg-white/90 transition-all font-sans shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            Connect
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-colors text-xs font-mono"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? "[✕]" : "[☰]"}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed top-16 left-4 right-4 p-4 rounded-2xl glass-dock border border-white/15 shadow-2xl flex flex-col gap-2 md:hidden animate-fade-in z-50">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-[10px] font-mono text-white/40">→</span>
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
            <Link
              href="/lab"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono text-white/60 hover:text-white py-1 px-2"
            >
              /lab archive
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-full text-xs font-medium bg-white text-black hover:bg-white/90"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
