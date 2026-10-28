# 0.4.8 — Directional parallax and line reveals

Bottle displacement now decreases as document scroll increases. Existing time-based damping uses a 120ms time constant: a short catch-up after scroll events stop, without velocity overshoot, snapping or position resets. Travel remains bounded by the clearance used during placement. Stable mobile viewport measurements and reduced motion remain intact. GSAP's ScrollTrigger scrub documentation supports this catch-up approach; no dependency was added.

Public headings now share the hero's masked, 1000ms line arrival with 140ms staggering. Actual rendered lines are measured after fonts load and when width or content changes. The original React text remains in normal flow and accessible; aria-hidden visual copies preserve emphasis and manual breaks. Hero splash timing stays unchanged. Story session arrivals, focus access and reduced motion are preserved.

Validation: TypeScript, 44 tests and production build. The mobile simulation additionally checks reverse direction, easing after events stop, and stopping animation frames at rest. Physical iPhone/Safari verification remains unavailable.

References: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ and https://gsap.com/docs/v3/Plugins/SplitText/
