"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";
import PageMotion from "./PageMotion";

const areas = [
  {
    href: "/",
    label: "Experience",
    description: "The public-facing Plaisir experience",
  },
  {
    href: "/investors",
    label: "Investors",
    description: "The concept, people and operating plan",
  },
  {
    href: "/financials",
    label: "Financials",
    description: "Explore assumptions and scenarios",
  },
];
export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const menu = useRef<HTMLDialogElement>(null);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="pl-header">
        <Link href="/" className="pl-header-brand" aria-label="Plaisir home">
          <img
            src="/brand/wordmark.webp"
            width="900"
            height="380"
            alt="Plaisir"
          />
        </Link>
        <span className="pl-header-descriptor">Coffee & wine</span>
        <nav className="pl-area-nav" aria-label="Website areas">
          {areas.map((area) => (
            <Link
              key={area.href}
              href={area.href}
              aria-current={pathname === area.href ? "page" : undefined}
            >
              {area.label}
            </Link>
          ))}
        </nav>
        <button
          className="pl-menu-button"
          onClick={() => menu.current?.showModal()}
          aria-haspopup="dialog"
          aria-controls="pl-navigation"
        >
          Menu{" "}
          <span aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
        <span className="pl-progress" aria-hidden="true" />
      </header>
      <dialog
        ref={menu}
        id="pl-navigation"
        className="pl-menu"
        aria-label="Explore Plaisir"
      >
        <div className="pl-menu-top">
          <span>Three ways into Plaisir</span>
          <button
            autoFocus
            onClick={() => menu.current?.close()}
            aria-label="Close menu"
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav aria-label="Main navigation">
          {areas.map((area, index) => (
            <Link
              key={area.href}
              href={area.href}
              aria-current={pathname === area.href ? "page" : undefined}
              onClick={() => menu.current?.close()}
            >
              <span>0{index + 1}</span>
              <div>
                {area.label}
                <small>{area.description}</small>
              </div>
            </Link>
          ))}
        </nav>
        <p>
          A neighbourhood concept.
          <br />A little everyday pleasure.
        </p>
      </dialog>
      {children}
      <footer className="pl-footer">
        <div>
          <p>Plaisir · coffee & wine</p>
          <p>
            Concept preview · Not yet open.
            <br />
            Concept imagery includes AI-generated scenes.
          </p>
        </div>
        <PageMotion />
      </footer>
      <nav className="pl-mobile-dock" aria-label="Website areas">
        {areas.map((area, index) => (
          <Link
            key={area.href}
            href={area.href}
            aria-current={pathname === area.href ? "page" : undefined}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {area.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
