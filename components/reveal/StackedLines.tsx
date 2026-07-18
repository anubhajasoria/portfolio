"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  lines: string[];
  stagger?: number;
  base?: number;
  duration?: number;
  play?: boolean;
  as?: "h1" | "h2" | "p";
  className?: string;
  style?: React.CSSProperties;
};

/** Clip-mask stacked-line slide-up reveal (easeOutExpo). */
export default function StackedLines({
  lines,
  stagger = 120,
  base = 0,
  duration = 950,
  play,
  as = "h2",
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
  const Tag = as as React.ElementType;

  return (
    <Tag ref={ref as never} className={`stack ${on ? "in" : ""} ${className}`.trim()} style={style}>
      {lines.map((line, i) => (
        <span className="clip-line" key={i}>
          <span
            style={{
              transition: `transform ${duration}ms var(--expo), opacity ${duration}ms var(--expo)`,
              transitionDelay: `${base + i * stagger}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
