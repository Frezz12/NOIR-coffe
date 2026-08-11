"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

type Card = { type: "photo" | "video"; src?: string; label: string; span?: string };

const CARDS: Card[] = [
  { type: "photo", src: "photo-1554118811-1e0d58224f24", label: "The window" },
  { type: "photo", src: "photo-1445116572660-236099ec97a0", label: "The bar", span: "wide" },
  { type: "video", label: "Noir in motion", span: "tall" },
  { type: "photo", src: "photo-1461988320302-91bde64fc8e4", label: "The corner" },
  { type: "photo", src: "photo-1521017432531-fbd92d768814", label: "The light", span: "wide" },
  { type: "photo", src: "photo-1501339847302-ac426a4a7cbb", label: "The hands" },
  { type: "photo", src: "photo-1449824913935-59a10b8d2000", label: "The evening", span: "wide" },
  { type: "photo", src: "photo-1447933601403-0c6688de566e", label: "The roast" },
];

const img = (src: string, w = 1200) =>
  `https://images.unsplash.com/${src}?w=${w}&q=75&auto=format&fit=crop`;

const sizeCls = (c: Card) => {
  if (c.span === "wide") return "h-[48vh] w-[64vw] sm:h-[52vh] sm:w-[52vh] lg:h-[56vh] lg:w-[64vh]";
  if (c.span === "tall") return "h-[60vh] w-[64vw] sm:h-[64vh] sm:w-[52vh] lg:h-[70vh] lg:w-[48vh]";
  return "h-[46vh] w-[62vw] sm:h-[50vh] sm:w-[46vh] lg:h-[58vh] lg:w-[48vh]";
};

export default function Gallery() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    const tr = track.current;
    if (!el || !tr) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      if (reduce) return;

      const cards = gsap.utils.toArray<HTMLElement>(".gallery-card");
      gsap.set(cards, { filter: "blur(14px)", opacity: 0.4, scale: 0.94 });

      const distance = () => tr.scrollWidth - window.innerWidth + 40;
      const main = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (counter.current)
              counter.current.textContent = `${String(
                Math.min(CARDS.length, Math.round(self.progress * (CARDS.length - 1)) + 1)
              ).padStart(2, "0")}`;
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      cards.forEach((card) => {
        gsap.to(card, {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: main,
            start: "left 90%",
            end: "left 45%",
            scrub: true,
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative overflow-x-auto lg:overflow-hidden"
      aria-label="Inside Noir gallery"
    >
      <div className="sticky top-0 flex min-h-[70vh] flex-col justify-end lg:h-screen lg:justify-center">
        {/* header */}
        <div className="pointer-events-none absolute left-1/2 top-6 z-20 w-full max-w-[1400px] -translate-x-1/2 px-6 lg:top-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-muted">
            Inside Noir
          </p>
          <div className="mt-1 flex items-center justify-between">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
              Walk through.
            </h2>
            <span className="font-display text-sm font-semibold tracking-[0.2em] text-ink-soft tabular-nums">
              <span ref={counter}>01</span> / {String(CARDS.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* track */}
        <div
          ref={track}
          className="flex w-max items-center gap-5 px-6 pb-16 lg:gap-10 lg:pb-0 lg:pl-[12vw] lg:pr-[18vw]"
        >
          {CARDS.map((c, i) => {
            const rotate = i % 2 === 0 ? "lg:-rotate-1" : "lg:rotate-[1.5deg]";
            const overlap = i > 0 && i % 2 === 1 ? "lg:-ml-10" : "lg:-ml-4";
            return (
              <article
                key={i}
                data-cursor={c.type === "video" ? "PLAY" : "VIEW"}
                className={`gallery-card relative shrink-0 overflow-hidden rounded-[24px] border border-line bg-bg-soft shadow-[0_30px_60px_-40px_var(--glass-shadow)] ${sizeCls(c)} ${rotate} ${overlap}`}
              >
                {c.type === "photo" ? (
                  <Image
                    src={img(c.src!)}
                    alt={c.label}
                    fill
                    sizes="(min-width:1024px) 55vh, 80vw"
                    className="img-dark object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#241f16] to-[#0f0e0b]">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md">
                      <Play size={24} weight="fill" className="ml-1 text-white" />
                    </span>
                    <span className="text-[10px] font-semibold tracking-[0.3em] text-white/70">
                      WATCH · 01:24
                    </span>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/55 to-transparent p-4 pt-10">
                  <span className="font-display text-sm font-semibold text-white">{c.label}</span>
                  <span className="font-display text-[10px] font-semibold tracking-[0.2em] text-white/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* progress bar */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 hidden h-px w-56 -translate-x-1/2 overflow-hidden bg-line lg:block">
          <div
            ref={bar}
            className="h-full w-full origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
