"use client";
import { useEffect, useId, useState } from "react";
import {
  ALLOCATIONS,
  BASE,
  PRESETS,
  calculate,
  cashProjection,
  demandRevenue,
  type Model,
} from "../lib/finance";

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
const short = (n: number) =>
  `${n < 0 ? "−" : ""}$${Math.abs(n) >= 1000000 ? `${(Math.abs(n) / 1000000).toFixed(2)}m` : `${(Math.abs(n) / 1000).toFixed(1)}k`}`;
const pct = (n: number) => `${n.toFixed(1)}%`;

function Control({
  label,
  value,
  min,
  max,
  step = 1,
  prefix = "",
  suffix = "",
  note,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  note?: string;
  onChange: (n: number) => void;
}) {
  const id = useId();
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);
  const change = (text: string) => {
    setDraft(text);
    const n = Number(text);
    if (
      text !== "" &&
      Number.isFinite(n) &&
      n >= min &&
      n <= max &&
      (step !== 1 || Number.isInteger(n))
    )
      onChange(n);
  };
  const commit = () => {
    const parsed = Number(draft);
    const bounded =
      draft !== "" && Number.isFinite(parsed)
        ? Math.max(min, Math.min(max, parsed))
        : value;
    const n = step === 1 ? Math.round(bounded) : bounded;
    setDraft(String(n));
    if (n !== value) onChange(n);
  };
  return (
    <div className="control">
      <div className="control-top">
        <label htmlFor={id}>{label}</label>
        <div className="number-wrap">
          <span>{prefix}</span>
          <input
            id={id}
            type="number"
            inputMode="decimal"
            min={min}
            max={max}
            step={step === 1 ? 1 : "any"}
            value={draft}
            onChange={(e) => change(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
            }}
            aria-describedby={note ? `${id}-note` : undefined}
          />
          <span>{suffix}</span>
        </div>
      </div>
      <input
        type="range"
        aria-label={`${label} slider`}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value);
          setDraft(String(n));
          onChange(n);
        }}
      />
      {note && (
        <p id={`${id}-note`} className="control-note">
          {note}
        </p>
      )}
    </div>
  );
}
type Point = { label: string; value: number };
function LineChart({
  data,
  title,
  xLabel,
  description,
  initial = 0,
}: {
  data: Point[];
  title: string;
  xLabel: string;
  description: string;
  initial?: number;
}) {
  const [selected, setSelected] = useState(initial);
  const id = useId();
  const active = Math.min(selected, data.length - 1);
  const rawMin = Math.min(0, ...data.map((p) => p.value));
  const rawMax = Math.max(0, ...data.map((p) => p.value));
  const padding = Math.max(1000, (rawMax - rawMin) * 0.12);
  const min = rawMin < 0 ? rawMin - padding : 0;
  const max = rawMax + padding;
  const y = (n: number) => 230 - ((n - min) / (max - min)) * 200;
  const x = (i: number) => 80 + (i / Math.max(1, data.length - 1)) * 530;
  return (
    <figure className="data-chart">
      <h4>{title}</h4>
      <p className="chart-description">{description}</p>
      <svg
        viewBox="0 0 660 300"
        aria-labelledby={`${id}-title ${id}-desc`}
        role="group"
      >
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-desc`}>
          {description} Select a point with a pointer or the Tab key to read its
          value.
        </desc>
        {Array.from({ length: 5 }, (_, i) => {
          const v = min + ((max - min) * i) / 4;
          return (
            <g key={i}>
              <line
                x1="80"
                x2="610"
                y1={y(v)}
                y2={y(v)}
                className="chart-grid"
              />
              <text x="68" y={y(v) + 5} textAnchor="end">
                {short(v)}
              </text>
            </g>
          );
        })}
        <line x1="80" x2="610" y1={y(0)} y2={y(0)} className="chart-zero" />
        <polyline
          points={data.map((p, i) => `${x(i)},${y(p.value)}`).join(" ")}
          className="chart-line"
        />
        {data.map((p, i) => (
          <g key={p.label}>
            <circle
              cx={x(i)}
              cy={y(p.value)}
              r={i === active ? 7 : 4}
              className={i === active ? "chart-point active" : "chart-point"}
              tabIndex={0}
              role="button"
              aria-label={`${p.label}: ${money(p.value)}`}
              aria-pressed={i === active}
              onFocus={() => setSelected(i)}
              onMouseEnter={() => setSelected(i)}
              onClick={() => setSelected(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(i);
                }
              }}
            >
              <title>
                {p.label}: {money(p.value)}
              </title>
            </circle>
            {(data.length < 6 || i % 2 === 0 || i === data.length - 1) && (
              <text x={x(i)} y="258" textAnchor="middle">
                {p.label}
              </text>
            )}
          </g>
        ))}
        <text x="345" y="292" textAnchor="middle" className="axis-title">
          {xLabel}
        </text>
      </svg>
      <figcaption className="chart-reading" aria-live="polite">
        <span>{data[active].label}</span>
        <strong>{money(data[active].value)}</strong>
      </figcaption>
      <details className="chart-data">
        <summary>View chart data</summary>
        <table>
          <thead>
            <tr>
              <th scope="col">{xLabel}</th>
              <th scope="col">USD</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.label}>
                <th scope="row">{p.label}</th>
                <td>{money(p.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
function Waterfall({ model, monthly }: { model: Model; monthly: boolean }) {
  const r = calculate(model);
  const factor = monthly ? 12 : 1;
  const [selected, setSelected] = useState(5);
  const items = [
    { label: "Revenue", start: 0, end: model.revenue, value: model.revenue },
    {
      label: "Goods",
      start: model.revenue,
      end: r.grossProfit,
      value: -r.cogs,
    },
    {
      label: "Labour",
      start: r.grossProfit,
      end: r.grossProfit - model.labour,
      value: -model.labour,
    },
    {
      label: "Occupancy",
      start: r.grossProfit - model.labour,
      end: r.grossProfit - model.labour - model.occupancy,
      value: -model.occupancy,
    },
    {
      label: "Other",
      start: r.ebitda + model.other,
      end: r.ebitda,
      value: -model.other,
    },
    { label: "EBITDA", start: 0, end: r.ebitda, value: r.ebitda },
  ];
  const min = Math.min(0, r.ebitda) - model.revenue * 0.06;
  const max = model.revenue * 1.13;
  const y = (v: number) => 254 - ((v - min) / (max - min)) * 225;
  return (
    <figure className="data-chart waterfall">
      <h4>From sales to operating earnings</h4>
      <p className="chart-description">
        {monthly ? "Monthly average" : "Annual illustration"} in USD. Product
        costs follow revenue; other costs stay fixed at your inputs.
      </p>
      <svg
        viewBox="0 0 760 325"
        role="group"
        aria-label="Revenue to EBITDA waterfall. Select a bar to inspect its amount."
      >
        <line x1="20" x2="740" y1={y(0)} y2={y(0)} className="chart-zero" />
        {items.map((item, i) => {
          const x = 34 + i * 120;
          const top = y(Math.max(item.start, item.end));
          const height = Math.max(2, Math.abs(y(item.start) - y(item.end)));
          return (
            <g key={item.label}>
              <rect
                x={x}
                y={top}
                width="76"
                height={height}
                className={`waterfall-bar ${i === 0 || i === 5 ? "total" : ""} ${i === selected ? "active" : ""}`}
                role="button"
                tabIndex={0}
                aria-label={`${item.label}: ${money(item.value / factor)}`}
                onFocus={() => setSelected(i)}
                onMouseEnter={() => setSelected(i)}
                onClick={() => setSelected(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(i);
                  }
                }}
              >
                <title>
                  {item.label}: {money(item.value / factor)}
                </title>
              </rect>
              <text x={x + 38} y={Math.max(16, top - 10)} textAnchor="middle">
                {short(item.value / factor)}
              </text>
              <text x={x + 38} y="293" textAnchor="middle">
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="chart-reading" aria-live="polite">
        <span>{items[selected].label}</span>
        <strong>{money(items[selected].value / factor)}</strong>
      </figcaption>
    </figure>
  );
}

export default function FinancialDashboard() {
  const [model, setModel] = useState<Model>({ ...BASE });
  const [preset, setPreset] = useState("Deck illustration");
  const [tab, setTab] = useState("Trading");
  const [monthly, setMonthly] = useState(false);
  const [funding, setFunding] = useState(750000);
  const [delay, setDelay] = useState(0);
  const [openingSales, setOpeningSales] = useState(60);
  const [rampMonths, setRampMonths] = useState(6);
  const [transactions, setTransactions] = useState(220);
  const [ticket, setTicket] = useState(25);
  const [days, setDays] = useState(351);
  const [cashMonth, setCashMonth] = useState(1);
  const r = calculate(model);
  const cash = cashProjection(model, {
    funding,
    delay,
    openingSales,
    rampMonths,
  });
  const firstShortage = cash.find((m) => m.balance < 0);
  const minimum = Math.min(funding * 0.1, ...cash.map((m) => m.balance));
  const demand = demandRevenue(transactions, ticket, days);
  const factor = monthly ? 12 : 1;
  const change = (key: keyof Model, value: number) => {
    setModel((m) => ({ ...m, [key]: value }));
    setPreset("Custom scenario");
  };
  const reset = () => {
    setModel({ ...BASE });
    setPreset("Deck illustration");
    setFunding(750000);
    setDelay(0);
    setOpeningSales(60);
    setRampMonths(6);
    setTransactions(220);
    setTicket(25);
    setDays(351);
    setCashMonth(1);
    setMonthly(false);
  };
  function download() {
    const rows = [
      ["Plaisir illustrative scenario", "USD unless stated"],
      ["Scenario", preset],
      ["Status", "Not an approved forecast"],
      ["Revenue", model.revenue],
      ["Gross margin %", model.margin],
      ["Cost of goods", r.cogs],
      ["Gross profit", r.grossProfit],
      ["Labour", model.labour],
      ["Occupancy", model.occupancy],
      ["Other costs (deck baseline implied)", model.other],
      ["EBITDA", r.ebitda],
      ["EBITDA margin %", r.ebitdaMargin],
      ["Annual break-even revenue", r.breakEven],
      ["Funding assumption", funding],
      ["Working capital allocation %", 10],
      ["Pre-opening months (full fixed cost burn)", delay],
      ["Opening sales % of monthly steady state", openingSales],
      ["Ramp months including first trading month", rampMonths],
      ["Cash proxy excludes capex, deposits, inventory timing, debt and tax"],
      ["Month", "Sales", "Operating cash proxy", "Closing reserve"],
      ...cash.map((m) => [m.month, m.revenue, m.operatingChange, m.balance]),
    ];
    const csv = rows
      .map((row) =>
        row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","),
      )
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "plaisir-scenario.csv";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const rows: [string, number][] = [
    ["Revenue", model.revenue],
    ["Cost of goods", -r.cogs],
    ["Gross profit", r.grossProfit],
    ["Labour", -model.labour],
    ["Occupancy", -model.occupancy],
    ["Other operating costs", -model.other],
    ["EBITDA", r.ebitda],
  ];
  return (
    <div className="financial-dashboard">
      <div className="dashboard-intro">
        <div>
          <p className="section-kicker">Financial illustration</p>
          <h2>
            The numbers,
            <br />
            <em>with room to explore</em>
          </h2>
        </div>
        <p>
          The deck’s annual model is the starting point. Change an assumption to
          see its effect on earnings, break-even and the opening cash reserve.
        </p>
      </div>
      <div className="model-status">
        <span>{preset}</span>
        <span>
          USD · Single flagship · Illustrative, not an approved forecast
        </span>
      </div>
      <div className="dashboard-actions">
        <div
          className="scenario-options"
          role="group"
          aria-label="Financial scenario"
        >
          {Object.keys(PRESETS).map((name) => (
            <button
              key={name}
              aria-pressed={preset === name}
              onClick={() => {
                setModel({ ...PRESETS[name] });
                setPreset(name);
              }}
            >
              {name}
            </button>
          ))}
        </div>
        <button className="quiet-button" onClick={reset}>
          Reset all assumptions
        </button>
      </div>
      <p className="scenario-note">
        {preset === "Deck illustration"
          ? "Source: business deck, slides 24–26. Other operating costs of $37,100 are a balancing amount implied by the source."
          : preset === "Custom scenario"
            ? "Custom assumptions for discussion. No change here represents an approved forecast."
            : "Additional stress test, not a deck forecast. Downside: sales −20%, margin 65%. Higher sales: sales +20%, margin 72%. Both increase labour and other costs by 10%."}
      </p>
      <div className="metric-row" aria-live="polite" aria-atomic="true">
        <div>
          <span>Annual revenue</span>
          <strong>{short(model.revenue)}</strong>
        </div>
        <div>
          <span>Annual EBITDA</span>
          <strong className={r.ebitda < 0 ? "negative" : ""}>
            {short(r.ebitda)}
          </strong>
          <small>{pct(r.ebitdaMargin)} of revenue</small>
        </div>
        <div>
          <span>Annual break-even</span>
          <strong>{short(r.breakEven)}</strong>
          <small>at {model.margin}% gross margin</small>
        </div>
      </div>
      <div
        className="dashboard-tabs"
        role="tablist"
        aria-label="Financial model view"
      >
        {["Trading", "Funding & opening cash", "Demand check"].map((name) => (
          <button
            key={name}
            id={`tab-${name.split(" ")[0]}`}
            role="tab"
            aria-selected={tab === name}
            aria-controls={`panel-${name.split(" ")[0]}`}
            tabIndex={tab === name ? 0 : -1}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const tabs = [
                  "Trading",
                  "Funding & opening cash",
                  "Demand check",
                ];
                const index =
                  (tabs.indexOf(name) + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                setTab(tabs[index]);
                document
                  .getElementById(`tab-${tabs[index].split(" ")[0]}`)
                  ?.focus();
              }
            }}
            onClick={() => setTab(name)}
          >
            {name}
          </button>
        ))}
      </div>
      {tab === "Trading" && (
        <div
          role="tabpanel"
          id="panel-Trading"
          aria-labelledby="tab-Trading"
          className="dashboard-panel"
        >
          <div className="trading-layout">
            <div className="input-column">
              <h3>Annual assumptions</h3>
              <Control
                label="Revenue"
                value={model.revenue}
                min={0}
                max={15000000}
                step={1000}
                prefix="$"
                onChange={(v) => change("revenue", v)}
              />
              <Control
                label="Gross margin"
                value={model.margin}
                min={40}
                max={85}
                step={0.5}
                suffix="%"
                onChange={(v) => change("margin", v)}
              />
              <Control
                label="Labour"
                value={model.labour}
                min={100000}
                max={650000}
                step={1000}
                prefix="$"
                onChange={(v) => change("labour", v)}
              />
              <Control
                label="Occupancy"
                value={model.occupancy}
                min={72000}
                max={350000}
                step={1000}
                prefix="$"
                onChange={(v) => change("occupancy", v)}
                note="Deck model: $216k. Proposed rent alone: $72k/year. The $144k difference remains unresolved."
              />
              <Control
                label="Other operating costs"
                value={model.other}
                min={0}
                max={200000}
                step={100}
                prefix="$"
                onChange={(v) => change("other", v)}
                note="The deck's $37.1k starting amount is implied, not a verified expense budget."
              />
            </div>
            <div className="model-output">
              <div
                className="period-switch"
                role="group"
                aria-label="P&L display period"
              >
                <button
                  aria-pressed={!monthly}
                  onClick={() => setMonthly(false)}
                >
                  Annual
                </button>
                <button aria-pressed={monthly} onClick={() => setMonthly(true)}>
                  Monthly average
                </button>
              </div>
              <Waterfall model={model} monthly={monthly} />
              <table className="pl-table">
                <caption>
                  Exact {monthly ? "monthly average" : "annual"} amounts · USD
                </caption>
                <tbody>
                  {rows.map(([label, value]) => (
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
                        {value < 0
                          ? `(${money(-value / factor)})`
                          : money(value / factor)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="sensitivity">
            <div>
              <h3>How margin changes break-even</h3>
              <p>
                Annual fixed costs are {money(r.fixed)} in this scenario. A
                lower margin needs more revenue to cover the same costs.
              </p>
              <p className="formula">
                Break-even revenue = fixed costs ÷ gross margin
              </p>
              <p className="model-note">
                Labour stays fixed in this sensitivity. Higher demand can
                require additional staffing, which you can change above.
              </p>
            </div>
            <LineChart
              title="Revenue needed for trading break-even"
              description="Fixed costs held constant at your current inputs."
              xLabel="Gross margin"
              data={[60, 65, 70, 75].map((m) => ({
                label: `${m}%`,
                value: r.fixed / (m / 100),
              }))}
              initial={2}
            />
          </div>
          <p className="model-note">
            EBITDA excludes depreciation, interest and tax. Trading break-even
            excludes capital recovery and financing. Neither measure establishes
            investment payback or net profit.
          </p>
        </div>
      )}
      {tab === "Funding & opening cash" && (
        <div
          role="tabpanel"
          id="panel-Funding"
          aria-labelledby="tab-Funding"
          className="dashboard-panel"
        >
          <div className="funding-layout">
            <div>
              <h3>Funding proposal</h3>
              <p>
                The deck proposes $500k–$1m. Allocation percentages remain fixed
                to the source while you explore the amount.
              </p>
              <Control
                label="Funding amount"
                value={funding}
                min={500000}
                max={1000000}
                step={25000}
                prefix="$"
                onChange={setFunding}
              />
              <div
                className="allocation-bar"
                role="img"
                aria-label="55% fit-out, 22% equipment and technology, 13% licensing and legal, 10% working capital"
              >
                {ALLOCATIONS.map((a, i) => (
                  <span
                    key={a.name}
                    style={{ width: `${a.share * 100}%`, opacity: 1 - i * 0.2 }}
                    title={`${a.name}: ${money(funding * a.share)}`}
                  />
                ))}
              </div>
              <table className="allocation-table">
                <caption>Proposed use of funds</caption>
                <thead>
                  <tr>
                    <th scope="col">Allocation</th>
                    <th scope="col">Share</th>
                    <th scope="col">USD</th>
                  </tr>
                </thead>
                <tbody>
                  {ALLOCATIONS.map((a) => (
                    <tr key={a.name}>
                      <th scope="row">{a.name}</th>
                      <td>{a.share * 100}%</td>
                      <td>{money(funding * a.share)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="opening-inputs">
              <h3>Opening assumptions</h3>
              <p>
                Additional assumptions for this explorer. These figures do not
                come from an approved cash-flow forecast.
              </p>
              <Control
                label="Months before trading"
                value={delay}
                min={0}
                max={6}
                onChange={setDelay}
                note="Delay burns the full monthly fixed cost with no sales."
              />
              <Control
                label="First trading month sales"
                value={openingSales}
                min={10}
                max={100}
                step={5}
                suffix="%"
                onChange={setOpeningSales}
                note="Percentage of the current model's steady monthly revenue."
              />
              <Control
                label="Months to steady sales"
                value={rampMonths}
                min={1}
                max={12}
                onChange={setRampMonths}
                note="Includes the first trading month. A one-month ramp means 100% sales immediately."
              />
            </div>
          </div>
          <div className="cash-summary">
            <div>
              <span>Opening working capital</span>
              <strong>{money(funding * 0.1)}</strong>
            </div>
            <div>
              <span>Lowest modelled reserve</span>
              <strong className={minimum < 0 ? "negative" : ""}>
                {money(minimum)}
              </strong>
            </div>
            <div>
              <span>First reserve shortfall</span>
              <strong>
                {firstShortage
                  ? `Month ${firstShortage.month}`
                  : "None in 12 months"}
              </strong>
            </div>
          </div>
          <LineChart
            title="Opening reserve through the first 12 months"
            description="Cumulative operating cash proxy after the 10% working-capital allocation. Month 1 is the first modelled month, including any delay."
            xLabel="Model month"
            data={[
              { label: "Start", value: funding * 0.1 },
              ...cash.map((m) => ({ label: `M${m.month}`, value: m.balance })),
            ]}
          />
          <div className="month-explorer">
            <label htmlFor="cash-month">Inspect month {cashMonth}</label>
            <input
              id="cash-month"
              type="range"
              min="1"
              max="12"
              value={cashMonth}
              onChange={(e) => setCashMonth(Number(e.target.value))}
            />
            <dl>
              <div>
                <dt>Sales</dt>
                <dd>{money(cash[cashMonth - 1].revenue)}</dd>
              </div>
              <div>
                <dt>Operating change</dt>
                <dd>{money(cash[cashMonth - 1].operatingChange)}</dd>
              </div>
              <div>
                <dt>Closing reserve</dt>
                <dd>{money(cash[cashMonth - 1].balance)}</dd>
              </div>
            </dl>
          </div>
          <p className="model-note">
            Calculation: opening reserve + cumulative (sales × gross margin −
            fixed costs ÷ 12). The remaining 90% of the raise is assumed
            committed to the other allocations. This simplified proxy excludes
            deposits, inventory and supplier timing, taxes, debt, additional
            capital spending, seasonality and contingencies. A positive balance
            does not establish actual runway.
          </p>
        </div>
      )}
      {tab === "Demand check" && (
        <div
          role="tabpanel"
          id="panel-Demand"
          aria-labelledby="tab-Demand"
          className="dashboard-panel"
        >
          <div className="demand-layout">
            <div>
              <h3>Do the sales assumptions agree?</h3>
              <p>
                The source pairs 220 daily transactions and a $25 ticket with
                $833k annual sales. At 351 trading days, those inputs produce a
                different annual total.
              </p>
              <Control
                label="Transactions per day"
                value={transactions}
                min={20}
                max={600}
                onChange={setTransactions}
              />
              <Control
                label="Average spend"
                value={ticket}
                min={3}
                max={60}
                step={0.5}
                prefix="$"
                onChange={setTicket}
              />
              <Control
                label="Trading days per year"
                value={days}
                min={100}
                max={365}
                onChange={setDays}
              />
            </div>
            <div className="demand-result">
              <span className="section-kicker">Daily demand calculation</span>
              <strong>{short(demand)}</strong>
              <p>
                {transactions} transactions × ${ticket.toFixed(2)} × {days}{" "}
                trading days
              </p>
              <div className="comparison-bar">
                <span>Source illustration</span>
                <i
                  style={{
                    width: `${(BASE.revenue / Math.max(BASE.revenue, demand)) * 100}%`,
                  }}
                />
                <strong>{money(BASE.revenue)}</strong>
              </div>
              <div className="comparison-bar">
                <span>Demand calculation</span>
                <i
                  style={{
                    width: `${(demand / Math.max(BASE.revenue, demand)) * 100}%`,
                  }}
                />
                <strong>{money(demand)}</strong>
              </div>
              <p>
                At this volume and trading year, the deck’s $833k revenue
                implies a ${(BASE.revenue / transactions / days).toFixed(2)}{" "}
                average ticket.
              </p>
              <button
                className="outline-button"
                onClick={() => {
                  change("revenue", demand);
                  setTab("Trading");
                }}
              >
                Use this revenue in the model
              </button>
              <p className="model-note">
                Applying demand changes revenue only. Review labour, capacity
                and other costs before drawing a conclusion. This calculation
                does not validate demand.
              </p>
            </div>
          </div>
          <p className="model-note">
            Source: deck appendix, slide 33. The 351-day assumption belongs to
            this specific source example. Do not combine it with the separate V3
            model’s 360-day basis.
          </p>
        </div>
      )}
      <div className="model-footer">
        <details>
          <summary>Model basis and source notes</summary>
          <p>
            Business deck slides 24–27 supply the annual illustration,
            break-even calculation and funding allocation. Slide 22 identifies
            the unresolved $72k rent / $216k occupancy difference. Slide 33
            identifies the inconsistent transaction and sales assumptions.
          </p>
          <p>
            The $750k funding default is the midpoint of the proposed range.
            Opening sales of 60%, a six-month ramp and zero pre-opening months
            are explorer assumptions. There is no membership, merchandise,
            catering or expansion revenue in the base model. No investor return
            or valuation is calculated.
          </p>
          <p>
            Costs and site assumptions remain subject to approval. The model
            holds labour, occupancy and other operating costs fixed until
            edited. The scenario CSV records the inputs and the 12-month cash
            proxy.
          </p>
        </details>
        <button className="quiet-button" onClick={download}>
          Download scenario CSV
        </button>
      </div>
    </div>
  );
}
