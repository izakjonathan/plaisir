"use client";
import type { CSSProperties } from "react";
import { ContentImage, useContent } from "./Content";
import { splashSettings } from "../lib/splash";

// Shared by the hero, first-visit splash and editor splash preview.
export function Bottle() {
  return <img src="/brand/bottle.svg" width="553" height="1347" alt="" aria-hidden="true" loading="eager" fetchPriority="high" />;
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
