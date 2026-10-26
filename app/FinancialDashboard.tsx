"use client";
import { Copy, ContentImage } from "./Content";
import { useState } from "react";
import { BASE, ALLOCATIONS, operating as r, sensitivity, scenarioYears, scenarios, reconcileScenario, } from "../lib/deck";
const money = (n: number) => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
}).format(n);
const compact = (n: number) => `${n < 0 ? "−" : ""}$${(Math.abs(n) / 1000).toLocaleString("en-US", { maximumFractionDigits: 1 })}k`;
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
    return (<div className="deck-dashboard">
      <header className="dashboard-heading">
        <p className="eyebrow"><Copy field="numbers.page.text1"/></p>
        <h1><Copy field="numbers.page.text2"/></h1>
        <p><Copy field="numbers.page.text3"/></p>
        <span className="dashboard-source"><Copy field="numbers.page.text4"/></span>
      </header>
      <nav className="finance-views" aria-label="Financial sections">
        {views.map((v) => (<button key={v} className="pill" aria-pressed={view === v} onClick={() => setView(v)}>
            {v}
          </button>))}
      </nav>
      {view === "Overview" && (<section className="finance-view" aria-label="Operating overview">
          <div className="finance-kpis">
            <article data-reveal>
              <span><Copy field="numbers.page.text5"/></span>
              <strong>{compact(BASE.revenue)}</strong>
              <small><Copy field="numbers.page.text6"/></small>
            </article>
            <article data-reveal>
              <span><Copy field="numbers.page.text7"/></span>
              <strong>{compact(r.grossProfit)}</strong>
              <small>{pct(BASE.margin)} gross margin</small>
            </article>
            <article data-reveal>
              <span><Copy field="numbers.page.text8"/></span>
              <strong>{compact(r.ebitda)}</strong>
              <small>{pct(r.ebitdaMargin)} of revenue</small>
            </article>
          </div>
          <div className="finance-grid">
            <article data-reveal className="finance-panel">
              <div className="panel-heading">
                <h2><Copy field="numbers.page.text9"/></h2>
                <span><Copy field="numbers.page.text10"/></span>
              </div>
              <div className="cost-bars">
                {costs.map(([label, value]) => (<div key={label}>
                    <div>
                      <span>{label}</span>
                      <strong>{money(value)}</strong>
                    </div>
                    <div className="cost-track">
                      <span style={{ width: `${(value / BASE.revenue) * 100}%` }}/>
                    </div>
                    <small>
                      {pct((value / BASE.revenue) * 100)} of revenue
                    </small>
                  </div>))}
              </div>
            </article>
            <article data-reveal className="finance-panel">
              <div className="panel-heading">
                <h2><Copy field="numbers.page.text11"/></h2>
                <span><Copy field="numbers.page.text12"/></span>
              </div>
              <table className="finance-table">
                <caption className="sr-only">Annual operating model in US dollars</caption>
                <tbody>
                  {[
                ["Revenue", BASE.revenue],
                ["Cost of goods", -r.cogs],
                ["Gross profit", r.grossProfit],
                ["Labour", -BASE.labour],
                ["Occupancy", -BASE.occupancy],
                ["Other costs · implied", -BASE.other],
                ["EBITDA", r.ebitda],
            ].map(([label, n]) => (<tr key={label} className={label === "EBITDA" || label === "Gross profit"
                    ? "subtotal"
                    : ""}>
                      <th scope="row">{label}</th>
                      <td>
                        {Number(n) < 0
                    ? `(${money(-Number(n))})`
                    : money(Number(n))}
                      </td>
                    </tr>))}
                </tbody>
              </table>
              <p className="finance-note"><Copy field="numbers.page.text13"/></p>
            </article>
          </div>
          <article data-reveal className="finance-panel break-panel">
            <div>
              <p className="eyebrow"><Copy field="numbers.page.text14"/></p>
              <h2>{money(r.breakEven)}</h2>
              <p><Copy field="numbers.page.text15"/></p>
              <dl className="break-metrics">
                <div>
                  <dt><Copy field="numbers.page.text16"/></dt>
                  <dd>{money(r.breakEven / 12)}</dd>
                </div>
                <div>
                  <dt><Copy field="numbers.page.text17"/></dt>
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
              <h3><Copy field="numbers.page.text18"/></h3>
              <div className="sensitivity-bars">
                {sensitivity.map((s) => (<div key={s.margin} className={s.margin === 70 ? "highlight" : ""}>
                    <div>
                      <span>{s.margin}% margin</span>
                      <strong>{money(s.revenue)}</strong>
                    </div>
                    <div className="cost-track">
                      <span style={{ width: `${(s.revenue / 1000000) * 100}%` }}/>
                    </div>
                  </div>))}
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
            <p><Copy field="numbers.page.text19"/></p>
            <p><Copy field="numbers.page.text20"/></p>
          </details>
        </section>)}
      {view === "Funding" && (<section className="finance-view" aria-label="Funding overview">
          <div className="funding-heading">
            <div>
              <p className="eyebrow"><Copy field="numbers.page.text21"/></p>
              <h2><Copy field="numbers.page.text22"/></h2>
            </div>
            <div className="raise-switch" aria-label="Raise level">
              {[500000, 1000000].map((n) => (<button className="pill" aria-pressed={raise === n} key={n} onClick={() => setRaise(n)}>
                  {n === 500000 ? "$500k raise" : "$1m raise"}
                </button>))}
            </div>
          </div>
          <div className="finance-grid">
            <article data-reveal className="finance-panel">
              <div className="panel-heading">
                <h2><Copy field="numbers.page.text23"/></h2>
                <span>{money(raise)} raise</span>
              </div>
              <table className="finance-table">
                <caption className="sr-only">Proposed use of proceeds at the selected raise level</caption>
                <thead>
                  <tr>
                    <th scope="col">Allocation</th>
                    <th scope="col">Share</th>
                    <th scope="col">USD</th>
                  </tr>
                </thead>
                <tbody>
                  {ALLOCATIONS.map((a) => (<tr key={a.name}>
                      <th scope="row">{a.name}</th>
                      <td>{Math.round(a.share * 100)}%</td>
                      <td>{money(a.share * raise)}</td>
                    </tr>))}
                  <tr className="subtotal">
                    <th scope="row">Total</th>
                    <td>100%</td>
                    <td>{money(raise)}</td>
                  </tr>
                </tbody>
              </table>
            </article>
            <article data-reveal className="finance-panel reserve-panel">
              <p className="eyebrow"><Copy field="numbers.page.text24"/></p>
              <strong>{compact(raise * 0.1)}</strong>
              <h2><Copy field="numbers.page.text25"/></h2>
              <p><Copy field="numbers.page.text26"/></p>
            </article>
          </div>
          <p className="finance-note"><Copy field="numbers.page.text27"/></p>
        </section>)}
      {view === "Scenarios" && (<section className="finance-view" aria-label="Source scenarios">
          <div className="scenario-heading">
            <div>
              <h2><Copy field="numbers.page.text28"/></h2>
              <p><Copy field="numbers.page.text29"/></p>
            </div>
            <div className="raise-switch" aria-label="Scenario year">
              {scenarioYears.map((y, i) => (<button className="pill" key={y} aria-pressed={year === i} onClick={() => setYear(i)}>
                  {y}
                </button>))}
            </div>
          </div>
          <div className="scenario-cards">
            {scenarios.map((s) => {
                const residual = reconcileScenario(s, year);
                return (<article data-reveal className="finance-panel" key={s.name}>
                  <p className="eyebrow">
                    {s.name} · {scenarioYears[year]}
                  </p>
                  <strong className="scenario-revenue">
                    {compact(s.revenue[year] * 1000)}
                  </strong>
                  <span className="scenario-label"><Copy field="numbers.page.text30"/></span>
                  <dl>
                    {[
                        ["Gross profit", s.grossProfit[year]],
                        ["EBITDA", s.ebitda[year]],
                        ["Net profit · source", s.netProfit[year]],
                        ["Other opex · implied", residual.otherOpex],
                        ["Below EBITDA · implied", residual.belowEbitda],
                    ].map(([label, value]) => (<div key={label}>
                        <dt>{label}</dt>
                        <dd>{compact(Number(value) * 1000)}</dd>
                      </div>))}
                  </dl>
                </article>);
            })}
          </div>
          <details className="finance-disclosure">
            <summary>How to read these scenarios</summary>
            <p><Copy field="numbers.page.text31"/></p>
            <p><Copy field="numbers.page.text32"/></p>
          </details>
        </section>)}
      <p className="finance-source-note"><Copy field="numbers.page.text33"/></p>
    </div>);
}
