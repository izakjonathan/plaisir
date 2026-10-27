import type { Metadata } from 'next';
import InvestorDashboard from '../InvestorDashboard';
import './forecast.css';
export const metadata: Metadata = {
  title: 'Plaisir · The Numbers v2',
  description: 'The 36-month Plaisir investor forecast: operating economics, opening capital, cash flow and trading scenarios.',
};
export default function NumbersV2() {
  return <main id="main" className="pl-main pl-financial-page forecast-page">
    <section className="financials pl-financials" aria-label="Investor forecast dashboard"><InvestorDashboard /></section>
  </main>;
}
