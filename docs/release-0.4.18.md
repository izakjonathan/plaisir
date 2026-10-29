# Plaisir 0.4.18 — menu route preloading

The closed menu unmounts its links, so they cannot preload destinations ahead of opening. The root layout forces dynamic rendering; default Link prefetch does not fetch these complete routes. With the menu deliberately covering navigation until the route commits, this exposed the server round trip as an apparently unresponsive menu.

SiteShell now warms the other three menu routes 1.5 seconds after mounting or a route change, cancelling the scheduled work on cleanup. Opening the menu also refreshes prefetches. Explicit prefetch=true on menu links enables complete dynamic-route preloading. Existing covered instant scroll reset and two-frame handoff remain unchanged; published content and server caching are unchanged.

Validation: npm run check (TypeScript, 59 tests, production build). Regression verifies destinations are prefetched before selection; covered navigation, same-route position and cleanup tests remain passing. No dependencies or CSS changes. Physical iPhone/Safari timing and cold/slow-network latency have not been measured; taps before a prefetch finishes still require the network.

Reference: https://nextjs.org/docs/app/api-reference/components/link (prefetch=true loads the full route for static and dynamic routes).
