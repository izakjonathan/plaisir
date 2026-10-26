"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import PageMotion from "./PageMotion";
const areas = [
  {
    href: "/",
    label: "The experience",
    description: "Coffee, wine & good company",
  },
  {
    href: "/investors",
    label: "The story",
    description: "The business behind Plaisir",
  },
  {
    href: "/financials",
    label: "The numbers",
    description: "Explore the financial illustration",
  },
];
export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const menu = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    menu.current?.close();
    document.documentElement.classList.remove("menu-open");
  }, [pathname]);
  const close = () => {
    menu.current?.close();
    document.documentElement.classList.remove("menu-open");
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="floating-header">
        <Link className="brand-logo" href="/" aria-label="Plaisir home">
          <span className="wordmark" role="img" aria-label="Plaisir" />
        </Link>
        <button
          className="menu-button pill"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-controls="site-menu"
          onClick={() => {
            menu.current?.showModal();
            document.documentElement.classList.add("menu-open");
          }}
        >
          Menu{" "}
          <span className="menu-lines" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>
      <dialog
        id="site-menu"
        className="site-menu"
        ref={menu}
        aria-label="Explore Plaisir"
        onClose={() => document.documentElement.classList.remove("menu-open")}
      >
        <div className="menu-top">
          <Link
            href="/"
            onClick={close}
            className="brand-logo"
            aria-label="Plaisir home"
          >
            <span className="wordmark" role="img" aria-label="Plaisir" />
          </Link>
          <button autoFocus className="pill" onClick={close}>
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav aria-label="Main navigation">
          {areas.map((a, i) => (
            <Link
              key={a.href}
              href={a.href}
              aria-current={pathname === a.href ? "page" : undefined}
              onClick={close}
            >
              <span className="menu-index">0{i + 1}</span>
              <span>
                {a.label}
                <small>{a.description}</small>
              </span>
              <span className="menu-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </nav>
        <div className="menu-bottom">
          <span>A little everyday pleasure.</span>
          <span>New York · Concept preview</span>
        </div>
      </dialog>
      {children}
      <footer className="brand-footer">
        <p className="eyebrow">Coffee. Wine. Good company.</p>
        <Link href="/" className="footer-wordmark" aria-label="Plaisir home">
          <span className="wordmark" role="img" aria-label="Plaisir" />
        </Link>
        <div className="footer-bottom">
          <p>
            Plaisir · A concept in the making.
            <br />
            Not yet open. Images include concept renderings.
          </p>
          <nav aria-label="Footer navigation">
            {areas.map((a) => (
              <Link key={a.href} href={a.href}>
                {a.label}
              </Link>
            ))}
          </nav>
          <PageMotion />
        </div>
      </footer>
    </>
  );
}
