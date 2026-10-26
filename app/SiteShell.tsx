"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type MouseEvent,
} from "react";
import PageMotion from "./PageMotion";
const areas = [
  { href: "/", label: "The experience" },
  { href: "/investors", label: "The story" },
  { href: "/financials", label: "The numbers" },
];
type Phase = "closed" | "opening" | "open" | "closing";
export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const menu = useRef<HTMLDialogElement>(null);
  const pending = useRef<string | null>(null);
  const [phase, setPhase] = useState<Phase>("closed");
  const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.hasAttribute("data-motion-off");
  const finish = useCallback(() => {
    menu.current?.close();
    setPhase("closed");
    document.documentElement.classList.remove("menu-open");
    const href = pending.current;
    pending.current = null;
    if (href) router.push(href);
  }, [router]);
  useEffect(() => {
    menu.current?.close();
    setPhase("closed");
    pending.current = null;
    document.documentElement.classList.remove("menu-open");
  }, [pathname]);
  useEffect(() => {
    if (phase !== "opening") return;
    if (reduced()) {
      setPhase("open");
      return;
    }
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setPhase("open"));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [phase]);
  useEffect(() => {
    if (phase !== "closing") return;
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--duration-menu")
      .trim();
    const value = parseFloat(raw);
    const ms = Number.isFinite(value)
      ? value * (raw.endsWith("ms") ? 1 : 1000)
      : 360;
    const timer = setTimeout(finish, reduced() ? 0 : ms + 100);
    return () => clearTimeout(timer);
  }, [phase, finish]);
  useEffect(
    () => () => document.documentElement.classList.remove("menu-open"),
    [],
  );
  const close = () => {
    if (reduced()) finish();
    else setPhase("closing");
  };
  const navigate = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    pending.current = href;
    close();
  };
  const x = (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M5 5L23 23M23 5L5 23" />
    </svg>
  );
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
          aria-expanded={phase !== "closed" && phase !== "closing"}
          onClick={() => {
            pending.current = null;
            setPhase("opening");
            menu.current?.showModal();
            document.documentElement.classList.add("menu-open");
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M2 10H26M2 18H26" />
          </svg>
        </button>
      </header>
      <dialog
        id="site-menu"
        className="site-menu"
        data-phase={phase}
        ref={menu}
        aria-label="Explore Plaisir"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClose={() => {
          setPhase("closed");
          document.documentElement.classList.remove("menu-open");
        }}
        onTransitionEnd={(e) => {
          if (
            e.target === e.currentTarget &&
            e.propertyName === "transform" &&
            phase === "closing"
          )
            finish();
        }}
      >
        <div className="menu-top">
          <Link
            href="/"
            onClick={(e) => navigate(e, "/")}
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
            {x}
          </button>
        </div>
        <nav aria-label="Main navigation">
          {areas.map((a, i) => (
            <Link
              key={a.href}
              href={a.href}
              aria-current={pathname === a.href ? "page" : undefined}
              onClick={(e) => navigate(e, a.href)}
              style={{ "--item": i } as React.CSSProperties}
            >
              {a.label}
            </Link>
          ))}
        </nav>
      </dialog>
      {children}
      <footer className="brand-footer">
        <div className="footer-heading">
          <h2 data-reveal>
            Make yourself
            <br />
            at home.
          </h2>
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
          <p>Concept preview. Not yet open.</p>
          <PageMotion />
        </div>
      </footer>
    </>
  );
}
