/** Issued 27 October 2026. Mirrors the reviewed 36-month Excel forecast.
 * USD, net of sales tax/tips; trading months, not calendar dates. */
export const CASES = ['Base', 'Downside', 'Upside'] as const;
export type ForecastCase = typeof CASES[number];
export const FUNDING = 1_100_000;
export const RAMP = [.5, .6, .7, .75, .8, .85, .9, .95, 1, 1, 1, 1];
export const DAYPARTS = [
  { name: 'Coffee & breakfast', visits: 100, spend: 9, cost: .28 },
  { name: 'Lunch & daytime food', visits: 35, spend: 18, cost: .35 },
  { name: 'Wine & sharing food', visits: 45, spend: 40, cost: .30 },
] as const;
export const OPENING = [
  { name: 'Building works & services', amount: 200000 },
  { name: 'Fixed bar & joinery', amount: 40000 },
  { name: 'Equipment, POS & smallwares', amount: 90000 },
  { name: 'Furniture & fittings', amount: 35000 },
  { name: 'Tax & freight allowance', amount: 15000 },
  { name: 'Specialist commissioning', amount: 20000 },
  { name: 'Construction contingency', amount: 80000 },
  { name: 'Professional, legal & permits', amount: 50000 },
  { name: 'Pre-opening payroll', amount: 40000 },
  { name: 'Launch marketing', amount: 10000 },
  { name: 'Four months pre-opening occupancy', amount: 48000 },
  { name: 'Refundable deposits', amount: 30000 },
  { name: 'Opening inventory', amount: 20000 },
];
export const FIXED_COSTS = [
  ['Utilities', 18000], ['Insurance', 12000], ['Software', 6000],
  ['Accounting & legal', 6000], ['Repairs', 9000], ['Waste, pest & laundry', 12000],
  ['Music & annual permits', 3000], ['Miscellaneous', 6000],
] as const;
export const CASE_NOTES: Record<ForecastCase, string> = {
  Base: '180 paid visits a day at established trade. No further traffic growth after the opening ramp.',
  Downside: '20% fewer visits throughout and 20% more initial capex, above the already-contingent budget. Staffing is retained.',
  Upside: '20% more visits throughout, with two additional paid staff-hours a day and the same employer-cost calculation.',
};
export function buildForecast(scenario: ForecastCase) {
  const volume = scenario === 'Downside' ? .8 : scenario === 'Upside' ? 1.2 : 1;
  const initialCapex = 480000 * (scenario === 'Downside' ? 1.2 : 1);
  const openingUses = initialCapex + 198000;
  const openingCash = FUNDING - openingUses;
  let cash = openingCash, previousWorkingCapital = 20000, maintenanceTotal = 0;
  const months = Array.from({ length: 36 }, (_, i) => {
    const year = Math.floor(i / 12), price = 1.03 ** year, healthIndex = 1.06 ** year;
    const ramp = i < 12 ? RAMP[i] : 1;
    const dayparts = DAYPARTS.map(d => ({ ...d, visits: d.visits * volume * 30 * ramp,
      sales: d.visits * volume * 30 * ramp * d.spend * price,
      cogs: d.visits * volume * 30 * ramp * d.spend * d.cost * price }));
    const visits = dayparts.reduce((s,d) => s + d.visits, 0);
    const sales = dayparts.reduce((s,d) => s + d.sales, 0);
    const cogs = dayparts.reduce((s,d) => s + d.cogs, 0);
    const hourly = (13200 / 12 + (scenario === 'Upside' ? 2 * 30 : 0)) * 22.5 * price;
    const manager = 95000 * price / 12, leave = hourly * .06, training = (hourly + manager) * .02;
    const grossPay = hourly + manager + leave + training;
    const payrollTax = grossPay * .0765, insurance = grossPay * .03;
    const health = 8 * 7885 * healthIndex / 12, dental = 8 * 600 * price / 12;
    const retirement = grossPay * .02, incentive = grossPay * .01;
    const corePayroll = grossPay + payrollTax + insurance + health + dental + retirement + incentive;
    const tipTax = sales * .1 * .0765, payroll = corePayroll + tipTax;
    const occupancy = 144000 * price / 12, other = 72000 * price / 12;
    const processing = .9 * (.026 * sales * (1 + .08875 + .1) + .15 * visits);
    const marketing = sales * .02, consumables = sales * .01;
    const grossProfit = sales - cogs;
    const ebitda = grossProfit - payroll - occupancy - other - processing - marketing - consumables;
    const capex = sales * .01;
    const depreciation = initialCapex * (.7 / 120 + .3 / 60) + (maintenanceTotal + capex / 2) / 60;
    maintenanceTotal += capex;
    const ebit = ebitda - depreciation, tax = Math.max(0, ebit) * .3, netIncome = ebit - tax;
    const receivables = sales * .9 * 2 / 30, inventory = Math.max(20000 * price, cogs / 30 * 21), payables = cogs / 30 * 7;
    const workingCapital = receivables + inventory - payables;
    const workingCapitalChange = workingCapital - previousWorkingCapital;
    previousWorkingCapital = workingCapital;
    const operatingCash = netIncome + depreciation - workingCapitalChange, freeCashFlow = operatingCash - capex;
    cash += freeCashFlow;
    const fixed = corePayroll + occupancy + other;
    const contribution = 1 - (cogs + tipTax + processing + marketing + consumables) / sales;
    const cashFloor = fixed * 3;
    return { month: i+1, year: year+1, ramp, dayparts, visits, sales, cogs, grossProfit, grossPay, hourly, manager, leave, training,
      payrollTax, insurance, health, dental, retirement, incentive, corePayroll, tipTax, payroll, occupancy, other, processing,
      marketing, consumables, ebitda, capex, depreciation, ebit, tax, netIncome, receivables, inventory, payables,
      workingCapital, workingCapitalChange, operatingCash, freeCashFlow, cash, fixed, contribution, cashFloor,
      cashAbovePolicy: cash - cashFloor, breakEven: fixed / contribution };
  });
  const years = [0,1,2].map(y => {
    const period = months.slice(y*12,y*12+12), last = period[11];
    const sum = (key: 'sales'|'visits'|'cogs'|'grossProfit'|'payroll'|'occupancy'|'other'|'processing'|'marketing'|'consumables'|'ebitda'|'depreciation'|'ebit'|'tax'|'netIncome'|'operatingCash'|'capex'|'freeCashFlow') => period.reduce((s,m)=>s+m[key],0);
    const sales = sum('sales'), ebitda = sum('ebitda'), visits = sum('visits');
    return { year:y+1, sales, visits, spend:sales/visits, cogs:sum('cogs'), grossProfit:sum('grossProfit'),
      grossMargin:sum('grossProfit')/sales, payroll:sum('payroll'), occupancy:sum('occupancy'), other:sum('other'),
      processing:sum('processing'), marketing:sum('marketing'), consumables:sum('consumables'), ebitda, margin:ebitda/sales,
      depreciation:sum('depreciation'), ebit:sum('ebit'), tax:sum('tax'), netIncome:sum('netIncome'), operatingCash:sum('operatingCash'),
      capex:sum('capex'), freeCashFlow:sum('freeCashFlow'), cash:last.cash, cashFloor:last.cashFloor,
      cashAbovePolicy:last.cashAbovePolicy, lowestCash:Math.min(...period.map(m=>m.cash)), breakEven:last.breakEven * 12,
      targetSales:last.fixed/(last.contribution-.1)*12 };
  });
  return { scenario, volume, initialCapex, openingUses, openingCash, months, years,
    requiredFunding: FUNDING - Math.min(...months.map(m=>m.cashAbovePolicy)),
    reserveBreach: months.find(m=>m.cashAbovePolicy<0)?.month,
    cashShortfall: months.find(m=>m.cash<0)?.month };
}
export const FORECASTS = Object.fromEntries(CASES.map(c=>[c,buildForecast(c)])) as Record<ForecastCase, ReturnType<typeof buildForecast>>;

/** Investor-facing ratios and the cash bridge; no change to forecast assumptions. */
export function investorMetrics(annual: ReturnType<typeof buildForecast>['years'][number]) {
  return {
    paidVisitsPerDay: annual.visits / 360,
    averageSpend: annual.sales / annual.visits,
    payrollRatio: annual.payroll / annual.sales,
    occupancyRatio: annual.occupancy / annual.sales,
    primeCostRatio: (annual.cogs + annual.payroll) / annual.sales,
    // EBITDA less cash tax, working-capital investment and maintenance capex = FCF.
    workingCapitalCash: annual.operatingCash - annual.ebitda + annual.tax,
    costGapForTenPercent: Math.max(0, annual.sales * .1 - annual.ebitda),
  };
}
