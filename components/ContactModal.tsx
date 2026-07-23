"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Spring, onTick, motionStr } from "@/lib/spring";
import { useUI } from "./Providers";
import Eyebrow from "./ui/Eyebrow";
import StackedLines from "./reveal/StackedLines";
import PillButton from "./ui/PillButton";

export default function ContactModal() {
  const { modalOpen, closeModal } = useUI();
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [firstName, setFirstName] = useState("there");
  const [error, setError] = useState<string | null>(null);

  const backdropRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const xRef = useRef<SVGSVGElement | null>(null);
  const springs = useRef<{ bO: Spring; pO: Spring; pY: Spring; pS: Spring; x: Spring } | null>(null);

  useEffect(() => setMounted(true), []);

  // Springs + rAF application.
  useEffect(() => {
    const bO = new Spring(0, { tension: 240, friction: 30 });
    const pO = new Spring(0, { tension: 240, friction: 26 });
    const pY = new Spring(28, { tension: 240, friction: 26 });
    const pS = new Spring(0.96, { tension: 240, friction: 26 });
    const x = new Spring(0, { tension: 300, friction: 18 });
    springs.current = { bO, pO, pY, pS, x };
    const off = onTick((_t, dt) => {
      [bO, pO, pY, pS, x].forEach((s) => s.step(dt));
      if (backdropRef.current) backdropRef.current.style.opacity = String(bO.v);
      if (panelRef.current) {
        panelRef.current.style.opacity = String(pO.v);
        panelRef.current.style.transform = motionStr({ y: pY.v, scale: pS.v });
      }
      if (xRef.current) xRef.current.style.transform = `rotate(${90 * x.v}deg)`;
    });
    return off;
  }, []);

  // Open / close orchestration.
  useEffect(() => {
    const s = springs.current;
    if (!s) return;
    if (modalOpen) {
      s.bO.set(1);
      s.pO.set(1);
      s.pY.set(0);
      s.pS.set(1);
      const t = window.setTimeout(() => nameRef.current?.focus(), 120);
      return () => window.clearTimeout(t);
    } else {
      s.bO.set(0);
      s.pO.set(0);
      s.pY.set(28);
      s.pS.set(0.96);
      const t = window.setTimeout(() => {
        setSubmitting(false);
        setSuccess(false);
        setFirstName("there");
        setError(null);
      }, 350);
      return () => window.clearTimeout(t);
    }
  }, [modalOpen]);

  // Esc to close.
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    setFirstName(name.split(/\s+/)[0] || "there");
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to send message");
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className={`modal ${modalOpen ? "open" : ""}`} aria-hidden={!modalOpen}>
      <div className="modal-backdrop" ref={backdropRef} onClick={closeModal} />
      <div className="modal-panel" role="dialog" aria-modal="true" aria-label="Get in touch" ref={panelRef}>
        <div className="modal-head">
          <div>
            <Eyebrow tone="dark">Get in touch</Eyebrow>
            <StackedLines as="h2" lines={["Let's work", "together"]} stagger={90} duration={800} play={modalOpen} />
          </div>
          <button
            className="icon-btn"
            aria-label="Close"
            onClick={closeModal}
            onPointerEnter={() => springs.current?.x.set(1)}
            onPointerLeave={() => springs.current?.x.set(0)}
          >
            <svg ref={xRef} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="success">
            <div className="check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3>Message sent</h3>
            <p>Thanks, {firstName} — I&apos;ll get back to you within a couple of days.</p>
            <PillButton variant="solid" onClick={closeModal}>Done</PillButton>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="mf-name">Full name</label>
              <input ref={nameRef} id="mf-name" name="name" type="text" placeholder="Alex Rivera" />
            </div>
            <div className="field">
              <label htmlFor="mf-email">Email</label>
              <input id="mf-email" name="email" type="email" placeholder="you@email.com" />
            </div>
            <div className="field">
              <label htmlFor="mf-msg">What can I help with?</label>
              <textarea id="mf-msg" name="message" rows={3} placeholder="A bit about your project, timeline, and what you're looking for…" />
            </div>
            {error && <p className="form-error">{error}</p>}
            <button className="submit-btn" type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
