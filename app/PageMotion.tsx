"use client";

import { useEffect } from "react";

export default function PageMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let navigation: IntersectionObserver | undefined;
    let frame = 0;
    const revealSelector =
      ".concept-content, .section-top, .experience-layout, .guest-row > div, .hospitality > div, .brand-images > figure, .brand-description, .flagship-layout > *, .team-intro, .team-list > div, .dashboard-intro, .launch-steps > div, .growth > div";
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelector),
    );
    const animate = () => {
      observer?.disconnect();
      root.classList.remove("motion-ready");
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.setAttribute("data-in-view", "");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.06, rootMargin: "0px 0px -24px 0px" },
      );
      targets.forEach((target, i) => {
        target.setAttribute("data-reveal", "");
        target.style.setProperty(
          "--reveal-delay",
          `${target.parentElement?.matches(".team-list, .guest-row, .launch-steps") ? (i % 4) * 65 : 0}ms`,
        );
        const rect = target.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0)
          target.setAttribute("data-in-view", "");
        observer?.observe(target);
      });
      root.classList.add("motion-ready");
    };
    const paintScroll = () => {
      frame = 0;
      const scroll = window.scrollY;
      const total = root.scrollHeight - window.innerHeight;
      root.style.setProperty(
        "--reading-progress",
        `${total > 0 ? Math.min(1, scroll / total) : 0}`,
      );
      root.style.setProperty(
        "--hero-shift",
        `${preference.matches ? 0 : Math.min(scroll * 0.12, 95)}px`,
      );
      root.toggleAttribute("data-scrolled", scroll > 36);
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(paintScroll);
    };
    animate();
    paintScroll();
    if ("IntersectionObserver" in window) {
      navigation = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
            );
          if (visible[0]) {
            document
              .querySelectorAll<HTMLAnchorElement>("#site-navigation a")
              .forEach((link) => {
                if (link.hash === `#${visible[0].target.id}`)
                  link.setAttribute("aria-current", "location");
                else link.removeAttribute("aria-current");
              });
          }
        },
        { rootMargin: "-12% 0px -58% 0px", threshold: 0 },
      );
      document
        .querySelectorAll("main > section[id]")
        .forEach((section) => navigation?.observe(section));
    }
    const onPreference = () => {
      animate();
      paintScroll();
    };
    preference.addEventListener("change", onPreference);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll, { passive: true });
    return () => {
      observer?.disconnect();
      navigation?.disconnect();
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", onPreference);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      root.classList.remove("motion-ready");
      root.removeAttribute("data-scrolled");
      root.style.removeProperty("--hero-shift");
      root.style.removeProperty("--reading-progress");
    };
  }, []);
  return null;
}
