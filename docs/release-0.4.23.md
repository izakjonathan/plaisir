# Plaisir 0.4.23 — temporarily hide financial pages

FINANCIALS_VISIBLE in lib/public-pages.ts is false. Both Numbers entries and their prefetches are absent from the public menu. Editorial links to these routes are suppressed, and the Story financial invitation is hidden. Direct visits to either route temporarily redirect to the homepage.

All page components, calculations, downloads and stored editor content remain intact. Set the switch to true and redeploy to restore the pages and navigation. This is public presentation control, not authentication or protection of the retained download files.

Validation: npm run check (TypeScript, tests and production build), including menu prefetch/visibility checks. No published data changes.
