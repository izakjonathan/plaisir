"use client";
import { Copy, ContentImage, ContentLink, TitleLines, useContent } from "./Content";

import { useLayoutEffect, useRef, useState } from "react";
import { isReducedMotion } from "../lib/motion";
import BrandSplash, { Bottle } from "./BrandSplash";
import { splashSettings } from "../lib/splash";

export default function LandingHero() {
  const settings = splashSettings(useContent());
  // Server HTML already includes the covering splash. Never wait for hydration
  // to turn a previously visible page into a splash screen.
  const [intro, setIntro] = useState<"splash" | "leaving" | "ready">("splash");
  const section = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const root = document.documentElement;
    let seen = false;
    try { seen = sessionStorage.getItem("plaisir-intro-v2") === "seen"; } catch { /* Private storage can be unavailable. */ }
    if (!settings.enabled || root.dataset.introBoot === "failed" || seen || isReducedMotion() || location.hash || new URLSearchParams(location.search).get('preview') === 'draft' || window.scrollY > 50) {
      root.dataset.introBoot = "skip";
      setIntro("ready");
      return;
    }
    setIntro("splash");
    root.dataset.introBoot = "running";
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
      root.dataset.introBoot = "leaving";
      setIntro("leaving");
      try { sessionStorage.setItem("plaisir-intro-v2", "seen"); } catch { /* Optional convenience only. */ }
      exit = setTimeout(() => { if (!cancelled) { root.dataset.introBoot = "ready"; setIntro("ready"); } }, 650);
    };
    const logo = section.current?.querySelector<HTMLImageElement>(".splash-logo");
    const ready = Promise.allSettled([document.fonts.ready, logo?.decode()]);
    cap = setTimeout(finish, settings.duration + 1750);
    // Give the separately loaded logo time to decode, without waiting indefinitely.
    Promise.race([ready, new Promise(resolve => { hold = setTimeout(resolve, 600); })]).then(() => {
      if (!cancelled && !finished) hold = setTimeout(finish, settings.duration);
    });
    const skip = () => { clearTimeout(cap); finish(); };
    document.addEventListener("keydown", skip, { once: true });
    document.addEventListener("pointerdown", skip, { once: true });
    return () => {
      cancelled = true;
      clearTimeout(hold); clearTimeout(exit); clearTimeout(cap);
      root.classList.remove("brand-intro-active");
      root.dataset.introBoot = "skip";
      document.removeEventListener("keydown", skip);
      document.removeEventListener("pointerdown", skip);
    };
  }, [settings.enabled, settings.duration]);

  return <section ref={section} className="scene hero brand-hero" data-intro={intro} aria-labelledby="home-title">
    <ContentImage field="experience.hero.image1" className="scene-photo" fetchPriority="high" loading="eager" sizes="100vw"/>
    <div className="scene-shade" aria-hidden="true" />
    <div className="hero-light" aria-hidden="true" />
    <div className="hero-bottle" aria-hidden="true"><Bottle /></div>
    <div className="scene-content hero-copy">
      <h1 id="home-title"><TitleLines field="experience.hero.title"/></h1>
      <ContentLink className="pill hero-discover" field="experience.hero.link1"><Copy field="experience.hero.text5"/></ContentLink>
    </div>
    <div className="hero-shadow" aria-hidden="true" />
    {settings.enabled && <BrandSplash />}
  </section>;
}
