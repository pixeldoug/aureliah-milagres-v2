"use client";

import { useRef } from "react";
import { useMotionValue } from "motion/react";
import { useLenis } from "lenis/react";
import { Hero } from "@/components/Hero";
import { Wordmark } from "@/components/Wordmark";

export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollYProgress = useMotionValue(0);

  useLenis(() => {
    const el = ref.current;
    if (!el) return;
    const { top } = el.getBoundingClientRect();
    const hero = el.firstElementChild as HTMLElement | null;
    const span = hero?.offsetHeight || window.innerHeight;
    // 0 = hero in view, 1 = section 2 fully covering the sticky hero
    scrollYProgress.set(Math.min(1, Math.max(0, -top / span)));
  });

  return (
    <div ref={ref} className="relative">
      <Hero scrollProgress={scrollYProgress} videoRef={videoRef} />
      <Wordmark videoRef={videoRef} scrollProgress={scrollYProgress} />
    </div>
  );
}
