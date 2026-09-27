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
        pakcat: {
          bg: "#100306",
          surface: "#1B060D",
          "surface-hover": "#280A15",
          border: "#3B121E",
          "border-strong": "#5A1A2C",
          accent: "#E27D95",
          "accent-code": "#F0A0B5",
          "accent-burgundy": "#80142B",
          "accent-crimson": "#9B223D",
          "text-primary": "#F7ECEF",
          "text-secondary": "#D8B8C1",
          "text-subtle": "#9E7480",
        },
        velvet: {
          DEFAULT: "#0C0608",
          surface: "#140A0D",
          elevated: "#1F1015",
          card: "#160B0F",
        },
        wine: {
          DEFAULT: "#801D2C",
          light: "#A6263A",
          dark: "#4A121A",
          subtle: "#261318",
          border: "#2D161C",
          borderStrong: "#4A202A",
        },
        champagne: {
          DEFAULT: "#F5EBE1",
          muted: "#D9C7B8",
          subtle: "#8E7C79",
        },
        bg: {
          primary: "hsl(var(--bg-primary) / <alpha-value>)",
          surface: "hsl(var(--bg-surface) / <alpha-value>)",
          elevated: "hsl(var(--bg-surface-elevated) / <alpha-value>)",
        },
        border: {
          subtle: "hsl(var(--border-subtle) / <alpha-value>)",
          strong: "hsl(var(--border-strong) / <alpha-value>)",
        },
        text: {
          primary: "hsl(var(--text-primary) / <alpha-value>)",
          muted: "hsl(var(--text-muted) / <alpha-value>)",
          subtle: "hsl(var(--text-subtle) / <alpha-value>)",
        },
        accent: {
          primary: "hsl(var(--accent-primary) / <alpha-value>)",
          secondary: "hsl(var(--accent-secondary) / <alpha-value>)",
        },
        status: {
          active: "hsl(var(--status-active) / <alpha-value>)",
          research: "hsl(var(--status-research) / <alpha-value>)",
          draft: "hsl(var(--status-draft) / <alpha-value>)",
          archived: "hsl(var(--status-archived) / <alpha-value>)",
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
