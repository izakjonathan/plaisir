# Plaisir — Next.js redesign

A complete visual rebuild around the supplied Plaisir investor presentation. The public experience, investor story and financial model remain separate routes.

## Run locally

Requires Node.js 20.9 or newer (Node.js 22 LTS recommended).

```sh
npm ci
npm run dev
```

Production:

```sh
npm run build
npm start
```

Validation:

```sh
npm run typecheck
npm test
```

## Routes

- `/` — full-bleed hospitality experience: coffee, wine, shared food, brand details and the proposed first location.
- `/investors` — concept, proposed flagship, leadership, launch sequence and link to the working financial model.
- `/financials` — interactive operating illustration, funding and opening-cash proxy, and bottom-up demand comparison. CSV export and keyboard-operable chart controls retained.

## Visual system

- Olive `#2B3D17` and ochre `#D19C36`, sampled from the latest brand direction.
- Original Agilera font supplied with the project, self-hosted in `public/fonts`.
- Large display typography and readable supporting sans-serif text. Financial values use the supporting font.
- Full-width photographic hero sections, darker image treatments and alternating solid brand-colour sections.
- Fixed transparent header with only the original wordmark and outlined menu button. No desktop navigation bar or mobile bottom bar.
- Full-screen native dialog menu with focus containment, Escape dismissal and scroll locking.
- Transparent outlined pill buttons, section anchor links and subtle scroll reveals. System reduced-motion settings and a footer motion toggle are respected. Content remains visible without JavaScript.

The wordmark is an alpha mask coloured with the exact ochre token; no image-wide colour filter is applied to the photography. Source photos and brand renderings retain their original product colours.

## Files

- `app/page.tsx`: public experience.
- `app/investors/page.tsx`: investor story.
- `app/financials/page.tsx`, `app/FinancialDashboard.tsx`: working model.
- `app/SiteShell.tsx`: fixed header, native menu and shared footer.
- `app/PageMotion.tsx`: progressive scroll reveals and motion preference handling.
- `app/brand.css`: new brand system and responsive layouts.
- `app/globals.css`: base styles and retained financial data/chart styling.
- `lib/finance.ts`: unchanged calculation engine.

## Verification

Production build and TypeScript checks passed. Six existing finance tests pass. Browser checks covered desktop, mobile-width layouts at 375px usable width, menu open/close and Escape, transparent fixed header after navigation, text fitting, funding calculation and model tabs. This is responsive Chromium verification, not a physical iPhone/Safari test.

Fixed an existing React hydration issue in SVG tooltips by rendering each `title` as one string.

## Content status

Plaisir remains a concept preview. Renderings are not confirmed premises, no opening date is promised, and menu details remain provisional. The financial model is an illustration, not an approved forecast or investor-return calculation. The opening reserve explorer is a simplified operating cash proxy and retains its explicit exclusions. Source references to slide numbers identify the earlier corrected 35-slide business source used by the model; the latest 48-page presentation supplies the current visual direction.

No live deployment or repository push is included in this ZIP. Deploy as a standard Next.js project with `npm run build`.
