"use client";

import React, { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#4a3826] via-[#bf9c62] to-[#ffe4a5] shadow-[0_0_10px_rgba(255,216,146,0.6)] z-[9998] transition-[width] duration-75 pointer-events-none"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}
