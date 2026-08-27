"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect } from "react";
import { easeFramer } from "@/lib/motion";
import { type PanelId, useMenu } from "@/components/menu-context";
import { MenuPanel } from "@/components/MenuPanel";

const links: { id: PanelId; label: string }[] = [
  { id: "sobre", label: "Sobre" },
  { id: "musica", label: "Música" },
  { id: "videos", label: "Vídeos" },
  { id: "contato", label: "Contato" },
];

export function Nav() {
  const { open, panel, setOpen, openPanel } = useMenu();
  const lenis = useLenis();

  useEffect(() => {
    const html = document.documentElement;
    if (open) {
      html.classList.add("menu-open");
      lenis?.stop();
    } else {
      html.classList.remove("menu-open");
      lenis?.start();
    }
    return () => {
      html.classList.remove("menu-open");
      lenis?.start();
    };
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <>
      <div className="anim-up-nav pointer-events-none fixed inset-x-0 top-5 z-[80] flex justify-center px-4">
        <div className="pointer-events-auto flex h-11 w-[min(100%,208px)] items-center justify-between rounded-[2px] bg-ink px-3.5 backdrop-blur-[5px]">
          <button
            type="button"
            className="font-display text-[15px] font-semibold tracking-tight text-white"
            onClick={() => setOpen(false)}
          >
            am
          </button>
          <button
            type="button"
            className="relative h-8 w-8"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => (open ? setOpen(false) : openPanel(panel))}
          >
            <span
              className={`absolute left-1.5 right-1.5 h-px bg-fog transition-transform duration-300 ${
                open ? "top-[15px] rotate-45" : "top-[12px]"
              }`}
            />
            <span
              className={`absolute left-1.5 right-1.5 h-px bg-fog transition-transform duration-300 ${
                open ? "top-[15px] -rotate-45" : "top-[18px]"
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easeFramer }}
            className="fixed inset-0 z-[70] flex items-center justify-center overflow-hidden overscroll-none bg-black/45 px-4 pb-4 pt-20 md:px-8 md:pb-8 md:pt-24"
            data-lenis-prevent
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: easeFramer }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="grid h-[min(780px,calc(100svh-6.5rem))] w-full max-w-6xl min-h-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-ink text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] [color-scheme:dark] md:h-[min(780px,calc(100svh-8.5rem))] md:grid-cols-[minmax(220px,0.3fr)_1px_1fr] md:grid-rows-[minmax(0,1fr)]"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex shrink-0 flex-row gap-4 overflow-x-auto overflow-y-hidden border-b border-white/10 px-5 py-5 md:min-h-0 md:flex-col md:justify-center md:gap-3 md:overflow-y-auto md:overflow-x-hidden md:border-b-0 md:px-8 md:py-8">
                {links.map((link, i) => {
                  const active = panel === link.id;
                  return (
                    <motion.button
                      key={link.id}
                      type="button"
                      initial={{ y: 12 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.06 + i * 0.05, duration: 0.35, ease: easeFramer }}
                      onClick={() => openPanel(link.id)}
                      aria-current={active ? "page" : undefined}
                      className={`whitespace-nowrap text-left font-display text-lg font-semibold uppercase leading-none tracking-[-0.04em] transition-opacity md:text-[clamp(1.8rem,2.5vw,2.75rem)] ${
                        active ? "text-white" : "text-white/35 hover:text-white/70"
                      }`}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
              </nav>
              <div className="hidden bg-white/20 md:block" />
              <div className="grid min-h-0 min-w-0 grid-rows-[minmax(0,1fr)] overflow-hidden py-2 pr-3 md:py-3 md:pr-5">
                <div
                  className="menu-scroll min-h-0 px-5 py-4 md:px-10 md:py-7"
                  data-lenis-prevent
                >
                  <div key={panel} className="anim-panel">
                    <MenuPanel panel={panel} />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
