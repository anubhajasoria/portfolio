"use client";

export type Config = { tension: number; friction: number };

/** Compose a transform string from motion state. */
export function motionStr(s: Record<string, number>, base = ""): string {
  let t = base ? base + " " : "";
  t += `translate(${s.x || 0}px, ${s.y || 0}px)`;
  if (s.scale !== undefined) t += ` scale(${s.scale})`;
  return t;
}

/** A single critically-tunable spring matching react-spring's tension/friction model. */
export class Spring {
  v: number;
  vel = 0;
  target: number;
  config: Config;
  constructor(value: number, config: Config) {
    this.v = value;
    this.target = value;
    this.config = config;
  }
  set(target: number) {
    this.target = target;
  }
  step(dt: number) {
    const a = this.config.tension * (this.target - this.v) - this.config.friction * this.vel;
    this.vel += a * dt;
    this.v += this.vel * dt;
  }
}

/* ---- Single shared rAF ticker (drives Lenis + every spring + parallax) ---- */
type Cb = (time: number, dt: number) => void;
const cbs = new Set<Cb>();
let started = false;
let last = 0;

function loop(t: number) {
  let dt = (t - last) / 1000;
  last = t;
  if (dt > 0.064) dt = 0.064;
  if (dt < 0) dt = 0;
  cbs.forEach((cb) => cb(t, dt));
  requestAnimationFrame(loop);
}

export function onTick(cb: Cb): () => void {
  if (typeof window === "undefined") return () => {};
  cbs.add(cb);
  if (!started) {
    started = true;
    last = performance.now();
    requestAnimationFrame(loop);
  }
  return () => {
    cbs.delete(cb);
  };
}
