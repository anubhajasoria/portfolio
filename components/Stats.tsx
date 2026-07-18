"use client";

import { STATS } from "@/lib/data";
import Eyebrow from "./ui/Eyebrow";
import StackedLines from "./reveal/StackedLines";
import Reveal from "./reveal/Reveal";

export default function Stats() {
  return (
    <section className="stats">
      <Eyebrow tone="light">By the numbers</Eyebrow>
      <StackedLines as="h2" className="section-title" lines={["A few", "highlights"]} />
      <dl className="stats-grid">
        {STATS.map((s, i) => (
          <Reveal
            key={s.l}
            className="stat"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            config={{ tension: 180, friction: 24 }}
            delayIn={i * 110}
          >
            <dt className="sr-only">{s.l}</dt>
            <dd>
              <span className="v">{s.v}</span>
              <span className="l">{s.l}</span>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
