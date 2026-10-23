"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";
import PageMotion from "./PageMotion";

const areas = [
  {
    href: "/",
    label: "Experience",
    description: "Coffee, wine & good company",
  },
  {
    href: "/investors",
    label: "Investors",
    description: "The business behind Plaisir",
  },
  {
    href: "/financials",
    label: "Financials",
    description: "Assumptions, numbers & scenarios",
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
      <header
        className={`pc-header${pathname === "/" ? " pc-header-home" : ""}`}
      >
        <Link href="/" aria-label="Plaisir home" className="pc-logo">
          <img
            src="/brand/wordmark.webp"
            width="900"
            height="380"
            alt="Plaisir"
          />
          <span>coffee & wine</span>
        </Link>
        <nav className="pc-desktop-nav" aria-label="Website areas">
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
          className="pc-menu-toggle"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-controls="site-menu"
          onClick={() => menu.current?.showModal()}
        >
          <span>Menu</span>
          <i aria-hidden="true">
            <b />
            <b />
            <b />
          </i>
        </button>
      </header>
      <dialog
        ref={menu}
        id="site-menu"
        className="pc-menu"
        aria-label="Explore Plaisir"
      >
        <div className="pc-menu-top">
          <img
            src="/brand/wordmark.webp"
            width="900"
            height="380"
            alt="Plaisir"
          />
          <button
            autoFocus
            onClick={() => menu.current?.close()}
            aria-label="Close menu"
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav aria-label="Main navigation">
          {areas.map((area) => (
            <Link
              href={area.href}
              key={area.href}
              aria-current={pathname === area.href ? "page" : undefined}
              onClick={() => menu.current?.close()}
            >
              {area.label}
              <small>{area.description}</small>
            </Link>
          ))}
        </nav>
        <div className="pc-menu-bottom">
          <p>A little everyday pleasure.</p>
          <p>
            Three distinct destinations.
            <br />
            One Plaisir.
          </p>
        </div>
      </dialog>
      {children}
      <footer className="pc-footer">
        <div className="pc-footer-brand">
          <img
            src="/brand/wordmark.webp"
            width="900"
            height="380"
            alt="Plaisir"
            loading="lazy"
          />
          <p>Coffee & wine. Good company.</p>
        </div>
        <div className="pc-footer-bottom">
          <div>
            <span>Plaisir · Concept preview</span>
            <p>
              Not yet open. Imagery includes generated concepts.
              <br />
              Final menus, location and opening details to follow.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            {areas.map((area) => (
              <Link key={area.href} href={area.href}>
                {area.label}
              </Link>
            ))}
          </nav>
          <PageMotion />
        </div>
      </footer>
      <nav className="pc-mobile-nav" aria-label="Website areas">
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
    </>
  );
}
