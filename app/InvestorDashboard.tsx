'use client';
import { useState, type ReactNode } from 'react';
import { CASES, CASE_NOTES, DAYPARTS, FIXED_COSTS, FORECASTS, FUNDING, OPENING, type ForecastCase } from '../lib/investor-forecast';

const dollars = new Intl.NumberFormat('en-US', { style:'currency', currency:'USD', maximumFractionDigits:0 });
const bill = new Intl.NumberFormat('en-US', { style:'currency', currency:'USD', minimumFractionDigits:2, maximumFractionDigits:2 });
const money = (n:number) => Math.abs(n) < .5 ? dollars.format(0) : n < 0 ? `(${dollars.format(-n)})` : dollars.format(n);
const percent = (n:number) => `${(n*100).toFixed(1)}%`;
const count = (n:number) => new Intl.NumberFormat('en-US', {maximumFractionDigits:0}).format(n);
const tabs = ['Overview', 'Cash & funding', 'Operating model', 'Basis & sources'] as const;
type Model = typeof FORECASTS.Base;
const sources = [
  ['Wage benchmark', 'ELOREA · NYC barista recruitment', 'https://elorea.com/pages/barista', '$20–25/hour published range. The forecast selects $22.50; manager pay and the role mix are assumptions.'],
  ['Employee benefits', 'KFF · 2025 employer health survey', 'https://www.kff.org/health-costs/2025-employer-health-benefits-survey/', '$7,885 employer single-cover cost, derived from the national average. Eight enrolled staff is an assumption.'],
  ['Rent evidence', 'Centennial · 24 September 2026 retail sheet', 'https://centpropny.com/doc.cfm?docFileName=retail_hotsheet&id=28', 'West restaurant at 219 East 23rd Street: approximately 1,000 sq ft, $9,995/month asking rent. Availability and terms are unconfirmed.'],
  ['Construction benchmark', 'Alpha Contracting · NYC cost guide', 'https://www.alphacontractorsny.com/guides/commercial-build-out-cost-nyc', '$300–450/sq ft for a second-generation full-service restaurant. This is a vendor benchmark, not a site-specific bid.'],
  ['Processing fees', 'Square · published payment plans', 'https://squareup.com/us/en/payments/our-fees', 'Selected plan: 2.6% + $0.15 per card payment. The model assumes one payment per paid visit and a 90% card share.'],
  ['Employer payroll tax', 'IRS · Publication 15', 'https://www.irs.gov/publications/p15', '7.65% employer FICA provision. No tip credit or FICA tip-tax credit is taken. UI and workers’ compensation are separate allowances.'],
  ['Sales tax', 'NYC · Department of Finance', 'https://www.nyc.gov/site/finance/business/business-nys-sales-tax.page', '8.875% taxable-sales assumption. Sales tax and employee tips are excluded from revenue and unrestricted cash.'],
] as const;
function Panel({title, kicker, children, className=''}:{title:string;kicker?:string;children:ReactNode;className?:string}) {
  return <article className={`finance-panel v2-panel ${className}`} data-reveal>
    <div className="v2-panel-title">{kicker && <span className="v2-label">{kicker}</span>}<h2>{title}</h2></div>{children}
  </article>;
}
function Bars({items,max,diverging=false}:{items:{label:string;value:number;note?:string}[];max:number;diverging?:boolean}) {
  return <ul className="v2-bars">{items.map(({label,value,note})=><li key={label}>
    <div className="v2-bar-label"><span>{label}</span><strong>{money(value)}</strong></div>
    <div className={`v2-track ${diverging?'v2-diverging':''}`} aria-hidden="true"><span className={value<0?'v2-loss':''} style={{width:`${Math.min(1,Math.abs(value)/max)*(diverging?50:100)}%`,left:diverging?`${value<0?50-Math.min(1,Math.abs(value)/max)*50:50}%`:'0%'}} /></div>
    {note && <small>{note}</small>}
  </li>)}</ul>;
}
function FinancialTable({model,year}:{model:Model;year:number}) {
  type Year = Model['years'][number];
  const rows: {label:string;key:keyof Year;negative?:boolean;total?:boolean}[] = [
    {label:'Net sales',key:'sales',total:true}, {label:'Product costs',key:'cogs',negative:true}, {label:'Gross profit',key:'grossProfit',total:true},
    {label:'Employer payroll & benefits',key:'payroll',negative:true}, {label:'Occupancy',key:'occupancy',negative:true},
    {label:'Other fixed operating costs',key:'other',negative:true}, {label:'Payment processing',key:'processing',negative:true},
    {label:'Marketing',key:'marketing',negative:true}, {label:'Consumables',key:'consumables',negative:true},
    {label:'EBITDA',key:'ebitda',total:true}, {label:'Depreciation',key:'depreciation',negative:true}, {label:'EBIT',key:'ebit',total:true},
    {label:'Planning tax provision',key:'tax',negative:true}, {label:'Net income',key:'netIncome',total:true},
  ];
  return <div className="v2-table-scroll" tabIndex={0} role="region" aria-label="Scrollable three-year profit and loss">
    <table className="v2-table"><caption>Three-year profit & loss · {model.scenario} case · USD</caption>
      <thead><tr><th scope="col">Trading year</th>{model.years.map((y,i)=><th key={y.year} scope="col" className={i===year?'v2-selected-col':''}>Year {y.year}</th>)}</tr></thead>
      <tbody>{rows.map(row=><tr key={row.label} className={row.total?'v2-subtotal':''}><th scope="row">{row.label}</th>{model.years.map((y,i)=><td key={y.year} className={i===year?'v2-selected-col':''}>{money(Number(y[row.key])*(row.negative?-1:1))}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}
function CashPlot({model,month,compact=false}:{model:Model;month:number;compact?:boolean}) {
  const selected=model.months[month-1];
  const min=-400000,max=600000,left=compact?64:76,right=compact?390:854,top=22,bottom=compact?224:244;
  const x=(i:number)=>left+i/36*(right-left), y=(n:number)=>bottom-(n-min)/(max-min)*(bottom-top);
  const points=[model.openingCash,...model.months.map(m=>m.cash)];
  const floor=[model.months[0].cashFloor,...model.months.map(m=>m.cashFloor)];
  const path=(a:number[])=>a.map((v,i)=>`${i?'L':'M'}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(' ');
  return <svg className={compact ? 'v2-compact-plot' : 'v2-wide-plot'} viewBox={compact ? '0 0 440 265' : '0 0 880 285'} role="img" aria-label={`${model.scenario} case: 36-month cash position against minimum reserve`}>
      <title>Monthly cash and reserve · {model.scenario}</title><desc>Opening cash {money(model.openingCash)}. Month 36 cash {money(model.months[35].cash)}. {model.cashShortfall?`Cash shortfall begins in month ${model.cashShortfall}.`:'Cash stays positive throughout the forecast.'} Exact monthly figures are available below.</desc>
      {[-400000,-200000,0,200000,400000,600000].map(v=><g key={v}><line x1={left} x2={right} y1={y(v)} y2={y(v)} className={v===0?'v2-zero':'v2-gridline'}/><text x={left-12} y={y(v)+4} textAnchor="end">{v<0?'−':''}${Math.abs(v)/1000}k</text></g>)}
      {[0,12,24,36].map(v=><text key={v} x={x(v)} y={compact ? 253 : 272} textAnchor="middle">{v===0?'Opening':`Month ${v}`}</text>)}
      <path d={path(floor)} className="v2-reserve-line"/><path d={path(points)} className="v2-cash-line"/>
      <line x1={x(month)} x2={x(month)} y1={top} y2={bottom} className="v2-cursor"/><circle cx={x(month)} cy={y(selected.cash)} r="5" className="v2-cash-dot"/>
    </svg>;
}
function CashChart({model}:{model:Model}) {
  const [month,setMonth]=useState(1);
  const selected=model.months[month-1];
  return <>
    <div className="v2-chart-key"><span><i/>Unrestricted cash</span><span><i className="v2-dashed"/>Three-month reserve</span></div>
    <div className="v2-cash-chart"><CashPlot model={model} month={month}/><CashPlot model={model} month={month} compact/></div>
    <div className="v2-month-control"><label htmlFor="forecast-month">Inspect month <strong>{month}</strong></label><input id="forecast-month" type="range" min="1" max="36" step="1" value={month} onChange={e=>setMonth(Number(e.target.value))}/></div>
    <dl className="v2-stats v2-month-stats" aria-live="polite"><div><dt>Closing cash · M{month}</dt><dd>{money(selected.cash)}</dd></div><div><dt>Cash above / below reserve</dt><dd>{money(selected.cashAbovePolicy)}</dd></div><div><dt>Free cash flow · M{month}</dt><dd>{money(selected.freeCashFlow)}</dd></div></dl>
    <p className="v2-note">The dashed line is a chosen reserve of three months of core payroll, occupancy and other fixed costs. Negative cash is an unfunded shortfall; no borrowing is assumed.</p>
    <details className="v2-details"><summary>View all 36 months</summary><div className="v2-table-scroll" tabIndex={0} role="region" aria-label="Scrollable monthly cash flow"><table className="v2-table"><caption>Monthly cash flow · {model.scenario} · USD</caption><thead><tr><th scope="col">Month</th><th scope="col">Sales</th><th scope="col">EBITDA</th><th scope="col">Free cash flow</th><th scope="col">Closing cash</th><th scope="col">Reserve</th></tr></thead><tbody>{model.months.map(m=><tr key={m.month}><th scope="row">{m.month}</th>{[m.sales,m.ebitda,m.freeCashFlow,m.cash,m.cashFloor].map((v,i)=><td key={i}>{money(v)}</td>)}</tr>)}</tbody></table></div></details>
  </>;
}
function Downloads() {
  return <div className="v2-downloads"><a className="pill" href="/forecasts/Plaisir-Investor-Forecast.pdf" download>Investor report · PDF</a><a className="pill" href="/forecasts/Plaisir-Investor-Forecast.xlsx" download>Editable forecast · Excel</a></div>;
}
export default function InvestorDashboard() {
  const [scenario,setScenario]=useState<ForecastCase>('Base');
  const [year,setYear]=useState(0);
  const [tab,setTab]=useState<typeof tabs[number]>('Overview');
  const model=FORECASTS[scenario], annual=model.years[year];
  const capital=OPENING.slice(0,7).map(v=>({...v,amount:v.amount*(scenario==='Downside'?1.2:1)}));
  const payroll=model.months[year*12+11];
  const threshold=FORECASTS.Upside.years[1];
  return <div className="deck-dashboard v2-dashboard">
    <header className="dashboard-heading v2-heading"><p className="eyebrow">The Numbers v2 · Manhattan flagship</p><h1>A closer look<br/>at the numbers.</h1><p>The operating plan, the capital it needs, and the path to a profitable first Plaisir.</p><div className="v2-issue"><span>36-month investor forecast</span><span>Issued 27 October 2026 · USD</span></div></header>
    <div className="v2-toolbar">
      <fieldset><legend>Trading scenario</legend><div className="v2-switch">{CASES.map(c=><button key={c} type="button" className="pill" aria-pressed={scenario===c} onClick={()=>setScenario(c)}>{c}</button>)}</div></fieldset>
      <fieldset><legend>Trading year</legend><div className="v2-switch">{[0,1,2].map(y=><button key={y} type="button" className="pill" aria-pressed={year===y} onClick={()=>setYear(y)}>Year {y+1}</button>)}</div></fieldset>
    </div>
    <p className="v2-case-note" aria-live="polite"><strong>{scenario} case.</strong> {CASE_NOTES[scenario]} All years start from opening; sales exclude tax and tips.</p>
    <nav className="finance-views v2-views" aria-label="Investor dashboard sections">{tabs.map(t=><button key={t} type="button" className="pill" aria-pressed={tab===t} onClick={()=>setTab(t)}>{t}</button>)}</nav>
    <section className="v2-content" key={tab} aria-label={tab}>
    {tab==='Overview' && <>
      <div className="v2-section-line"><h2>Year {year+1} at a glance</h2><span>{scenario} scenario · 360 trading days/year</span></div>
      <div className="v2-kpis" aria-live="polite">
        <article><span>Net sales</span><strong>{money(annual.sales)}</strong><small>{count(annual.visits)} paid visits · {bill.format(annual.spend)} net bill</small></article>
        <article><span>Store EBITDA</span><strong>{money(annual.ebitda)}</strong><small>{percent(annual.margin)} operating margin</small></article>
        <article><span>Year-end cash</span><strong>{money(annual.cash)}</strong><small>After capex, working capital & planning tax</small></article>
        <article><span>36-month funding need</span><strong>{money(model.requiredFunding)}</strong><small>Includes opening uses & reserve policy</small></article>
      </div>
      <aside className="v2-verdict"><span className="v2-label">The investment read</span><h2>{scenario==='Base'?'Funded to open. Still a margin to earn.':scenario==='Downside'?'Weaker trading needs more capital.':'Higher traffic creates operating profit.'}</h2><p>{scenario==='Base'?'The central case remains slightly loss-making once established. A $1,100,000 raise preserves the chosen cash reserve through 36 months, but funding alone does not resolve the operating shortfall.':scenario==='Downside'?`The $1,100,000 raise falls below reserve policy in Month ${model.reserveBreach} and cash becomes negative in Month ${model.cashShortfall}. About ${money(model.requiredFunding)} is needed to preserve the reserve through Month 36.`:'216 daily visits at established trade produce an 8.1% EBITDA margin in Year 2, including additional hourly cover. The extra traffic is a sensitivity to test, not proven customer demand.'}</p></aside>
      <div className="v2-two-col">
        <Panel title="The three-year sales outlook" kicker="01 / Revenue"><Bars max={1600000} items={model.years.map(y=>({label:`Year ${y.year}`,value:y.sales,note:y.year===1?'Opening ramp included':`Same established traffic · ${y.year===2?'3%':'6.09%'} cumulative price increase`}))}/><p className="v2-note">All bars use a $0–$1,600,000 scale. Traffic stops growing after the nine-month opening ramp.</p></Panel>
        <Panel title="Operating earnings" kicker="02 / EBITDA"><div className="v2-diverging-key"><span>Loss</span><span>$0</span><span>Profit</span></div><Bars diverging max={300000} items={model.years.map(y=>({label:`Year ${y.year}`,value:y.ebitda,note:`${percent(y.margin)} of net sales`}))}/><p className="v2-note">Fixed scale: ($300,000) to $300,000. EBITDA is after store operating costs and before depreciation, interest and income tax.</p></Panel>
      </div>
      <Panel title="From sales to the bottom line" kicker="03 / Financial forecast"><FinancialTable model={model} year={year}/><p className="v2-note">Parentheses indicate costs or losses. The selected year is highlighted. EBITDA and net income are distinct from cash generated.</p></Panel>
      <Panel title="What changes with demand?" kicker={`04 / Year ${year+1} comparison`}><div className="v2-scenarios">{CASES.map(c=>{const a=FORECASTS[c].years[year];return <article key={c} className={c===scenario?'v2-active-scenario':''}><h3>{c}</h3><p>{CASE_NOTES[c]}</p><dl><div><dt>Net sales</dt><dd>{money(a.sales)}</dd></div><div><dt>EBITDA</dt><dd>{money(a.ebitda)}</dd></div><div><dt>EBITDA margin</dt><dd>{percent(a.margin)}</dd></div><div><dt>Closing cash</dt><dd>{money(a.cash)}</dd></div></dl></article>;})}</div><p className="v2-note">Scenarios share the opening ramp and cost inflation. Downside adds $96,000 initial capex; upside includes two extra paid staff-hours a day. These are sensitivities, not probability-weighted forecasts.</p></Panel>
      <Panel title="The profitability hurdle" kicker="05 / Established trade · Year 2"><div className="v2-hurdle"><div><span>10% EBITDA margin, with extra cover</span><strong>{money(threshold.targetSales)}</strong><p>Annual sales required · about {Math.ceil(threshold.targetSales/threshold.spend/360)} paid visits a day at the forecast mix and bill.</p></div><dl className="v2-stats"><div><dt>Base staffing: break-even sales</dt><dd>{money(FORECASTS.Base.years[1].breakEven)}</dd></div><div><dt>Base staffing: sales for 10% EBITDA</dt><dd>{money(FORECASTS.Base.years[1].targetSales)}</dd></div><div><dt>Alternative cost reduction at base sales</dt><dd>{money(FORECASTS.Base.years[1].sales*.1-FORECASTS.Base.years[1].ebitda)}/year</dd></div></dl></div><p className="v2-note">Required sales = fixed costs ÷ (contribution margin − target margin). Thresholds hold the selected staffing and sales mix fixed; further capacity or labour needs raise the requirement. A cost reduction of this size requires an operating redesign. It is not a saving already secured.</p></Panel>
    </>}
    {tab==='Cash & funding' && <>
      <div className="v2-section-line"><h2>The capital plan</h2><span>{scenario} case · full 36-month horizon</span></div>
      <div className="v2-capital-strip"><div><span>Selected initial equity</span><strong>{money(FUNDING)}</strong></div><div><span>Pre-opening cash use</span><strong>{money(model.openingUses)}</strong></div><div><span>Cash at first trading day</span><strong>{money(model.openingCash)}</strong></div></div>
      <Panel title="Cash through the opening and beyond" kicker="01 / Liquidity"><CashChart model={model}/></Panel>
      <div className="v2-two-col"><Panel title="Where opening capital goes" kicker="02 / Sources & uses"><table className="v2-table v2-uses"><caption>Pre-opening cash uses · {scenario} · USD</caption><tbody>{[...capital,...OPENING.slice(7)].map(v=><tr key={v.name}><th scope="row">{v.name}</th><td>{money(v.amount)}</td></tr>)}<tr className="v2-subtotal"><th scope="row">Total pre-opening cash use</th><td>{money(model.openingUses)}</td></tr></tbody></table><p className="v2-note">The $80,000 base contingency is assumed fully spent. Deposit and inventory are assets; pre-opening costs are separate from trading-year expenses. No landlord contribution, key money or debt is assumed.</p></Panel>
      <Panel title="How the raise is calculated" kicker="03 / Funding reconciliation"><dl className="v2-funding-math"><div><dt>Pre-opening uses</dt><dd>{money(model.openingUses)}</dd></div><div><dt>Cash needed after opening to preserve policy</dt><dd>{money(model.requiredFunding-model.openingUses)}</dd></div><div className="v2-total"><dt>Minimum 36-month equity</dt><dd>{money(model.requiredFunding)}</dd></div><div><dt>Selected raise</dt><dd>{money(FUNDING)}</dd></div><div><dt>Funding surplus / (shortfall)</dt><dd>{money(FUNDING-model.requiredFunding)}</dd></div></dl><p>The minimum is calculated at the lowest monthly cash-minus-reserve point across the forecast. It includes working capital, operating cash losses, maintenance capex and the applicable reserve.</p><p className="v2-note">The $1,100,000 raise is sufficient for the issued base case, with a limited cushion. It does not cover the downside case. The funding requirement is not a business valuation.</p><dl className="v2-stats"><div><dt>First reserve breach</dt><dd>{model.reserveBreach?`Month ${model.reserveBreach}`:'None in 36 months'}</dd></div><div><dt>First cash shortfall</dt><dd>{model.cashShortfall?`Month ${model.cashShortfall}`:'None in 36 months'}</dd></div></dl></Panel></div>
      <Panel title={`Year ${year+1}: profit to cash`} kicker="04 / Cash flow"><table className="v2-table v2-uses"><caption>Annual cash-flow bridge · {scenario} · USD</caption><tbody>{[['Net income',annual.netIncome],['Add back depreciation',annual.depreciation],['Working-capital movement',annual.operatingCash-annual.netIncome-annual.depreciation],['Operating cash flow',annual.operatingCash],['Maintenance capex',-annual.capex],['Free cash flow',annual.freeCashFlow],['Year-end cash',annual.cash],['Year-end reserve policy',annual.cashFloor],['Cash above / (below) reserve',annual.cashAbovePolicy]].map(([label,value],i)=><tr key={label} className={[3,5,6,8].includes(i)?'v2-subtotal':''}><th scope="row">{label}</th><td>{money(Number(value))}</td></tr>)}</tbody></table><p className="v2-note">Inventory: 21 product-cost days with a $20,000 opening-price minimum. Supplier credit: seven days; card settlement: two days. Terms are assumptions. Maintenance capex is 1% of sales. Sales tax and tips are ringfenced and remitted.</p></Panel>
    </>}
    {tab==='Operating model' && <>
      <div className="v2-section-line"><h2>The store economics</h2><span>{scenario} case · Year {year+1} cost basis</span></div>
      <Panel title="Sales begin with paid visits" kicker="01 / Demand model"><div className="v2-dayparts">{DAYPARTS.map(d=><article key={d.name}><span>{d.name}</span><strong>{count(d.visits*model.volume)}<small>visits / day</small></strong><dl><div><dt>Net bill at opening prices</dt><dd>{bill.format(d.spend)}</dd></div><div><dt>Established annual sales*</dt><dd>{money(d.visits*model.volume*d.spend*360*1.03**year)}</dd></div><div><dt>Product-cost allowance</dt><dd>{percent(d.cost)}</dd></div></dl></article>)}</div><p className="v2-note">*Year {year+1} prices at full established volume, before the opening ramp. A paid visit is a purchase occasion, not a unique person. Source personas inform spend; they do not prove demand.</p><div className="v2-ramp"><span>Opening ramp · Month 1–12</span><div aria-label="Monthly sales ramp">{model.months.slice(0,12).map(m=><div key={m.month}><span style={{height:`${m.ramp*64}px`}}/><small>{Math.round(m.ramp*100)}%</small><small>M{m.month}</small></div>)}</div></div></Panel>
      <div className="v2-two-col"><Panel title="A fully costed team" kicker="02 / Established annual payroll"><table className="v2-table v2-uses"><caption>Year {year+1} cost basis · established trade · USD</caption><tbody>{[['Scheduled hourly wages',payroll.hourly*12],['General manager',payroll.manager*12],['Leave cover & training',(payroll.leave+payroll.training)*12],['Employer FICA on wages',payroll.payrollTax*12],['UI & workers’ compensation',payroll.insurance*12],['Health, dental & vision',(payroll.health+payroll.dental)*12],['Retirement & incentive',(payroll.retirement+payroll.incentive)*12],['Core employer payroll',payroll.corePayroll*12],['Employer FICA on tips',payroll.tipTax*12],['Total at established volume',payroll.payroll*12]].map(([label,v],i)=><tr key={label} className={[7,9].includes(i)?'v2-subtotal':''}><th scope="row">{label}</th><td>{money(Number(v))}</td></tr>)}</tbody></table><p className="v2-note">13,200 hourly floor hours/year at $22.50 opening pay, plus a $95,000 GM. GM allocation: 1,560 floor and 520 admin hours. Eight enrolled staff; leave 6%; training 2%; UI/workers’ comp 3%; retirement 2%; incentive 1%. Wages rise 3%/year and health 6%.</p></Panel>
      <Panel title="The premises & running costs" kicker="03 / Fixed commitments"><dl className="v2-funding-math"><div><dt>Annual base rent</dt><dd>{money(120000*1.03**year)}</dd></div><div><dt>Additional occupancy charges</dt><dd>{money(24000*1.03**year)}</dd></div><div className="v2-total"><dt>Total occupancy</dt><dd>{money(annual.occupancy)}</dd></div></dl><table className="v2-table v2-uses"><caption>Other fixed costs · Year {year+1} · USD</caption><tbody>{FIXED_COSTS.map(([label,v])=><tr key={label}><th scope="row">{label}</th><td>{money(v*1.03**year)}</td></tr>)}<tr className="v2-subtotal"><th scope="row">Total other fixed operating costs</th><td>{money(annual.other)}</td></tr></tbody></table><p className="v2-note">Utilities and insurance are included once, outside rent. All occupancy and other fixed costs rise 3% annually; this is a planning allowance, not agreed lease escalation.</p></Panel></div>
      <Panel title="What the operating brief assumes" kicker="04 / Format & capacity"><div className="v2-brief"><div><h3>One compact flagship</h3><p>About 1,000 ground-floor sq ft in existing hospitality premises, a 40-seat design target and bought-in or assembly-led food. Seating, services and permitted use need address-specific confirmation.</p></div><div><h3>A day-to-night operation</h3><p>Customer service from 07:00–23:00 with prep and close outside that span. Coverage totals 41 staff-hours/day including GM floor time. The weekly rota must cover breaks and avoid unbudgeted overtime.</p></div><div><h3>One core revenue engine</h3><p>Coffee, daytime food, wine and sharing food only. No event, membership, off-premises wine, franchise or exit proceeds. No unpaid founder labour or second-store income is assumed.</p></div></div></Panel>
    </>}
    {tab==='Basis & sources' && <>
      <div className="v2-section-line"><h2>The basis behind the forecast</h2><span>Research checked 27 October 2026</span></div>
      <aside className="v2-verdict"><span className="v2-label">Evidence & confidence</span><h2>A complete forecast. Explicit assumptions.</h2><p>This is a pre-opening management planning forecast. Public wage, rent and construction evidence helps set cost allowances; it does not establish signed prices or address-specific demand. The 180-visit base case remains a hypothesis to validate.</p></aside>
      <Panel title="The calculation rules" kicker="01 / Method"><div className="v2-brief"><div><h3>Revenue & gross profit</h3><p>Sales = paid visits × realised net spend × trading days × opening ramp. Product costs are calculated by daypart. Annual prices and product-purchase costs both rise 3%, keeping the forecast gross margin at {percent(FORECASTS.Base.years[0].grossMargin)}.</p></div><div><h3>Earnings & tax</h3><p>EBITDA deducts all store operating costs. EBIT then deducts depreciation. A 30% planning tax allowance applies to each positive monthly EBIT, with no loss offsets or credits. This is not an entity-specific effective tax rate.</p></div><div><h3>Assets & cash</h3><p>Initial capex is split 70% over 120 months and 30% over 60 months. Maintenance capex uses 60 months and a half-month on additions. Operating cash = net income + depreciation − working-capital increase; free cash flow deducts capex.</p></div><div><h3>Period & funding</h3><p>36 trading months, 30 days/month, neutral calendar seasonality and no set opening date. Funding is all equity; no interest, distributions or redemptions. No central-office salaries or external fundraising costs are included.</p></div></div></Panel>
      <Panel title="Research anchors" kicker="02 / External evidence"><div className="v2-sources">{sources.map(([label,name,url,note])=><article key={label}><span className="v2-label">{label}</span><h3><a href={url} target="_blank" rel="noreferrer">{name}</a></h3><p>{note}</p></article>)}</div></Panel>
      <Panel title="What needs evidence next" kicker="03 / Investment diligence"><ol className="v2-diligence"><li><strong>Demand.</strong> Relevant footfall and competitor transaction counts, pop-up receipts and realised checks by daypart.</li><li><strong>Lease.</strong> Exact unit, usable floor area, seating, base rent, charges, escalation, deposit, use and landlord works.</li><li><strong>Construction.</strong> Measured layout, building-service condition, equipment schedule and three comparable site-specific bids. The $400,000 works allowance assumes existing restaurant infrastructure.</li><li><strong>People & suppliers.</strong> A costed weekly rota, role-specific offers, benefit and insurance quotes, recipe cost sheets and supplier payment terms.</li><li><strong>Entity & tax.</strong> Confirm the legal structure, company-level costs and actual federal, state and city tax treatment.</li></ol><p className="v2-note">The supplied Plaisir Bible, target-customer, promotions, USP and expansion documents inform the concept and assumptions. Proposed programmes and promotional uplifts are not treated as proven sales. This v2 forecast supersedes earlier financial illustrations for this dashboard.</p></Panel>
    </>}
    </section>
    <footer className="v2-report-footer"><div><span className="v2-label">Take the full model with you</span><h2>The detail, in your hands.</h2><p>Six-page investor report and an editable 36-month Excel forecast. Both downloads contain the issued scenarios; website selections do not alter the files.</p></div><Downloads/></footer>
  </div>;
}
