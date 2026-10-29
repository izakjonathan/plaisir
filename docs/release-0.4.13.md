# 0.4.13 — Continuous editor and inherited image opacity

Selecting a main editor page displays all its sections in a continuous grouped form. The secondary section dropdown and state are removed. Clear section headings preserve navigation context; image previews load lazily to limit work on long pages.

Brand colors includes a global 0–100% overlay/gradient opacity control. Missing image opacity inherits this setting. Explicit image values, including zero, remain overrides; overlay-off images stay off. Each image retains a slider, reports inherited/custom status and has a Use global opacity action that removes only the override. Image replacement preserves treatment preferences. Legacy documents default to 100% global strength. Existing image defaults no longer declare a redundant 100% override.

Verification: TypeScript, 46 tests and production build. New coverage checks inheritance, overrides, zero, disabled overlays, reset and invalid global values. Live editor/preview checks use unsaved changes only; published database content is preserved. Physical iPhone/Safari testing unavailable.
