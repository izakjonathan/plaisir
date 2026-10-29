# Plaisir constitution audit — 0.4.15

Date: 29 October 2026. Reviewed baseline: `0bbbe3fd41ca763bffdc4651f3ff1bb4aea7a36d`. The supplied Project Development Constitution (2) is identical to `docs/development-constitution.md`. Scope: source, request/storage boundaries, motion lifecycles, editor truthfulness and project documentation. This is a targeted consolidation, not a design approval or a blanket security certification.

## Applicability

| Area | Finding and treatment |
| --- | --- |
| Source authority and handoff | GitHub main remains authoritative; existing Vercel integration remains in place. README and editor guide now describe the current project. ZIP packaging is supplemental, not a second source of truth. |
| Architecture and ownership | Next App Router; content registry/provider; Neon content store; private Blob uploads; issued financial model remain distinct. No new dependencies, framework migration or duplicate implementation. |
| Validation and data safety | Typed boundary validation, bounded JSON reads, revision-checked writes and registered media retained. Public reads now validate published content independently. |
| Design and motion | Existing palette, typography, vector artwork, placements, parallax and splash choreography retained. Corrected asynchronous cleanup and keyboard focus. No broad CSS rewrite without visual baselines. |
| Verification | TypeScript, automated regression tests and production build are the release gate. Browser/device coverage and hosted mutations are separately bounded below. |
| Authentication | The generic constitution asks for authorization; Plaisir explicitly requires a login-free editor in this phase. That project decision takes precedence. Same-origin checks are CSRF protection, not user authentication. |
| Domain-specific chapters | Bar Ops and Shams instructions do not govern Plaisir. Financial authority is the issued investor forecast, not historical model notes. |

## Corrections

- Added `/financials-v2` to draft-preview middleware protection. All four public draft-preview routes now receive private/no-store and noindex headers.
- Public content fetches now select and validate only published content. A malformed draft or restore-history document no longer causes valid published content to fall back to defaults. Embedded Postgres regression coverage verifies this isolation.
- Editor JSON accepts objects only. Null, arrays and primitives produce useful client errors instead of accidental storage errors. Presigned upload payloads are validated before entering the Blob SDK; existing upload constraints and credential handling remain intact.
- Heading font-readiness callbacks cannot schedule fresh layout work after unmount. Added a deferred-promise lifecycle regression.
- Splash completion removes skip/reduced-motion listeners. Skip and cleanup clear timers and resolve their waiting promises so interrupted sequences can terminate. Existing timeline and interruption tests remain.
- Removed the menu button rule that suppressed its visible keyboard outline.
- Hid two obsolete, unused brand-detail image controls while retaining their registered IDs for saved document/history compatibility. The Numbers panel now explicitly explains that its legacy copy fields do not drive the current dashboards.
- Replaced the stale README, updated editor instructions for continuous section groups/global overlay inheritance, linked historical reviews, and aligned package/lock versions to 0.4.15.

## Preserved

No production content/database mutations, schema migrations, asset replacements, new dependencies, authentication changes or investment-term edits. Saved drafts/history and registered field IDs remain compatible. Both live financial routes retain the issued forecast and reconciliation tests. Historical calculation modules remain marked as provenance.

## Verification and practical limits

`npm run check`: TypeScript, 51 passing automated tests and production build. Tests include forecast/cash reconciliation, Postgres revision conflicts/save/publish/restore, Sharp conversion, JSON size/type validation, published-read isolation, palette/overlay validation, splash/menu cancellation and mobile parallax geometry. `git diff --check` is also required before release. Deployment/live smoke results are recorded in the release handoff.

No configured lint command or comprehensive browser E2E suite. Physical iPhone/Safari, native file picker/upload, screen-reader sessions, the full width/orientation/state matrix, actual Neon concurrency stress and private-Blob end-to-end uploads are not certified by these tests. No test content was published to production.

## Decisions still needed

1. Story premises/source copy includes assumptions that differ from the issued forecast (historical 500 sq ft / $6,000 rent versus current 1,000 sq ft / $12,000 occupancy). Reconcile editorially; do not silently overwrite stored content or change model inputs during cleanup.
2. Legacy Numbers fields remain compatibility data. Wiring new dashboard-copy controls requires an explicit mapping to the issued-model UI; the editor now states the limitation instead of claiming those fields affect the live dashboards.
3. Wider CSS consolidation needs visual baselines and device verification. Successive overrides encode accepted design changes; mechanically merging them would risk regressions.
4. The deliberate login-free editor remains a project-level access decision. A different audience/access policy requires a separate authorization change across every editor and upload API, not just hiding `/admin`.
