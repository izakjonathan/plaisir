# Plaisir 0.4.6 — mobile parallax stability

Root causes: placement refresh recreated offsets at zero; reveal animation/transition events reran geometry search; live innerHeight coupled the parallax target to mobile toolbar movement. Fixed by retaining displacement, retaining an existing viable composition, removing reveal event refreshes, ignoring viewport height-only resize, holding viewport height until width changes, and using elapsed-time exponential smoothing. Clamp rubber-band scroll coordinates without intercepting native touch scrolling. Layout resize, text mutation, image load and disclosure changes still refresh placement. Preserve reduced-motion behavior, text clearance and cleanup.

Research: GSAP's ScrollTrigger config documentation explicitly describes mobile resize refresh jumps: https://www.gsap.com/docs/v3/Plugins/ScrollTrigger/static.config%28%29/

Checks: TypeScript, 42 automated tests and production build. Component lifecycle regression uses simulated mobile toolbar resize, content refresh, directional reversal and unmount. This is not real iOS/Safari testing. No production content or database changes.
