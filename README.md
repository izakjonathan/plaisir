# Plaisir

First-version Next.js App Router website for the Plaisir casual wine bar concept.

## Run

Requires Node.js 20.9 or later.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. To verify the production build:

```sh
npm run build
npm run typecheck
npm start
```

Ready to import as a standard Next.js project on Vercel. No environment variables or external services are required.

## Included

- Responsive forest-green, warm-gold and cream editorial design.
- Wordmark extracted from the supplied brand reference, plus a matching bottle motif.
- Concept introduction, food and atmosphere sections, and opening-information placeholder.
- Interactive wine flavour compass, keyboard-operable buttons and mobile navigation.
- Reduced-motion support, focus indicators, skip link, semantic landmarks and live announcements for compass updates.
- All images served locally; no analytics, cookies, forms or remote font requests.

## Before launch

The venue address, opening date, hours, contact details, booking provider and approved final menu were not supplied. The page intentionally avoids inventing these details. Replace the closing section when they are confirmed.

The wine compass is an illustrative taste guide, not a live wine inventory or verified recommendation engine. Its flavour mapping follows the concept's four-quadrant diagram.

Images are crops from the supplied Plaisir concept moodboards and are identified as concept inspiration on the page. They must not be presented as photographs of the finished venue. Confirm usage rights and replace with commissioned/cleared photography before public launch. Small source crops limit image sharpness at very large display sizes.

## Content and styling

Edit `app/page.tsx` for copy and compass content, `app/globals.css` for theme and responsive layouts, and `app/layout.tsx` for page metadata. Optimised local assets are in `public/images`.
