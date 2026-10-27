import test from 'node:test';
import assert from 'node:assert/strict';
import { FORECASTS, OPENING, FUNDING, CASES } from '../lib/investor-forecast.ts';
const close=(actual:number,expected:number)=>assert.ok(Math.abs(actual-expected)<.01,`${actual} differs from ${expected}`);
// Independent expected results from the issued, recalculated Excel workbook.
test('all annual forecast outputs reconcile with the issued investor workbook',()=>{
  const expected={
    Base:{sales:[1003995,1234764,1271806.92],ebitda:[-132879.07966625,-13454.493797,-15601.63261091],cash:[278911.97033375,252504.76653675,223561.84262584],netIncome:[-196175.26591625,-79097.247797,-83750.95753091],funding:1078613.51660691},
    Downside:{sales:[803196,987811.2,1017445.536],ebitda:[-258013.381733,-167403.4965776,-174221.593474928],cash:[60829.458267,-117025.9063106,-302012.923825528],netIncome:[-333610.330733,-244877.6997776,-253701.053410928],funding:1604188.283058278},
    Upside:{sales:[1204794,1481716.8,1526168.304],ebitda:[-27628.9815995,120013.7788636,121923.176229508],cash:[372511.08767565,460864.87232017,550991.303092025],netIncome:[-96713.59582435,37605.73184452,36836.790427856],funding:953663.842258},
  };
  for(const c of CASES){const model=FORECASTS[c],e=expected[c];close(model.requiredFunding,e.funding);model.years.forEach((y,i)=>{close(y.sales,e.sales[i]);close(y.ebitda,e.ebitda[i]);close(y.cash,e.cash[i]);close(y.netIncome,e.netIncome[i]);});}
});
test('opening uses, spent contingency and liquidity shortfalls are explicit',()=>{
  close(OPENING.reduce((s,v)=>s+v.amount,0),678000);close(FORECASTS.Base.openingCash,422000);
  close(FORECASTS.Downside.openingUses-FORECASTS.Base.openingUses,96000);
  assert.equal(FORECASTS.Downside.reserveBreach,5);assert.equal(FORECASTS.Downside.cashShortfall,17);
  assert.equal(FORECASTS.Base.cashShortfall,undefined);
  assert.ok(FORECASTS.Base.requiredFunding<FUNDING);assert.ok(FORECASTS.Downside.requiredFunding>FUNDING);
});
test('cash bridges and accounting identities hold each month in each case',()=>{
  for(const c of CASES){const f=FORECASTS[c];let cash=f.openingCash,retained=-148000,capex=f.initialCapex,depreciation=0;
    for(const m of f.months){close(m.grossProfit,m.sales-m.cogs);close(m.ebitda,m.grossProfit-m.payroll-m.occupancy-m.other-m.processing-m.marketing-m.consumables);
      close(m.freeCashFlow,m.netIncome+m.depreciation-m.workingCapitalChange-m.capex);cash+=m.freeCashFlow;close(m.cash,cash);
      capex+=m.capex;depreciation+=m.depreciation;retained+=m.netIncome;
      close(m.cash+m.receivables+m.inventory+capex-depreciation+30000,m.payables+FUNDING+retained);
      close(m.cashFloor,m.fixed*3);assert.ok(m.tax>=0);close(m.tax,Math.max(0,m.ebit)*.3);
    }
  }
});
test('profitability thresholds reconcile without assuming further traffic growth',()=>{
  const m=FORECASTS.Base.months[23],a=FORECASTS.Base.years[1];
  close(a.breakEven*m.contribution-m.fixed*12,0);
  close(a.targetSales*m.contribution-m.fixed*12,a.targetSales*.1);
  close(FORECASTS.Base.years[1].visits,64800);close(FORECASTS.Base.years[2].visits,64800);
  assert.ok(FORECASTS.Upside.months[23].corePayroll>m.corePayroll);
});

test('investor ratios and profit-to-cash bridge use the issued forecast consistently', async()=>{
  const { investorMetrics } = await import('../lib/investor-forecast.ts');
  for(const c of CASES) for(const year of FORECASTS[c].years) {
    const m=investorMetrics(year);
    close(year.ebitda-year.tax+m.workingCapitalCash-year.capex,year.freeCashFlow);
    close(m.primeCostRatio,m.payrollRatio+year.cogs/year.sales);
    close(m.averageSpend*year.visits,year.sales);
  }
  const m=investorMetrics(FORECASTS.Base.years[1]);
  close(m.paidVisitsPerDay,180);close(m.payrollRatio*100,46.1760670298);
  close(m.occupancyRatio*100,12.012012012);close(m.primeCostRatio*100,76.5814724352);
  close(m.costGapForTenPercent,136930.893797);
});
