"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

export default function Cursor() {
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return fine && !reduce;
  });
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.55 });
  const ry = useSpring(y, { stiffness: 520, damping: 42, mass: 0.55 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest?.("[data-cursor]") as HTMLElement | null;
      if (t) {
        setLabel(t.getAttribute("data-cursor") || "");
        setHovering(true);
      } else {
        setLabel("");
        setHovering(false);
      }
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringScale = pressed ? 0.8 : hovering ? 2.6 : 1;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
      <motion.div
        className="fixed top-0 left-0 z-[91] flex h-2 w-2 items-center justify-center rounded-full bg-accent"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[90] flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-bg/30 backdrop-blur-[2px]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: ringScale }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {hovering && label ? (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-display text-[9px] font-semibold tracking-[0.18em] text-ink"
            >
              {label}
            </motion.span>
          ) : (
            <motion.span
              key="dot"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
