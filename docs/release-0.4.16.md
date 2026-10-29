# 0.4.16 — CSS consolidation and covered menu navigation

Baseline: 92a68ec (0.4.15). Consolidated all tracked stylesheets around component ownership. Removed obsolete earlier dashboard/footer/button implementations, unused selector branches and world-images hooks, the unused Display export, and the cross-cutting mobile patch stylesheet. Final values now live with their components and responsive variants. Formatted every stylesheet consistently. Corrected specificity instead of retaining ordinary !important declarations. Kept first-paint/no-JS splash protection and reduced-motion overrides intentionally separate.

Menu links disable Next automatic scrolling. A route layout effect jumps instantly to the top while the menu is still fully covering the destination, then waits across a paint boundary before starting its exit. Same-route selection closes without scrolling; interruption/unmount removes temporary suppression. Public in-page anchor smoothing remains available.

The brand photograph grid has zero gaps at every breakpoint and no last-photo stagger/padding.

## Verification

Final local gate: `npm run check` — TypeScript, 57 tests and production build; `git diff --check`. Added CSS ownership/declaration/keyframe guards and menu navigation/paint ordering/interruption regressions. A source scan found no unreferenced CSS class selectors. No dependencies or published content changed.

An initial preview was deployed on branch css-consolidation-0416, commit cf53252. Desktop Chrome computed-style comparison covered Experience, Story, Numbers v2 Overview and the loaded editor. It identified wine brightness, small-print width and financial spacing/leading differences; the final local source corrects those. The editor comparison had no differences. In the initial preview, a menu selection from scrollY 8010 kept the old page covered at that position during loading with scroll-behavior:auto, then presented Story at scrollY 0 after the menu exit. Removed irrelevant flex/grid properties from elements using another layout mode; these are intentional computed-style differences with no layout effect.

The final corrected preview update was not executed: automatic approval review returned "Selected model is at capacity" twice, explicitly a review failure rather than an unsafe-action decision. Main/production remain at 92a68ec. The earlier preview is not the final release. A temporary responsive comparison route was removed from the final source. The final full viewport matrix, Funding/Scenarios browser comparison, physical iPhone/Safari and real-device scroll smoothness remain unverified. Do not represent this as a deployed or device-certified release.

See css-architecture.md for ownership and future editing rules. Retry the normal authenticated GitHub workflow when approval service capacity is restored; do not bypass the review through another transport. Run final preview comparison before updating main.
