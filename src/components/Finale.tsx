"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { ArrowRight, InstagramLogo, Envelope } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

export default function Finale() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "#final-n",
        { scale: 0.4, opacity: 0.12, yPercent: 20 },
        {
          scale: 1,
          opacity: 0.6,
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.6,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={ref} id="contact" className="relative overflow-hidden px-6 pt-32 md:pt-44">
      {/* giant N */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span
          id="final-n"
          className="text-outline font-display select-none text-[80vw] font-bold leading-none opacity-0"
        >
          N
        </span>
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center text-center">
        <h2 className="font-display text-[15vw] font-bold leading-[0.95] tracking-tight text-ink md:text-9xl">
          See you
          <br />
          at <span className="italic text-accent-ink">Noir.</span>
        </h2>

        <a
          href="mailto:hello@noir.coffee?subject=Table%20for%20two"
          data-cursor=""
          className="group mt-12 inline-flex items-center gap-3 rounded-full border border-line-strong bg-bg/40 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-ink backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-bg active:scale-[0.98]"
        >
          Book a table
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      {/* footer bar */}
      <div className="relative z-10 mx-auto mt-28 max-w-[1400px] border-t border-line py-8 md:mt-36">
        <div className="flex flex-col items-center justify-between gap-6 text-[11px] font-medium tracking-[0.18em] uppercase text-muted md:flex-row">
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor=""
              className="flex items-center gap-2 transition-colors duration-300 hover:text-accent-ink"
            >
              <InstagramLogo size={14} /> Instagram
            </a>
            <a
              href="mailto:hello@noir.coffee"
              data-cursor=""
              className="flex items-center gap-2 transition-colors duration-300 hover:text-accent-ink"
            >
              <Envelope size={14} /> Email
            </a>
          </div>
          <span>Warsaw · 08—22</span>
          <span>© 2026 Noir</span>
        </div>
      </div>
    </footer>
  );
}
