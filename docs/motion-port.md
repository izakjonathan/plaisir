# Motion port from Blågårds Apotek 1.7.0

Plaisir now uses the same motion system as Blågårds Apotek (releases 1.4.0 to 1.7.0). Plaisir's layouts, content, bottle artwork, splash bottle, investor pages and compact footer are unchanged. No dependency, database migration or authentication change was made.

## What was ported

- **Editor controls.** Admin → Animations holds 62 registered controls (toggles, ranges, validated easing selects) for reveals, menu, hero text, footer scroll/content/logo, splash speed/easing, photo parallax, heading letters, photo frames/zoom, menu details and page transitions. The tab has its own preview page picker, Replay preview, and Reset all animation settings. The splash preview replays the real splash sequence, including the bottle.
- **Heading letters.** Shared headings reveal grapheme by grapheme through masks, capped at 300ms for long cascades. Turning it off restores the line reveal.
- **Photo motion.** Subtle parallax inside fixed frames (20px mobile, 32px desktop), a gentle settle-zoom, and the wide collection photograph on the home page expanding from a 24px inset as it scrolls into view. The hero photograph, splash, logos and bottle art stay stationary.
- **Menu.** Rolling letter labels on hover/focus and drawn dividers; configurable link timing.
- **Footer.** Interruptible arrival scroll with velocity hand-off, logo pulse and content arrival.
- **Page curtain.** 300ms cover and 400ms reveal in the primary, accent or deep brand colour, with prefetch, covered scroll restoration, focus handling, interruption cleanup and an 8-second watchdog. Menu navigation reuses the menu as its cover.
- **Hero and splash.** Hero text timings and splash speed/easing are editor-controlled. Returning home through the curtain skips a second splash. The master switch also disables the splash.

## Deliberate differences from Blågårds

- No hero-video fade controls (Plaisir has no hero video).
- The footer keeps Plaisir's compact layout. The arrival scroll, pulse and arrival animation are ported; the full-screen footer panel is a Blågårds design decision and was not copied.
- Only the wide collection photograph expands; Blågårds' first gallery photo and exhibition image have no Plaisir equivalent.
- The Plaisir menu list and English copy are untouched; the legacy Blågårds `/1671-2` route alias is not carried over.

## Verification performed

- All 82 Node tests were run directly with `node --experimental-strip-types`: 80 pass. The 9 ported Blågårds motion test files and the three updated existing harnesses (heading lifecycle, landing splash, menu navigation) pass. `content.test.ts` and `css-architecture.test.ts` could not run because their packages (`@electric-sql/pglite`, `next`) were unavailable in this session.
- The CSS architecture rules (selector ownership across files, duplicate declarations, keyframes, `!important`, class references) were re-implemented in a script and pass. The same script passes on the original Plaisir and on Blågårds.
- A stubbed typecheck of `app/` and `lib/` against the original Plaisir showed no new real type errors.

## Not verified

`npm run check`, the production build and any browser, iPhone/Safari or visual check were not performed. Run `npm run check` before deploying, then review in Admin → Animations → Preview: heading letters, the home collection photograph, the menu roll, a page-curtain navigation and the footer arrival.
