"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Cloud, Lightning, Moon } from "@phosphor-icons/react";

const MOODS = [
  {
    id: "morning",
    icon: Sun,
    word: "MORNING",
    drink: "Soft espresso",
    phrase: "No rush.",
    note: "opening shot, 08:00",
    src: "photo-1509042239860-f550ce710b93",
    scene: "254, 232, 196",
    dark: false,
  },
  {
    id: "slow",
    icon: Cloud,
    word: "SLOW",
    drink: "Cloudy flat white",
    phrase: "One cup, rainy window.",
    note: "take your time, 12:00",
    src: "photo-1497935586351-b67a49e012bf",
    scene: "196, 199, 197",
    dark: false,
  },
  {
    id: "energy",
    icon: Lightning,
    word: "ENERGY",
    drink: "Iced long black",
    phrase: "Two shots. Cold water.",
    note: "the push, 15:00",
    src: "photo-1517701550927-30cf4ba1dba5",
    scene: "226, 158, 84",
    dark: false,
  },
  {
    id: "evening",
    icon: Moon,
    word: "EVENING",
    drink: "Batch filter",
    phrase: "Something warm. Stay late.",
    note: "last pour, 21:00",
    src: "photo-1502791451862-7bd8c1df43a7",
    scene: "52, 46, 74",
    dark: true,
  },
];

const img = (src: string, w = 1200) =>
  `https://images.unsplash.com/${src}?w=${w}&q=75&auto=format&fit=crop`;

export default function Mood() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mood = MOODS[index];
  const Icon = mood.icon;

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    timer.current = setTimeout(() => setIndex((i) => (i + 1) % MOODS.length), 4200);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, paused]);

  const select = (i: number) => {
    setIndex(i);
    setPaused(true);
    if (timer.current) clearTimeout(timer.current);
    setTimeout(() => setPaused(false), 9000);
  };

  return (
    <section
      id="mood"
      className="relative overflow-hidden px-6 py-28 md:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* mood-coloured ambient blob */}
      <motion.div
        className="pointer-events-none absolute -right-[20%] top-1/3 h-[60vh] w-[60vh] rounded-full"
        animate={{
          background: `radial-gradient(closest-side, rgba(${mood.scene}, 0.4), transparent 70%)`,
        }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ filter: "blur(70px)" }}
      />

      <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-2 lg:gap-24">
        {/* left: title + tabs */}
        <div>
          <h2 className="font-display text-[13vw] font-bold leading-[0.92] tracking-tight text-ink md:text-7xl lg:text-[5.2rem]">
            Your coffee.
            <br />
            <span className="text-outline">Your mood.</span>
          </h2>

          <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-4">
            {MOODS.map((m, i) => {
              const MIcon = m.icon;
              const isActive = i === index;
              return (
                <li key={m.id}>
                  <button
                    onClick={() => select(i)}
                    data-cursor=""
                    className="group flex w-full items-center gap-3 py-2"
                    aria-pressed={isActive}
                  >
                    <span className="text-lg text-ink-soft transition-colors duration-300">
                      <MIcon size={22} weight={isActive ? "fill" : "regular"} />
                    </span>
                    <span
                      className={`font-display font-bold tracking-[0.14em] transition-all duration-500 ${
                        isActive ? "text-3xl text-accent-ink md:text-4xl" : "text-lg text-ink-soft group-hover:text-ink"
                      }`}
                    >
                      {m.word}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* right: scene */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line sm:aspect-[5/6] lg:aspect-[4/5]">
          <AnimatePresence mode="sync">
            <motion.div
              key={mood.id}
              initial={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(12px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={img(mood.src)}
                alt={`${mood.word} — ${mood.drink}`}
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className={`object-cover ${mood.dark ? "brightness-[0.55]" : ""}`}
              />
            </motion.div>
          </AnimatePresence>

          {/* colour overlay */}
          <motion.div
            className="absolute inset-0 mix-blend-multiply"
            animate={{ backgroundColor: `rgba(${mood.scene}, 0.42)` }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

          {/* label chip */}
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-4 py-2 backdrop-blur-md">
            <Icon size={14} weight="fill" className="text-white" />
            <span className="text-[10px] font-bold tracking-[0.24em] text-white">{mood.word}</span>
          </div>

          {/* drink + phrase */}
          <div className="absolute inset-x-0 bottom-0 p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={mood.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-display text-3xl font-bold text-white md:text-4xl">{mood.drink}</p>
                <p className="mt-2 max-w-[26ch] text-sm leading-relaxed text-white/80">{mood.phrase}</p>
                <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
                  {mood.note}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* light shaft */}
          <div className="pointer-events-none absolute -top-24 right-10 h-72 w-40 rotate-[24deg] bg-gradient-to-b from-white/30 to-transparent blur-2xl" />
        </div>
      </div>
    </section>
  );
}
