# Plaisir: mobile design and motion research

Research and implementation: 23 October 2026. The requested direction is a contemporary, approachable coffee and wine brand with potential for multiple neighbourhood locations. The site remains a concept and investor overview; no live chain, opening date, address or booking service is implied.

## Reference review

The sources below were reviewed for design direction, not copied as templates. Publication dates refer to the award listing where available. Dribbble concepts are not evidence that a design performs well with real customers, and older references are identified separately from current examples.

| Reference | Evidence reviewed | Application to Plaisir |
| --- | --- | --- |
| [Da Maria — Awwwards](https://www.awwwards.com/sites/da-maria), 2 April 2026 | Listing, mobile/navigation/reservation highlights, live template. The listing describes a warm editorial approach and identifies animation and microinteractions. Live page content loaded in this browser, but its visual entrance did not finish rendering, so its exact motion was not treated as verified. | Strong brand hierarchy and fewer competing layouts. Avoid making a loader or elaborate animation a prerequisite for accessing content. |
| [La Revoltosa — Awwwards](https://www.awwwards.com/sites/la-revoltosa), 21 May 2026 | Listing and named elements: menu transition, product scrolling, illustration scrolling and view switching. | Give different interactions distinct motion roles. Adapt to lightweight transforms and crossfades rather than 3D/WebGL. |
| [La table de Joakim — Awwwards](https://www.awwwards.com/sites/la-table-de-joakim), 13 August 2026 | Award search listing and its scroll-animation element. | Motion belongs to the hospitality narrative. It does not justify delaying ordinary reading. |
| [SEM Restaurant & Wine Bar — Awwwards](https://www.awwwards.com/sites/sem-restaurant-wine-bar), 4 February 2025; [live site](https://www.restaurantsem.com/) | Award listing, mobile/desktop highlights and live content architecture, photography and transitions tags. | Let the venue idea and its food/drink experience lead the story. Practical information stays easy to find. |
| [Locals & Nomads — Redis Agency / Dribbble](https://dribbble.com/shots/22228344-Locals-Nomads-wine-bar) | Original layout image and designer's explanation of a cultural patchwork. Older, undated reference; not presented as a new 2026 trend. | Large identity scale and a confident, compact opening. Do not copy its grid, illustrations, logo or colour scheme. |
| [Stoa — Ulysses Design Co / Dribbble](https://dribbble.com/shots/26030668-Concepts-for-Wine-Bar-and-Market-Stoa) | Original concept image, green palette and description of hand-drawn food/drink branding. | A limited green identity can carry character without extra colours and stickers. Keep Plaisir's supplied script and bottle. |
| [Viori Café & Wine Bar — Filip Panov / Dribbble](https://dribbble.com/shots/25764463-Viori-Cafe-Wine-Bar) | Original image and description of the morning café / evening wine identity. Copyright footer dates the page to 2025, rather than establishing a precise project date. | Present the two dayparts as one coherent experience. Do not borrow its sun/coffee-bean symbol or palette. |
| [Vagabond Wines](https://www.vagabondwines.co.uk/) | Current live homepage, browser screenshot, image-led opening, direct experience/venue routes and shared-food messaging. | Clear purpose, social imagery and simple routes into the experience. Plaisir's investor route replaces a booking action because it is not yet an operating venue. No self-pour claims are borrowed. |
| [Noble Rot](https://noblerot.co.uk/) | Current official homepage content, restaurant/magazine identity and per-location actions. | A parent identity can connect multiple locations while keeping each address distinct. Plaisir shows only the proposed flagship, followed by conditional growth information. |

These observations are design inferences from a curated set, not a statistical survey of all wine-bar websites. The strongest shared direction for this brief is expressive identity, human atmosphere, high-contrast typography, a short primary journey and purpose-specific motion. None requires imitating a competitor's assets.

## What changed

- Replaced the earlier split hero and receipt/sticker collage with an edge-to-edge portrait social scene, large original Plaisir script and a two-line Agilera headline.
- Designed the base layout for narrow screens first. Larger layouts progressively introduce columns, rather than shrinking a desktop composition.
- Tightened the palette to forest green, warm amber and a paper neutral. Removed burgundy from the website's main colour system.
- Added a bottom mobile navigation with safe-area padding and 43px minimum link height, complementing the 70px header and native modal menu.
- Replaced a long series of presentation sections with a shorter story: identity → dayparts → hospitality → swipeable details → proposed address → investor model. Leadership and growth details remain in native disclosures.
- Kept all existing financial calculations, source qualifications, funding scenarios, demand reconciliation and CSV export. Financial numbers stay in the UI font.
- Reference images are research only and are not included in the website assets.

## Motion research and implementation

Primary technical sources: [web.dev animation performance](https://web.dev/articles/animations-guide), [web.dev reduced motion](https://web.dev/articles/prefers-reduced-motion), and [W3C interaction animation guidance](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html).

The performance guidance favours transforms and opacity over layout/paint-heavy animation. W3C explains why nonessential interaction motion should be suppressible; this implementation supports both the system preference and an explicit page control.

| Interaction | Treatment | Duration / limits |
| --- | --- | --- |
| First entry | Original wordmark fades and settles; headline lines rise inside masks; supporting copy follows | 700–900ms; stagger ends within roughly 1.1s; no loading screen |
| Section headings | Masked line reveals triggered once by IntersectionObserver | 800ms; 65ms between lines |
| Images and short copy | Small vertical settlement with opacity | 650–850ms; 24px movement; no whole-page pinning |
| Hero scroll | Small image offset inside an overflow-hidden frame | Capped at 36px; passive scroll + one requested frame; updates only while hero intersects |
| Dayparts | Sliding tab indicator, image crossfade and short copy entrance | 450–800ms; no automatic switching |
| Mobile menu | Native modal with focus containment, Escape, return focus, scroll lock and brief entrance | 420ms; links remain real anchors |
| Brand gallery | Browser-native horizontal scroll and snap; previous/next controls | User-driven; no autoplay, timers or scroll interception |
| Details | Plus rotates and newly opened text fades | 250–300ms; native disclosure remains usable without animation |
| Hover | Small image scale on fine pointers only | 600ms; no mobile hover dependency |
| Reduced motion | OS setting or explicit footer control removes transitions, entrances and parallax | Content stays visible; scrolling is immediate |

No animation package, smooth-scroll replacement, infinite marquee, cursor effect or autoplay video was introduced. Components clean up observers, event listeners and requested frames.

## Generated asset provenance

The built-in image-generation tool created the original concept photograph. Production copies:

- `public/brand/evening-social.webp` (1024 × 1536)
- `public/brand/evening-social-mobile.webp` (640 × 960)

Prompt: “Create an original high-end candid editorial hospitality photograph, vertical 2:3 composition. Close view of two adult friends' hands meeting with delicate stemmed glasses of red and amber wine over a dark forest-green cafe table at a lively small European-inspired New York neighbourhood wine bar. Only cropped adult torsos/hands, no prominent faces, no posed stock-photo smiles. One white shirt cuff, one warm brown sleeve. Wine glasses physically accurate, natural hands. Tiny plate of olives and crumpled linen in lower foreground, warm dark wood and blurred amber lamp light in background, a little on-camera flash, tactile film grain, deep cinematic green shadows, burgundy wine, golden highlights. Cropped spontaneous art-directed nightlife magazine photography. No text, no logos, no graphical layout, no watermarks, no receipt, no menu, no border. Top quarter darker with breathing room for website overlay. This is concept imagery for an unlaunched brand, not a real venue documentary.”

The source PNG remains outside the repository; production copies were encoded locally as WebP. The footer and image description qualify the scene as concept imagery.
