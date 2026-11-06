# Plaisir 0.4.24 — Story-only public site

Temporarily hide the Experience and menu button using the shared public visibility settings. The homepage redirects to /investors, leaving The Story as the public page. Both Numbers pages remain hidden and redirect through the homepage. Experience, splash, navigation and financial components remain in source; no published editor content changes.

Validation: npm run check (TypeScript, 61 tests, production build). Header regression verifies no menu button or panel renders when hidden; retained navigation lifecycle tests still exercise the saved menu implementation.
