"use client";

import { useEffect, useRef, useState } from "react";
import { useInViewMotion } from "@/lib/hooks";
import { COLLECTIONS } from "@/lib/data";
import CarouselDots from "./ui/CarouselDots";

const INTERVAL = 3800;

export default function CollectionSlider({ ready }: { ready: boolean }) {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(0);
  const [visible, setVisible] = useState(true);
  const timer = useRef<number | null>(null);
  const swapTimer = useRef<number | null>(null);

  const wrapRef = useInViewMotion(
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0 },
    { tension: 200, friction: 26 },
    { delayIn: 650, ready }
  );

  // Cross-fade to a target slide.
  const goTo = (next: number) => {
    setVisible(false);
    if (swapTimer.current) window.clearTimeout(swapTimer.current);
    swapTimer.current = window.setTimeout(() => {
      setShown(((next % COLLECTIONS.length) + COLLECTIONS.length) % COLLECTIONS.length);
      setVisible(true);
    }, 260);
  };

  useEffect(() => {
    setIdx(((shown % COLLECTIONS.length) + COLLECTIONS.length) % COLLECTIONS.length);
  }, [shown]);

  // Autoplay, gated on loader ready.
  useEffect(() => {
    if (!ready) return;
    const tick = () => {
      setIdx((prev) => {
        const next = (prev + 1) % COLLECTIONS.length;
        goTo(next);
        return next;
      });
    };
    timer.current = window.setInterval(tick, INTERVAL);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const select = (i: number) => {
    setIdx(i);
    goTo(i);
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setIdx((prev) => {
        const next = (prev + 1) % COLLECTIONS.length;
        goTo(next);
        return next;
      });
    }, INTERVAL);
  };

  const s = COLLECTIONS[shown];

  return (
    <div className="collection" ref={wrapRef as React.Ref<HTMLDivElement>}>
      <article
        className="coll-card glass"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px) scale(0.96)",
        }}
      >
        <img src={s.img} alt={s.alt} loading="lazy" />
        <div className="coll-info">
          <span className="coll-brand">{s.brand}</span>
          <span className="coll-title">{s.title}</span>
          <a href={s.href} className="coll-cta">{`${s.cta} →`}</a>
        </div>
      </article>
      <CarouselDots count={COLLECTIONS.length} active={idx} onSelect={select} tone="light" />
    </div>
  );
}
