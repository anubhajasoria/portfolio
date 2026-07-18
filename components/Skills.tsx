"use client";

import { useInViewMotion, useHoverSpring } from "@/lib/hooks";
import { SKILLS } from "@/lib/data";
import Eyebrow from "./ui/Eyebrow";
import StackedLines from "./reveal/StackedLines";

function SkillCard({ s, i }: { s: (typeof SKILLS)[number]; i: number }) {
  const revealRef = useInViewMotion(
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0 },
    { tension: 180, friction: 26 },
    { delayIn: i * 120 }
  );
  const liftRef = useHoverSpring<HTMLElement>({ tension: 300, friction: 22 }, (v) => {
    if (liftRef.current) liftRef.current.style.transform = `translateY(${-8 * v}px)`;
  });

  return (
    <li ref={revealRef as React.Ref<HTMLLIElement>} style={{ opacity: 0, transform: "translateY(40px)" }}>
      <div className="skill-card" ref={liftRef as React.Ref<HTMLDivElement>}>
        <div className="skill-head">
          <span className="skill-idx">{s.idx}</span>
          <h3 className="skill-cat">{s.group}</h3>
        </div>
        <ul className="skill-tags">
          {s.items.map((item) => (
            <li className="skill-tag" key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function Skills() {
  return (
    <section className="testimonials" id="skills">
      <Eyebrow tone="dark">Tech stack</Eyebrow>
      <StackedLines as="h2" className="section-title" lines={["Tools I", "build with"]} />
      <ul className="testi-grid">
        {SKILLS.map((s, i) => (
          <SkillCard key={s.group} s={s} i={i} />
        ))}
      </ul>
    </section>
  );
}
