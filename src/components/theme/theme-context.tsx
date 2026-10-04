"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

const STORAGE_KEY = "ashish_site_theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  const applyTheme = useCallback((newTheme: Theme, persist = true) => {
    setThemeState(newTheme);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = newTheme;
      if (newTheme === "light") {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      }

      // Sync any pull-lamp web components
      const lamps = document.querySelectorAll("pull-lamp");
      lamps.forEach((lamp) => {
        lamp.toggleAttribute("on", newTheme === "light");
      });
    }

    if (persist && typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, newTheme);
      } catch {
        // Ignore localStorage errors
      }
    }
  }, []);

  useEffect(() => {
    // Initial theme detection
    let initialTheme: Theme = "dark";
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === "light" || stored === "dark") {
        initialTheme = stored;
      }
    } catch {
      // Default to dark
    }

    applyTheme(initialTheme, false);

    // Listen for themechange events emitted by pull-lamp
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: Theme }>;
      if (customEvent.detail?.theme) {
        applyTheme(customEvent.detail.theme, true);
      }
    };

    document.addEventListener("themechange", handleThemeChange);
    return () => {
      document.removeEventListener("themechange", handleThemeChange);
    };
  }, [applyTheme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      applyTheme(newTheme, true);
    },
    [applyTheme]
  );

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark", true);
  }, [applyTheme, theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
