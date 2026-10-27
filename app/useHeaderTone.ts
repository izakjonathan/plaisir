"use client";
import { useLayoutEffect } from "react";
/** Keep the two floating controls legible without adding a header bar or shadow. */
export function useHeaderTone(pathname: string) {
    useLayoutEffect(() => {
        const root = document.documentElement;
        // The financial canvas is yellow throughout, including the gap above
        // its first section. Set it before paint without observing scroll.
        if ((pathname === "/financials" || pathname === "/financials-v2")) {
            root.dataset.headerTone = "dark";
            root.style.setProperty("--document-canvas-image", "none");
            root.style.setProperty("--document-canvas-color", "#d19c36");
            return;
        }
        const sections = [...document.querySelectorAll<HTMLElement>("main > section, main > figure, .brand-footer")];
        let observer: IntersectionObserver | undefined;
        const observe = () => {
            observer?.disconnect();
            const height = document.documentElement.clientHeight;
            const button = document.querySelector(".floating-header .burger-button");
            const rect = button?.getBoundingClientRect();
            const y = Math.max(0, Math.min(height - 2, rect ? rect.top + rect.height / 2 : 44));
            const paint = (element: HTMLElement) => {
        const photo = element.querySelector<HTMLImageElement>("img.scene-photo");
        root.style.setProperty("--document-canvas-image", photo?.currentSrc ? `linear-gradient(#101b0d88,#101b0d88),url(${JSON.stringify(photo.currentSrc)})` : "none");
                root.style.setProperty("--document-canvas-color", element.matches(".gold-section, .brand-footer") || element.closest(".pl-financial-page") ? "#d19c36" : "#101b0d");
        root.dataset.headerTone = element.matches(".gold-section, .brand-footer") ||
                    element.closest(".pl-financial-page") ? "dark" : "gold";
            };
            // Also handles restored scroll positions before the first observer callback.
            const initial = sections.find(section => {
                const box = section.getBoundingClientRect();
                return box.top <= y && box.bottom > y;
            });
            if (initial)
                paint(initial);
            if (!("IntersectionObserver" in window))
                return;
            observer = new IntersectionObserver(entries => {
                entries.filter(entry => entry.isIntersecting).forEach(entry => paint(entry.target as HTMLElement));
            }, { rootMargin: `-${Math.floor(y)}px 0px -${Math.max(0, Math.floor(height - y - 2))}px 0px`, threshold: 0 });
            sections.forEach(section => observer?.observe(section));
        };
        observe();
        let frame = 0;
        const resize = () => {
            if (frame)
                return;
            frame = requestAnimationFrame(() => { frame = 0; observe(); });
        };
        window.addEventListener("resize", resize, { passive: true });
        return () => {
            observer?.disconnect();
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(frame);
        };
    }, [pathname]);
}
