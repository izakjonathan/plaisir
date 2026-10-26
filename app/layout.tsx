import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./brand.css";
import "./motion.css";
import "./mobile.css";
import "./landing.css";
import SiteShell from "./SiteShell";
import { ContentProvider } from "./Content";
import { readPublished } from "../lib/content-db";
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
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/Agilera.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ContentProvider value={await readPublished()}><SiteShell>{children}</SiteShell></ContentProvider>
      </body>
    </html>
  );
}
