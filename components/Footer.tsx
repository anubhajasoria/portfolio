"use client";

import { FOOTER_COLS, SOCIALS, SITE } from "@/lib/data";
import { useUI } from "./Providers";
import Eyebrow from "./ui/Eyebrow";
import StackedLines from "./reveal/StackedLines";
import PillButton from "./ui/PillButton";
import Reveal from "./reveal/Reveal";

export default function Footer() {
  const { openModal } = useUI();

  return (
    <footer className="footer" id="contact">
      <div className="foot-cta">
        <div>
          <Eyebrow tone="light">Get in touch</Eyebrow>
          <StackedLines as="p" className="big" lines={["Let's build", "something."]} />
        </div>
        <Reveal
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          config={{ tension: 200, friction: 24 }}
          delayIn={150}
        >
          <PillButton variant="light" onClick={openModal}>
            Get in touch
          </PillButton>
        </Reveal>
      </div>

      <div className="foot-cols">
        <div className="foot-brand">
          <div className="bname">
            {SITE.wordmark}
          </div>
          <p>{SITE.role}. Designing and building thoughtful digital products, end to end.</p>
          <address>
            <button type="button" className="link-reset" onClick={openModal}>{SITE.email}</button>
            <span className="muted">{SITE.location}</span>
          </address>
        </div>
        {FOOTER_COLS.map((col) => (
          <nav className="foot-col" key={col.heading}>
            <h4>{col.heading}</h4>
            <ul>
              {col.links.map(([label, href], i) => (
                <li key={`${label}-${i}`}>
                  {href.startsWith("mailto:") ? (
                    <button type="button" className="link-reset" onClick={openModal}>{label}</button>
                  ) : (
                    <a href={href}>{label}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="foot-bottom">
        <span>© 2026 {SITE.name}. All rights reserved.</span>
        <nav className="foot-social">
          {SOCIALS.map(([label, href]) =>
            href.startsWith("mailto:") ? (
              <button type="button" className="link-reset" key={href} onClick={openModal}>{label}</button>
            ) : (
              <a key={href} href={href}>{label}</a>
            )
          )}
        </nav>
        <nav className="foot-legal">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </nav>
      </div>
    </footer>
  );
}
