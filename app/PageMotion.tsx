"use client";

import { useEffect, useState } from "react";

export default function PageMotion() {
  const [motionOff, setMotionOff] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setSystemReduced(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    const reduce =
      motionOff ||
      systemReduced ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.toggleAttribute("data-motion-off", reduce);
    let frame = 0;
    let heroVisible = true;
    const hero = document.querySelector<HTMLElement>(".pl-hero");
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    let reveal: IntersectionObserver | undefined;
    let scenes: IntersectionObserver | undefined;
    if (!reduce && "IntersectionObserver" in window) {
      reveal = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.setAttribute("data-in-view", "");
              reveal?.unobserve(entry.target);
            }
          }),
        { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
      );
      targets.forEach((target) => {
        if (target.getBoundingClientRect().top < window.innerHeight)
          target.setAttribute("data-in-view", "");
        reveal?.observe(target);
      });
      scenes = new IntersectionObserver((entries) => {
        heroVisible = entries[0]?.isIntersecting ?? false;
      });
      if (hero) scenes.observe(hero);
      root.classList.add("pl-motion-ready");
    }
    const paint = () => {
      frame = 0;
      const top = window.scrollY;
      const range = root.scrollHeight - window.innerHeight;
      root.style.setProperty(
        "--reading-progress",
        `${range > 0 ? Math.min(1, top / range) : 0}`,
      );
      if (heroVisible)
        root.style.setProperty(
          "--scene-shift",
          `${reduce ? 0 : Math.min(top * 0.07, 36)}px`,
        );
      root.toggleAttribute("data-scrolled", top > 40);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      reveal?.disconnect();
      scenes?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      root.classList.remove("pl-motion-ready");
      root.removeAttribute("data-motion-off");
      root.removeAttribute("data-scrolled");
      root.style.removeProperty("--reading-progress");
      root.style.removeProperty("--scene-shift");
    };
  }, [motionOff, systemReduced]);
  return (
    <button
      className="pl-motion-control"
      aria-pressed={motionOff || systemReduced}
      disabled={systemReduced}
      onClick={() => setMotionOff((value) => !value)}
    >
      {motionOff || systemReduced ? "Motion reduced" : "Reduce motion"}
      <span aria-hidden="true">{motionOff || systemReduced ? "−" : "+"}</span>
    </button>
  );
}
