# Plaisir 0.4.19 — faster routes and consistent chart bars

## Navigation
The root force-dynamic setting forced each destination to render on the server and query published content. Public routes now prerender with 60-second ISR instead. Publish and restore already invalidate the root layout with revalidatePath('/', 'layout'); that behavior is retained. Draft preview loads its data through the existing private, no-store API, and /admin is explicitly dynamic. No database content, source forecast or permissions are changed.

The production build confirms all four public destinations are prerendered; admin, editor APIs and media remain dynamic. Existing background route preloading and covered instant scroll reset are retained. Menu closing is 220ms on mobile / 240ms on desktop (previously 480/520ms); opening choreography is unchanged.

## Charts
Cost and comparison tracks share one visual rule: 18px height, 3px track radius, solid brand-green fill with 2px corners. Cost and profitability bars now match the break-even reference. Negative bars retain the existing hatching so a loss remains distinguishable. Bar values, proportions and forecast calculations are unchanged.

## Verification
npm run check passed (TypeScript, 59 tests, production build); CSS ownership and menu navigation regressions included. Build route classification verified. Shell HTTP baseline first-byte timings before release: Story 5.94s; Numbers v2 3.84s. These are individual observations from the execution environment, not user-device timing or a controlled benchmark. Physical iPhone/Safari and editor publish mutation were not tested; no production test content was written.

Reference: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
