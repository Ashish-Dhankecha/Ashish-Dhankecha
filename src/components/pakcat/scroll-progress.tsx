"use client";

import React, { useEffect, useRef } from "react";

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!barRef.current) return;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      barRef.current.style.transform = `scaleX(${ratio})`;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-white to-cyan-400 shadow-[0_0_10px_rgba(255,255,255,0.6)] z-[9999] origin-left pointer-events-none will-change-transform"
      style={{ transform: "scaleX(0)" }}
      aria-hidden="true"
    />
  );
}
