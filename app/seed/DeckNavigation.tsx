"use client";

import { useEffect, useState } from "react";
import s from "./seed.module.css";

const nextKeys = new Set(["ArrowDown", "ArrowRight", "PageDown", " "]);
const previousKeys = new Set(["ArrowUp", "ArrowLeft", "PageUp"]);

export default function DeckNavigation() {
  const [position, setPosition] = useState({ index: 0, tone: "photo", ids: [] as string[] });
  const { index, tone, ids } = position;

  useEffect(() => {
    const track = document.querySelector<HTMLElement>("[data-seed-track]");
    if (!track) return;
    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-seed-slide]"));
    const ids = slides.map(slide => slide.id);
    let active = -1;
    let frame = 0;
    const update = () => {
      frame = 0;
      const center = track.getBoundingClientRect().top + track.clientHeight * 0.5;
      const index = slides.findIndex(slide => slide.getBoundingClientRect().bottom > center);
      if (index < 0 || index === active) return;
      if (active >= 0) delete slides[active].dataset.active;
      active = index;
      slides[index].dataset.active = "true";
      setPosition({ index, tone: slides[index].dataset.tone ?? "green", ids });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey ||
        (event.target instanceof HTMLElement && event.target.closest("a, button, input, textarea, select, [contenteditable]"))) return;
      let target: number;
      if (event.key === "Home") target = 0;
      else if (event.key === "End") target = slides.length - 1;
      else if (previousKeys.has(event.key) || (event.shiftKey && event.key === " ")) target = active - 1;
      else if (nextKeys.has(event.key)) target = active + 1;
      else return;
      event.preventDefault();
      const slide = slides[target];
      if (slide) {
        history.replaceState(null, "", `#${slide.id}`);
        slide.scrollIntoView({ block: "start" });
      }
    };
    update();
    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("keydown", onKey);
    return () => {
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className={s.chrome} data-tone={tone}>
      <a className={s.wordmark} href="#cover" aria-label="Plaisir presentation cover" />
      <nav className={s.controls} aria-label="Slide navigation">
        <a href="#overview" className={s.indexLink}>Index</a>
        {ids.length > 0 && <>
          <span className={s.counter} aria-label={`Slide ${index + 1} of ${ids.length}`}>{String(index + 1).padStart(2, "0")} / {ids.length}</span>
          <a className={s.step} href={index > 0 ? `#${ids[index - 1]}` : undefined} aria-disabled={index === 0} aria-label="Previous slide">↑</a>
          <a className={s.step} href={index < ids.length - 1 ? `#${ids[index + 1]}` : undefined} aria-disabled={index === ids.length - 1} aria-label="Next slide">↓</a>
        </>}
      </nav>
    </header>
  );
}
