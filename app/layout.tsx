import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./brand.css";
import "./motion.css";
import "./mobile.css";
import "./landing.css";
import "./financial.css";
import "./typography.css";
import "./buttons.css";
import "./bottle-accents.css";
import "./footer.css";
import "./image-treatment.css";
import "./brand-assets.css";
import { brandStyle } from "../lib/brand";
import SiteShell from "./SiteShell";
import { ContentProvider } from "./Content";
import { readPublished } from "../lib/content-db";
import { createIntroBootstrap, INTRO_CRITICAL_CSS, INTRO_NO_SCRIPT_CSS } from "../lib/intro-bootstrap";
import { splashSettings } from "../lib/splash";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Plaisir · coffee & wine",
  description:
    "French café influences, an outgoing New York personality and a warm, authentic room shaped by Danish design. Explore the brand, flagship proposal and interactive financial illustration.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const published = await readPublished();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style data-brand-palette dangerouslySetInnerHTML={{ __html: brandStyle(published) }}/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: INTRO_CRITICAL_CSS }}/>
        <script dangerouslySetInnerHTML={{ __html: createIntroBootstrap(splashSettings(published).enabled) }}/>
        <noscript><style>{INTRO_NO_SCRIPT_CSS}</style></noscript>
        <link
          rel="preload"
          href="/fonts/Agilera.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ContentProvider value={published}><SiteShell>{children}</SiteShell></ContentProvider>
      </body>
    </html>
  );
}
