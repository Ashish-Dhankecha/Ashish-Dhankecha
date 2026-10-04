"use client";

import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
}

// Vintage Banker Lamp aesthetic particles: brass, gold, eucalyptus sage, and forest enamel
const COLORS = ["#d4a568", "#ffe4a5", "#436a58", "#a0afa6", "#e5ca97"];

export function AmbientParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 20 floating particles matching Banker Lamp ambient aesthetic
    const items: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      top: Math.random() * 90 + 5,
      size: Math.random() * 2.6 + 1.2,
      color: COLORS[i % COLORS.length],
      opacity: Math.random() * 0.16 + 0.08,
      duration: Math.random() * 14 + 11,
      delay: Math.random() * 8,
    }));
    setParticles(items);
  }, []);

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <div
        className="particles-container fixed inset-0 z-[1] pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: p.opacity,
              animation: `float-particle ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
