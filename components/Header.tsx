"use client";

import { useUI } from "./Providers";
import { SITE, NAV } from "@/lib/data";

export default function Header() {
  const { openModal, openMenu, scrollTo } = useUI();

  const nav = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    scrollTo(hash);
  };

  return (
    <header className="site-header">
      <nav className="hdr-nav">
        {NAV.map(([label, href]) => (
          <a key={href} href={href} onClick={(e) => nav(e, href)}>{label}</a>
        ))}
      </nav>
      <div className="brand">
        {SITE.wordmark}
      </div>
      <div className="hdr-right">
        <button className="book-txt" onClick={openModal}>Get in touch</button>
        <button className="burger" aria-label="Open menu" onClick={openMenu}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
