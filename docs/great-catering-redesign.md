# Great Catering inspired redesign

Reference reviewed: https://www.greatcatering.co.nz/ on 23 October 2026, through page research and direct desktop interaction.

## Direction

The reference pairs large photographic panels with oversized uppercase display headings, a continuous flat colour canvas, borderless image/text compositions and a prominent full-screen navigation. Its offering/venue selector gives the visitor an active way into the content. These compositional principles informed Plaisir; no reference photography, logo, font files, copy or implementation was copied.

Plaisir retains its supplied script wordmark, local Agilera font, forest green (#41654c) and amber (#f0af49). The supporting text and financial interface use a plain sans serif. The public opening pairs morning coffee with evening wine. An offset, touch-scrollable image sequence connects the introduction to a three-option daypart selector. A full-width sharing-table composition and future-location information complete the public story. This replaces the earlier series of presentation-like panels with an editorial page rhythm.

## Information architecture

- Experience (`/`): the guest-facing brand preview, coffee, wine, sharing and future visit information.
- Investors (`/investors`): proposition, operation, proposed site, leadership and conditional launch/growth. Source qualifications remain visible alongside the relevant claims.
- Financials (`/financials`): editable assumptions, trading, funding/opening cash and demand checks. Calculation logic and source baselines are unchanged.

The shared menu and mobile bottom navigation expose all three destinations. No confirmed address, opening hours, final menu prices or investment returns have been invented.

## Motion and accessibility

The page keeps native scrolling. IntersectionObserver reveals run once, with masked display lines and short opacity/translation transitions. Hero movement is capped at 36 pixels and scheduled through requestAnimationFrame only while visible. The daypart image crossfades; the image sequence uses native scroll snap. There is no autoplay carousel, scroll hijacking or background video download.

The full-screen menu uses a native dialog with Escape support and focus restoration. Daypart tabs support arrow keys, Home and End, with roving tab focus and labelled panels. Touch targets and compact navigation remain usable on narrow phones. The system reduced-motion preference and an explicit footer control suppress nonessential motion; the explicit choice persists across route navigation in the shared shell. Reveal content remains available before JavaScript initializes.

## Original image assets

Two original concept photographs were created using the image-generation tool, rather than taking imagery from the reference. They are clearly covered by the site's generated-concept disclosure and do not document an operating Plaisir venue.

1. `public/brand/morning-service.webp` (1024 × 1536) and `morning-service-mobile.webp` (640 × 960). Prompt direction: portrait editorial hospitality photograph of an adult server in a forest-green apron and white shirt placing a green espresso cup on a wooden café counter; croissant, amber morning sunlight, French café warmth and Danish materials, natural film texture; no faces, lettering, logos or watermarks.
2. `public/brand/sharing-table.webp` (1400 × 933) and `sharing-table-mobile.webp` (640 × 427). Prompt direction: editorial close photograph of cured ham, cheese, torn bread and olives with a wineglass, forest-green linen/tiles and warm wooden surfaces in amber afternoon light; premium food-magazine feeling; no faces, text, menus, logos or watermarks.

Generated originals were resized and compressed locally with Sharp to make the responsive WebP assets. Existing deck-derived wordmark and concept imagery are retained. New images are served locally, with narrow-screen sources and lazy loading below the opening.

## Verification

Browser checks cover the public page at 375- and 305-pixel content widths, desktop opening/menu, navigation into Investors and Financials, daypart click/keyboard selection, funding and demand tabs, and reduced motion across routes. No horizontal document overflow was observed at either phone width. Setting annual revenue to $900,000 updates EBITDA to $108,900. The source baseline remains $833,000 revenue and $62,000 EBITDA. Production build, TypeScript and the six financial unit tests are required before publishing this commit.
