"use client";

import React, { useEffect, useRef, useState } from "react";

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
}

export function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isTouchOrMobile =
      window.innerWidth < 768 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchOrMobile) {
      setIsMobile(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let mouseX = -9999;
    let mouseY = -9999;
    let isVisible = true;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Responsive particle count (capped for smooth 60fps)
    const particleCount = Math.floor(
      Math.min(width, 1400) * 0.03 * (prefersReducedMotion ? 0.3 : 1)
    );

    const particles: NodeParticle[] = [];

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.4 + 0.6,
          baseAlpha: Math.random() * 0.3 + 0.15,
          alpha: Math.random() * 0.3 + 0.15,
        });
      }
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        return;
      }
      setIsMobile(false);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    handleResize();

    // Render loop
    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        const maxDist = 85;
        const mouseRadius = 130;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          if (!prefersReducedMotion) {
            p.x += p.vx;
            p.y += p.vy;

            // Bounce on edges
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            // Subtle interaction with mouse
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseRadius) {
              const force = (1 - dist / mouseRadius) * 0.5;
              p.x -= (dx / dist) * force;
              p.y -= (dy / dist) * force;
              p.alpha = Math.min(1, p.baseAlpha + 0.35);
            } else {
              p.alpha += (p.baseAlpha - p.alpha) * 0.05;
            }
          }

          // Draw node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.fill();

          // Connect nearby particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const djx = p.x - p2.x;
            const djy = p.y - p2.y;
            const d = Math.sqrt(djx * djx + djy * djy);

            if (d < maxDist) {
              const lineAlpha = (1 - d / maxDist) * 0.1;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* 1. Interactive 2.5D Canvas Starfield & Constellation (desktop only) */}
      {!isMobile && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-0"
          aria-hidden="true"
        />
      )}

      {/* 2. Cyber Subtle Coordinate Grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 cyber-grid opacity-40 sm:opacity-60"
        aria-hidden="true"
      />

      {/* 3. Floating Radial Glow Orbs (hidden on mobile, optimized on desktop) */}
      <div
        className="hidden sm:block fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-32 -right-32 w-[450px] h-[450px] rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(139, 92, 246, 0.15) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-1/2 -left-48 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>
    </>
  );
}
