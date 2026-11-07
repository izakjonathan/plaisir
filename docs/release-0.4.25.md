# Plaisir 0.4.25 — coming soon

All page requests, including the editor and previews, return a standalone fullscreen green page with centered “coming soon”. The response contains no app JavaScript or original content. Content APIs, media routes and forecast downloads return 503 while maintenance is enabled. Existing source, database content and files are retained.

Set COMING_SOON=false in lib/maintenance.ts and redeploy to resume the site with the previous page visibility settings. The temporary page uses #203b1c green and #d8b15b text. Responses are no-store and noindex.

Validation: npm run check, including maintenance coverage for public routes, editor, API/media/download blocking and restoring normal proxy behavior. No database mutations.
