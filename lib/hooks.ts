"use client";

import { useEffect, useRef } from "react";
import { Spring, onTick, motionStr, type Config } from "./spring";

type State = Record<string, number>;

/**
 * Spring an element from `from` → `to`, triggered either the first time it
 * enters the viewport (default) or when `ready` flips true (gated reveals).
 */
export function useInViewMotion(
  from: State,
  to: State,
  config: Config,
  opts: { delayIn?: number; base?: string; ready?: boolean } = {}
) {
  const ref = useRef<HTMLElement | null>(null);
  const springsRef = useRef<Record<string, Spring> | null>(null);
  const keysRef = useRef<string[]>([]);
  const gated = opts.ready !== undefined;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const keys = Object.keys(from);
    keysRef.current = keys;
    const springs: Record<string, Spring> = {};
    keys.forEach((k) => (springs[k] = new Spring(from[k], config)));
    springsRef.current = springs;
    const base = opts.base || "";

    const apply = () => {
      const s: State = {};
      keys.forEach((k) => (s[k] = springs[k].v));
      el.style.transform = motionStr(s, base);
      if ("opacity" in s) el.style.opacity = String(s.opacity);
    };
    apply();

    const off = onTick((_t, dt) => {
      keys.forEach((k) => springs[k].step(dt));
      apply();
    });

    let io: IntersectionObserver | undefined;
    if (!gated) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            io!.disconnect();
            window.setTimeout(
              () => keys.forEach((k) => springs[k].set(to[k])),
              opts.delayIn || 0
            );
          }
        },
        { threshold: 0.12 }
      );
      io.observe(el);
    }

    return () => {
      off();
      io?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gated trigger (hero reveals wait for the loader).
  useEffect(() => {
    if (!gated || !opts.ready) return;
    const springs = springsRef.current;
    if (!springs) return;
    const keys = keysRef.current;
    window.setTimeout(() => keys.forEach((k) => springs[k].set(to[k])), opts.delayIn || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.ready]);

  return ref;
}

/** Hover spring: springs a 0→1 progress on pointer enter/leave (disabled ≤768px). */
export function useHoverSpring<T extends HTMLElement>(
  config: Config,
  apply: (v: number) => void
) {
  const ref = useRef<T | null>(null);
  const applyRef = useRef(apply);
  applyRef.current = apply;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const s = new Spring(0, config);
    const off = onTick((_t, dt) => {
      s.step(dt);
      applyRef.current(s.v);
    });
    const enter = () => {
      if (window.innerWidth > 768) s.set(1);
    };
    const leave = () => s.set(0);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      off();
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/** Map an element's scroll position (0 at entering bottom → 1 at leaving top) each frame. */
export function useParallax<T extends HTMLElement>(apply: (progress: number) => void) {
  const ref = useRef<T | null>(null);
  const applyRef = useRef(apply);
  applyRef.current = apply;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const off = onTick(() => {
      const r = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
      applyRef.current(p);
    });
    return off;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
