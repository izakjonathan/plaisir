import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Plaisir — A little everyday pleasure', description: 'A casual wine bar concept. Good wine, little plates, and a place to settle in.' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#304d3b' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
