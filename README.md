# Plaisir — Next.js 0.3.4

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

The fixed header contains the logo and burger icon only, without a filled bar or menu-button border. Mounted-panel navigation has entrance/exit animations, staggered links, focus containment, Escape handling and scroll locking. Outline pills contain centred text only. The compact footer uses the ochre background and green wordmark.

Small public/investor section labels remain removed. The three menu descriptions are restored. Paragraphs on photographs use exact brand ochre; the floating logo and controls have no shadows. The dashboard uses an ochre background and dark olive text, charts, rules and controls, including its fixed header controls.

## Motion corrections in 0.3.4

The prior version approximated Shams instead of preserving its motion architecture. This build ports the reference's mounted panel, double-animation-frame entrance, transform transition-end exit, capped link keyframes and progressive reveal observer. The header uses one fixed logo and one burger/X button, with the panel sliding behind them. There is no second header travelling inside a native dialog.

The only menu/reveal animation stylesheet is `app/motion.css`. Mobile values match the uploaded Shams source: menu 360ms, reveal 420ms/10px, link arrival 240ms with 70ms + 30ms per-link delay, reveal stagger 40ms capped at 80ms. Desktop values are 420ms, 520ms and 16px. Only marked text/content blocks reveal; whole photographs remain stationary.

Reveal enrollment waits until after the route paint boundary so Next.js scroll restoration does not classify the new page while it is still at the prior reading position. Visual viewport height is used, existing visible/focused content remains readable, and completed arrivals are one-shot. Cleanup cannot leave concealed content. Reduced motion matches Shams: immediate menu and visible content, with an explicit footer option to enable full motion.

For menu route navigation, the open panel covers the route switch and its exit reveals the new page. This adapts Shams' separate route-curtain coverage without introducing its splash, event-specific navigation or a second overlay. Keyboard focus containment, Escape handling, safe focus restoration and inert background content remain included.

See `docs/motion-review.md` for the exact source comparison and verification limits.

## Browser canvas corrections

The forced black HTML/body background and black theme-colour metadata have been removed. Body is transparent; sections paint the page and the financial route has an ochre root fallback. Viewport-fit remains cover. The header no longer creates a full-width fixed box: only the logo and burger are fixed, with safe-area spacing. This avoids introducing a viewport-wide fixed surface for Safari's edge colour-extension heuristic.

Native Safari chrome and overscroll cannot be fully verified in desktop Chromium. Test the resulting build on a physical iPhone with expanded/collapsed toolbars and scrolling in both directions. The implementation does not claim to control native toolbar transparency on every Safari release.

## Financial provenance

`lib/deck.ts` centralises the baseline, sensitivity and source-rounded scenario data. Baseline: $833,000 sales, $583,100 gross profit, $521,100 operating costs and $62,000 EBITDA. Break-even is $744,429/year or $62,036/month, nearest dollar.

Funding uses the deck's 55% / 22% / 13% / 10% allocations at $500k and $1m. All nine 2026–2028 cases preserve the deck's revenue, gross profit, EBITDA and source net profit. Implied other operating costs and deductions below EBITDA remain labelled as unexplained residuals. The UI explains the source margin variation, rent discrepancy and bottom-up revenue inconsistency.

Legacy calculation helpers remain in `lib/finance.ts` for reference and unit coverage; the website no longer exposes the old what-if inputs or cash-reserve simulation.

## Verification

Production build and TypeScript checks pass. Fourteen tests cover the nine existing financial cases plus paint-boundary sequencing, cancellation before/between entrance frames, CSS time conversion for the exit fallback, and explicit motion preference precedence. Code comparison uses the supplied Shams `SiteHeader.tsx`, `LowerSectionReveal.tsx`, `mobile-menu.css`, `motion.css`, `design-system.css` and `lib/motion.ts`.

Browser verification for 0.3.4 is incomplete: the managed preview exits before the browser connects. This build has not been visually verified in mobile Chromium or physical Safari. Earlier versions' browser checks do not establish this version's behavior. No frame recordings or native-device verification are claimed.

The venue remains a concept preview. Images include renderings, no premises or opening date is confirmed, and financials are source-derived illustrations rather than an approved forecast or verified investment return.

No live deployment or repository push is included. Deploy this as a standard Next.js project.
