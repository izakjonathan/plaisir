import type { Metadata } from "next";
import SeedDeck from "./SeedDeck";

export const metadata: Metadata = {
  title: "Plaisir · Seed presentation",
  description: "The proposed New York City flagship and its operating plan.",
  robots: { index: false, follow: false, noarchive: true },
};

export default function SeedPage() {
  return <SeedDeck />;
}
