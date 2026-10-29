# 0.4.14 — Readiness-gated splash choreography

One Web Animations controller waits for actual responsive splash and hero image decode, the masked wordmark source and fonts. Public layers begin hidden over a black first-paint plate. A shared timeline fades in the treated photo (850ms), reveals the bottle and wordmark separately (850ms each, wordmark delayed 250ms), holds for the editable duration, fades the marks out with separate timing, fades the photograph to black, then dissolves the plate over the hero's own arrival. Inline SVG bottle geometry needs no download.

Loading failures/timeouts (five seconds), keyboard/pointer skip, reduced-motion changes and unmount all release scroll locks and cancel owned animations. Existing first-visit memory, disabled splash, deep links, no-JS/hydration fallback, editor controls and static editor composition preview remain intact. Explicit ?intro=replay bypasses session memory for reviewing the production sequence and still respects reduced motion. The old duration control is labelled Hold after reveal.

Research: MDN HTMLImageElement.decode() documents decode-before-display; Chrome modern motion guidance recommends transform/opacity and reduced motion. No animation dependency added.

Verification: npm run check (49 tests), including timeline order, interruptions, hidden marks, masked-logo decode, first-paint and replay behavior. Live first-visit/replay and return checks follow deployment. Physical iPhone/Safari verification unavailable. Published editor content preserved.
