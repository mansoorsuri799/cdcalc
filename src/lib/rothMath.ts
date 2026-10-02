import { IRA_LIMITS_2026 } from "@/lib/siteConfig";

export type FilingStatus = "single" | "marriedJoint" | "marriedSeparate";

export type CalculatorInputs = {
  currentAge: number;
  retirementAge: number;
  currentBalance: number;
  annualContribution: number;
  expectedReturn: number;
  marginalTaxRate: number;
  filingStatus: FilingStatus;
  magi: number;
  maximize: boolean;
};

export type YearRow = {
  age: number;
  contribution: number;
  principalStart: number;
  principalEnd: number;
  rothStart: number;
  rothEnd: number;
  taxableStart: number;
  taxableEnd: number;
};

export type CalculatorResult = {
  years: number;
  annualContribution: number;
  maxAllowed: number;
  eligibilityNote: string;
  contributionReduced: boolean;
  totalContributions: number;
  totalTaxEstimate: number;
  rothBalance: number;
  taxableBalance: number;
  rothGrowth: number;
  taxableGrowth: number;
  taxAdvantage: number;
  schedule: YearRow[];
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function maxContributionForAge(age: number): number {
  return age >= 50 ? IRA_LIMITS_2026.age50Plus : IRA_LIMITS_2026.under50;
}

/** IRS-style linear phase-out for Roth IRA direct contributions. */
export function allowedRothContribution(
  age: number,
  filingStatus: FilingStatus,
  magi: number
): { maxAllowed: number; note: string; reduced: boolean } {
  const base = maxContributionForAge(age);
  const band =
    filingStatus === "marriedJoint"
      ? IRA_LIMITS_2026.marriedJoint
      : filingStatus === "marriedSeparate"
        ? IRA_LIMITS_2026.marriedSeparate
        : IRA_LIMITS_2026.single;

  if (magi < band.fullBelow) {
    return {
      maxAllowed: base,
      note: "You appear eligible for the full 2026 Roth IRA contribution.",
      reduced: false,
    };
  }

  if (magi >= band.phaseOutEnd) {
    return {
      maxAllowed: 0,
      note: "Based on MAGI, direct Roth IRA contributions may be $0 for 2026. Consider a backdoor Roth strategy with a tax professional.",
      reduced: true,
    };
  }

  const range = band.phaseOutEnd - band.fullBelow;
  const over = magi - band.fullBelow;
  const reduced = Math.floor((base * (1 - over / range)) / 10) * 10;
  return {
    maxAllowed: Math.max(0, reduced),
    note: "Your MAGI falls in the 2026 phase-out range, so the allowed contribution is reduced.",
    reduced: true,
  };
}

export function projectRothGrowth(inputs: CalculatorInputs): CalculatorResult {
  const years = Math.max(0, Math.floor(inputs.retirementAge - inputs.currentAge));
  const eligibility = allowedRothContribution(
    inputs.currentAge,
    inputs.filingStatus,
    inputs.magi
  );

  let annualContribution = Math.max(0, inputs.annualContribution);
  if (inputs.maximize) {
    annualContribution = eligibility.maxAllowed;
  } else if (eligibility.maxAllowed === 0) {
    annualContribution = 0;
  } else {
    annualContribution = Math.min(annualContribution, eligibility.maxAllowed);
  }

  const r = clamp(inputs.expectedReturn, 0, 20) / 100;
  const tax = clamp(inputs.marginalTaxRate, 0, 50) / 100;
  const taxableRate = r * (1 - tax);

  let principal = Math.max(0, inputs.currentBalance);
  let roth = Math.max(0, inputs.currentBalance);
  let taxable = Math.max(0, inputs.currentBalance);
  const schedule: YearRow[] = [];

  for (let i = 0; i < years; i++) {
    const age = inputs.currentAge + i;
    let contrib = annualContribution;
    if (inputs.maximize) {
      contrib = allowedRothContribution(age, inputs.filingStatus, inputs.magi).maxAllowed;
    }

    const principalStart = principal;
    const rothStart = roth;
    const taxableStart = taxable;

    principal = principalStart + contrib;
    roth = rothStart * (1 + r) + contrib;
    taxable = taxableStart * (1 + taxableRate) + contrib;

    schedule.push({
      age,
      contribution: contrib,
      principalStart,
      principalEnd: principal,
      rothStart,
      rothEnd: roth,
      taxableStart,
      taxableEnd: taxable,
    });
  }

  const totalContributions = principal;
  const taxableGrowth = taxable - totalContributions;
  const rothGrowth = roth - totalContributions;
  const impliedTax = Math.max(0, rothGrowth - taxableGrowth);

  return {
    years,
    annualContribution,
    maxAllowed: eligibility.maxAllowed,
    eligibilityNote: eligibility.note,
    contributionReduced: eligibility.reduced,
    totalContributions,
    totalTaxEstimate: impliedTax,
    rothBalance: roth,
    taxableBalance: taxable,
    rothGrowth,
    taxableGrowth,
    taxAdvantage: roth - taxable,
    schedule,
  };
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatCompactUsd(value: number): string {
  if (!Number.isFinite(value)) return "$0";
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}M`;
  if (value >= 1_000) return `$${Math.round(value / 1000)}K`;
  return formatUsd(value);
}
