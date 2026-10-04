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

            {/* Direct Email Channel */}
            <div className="p-3.5 sm:p-4 rounded-sm border border-[var(--line-strong)] bg-[var(--bg)]/70 mb-6 sm:mb-8">
              <div className="text-[10px] font-mono text-[var(--accent-brass)] uppercase tracking-wider mb-2 font-bold flex items-center justify-between">
                <span>{"// DIRECT EMAIL CHANNEL"}</span>
                <span className="text-[var(--muted)] font-normal hidden sm:inline">Replies typically within 24h</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${email}`}
                  className="font-mono text-xs sm:text-sm md:text-base text-[var(--ink)] hover:text-[var(--accent-gold)] font-medium transition-colors break-all"
                >
                  {email}
                </a>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyEmail}
                    className="font-mono text-[11px] sm:text-xs text-[var(--muted)] hover:text-[var(--ink)] border border-[var(--line)] hover:border-[var(--accent-brass)] hover:bg-[var(--panel-hover)] px-2.5 sm:px-3 py-1.5 rounded-sm transition-colors cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    {copied ? "[COPIED! ✓]" : "[COPY EMAIL]"}
                  </button>
                  <Magnetic>
                    <a
                      href={`mailto:${email}`}
                      className="inline-block font-mono text-[11px] sm:text-xs bg-[var(--accent-enamel)] text-[var(--ink)] px-3 sm:px-4 py-1.5 border border-[var(--accent-brass)] hover:bg-[var(--accent-enamel-bright)] hover:border-[var(--accent-gold)] transition-all rounded-sm font-medium shadow-md shadow-[var(--accent-glow)]"
                    >
                      [SEND EMAIL ↗]
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>

            {/* Social / External Channels */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
              <Magnetic>
                <a
                  href="https://github.com/Ashish-Dhankecha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-xs sm:text-sm border border-[var(--line)] text-[var(--accent-brass)] px-4 sm:px-5 py-2 sm:py-2.5 hover:border-[var(--accent-brass)] hover:bg-[var(--panel-hover)] transition-all rounded-sm font-medium"
                >
                  [GITHUB]
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="https://www.linkedin.com/in/ashish-dhankecha-a993703a5/?isSelfProfile=false"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-xs sm:text-sm border border-[var(--line)] text-[var(--muted)] px-4 sm:px-5 py-2 sm:py-2.5 hover:border-[var(--accent-brass)] hover:text-[var(--ink)] hover:bg-[var(--panel-hover)] transition-all rounded-sm font-medium"
                >
                  [LINKEDIN]
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="https://x.com/Ashishdhankecha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-xs sm:text-sm border border-[var(--line)] text-[var(--muted)] px-4 sm:px-5 py-2 sm:py-2.5 hover:border-[var(--accent-brass)] hover:text-[var(--ink)] hover:bg-[var(--panel-hover)] transition-all rounded-sm font-medium"
                >
                  [X]
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
