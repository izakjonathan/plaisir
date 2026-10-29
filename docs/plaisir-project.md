# Plaisir project guide

## Authority and workflow
Repository izakjonathan/plaisir, main → existing Vercel project prj_2Udd4sKz2qH075K2cXoXH5phCELe in izakh-s-projects. Live https://plaisir-nu.vercel.app. Start from the latest remote commit. Repository commits are the release baseline; ZIP exports are supplemental, never a replacement source.

The supplied development constitution is retained in development-constitution.md. Its Bar Ops and Shams-specific chapters do not govern Plaisir. The user's established deployment authorization remains in force; no extra approval is required for routine authorized implementation. Physical device checks must be reported separately from browser automation.

## Brand contracts
Agilera headings; Bricolage Grotesque supporting type. Current colors come from published editor content, with #263D32 and #D8B15B as legacy defaults. Preserve HSL/custom controls, shared grain, per-image overlay preferences, direct vector bottle artwork, floating controls, responsive fullscreen heroes, text-and-arrow actions, and section-aware header contrast. Do not replace editorial design with a deck or generic dashboard.

## Routes and financial authority
/ is The Experience; /investors is The Story; /financials is the investor overview; /financials-v2 is the detailed investor dashboard. Both live financial routes use lib/investor-forecast.ts and the issued PDF/XLSX in public/forecasts. Preserve reconciliation tests and monthly cash identities. Base case remains EBITDA- and free-cash-flow-negative; do not invent investment terms, returns, committed funding or savings.

lib/deck.ts, lib/finance.ts and their tests retain historical calculation provenance; they are not imported by live routes. docs/brand-and-model.md is a historical source reference.

## Content and storage contracts
/admin deliberately has no login in this phase. Do not change that without instruction. Neon owns draft/published/previous content. Retain revisions, publish, restore, preview messages and legacy fallbacks. Private Blob upload uses presigned/OIDC support. Keep the normal image/file picker, crop coordinates and alt text. Never overwrite published content for a code cleanup or test.

## Motion and accessibility
Respect system reduced motion; no public motion toggle. Preserve first-paint splash protection, first-visit/return-visit behavior, menu cancellation, focus restoration and Story session arrivals. Keep SVG bottle placements continuous and clear of text. Measured placement is deliberate; do not add text masks.

## Verification
npm run check runs TypeScript, all automated tests and the production build. There is currently no configured lint command or full automated browser suite. Manually check affected live routes and editor preview. For visual changes, use the constitution's width/state matrix and actual iPhone/Safari where available. Mark unavailable checks honestly. Never publish test content to production to validate a code release.

## Latest audit
See [0.4.15](audit-0.4.15.md). Legacy Numbers field IDs are compatibility data; their editor controls are removed. Story premises assumptions require editorial reconciliation with the issued forecast before representing them as aligned.

## CSS ownership
Follow [css-architecture.md](css-architecture.md). The 0.4.16 consolidation is included in [0.4.17](release-0.4.17.md). The release includes the covered menu route reset and gap-free brand imagery.
