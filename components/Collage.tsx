"use client";

import Link from "next/link";
import { useInViewMotion } from "@/lib/hooks";
import { motionStr } from "@/lib/spring";
import { PROJECTS, statusClass } from "@/lib/data";
import Eyebrow from "./ui/Eyebrow";
import StackedLines from "./reveal/StackedLines";

function Tile({ p, i }: { p: (typeof PROJECTS)[number]; i: number }) {
  const from = { opacity: 0, y: 32 };
  const ref = useInViewMotion(from, { opacity: 1, y: 0 }, { tension: 180, friction: 26 }, { delayIn: i * 80 });

  const className = `collage-tile tile-${i + 1}`;
  const style = { opacity: 0, transform: motionStr(from) } as React.CSSProperties;
  const inner = (
    <>
      <img src={p.img} alt={p.alt} loading="lazy" />
      {p.status && <span className={`work-status ${statusClass(p.status)}`}>{p.status}</span>}
      <div className="collage-cap">
        <span className="ct">{p.category}</span>
        <span className="nm">{p.name}</span>
      </div>
    </>
  );

  // Live projects (with a URL) open the live site in a new tab; everything else
  // just goes to the full "View all" work page.
  if (p.url) {
    return (
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        ref={ref as React.Ref<HTMLAnchorElement>}
        style={style}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href="/work" className={className} ref={ref as React.Ref<HTMLAnchorElement>} style={style}>
      {inner}
    </Link>
  );
}

export default function Collage() {
  return (
    <section className="work" id="work">
      <div className="work-top">
        <div>
          <Eyebrow tone="dark">Selected work</Eyebrow>
          <StackedLines as="h2" className="section-title" lines={["Things I've", "built"]} stagger={120} />
        </div>
        <Link href="/work" className="view-all">
          View all
          <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="collage">
        {PROJECTS.map((p, i) => (
          <Tile key={p.name} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
