"use client";

import React, { useRef, useEffect } from "react";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  maxDist?: number;
}

export function Magnetic({
  children,
  className = "",
  strength = 6,
  maxDist = 70,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDist) {
        const factor = (1 - dist / maxDist) * strength;
        el.style.transform = `translate(${(dx * factor) / 8}px, ${(dy * factor) / 8}px)`;
      } else {
        el.style.transform = "translate(0, 0)";
      }
    };

    const handleMouseLeave = () => {
      el.style.transform = "translate(0, 0)";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, maxDist]);

  return (
    <div ref={ref} className={`magnetic inline-block ${className}`}>
      {children}
    </div>
  );
}
