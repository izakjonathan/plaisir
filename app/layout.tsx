import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./mobile-brand.css";
export const metadata: Metadata = {
  title: "Plaisir · coffee & wine",
  description:
    "French café influences, an outgoing New York personality and a warm, authentic room shaped by Danish design. Explore the brand, flagship proposal and interactive financial illustration.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#203c30",
};
export default function RootLayout({
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
      <body>{children}</body>
    </html>
  );
}
