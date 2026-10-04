"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="relative z-10 border-t border-[var(--line)] bg-[var(--panel)] transition-colors duration-700"
    >
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* Col 1: Brand & Tagline */}
          <div>
            <div
              className="flex items-center gap-2 mb-3 group select-none"
            >
              <span className="font-mono text-[var(--accent-brass)] text-sm group-hover:text-[var(--accent-gold)] transition-colors">
                /\_/\
              </span>
              <span className="text-lg font-bold text-[var(--ink)] font-sans tracking-tight">
                Ashish Labs
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] font-body leading-relaxed">
              <span className="font-mono text-[var(--accent-brass)]">{"// "}</span>
              AI systems, software, automation, and products from first principles.
              I WILL MAKE IT HAPPEN. No matter what.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--ink)] mb-4 font-sans uppercase tracking-wider">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/#hero"
                className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors font-body"
              >
                Home
              </Link>
              <Link
                href="/#about"
                className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors font-body"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors font-body"
              >
                Systems &amp; Experiments
              </Link>
              <Link
                href="/#journey"
                className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors font-body"
              >
                Build Journey
              </Link>
              <Link
                href="/#what-i-build"
                className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors font-body"
              >
                What I Build
              </Link>
              <Link
                href="/#process"
                className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors font-body"
              >
                How I Work
              </Link>
              <Link
                href="/#stack"
                className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors font-body"
              >
                Tech Stack
              </Link>
              <Link
                href="/#focus"
                className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors font-body"
              >
                Current Focus
              </Link>
              <Link
                href="/#contact"
                className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors font-body"
              >
                Contact
              </Link>
              <Link
                href="/lab"
                className="text-sm text-[var(--accent-brass)] hover:text-[var(--accent-gold)] transition-colors font-mono pt-1"
              >
                &gt; Lab Archive (62 notes &amp; ADRs)
              </Link>
            </div>
          </div>

          {/* Col 3: Contact & Utilities */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--ink)] mb-4 font-sans uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:ashishdhankecha256@gmail.com"
                className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors font-body break-all sm:break-normal"
              >
                ashishdhankecha256@gmail.com
              </a>
              <a
                href="https://github.com/Ashish-Dhankecha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors font-body"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/ashish-dhankecha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors font-body"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/Ashish-Dhankecha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors font-body"
              >
                X (Twitter)
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-[var(--muted)] font-body">
            Built by Ashish Dhankecha — First Principles AI Systems
          </p>
          <p className="text-xs font-mono text-[var(--accent-brass)]">
            ASHISH_LAB_OS {"//"} SYS.ONLINE
          </p>
        </div>
      </div>
    </footer>
  );
}
