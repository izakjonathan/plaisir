import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./brand.css";
import "./motion.css";
import "./mobile.css";
import "./landing.css";
import "./financial.css";
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
