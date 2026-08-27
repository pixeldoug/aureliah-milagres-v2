"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type PanelId = "sobre" | "musica" | "videos" | "contato";

const PANELS: PanelId[] = ["sobre", "musica", "videos", "contato"];

type MenuContextValue = {
  open: boolean;
  panel: PanelId;
  setOpen: (open: boolean) => void;
  openPanel: (panel: PanelId) => void;
};

const MenuContext = createContext<MenuContextValue | null>(null);

function readHash(): PanelId | null {
  const raw = window.location.hash.replace("#", "");
  return PANELS.includes(raw as PanelId) ? (raw as PanelId) : null;
}

function writeHash(panel: PanelId | null) {
  const next = panel
    ? `${window.location.pathname}${window.location.search}#${panel}`
    : `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(null, "", next);
}

export function MenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpenState] = useState(false);
  const [panel, setPanel] = useState<PanelId>("sobre");

  useEffect(() => {
    const fromHash = readHash();
    if (fromHash) {
      setPanel(fromHash);
      setOpenState(true);
    }

    const onHash = () => {
      const next = readHash();
      if (next) {
        setPanel(next);
        setOpenState(true);
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const openPanel = useCallback((next: PanelId) => {
    setPanel(next);
    setOpenState(true);
    writeHash(next);
  }, []);

  const setOpen = useCallback(
    (next: boolean) => {
      setOpenState(next);
      if (next) writeHash(panel);
      else writeHash(null);
    },
    [panel],
  );

  const value = useMemo(
    () => ({ open, panel, setOpen, openPanel }),
    [open, panel, setOpen, openPanel],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used within MenuProvider");
  return ctx;
}
