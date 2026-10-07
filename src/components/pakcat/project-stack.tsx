"use client";

import React, { useState, useEffect, KeyboardEvent } from "react";
import "./project-stack.css";

export interface ProjectItem {
  title: string;
  tag: string;
  description: string;
  href: string;
  accent: string;
}

interface ProjectStackProps {
  items: ProjectItem[];
}

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M5 19 19 5M5 5h14v14" />
  </svg>
);

export function ProjectStack({ items }: ProjectStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let next = activeIndex;
    const len = items.length;
    if (e.key === "ArrowRight") next = (next + 1) % len;
    else if (e.key === "ArrowLeft") next = (next - 1 + len) % len;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = len - 1;
    else return;
    
    e.preventDefault();
    setActiveIndex(next);
  };

  const getArtClass = (i: number) => {
    const type = i % 3;
    if (type === 1) return "art-lines";
    if (type === 2) return "art-wave";
    return "";
  };

  return (
    <div className="project-stack">
      <div className="deck">
        {items.map((item, i) => {
          // Calculate logical depth
          // If 5 items:
          // index 0 -> depth 0
          // index 1 -> depth 1 (behind)
          // index 2 -> depth 2 (further behind)
          // index 3 -> depth 3 (hidden)
          // index 4 -> depth 4 (hidden)
          const diff = (i - activeIndex + items.length) % items.length;
          
          // Let's cap visible depth to 3 cards max
          const depth = diff > 2 ? 3 : diff;
          
          const isInert = diff !== 0;
          
          let transform = "";
          let filter = "brightness(1)";
          let opacity = 1;
          
          if (depth === 0) {
            transform = "translate(0,0) rotate(0deg) scale(1)";
          } else if (depth === 1) {
            transform = "translate(-17px, -22px) rotate(-6deg) scale(0.95)";
            filter = "brightness(0.64)";
          } else if (depth === 2) {
            transform = "translate(19px, -39px) rotate(7deg) scale(0.89)";
            filter = "brightness(0.4)";
          } else {
            // Hide cards deeper than 2
            transform = "translate(0px, -50px) scale(0.8)";
            opacity = 0;
            filter = "brightness(0.2)";
          }

          // In standard logic, zIndex is highest for active, lower for depth
          const zIndex = items.length - depth;

          // CSS properties mapped directly
          const style: React.CSSProperties = {
            transform,
            filter,
            opacity,
            zIndex,
          } as React.CSSProperties;

          return (
            <section
              key={i}
              className="card"
              id={`project-${i}`}
              role="tabpanel"
              aria-labelledby={`tab-${i}`}
              aria-hidden={isInert}
              inert={isInert ? true : undefined}
              style={style}
            >
              <div className="face">
                <div className="head">
                  <span>SELECTED WORK</span>
                  <span className="tag">{item.tag || "PROJECT"}</span>
                </div>
                <div className={`art ${getArtClass(i)}`}>
                  <i className="orbit back"></i>
                  <i className="orb"></i>
                  <i className="orbit"></i>
                </div>
                <h2 className="label">{item.title || "Project"}</h2>
                <p className="description">{item.description}</p>
                <div className="bottom">
                  <a
                    className="visit"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View project <ArrowIcon />
                  </a>
                  <span className="number">
                    {`0${i + 1}`.slice(-2)} / {`0${items.length}`.slice(-2)}
                  </span>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <div
        className="tabs"
        role="tablist"
        aria-label="Projects"
        onKeyDown={handleKeyDown}
      >
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            className="tab"
            id={`tab-${i}`}
            role="tab"
            aria-controls={`project-${i}`}
            aria-selected={i === activeIndex}
            tabIndex={i === activeIndex ? 0 : -1}
            onClick={() => setActiveIndex(i)}
          >
            <b>{`0${i + 1}`.slice(-2)}</b>
            <span>{item.title || "Project"}</span>
          </button>
        ))}
      </div>
      <div className="help">PICK A PROJECT. TAKE A LOOK.</div>
    </div>
  );
}
