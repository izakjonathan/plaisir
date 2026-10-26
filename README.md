# Plaisir — Next.js 0.3.3

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

Small public/investor section labels remain removed. The three menu descriptions are restored. Paragraphs on photographs use exact brand ochre; the floating logo and controls have no shadows. The dashboard uses an ochre background and dark olive text, charts, rules and controls, including its fixed header controls.

## Motion corrections in 0.3.3

The old reveal controller could leave both `reveal-pending` and `reveal-visible` on an element after cleanup/re-enrollment. The latter CSS rule won, bypassing the reveal. Enrollment and cleanup now remove stale state. One IntersectionObserver handles below-viewport content; content already visible, focused content and content without JavaScript stay readable. Route changes and motion changes cleanly rebuild enrollment. Media-query changes are subscribed to React state, so turning the system preference back off restores the full behavior.

Several generations of motion CSS were competing, including a universal reduced-motion rule disabling every transition, animation and transform. They are replaced with one scoped system. Full motion uses a 540ms sliding menu, staggered link transitions and 720ms fade/translation reveals. Reduced motion uses short, stationary fades, and the footer's **Enable animations** control allows an explicit full-motion choice even when the system requests reduced motion. The control is no longer disabled. It changes to **Reduce motion** in full mode.

An opaque green native-dialog backdrop previously covered the whole page immediately, concealing the panel entrance. The backdrop is now transparent. Full-motion closing waits for the panel transform, not the shorter opacity transition; reduced mode waits for opacity. A duration-based fallback prevents stuck dialogs. Native focus containment, Escape, scroll unlocking and delayed link navigation remain intact.

## Browser canvas corrections

The forced black HTML/body background and black theme-colour metadata have been removed. Body is transparent; sections paint the page and the financial route has an ochre root fallback. Viewport-fit remains cover. The header no longer creates a full-width fixed box: only the logo and burger are fixed, with safe-area spacing. This avoids introducing a viewport-wide fixed surface for Safari's edge colour-extension heuristic.

Native Safari chrome and overscroll cannot be fully verified in desktop Chromium. Test the resulting build on a physical iPhone with expanded/collapsed toolbars and scrolling in both directions. The implementation does not claim to control native toolbar transparency on every Safari release.

## Financial provenance

`lib/deck.ts` centralises the baseline, sensitivity and source-rounded scenario data. Baseline: $833,000 sales, $583,100 gross profit, $521,100 operating costs and $62,000 EBITDA. Break-even is $744,429/year or $62,036/month, nearest dollar.

Funding uses the deck's 55% / 22% / 13% / 10% allocations at $500k and $1m. All nine 2026–2028 cases preserve the deck's revenue, gross profit, EBITDA and source net profit. Implied other operating costs and deductions below EBITDA remain labelled as unexplained residuals. The UI explains the source margin variation, rent discrepancy and bottom-up revenue inconsistency.

Legacy calculation helpers remain in `lib/finance.ts` for reference and unit coverage; the website no longer exposes the old what-if inputs or cash-reserve simulation.

## Verification

Production build and TypeScript checks pass. All nine financial tests pass. Responsive Chromium checks at 390px verify no horizontal overflow, restored menu descriptions, SVG close control, transparent dialog backdrop, yellow/green dashboard, menu entrance/exit transitions, navigation and scroll unlocking. Computed intermediate panel positions confirm the menu actually moves; a below-viewport heading changes from pending/transparent/24px translation to visible/opaque/zero translation after scrolling. Motion can be reduced and re-enabled; enrollment has no conflicting classes. Native Safari toolbar appearance is not covered by those checks.

The venue remains a concept preview. Images include renderings, no premises or opening date is confirmed, and financials are source-derived illustrations rather than an approved forecast or verified investment return.

No live deployment or repository push is included. Deploy this as a standard Next.js project.
