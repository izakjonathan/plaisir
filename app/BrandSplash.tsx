"use client";
import type { CSSProperties } from "react";
import { ContentImage, useContent } from "./Content";
import { splashSettings } from "../lib/splash";

// A complete, scalable outline: the older bottle.webp is only a cropped fragment.
export function Bottle() {
  return <svg viewBox="0 0 260 590" fill="none" aria-hidden="true">
    <path d="M82 23C104 36 151 38 166 25C178 12 132 8 91 22C100 58 101 121 88 161C78 188 49 191 32 217C13 245 33 277 30 319C28 374 12 428 15 487C16 528 17 554 44 560C90 579 195 567 226 528C253 495 230 455 227 412C222 370 235 317 235 273C233 231 205 198 185 164C160 124 157 91 163 62M45 560C15 541 69 533 99 539C133 544 167 563 161 577C150 593 99 575 69 564" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}

export default function BrandSplash({ preview = false }: { preview?: boolean }) {
  const settings = splashSettings(useContent());
  return <div className={`brand-splash${preview ? " splash-preview" : ""}`} aria-hidden="true" style={{
    "--splash-overlay": settings.overlay / 100,
    "--splash-logo-scale": settings.logoScale / 100,
    "--splash-bottle-scale": settings.bottleScale / 100,
  } as CSSProperties}>
    <ContentImage field="splash.background" className="splash-photo" loading="eager" sizes="100vw"/>
    <div className="splash-green" />
    <div className="splash-art">
      {settings.showBottle && <div className="splash-bottle"><Bottle /></div>}
      {settings.showLogo && <img className="splash-logo" src="/brand/wordmark-gold.svg" width="1911" height="660" alt="" loading="eager" fetchPriority="high" />}
    </div>
  </div>;
}
