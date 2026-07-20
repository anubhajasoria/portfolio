"use client";

import { useEffect, useRef, useState } from "react";
import { Spring, onTick, motionStr } from "@/lib/spring";
import { useUI } from "./Providers";
import { SITE } from "@/lib/data";

const MIN_VISIBLE_MS = 1400;
const MAX_VISIBLE_MS = 2600;
const EXIT_MS = 850;

export default function Loader() {
  const { revealSite } = useUI();
  const [gone, setGone] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const markRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const min = reduced ? 200 : MIN_VISIBLE_MS;
    const exit = reduced ? 0 : EXIT_MS;

    // Wordmark spring-in.
    const oS = new Spring(0, { tension: 200, friction: 22 });
    const yS = new Spring(16, { tension: 200, friction: 22 });
    const offTick = onTick((_t, dt) => {
      oS.step(dt);
      yS.step(dt);
      if (markRef.current) {
        markRef.current.style.opacity = String(oS.v);
        markRef.current.style.transform = motionStr({ y: yS.v });
      }
    });
    requestAnimationFrame(() => {
      oS.set(1);
      yS.set(0);
    });

    // Progress fill (easeInOutCubic).
    const fill = fillRef.current;
    if (fill) {
      fill.style.transition = `transform ${min - 120}ms var(--incubic)`;
      fill.style.transitionDelay = "120ms";
      requestAnimationFrame(() => {
        fill.style.transform = "scaleX(1)";
      });
    }

    let done = false;
    let started = false;
    const finish = () => {
      if (done) return;
      done = true;
      revealSite();
      const loader = loaderRef.current;
      if (loader) loader.style.transform = "translateY(-105%)";
      window.setTimeout(() => setGone(true), exit + 50);
    };
    const startCountdown = () => {
      if (started) return;
      started = true;
      window.setTimeout(finish, min);
    };

    if (document.readyState === "complete") startCountdown();
    else window.addEventListener("load", startCountdown);

    const maxTimer = window.setTimeout(() => {
      if (!started) {
        started = true;
        finish();
      }
    }, MAX_VISIBLE_MS);

    return () => {
      offTick();
      window.removeEventListener("load", startCountdown);
      window.clearTimeout(maxTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader-mark" ref={markRef}>
        {SITE.wordmark}
      </div>
      <div className="loader-track">
        <div className="loader-fill" ref={fillRef} />
      </div>
    </div>
  );
}
