"use client";

import Link from "next/link";
import { useUI } from "./Providers";
import { SITE } from "@/lib/data";

export default function SubHeader() {
  const { openModal, openMenu } = useUI();
  return (
    <header className="subbar">
      <Link href="/" className="subbar-home">← Home</Link>
      <span className="subbar-brand">{SITE.wordmark}</span>
      <div className="subbar-right">
        <button className="book-txt-dark" onClick={openModal}>Get in touch</button>
        <button className="burger dark" aria-label="Open menu" onClick={openMenu}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
