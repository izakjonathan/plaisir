# Plaisir — Next.js 0.3.2

A brand-led hospitality website using the supplied 48-page Agilera investor presentation as the visual and financial reference.

## Setup

Node.js 20.9+ (22 LTS recommended).

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

The fixed header contains the logo and burger icon only, without a filled bar or menu-button border. Native-dialog navigation has entrance/exit animations, staggered links, focus containment, Escape handling and scroll locking. Outline pills contain centred text only. The compact footer uses the ochre background and green wordmark.

Small section eyebrows, numbered folios, image captions and hero helper lines have been removed. Paragraphs over photographs use the exact brand ochre, and the floating logo and menu controls have no shadows. The close control is an SVG X without a border or fill.

The supplied Shams motion patterns are adapted to native-dialog navigation: a sliding menu panel, capped link stagger, transition-end close handling and a timer fallback. Scroll reveals use visible-first enrollment, a small capped stagger, focus visibility and safe cleanup. Scroll reveals apply to headings and selected photographs. Reduced-motion preferences are respected, so animation is intentionally suppressed when the device requests it. The footer also offers a motion preference control.

The browser canvas follows the supplied Shams project: black HTML/body fallback, black theme-colour metadata and viewport-fit cover. This prevents a white document/overscroll canvas. Safari controls its own toolbar rendering; actual page imagery behind native browser controls cannot be guaranteed across iOS versions.

## Financial provenance

`lib/deck.ts` centralises the baseline, sensitivity and source-rounded scenario data. Baseline: $833,000 sales, $583,100 gross profit, $521,100 operating costs and $62,000 EBITDA. Break-even is $744,429/year or $62,036/month, nearest dollar.

Funding uses the deck's 55% / 22% / 13% / 10% allocations at $500k and $1m. All nine 2026–2028 cases preserve the deck's revenue, gross profit, EBITDA and source net profit. Implied other operating costs and deductions below EBITDA remain labelled as unexplained residuals. The UI explains the source margin variation, rent discrepancy and bottom-up revenue inconsistency.

Legacy calculation helpers remain in `lib/finance.ts` for reference and unit coverage; the website no longer exposes the old what-if inputs or cash-reserve simulation.

## Verification

Production build and TypeScript check pass. Nine tests cover baseline arithmetic, funding allocations, break-even and all nine scenario residuals. Responsive Chromium checks cover the public, investor and financial routes, burger/dialog interaction, compact buttons, black browser canvas, absence of sliders, funding changes, source-scenario navigation and overflow at 375px usable mobile width. Menu navigation also verifies that the exit completes, the dialog closes and scrolling unlocks before the new route appears. This does not replace physical-device Safari testing.

The venue remains a concept preview. Images include renderings, no premises or opening date is confirmed, and financials are source-derived illustrations rather than an approved forecast or verified investment return.

No live deployment or repository push is included. Deploy this as a standard Next.js project.
