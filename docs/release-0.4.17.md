# 0.4.17 — Consolidated CSS release and legacy editor removal

Includes the 0.4.16 CSS consolidation, covered instant menu navigation and gap-free brand photograph grid. Removes the legacy Numbers tab and all 33 legacy Numbers controls from the editor. Field IDs remain registered and hidden so existing draft/published/history documents continue to validate. Both current public financial pages and the issued forecast are retained.

No published content, source financial assumptions, authentication, SEO/contact features or opening details changed. Editorial reconciliation, physical-device testing and the broader final quality pass are deferred as requested.

Validation: npm run check (TypeScript, 58 tests, production build), CSS selector/declaration/keyframe guards, legacy document compatibility and git diff --check. No dependencies added. The earlier 0.4.16 browser comparison is recorded in release-0.4.16.md; this release does not claim a physical iPhone/Safari certification.

Source packaging: the release ZIP contains the exact release tree at its root, including source, public assets, docs, package manifest and lockfile. Dependencies, caches, Git metadata and credentials are excluded. GitHub main and the connected existing Vercel project remain the deployment path; the ZIP is a matching downloadable source release.
