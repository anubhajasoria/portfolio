"use client";

import { useParallax } from "@/lib/hooks";
import { SITE, IMG } from "@/lib/data";
import { useUI } from "./Providers";
import Header from "./Header";
import WordReveal from "./reveal/WordReveal";
import StackedLines from "./reveal/StackedLines";
import CollectionSlider from "./CollectionSlider";
import MembershipCard from "./MembershipCard";

export default function Hero() {
  const { ready } = useUI();
  const sectionRef = useParallax<HTMLElement>((p) => {
    const inner = sectionRef.current?.querySelector<HTMLElement>(".hero-plate .inner");
    if (inner) inner.style.transform = `translateY(${12 * p}%)`;
  });

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-plate">
        <div className="inner">
          <img
            src={IMG.hero}
            alt="Editorial portrait backdrop"
            fetchPriority="high"
          />
        </div>
      </div>
      <div className="hero-overlay" />

      <Header />

      <div className="hero-title-wrap">
        <WordReveal
          as="h1"
          className="hero-title"
          text={SITE.heroTitle}
          stagger={140}
          duration={1100}
          play={ready}
        />
      </div>

      <div className="hero-bottom">
        <StackedLines
          as="p"
          className="tagline"
          lines={SITE.taglineLines}
          base={350}
          stagger={110}
          duration={900}
          play={ready}
        />
        <div className="hero-cluster">
          <CollectionSlider ready={ready} />
          <MembershipCard ready={ready} />
        </div>
      </div>
    </section>
  );
}
