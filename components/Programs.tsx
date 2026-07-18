"use client";

import { useInViewMotion } from "@/lib/hooks";
import { motionStr } from "@/lib/spring";
import { PROGRAMS, SITE } from "@/lib/data";
import Eyebrow from "./ui/Eyebrow";
import StackedLines from "./reveal/StackedLines";

function ProgramRow({ p, i }: { p: (typeof PROGRAMS)[number]; i: number }) {
  const from = { opacity: 0, y: 26 };
  const rowRef = useInViewMotion(from, { opacity: 1, y: 0 }, { tension: 190, friction: 26 }, { delayIn: i * 90 });

  return (
    <li>
      <div
        className="prog-row"
        ref={rowRef as React.Ref<HTMLDivElement>}
        style={{ transform: motionStr(from), opacity: from.opacity }}
      >
        <span className="prog-idx">{p.idx}</span>
        <span className="prog-body">
          <span className="prog-name">{p.name}</span>
          <span className="prog-desc">{p.desc}</span>
        </span>
      </div>
    </li>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
    </svg>
  );
}

export default function Programs() {
  return (
    <section className="programs" id="experience">
      <div className="prog-header">
        <div>
          <Eyebrow tone="dark">Experience</Eyebrow>
          <StackedLines as="h2" className="section-title" lines={["Where I've", "worked"]} />
        </div>
        <div className="resume-actions">
          <a className="pill outline" href={SITE.resumeUrl} target="_blank" rel="noopener noreferrer">
            View résumé
            <EyeIcon />
          </a>
          <a className="pill solid" href={SITE.resumeUrl} download>
            Download
            <DownloadIcon />
          </a>
        </div>
      </div>
      <ul className="prog-list">
        {PROGRAMS.map((p, i) => (
          <ProgramRow key={p.idx} p={p} i={i} />
        ))}
      </ul>
    </section>
  );
}
