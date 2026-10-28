# Plaisir consolidation review — 0.4.4

Date: 28 October 2026. Baseline: 258eb21779601619c90cda5fe626ada3122ee65d. Scope: source consolidation, editor robustness, documentation; no visual redesign or content/database migration.

## Review and corrections
- Architecture: inspected route ownership, root provider, motion/header systems and editor data flow. Removed app/FinancialDashboard.tsx after verifying it has no consumers. Both public Numbers routes already use the issued forecast. Retained historical deck/finance libraries and their reconciliation tests as provenance.
- CSS: inspected layout import order, brand/mobile/button/footer rules and image treatment. Removed dead motion-button selectors and obsolete wordmark image source overrides now superseded by the recolorable mask. Removed the duplicate photo gradient declarations from brand.css: image-treatment.css remains the sole gradient owner. No cascade-wide redesign or bulk selector merging.
- Accessibility: palette tabs now use one tab stop with ArrowLeft/ArrowRight/Home/End navigation and focus transfer. Existing HSL precision state is intentional, preserving hue while saturation is zero.
- Request handling: editor JSON requests previously loaded the entire body before measuring character count. Now enforce a 320,000-byte cap during streaming, cancel oversized bodies, honor oversized declared lengths and return a useful malformed-JSON error. Added multibyte/chunked regression coverage. Existing origin, revision and schema validation remain.
- Documentation: retained the supplied constitution, added Plaisir-specific contracts and an AGENTS entry point, and marked superseded financial documentation historical. Current palette comes from stored content rather than fixed source colors.
- Release: aligned package/lockfile version to 0.4.4 and added npm run check (TypeScript, tests, production build).

## Preserved contracts
Published/draft/previous content; no-login admin decision; private Blob presigned uploads; image picker/crop/overlay; current palette and grain; font/brand/SVG artwork; splash, menu and Story motion; current forecast and issued downloads. No production data mutations were used for verification.

## Verification
TypeScript, 39 automated tests including local Postgres-compatible store tests, production build and diff whitespace checks pass. These include forecast reconciliation, content save/publish/restore/conflicts, image processing, input limits, color conversion, splash first-visit handling and motion cancellation.

## Limits and remaining work
- No configured lint tool or comprehensive browser E2E suite. The check command does not claim either.
- Real iPhone/Safari, screen-reader sessions and full width/orientation/state matrix remain unverified in this environment.
- Real private-Blob upload E2E and actual Neon concurrency stress tests remain outstanding. PGlite tests do not establish all hosted behavior.
- /admin remains intentionally unauthenticated, as instructed; this review does not certify its security for a broader access model.
- Story's stored premises/source copy may differ from current forecast assumptions; reconcile through a separate editorial review, without silently rewriting published content.
- Existing CSS has intentional overrides from successive design decisions; this release removes verified dead rules only. Wider consolidation needs visual baselines across mobile/Safari before merging more rules.
- Bottle placement still uses measured geometry; mobile rendering/performance should be checked on hardware before replacing the mechanism.
- No new parallax, WebGL or Three.js effects were introduced.

## Recovery
The parent commit is the source rollback point. Redeploy the previous stable code if necessary; no database migration or content rollback is required. GitHub main remains authoritative. Supplemental ZIP excludes secrets, dependencies, caches and local environment files.
