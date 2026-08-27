"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { artist, bio, releases, videos } from "@/lib/content";
import type { PanelId } from "@/components/menu-context";

export function MenuPanel({ panel }: { panel: PanelId }) {
  switch (panel) {
    case "sobre":
      return <SobrePanel />;
    case "musica":
      return <MusicaPanel />;
    case "videos":
      return <VideosPanel />;
    case "contato":
      return <ContatoPanel />;
  }
}

function SobrePanel() {
  return (
    <div className="space-y-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">Sobre</p>
      <h3 className="font-display text-4xl font-semibold uppercase leading-[0.9] tracking-[-0.04em] md:text-5xl">
        Forró que namora o mar
      </h3>
      <p className="text-[15px] leading-relaxed text-white/75">{bio.lede}</p>
      {bio.paragraphs.map((p) => (
        <p key={p.slice(0, 24)} className="text-[15px] leading-relaxed text-white/60">
          {p}
        </p>
      ))}
    </div>
  );
}

function MusicaPanel() {
  return (
    <div className="space-y-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">Música</p>
      <div className="overflow-hidden rounded-xl">
        <iframe
          title="Aureliah Milagres no Spotify"
          src="https://open.spotify.com/embed/artist/07BH1WsxplcXWxhB1oQs7t?utm_source=generator&theme=0"
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="block rounded-xl border-0"
        />
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {releases.map((release) => (
          <li key={release.title} className="border border-white/10 p-4">
            <p className="font-display text-2xl font-semibold uppercase tracking-[-0.03em]">{release.title}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
              {release.kind} · {release.year}
            </p>
            {release.cover === null ? (
              <p className="mt-2 text-sm text-white/50">{release.highlights.join(" · ")}</p>
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
  );
}

function VideosPanel() {
  const [active, setActive] = useState(videos[0]?.id ?? null);

  return (
    <div className="space-y-8">
      {active ? (
        <div className="aspect-video overflow-hidden bg-black">
          <iframe
            title="YouTube"
            src={`https://www.youtube-nocookie.com/embed/${active}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : null}
      <ul className="grid gap-3 sm:grid-cols-2">
        {videos.map((video) => (
          <li key={video.id}>
            <button
              type="button"
              onClick={() => setActive(video.id)}
              className={`group w-full text-left ${active === video.id ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={video.thumb}
                  alt=""
                  fill
                  sizes="200px"
                  className="object-cover grayscale group-hover:grayscale-0"
                />
              </div>
              <p className="mt-2 font-display text-sm font-semibold uppercase tracking-[-0.03em]">{video.title}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">{video.meta}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContatoPanel() {
  const [sentHint, setSentHint] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const city = String(data.get("city") || "").trim();
    const date = String(data.get("date") || "").trim();
    const message = String(data.get("message") || "").trim();
    const text = [
      "Olá! Gostaria de contratar a Aureliah Milagres.",
      name && `Nome: ${name}`,
      city && `Cidade: ${city}`,
      date && `Data do evento: ${date}`,
      message && message,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://wa.me/${artist.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSentHint(true);
  }

  return (
    <div className="space-y-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">Contato</p>
      <h3 className="font-display text-4xl font-semibold uppercase leading-[0.9] tracking-[-0.04em] md:text-5xl">
        Contrate
      </h3>
      <p className="text-[15px] leading-relaxed text-white/65">
        Valores, formação e disponibilidade por WhatsApp ou e-mail.
      </p>
      <ul className="space-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
        <li>
          <a href={`mailto:${artist.bookingEmail}`}>{artist.bookingEmail}</a>
        </li>
        {artist.phones.map((phone) => (
          <li key={phone.href}>
            <a href={phone.href}>{phone.label}</a>
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <label className="block">
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Nome</span>
          <input
            required
            name="name"
            className="w-full border-b border-white/25 bg-transparent py-2 outline-none focus:border-white"
          />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Cidade</span>
            <input
              required
              name="city"
              className="w-full border-b border-white/25 bg-transparent py-2 outline-none focus:border-white"
            />
          </label>
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Data do evento</span>
            <input
              name="date"
              type="date"
              className="w-full border-b border-white/25 bg-transparent py-2 outline-none [color-scheme:dark] focus:border-white"
            />
          </label>
        </div>
        <label className="block">
          <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">Mensagem</span>
          <textarea
            name="message"
            rows={3}
            className="w-full resize-none border-b border-white/25 bg-transparent py-2 outline-none focus:border-white"
            placeholder="Tipo de evento, público, formação…"
          />
        </label>
        <button
          type="submit"
          className="self-start border border-white bg-white px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition hover:bg-transparent hover:text-white"
        >
          Enviar no WhatsApp
        </button>
        {sentHint ? (
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
            Se o WhatsApp não abriu, {artist.phones[0].label}
          </p>
        ) : null}
      </form>
    </div>
  );
}
