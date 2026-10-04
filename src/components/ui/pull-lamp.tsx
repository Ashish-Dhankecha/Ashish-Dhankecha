"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme/theme-context";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "pull-lamp": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          on?: boolean | string;
        },
        HTMLElement
      >;
    }
  }
}

interface PullLampProps {
  className?: string;
  style?: React.CSSProperties;
}

export function PullLamp({ className, style }: PullLampProps) {
  const { theme } = useTheme();
  const lampRef = useRef<HTMLElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if pull-lamp custom element is already defined
    if (typeof window !== "undefined") {
      if (customElements.get("pull-lamp")) {
        setLoaded(true);
      } else {
        const script = document.createElement("script");
        script.src = "/pull-lamp.js";
        script.async = true;
        script.onload = () => {
          setLoaded(true);
        };
        document.body.appendChild(script);
      }
    }
  }, []);

  useEffect(() => {
    if (lampRef.current) {
      const isLight = theme === "light";
      if (isLight) {
        lampRef.current.setAttribute("on", "");
      } else {
        lampRef.current.removeAttribute("on");
      }
    }
  }, [theme, loaded]);

  return (
    <div className={`relative flex items-center justify-center ${className ?? ""}`} style={style}>
      {/* Visual Pull Lamp Web Component */}
      <pull-lamp
        ref={lampRef}
        on={theme === "light" ? "" : undefined}
        style={{ width: "100%", display: "block" }}
      />
    </div>
  );
}
