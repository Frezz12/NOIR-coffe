"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Slogan() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.set("#made-for", { opacity: 0, scale: 0.5, filter: "blur(8px)" });
      gsap.set("#slow-moments", { opacity: 0, y: 90, filter: "blur(12px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
        },
      });
      tl.to("#cof", { xPercent: -55 }, 0)
        .to("#fee", { xPercent: 55 }, 0)
        .to("#made-for", { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.25 }, 0.28)
        .to("#slow-moments", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.25 }, 0.5)
        .to("#giant-n", { rotate: 360, yPercent: 14 }, 0);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden">
        {/* giant N */}
        <div
          id="giant-n"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-outline font-display select-none text-[46vw] font-bold leading-none opacity-60">
            N
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <h2 className="font-display font-bold leading-none tracking-tight text-ink">
            <span className="relative block text-[11vw] leading-[1.05] md:text-[7.5vw]">
              <span id="cof" className="inline-block">
                COF
              </span>
              <span id="fee" className="inline-block">
                FEE
              </span>
              <span
                id="made-for"
                className="absolute left-1/2 top-[0.72em] -translate-x-1/2 whitespace-nowrap text-[0.36em] font-medium lowercase italic tracking-tight text-accent-ink"
              >
                made for
              </span>
            </span>
            <span id="slow-moments" className="block pt-2 text-[7.5vw] leading-[1.05] md:text-[5vw]">
              slow moments.
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}
