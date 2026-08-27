"use client";

import { motion } from "motion/react";
import { bio } from "@/lib/content";
import { inView } from "@/lib/motion";

export function About() {
  return (
    <section id="sobre" className="scroll-mt-24 bg-ink px-5 py-28 text-white md:px-8 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[0.85fr_1.15fr]">
        <motion.div {...inView}>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
            Sobre
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em]">
            Forró que namora o mar
          </h2>
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
            {bio.quote.source}
          </p>
          <blockquote className="mt-3 max-w-sm font-display text-2xl font-medium uppercase leading-snug tracking-[-0.03em] text-white/80">
            {bio.quote.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </blockquote>
        </motion.div>
        <motion.div
          {...inView}
          transition={{ ...inView.transition, delay: 0.12 }}
          className="flex flex-col justify-center gap-6 text-[15px] leading-relaxed text-white/70 md:text-base"
        >
          <p className="text-white">{bio.lede}</p>
          {bio.paragraphs.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
