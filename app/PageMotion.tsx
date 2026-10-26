"use client";
import { useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
// Adapted from the supplied Shams LowerSectionReveal: visible-first enrollment,
// a short capped stagger, immediate focus visibility and cleanup that reveals all.
export default function PageMotion() {
  const path = usePathname();
  const [off, setOff] = useState(false);
  const [reduced, setReduced] = useState(false);
  useLayoutEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    let observer: IntersectionObserver | undefined;
    let mutation: MutationObserver | undefined;
    const tracked = new Set<HTMLElement>();
    const selector = "[data-reveal], .split-photo, .world-images figure";
    const reveal = (el: HTMLElement, delay = 0) => {
      el.style.setProperty("--reveal-delay", `${delay}ms`);
      el.classList.remove("reveal-pending");
      el.classList.add("reveal-visible");
      observer?.unobserve(el);
    };
    const revealAll = () => {
      observer?.disconnect();
      root.classList.remove("motion-ready");
      tracked.forEach((el) => reveal(el));
    };
    const sync = () => {
      setReduced(mq.matches);
      root.toggleAttribute("data-motion-off", off || mq.matches);
      if (off || mq.matches) revealAll();
    };
    sync();
    if (!off && !mq.matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
            .forEach((e, i) =>
              reveal(e.target as HTMLElement, Math.min(i * 40, 80)),
            );
        },
        { threshold: 0, rootMargin: "0px 0px -24px 0px" },
      );
      root.classList.add("motion-ready");
    }
    const enroll = (el: HTMLElement) => {
      if (tracked.has(el)) return;
      tracked.add(el);
      el.setAttribute("data-reveal", "");
      if (
        !observer ||
        off ||
        mq.matches ||
        el.getBoundingClientRect().top <=
          (window.visualViewport?.height ?? innerHeight) ||
        el.contains(document.activeElement)
      )
        reveal(el);
      else {
        el.classList.add("reveal-pending");
        observer.observe(el);
      }
    };
    document.querySelectorAll<HTMLElement>(selector).forEach(enroll);
    const main = document.querySelector("main");
    if (main && "MutationObserver" in window) {
      mutation = new MutationObserver((records) =>
        records.forEach((r) =>
          r.addedNodes.forEach((n) => {
            if (n instanceof HTMLElement) {
              if (n.matches(selector)) enroll(n);
              n.querySelectorAll<HTMLElement>(selector).forEach(enroll);
            }
          }),
        ),
      );
      mutation.observe(main, { childList: true, subtree: true });
    }
    const focus = (e: FocusEvent) => {
      if (!(e.target instanceof Element)) return;
      for (
        let el = e.target.closest<HTMLElement>("[data-reveal]");
        el;
        el = el.parentElement?.closest<HTMLElement>("[data-reveal]") ?? null
      )
        reveal(el);
    };
    mq.addEventListener("change", sync);
    document.addEventListener("focusin", focus);
    return () => {
      observer?.disconnect();
      mutation?.disconnect();
      mq.removeEventListener("change", sync);
      document.removeEventListener("focusin", focus);
      root.classList.remove("motion-ready");
      tracked.forEach((el) => {
        el.classList.remove("reveal-pending");
        el.classList.add("reveal-visible");
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, [off, path]);
  return (
    <button
      className="motion-button"
      disabled={reduced}
      aria-pressed={off || reduced}
      onClick={() => setOff((v) => !v)}
    >
      {off || reduced ? "Motion reduced" : "Reduce motion"}
    </button>
  );
}
