# Plaisir 0.4.22 — splash readiness and direct hero crossfade

The splash previously faded its backdrop to black for 650ms, then faded the remaining black plate while separately fading the hero image in. Removed that intermediate blackout. The decoded splash photograph now stays opaque while its marks exit, then the whole splash fades over the prepared, fully opaque hero photograph. Hero text and bottle retain their separate arrivals.

Splash photo decoding is now independent of hero photo/font readiness. The splash starts when its own photograph and enabled logo are decoded, with high fetch priority for the splash photograph. Hero decoding and fonts prepare concurrently and gate the exit, with a bounded wait. Existing cancellation, timer cleanup, reduced motion, session gating and hydration recovery remain intact.

Validation: npm run check (TypeScript, 60 tests, production build). Sequence regression verifies hero readiness gates the crossfade without fading the backdrop to black. Masked SVG readiness and interruption tests retained. No production content changes. Physical iPhone/Safari and throttled mobile-network frame pacing are unverified.
