"use client";

import { useInViewMotion } from "@/lib/hooks";
import { MEMBERSHIP } from "@/lib/data";

export default function MembershipCard({ ready }: { ready: boolean }) {
  const ref = useInViewMotion(
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0 },
    { tension: 200, friction: 26 },
    { delayIn: 780, ready }
  );

  return (
    <article className="membership glass" ref={ref as React.Ref<HTMLElement>}>
      <div className="mem-left">
        <span className="mem-val">{MEMBERSHIP.value}</span>
        <div className="mem-dots">
          {MEMBERSHIP.dots.map((c) => (
            <span key={c} style={{ background: c }} />
          ))}
        </div>
        <span className="mem-cap">{MEMBERSHIP.caption}</span>
      </div>
      <img className="mem-img" src={MEMBERSHIP.img} alt={MEMBERSHIP.alt} loading="lazy" />
    </article>
  );
}
