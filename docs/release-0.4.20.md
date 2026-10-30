# Plaisir 0.4.20 — matching menu opening and closing

Removed the separate accelerated exit duration and easing. Both directions now use the existing menu transition: 680ms on mobile, 720ms on desktop, with cubic-bezier(0.22, 1, 0.36, 1). The menu slides upward out of view with the same smooth deceleration as its entrance.

SiteShell's completion fallback reads the shared duration token, so it cannot unmount the menu at the old 220ms cutoff. Transition-end completion, system reduced motion, prefetching, cached pages and covered scroll reset remain intact. No data or published editor content changed.

Validation: npm run check (TypeScript, 59 tests, production build); menu covered-handoff and CSS ownership checks included. Physical iPhone/Safari has not been tested.
