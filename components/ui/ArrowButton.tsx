"use client";

import { useRef } from "react";
import { useHoverSpring } from "@/lib/hooks";

type Props = {
  variant?: "outline" | "solid";
  direction?: "prev" | "next";
  onClick?: () => void;
  label: string;
};

export default function ArrowButton({ variant = "outline", direction = "next", onClick, label }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const flip = direction === "prev";
  const btnRef = useHoverSpring<HTMLButtonElement>({ tension: 320, friction: 18 }, (v) => {
    if (svgRef.current) svgRef.current.style.transform = `${flip ? "scaleX(-1) " : ""}scale(${1 + 0.15 * v})`;
  });
  return (
    <button ref={btnRef} type="button" className={`arrow-btn ${variant}`} onClick={onClick} aria-label={label}>
      <svg
        ref={svgRef}
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}
