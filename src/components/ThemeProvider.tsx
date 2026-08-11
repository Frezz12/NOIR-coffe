"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
  clock: string;
  greeting: string;
  modeLabel: string;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function formatClock(d: Date) {
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h.toString().padStart(2, "0")}:${m} ${ampm}`;
}

function getGreeting(d: Date) {
  const h = d.getHours();
  if (h >= 5 && h < 12) return "Good morning.";
  if (h >= 12 && h < 17) return "Good afternoon.";
  if (h >= 17 && h < 22) return "Good evening.";
  return "Stay a little longer.";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "light";
    const t = document.documentElement.getAttribute("data-theme");
    return t === "dark" || t === "light" ? t : "light";
  });
  const [now, setNow] = useState<Date | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("noir-theme", theme);
    } catch {
      /* private mode */
    }
  }, [theme]);

  useEffect(() => {
    const tick = () => {
      setNow(new Date());
      raf.current = window.setTimeout(tick, 30_000);
    };
    tick();
    return () => {
      if (raf.current) window.clearTimeout(raf.current);
    };
  }, []);

  const toggle = useCallback(
    () => setTheme((t) => (t === "light" ? "dark" : "light")),
    []
  );

  const value = useMemo<ThemeContextValue>(() => {
    const d = now ?? new Date();
    return {
      theme,
      toggle,
      clock: formatClock(d),
      greeting: getGreeting(d),
      modeLabel: theme === "light" ? "LIGHT" : "DARK",
    };
  }, [theme, toggle, now]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
