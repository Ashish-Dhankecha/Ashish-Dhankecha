"use client";

import React from "react";
import Link from "next/link";
import { triggerMeow } from "@/components/pakcat/meow-toast";

export function Footer() {
  const handleCatClick = () => {
    triggerMeow("meow! [footer cat sensor pinged]");
  };

  const rerunBoot = () => {
    sessionStorage.removeItem("ashish_lab_booted");
    window.location.reload();
  };

  return (
    <footer
      aria-label="Site footer"
      className="relative z-10 border-t border-[#3B121E] bg-[#16050B]"
    >
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Col 1: Brand & Tagline */}
          <div>
            <div
              onClick={handleCatClick}
              className="flex items-center gap-2 mb-3 cursor-pointer group select-none"
              title="Click cat mascot!"
            >
              <span className="font-mono text-[#E27D95] text-sm group-hover:text-[#F0A0B5] transition-colors">
                /\_/\
              </span>
              <span className="text-lg font-bold text-pakcat-text-primary font-sans tracking-tight">
                Ashish Labs
              </span>
            </div>
            <p className="text-sm text-pakcat-text-secondary font-body leading-relaxed">
              <span className="font-mono text-[#E27D95]">{"// "}</span>
              First-principles AI systems, empirical truth boundaries, and stateful cognitive architectures.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold text-pakcat-text-primary mb-4 font-sans uppercase tracking-wider">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="#hero"
                className="text-sm text-pakcat-text-secondary hover:text-pakcat-text-primary transition-colors font-body"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-sm text-pakcat-text-secondary hover:text-pakcat-text-primary transition-colors font-body"
              >
                About
              </a>
              <a
                href="#expertise"
                className="text-sm text-pakcat-text-secondary hover:text-pakcat-text-primary transition-colors font-body"
              >
                Expertise
              </a>
              <a
                href="#projects"
                className="text-sm text-pakcat-text-secondary hover:text-pakcat-text-primary transition-colors font-body"
              >
                Systems &amp; Reports
              </a>
              <a
                href="#experience"
                className="text-sm text-pakcat-text-secondary hover:text-pakcat-text-primary transition-colors font-body"
              >
                Experience
              </a>
              <a
                href="#process"
                className="text-sm text-pakcat-text-secondary hover:text-pakcat-text-primary transition-colors font-body"
              >
                Process
              </a>
              <a
                href="#stack"
                className="text-sm text-pakcat-text-secondary hover:text-pakcat-text-primary transition-colors font-body"
              >
                Stack
              </a>
              <a
                href="#contact"
                className="text-sm text-pakcat-text-secondary hover:text-pakcat-text-primary transition-colors font-body"
              >
                Contact
              </a>
              <Link
                href="/lab"
                className="text-sm text-[#E27D95] hover:text-[#F0A0B5] transition-colors font-mono pt-1"
              >
                &gt; View Lab Dossiers &amp; Forensics
              </Link>
            </div>
          </div>

          {/* Col 3: Contact & Utilities */}
          <div>
            <h4 className="text-sm font-semibold text-pakcat-text-primary mb-4 font-sans uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:ashishdhankecha.business@gmail.com"
                className="text-sm text-pakcat-text-secondary hover:text-pakcat-text-primary transition-colors font-body"
              >
                ashishdhankecha.business@gmail.com
              </a>
              <a
                href="https://github.com/Ashish-Dhankecha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-pakcat-text-secondary hover:text-pakcat-text-primary transition-colors font-body"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/ashish-dhankecha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-pakcat-text-secondary hover:text-pakcat-text-primary transition-colors font-body"
              >
                LinkedIn
              </a>

              <div className="pt-3">
                <button
                  onClick={rerunBoot}
                  className="font-mono text-xs text-pakcat-text-secondary hover:text-[#E27D95] hover:border-[#80142B] hover:bg-[#280A15] border border-[#3B121E] px-2.5 py-1 rounded-sm transition-colors"
                >
                  [↺ REBOOT TERMINAL]
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#3B121E] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-pakcat-text-secondary font-body">
            Built by Ashish Dhankecha — First Principles AI Systems
          </p>
          <p className="text-xs font-mono text-[#E27D95]">
            ASHISH_LAB_OS {"//"} SYS.ONLINE
          </p>
        </div>
      </div>
    </footer>
  );
}
