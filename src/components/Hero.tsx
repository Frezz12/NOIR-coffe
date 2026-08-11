"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Cup from "@/components/Cup";
import { useTheme } from "@/components/ThemeProvider";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { clock, greeting } = useTheme();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const tiltX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const tiltY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const chip1X = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const chip1Y = useTransform(sy, [-0.5, 0.5], [-12, 12]);
  const chip2X = useTransform(sx, [-0.5, 0.5], [24, -24]);
  const chip2Y = useTransform(sy, [-0.5, 0.5], [14, -14]);
  const chip3X = useTransform(sx, [-0.5, 0.5], [-30, 30]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let ctx: gsap.Context | undefined;
    if (!reduce) {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        tl.to(".hero-cup", { xPercent: 46, rotate: 12, opacity: 0.15 }, 0)
          .to(".hero-title", { y: -90, opacity: 0 }, 0)
          .to(".hero-sub", { y: -30, opacity: 0 }, 0)
          .to(".hero-chip", { yPercent: -80, opacity: 0, stagger: 0.06 }, 0);
      }, el);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      ctx?.revert();
    };
  }, [mx, my]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* soft ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 transition-colors duration-1000"
        style={{
          background:
            "radial-gradient(closest-side, var(--accent) 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.14,
        }}
      />

      {/* floating chips */}
      <motion.div
        className="hero-chip glass absolute left-[8%] top-[30%] hidden items-center gap-2 rounded-full px-4 py-2 lg:flex"
        style={{ x: chip1X, y: chip1Y }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="text-[10px] font-semibold tracking-[0.22em] text-ink-soft">
          EST. 2026 · WARSAW
        </span>
      </motion.div>
      <motion.div
        className="hero-chip glass absolute right-[8%] bottom-[32%] hidden rounded-2xl px-4 py-3 lg:block"
        style={{ x: chip2X, y: chip2Y }}
      >
        <p className="text-[9px] font-medium tracking-[0.22em] text-muted">OPEN TODAY</p>
        <p className="font-display text-sm font-bold tracking-[0.1em] text-ink">08:00 — 22:00</p>
      </motion.div>
      <motion.div
        className="hero-chip absolute right-[16%] top-[24%] hidden animate-[float-drift_9s_ease-in-out_infinite] rounded-full border border-line-strong/40 bg-bg-soft px-3 py-2 lg:block"
        style={{ x: chip3X }}
      >
        <span className="text-[10px] tracking-[0.22em] text-ink-soft">52.2297° N</span>
      </motion.div>

      {/* headline */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-[11px] font-medium uppercase tracking-[0.5em] text-muted"
        >
          coffee · breakfast · slow mornings
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="hero-title font-display text-[26vw] font-bold leading-[0.9] tracking-[0.02em] text-ink sm:text-[19vw] lg:text-[15vw]"
        >
          NOIR
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hero-sub mt-6 max-w-[30ch] text-sm leading-relaxed text-ink-soft md:text-base"
        >
          A small coffee place on Bracka street. Espresso, pastry and long mornings — poured slow, priced honest.
        </motion.p>
      </div>

      {/* the cup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="hero-cup relative z-0 -mt-2 w-[240px] sm:w-[300px] lg:w-[340px]"
        style={{ perspective: 900 }}
      >
        <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}>
          <Cup className="h-auto w-full" />
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-[9px] font-semibold uppercase tracking-[0.4em] text-muted">
          scroll to discover
        </span>
        <span className="block h-10 w-px overflow-hidden bg-line">
          <span className="block h-full w-full animate-[scroll-line_2s_ease-in-out_infinite] bg-accent" />
        </span>
      </div>

      {/* clock / greeting */}
      <div className="glass absolute bottom-8 left-6 hidden flex-col gap-0.5 rounded-2xl px-4 py-3 lg:flex">
        <span className="font-display text-sm font-bold tracking-[0.1em] text-ink tabular-nums">
          {clock}
        </span>
        <span className="text-[9px] font-medium tracking-[0.22em] text-muted">{greeting}</span>
      </div>
    </section>
  );
}
