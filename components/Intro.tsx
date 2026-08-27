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
    const { top, height } = el.getBoundingClientRect();
    scrollYProgress.set(Math.min(1, Math.max(0, -top / height)));
  });

  return (
    <div ref={ref} className="relative">
      <Hero scrollProgress={scrollYProgress} videoRef={videoRef} />
      <Wordmark videoRef={videoRef} scrollProgress={scrollYProgress} />
    </div>
  );
}
