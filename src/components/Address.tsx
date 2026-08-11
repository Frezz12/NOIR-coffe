"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, MapPin } from "@phosphor-icons/react";
import { useTheme } from "@/components/ThemeProvider";

export default function Address() {
  const ref = useRef<HTMLElement>(null);
  const { greeting, clock } = useTheme();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const mapX = useTransform(sx, [-0.5, 0.5], [-22, 22]);
  const mapY = useTransform(sy, [-0.5, 0.5], [-14, 14]);

  return (
    <section
      id="visit"
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative mx-auto max-w-[1400px] px-6 py-28 md:py-40"
    >
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        {/* copy */}
        <div>
          <h2 className="font-display text-[15vw] font-bold leading-[0.9] tracking-tight text-ink md:text-8xl lg:text-[7rem]">
            Come say
            <br />
            <span className="italic text-accent-ink">hi.</span>
          </h2>
          <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-ink-soft md:text-base">
            Bracka 12, Warszawa. Two doors from the park, hard to miss, easy to stay.
          </p>

          <div className="mt-10 grid max-w-md grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-muted">
                Open today
              </p>
              <p className="mt-2 font-display text-lg font-bold tracking-[0.06em] text-ink">
                08:00 — 22:00
              </p>
            </div>
            <div className="glass rounded-2xl p-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-muted">
                Now
              </p>
              <p className="mt-2 font-display text-lg font-bold tracking-[0.06em] text-ink tabular-nums">
                {clock}
              </p>
              <p className="text-[10px] text-muted">{greeting}</p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Bracka+12,+Warsaw"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor=""
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-bg transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] dark:bg-ink dark:text-bg"
          >
            Get directions
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* abstract map */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-line bg-bg-soft sm:aspect-[16/10]">
          {/* street grid */}
          <motion.div
            className="absolute inset-0"
            style={{ x: mapX, y: mapY, scale: 1.12 }}
          >
            <div
              className="absolute inset-0 opacity-60 dark:opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
              }}
            />
            {/* diagonal avenue */}
            <div
              className="absolute -inset-x-20 top-[18%] h-px rotate-[8deg] bg-line-strong/60"
              style={{ boxShadow: "0 80px 0 var(--line)", transform: "rotate(8deg)" }}
            />
            <div
              className="absolute -inset-y-20 left-[64%] w-px rotate-[70deg] bg-line-strong/40"
            />
            {/* river */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-accent/15 to-transparent" />
            {/* park block */}
            <div className="absolute left-[8%] top-[22%] h-28 w-36 rounded-[4px] border border-accent/25 bg-accent/10" />
            <div className="absolute right-[12%] bottom-[14%] h-20 w-24 rounded-[4px] border border-line-strong/50 bg-bg-deep/50" />
          </motion.div>

          {/* street labels */}
          <span className="absolute left-[16%] top-[10%] text-[9px] font-medium uppercase tracking-[0.3em] text-muted/70">
            Bracka
          </span>
          <span className="absolute right-[22%] top-[46%] rotate-90 text-[9px] font-medium uppercase tracking-[0.3em] text-muted/70">
            Świętokrzyska
          </span>

          {/* centre marker */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="relative mx-auto flex h-4 w-4 items-center justify-center">
              <span className="absolute h-4 w-4 rounded-full bg-accent/50" style={{ animation: "pulse-dot 2.4s ease-out infinite" }} />
              <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <p className="mt-3 font-display text-2xl font-bold tracking-[0.2em] text-ink">
              NOIR
            </p>
            <p className="mt-1 flex items-center justify-center gap-1 text-[10px] font-medium tracking-[0.18em] text-muted">
              <MapPin size={11} className="text-accent" />
              52.2297° N · 21.0122° E
            </p>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
