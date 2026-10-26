# Plaisir 0.3.5 — motion and mobile optimization

## Approach

The request is for a more noticeable reveal and a smoother menu, while retaining Plaisir's full-bleed photography, Agilera, olive/ochre palette and clean outline controls. This version deliberately retunes the earlier Shams timing rather than claiming to remain an exact copy.

Primary-source research supports using transform/opacity for motion, limiting unnecessary rendering work, preserving reduced-motion choices, serving responsive image candidates and keeping important hero resources discoverable. The precise distances and durations below are design choices; browser smoothness has not been measured in this environment.

## Motion

| Item | Implemented behavior |
| --- | --- |
| Scroll trigger | 12% inset at viewport bottom, capped at 120px |
| Body arrival | 36px upward travel; 850ms mobile, 950ms desktop |
| Heading arrival | 48px upward travel |
| Opacity | 650ms ease-out |
| Stagger | 90ms steps, capped at 180ms |
| Menu entrance | 680ms mobile / 720ms desktop, cubic-bezier(.22,1,.36,1) |
| Menu exit | 480ms mobile / 520ms desktop, cubic-bezier(.4,0,.2,1) |
| Link arrival | 520ms, 22px; 150ms initial delay plus 65ms per item |
| Close treatment | Text remains visible on the moving panel; burger strokes rotate smoothly |
| Reduced motion | Immediate transitions and readable content; explicit full-motion option |

Content stays visible in server HTML and without IntersectionObserver. Only safely enrolled offscreen blocks conceal. Focus immediately reveals its containing block; nested reveal markers do not accumulate translation. Completed arrivals remain one-shot. No scroll listener drives animation, and no continuous parallax or blur animation is added. Hero content is not concealed for an entrance effect. Full-bleed photos remain still.

## All-route mobile pass

- **Photography:** seven home and two investor photos use Next Image with intrinsic dimensions and explicit viewport/half-width sizes. Small-screen image candidates include 360px and 480px. One hero per route has eager/high-priority loading; lower photos remain lazy. No extra asset service or credential is required.
- **Typography:** fluid heading rules cover 320px widths; team names fit better, and the narrowest team grid becomes one column. Notes and financial text are larger. Text can wrap, and device zoom is not disabled.
- **Touch:** pills, financial view/year/raise controls, footer links and disclosure summaries receive at least 44px target height. Mouse hover translation is suppressed on touch devices.
- **Viewport:** content gutters account for left/right safe areas; the footer reserves the bottom safe area. Hero sections retain stable small-viewport minimum height. Short landscape viewports have tighter menu/hero spacing and can scroll.
- **Header:** only the logo and menu button are fixed. An observer identifies the section behind their vertical band and uses green on yellow, gold on green/photography. The open menu forces gold. No filled header or shadow is introduced.
- **Menu behavior:** the panel remains independently scrollable; background regions are inert, outside-panel touch drags are prevented while open, and the page is not repositioned with a fixed-body scroll offset. Existing Escape/focus/cancellation behavior is retained.
- **Dashboard:** yellow/green styling remains. Financial navigation is a three-column control grid on phones, KPI columns can shrink, large numbers scale down on narrower screens, notes are more readable, panel headings wrap, and the two tables have captions/column scope. Financial values and calculation helpers are unchanged.
- **Copy:** removed the obsolete investor invitation to adjust financial inputs; the dashboard currently offers model/funding/scenario views rather than editable assumptions.

## Validation and limits

The production build and TypeScript check succeed. All fourteen existing finance and motion helper tests pass. Generated-HTML auditing passes on `/`, `/investors` and `/financials`, checking heading/skip-target/viewport and responsive image markup. The audit script is included.

The managed preview server exits before the browser can connect. Consequently, this version has not been visually verified at 320/375/390/430px or landscape, and no frame-rate, dropped-frame, INP, LCP or CLS measurement is claimed. A mobile source optimization pass has been completed; physical-device/browser acceptance remains outstanding. Previous versions' browser checks do not validate this version.

For device acceptance, check those portrait widths plus a short landscape screen; reveal intensity at normal and fast scrolling; repeated menu open/close; navigation from a scrolled page; disclosure expansion; all financial view/year/raise controls; toolbar expansion/collapse; reduced motion; zoom; and back navigation.

## Primary sources

- [web.dev — High-performance CSS animations](https://web.dev/articles/animations-guide): choose rendering-efficient properties; use layer hints sparingly.
- [web.dev — Optimize Largest Contentful Paint](https://web.dev/articles/optimize-lcp): keep the hero discoverable and avoid lazy-loading it.
- [Next.js — Image component](https://nextjs.org/docs/app/api-reference/components/image): use sizes/srcset for responsive delivery and retain dimensions.
- [W3C — Target Size Enhanced](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html): 44px touch-target guidance; the ordinary minimum criterion has different requirements/exceptions.
- [WebKit — New viewport units](https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/): distinguish stable small-viewport sizing from dynamic viewport changes.
