"use client";

import { useHoverSpring } from "@/lib/hooks";
import { ABOUT } from "@/lib/data";
import Eyebrow from "./ui/Eyebrow";
import StackedLines from "./reveal/StackedLines";
import FadeWords from "./reveal/FadeWords";
import Reveal from "./reveal/Reveal";

function TraitCard({ t, i }: { t: (typeof ABOUT.traits)[number]; i: number }) {
  // Hover spring: lift the card and lift its glow on pointer enter.
  const ref = useHoverSpring<HTMLElement>({ tension: 300, friction: 24 }, (v) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translateY(${-10 * v}px)`;
    el.style.setProperty("--glow", String(v));
  });

  return (
    <Reveal
      as="li"
      className="trait-card"
      from={{ opacity: 0, y: 44 }}
      to={{ opacity: 1, y: 0 }}
      config={{ tension: 180, friction: 26 }}
      delayIn={(i % 3) * 90}
    >
      <article ref={ref as React.Ref<HTMLElement>} className="trait-inner">
        <span className="trait-idx">{t.idx}</span>
        <h3 className="trait-title">{t.title}</h3>
        <p className="trait-body">{t.body}</p>
      </article>
    </Reveal>
  );
}

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-head">
        <Eyebrow tone="dark">{ABOUT.eyebrow}</Eyebrow>
        <StackedLines as="h2" className="about-statement" lines={[...ABOUT.statement]} stagger={130} />
        <FadeWords className="about-lead" text={ABOUT.lead} stagger={16} delayIn={200} duration={700} />
      </div>

      <ul className="trait-grid">
        {ABOUT.traits.map((t, i) => (
          <TraitCard key={t.idx} t={t} i={i} />
        ))}
      </ul>

      {/* Featured differentiator — the edge over "just prompt it". */}
      <Reveal
        as="aside"
        className="about-edge"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 175, friction: 26 }}
      >
        <span className="edge-label">{ABOUT.edge.label}</span>
        <h3 className="edge-title">{ABOUT.edge.title}</h3>
        <p className="edge-body">{ABOUT.edge.body}</p>
      </Reveal>

      {/* Quiet masthead-style keyword row — static, editorial. */}
      <Reveal
        className="about-keys"
        from={{ opacity: 0, y: 20 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 200, friction: 26 }}
      >
        {ABOUT.marquee.map((w, i) => (
          <span className="about-key" key={w}>
            {i > 0 && <span className="about-key-sep" aria-hidden="true" />}
            {w}
          </span>
        ))}
      </Reveal>

      <Reveal
        className="about-cta"
        from={{ opacity: 0, y: 24 }}
        to={{ opacity: 1, y: 0 }}
        config={{ tension: 200, friction: 26 }}
      >
        <span className="about-cta-text">{ABOUT.ctaText}</span>
        <a className="about-cta-link" href={ABOUT.ctaHref}>
          {ABOUT.ctaLabel}
          <span aria-hidden="true">→</span>
        </a>
      </Reveal>
    </section>
  );
}
