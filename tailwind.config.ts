import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lamp: {
          bg: "var(--bg)",
          ink: "var(--ink)",
          muted: "var(--muted)",
          line: "var(--line)",
          panel: "var(--panel)",
          "panel-hover": "var(--panel-hover)",
          brass: "var(--accent-brass)",
          "brass-hover": "var(--accent-brass-hover)",
          gold: "var(--accent-gold)",
          enamel: "var(--accent-enamel)",
          "enamel-bright": "var(--accent-enamel-bright)",
        },
        pakcat: {
          bg: "var(--bg)",
          surface: "var(--panel)",
          "surface-hover": "var(--panel-hover)",
          border: "var(--line)",
          "border-strong": "var(--border-strong)",
          accent: "var(--accent-brass)",
          "accent-code": "var(--accent-gold)",
          "accent-burgundy": "var(--accent-enamel)",
          "accent-crimson": "var(--accent-enamel-bright)",
          "text-primary": "var(--ink)",
          "text-secondary": "var(--muted)",
          "text-subtle": "var(--muted)",
        },
        velvet: {
          DEFAULT: "var(--bg)",
          surface: "var(--panel)",
          elevated: "var(--panel-hover)",
          card: "var(--panel)",
        },
        wine: {
          DEFAULT: "var(--accent-enamel)",
          light: "var(--accent-enamel-bright)",
          dark: "var(--bg)",
          subtle: "var(--panel)",
          border: "var(--line)",
          borderStrong: "var(--border-strong)",
        },
        champagne: {
          DEFAULT: "var(--accent-gold)",
          muted: "var(--muted)",
          subtle: "var(--muted)",
        },
        bg: {
          primary: "var(--bg)",
          surface: "var(--panel)",
          elevated: "var(--panel-hover)",
        },
        border: {
          subtle: "var(--line)",
          strong: "var(--border-strong)",
        },
        text: {
          primary: "var(--ink)",
          muted: "var(--muted)",
          subtle: "var(--muted)",
        },
        accent: {
          primary: "var(--accent-brass)",
          secondary: "var(--accent-gold)",
        },
        status: {
          active: "var(--accent-brass)",
          research: "var(--accent-gold)",
          draft: "var(--muted)",
          archived: "var(--muted)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Space Grotesk", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Menlo", "monospace"],
        serif: ["var(--font-serif-display)", "Playfair Display", "Georgia", "serif"],
        script: ["var(--font-script)", "Alex Brush", "cursive"],
      },
      maxWidth: {
        content: "var(--max-width-content)",
        wide: "var(--max-width-wide)",
      },
      animation: {
        "fade-in": "fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-down": "slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
