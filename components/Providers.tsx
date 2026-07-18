"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { onTick } from "@/lib/spring";
import Loader from "./Loader";
import ContactModal from "./ContactModal";
import MenuOverlay from "./MenuOverlay";

type UI = {
  ready: boolean;
  revealSite: () => void;
  openModal: () => void;
  closeModal: () => void;
  modalOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  menuOpen: boolean;
  scrollTo: (hash: string) => void;
};

const UICtx = createContext<UI | null>(null);
export function useUI() {
  const ctx = useContext(UICtx);
  if (!ctx) throw new Error("useUI must be used within Providers");
  return ctx;
}

export default function Providers({ children, loader = true }: { children: React.ReactNode; loader?: boolean }) {
  const [ready, setReady] = useState(!loader);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Lenis + adaptive rem grid + reset scroll.
  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({ smoothWheel: true });
    lenisRef.current = lenis;
    lenis.stop();
    const offTick = onTick((t) => lenis.raf(t));

    const FONT_BASE = 16;
    const BASE_W = 1920;
    const COEF = 0.6666;
    const sizeRoot = () => {
      const html = document.documentElement;
      const reduction = ((BASE_W - window.innerWidth) / BASE_W) * 100 * COEF;
      const size = FONT_BASE - (FONT_BASE * reduction) / 100;
      if (size > FONT_BASE) html.style.fontSize = size + "px";
      else html.style.removeProperty("font-size");
    };
    sizeRoot();
    window.addEventListener("resize", sizeRoot);

    return () => {
      offTick();
      window.removeEventListener("resize", sizeRoot);
      lenis.destroy();
    };
  }, []);

  // Scroll lock coordination: locked while loading, or any overlay open.
  useEffect(() => {
    const html = document.documentElement;
    const lenis = lenisRef.current;
    const shouldLock = !ready || modalOpen || menuOpen;
    if (shouldLock) {
      lenis?.stop();
      html.classList.add("locked");
    } else {
      lenis?.start();
      html.classList.remove("locked");
    }
  }, [ready, modalOpen, menuOpen]);

  const revealSite = useCallback(() => setReady(true), []);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const scrollTo = useCallback((hash: string) => {
    const el = document.querySelector(hash);
    if (el && lenisRef.current) lenisRef.current.scrollTo(el as HTMLElement, { offset: -10 });
  }, []);

  const value: UI = {
    ready,
    revealSite,
    openModal,
    closeModal,
    modalOpen,
    openMenu,
    closeMenu,
    menuOpen,
    scrollTo,
  };

  return (
    <UICtx.Provider value={value}>
      {children}
      <ContactModal />
      <MenuOverlay />
      {loader && <Loader />}
    </UICtx.Provider>
  );
}
