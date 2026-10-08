"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme/theme-context";

const NAV = [
  { label: "Projects", href: "/projects", match: "/projects" },
  { label: "Lab", href: "/lab", match: "/lab" },
  { label: "About", href: "/#about" },
  { label: "Method", href: "/#method" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[var(--paper)] border-b-2 border-[var(--ink)]">
      <nav aria-label="Main" className="sheet h-14 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-2 shrink-0" aria-label="Ashish Labs, home">
          <span className="display text-[1.9rem] leading-none translate-y-[2px]">Ashish Labs</span>
        </Link>

        <ul className="hidden md:flex items-center gap-7">
          {NAV.map((item) => {
            const active = item.match ? pathname.startsWith(item.match) : false;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`font-bold condensed uppercase text-[0.95rem] tracking-[0.02em] py-1 border-b-2 transition-colors ${
                    active ? "border-[var(--ink)]" : "border-transparent hover:border-[var(--cobalt)] hover:text-[var(--cobalt)]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="numeral text-xs h-9 px-3 border-2 border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
            aria-label={theme === "dark" ? "Switch to paper (light) theme" : "Switch to negative (dark) theme"}
          >
            {theme === "dark" ? "LIGHT" : "DARK"}
          </button>
          <Link
            href="/#contact"
            className="hidden sm:inline-flex items-center h-9 px-4 bg-[var(--ink)] text-[var(--paper)] font-bold condensed uppercase text-[0.9rem] hover:bg-[var(--cobalt)] hover:text-[var(--on-cobalt)] transition-colors"
          >
            Write to me
          </Link>
          <button
            type="button"
            className="md:hidden h-9 px-3 border-2 border-[var(--ink)] font-bold condensed uppercase text-[0.9rem]"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Index"}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-nav" className="md:hidden fixed inset-x-0 top-14 bottom-0 field-cobalt overflow-y-auto">
          <ul className="sheet py-6">
            {[...NAV, { label: "Contact", href: "/#contact" }].map((item, i) => (
              <li key={item.href} className="border-b border-[var(--on-cobalt)]">
                <Link href={item.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-4">
                  <span className="numeral text-sm opacity-80">{String((i + 1) * 10)}</span>
                  <span className="display text-[3.5rem]">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
