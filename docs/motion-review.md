# Plaisir 0.3.4 — direct comparison with supplied Shams source

## Findings and corrections

| Area | Plaisir 0.3.3 | Shams source / 0.3.4 correction |
| --- | --- | --- |
| Menu lifecycle | Persistent native dialog opened with showModal | Conditionally mounted panel with closed/opening/open/closing phases |
| Header | Second logo and close button inside the moving panel | One stationary header; same burger/X control stays in place |
| Mobile panel | 540ms | 360ms, cubic-bezier(.76,0,.24,1) |
| Mobile content reveal | 720ms, 24px translation | 420ms, 10px translation, cubic-bezier(.16,1,.3,1) |
| Link arrival | 420ms transitions, 180ms start plus 75ms per item | 240ms keyframes, 70ms start plus 30ms per item |
| Reveal stagger | 60ms capped at 120ms | 40ms capped at 80ms |
| Reveal target | Headings, paragraphs and entire photographs | Explicitly marked content only; full-bleed images do not move |
| Trigger | Layout viewport and -32px observer margin | Visual viewport and -24px bottom margin |
| Route setup | Layout-effect enrollment could precede Next's scroll restoration | Double-frame paint boundary before enrollment |
| Reduced motion | New 180ms fade behavior | Immediate behavior, matching Shams; explicit full-motion option retained |
| Style ownership | Multiple old menu/reveal layers in brand stylesheet | One dedicated motion stylesheet; old rules removed |

The prior implementation was not a faithful copy of the reference. The timing and structural differences above are verified in source; they should not be confused with a proven diagnosis of every symptom on a physical device.

## Architecture

`lib/motion.ts` preserves Shams' two-frame entrance and CSS-duration parsing. Closing cancels queued entrance frames through effect cleanup. The panel remains mounted until its own transform finishes; a timer covers interrupted transitions. Descendant link transitions cannot close the menu prematurely. A single fixed control avoids the former moving close-button/duplicate-logo effect. Background content is inert while the panel is mounted; keyboard interaction traps focus and restores it without scrolling.

`PageMotion.tsx` follows the reference's IntersectionObserver approach, visible-first enrollment, capped stagger, focus visibility and scoped mutation observation. SSR content is readable. Only offscreen marked blocks become pending, and cleanup removes pending classes. Completed arrivals retain a one-shot marker across observer restarts. The route paint delay is a Plaisir adaptation for Next's scroll restoration rather than Shams' route-curtain context.

Plaisir does not copy Shams' event splash, event navigation or full route-curtain system. Its open menu covers a route switch before sliding away over the destination. Brand colours, typography, restored menu descriptions and yellow/green dashboard remain intact.

## Validation

- Production build succeeds.
- TypeScript check succeeds.
- Existing nine financial tests succeed.
- Five motion helper regression tests cover two-frame sequencing, cancellation at both frame boundaries, exit-time units/fallback, and motion preference precedence.
- Browser QA could not be completed: the managed preview exits before a connection can be established. No claim is made that this version has been frame-recorded, visually compared in-browser, or checked on physical Safari.

## Device acceptance checks

On the deployed 0.3.4 build, confirm that the burger changes to X in place; the panel alone slides down and up; opening/closing repeatedly cannot reopen a closed menu; the three menu links arrive in a short wave; text blocks reveal once as they enter while large images remain fixed; navigating from the footer or an open menu still leaves lower destination content eligible for reveals; Reduce Motion keeps content visible; keyboard focus remains usable. Native Safari testing remains necessary.
