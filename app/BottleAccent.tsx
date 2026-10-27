"use client";
import { useLayoutEffect, useRef, useState } from "react";

/** Keep the page-wide artwork out of the measured text and control areas. */
export default function BottleAccent() {
  const art = useRef<HTMLDivElement>(null);
  const [mask, setMask] = useState<string>();
  useLayoutEffect(() => {
    const page = art.current?.parentElement;
    if (!page) return;
    let frame = 0;
    let active = true;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!active) return;
        const bounds = page.getBoundingClientRect();
        const holes = Array.from(page.querySelectorAll('h1,h2,h3,h4,p,dt,dd,a,summary,button,label,input,textarea')).map(el => {
          const box = el.getBoundingClientRect();
          if (!box.width || !box.height) return '';
          return `<rect x="${box.left-bounds.left-12}" y="${box.top-bounds.top-12}" width="${box.width+24}" height="${box.height+24}" rx="8" fill="black"/>`;
        }).join('');
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${bounds.width}" height="${bounds.height}"><defs><mask id="clear"><rect width="100%" height="100%" fill="white"/>${holes}</mask></defs><rect width="100%" height="100%" fill="white" mask="url(#clear)"/></svg>`;
        setMask(`url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
      });
    };
    const resize = new ResizeObserver(measure);
    resize.observe(page);
    const changes = new MutationObserver(measure);
    changes.observe(page, {childList:true, subtree:true, characterData:true});
    window.addEventListener('resize', measure);
    document.fonts.ready.then(() => { if (active) measure(); });
    measure();
    return () => { active=false; cancelAnimationFrame(frame); resize.disconnect(); changes.disconnect(); window.removeEventListener('resize',measure); };
  }, []);
  return <div ref={art} className="bottle-page-art" aria-hidden="true" style={{maskImage:mask, WebkitMaskImage:mask, opacity:mask?1:0}}>{[0,1,2].map(index =>
    <svg key={index} className={`bottle-fragment bottle-fragment--${index}`} viewBox="0 0 260 590" fill="none" focusable="false">
      <path vectorEffect="non-scaling-stroke" d="M82 23C104 36 151 38 166 25C178 12 132 8 91 22C100 58 101 121 88 161C78 188 49 191 32 217C13 245 33 277 30 319C28 374 12 428 15 487C16 528 17 554 44 560C90 579 195 567 226 528C253 495 230 455 227 412C222 370 235 317 235 273C233 231 205 198 185 164C160 124 157 91 163 62M45 560C15 541 69 533 99 539C133 544 167 563 161 577C150 593 99 575 69 564" />
    </svg>
  )}</div>;
}
