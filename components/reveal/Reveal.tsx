"use client";

import { useInViewMotion } from "@/lib/hooks";
import { motionStr, type Config } from "@/lib/spring";

type State = Record<string, number>;

type Props = {
  from: State;
  to: State;
  config: Config;
  delayIn?: number;
  base?: string;
  ready?: boolean;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

/** Springs its element from `from` → `to` on first in-view (or when `ready` flips). */
export default function Reveal({
  from,
  to,
  config,
  delayIn,
  base,
  ready,
  as = "div",
  className,
  style,
  children,
}: Props) {
  const ref = useInViewMotion(from, to, config, { delayIn, base, ready });
  const Tag = as;
  const initial: React.CSSProperties = {
    transform: motionStr(from, base || ""),
    ...(from.opacity !== undefined ? { opacity: from.opacity } : {}),
    ...style,
  };
  return (
    <Tag ref={ref as never} className={className} style={initial}>
      {children}
    </Tag>
  );
}
