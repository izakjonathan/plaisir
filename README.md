# Plaisir

A Next.js hospitality concept website with an editorial Experience, the business Story, two investor views and a mobile content editor.

## Develop and verify

```sh
npm ci
npm run dev
npm run check
```

`check` runs TypeScript, automated tests and a production build. It does not run lint or browser E2E checks; neither is configured. Run the production build with `npm start`. Use a Node release supported by Next.js 16 and the existing npm lockfile.

## Project authority

Read [the project guide](docs/plaisir-project.md) and [development constitution](docs/development-constitution.md) before changes. GitHub `izakjonathan/plaisir` main is authoritative and deploys to the existing Vercel project at https://plaisir-nu.vercel.app. ZIPs and historical documents are supplemental.

## Routes

- `/`: The Experience.
- `/investors`: The Story.
- `/financials`: investor overview.
- `/financials-v2`: detailed investor forecast dashboard.
- `/admin`: direct-access content editor, deliberately without login in this phase.

Both financial routes use `lib/investor-forecast.ts` and the issued documents in `public/forecasts`. Historical deck/calculation modules retain provenance and tests; they are not the live financial model. Preserve source assumptions and reconciliation tests. The venue remains a concept; investment terms are unconfirmed.

## Brand, motion and content

Agilera headings and Bricolage Grotesque supporting text are self-hosted. Published editor settings control the two brand colors, grain and global image overlay strength; individual photographs can override the overlay. Legacy defaults are #263D32 and #D8B15B. Bottle artwork is vector, with subtle reverse parallax. Headings reveal by measured line. System reduced motion remains respected.

The home splash waits for assets, animates its photograph and separate brand marks, then hands over to the hero. It normally runs once per tab; `?intro=replay` supports review. Draft preview skips the public intro. Floating header controls adapt to photographs and section surfaces; financial views have their dedicated treatment.

Neon stores draft, published and previous content with revision checks. Private Vercel Blob stores processed uploads; published content is not changed by code releases. See [editor setup and behavior](docs/content-editor.md). Legacy Numbers editor fields do not control the current financial dashboards.

## Current review and limits

See [0.4.15 audit](docs/audit-0.4.15.md) for corrections, constitution applicability and unresolved editorial/verification work. Release notes in `docs/release-*.md` describe their own historical versions. Desktop checks do not establish physical iPhone/Safari behavior, native upload-picker behavior or a full responsive/accessibility certification.
