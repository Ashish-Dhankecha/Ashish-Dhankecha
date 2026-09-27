"use client";

import React, { useState } from "react";
import { ScrambleText } from "./scramble-text";
import { Magnetic } from "./magnetic-button";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "ashishdhankecha.business@gmail.com";

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
            <ScrambleText text="07 // contact" />
          </span>
          <h2
            id="contact-heading"
            className="text-3xl md:text-4xl font-bold text-pakcat-text-primary mt-3 font-sans"
          >
            Have an AI system, research problem, or architecture to build?
          </h2>
        </div>

        {/* Card */}
        <div className="max-w-3xl reveal reveal-scale visible">
          <div className="brutal-card p-8 md:p-12 rounded-sm">
            <p className="text-pakcat-text-secondary mb-8 font-body leading-relaxed">
              Ashish Labs is open for technical discussions, AI systems engineering collaborations, 
              cognitive architecture reviews, and high-integrity research experiments.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Magnetic>
                <a
                  href={`mailto:${email}`}
                  className="inline-block font-mono text-sm bg-[#80142B] text-[#F7ECEF] px-6 py-3 border border-[#B02242] hover:bg-[#9B223D] transition-all rounded-sm font-medium shadow-lg shadow-[#80142B]/35"
                >
                  [CONTACT ME]
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="https://github.com/Ashish-Dhankecha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-sm border border-[#5A1A2C] text-[#E27D95] px-6 py-3 hover:border-[#E27D95] hover:bg-[#280A15] transition-all rounded-sm"
                >
                  [VIEW GITHUB]
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="https://linkedin.com/in/ashish-dhankecha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-sm border border-[#3B121E] text-pakcat-text-secondary px-6 py-3 hover:border-[#80142B] hover:text-[#F7ECEF] hover:bg-[#280A15] transition-all rounded-sm"
                >
                  [VIEW LINKEDIN]
                </a>
              </Magnetic>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${email}`}
                className="font-mono text-sm text-[#E27D95] hover:text-[#F0A0B5] transition-colors"
              >
                {email}
              </a>

              <button
                onClick={handleCopyEmail}
                className="font-mono text-xs text-pakcat-text-secondary hover:text-[#F7ECEF] border border-[#3B121E] hover:border-[#80142B] hover:bg-[#280A15] px-2.5 py-1 rounded-sm transition-colors"
                title="Copy email to clipboard"
              >
                {copied ? "[COPIED! ✓]" : "[COPY]"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
