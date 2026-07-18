"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  stagger?: number;
  duration?: number;
  base?: number;
  /** When provided, reveal is gated on this flag instead of the viewport. */
  play?: boolean;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
};

/** Clip-mask word-by-word slide-up reveal (easeOutExpo). */
export default function WordReveal({
  text,
  stagger = 100,
  duration = 1000,
  base = 0,
  play,
  as = "span",
  className = "",
  style,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [inview, setInview] = useState(false);
  const gated = play !== undefined;

  useEffect(() => {
    if (gated) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          setInview(true);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [gated]);

  const on = gated ? play : inview;
  const words = text.split(" ");
  const Tag = as as React.ElementType;

  return (
    <Tag ref={ref as never} className={`words ${on ? "in" : ""} ${className}`.trim()} style={style}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="clip-word">
            <span
              style={{
                transition: `transform ${duration}ms var(--expo), opacity ${duration}ms var(--expo)`,
                transitionDelay: `${base + i * stagger}ms`,
              }}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
