import { redirect } from "next/navigation";
import { FINANCIALS_VISIBLE } from "../../lib/public-pages";
import type { Metadata } from "next";
import InvestmentOverview from "../InvestmentOverview";
import "../financials-v2/forecast.css";

export const metadata: Metadata = {
  title: "Plaisir · Investment overview",
  description:
    "The Plaisir flagship investment overview: capital requirements, operating forecast, profitability thresholds and investment structure.",
};
export default function Financials() {
  if (!FINANCIALS_VISIBLE) redirect("/");
  return (
    <main id="main" className="pl-main pl-financial-page">
      <section
        id="financials"
        className="financials pl-financials"
        aria-label="Investment financial overview"
      >
        <InvestmentOverview />
      </section>
    </main>
  );
}
