# Plaisir · coffee & wine

Next.js App Router brand and investor overview, aligned with the supplied corrected business deck.

## Run

Use Node.js 22 or later (Node 24 recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No environment variables or external services are required.

```sh
npm test
npm run typecheck
npm run build
npm start
```

Import the repository into Vercel as a standard Next.js project. No custom build or output-directory settings are needed.

## This version

- Website composition with an asymmetric photo-led hero, persistent navigation, varied editorial sections and a distinct investor workspace.
- Progressive scroll reveals, a reading-progress indicator, restrained hero parallax, daypart crossfades and hover transitions. Reduced-motion preferences disable visual movement; content remains available without JavaScript.

- Textured forest green and warm amber, using the deck's embedded wordmark, bottle artwork and concept renderings.
- Coffee/wine dayparts, guest groups, brand experience, proposed East Village flagship, leadership and opening sequence.
- Interactive annual P&L, earnings waterfall, gross-margin break-even chart and exact monthly/annual values.
- Source baseline plus explicitly labelled stress-test presets and editable assumptions.
- Funding allocation and 12-month opening-reserve explorer, with delay and sales-ramp controls.
- Demand reconciliation showing why 220 × $25 × 351 does not equal $833k.
- Keyboard-operable charts and tabs, accessible data tables, responsive navigation and scenario CSV download.
- Six meaningful financial tests covering reconciliation, cost behaviour, break-even, cash arithmetic, delay/shortfall and demand.

## Important model limits

Figures reproduce a source-derived illustration, not an approved forecast. Other operating expenses of $37.1k are implied. The $72k proposed annual rent and $216k occupancy budget have not been reconciled. Labour and other operating expenses stay fixed until edited.

Opening cash uses EBITDA as a simplified operating cash proxy. It excludes capital spending beyond the assumed funding allocations, deposits, inventory/supplier timing, taxes, debt and contingencies. It does not establish runway, payback or investment returns. The default ramp assumptions are additional explorer inputs, not deck forecasts.

Site, seating, lease, opening hours/date, costed menu, benefits and final funding terms remain subject to confirmation. Brand images are supplied concepts and renderings, not evidence of an operating venue or produced merchandise.

See `docs/brand-and-model.md` for the brand analysis, source-slide mapping and complete model assumptions.

## Editing

- `app/page.tsx`: brand narrative and content
- `app/FinancialDashboard.tsx`: controls, charts, tables and CSV
- `lib/finance.ts`: pure financial calculations and source inputs
- `app/globals.css`: responsive brand and chart styling
- `public/brand`: assets adapted directly from the supplied deck
- `tests/finance.test.ts`: financial verification

All assets load locally. The page uses no analytics, remote fonts or external data requests. Scenarios remain in browser memory until reload.
