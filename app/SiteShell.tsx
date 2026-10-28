"use client";
import Heading from "./Heading";
import { Copy, ContentImage } from "./Content";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, useCallback, type ReactNode, type MouseEvent, type CSSProperties } from "react";
import { afterPaint, cssTimeMs, isReducedMotion } from "../lib/motion";
import PageMotion from "./PageMotion";
import { useHeaderTone } from "./useHeaderTone";
const areas = [
    { href: "/", label: "The experience", description: "Coffee, wine & good company" },
    { href: "/investors", label: "The story", description: "The business behind Plaisir" },
    { href: "/financials", label: "The numbers", description: "The financial illustration" },
    { href: "/financials-v2", label: "The Numbers v2", description: "The investor forecast & funding plan" },
];
type Phase = "closed" | "opening" | "open" | "closing";
function MarketingShell({ children }: {
    children: ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const headerTone = useHeaderTone(pathname);
    const panel = useRef<HTMLDivElement>(null);
    const button = useRef<HTMLButtonElement>(null);
    const keyboard = useRef(false);
    const lastPathname = useRef(pathname);
    const navigating = useRef(false);
    const [phase, setPhase] = useState<Phase>("closed");
    const mounted = phase !== "closed";
    const visible = phase === "open";
    const expanded = phase === "opening" || visible;
    const finish = useCallback(() => {
        setPhase("closed");
        if (keyboard.current && !navigating.current)
            button.current?.focus({ preventScroll: true });
        navigating.current = false;
    }, []);
    useEffect(() => {
        if (phase !== "opening")
            return;
        if (isReducedMotion()) {
            setPhase("open");
            return;
        }
        return afterPaint(() => setPhase("open"));
    }, [phase]);
    useEffect(() => {
        if (phase !== "closing")
            return;
        if (isReducedMotion()) {
            finish();
            return;
        }
        const timer = setTimeout(finish, cssTimeMs("--duration-menu-exit", 480) + 100);
        return () => clearTimeout(timer);
    }, [phase, finish]);
    useLayoutEffect(() => {
        const regions = [...document.querySelectorAll<HTMLElement>("main, .brand-footer, .skip-link")];
        regions.forEach(region => { region.inert = mounted; });
        document.documentElement.classList.toggle("menu-open", mounted);
        const preventBackgroundDrag = (event: TouchEvent) => {
            if (mounted && !(event.target instanceof Node && panel.current?.contains(event.target)))
                event.preventDefault();
        };
        if (mounted)
            document.addEventListener("touchmove", preventBackgroundDrag, { passive: false });
        return () => {
            document.removeEventListener("touchmove", preventBackgroundDrag);
            regions.forEach(region => { region.inert = false; });
            document.documentElement.classList.remove("menu-open");
        };
    }, [mounted, pathname]);
    useEffect(() => {
        if (lastPathname.current === pathname)
            return;
        lastPathname.current = pathname;
        // The menu covers the route switch. Its exit reveals the new page rather
        // than the old page flashing back into view before navigation finishes.
        if (mounted)
            setPhase("closing");
    }, [pathname, mounted]);
    useEffect(() => {
        if (!mounted)
            return;
        const links = [...(panel.current?.querySelectorAll<HTMLElement>('a[href]') ?? [])];
        const focusable = [button.current, ...links].filter((el): el is HTMLElement => Boolean(el));
        if (visible && keyboard.current)
            links[0]?.focus({ preventScroll: true });
        const onKey = (event: KeyboardEvent) => {
            if (expanded && event.key === "Escape") {
                event.preventDefault();
                setPhase("closing");
                return;
            }
            if (!visible || event.key !== "Tab")
                return;
            keyboard.current = true;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
            }
            else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [mounted, visible, expanded]);
    const close = () => {
        if (!keyboard.current)
            (document.activeElement as HTMLElement | null)?.blur();
        if (expanded)
            setPhase("closing");
    };
    const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
            return;
        event.preventDefault();
        if (href === pathname) {
            close();
            return;
        }
        navigating.current = true;
        (document.activeElement as HTMLElement | null)?.blur();
        router.push(href);
    };
    return (<>
      <div className="brand-grain" aria-hidden="true"/>
      <a className="skip-link" href="#main"><Copy field="shared.shell.text1"/></a>
      <header className="floating-header" data-page={(pathname === "/financials" || pathname === "/financials-v2") ? "financials" : "experience"}>
        <Link className="brand-logo" style={{backgroundColor: !mounted && headerTone === "dark" ? "var(--brand-green)" : "var(--brand-gold)"}} href="/" aria-label="Plaisir home" inert={mounted}>
          <img src={!mounted && headerTone === "dark" ? "/brand/wordmark-green.svg" : "/brand/wordmark-gold.svg"} width="1911" height="660" alt="Plaisir" fetchPriority="high"/>
        </Link>
        <button ref={button} className="burger-button" style={{color: !mounted && headerTone === "dark" ? "var(--brand-green)" : "var(--brand-gold)"}} type="button" aria-label={mounted ? "Close menu" : "Open menu"} aria-haspopup="dialog" aria-controls={mounted ? "site-menu" : undefined} aria-expanded={expanded} onPointerDown={() => { keyboard.current = false; }} onKeyDown={event => {
            if (event.key === "Enter" || event.key === " ")
                keyboard.current = true;
        }} onClick={event => {
            if (event.detail === 0)
                keyboard.current = true;
            if (!keyboard.current)
                requestAnimationFrame(() => button.current?.blur());
            if (phase === "closed") {
                navigating.current = false;
                setPhase("opening");
            }
            else if (phase !== "closing")
                close();
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path className="burger-stroke burger-top" d="M3 10H25"/>
            <path className="burger-stroke burger-bottom" d="M3 18H25"/>
          </svg>
        </button>
      </header>
      {mounted && (<div ref={panel} id="site-menu" className="site-menu" data-phase={phase} role="dialog" aria-modal="true" aria-label="Explore Plaisir" aria-hidden={!visible} inert={!visible} onPointerDown={() => { keyboard.current = false; }} onTransitionEnd={event => {
                if (phase === "closing" && event.target === event.currentTarget && event.propertyName === "transform")
                    finish();
            }}>
          <nav aria-label="Main navigation">
            {areas.map((area, index) => (<Link key={area.href} href={area.href} aria-current={pathname === area.href ? "page" : undefined} onClick={event => navigate(event, area.href)} style={{ "--item": Math.min(index, 5) } as CSSProperties}>
                <span><Copy field={`shared.menu.${index}.label`}/></span><small><Copy field={`shared.menu.${index}.description`}/></small>
              </Link>))}
          </nav>
        </div>)}
      {children}
      <PageMotion />
      <footer className="brand-footer">
        <div className="footer-top">
          <div className="footer-heading"><p className="eyebrow">Coffee. Wine. Good company.</p><Heading as="h2" data-reveal><Copy field="shared.shell.text2"/></Heading></div>
        <Link href="/" className="footer-signature" aria-label="Plaisir home"><img src="/brand/wordmark-green.svg" width="1911" height="660" alt="Plaisir" loading="lazy"/></Link>
        </div>

        <div className="footer-bottom"><p><Copy field="shared.shell.text3"/></p><a href="#main" className="footer-top-link">Back to top <span aria-hidden="true">↑</span></a></div>
      </footer>
    </>);
}

export default function SiteShell({children}:{children:ReactNode}) {
 const pathname=usePathname();
 return pathname.startsWith("/admin") ? <>{children}</> : <MarketingShell>{children}</MarketingShell>;
}
