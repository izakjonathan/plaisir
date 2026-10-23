export type Model = {
  revenue: number;
  margin: number;
  labour: number;
  occupancy: number;
  other: number;
};
export const BASE: Model = {
  revenue: 833000,
  margin: 70,
  labour: 268000,
  occupancy: 216000,
  other: 37100,
};
export const PRESETS: Record<string, Model> = {
  "Deck illustration": BASE,
  "Downside test": {
    revenue: 666400,
    margin: 65,
    labour: 294800,
    occupancy: 216000,
    other: 40810,
  },
  "Higher sales test": {
    revenue: 999600,
    margin: 72,
    labour: 294800,
    occupancy: 216000,
    other: 40810,
  },
};
export function calculate(model: Model) {
  const grossProfit = (model.revenue * model.margin) / 100;
  const cogs = model.revenue - grossProfit;
  const fixed = model.labour + model.occupancy + model.other;
  const ebitda = grossProfit - fixed;
  const breakEven = model.margin > 0 ? fixed / (model.margin / 100) : Infinity;
  return {
    grossProfit,
    cogs,
    fixed,
    ebitda,
    breakEven,
    ebitdaMargin: model.revenue > 0 ? (ebitda / model.revenue) * 100 : 0,
  };
}
export const ALLOCATIONS = [
  { name: "Fit-out", share: 0.55 },
  { name: "Equipment & technology", share: 0.22 },
  { name: "Licensing & legal", share: 0.13 },
  { name: "Working capital", share: 0.1 },
];
export type CashOptions = {
  funding: number;
  delay: number;
  openingSales: number;
  rampMonths: number;
};
export function cashProjection(model: Model, options: CashOptions) {
  const { fixed } = calculate(model);
  let balance = options.funding * 0.1;
  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const tradingMonth = month - options.delay;
    const progress =
      options.rampMonths <= 1
        ? 1
        : Math.min(
            1,
            Math.max(0, (tradingMonth - 1) / (options.rampMonths - 1)),
          );
    const salesFactor =
      tradingMonth <= 0
        ? 0
        : options.openingSales / 100 +
          (1 - options.openingSales / 100) * progress;
    const revenue = (model.revenue / 12) * salesFactor;
    const operatingChange = (revenue * model.margin) / 100 - fixed / 12;
    balance += operatingChange;
    return { month, revenue, operatingChange, balance, salesFactor };
  });
}
export function demandRevenue(
  transactions: number,
  ticket: number,
  days: number,
) {
  return transactions * ticket * days;
}
