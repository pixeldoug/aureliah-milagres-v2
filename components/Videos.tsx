"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { videos } from "@/lib/content";
import { easeFramer, inView } from "@/lib/motion";

export function Videos() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="videos" className="scroll-mt-24 bg-ink px-5 py-28 text-white md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div {...inView}>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
            Journal
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em]">
            No palco e no clipe
          </h2>
        </motion.div>

        <ul className="mt-16 grid gap-10 md:grid-cols-2">
          {videos.map((video, i) => (
            <motion.li key={video.id} {...inView} transition={{ ...inView.transition, delay: (i % 2) * 0.08 }}>
              <button type="button" onClick={() => setActive(video.id)} className="group w-full text-left">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={video.thumb}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover grayscale transition duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                  <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                    {String(i + 1).padStart(3, "0")}
                  </span>
                </div>
                <p className="mt-4 font-display text-2xl font-semibold uppercase tracking-[-0.03em]">
                  {video.title}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                  {video.meta}
                </p>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      {active ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: easeFramer }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Vídeo"
          onClick={() => setActive(null)}
        >
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video bg-black">
              <iframe
                title="YouTube"
                src={`https://www.youtube-nocookie.com/embed/${active}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70"
            >
              Fechar
            </button>
          </div>
        </motion.div>
      ) : null}
    </section>
  );
}
