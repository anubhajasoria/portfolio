"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Spring, onTick, motionStr } from "@/lib/spring";
import { useUI } from "./Providers";
import { BrandMark } from "./ui/BrandMark";
import PillButton from "./ui/PillButton";
import { SOCIALS, MENU_LINKS, SITE } from "@/lib/data";

const LINKS = MENU_LINKS as readonly (readonly [string, string])[];

export default function MenuOverlay() {
  const { menuOpen, closeMenu, openModal, scrollTo } = useUI();
  const [mounted, setMounted] = useState(false);

  const backdropRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const xRef = useRef<SVGSVGElement | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const springs = useRef<{ bO: Spring; pO: Spring; pY: Spring; x: Spring; links: { o: Spring; y: Spring }[] } | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const bO = new Spring(0, { tension: 260, friction: 30 });
    const pO = new Spring(0, { tension: 220, friction: 28 });
    const pY = new Spring(-24, { tension: 220, friction: 28 });
    const x = new Spring(0, { tension: 300, friction: 18 });
    const links = LINKS.map(() => ({ o: new Spring(0, { tension: 200, friction: 26 }), y: new Spring(28, { tension: 200, friction: 26 }) }));
    springs.current = { bO, pO, pY, x, links };
    const off = onTick((_t, dt) => {
      [bO, pO, pY, x].forEach((s) => s.step(dt));
      links.forEach((l) => {
        l.o.step(dt);
        l.y.step(dt);
      });
      if (backdropRef.current) backdropRef.current.style.opacity = String(bO.v);
      if (panelRef.current) {
        panelRef.current.style.opacity = String(pO.v);
        panelRef.current.style.transform = motionStr({ y: pY.v });
      }
      if (xRef.current) xRef.current.style.transform = `rotate(${90 * x.v}deg)`;
      links.forEach((l, i) => {
        const el = linkRefs.current[i];
        if (el) {
          el.style.opacity = String(l.o.v);
          el.style.transform = motionStr({ y: l.y.v });
        }
      });
    });
    return off;
  }, []);

  useEffect(() => {
    const s = springs.current;
    if (!s) return;
    if (menuOpen) {
      s.bO.set(1);
      s.pO.set(1);
      s.pY.set(0);
      const timers = s.links.map((l, i) =>
        window.setTimeout(() => {
          l.o.set(1);
          l.y.set(0);
        }, 120 + i * 70)
      );
      return () => timers.forEach((t) => window.clearTimeout(t));
    } else {
      s.bO.set(0);
      s.pO.set(0);
      s.pY.set(-24);
      s.links.forEach((l) => {
        l.o.set(0);
        l.y.set(28);
      });
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  const onLink = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    closeMenu();
    window.setTimeout(() => scrollTo(hash), 360);
  };

  if (!mounted) return null;

  return createPortal(
    <div className={`menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
      <div className="menu-backdrop" ref={backdropRef} onClick={closeMenu} />
      <div className="menu-panel" ref={panelRef}>
        <div className="menu-inner">
          <div className="menu-top">
            <div className="menu-brand">
              <BrandMark />
              {SITE.wordmark}
            </div>
            <button
              className="menu-x"
              aria-label="Close menu"
              onClick={closeMenu}
              onPointerEnter={() => springs.current?.x.set(1)}
              onPointerLeave={() => springs.current?.x.set(0)}
            >
              <svg ref={xRef} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="menu-nav">
            {LINKS.map(([label, hash], i) => (
              <a
                key={hash}
                href={hash}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                style={{ opacity: 0, transform: "translateY(28px)" }}
                onClick={(e) => onLink(e, hash)}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="menu-bottom">
            <PillButton
              variant="light"
              onClick={() => {
                closeMenu();
                window.setTimeout(openModal, 360);
              }}
            >
              Get in touch
            </PillButton>
            <nav className="menu-social">
              {SOCIALS.map(([label, href]) => (
                <a key={href} href={href}>{label}</a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
