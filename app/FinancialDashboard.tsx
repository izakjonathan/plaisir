"use client";
import { useState } from "react";
import {
  BASE,
  ALLOCATIONS,
  operating as r,
  sensitivity,
  scenarioYears,
  scenarios,
  reconcileScenario,
} from "../lib/deck";
const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
const compact = (n: number) =>
  `${n < 0 ? "−" : ""}$${(Math.abs(n) / 1000).toLocaleString("en-US", { maximumFractionDigits: 1 })}k`;
const pct = (n: number) => `${n.toFixed(1)}%`;
const views = ["Overview", "Funding", "Scenarios"] as const;
export default function FinancialDashboard() {
  const [view, setView] = useState<(typeof views)[number]>("Overview");
  const [raise, setRaise] = useState(500000);
  const [year, setYear] = useState(0);
  const costs = [
    ["Cost of goods", r.cogs],
    ["Labour", BASE.labour],
    ["Occupancy", BASE.occupancy],
    ["Other costs · implied", BASE.other],
  ] as const;
  return (
    <div className="deck-dashboard">
      <header className="dashboard-heading">
        <p className="eyebrow">The financial illustration</p>
        <h1>
          Behind the feeling.
          <br />
          The figures.
        </h1>
        <p>
          One flagship. Source-derived figures, with the assumptions in view.
        </p>
        <span className="dashboard-source">
          USD · Illustrative, not an approved forecast
        </span>
      </header>
      <nav className="finance-views" aria-label="Financial sections">
        {views.map((v) => (
          <button
            key={v}
            className="pill"
            aria-pressed={view === v}
            onClick={() => setView(v)}
          >
            {v}
          </button>
        ))}
      </nav>
      {view === "Overview" && (
        <section className="finance-view" aria-label="Operating overview">
          <div className="finance-kpis">
            <article>
              <span>Annual revenue</span>
              <strong>{compact(BASE.revenue)}</strong>
              <small>2026 base illustration</small>
            </article>
            <article>
              <span>Gross profit</span>
              <strong>{compact(r.grossProfit)}</strong>
              <small>{pct(BASE.margin)} gross margin</small>
            </article>
            <article>
              <span>Annual EBITDA</span>
              <strong>{compact(r.ebitda)}</strong>
              <small>{pct(r.ebitdaMargin)} of revenue</small>
            </article>
          </div>
          <div className="finance-grid">
            <article className="finance-panel">
              <div className="panel-heading">
                <h2>Where revenue goes</h2>
                <span>Annual USD</span>
              </div>
              <div className="cost-bars">
                {costs.map(([label, value]) => (
                  <div key={label}>
                    <div>
                      <span>{label}</span>
                      <strong>{money(value)}</strong>
                    </div>
                    <div className="cost-track">
                      <span
                        style={{ width: `${(value / BASE.revenue) * 100}%` }}
                      />
                    </div>
                    <small>
                      {pct((value / BASE.revenue) * 100)} of revenue
                    </small>
                  </div>
                ))}
              </div>
            </article>
            <article className="finance-panel">
              <div className="panel-heading">
                <h2>The operating bridge</h2>
                <span>Annual USD</span>
              </div>
              <table className="finance-table">
                <tbody>
                  {[
                    ["Revenue", BASE.revenue],
                    ["Cost of goods", -r.cogs],
                    ["Gross profit", r.grossProfit],
                    ["Labour", -BASE.labour],
                    ["Occupancy", -BASE.occupancy],
                    ["Other costs · implied", -BASE.other],
                    ["EBITDA", r.ebitda],
                  ].map(([label, n]) => (
                    <tr
                      key={label}
                      className={
                        label === "EBITDA" || label === "Gross profit"
                          ? "subtotal"
                          : ""
                      }
                    >
                      <th scope="row">{label}</th>
                      <td>
                        {Number(n) < 0
                          ? `(${money(-Number(n))})`
                          : money(Number(n))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="finance-note">
                Other costs of $37,100 balance the source illustration; they are
                not an itemised expense budget.
              </p>
            </article>
          </div>
          <article className="finance-panel break-panel">
            <div>
              <p className="eyebrow">Trading break-even</p>
              <h2>{money(r.breakEven)}</h2>
              <p>Annual revenue at 70% gross margin.</p>
              <dl className="break-metrics">
                <div>
                  <dt>Monthly equivalent</dt>
                  <dd>{money(r.breakEven / 12)}</dd>
                </div>
                <div>
                  <dt>Revenue cushion</dt>
                  <dd>
                    {money(BASE.revenue - r.breakEven)}{" "}
                    <small>
                      (
                      {pct(((BASE.revenue - r.breakEven) / BASE.revenue) * 100)}
                      )
                    </small>
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <h3>Gross margin sensitivity</h3>
              <div className="sensitivity-bars">
                {sensitivity.map((s) => (
                  <div
                    key={s.margin}
                    className={s.margin === 70 ? "highlight" : ""}
                  >
                    <div>
                      <span>{s.margin}% margin</span>
                      <strong>{money(s.revenue)}</strong>
                    </div>
                    <div className="cost-track">
                      <span
                        style={{ width: `${(s.revenue / 1000000) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="finance-note">
                $521,100 of operating costs held fixed. At 60% margin and
                $833,000 sales, EBITDA would be (
                {money(r.fixed - BASE.revenue * 0.6)}).
              </p>
            </div>
          </article>
          <details className="finance-disclosure">
            <summary>Assumptions & reconciliation</summary>
            <p>
              The proposed $72,000 annual base rent differs from $216,000 model
              occupancy by $144,000. Cost completeness and payroll burden
              require validation. EBITDA excludes depreciation, interest and
              tax. Break-even excludes financing and capital recovery.
            </p>
            <p>
              The separate bottom-up model of 220 daily transactions × $25 × 351
              days gives $1,930,500, not $833,000. At that transaction volume,
              $833,000 implies a $10.79 ticket. The two illustrations have not
              been combined.
            </p>
          </details>
        </section>
      )}
      {view === "Funding" && (
        <section className="finance-view" aria-label="Funding overview">
          <div className="funding-heading">
            <div>
              <p className="eyebrow">Proposed capital raise</p>
              <h2>$500k–$1m</h2>
            </div>
            <div className="raise-switch" aria-label="Raise level">
              {[500000, 1000000].map((n) => (
                <button
                  className="pill"
                  aria-pressed={raise === n}
                  key={n}
                  onClick={() => setRaise(n)}
                >
                  {n === 500000 ? "$500k raise" : "$1m raise"}
                </button>
              ))}
            </div>
          </div>
          <div className="finance-grid">
            <article className="finance-panel">
              <div className="panel-heading">
                <h2>Use of proceeds</h2>
                <span>{money(raise)} raise</span>
              </div>
              <table className="finance-table">
                <thead>
                  <tr>
                    <th>Allocation</th>
                    <th>Share</th>
                    <th>USD</th>
                  </tr>
                </thead>
                <tbody>
                  {ALLOCATIONS.map((a) => (
                    <tr key={a.name}>
                      <th scope="row">{a.name}</th>
                      <td>{Math.round(a.share * 100)}%</td>
                      <td>{money(a.share * raise)}</td>
                    </tr>
                  ))}
                  <tr className="subtotal">
                    <th>Total</th>
                    <td>100%</td>
                    <td>{money(raise)}</td>
                  </tr>
                </tbody>
              </table>
            </article>
            <article className="finance-panel reserve-panel">
              <p className="eyebrow">Working capital allocation</p>
              <strong>{compact(raise * 0.1)}</strong>
              <h2>A reserve still to be costed.</h2>
              <p>
                The 10% allocation does not establish runway. A monthly
                cash-flow forecast must cost deposits, launch losses, supplier
                timing, delays and the minimum opening reserve.
              </p>
            </article>
          </div>
          <p className="finance-note">
            Source percentages are proposals. Final funding depends on the
            approved site and complete opening budget. No cash balance,
            confirmed runway or payback is established.
          </p>
        </section>
      )}
      {view === "Scenarios" && (
        <section className="finance-view" aria-label="Source scenarios">
          <div className="scenario-heading">
            <div>
              <h2>Three possible trading cases.</h2>
              <p>Source projections. USD thousands, rounded.</p>
            </div>
            <div className="raise-switch" aria-label="Scenario year">
              {scenarioYears.map((y, i) => (
                <button
                  className="pill"
                  key={y}
                  aria-pressed={year === i}
                  onClick={() => setYear(i)}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
          <div className="scenario-cards">
            {scenarios.map((s) => {
              const residual = reconcileScenario(s, year);
              return (
                <article className="finance-panel" key={s.name}>
                  <p className="eyebrow">
                    {s.name} · {scenarioYears[year]}
                  </p>
                  <strong className="scenario-revenue">
                    {compact(s.revenue[year] * 1000)}
                  </strong>
                  <span className="scenario-label">Annual revenue</span>
                  <dl>
                    {[
                      ["Gross profit", s.grossProfit[year]],
                      ["EBITDA", s.ebitda[year]],
                      ["Net profit · source", s.netProfit[year]],
                      ["Other opex · implied", residual.otherOpex],
                      ["Below EBITDA · implied", residual.belowEbitda],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{compact(Number(value) * 1000)}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              );
            })}
          </div>
          <details className="finance-disclosure">
            <summary>How to read these scenarios</summary>
            <p>
              All cases use $268k annual payroll. Occupancy is $216k / $219k /
              $222k in 2026 / 2027 / 2028. Other opex = gross profit − payroll −
              occupancy − EBITDA. Below-EBITDA deductions = EBITDA − net profit.
              These residuals have not been itemised.
            </p>
            <p>
              Implied gross margins range from 69.83% to 70.31%. The rounded
              base 2026 gross profit of $583k differs from the detailed $583.1k
              illustration only by rounding. Downside remains loss-making in
              each year. Source net profit is not a verified cash return.
            </p>
          </details>
        </section>
      )}
      <p className="finance-source-note">
        Source: Plaisir Investor Deck, pages 22–25, 32–33, 42 and 46–48. Figures
        are presented without an assumed investment return.
      </p>
    </div>
  );
}
