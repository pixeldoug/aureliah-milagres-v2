"use client";

import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { artist } from "@/lib/content";
import { ReachButton } from "@/components/ReachButton";
import { useMenu } from "@/components/menu-context";
import type { RefObject } from "react";

const corner =
  "font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.65)]";

function SocialIcon({
  name,
  className = "h-3.5 w-3.5 shrink-0",
}: {
  name: (typeof artist.socials)[number]["name"];
  className?: string;
}) {
  switch (name) {
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M23 12.2s0-3.2-.4-4.7c-.2-.8-.9-1.5-1.7-1.7C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.9.4c-.8.2-1.5.9-1.7 1.7C1 9 1 12.2 1 12.2s0 3.2.4 4.7c.2.8.9 1.5 1.7 1.7 1.7.4 8.9.4 8.9.4s7.2 0 8.9-.4c.8-.2 1.5-.9 1.7-1.7.4-1.5.4-4.7.4-4.7zM9.8 15.5V8.9l6.2 3.3-6.2 3.3z" />
        </svg>
      );
    case "Spotify":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M12 1.6C6.3 1.6 1.6 6.3 1.6 12S6.3 22.4 12 22.4 22.4 17.7 22.4 12 17.7 1.6 12 1.6zm4.6 15c-.2.3-.5.4-.8.2-2.3-1.4-5.1-1.7-8.5-.9-.3.1-.6-.1-.7-.4-.1-.3.1-.6.4-.7 3.7-.9 6.8-.5 9.4 1.1.3.1.4.5.2.7zm1.2-2.7c-.2.3-.6.5-1 .3-2.6-1.6-6.6-2.1-9.7-1.1-.4.1-.8-.1-.9-.5-.1-.4.1-.8.5-.9 3.5-1.1 8-0.5 11 1.3.4.2.5.6.1 0.9zm.1-2.8c-3.1-1.9-8.3-2-11.3-1.1-.4.1-.9-.1-1-.6-.1-.4.1-.9.6-1 3.5-1.1 9.2-.9 12.8 1.3.4.2.5.8.3 1.2-.3.3-.8.4-1.2.2z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
        </svg>
      );
    case "X":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
          <path d="M14.7 10.3 22.4 1.5h-1.8l-6.7 7.6L8.5 1.5H1.8l8.1 11.6L1.8 22.5h1.8l7.1-8.1 5.6 8.1h6.7l-8.3-12.2zm-2.5 2.8-.8-1.2L4.3 2.9h2.8l5.3 7.6.8 1.2 7.1 10.2h-2.8l-5.7-8z" />
        </svg>
      );
    default:
      return null;
  }
}

function HireButton() {
  const { openPanel } = useMenu();
  return <ReachButton onClick={() => openPanel("contato")}>Contratar</ReachButton>;
}

function SlimHire() {
  const { openPanel } = useMenu();
  return (
    <button
      type="button"
      onClick={() => openPanel("contato")}
      className="inline-flex min-h-11 items-center gap-2 border border-white bg-white px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink"
    >
      Contratar
      <span aria-hidden>→</span>
    </button>
  );
}

function ListenChip() {
  const { openPanel } = useMenu();
  return (
    <button
      type="button"
      onClick={() => openPanel("musica")}
      className="inline-flex min-h-11 items-center gap-2 border border-white/35 bg-white/10 px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-sm"
    >
      <SocialIcon name="Spotify" className="h-4 w-4 shrink-0" />
      Ouvir
    </button>
  );
}

