import test from "node:test";
import assert from "node:assert/strict";
import {
  BASE,
  PRESETS,
  ALLOCATIONS,
  calculate,
  cashProjection,
  demandRevenue,
} from "../lib/finance.ts";
test("deck P&L reconciles to $62,000 EBITDA and $744,429 break-even", () => {
  const r = calculate(BASE);
  assert.equal(r.cogs, 249900);
  assert.equal(r.grossProfit, 583100);
  assert.equal(r.fixed, 521100);
  assert.equal(r.ebitda, 62000);
  assert.equal(Math.round(r.breakEven), 744429);
});
test("variable goods costs scale with sales while fixed costs remain explicit", () => {
  const r = calculate({ ...BASE, revenue: 1666000 });
  assert.equal(r.cogs, 499800);
  assert.equal(r.fixed, 521100);
  assert.equal(calculate({ ...BASE, revenue: 0 }).ebitda, -521100);
});
test("break-even sensitivity matches the source and produces zero EBITDA", () => {
  for (const [margin, expected] of [
    [60, 868500],
    [65, 801692],
    [70, 744429],
    [75, 694800],
  ]) {
    const r = calculate({ ...BASE, margin });
    assert.equal(Math.round(r.breakEven), expected);
    assert.ok(
      Math.abs(calculate({ ...BASE, margin, revenue: r.breakEven }).ebitda) <
        0.00001,
    );
  }
});
test("funding fully allocates and cash proxy reconciles without ramp or delay", () => {
  assert.equal(
    ALLOCATIONS.reduce((s, a) => s + a.share, 0),
    1,
  );
  const cash = cashProjection(BASE, {
    funding: 750000,
    delay: 0,
    openingSales: 100,
    rampMonths: 1,
  });
  assert.ok(Math.abs(cash[11].balance - (75000 + 62000)) < 0.00001);
});
test("delay burns full fixed cost and cash shortage is visible", () => {
  const cash = cashProjection(BASE, {
    funding: 500000,
    delay: 2,
    openingSales: 60,
    rampMonths: 6,
  });
  assert.equal(cash[0].revenue, 0);
  assert.ok(Math.abs(cash[0].balance - (50000 - 521100 / 12)) < 0.00001);
  assert.ok(cash[1].balance < 0);
  assert.equal(cash[2].salesFactor, 0.6);
  assert.equal(cash[7].salesFactor, 1);
  assert.ok(calculate(PRESETS["Downside test"]).ebitda < 0);
});
test("demand inconsistency is reproduced without mixing bases", () => {
  assert.equal(demandRevenue(220, 25, 351), 1930500);
  assert.ok(
    Math.abs(demandRevenue(220, 833000 / 220 / 351, 351) - 833000) < 0.00001,
  );
});
