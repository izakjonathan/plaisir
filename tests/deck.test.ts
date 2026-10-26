import test from "node:test";
import assert from "node:assert/strict";
import {
  operating,
  sensitivity,
  scenarios,
  reconcileScenario,
  BASE,
  ALLOCATIONS,
} from "../lib/deck.ts";
test("dashboard headline figures agree with deck pages 22 and 24", () => {
  assert.equal(operating.grossProfit, 583100);
  assert.equal(operating.ebitda, 62000);
  assert.deepEqual(
    sensitivity.map((s) => Math.round(s.revenue)),
    [868500, 801692, 744429, 694800],
  );
  assert.equal(Math.round(operating.breakEven / 12), 62036);
  assert.equal(Math.round(BASE.revenue - operating.breakEven), 88571);
  assert.equal(BASE.revenue * 0.6 - operating.fixed, -21300);
});
test("both proposed raise allocations agree with deck page 48", () => {
  assert.deepEqual(
    ALLOCATIONS.map((a) => a.share * 500000),
    [275000, 110000, 65000, 50000],
  );
  assert.deepEqual(
    ALLOCATIONS.map((a) => a.share * 1000000),
    [550000, 220000, 130000, 100000],
  );
});
test("all nine scenario reconciliations agree with deck page 47", () => {
  assert.deepEqual(
    scenarios.flatMap((s) => [0, 1, 2].map((y) => reconcileScenario(s, y))),
    [
      { otherOpex: 32, belowEbitda: 0 },
      { otherOpex: 42, belowEbitda: 0 },
      { otherOpex: 32, belowEbitda: 0 },
      { otherOpex: 37, belowEbitda: 38 },
      { otherOpex: 44, belowEbitda: 45 },
      { otherOpex: 56, belowEbitda: 58 },
      { otherOpex: 48, belowEbitda: 55 },
      { otherOpex: 50, belowEbitda: 78 },
      { otherOpex: 54, belowEbitda: 100 },
    ],
  );
});
