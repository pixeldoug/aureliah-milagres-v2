"use client";

import { motion } from "motion/react";
import { band, stages } from "@/lib/content";
import { inView } from "@/lib/motion";

export function Band() {
  return (
    <section className="border-t border-white/10 bg-ink px-5 py-28 text-white md:px-8 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-20 md:grid-cols-2">
        <motion.div {...inView}>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
            Palco
          </p>
          <h2 className="mt-3 font-display text-5xl font-semibold uppercase tracking-[-0.04em]">
            A banda
          </h2>
          <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {band.map((member) => (
              <li
                key={member.name}
                className="flex flex-col gap-1 py-5 md:flex-row md:items-baseline md:justify-between"
              >
                <span className="font-display text-2xl font-semibold uppercase tracking-[-0.03em]">
                  {member.name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                  {member.role}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...inView} transition={{ ...inView.transition, delay: 0.1 }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
            Recentes
          </p>
          <h2 className="mt-3 font-display text-5xl font-semibold uppercase tracking-[-0.04em]">
            Palcos
          </h2>
          <ul className="mt-10 space-y-0">
            {stages.map((stage) => (
              <li
                key={stage.place}
                className="flex items-baseline justify-between gap-4 border-b border-white/10 py-5"
              >
                <span className="text-lg uppercase tracking-[-0.02em]">{stage.place}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                  {stage.when}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/55">
            Cada apresentação se ajusta ao público — baile, casa de show ou festival.
            Próximas datas sob consulta.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
