"use client";
import { Copy } from "./Content";
import { useState } from "react";
import { BASE, ALLOCATIONS, operating as r, sensitivity, scenarioYears, scenarios, reconcileScenario, } from "../lib/deck";
const money = (n: number) => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
}).format(n);
const pct = (n: number) => `${n.toFixed(1)}%`;
const views = ["Overview", "Funding", "Scenarios"] as const;
type ChartItem = { label: string; value: number };
function AmountChart({ title, description, items, maximum, diverging = false }: {
    title: string; description: string; items: ChartItem[]; maximum: number; diverging?: boolean;
}) {
    return <figure className="finance-chart">
      <figcaption><h3>{title}</h3><p>{description}</p></figcaption>
      {diverging && <div className="chart-axis" aria-hidden="true"><span>{money(-maximum)}</span><span>$0</span><span>{money(maximum)}</span></div>}
      <ul className="chart-rows">{items.map(item => <li key={item.label}>
        <div className="chart-label"><span>{item.label}</span><strong>{money(item.value)}</strong></div>
        <div aria-hidden="true" className={`comparison-track ${diverging ? 'diverging' : ''}`}>
          <span className={item.value < 0 ? 'loss-bar' : ''} style={{
            width:`${Math.abs(item.value) / maximum * (diverging ? 50 : 100)}%`,
            left:diverging ? `${item.value < 0 ? 50 - Math.abs(item.value) / maximum * 50 : 50}%` : '0%',
          }}/>
        </div>
      </li>)}</ul>
    </figure>;
}
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
    const revenueCases = scenarios.map(s => ({label:s.name,value:s.revenue[year]*1000}));
    const earningsCases = scenarios.map(s => ({label:s.name,value:s.ebitda[year]*1000}));
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
          <div className="finance-context"><strong>One flagship · 2026 annual illustration</strong><span>All amounts in US dollars (USD). Proposed figures, not actual trading results.</span></div>
          <div className="finance-kpis">
            <article data-reveal>
              <span><Copy field="numbers.page.text5"/></span>
              <strong>{money(BASE.revenue)}</strong>
              <small><Copy field="numbers.page.text6"/></small><p>Total sales before product and operating costs.</p>
            </article>
            <article data-reveal>
              <span><Copy field="numbers.page.text7"/></span>
              <strong>{money(r.grossProfit)}</strong>
              <small>{pct(BASE.margin)} gross margin</small><p>Sales left after buying the products sold.</p>
            </article>
            <article data-reveal>
              <span><Copy field="numbers.page.text8"/></span>
              <strong>{money(r.ebitda)}</strong>
              <small>{pct(r.ebitdaMargin)} of revenue</small><p>Operating earnings before depreciation, interest and tax.</p>
            </article>
          </div>
          <div className="finance-grid">
            <article data-reveal className="finance-panel">
              <div className="panel-heading">
                <h2><Copy field="numbers.page.text9"/></h2>
                <span><Copy field="numbers.page.text10"/></span>
              </div>
              <p className="panel-intro">Each bar shows a share of the {money(BASE.revenue)} in annual sales.</p>
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
              <p className="panel-intro">Sales minus product costs and operating costs leave {money(r.ebitda)} in EBITDA.</p>
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
              <h2 className="break-title"><Copy field="numbers.page.text14"/></h2>
              <strong className="break-total">{money(r.breakEven)}</strong>
              <p><Copy field="numbers.page.text15"/></p>
              <p className="finance-plain">The annual sales needed to cover product costs and {money(r.fixed)} of fixed operating costs. EBITDA is zero at this level.</p>
              <AmountChart title="Planned sales vs break-even" description="Annual revenue · both bars use the same scale from $0." maximum={BASE.revenue} items={[{label:'Break-even sales',value:r.breakEven},{label:'Base-model sales',value:BASE.revenue}]}/>
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
              <p className="finance-note">The cushion is the drop in base-model sales before EBITDA reaches zero. Monthly equivalent is annual break-even divided by 12. Dollar amounts are rounded.</p>
            </div>
            <div>
              <h3><Copy field="numbers.page.text18"/></h3>
              <p className="panel-intro">A lower gross margin means more sales are needed to break even. The 70% row is the base model.</p>
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
          <aside className="finance-assumptions"><h3>Two inputs still need confirming</h3><p><strong>Occupancy:</strong> the model uses $216,000 a year, while proposed base rent is $72,000. The additional $144,000 has not been explained.</p><p><strong>Other operating costs:</strong> $37,100 is implied by the source figures and still needs an itemised budget.</p></aside>
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
              <AmountChart title="How the funding is allocated" description="Proposed share of the selected raise; amounts in USD." maximum={raise} items={ALLOCATIONS.map(a=>({label:`${a.name} · ${Math.round(a.share*100)}%`,value:a.share*raise}))}/>
              <table className="finance-table funding-table">
                <caption className="sr-only">Proposed use of proceeds at the selected raise level</caption>
                <thead>
                  <tr>
                    <th scope="col">Allocation</th>
                    <th scope="col">USD</th>
                  </tr>
                </thead>
                <tbody>
                  {ALLOCATIONS.map((a) => (<tr key={a.name}>
                      <th scope="row">{a.name}</th>
                      <td>{money(a.share * raise)}</td>
                    </tr>))}
                  <tr className="subtotal">
                    <th scope="row">Total</th>
                    <td>{money(raise)}</td>
                  </tr>
                </tbody>
              </table>
            </article>
            <article data-reveal className="finance-panel reserve-panel">
              <p className="eyebrow"><Copy field="numbers.page.text24"/></p>
              <strong>{money(raise * 0.1)}</strong>
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
          <p className="finance-context">Selected year: {scenarioYears[year]}. All source scenario amounts are rounded to the nearest $1,000.</p>
          <div className="finance-grid scenario-charts">
            <article className="finance-panel"><AmountChart title="Annual revenue" description={`Sales across the three ${scenarioYears[year]} cases. Bars share a $0 baseline.`} items={revenueCases} maximum={Math.max(...revenueCases.map(s=>s.value))}/></article>
            <article className="finance-panel"><AmountChart title="Operating earnings (EBITDA)" description="Losses extend left of $0; earnings extend right. Both sides use the same scale." items={earningsCases} maximum={Math.max(...earningsCases.map(s=>Math.abs(s.value)))} diverging/></article>
          </div>
          <p className="finance-plain">EBITDA is earnings before depreciation, interest and tax. The detailed figures below also include the source’s net-profit projections and amounts implied by those figures.</p>
          <div className="scenario-cards">
            {scenarios.map((s) => {
                const residual = reconcileScenario(s, year);
                return (<article data-reveal className="finance-panel" key={s.name}>
                  <p className="eyebrow">
                    {s.name} · {scenarioYears[year]}
                  </p>
                  <strong className="scenario-revenue">
                    {money(s.revenue[year] * 1000)}
                  </strong>
                  <span className="scenario-label"><Copy field="numbers.page.text30"/></span>
                  <dl>
                    {[
                        ["Gross profit", s.grossProfit[year]],
                        ["EBITDA", s.ebitda[year]],
                        ["Net profit (source)", s.netProfit[year]],
                        ["Other operating costs (implied)", residual.otherOpex],
                        ["Deductions after EBITDA (implied)", residual.belowEbitda],
                    ].map(([label, value]) => (<div key={label}>
                        <dt>{label}</dt>
                        <dd>{money(Number(value) * 1000)}</dd>
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