function SocialIconButtons() {
  return (
    <ul className="flex">
      {artist.socials.map((social) => (
        <li key={social.name} className="flex-1">
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.name}
            className="grid h-12 w-full min-w-11 place-items-center text-white/85 transition-opacity hover:text-white"
          >
            <SocialIcon name={social.name} className="h-6 w-6 shrink-0" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function DesktopChrome({
  contentOpacity,
  contentY,
  contentPointer,
  reduceMotion,
}: {
  contentOpacity: MotionValue<number>;
  contentY: MotionValue<number>;
  contentPointer: MotionValue<"auto" | "none">;
  reduceMotion: boolean | null;
}) {
  return (
    <div className="relative z-10 hidden h-full flex-col justify-between px-5 py-8 md:flex md:px-8">
      <div className="flex items-start justify-between gap-4 pt-16">
        <p className={`anim-up ${corner}`}>Cantora + compositora.</p>
        <p className={`anim-up text-right ${corner}`}>
          Forró litorâneo
          <br />
          reggae + MPB
        </p>
      </div>

      <motion.div
        className="flex flex-1 items-center"
        style={
          reduceMotion
            ? undefined
            : { opacity: contentOpacity, y: contentY, pointerEvents: contentPointer }
        }
      >
        <div className="anim-ken-late origin-left">
          <h1 className="font-display text-[clamp(2.6rem,8vw,5.4rem)] font-semibold uppercase leading-[0.88] tracking-[-0.045em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]">
            <span className="block">Aureliah</span>
            <span className="block">Milagres</span>
          </h1>
          <div className="mt-8">
            <HireButton />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex items-end justify-between gap-5"
        style={reduceMotion ? undefined : { opacity: contentOpacity, pointerEvents: contentPointer }}
      >
        <ul className={`anim-up flex flex-wrap gap-x-5 gap-y-3 ${corner}`}>
          {artist.socials.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-opacity hover:opacity-60"
              >
                <SocialIcon name={social.name} />
                {social.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="anim-up w-full max-w-[22rem] overflow-hidden rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
          <iframe
            title="Ouvir Aureliah Milagres no Spotify"
            src="https://open.spotify.com/embed/artist/07BH1WsxplcXWxhB1oQs7t?utm_source=generator&theme=0"
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="block rounded-xl border-0"
          />
        </div>
      </motion.div>
    </div>
  );
}

function MobileSplitChrome({
  contentOpacity,
  contentY,
  contentPointer,
  reduceMotion,
}: {
  contentOpacity: MotionValue<number>;
  contentY: MotionValue<number>;
  contentPointer: MotionValue<"auto" | "none">;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      className="relative z-10 flex h-full flex-col justify-between px-5 py-8 md:hidden"
      style={
        reduceMotion ? undefined : { opacity: contentOpacity, y: contentY, pointerEvents: contentPointer }
      }
    >
      <div className="anim-up pt-16">
        <h1 className="font-display text-[clamp(1.65rem,7vw,2.15rem)] font-semibold uppercase leading-[0.88] tracking-[-0.045em] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]">
          <span className="block">Aureliah</span>
          <span className="block">Milagres</span>
        </h1>
        <p className={`mt-2.5 ${corner}`}>Cantora + compositora · forró litorâneo</p>
      </div>

      <div className="anim-up flex flex-col gap-3 pb-[max(0.25rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2">
          <SlimHire />
          <ListenChip />
        </div>
        <SocialIconButtons />
      </div>
    </motion.div>
  );
}

export function Hero({
  scrollProgress,
  videoRef,
}: {
  scrollProgress: MotionValue<number>;
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const mediaScale = useTransform(scrollProgress, [0, 1], [1, 1.22]);
  const contentOpacity = useTransform(scrollProgress, [0, 0.12], [1, 0]);
  const contentY = useTransform(scrollProgress, [0, 0.12], [0, -28]);
  const contentPointer = useTransform(contentOpacity, (v) => (v > 0.2 ? "auto" : "none"));

  return (
    <section id="topo" className="sticky -top-px z-0 h-[calc(100svh+2px)] min-h-[640px] overflow-hidden bg-ink">
      <div className="absolute inset-0 overflow-hidden bg-ink">
        <motion.div
          className="hero-media-frame absolute inset-0 origin-center will-change-transform"
          style={reduceMotion ? undefined : { scale: mediaScale }}
        >
          <div className="anim-ken-media hero-media absolute inset-0 flex origin-center items-center justify-center md:block md:origin-top">
            <div className="hero-video-frame overflow-hidden">
              <video
                ref={videoRef}
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/video/hero-poster.jpg"
              >
                <source src="/video/hero.webm" type="video/webm" />
                <source src="/video/hero.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </motion.div>
        <div className="hero-grain" aria-hidden />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/80 via-ink/35 to-transparent md:block" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,33,33,0.42)_0%,transparent_22%,transparent_62%,rgba(31,33,33,0.72)_100%)] md:hidden" />
        <div className="absolute inset-x-0 bottom-0 hidden h-36 bg-gradient-to-t from-ink/40 to-transparent md:block" />
      </div>

      <DesktopChrome
        contentOpacity={contentOpacity}
        contentY={contentY}
        contentPointer={contentPointer}
        reduceMotion={reduceMotion}
      />
      <MobileSplitChrome
        contentOpacity={contentOpacity}
        contentY={contentY}
        contentPointer={contentPointer}
        reduceMotion={reduceMotion}
      />
    </section>
  );
}
