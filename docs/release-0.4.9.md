# 0.4.9 — Subtle parallax and image opacity

Bottle travel is limited to ±12px with a 0.04 scroll response, half the previous displacement and response. Direction, brief settling, mobile viewport stability and reduced motion remain unchanged.

The editor's generic text-input rule incorrectly applied width:100%, minimum height and padding to checkboxes. Checkbox inputs are now excluded; the overlay toggle has a fixed 24px input and a wrapping label inside the card.

Each image has a 0–100% overlay-opacity slider, disabled when its overlay is off. The image preview responds immediately. Strength applies to the green gradient, associated darkening and hero/splash treatment, without dimming text or artwork. 100% preserves the prior authored treatment; legacy images retain that default. Changing images preserves opacity; toggling off retains the selected value. The optional value is validated and retained through save/publish/restore and live preview. No published content was changed for validation.

Verification: TypeScript, 45 automated tests and production build. Store integration coverage includes differing image opacity values through draft, publish and restore. Live editor and public-route checks are performed after deployment. Physical iPhone/Safari checks remain unavailable.
