# Plaisir — Next.js 0.3.5

A brand-led hospitality website using the supplied 48-page Agilera investor presentation as the visual and financial reference.

## Setup

Node.js 20.9+ supported by this Next.js build.

```sh
npm ci
npm run dev
```

Production: `npm run build`, then `npm start`.
Validation: `npm run typecheck` and `npm test`.

## Routes and design

- `/`: public concept experience with full-bleed imagery, Agilera titles, clean olive/ochre sections and content-sized outline buttons.
- `/investors`: proposed concept, site, leadership and launch story.
- `/financials`: presentation-based dashboard with Overview, Funding and Scenarios. No sliders, editable assumptions or hypothetical opening-cash simulation.

Brand colours: olive #2B3D17 and ochre #D19C36. Original Agilera is self-hosted. Real transparent PNG wordmarks replace CSS masks for more reliable Safari rendering.

The fixed header contains the logo and burger icon only, without a filled bar or menu-button border. Mounted-panel navigation has entrance/exit animations, staggered links, focus containment, Escape handling and scroll locking. Outline pills contain centred text only. The compact footer uses the ochre background and green wordmark.

Small public/investor section labels remain removed. The three menu descriptions are restored. Paragraphs on photographs use exact brand ochre; the floating logo and controls have no shadows. The dashboard uses an ochre background and dark olive text, charts, rules and controls, including its fixed header controls.

## Motion and mobile optimization in 0.3.5

Scroll reveals are intentionally stronger: body blocks move 36px over 850ms on mobile; headings move 48px. Opacity takes 650ms, arrivals are staggered by 90ms (capped at 180ms), and the trigger is inset by 12% of viewport height, capped at 120px. Desktop movement is 44px with a 950ms duration. Only marked content animates; full-screen photographs remain stationary. Nested markers are not double-animated, and settled elements stop transitioning.

The menu opens over 680ms with an ease-out finish, closes over 480ms with a separate curve, and keeps link text visible during exit. Its link wave is 520ms with 150ms + 65ms per-item delay. The burger strokes smoothly rotate into the X. Controls stay fixed; the panel moves behind them. Reduced motion remains immediate unless the user explicitly enables full animation.

All nine public/investor photographs now use responsive Next Image delivery, correctly sized srcsets and explicit sizes. One hero per route loads eagerly with high priority; lower images remain lazy. Image widths include 360/480px for smaller screens, and the source images are retained. Run as a normal Next.js/Vercel project with its image optimizer; raw static hosting without the Next server is not supported by this configuration.

The mobile pass adds 44px touch targets, safer portrait/landscape gutters, scalable 320px typography, more readable notes, compact financial tabs, more resilient KPI/table layouts, proper table captions and a one-column team layout on the narrowest screens. A thin IntersectionObserver band changes the floating controls to green over yellow sections, preserving their legibility without adding a bar or shadow. Zoom remains available.

See `docs/mobile-optimization.md` for scope, research links and verification limits.

## Browser canvas corrections

The forced black HTML/body background and black theme-colour metadata have been removed. Body is transparent; sections paint the page and the financial route has an ochre root fallback. Viewport-fit remains cover. The header no longer creates a full-width fixed box: only the logo and burger are fixed, with safe-area spacing. This avoids introducing a viewport-wide fixed surface for Safari's edge colour-extension heuristic.

Native Safari chrome and overscroll cannot be fully verified in desktop Chromium. Test the resulting build on a physical iPhone with expanded/collapsed toolbars and scrolling in both directions. The implementation does not claim to control native toolbar transparency on every Safari release.

## Financial provenance

`lib/deck.ts` centralises the baseline, sensitivity and source-rounded scenario data. Baseline: $833,000 sales, $583,100 gross profit, $521,100 operating costs and $62,000 EBITDA. Break-even is $744,429/year or $62,036/month, nearest dollar.

Funding uses the deck's 55% / 22% / 13% / 10% allocations at $500k and $1m. All nine 2026–2028 cases preserve the deck's revenue, gross profit, EBITDA and source net profit. Implied other operating costs and deductions below EBITDA remain labelled as unexplained residuals. The UI explains the source margin variation, rent discrepancy and bottom-up revenue inconsistency.

Legacy calculation helpers remain in `lib/finance.ts` for reference and unit coverage; the website no longer exposes the old what-if inputs or cash-reserve simulation.

## Verification

Production build and TypeScript validation pass. All fourteen tests pass. `python3 scripts/audit_mobile.py` audits generated HTML after `npm run build`: one H1 per route, a working skip target, zoom-safe viewport, image dimensions/descriptions, eager high-priority hero and lazy responsive lower images. All three routes pass that audit.

Live browser validation is incomplete: the managed preview exits before a browser connection. This pass is a source/asset/HTML optimization across all routes, not a measured mobile frame-rate, Lighthouse or physical-Safari certification. Native toolbar appearance, actual overflow at device sizes and touch smoothness still require deployed device checks. No new live deployment is included.

The venue remains a concept preview. Images include renderings, no premises or opening date is confirmed, and financials are source-derived illustrations rather than an approved forecast or verified investment return.

No live deployment or repository push is included. Deploy this as a standard Next.js project.
