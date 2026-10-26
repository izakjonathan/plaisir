"use client";
import { useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Preference = "system" | "full" | "reduced";
export default function PageMotion() {
  const path = usePathname();
  const [preference, setPreference] = useState<Preference>("system");
  const [systemReduced, setSystemReduced] = useState(false);
  const full = preference === "full" || (preference === "system" && !systemReduced);

  useLayoutEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    // Read the live preference here, including the very first layout effect.
    const reduced = preference === "reduced" ||
      (preference === "system" && matchMedia("(prefers-reduced-motion: reduce)").matches);
    root.dataset.motion = reduced ? "reduced" : "full";
    root.removeAttribute("data-motion-off");
    const tracked = new Set<HTMLElement>();
    const selector = "[data-reveal], .split-photo, .world-images figure";
    let observer: IntersectionObserver | undefined;
    const show = (el: HTMLElement, delay = 0) => {
      el.style.setProperty("--reveal-delay", `${delay}ms`);
      el.classList.replace("reveal-pending", "reveal-visible");
      observer?.unobserve(el);
    };
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(entries => {
        entries.filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .forEach((e, i) => show(e.target as HTMLElement, reduced ? 0 : Math.min(i * 60, 120)));
      }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });
    }
    const enroll = (el: HTMLElement) => {
      if (tracked.has(el)) return;
      tracked.add(el);
      // Strict Mode, route changes and preference changes all start clean.
      el.classList.remove("reveal-visible", "reveal-pending");
      el.setAttribute("data-reveal", "");
      const bounds = el.getBoundingClientRect();
      if (!observer || bounds.top <= innerHeight || el.contains(document.activeElement)) {
        el.classList.add("reveal-visible");
      } else {
        el.classList.add("reveal-pending");
        observer.observe(el);
      }
    };
    document.querySelectorAll<HTMLElement>(selector).forEach(enroll);
    const mutation = new MutationObserver(records => records.forEach(record => {
      record.addedNodes.forEach(node => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches(selector)) enroll(node);
        node.querySelectorAll<HTMLElement>(selector).forEach(enroll);
      });
    }));
    const main = document.querySelector("main");
    if (main) mutation.observe(main, { childList: true, subtree: true });
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      let el = event.target.closest<HTMLElement>("[data-reveal]");
      while (el) {
        show(el);
        el = el.parentElement?.closest<HTMLElement>("[data-reveal]") ?? null;
      }
    };
    document.addEventListener("focusin", focus);
    return () => {
      observer?.disconnect();
      mutation.disconnect();
      document.removeEventListener("focusin", focus);
      tracked.forEach(el => {
        el.classList.remove("reveal-pending", "reveal-visible");
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, [path, preference, systemReduced]);

  return <button className="motion-button" aria-pressed={full}
    onClick={() => setPreference(full ? "reduced" : "full")}>
    {full ? "Reduce motion" : "Enable animations"}
  </button>;
}
