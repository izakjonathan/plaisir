"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export default function PageMotion() {
  const path = usePathname();
  const [off, setOff] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    root.toggleAttribute("data-motion-off", off || reduced);
    if (off || reduced) return;
    if (!("IntersectionObserver" in window)) return;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal], .split-photo, .world-images figure",
      ),
    );
    targets.forEach((el) => el.setAttribute("data-reveal", ""));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in-view", "");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9)
        el.setAttribute("data-in-view", "");
      else observer.observe(el);
    });
    root.classList.add("motion-ready");
    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, [off, reduced, path]);
  return (
    <button
      className="motion-button"
      disabled={reduced}
      aria-pressed={off || reduced}
      onClick={() => setOff(!off)}
    >
      {off || reduced ? "Motion reduced" : "Reduce motion"}
    </button>
  );
}
