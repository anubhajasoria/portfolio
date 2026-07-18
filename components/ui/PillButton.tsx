"use client";

import { useRef } from "react";
import { useHoverSpring } from "@/lib/hooks";

type Props = {
  children: React.ReactNode;
  variant?: "light" | "solid" | "outline";
  onClick?: () => void;
  className?: string;
};

export default function PillButton({ children, variant = "light", onClick, className = "" }: Props) {
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const btnRef = useHoverSpring<HTMLButtonElement>({ tension: 320, friction: 20 }, (v) => {
    if (arrowRef.current) arrowRef.current.style.transform = `translateX(${5 * v}px)`;
  });
  return (
    <button ref={btnRef} type="button" className={`pill ${variant} ${className}`} onClick={onClick}>
      {children}
      <svg ref={arrowRef} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}
