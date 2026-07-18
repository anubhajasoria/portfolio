"use client";

import { useRef } from "react";
import { useInViewMotion, useHoverSpring } from "@/lib/hooks";
import { PROJECTS, slugify, statusClass } from "@/lib/data";
import Eyebrow from "./ui/Eyebrow";
import StackedLines from "./reveal/StackedLines";
import FadeWords from "./reveal/FadeWords";

function ProjectCard({ p, i }: { p: (typeof PROJECTS)[number]; i: number }) {
  const revealRef = useInViewMotion(
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0 },
    { tension: 180, friction: 26 },
    { delayIn: (i % 2) * 90 }
  );
  const imgRef = useRef<HTMLImageElement | null>(null);
  const mediaRef = useHoverSpring<HTMLElement>({ tension: 300, friction: 22 }, (v) => {
    if (imgRef.current) imgRef.current.style.transform = `scale(${1 + 0.04 * v})`;
  });

  return (
    <li id={slugify(p.name)} ref={revealRef as React.Ref<HTMLLIElement>} style={{ opacity: 0, transform: "translateY(40px)" }}>
      <article className="work-card">
        <figure className="work-media" ref={mediaRef as React.Ref<HTMLElement>}>
          <img ref={imgRef} src={p.img} alt={p.alt} loading="lazy" />
          {p.status && <span className={`work-status ${statusClass(p.status)}`}>{p.status}</span>}
        </figure>
        <div className="work-info">
          <span className="work-cat">{p.category}</span>
          <h3 className="work-title">{p.name}</h3>
          <p className="work-desc">{p.desc}</p>
          {p.tags.length > 0 && (
            <ul className="work-tags">
              {p.tags.map((t) => (
                <li className="skill-tag" key={t}>{t}</li>
              ))}
            </ul>
          )}
          {(p.url || p.repo) && (
            <div className="work-links">
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  Live <span aria-hidden="true">↗</span>
                </a>
              )}
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noopener noreferrer">
                  Code <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </li>
  );
}

export default function Projects() {
  return (
    <section className="projects-page" id="work">
      <div className="work-intro">
        <Eyebrow tone="dark">Projects</Eyebrow>
        <StackedLines as="h2" className="section-title" lines={["Everything", "I've built"]} stagger={120} />
        <FadeWords
          className="fac-body"
          text="The full list — fintech, games, and business sites, a few shipped and a few still in progress."
          stagger={28}
          delayIn={250}
          duration={700}
        />
      </div>
      <ul className="work-grid">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i} />
        ))}
      </ul>
    </section>
  );
}
