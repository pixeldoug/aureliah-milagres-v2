"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { releases } from "@/lib/content";
import { inView } from "@/lib/motion";

const chapters = [
  {
    n: "01",
    kicker: "O ritmo que impõe",
    title: "Forró litorâneo",
    body: "Pé de serra com sal no ar. Xote, baile e sanfona — o chão de onde a voz sai.",
  },
  {
    n: "02",
    kicker: "Não reagimos à moda",
    title: "Reggae",
    body: "A união com o reggae é o pulso. Marca a performance e o tempo das canções.",
  },
  {
    n: "03",
    kicker: "Cada verso, uma decisão",
    title: "MPB",
    body: "O flerte contínuo com a canção brasileira. Autorais e clássicos no mesmo palco.",
  },
];

export function Music() {
  return (
    <section id="musica" className="scroll-mt-24 border-t border-white/10 bg-ink px-5 py-28 text-white md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div {...inView} className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
              Trabalhos
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em]">
              Uma coleção de obsessões
            </h2>
          </div>
          <a
            href="https://open.spotify.com/artist/07BH1WsxplcXWxhB1oQs7t"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 hover:text-white"
          >
            Abrir no Spotify →
          </a>
        </motion.div>

        <ul className="mt-20 grid gap-12 border-t border-white/10 md:grid-cols-3">
          {chapters.map((item, i) => (
            <motion.li
              key={item.n}
              {...inView}
              transition={{ ...inView.transition, delay: i * 0.08 }}
              className="border-white/10 pt-8 md:border-l md:pl-8 md:first:border-l-0 md:first:pl-0"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                {item.n}
              </p>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                {item.kicker}
              </p>
              <h3 className="mt-3 font-display text-4xl font-semibold uppercase tracking-[-0.04em]">
                {item.title}
              </h3>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{item.body}</p>
            </motion.li>
          ))}
        </ul>

        <div className="mt-20 overflow-hidden rounded-[2px] border border-white/10">
          <iframe
            title="Aureliah Milagres no Spotify"
            src="https://open.spotify.com/embed/artist/07BH1WsxplcXWxhB1oQs7t?utm_source=generator&theme=0"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="block"
          />
        </div>

        <ul className="mt-16 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {releases.map((release) => (
            <li key={release.title} className="group bg-ink p-4">
              <div className="relative aspect-[4/5] overflow-hidden">
                {release.cover ? (
                  <Image
                    src={release.cover}
                    alt={`Capa de ${release.title}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover grayscale transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                ) : (
                  <div className="flex h-full flex-col justify-between border border-white/15 p-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                      {release.year}
                    </span>
                    <p className="font-display text-4xl font-semibold uppercase leading-none tracking-[-0.04em]">
                      {release.title}
                    </p>
                  </div>
                )}
              </div>
              <p className="mt-4 font-display text-xl font-semibold uppercase tracking-[-0.03em]">
                {release.title}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                {release.kind} · {release.year}
              </p>
              {release.cover === null ? (
                <p className="mt-2 text-xs text-white/45">{release.highlights.join(" · ")}</p>
              ) : (
                <a
                  href={release.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-white/70 hover:text-white"
                >
                  Ouvir single →
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
