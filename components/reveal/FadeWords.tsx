"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  stagger?: number;
  delayIn?: number;
  duration?: number;
  className?: string;
};

/** Word-by-word fade + rise reveal (easeOutQuart). */
export default function FadeWords({ text, stagger = 28, delayIn = 0, duration = 700, className = "" }: Props) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [inview, setInview] = useState(false);

  useEffect(() => {
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
  }, []);

  const words = text.split(" ");

  return (
    <p ref={ref} className={`fade-words ${inview ? "in" : ""} ${className}`.trim()}>
      {words.map((w, i) => (
        <span key={i}>
          <span
            className="fw"
            style={{
              transition: `transform ${duration}ms var(--quart), opacity ${duration}ms var(--quart)`,
              transitionDelay: `${delayIn + i * stagger}ms`,
            }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
