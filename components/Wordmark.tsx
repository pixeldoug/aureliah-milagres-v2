"use client";

import type { RefObject } from "react";
import type { MotionValue } from "motion/react";
import { artist } from "@/lib/content";
import { type PanelId, useMenu } from "@/components/menu-context";
import { ReededSectionBg } from "@/components/ReededGlass";

const links: { id: PanelId; label: string }[] = [
  { id: "sobre", label: "Sobre" },
  { id: "musica", label: "Música" },
  { id: "videos", label: "Vídeos" },
  { id: "contato", label: "Contato" },
];

export function Wordmark({
  videoRef,
  scrollProgress,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
  scrollProgress: MotionValue<number>;
}) {
  const { openPanel } = useMenu();

  return (
    <section
      id="nome"
      className="wordmark-fx relative z-10 flex min-h-svh flex-col px-5 py-10 text-white md:px-8"
    >
      <ReededSectionBg videoRef={videoRef} scrollProgress={scrollProgress} />

      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80 drop-shadow-[0_1px_10px_rgba(0,0,0,0.55)]">
          <p className="max-w-[14rem]">Artista independente.</p>
          <p className="max-w-[14rem] text-right">
            Ao vivo + autoral
            <br />
            Shows + eventos.
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
          <h2 className="font-display w-full text-[clamp(3.2rem,14vw,11.5rem)] font-semibold uppercase leading-[0.78] tracking-[-0.07em] text-white drop-shadow-[0_10px_36px_rgba(0,0,0,0.55)]">
            <span className="block">Aureliah</span>
            <span className="block">Milagres</span>
          </h2>

          <nav className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => openPanel(link.id)}
                className="transition-opacity hover:opacity-50"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <ul className="mt-6 flex flex-wrap justify-center gap-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]">
            {artist.socials.slice(0, 4).map((social) => (
              <li key={social.name}>
                <a href={social.href} target="_blank" rel="noreferrer" className="hover:text-white">
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
