import type { Metadata } from "next";
import Link from "next/link";
import FinancialDashboard from "../FinancialDashboard";

export const metadata: Metadata = {
  title: "Plaisir · Financial dashboard",
  description:
    "Interactive Plaisir trading, funding, opening cash and demand assumptions. Source-derived illustrations, not an approved forecast.",
};
export default function Financials() {
  return (
    <main id="main" className="pl-main pl-financial-page">
      <div className="pl-area-heading">
        <span>03 / Financial dashboard</span>
        <Link href="/investors">Investor overview →</Link>
      </div>
      <section
        id="financials"
        className="financials pl-financials"
        aria-label="Interactive financial illustration"
      >
        <FinancialDashboard />
      </section>
    </main>
  );
}
