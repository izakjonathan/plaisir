import { BASE, calculate, ALLOCATIONS } from "./finance.ts";
export { BASE, ALLOCATIONS };
export const operating = calculate(BASE);
export const sensitivity = [60, 65, 70, 75].map((margin) => ({
  margin,
  revenue: operating.fixed / (margin / 100),
}));
export const scenarioYears = [2026, 2027, 2028] as const;
// Source rounded projections, USD thousands. Preserve their supplied gross margins.
export const scenarios = [
  {
    name: "Downside",
    revenue: [541, 606, 669],
    grossProfit: [379, 425, 468],
    ebitda: [-137, -104, -54],
    netProfit: [-137, -104, -54],
  },
  {
    name: "Base",
    revenue: [833, 933, 1030],
    grossProfit: [583, 653, 720],
    ebitda: [62, 122, 174],
    netProfit: [24, 77, 116],
  },
  {
    name: "Upside",
    revenue: [1040, 1170, 1280],
    grossProfit: [728, 817, 900],
    ebitda: [196, 280, 356],
    netProfit: [141, 202, 256],
  },
];
export function reconcileScenario(s: (typeof scenarios)[number], year: number) {
  return {
    otherOpex:
      s.grossProfit[year] - 268 - [216, 219, 222][year] - s.ebitda[year],
    belowEbitda: s.ebitda[year] - s.netProfit[year],
  };
}
