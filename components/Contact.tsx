"use client";

import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import { artist } from "@/lib/content";
import { inView } from "@/lib/motion";
import { ReachButton } from "@/components/ReachButton";

export function Contact() {
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
    <section
      id="contato"
      className="relative scroll-mt-24 min-h-svh overflow-hidden bg-ink px-5 py-28 text-white md:px-8 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center grayscale opacity-25"
        style={{ backgroundImage: "url(/images/aureliah-milagres.webp)" }}
      />
      <div className="absolute inset-0 bg-ink/70" />

      <div className="relative mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1fr]">
        <motion.div {...inView} className="flex flex-col justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
              Toda noite começa aqui.
            </p>
            <p className="mt-2 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-white/55 md:hidden">
              Feito com ofício. Movido por obsessão.
            </p>
            <h2 className="mt-16 font-display text-[clamp(2.6rem,6vw,5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em]">
              Pronta para fazer algo que fique?
            </h2>
            <div className="mt-10">
              <ReachButton href={`https://wa.me/${artist.whatsapp}`}>Contratar</ReachButton>
            </div>
          </div>
          <div className="mt-16 hidden justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-white/50 md:flex">
            <p>Uma conversa pode mudar tudo.</p>
            <p>Se você sabe, você sabe.</p>
          </div>
        </motion.div>

        <motion.form
          {...inView}
          transition={{ ...inView.transition, delay: 0.1 }}
          onSubmit={onSubmit}
          className="flex flex-col gap-6"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
            Contratação
          </p>
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
              Nome
            </span>
            <input
              required
              name="name"
              className="w-full border-b border-white/25 bg-transparent py-3 font-mono text-sm outline-none transition focus:border-white"
            />
          </label>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                Cidade
              </span>
              <input
                required
                name="city"
                className="w-full border-b border-white/25 bg-transparent py-3 font-mono text-sm outline-none transition focus:border-white"
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                Data do evento
              </span>
              <input
                name="date"
                type="date"
                className="w-full border-b border-white/25 bg-transparent py-3 font-mono text-sm outline-none transition focus:border-white [color-scheme:dark]"
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
              Mensagem
            </span>
            <textarea
              name="message"
              rows={3}
              className="w-full resize-none border-b border-white/25 bg-transparent py-3 font-mono text-sm outline-none transition focus:border-white"
              placeholder="Tipo de evento, público, formação…"
            />
          </label>
          <button
            type="submit"
            className="mt-4 self-start border border-white bg-white px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition hover:bg-transparent hover:text-white"
          >
            Enviar no WhatsApp
          </button>
          {sentHint ? (
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
              Se o WhatsApp não abriu, {artist.phones[0].label}
            </p>
          ) : null}
          <ul className="mt-4 space-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
            <li>
              <a href={`mailto:${artist.bookingEmail}`}>{artist.bookingEmail}</a>
            </li>
            {artist.phones.map((phone) => (
              <li key={phone.href}>
                <a href={phone.href}>{phone.label}</a>
              </li>
            ))}
          </ul>
        </motion.form>
      </div>
    </section>
  );
}
