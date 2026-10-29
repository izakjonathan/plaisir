"use client";
import { bottlePath } from "../lib/bottle-art";
import type { CSSProperties } from "react";
import { ContentImage, useContent } from "./Content";
import { splashSettings } from "../lib/splash";

// Shared by the hero, first-visit splash and editor splash preview.
export function Bottle() {
  return <svg className="brand-bottle-vector" viewBox="0 0 553 1347" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d={bottlePath} fill="currentColor" fillRule="evenodd" /></svg>;
}

export default function BrandSplash({ preview = false }: { preview?: boolean }) {
  const settings = splashSettings(useContent());
  return <div className={`brand-splash${preview ? " splash-preview" : ""}`} aria-hidden="true" style={{
    "--splash-overlay": settings.overlay / 100,
    "--splash-logo-scale": settings.logoScale / 100,
    "--splash-bottle-scale": settings.bottleScale / 100,
  } as CSSProperties}>
    <div className="splash-backdrop"><ContentImage field="splash.background" className="splash-photo" loading="eager" sizes="100vw"/>
    <div className="splash-green" /></div>
    <div className="splash-art">
      {settings.showBottle && <div className="splash-bottle"><Bottle /></div>}
      {settings.showLogo && <span className="splash-logo" />}
    </div>
  </div>;
}
