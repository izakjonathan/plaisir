"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { isReducedMotion } from "../lib/motion";

// A complete, scalable outline: the older bottle.webp is only a cropped fragment.
function Bottle() {
  return <svg viewBox="0 0 260 590" fill="none" aria-hidden="true">
    <path d="M82 23C104 36 151 38 166 25C178 12 132 8 91 22C100 58 101 121 88 161C78 188 49 191 32 217C13 245 33 277 30 319C28 374 12 428 15 487C16 528 17 554 44 560C90 579 195 567 226 528C253 495 230 455 227 412C222 370 235 317 235 273C233 231 205 198 185 164C160 124 157 91 163 62M45 560C15 541 69 533 99 539C133 544 167 563 161 577C150 593 99 575 69 564" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}

export default function LandingHero() {
  const [intro, setIntro] = useState<"splash" | "leaving" | "ready" | null>(null);
  const section = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("plaisir-intro-v1") === "seen"; } catch { /* Private storage can be unavailable. */ }
    if (seen || isReducedMotion() || location.hash || window.scrollY > 50) {
      setIntro("ready");
      return;
    }
    setIntro("splash");
    const root = document.documentElement;
    root.classList.add("brand-intro-active");
    let cancelled = false;
    let finished = false;
    let cap: ReturnType<typeof setTimeout>;
    let hold: ReturnType<typeof setTimeout>;
    let exit: ReturnType<typeof setTimeout>;
    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      clearTimeout(cap);
      clearTimeout(hold);
      root.classList.remove("brand-intro-active");
      setIntro("leaving");
      try { sessionStorage.setItem("plaisir-intro-v1", "seen"); } catch { /* Optional convenience only. */ }
      exit = setTimeout(() => { if (!cancelled) setIntro("ready"); }, 650);
    };
    const logo = section.current?.querySelector<HTMLImageElement>(".splash-logo");
    const ready = Promise.allSettled([document.fonts.ready, logo?.decode()]);
    cap = setTimeout(finish, 3200);
    // Give the separately loaded logo time to decode, without waiting indefinitely.
    Promise.race([ready, new Promise(resolve => { hold = setTimeout(resolve, 600); })]).then(() => {
      if (!cancelled && !finished) hold = setTimeout(finish, 1450);
    });
    const skip = () => { clearTimeout(cap); finish(); };
    document.addEventListener("keydown", skip, { once: true });
    document.addEventListener("pointerdown", skip, { once: true });
    return () => {
      cancelled = true;
      clearTimeout(hold); clearTimeout(exit); clearTimeout(cap);
      root.classList.remove("brand-intro-active");
      document.removeEventListener("keydown", skip);
      document.removeEventListener("pointerdown", skip);
    };
  }, []);

  return <section ref={section} className="scene hero brand-hero" data-intro={intro ?? undefined} aria-labelledby="home-title">
    <div className="hero-light" aria-hidden="true" />
    <div className="hero-bottle" aria-hidden="true"><Bottle /></div>
    <div className="scene-content hero-copy">
      <h1 id="home-title"><span className="hero-line"><span>A little</span></span><span className="hero-line"><span>everyday</span></span><span className="hero-line"><em>plaisir.</em></span></h1>
      <a className="pill hero-discover" href="#welcome">Discover the feeling <span aria-hidden="true">↓</span></a>
    </div>
    <div className="hero-shadow" aria-hidden="true" />
    <div className="brand-splash" aria-hidden="true">
      <div className="splash-light" />
      <div className="splash-art">
        <div className="splash-bottle"><Bottle /></div>
        <img className="splash-logo" src="/brand/wordmark-gold.png" width="900" height="380" alt="" loading="eager" fetchPriority="high" />
      </div>
      <div className="splash-shadow" />
    </div>
  </section>;
}
