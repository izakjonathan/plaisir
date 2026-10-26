"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
    description: "The financial illustration",
  },
];
export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const menu = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);
  const [opened, setOpened] = useState(false);
  const finish = () => {
    menu.current?.close();
    setClosing(false);
    setOpened(false);
    document.documentElement.classList.remove("menu-open");
  };
  useEffect(() => {
    menu.current?.close();
    setClosing(false);
    setOpened(false);
    document.documentElement.classList.remove("menu-open");
  }, [pathname]);
  const close = () => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.hasAttribute("data-motion-off")
    ) {
      finish();
      return;
    }
    setClosing(true);
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="floating-header">
        <Link className="brand-logo" href="/" aria-label="Plaisir home">
          <img
            src="/brand/wordmark-gold.png"
            width="900"
            height="380"
            alt="Plaisir"
          />
        </Link>
        <button
          className="burger-button"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-controls="site-menu"
          aria-expanded={opened}
          onClick={() => {
            setClosing(false);
            menu.current?.showModal();
            setOpened(true);
            document.documentElement.classList.add("menu-open");
          }}
        >
          <span className="menu-lines" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>
      <dialog
        id="site-menu"
        className={`site-menu${closing ? " is-closing" : ""}`}
        ref={menu}
        aria-label="Explore Plaisir"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClose={() => {
          setOpened(false);
          document.documentElement.classList.remove("menu-open");
        }}
        onAnimationEnd={(e) => {
          if (e.target === e.currentTarget && closing) finish();
        }}
      >
        <div className="menu-top">
          <Link
            href="/"
            onClick={close}
            className="brand-logo"
            aria-label="Plaisir home"
          >
            <img
              src="/brand/wordmark-gold.png"
              width="900"
              height="380"
              alt="Plaisir"
            />
          </Link>
          <button
            autoFocus
            className="burger-button close-button"
            onClick={close}
            aria-label="Close menu"
          >
            <span aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
        <nav aria-label="Main navigation">
          {areas.map((a, i) => (
            <Link
              key={a.href}
              href={a.href}
              aria-current={pathname === a.href ? "page" : undefined}
              onClick={close}
              style={{ "--item": i } as React.CSSProperties}
            >
              <span className="menu-index">0{i + 1}</span>
              <span>
                {a.label}
                <small>{a.description}</small>
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
        <div className="footer-heading">
          <div>
            <p className="eyebrow">Coffee. Wine. Good company.</p>
            <h2 data-reveal>
              Make yourself
              <br />
              at home.
            </h2>
          </div>
          <Link href="/" className="footer-signature" aria-label="Plaisir home">
            <img
              src="/brand/wordmark-green.png"
              width="900"
              height="380"
              alt="Plaisir"
            />
          </Link>
        </div>
        <div className="footer-bottom">
          <nav aria-label="Footer navigation">
            {areas.map((a) => (
              <Link key={a.href} href={a.href}>
                {a.label}
              </Link>
            ))}
          </nav>
          <p>
            Plaisir · A concept in the making.
            <br />
            Not yet open. Images include concept renderings.
          </p>
          <PageMotion />
        </div>
      </footer>
    </>
  );
}
