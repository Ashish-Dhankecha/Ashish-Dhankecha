"use client";

import React, { useState } from "react";
import { ScrambleText } from "./scramble-text";
import { Magnetic } from "./magnetic-button";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "ashishdhankecha256@gmail.com";

  const handleCopyEmail = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative z-10">
      <div className="section-container section-padding">
        {/* Section Header */}
        <div className="mb-8 reveal reveal-up visible">
          <span className="section-number">
            <ScrambleText text="08 // contact" />
          </span>
          <h2
            id="contact-heading"
            className="text-3xl md:text-4xl font-bold text-[var(--ink)] mt-3 font-sans"
          >
            Have a problem, system, or idea to build?
          </h2>
        </div>

        {/* Card */}
        <div className="max-w-3xl reveal reveal-scale visible">
          <div className="brutal-card p-5 sm:p-8 md:p-12 rounded-sm shadow-xl">
            <p className="text-[var(--muted)] mb-6 sm:mb-8 font-body leading-relaxed text-sm sm:text-base">
              Ashish Labs is open for technical discussions, AI systems engineering collaborations,
              research inquiries, and ambitious build challenges. Whether it requires AI agents, systems programming,
              or unfamiliar infrastructure — I will figure it out and make it happen.
            </p>

            <div className="flex flex-wrap gap-2.5 sm:gap-3.5 mb-6 sm:mb-8">
              <Magnetic>
                <a
                  href={`mailto:${email}`}
                  className="inline-block font-mono text-xs sm:text-sm bg-[var(--accent-enamel)] text-[var(--ink)] px-5 sm:px-6 py-2.5 sm:py-3 border border-[var(--accent-brass)] hover:bg-[var(--accent-enamel-bright)] hover:border-[var(--accent-gold)] transition-all rounded-sm font-medium shadow-lg shadow-[var(--accent-glow)]"
                >
                  [GET IN TOUCH]
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="https://github.com/Ashish-Dhankecha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-xs sm:text-sm border border-[var(--line)] text-[var(--accent-brass)] px-4 sm:px-5 py-2.5 sm:py-3 hover:border-[var(--accent-brass)] hover:bg-[var(--panel-hover)] transition-all rounded-sm font-medium"
                >
                  [GITHUB]
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="https://linkedin.com/in/ashish-dhankecha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-xs sm:text-sm border border-[var(--line)] text-[var(--muted)] px-4 sm:px-5 py-2.5 sm:py-3 hover:border-[var(--accent-brass)] hover:text-[var(--ink)] hover:bg-[var(--panel-hover)] transition-all rounded-sm font-medium"
                >
                  [LINKEDIN]
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="https://x.com/Ashish-Dhankecha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-xs sm:text-sm border border-[var(--line)] text-[var(--muted)] px-4 sm:px-5 py-2.5 sm:py-3 hover:border-[var(--accent-brass)] hover:text-[var(--ink)] hover:bg-[var(--panel-hover)] transition-all rounded-sm font-medium"
                >
                  [X]
                </a>
              </Magnetic>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[var(--line)]">
              <a
                href={`mailto:${email}`}
                className="font-mono text-xs sm:text-sm text-[var(--accent-brass)] hover:text-[var(--accent-gold)] transition-colors break-all sm:break-normal"
              >
                {email}
              </a>

              <button
                onClick={handleCopyEmail}
                className="font-mono text-[11px] sm:text-xs text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--line)] hover:border-[var(--accent-brass)] hover:bg-[var(--panel-hover)] px-2.5 py-1 rounded-sm transition-colors cursor-pointer shrink-0"
                title="Copy email to clipboard"
              >
                {copied ? "[COPIED! ✓]" : "[COPY EMAIL]"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
