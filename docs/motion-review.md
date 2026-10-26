# Motion implementation

The current implementation and validation limits are documented in [mobile-optimization.md](mobile-optimization.md).

`app/motion.css` owns all scroll reveal/menu timings. `PageMotion.tsx` enrolls marked offscreen content after the route paint boundary. `SiteShell.tsx` keeps a single fixed logo/burger/X while the mounted panel moves behind it. `lib/motion.ts` owns cancellation-safe double-frame paint sequencing and CSS duration parsing. `useHeaderTone.ts` uses a narrow observer band to preserve floating-control contrast.

The architecture began from the supplied Shams components. Current timings are intentionally stronger/slower in response to the latest request; they are no longer presented as an exact Shams motion match.
