# Plaisir 0.4.5 — bottle parallax and header surfaces

Baseline: 245871a75ab32f6f1a5cea23bef6c125315a6812. No content or database changes.

BottleAccent retains its vector outlines and placement system. An independent translate value adds smoothed, reversible scroll-linked motion bounded to 24px each way. Collision clearance reserves the full travel range. Passive scrolling only schedules animation; frames stop at rest, and no placement search runs on scroll. Listeners/frames are cleaned up, including late font readiness. System reduced motion resets displacement to zero.

useHeaderTone previously classified the entire yellow split section as a yellow surface even when its photo occupied the mobile header position. It now gives photographic bounds priority at the sampled control position. Financial pages retain their fixed green controls.

Verification: TypeScript, 41 tests, production build. New tests cover reversal, bounded travel, reduced motion, and photographic versus yellow surface selection on stacked and split layouts. Physical iPhone/Safari behavior remains unverified.
