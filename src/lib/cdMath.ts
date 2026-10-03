export type CompoundFrequency =
  | "annually"
  | "semiannually"
  | "quarterly"
  | "monthly"
  | "daily"
  | "continuously";

export type CalculatorInputs = {
  initialDeposit: number;
  interestRate: number;
  compound: CompoundFrequency;
  years: number;
  months: number;
  marginalTaxRate: number;
};

export type PeriodRow = {
  period: number;
  label: string;
  deposit: number;
  interest: number;
  endingBalance: number;
};

export type CalculatorResult = {
  endBalance: number;
  totalInterest: number;
  afterTaxInterest: number;
  afterTaxBalance: number;
  totalMonths: number;
  effectiveApy: number;
  scheduleMonthly: PeriodRow[];
  scheduleAnnual: PeriodRow[];
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function compoundPeriodsPerYear(compound: CompoundFrequency): number | null {
  switch (compound) {
    case "annually":
      return 1;
    case "semiannually":
      return 2;
    case "quarterly":
      return 4;
    case "monthly":
      return 12;
    case "daily":
      return 365;
    case "continuously":
      return null;
  }
}

/** Convert a stated APR (nominal) + compounding frequency into APY. */
export function aprToApy(aprPercent: number, compound: CompoundFrequency): number {
  const r = clamp(aprPercent, 0, 100) / 100;
  if (compound === "continuously") return (Math.exp(r) - 1) * 100;
  if (compound === "annually") return aprPercent;
  const n = compoundPeriodsPerYear(compound) ?? 1;
  return (Math.pow(1 + r / n, n) - 1) * 100;
}

/**
 * Closed-form CD balance after `years` (can be fractional).
 * - annually: rate treated as APY (Bankrate / calculator.net annual APY mode)
 * - other discrete: rate treated as APR compounded n times/year
 * - continuously: P * e^(rt)
 */
export function closedFormBalance(
  principal: number,
  rateDecimal: number,
  years: number,
  compound: CompoundFrequency
): number {
  if (years <= 0 || principal <= 0) return Math.max(0, principal);

  if (compound === "continuously") {
    return principal * Math.exp(rateDecimal * years);
  }

  if (compound === "annually") {
    const fullYears = Math.floor(years + 1e-12);
    const frac = years - fullYears;
    let bal = principal * Math.pow(1 + rateDecimal, fullYears);
    if (frac > 1e-12) bal *= 1 + rateDecimal * frac;
    return bal;
  }

  const n = compoundPeriodsPerYear(compound) ?? 12;
  const periods = years * n;
  const fullPeriods = Math.floor(periods + 1e-12);
  const frac = periods - fullPeriods;
  let bal = principal * Math.pow(1 + rateDecimal / n, fullPeriods);
  if (frac > 1e-12) bal *= 1 + (rateDecimal / n) * frac;
  return bal;
}

export function projectCdGrowth(inputs: CalculatorInputs): CalculatorResult {
  const principal = Math.max(0, inputs.initialDeposit);
  const rate = clamp(inputs.interestRate, 0, 100) / 100;
  const tax = clamp(inputs.marginalTaxRate, 0, 50) / 100;
  const totalMonths = Math.max(
    0,
    Math.floor(Math.max(0, inputs.years)) * 12 + Math.floor(Math.max(0, inputs.months))
  );
  const years = totalMonths / 12;

  const endBalance = closedFormBalance(principal, rate, years, inputs.compound);
  const totalInterest = endBalance - principal;
  const afterTaxInterest = totalInterest * (1 - tax);
  const afterTaxBalance = principal + afterTaxInterest;

  const scheduleMonthly: PeriodRow[] = [];
  let prev = principal;
  for (let m = 1; m <= totalMonths; m++) {
    const bal = closedFormBalance(principal, rate, m / 12, inputs.compound);
    scheduleMonthly.push({
      period: m,
      label: `Month ${m}`,
      deposit: m === 1 ? principal : 0,
      interest: bal - prev,
      endingBalance: bal,
    });
    prev = bal;
  }

  const scheduleAnnual: PeriodRow[] = [];
  const fullYears = Math.floor(totalMonths / 12);
  prev = principal;
  for (let y = 1; y <= fullYears; y++) {
    const bal = closedFormBalance(principal, rate, y, inputs.compound);
    scheduleAnnual.push({
      period: y,
      label: `Year ${y}`,
      deposit: y === 1 ? principal : 0,
      interest: bal - prev,
      endingBalance: bal,
    });
    prev = bal;
  }
  if (totalMonths % 12 !== 0) {
    scheduleAnnual.push({
      period: fullYears + 1,
      label: `Year ${fullYears + 1} (partial)`,
      deposit: fullYears === 0 ? principal : 0,
      interest: endBalance - prev,
      endingBalance: endBalance,
    });
  }

  return {
    endBalance,
    totalInterest,
    afterTaxInterest,
    afterTaxBalance,
    totalMonths,
    effectiveApy: aprToApy(inputs.interestRate, inputs.compound),
    scheduleMonthly,
    scheduleAnnual,
  };
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatCompactUsd(value: number): string {
  if (!Number.isFinite(value)) return "$0";
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}M`;
  if (value >= 1_000) return `$${Math.round(value / 1000)}K`;
  return formatUsd(value);
}

export function formatPercent(value: number, digits = 2): string {
  return `${(Number.isFinite(value) ? value : 0).toFixed(digits)}%`;
}
