"use client";

import React, { useState } from "react";

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
    <section id="contact" aria-labelledby="contact-heading" className="relative z-10 py-24 px-4 sm:px-6">
      <div className="section-container max-w-4xl">
        {/* Section Header with mal1k.xyz signature gradient line */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-sm text-emerald-400 font-semibold tracking-wider">
            04.
          </span>
          <h2
            id="contact-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans"
          >
            Get In Touch
          </h2>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        <p className="text-white/50 text-sm sm:text-base mb-12 max-w-2xl font-body">
          Whether you want to discuss AI cognitive architectures, collaborate on systems, or tackle an ambitious engineering challenge — my inbox is open.
        </p>

        {/* Centerpiece Interactive Glass Card */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden text-center mb-10">
          {/* Subtle Accent Glow */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(16,185,129,0.2) 50%, transparent 70%)",
              filter: "blur(60px)",
            }}
            aria-hidden="true"
          />

          <span className="inline-block text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            ● Available for Systems &amp; AI Engineering
          </span>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-sans tracking-tight mb-4">
            Let&apos;s build something extraordinary.
          </h3>

          <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto mb-8 font-body">
            I don&apos;t limit myself to familiar stacks. If something needs to be built, I build it.
            I will make it happen. No matter what.
          </p>

          {/* Interactive Direct Email Pill */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl glass border border-white/15 max-w-full">
            <span className="font-mono text-xs sm:text-sm text-white/90 px-4 py-2 break-all select-all">
              {email}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-4 py-2 rounded-xl text-xs font-mono font-medium bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? "Copied! ✓" : "Copy Email"}
              </button>
              <a
                href={`mailto:${email}`}
                className="px-5 py-2 rounded-xl text-xs font-sans font-semibold bg-white text-black hover:bg-white/90 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                Send Email ↗
              </a>
            </div>
          </div>
        </div>

        {/* Social Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
          <a
            href="https://github.com/Ashish-Dhankecha"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-full glass border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/ashish-dhankecha-599182312"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-full glass border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://x.com/ashish_2560"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-full glass border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
          >
            Twitter / X ↗
          </a>
          <a
            href="/lab"
            className="px-4 py-2.5 rounded-full glass border border-white/10 text-emerald-400/90 hover:text-emerald-400 hover:border-emerald-400/30 transition-all"
          >
            The Lab Archive (62 notes) →
          </a>
        </div>
      </div>
    </section>
  );
}
