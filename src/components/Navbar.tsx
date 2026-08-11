"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Sun, Moon } from "@phosphor-icons/react";
import { useTheme } from "@/components/ThemeProvider";
import { scrollToId } from "@/lib/smooth";

const LINKS = [
  { id: "menu", label: "MENU" },
  { id: "about", label: "ABOUT" },
  { id: "visit", label: "VISIT" },
];

export default function Navbar() {
  const { theme, toggle, clock, modeLabel } = useTheme();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={`glass flex items-center gap-2 rounded-full py-2 pl-6 pr-2 transition-all duration-500 ${
          scrolled ? "max-w-[540px]" : "max-w-[680px]"
        }`}
      >
        <button
          onClick={() => scrollToId("top")}
          data-cursor=""
          className="font-display text-lg font-bold tracking-[0.28em] text-ink"
        >
          NOIR
        </button>

        <span className="mx-2 h-4 w-px bg-line-strong" />

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              data-cursor=""
              className="rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft transition-colors duration-300 hover:text-accent-ink"
            >
              {l.label}
            </button>
          ))}
        </div>

        <span className="mx-2 hidden h-4 w-px bg-line-strong sm:block" />
        <span className="hidden text-[11px] font-medium tracking-[0.14em] text-muted tabular-nums sm:block">
          {clock}
        </span>

        <button
          onClick={toggle}
          data-cursor=""
          className="group ml-1 flex items-center gap-2 rounded-full bg-ink/5 px-3 py-2 transition-colors duration-300 hover:bg-ink/10 dark:bg-white/5 dark:hover:bg-white/10"
          aria-label="Toggle dark / light mode"
        >
          {theme === "light" ? (
            <Sun size={14} weight="bold" className="text-accent" />
          ) : (
            <Moon size={14} weight="fill" className="text-accent" />
          )}
          <span className="text-[10px] font-semibold tracking-[0.18em] text-ink-soft">
            {modeLabel}
          </span>
        </button>
      </motion.nav>
    </header>
  );
}
