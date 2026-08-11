"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";

const ITEMS = [
  {
    n: "01",
    name: "Espresso",
    price: "€2.5",
    note: "Single origin, 9 bars, 28 seconds.",
    src: "photo-1442512595331-e89e73853f31",
    tint: "34, 24, 14",
  },
  {
    n: "02",
    name: "Flat White",
    price: "€4.2",
    note: "Double ristretto under velvet microfoam.",
    src: "photo-1509042239860-f550ce710b93",
    tint: "96, 72, 42",
  },
  {
    n: "03",
    name: "Pistachio Latte",
    price: "€5.0",
    note: "Slow milk, Sicilian pistachio cream.",
    src: "photo-1512568400610-62da28bc8a13",
    tint: "110, 108, 64",
  },
  {
    n: "04",
    name: "Croissant",
    price: "€3.5",
    note: "Baked at 6am. Butter first, flour second.",
    src: "photo-1555507036-ab1f4038808a",
    tint: "150, 96, 48",
  },
  {
    n: "05",
    name: "Tiramisu",
    price: "€5.5",
    note: "Mascarpone, savoiardi, a slow dusting.",
    src: "photo-1528975604071-b4dc52a2d18c",
    tint: "96, 72, 58",
  },
];

const img = (src: string, w = 900) =>
  `https://images.unsplash.com/${src}?w=${w}&q=75&auto=format&fit=crop`;

export default function Menu() {
  const [active, setActive] = useState(0);
  const panel = useRef<HTMLDivElement>(null);

  const lx = useMotionValue(0);
  const ly = useMotionValue(0);
  const slx = useSpring(lx, { stiffness: 300, damping: 28 });
  const sly = useSpring(ly, { stiffness: 300, damping: 28 });
  const [lensOn, setLensOn] = useState(false);

  const item = ITEMS[active];

  return (
    <section id="menu" className="relative mx-auto max-w-[1400px] px-6 py-28 md:py-40">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        {/* list */}
        <div>
          <h2 className="font-display text-5xl font-bold tracking-tight text-ink md:text-6xl">
            Today&apos;s <span className="italic text-accent-ink">menu</span>
          </h2>
          <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ink-soft md:text-base">
            Five things we make well. Hover one to see what it looks like before you ask.
          </p>

          <ul className="mt-12 divide-y divide-line border-y border-line">
            {ITEMS.map((it, i) => {
              const isActive = i === active;
              return (
                <li key={it.n}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    data-cursor=""
                    className="group flex w-full items-baseline gap-4 py-6 text-left transition-all duration-500 md:py-7"
                    aria-pressed={isActive}
                  >
                    <span
                      className={`font-display text-sm font-semibold tracking-[0.2em] transition-colors duration-500 ${
                        isActive ? "text-accent-ink" : "text-muted"
                      }`}
                    >
                      {it.n}
                    </span>
                    <span
                      className={`font-display font-bold tracking-tight text-ink transition-all duration-500 ${
                        isActive ? "text-3xl md:text-4xl" : "text-xl text-ink-soft group-hover:text-ink md:text-2xl"
                      }`}
                    >
                      {it.name}
                    </span>
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="ml-auto font-display text-sm font-bold tracking-[0.08em] text-accent-ink tabular-nums"
                        >
                          {it.price}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* image scene */}
        <div
          ref={panel}
          onMouseMove={(e) => {
            const r = panel.current!.getBoundingClientRect();
            lx.set(e.clientX - r.left);
            ly.set(e.clientY - r.top);
          }}
          onMouseEnter={() => setLensOn(true)}
          onMouseLeave={() => setLensOn(false)}
          className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-bg-soft lg:aspect-auto lg:min-h-[640px] lg:self-stretch"
          data-cursor=""
        >
          {/* tint wash */}
          <motion.div
            className="absolute inset-0 transition-colors duration-700"
            animate={{ backgroundColor: `rgba(${item.tint}, 0.16)` }}
          />

          <AnimatePresence mode="sync">
            <motion.div
              key={item.src}
              initial={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={img(item.src)}
                alt={item.name}
                fill
                sizes="(min-width:1024px) 55vw, 100vw"
                className="img-dark object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

          {/* caption */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
            <div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={item.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="font-display text-xl font-bold text-white md:text-2xl"
                >
                  {item.name}
                </motion.p>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p
                  key={item.note}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="mt-1 max-w-[30ch] text-xs leading-relaxed text-white/70"
                >
                  {item.note}
                </motion.p>
              </AnimatePresence>
            </div>
            <span className="font-display text-sm font-semibold tracking-[0.2em] text-white/80 tabular-nums">
              {item.n} / 05
            </span>
          </div>

          {/* liquid-glass lens */}
          <motion.div
            className="pointer-events-none absolute z-10 h-52 w-52 rounded-full border border-white/25"
            style={{
              left: slx,
              top: sly,
              x: "-50%",
              y: "-50%",
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.16), rgba(255,255,255,0.02) 70%)",
              backdropFilter: "blur(9px) saturate(1.5)",
              WebkitBackdropFilter: "blur(9px) saturate(1.5)",
            }}
            animate={{ scale: lensOn ? 1 : 0, opacity: lensOn ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
          >
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[9px] font-bold tracking-[0.28em] text-white/90">
              TASTE
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
