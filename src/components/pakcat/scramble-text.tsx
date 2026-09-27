"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const SCRAMBLE_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  triggerOnMount?: boolean;
}

export function ScrambleText({
  text,
  className = "",
  as: Component = "span",
  triggerOnMount = false,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isScramblingRef = useRef(false);

  const startScramble = useCallback(() => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;

    let iteration = 0;
    const maxIterations = text.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "/" || char === "." || char === "-") return char;
            if (index < iteration) {
              return text[index];
            }
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );

      iteration += 1 / 3;

      if (iteration >= maxIterations) {
        setDisplayText(text);
        if (intervalRef.current) clearInterval(intervalRef.current);
        isScramblingRef.current = false;
      }
    }, 35);
  }, [text]);

  useEffect(() => {
    if (triggerOnMount) {
      startScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [triggerOnMount, startScramble]);

  return (
    <Component
      className={`scramble-text inline-block cursor-default select-none ${className}`}
      onMouseEnter={startScramble}
      data-scramble=""
    >
      {displayText}
    </Component>
  );
}
