"use client";

import React, { useEffect, useState } from "react";

export function BootScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Only show on first visit in session
    const hasBooted = sessionStorage.getItem("ashish_lab_booted");
    if (hasBooted) {
      return;
    }

    setVisible(true);

    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 2200);

    const hideTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("ashish_lab_booted", "true");
    }, 2800);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFading(true);
        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("ashish_lab_booted", "true");
        }, 300);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!visible) return null;

  const handleSkip = () => {
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("ashish_lab_booted", "true");
    }, 200);
  };

  return (
    <div
      className={`boot-screen fixed inset-0 z-[99999] bg-[var(--bg)] flex items-center justify-center select-none ${
        fading ? "fade-out" : ""
      }`}
      onClick={handleSkip}
    >
      <div className="absolute top-6 right-6">
        <button
          onClick={handleSkip}
          className="text-xs font-mono text-[var(--muted)] border border-[var(--line)] px-3 py-1 hover:border-[var(--accent-brass)] hover:text-[var(--accent-brass)] hover:bg-[var(--panel-hover)] transition-colors rounded-sm"
        >
          [SKIP ESC]
        </button>
      </div>

      <div className="font-mono text-xs sm:text-sm max-w-lg px-6 w-full space-y-1">
        <div className="boot-line text-[var(--ink)] font-semibold">
          ASHISH_LAB_OS v1.0.0 (build 2026-09)
        </div>
        <div className="boot-line text-[var(--muted)] text-xs">
          Copyright (c) Ashish Dhankecha. All rights reserved.
        </div>
        <div className="boot-line py-0.5">&nbsp;</div>
        <div className="boot-line text-[var(--accent-brass)]">
          [ OK ] Initializing cognitive substrate...
        </div>
        <div className="boot-line text-[var(--accent-brass)]">
          [ OK ] Mounting /dev/cognitive-lab (Ashi, Leo, Vani)...
        </div>
        <div className="boot-line text-[var(--accent-brass)]">
          [ OK ] Checking acyclic monorepo graph invariants...
        </div>
        <div className="boot-line text-[var(--accent-brass)]">
          [ OK ] Calibrating local SLM inference engine...
        </div>
        <div className="boot-line text-[var(--accent-brass)]">
          [ OK ] Verifying behavioral truth boundaries...
        </div>
        <div className="boot-line py-0.5">&nbsp;</div>
        <div className="boot-line text-[var(--ink)] font-semibold">
          &gt; system.ready
        </div>
        <div className="boot-line text-[var(--accent-brass)]">
          &gt; <span className="cursor-blink">_</span>
        </div>
      </div>
    </div>
  );
}
