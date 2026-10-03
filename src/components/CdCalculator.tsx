"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import {
  CalculatorInputs,
  CalculatorResult,
  CompoundFrequency,
  PeriodRow,
  formatCompactUsd,
  formatPercent,
  formatUsd,
  projectCdGrowth,
} from "@/lib/cdMath";

const defaults: CalculatorInputs = {
  initialDeposit: 10000,
  interestRate: 4.5,
  compound: "annually",
  years: 3,
  months: 0,
  marginalTaxRate: 22,
};

const inputClass =
  "w-full min-w-0 rounded-md border border-white/10 bg-[#080b10] px-2.5 py-2.5 text-right text-[15px] text-white outline-none transition focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 md:py-3";

function Row({
  label,
  htmlFor,
  children,
  hint,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.95fr)] items-center gap-3 border-b border-white/5 py-2.5 last:border-b-0 md:gap-5 md:py-3.5">
      <label htmlFor={htmlFor} className="text-[13px] leading-snug text-zinc-300 md:text-sm">
        {label}
        {hint ? (
          <span className="mt-0.5 block text-[11px] text-zinc-600 md:text-xs">{hint}</span>
        ) : null}
      </label>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function AccumulationChart({ schedule }: { schedule: PeriodRow[] }) {
  if (schedule.length === 0) {
    return (
      <div className="flex h-56 items-center justify-center rounded-lg border border-dashed border-white/10 text-sm text-zinc-500">
        Click Calculate to see the accumulation graph
      </div>
    );
  }

  const width = 560;
  const height = 250;
  const pad = { top: 36, right: 16, bottom: 36, left: 52 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const principal = schedule[0]?.deposit ?? 0;
  const maxY = Math.max(...schedule.map((r) => r.endingBalance), principal, 1);
  const niceMax = Math.ceil(maxY / 2500) * 2500 || 2500;

  const xAt = (i: number) => pad.left + (i / Math.max(schedule.length - 1, 1)) * plotW;
  const yAt = (v: number) => pad.top + plotH - (v / niceMax) * plotH;

  const balancePath = schedule
    .map((row, i) => `${i === 0 ? "M" : "L"} ${xAt(i).toFixed(2)} ${yAt(row.endingBalance).toFixed(2)}`)
    .join(" ");
  const principalPath = `M ${xAt(0).toFixed(2)} ${yAt(principal).toFixed(2)} L ${xAt(schedule.length - 1).toFixed(2)} ${yAt(principal).toFixed(2)}`;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => niceMax * t);
  const xLabels = [0, 0.33, 0.66, 1].map((t) =>
    Math.round(1 + t * (schedule.length - 1))
  );

  return (
    <div className="w-full overflow-hidden rounded-lg border border-white/10 bg-[#080b10] p-2 md:p-3">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="CD balance accumulation graph">
        <text x={width / 2} y={18} textAnchor="middle" className="fill-zinc-100" style={{ fontSize: 14, fontWeight: 700 }}>
          Balance Accumulation Graph
        </text>

        {yTicks.map((tick) => {
          const y = yAt(tick);
          return (
            <g key={tick}>
              <line x1={pad.left} y1={y} x2={width - pad.right} y2={y} stroke="#2a3140" strokeWidth="1" />
              <text x={pad.left - 8} y={y + 4} textAnchor="end" fill="#8b93a7" style={{ fontSize: 11 }}>
                {formatCompactUsd(tick)}
              </text>
            </g>
          );
        })}

        {xLabels.map((month) => {
          const i = Math.min(schedule.length - 1, Math.max(0, month - 1));
          const x = xAt(i);
          return (
            <g key={`m-${month}`}>
              <line x1={x} y1={pad.top} x2={x} y2={pad.top + plotH} stroke="#2a3140" strokeWidth="1" />
              <text x={x} y={height - 12} textAnchor="middle" fill="#8b93a7" style={{ fontSize: 11 }}>
                {month}
              </text>
            </g>
          );
        })}

        <text x={width / 2} y={height - 1} textAnchor="middle" fill="#a1a1aa" style={{ fontSize: 12 }}>
          Month
        </text>

        <path d={balancePath} fill="none" stroke="#2DD4BF" strokeWidth="2.5" />
        <path d={principalPath} fill="none" stroke="#f87171" strokeWidth="2" strokeDasharray="4 3" />

        <rect x={pad.left + 8} y={pad.top + 8} width="12" height="4" fill="#2DD4BF" />
        <text x={pad.left + 24} y={pad.top + 13} fill="#d4d4d8" style={{ fontSize: 11 }}>
          CD balance
        </text>
        <rect x={pad.left + 8} y={pad.top + 24} width="12" height="4" fill="#f87171" />
        <text x={pad.left + 24} y={pad.top + 29} fill="#d4d4d8" style={{ fontSize: 11 }}>
          Initial deposit
        </text>
      </svg>
    </div>
  );
}

function ResultPanel({
  result,
  showSchedule,
  setShowSchedule,
  scheduleMode,
  setScheduleMode,
}: {
  result: CalculatorResult;
  showSchedule: boolean;
  setShowSchedule: (v: boolean | ((prev: boolean) => boolean)) => void;
  scheduleMode: "monthly" | "annual";
  setScheduleMode: (m: "monthly" | "annual") => void;
}) {
  const rows = scheduleMode === "monthly" ? result.scheduleMonthly : result.scheduleAnnual;
  const depositShare = result.endBalance > 0 ? (result.endBalance - result.totalInterest) / result.endBalance : 1;
  const interestShare = 1 - depositShare;

  return (
    <div id="calculator-result" className="flex h-full flex-col">
      <div className="flex items-center justify-between bg-accent px-4 py-2.5">
        <p className="text-sm font-semibold text-black">Result</p>
        <p className="text-xs text-black/80 md:text-sm">
          {result.totalMonths} months · APY {formatPercent(result.effectiveApy)}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-5">
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="min-w-full text-sm">
            <tbody className="text-zinc-200">
              <tr className="border-b border-white/5 bg-white/[0.03]">
                <td className="px-3 py-2.5 font-semibold text-white">End balance</td>
                <td className="px-3 py-2.5 text-right text-base font-bold text-accent md:text-lg">
                  {formatUsd(result.endBalance)}
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-3 py-2">Total interest</td>
                <td className="px-3 py-2 text-right text-accent">{formatUsd(result.totalInterest)}</td>
              </tr>
              <tr className="border-b border-white/5 bg-white/[0.03]">
                <td className="px-3 py-2">After-tax interest (est.)</td>
                <td className="px-3 py-2 text-right">{formatUsd(result.afterTaxInterest)}</td>
              </tr>
              <tr>
                <td className="px-3 py-2">After-tax balance (est.)</td>
                <td className="px-3 py-2 text-right">{formatUsd(result.afterTaxBalance)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
          <div className="mb-2 flex h-3 overflow-hidden rounded-full">
            <span className="bg-sky-400" style={{ width: `${depositShare * 100}%` }} />
            <span className="bg-accent" style={{ width: `${interestShare * 100}%` }} />
          </div>
          <div className="flex justify-between text-xs text-zinc-400">
            <span>Deposit {formatPercent(depositShare * 100, 0)}</span>
            <span>Interest {formatPercent(interestShare * 100, 0)}</span>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-300">
          At maturity your CD can reach{" "}
          <span className="font-semibold text-accent">{formatUsd(result.endBalance)}</span>, earning{" "}
          <span className="font-semibold text-white">{formatUsd(result.totalInterest)}</span> in interest
          before taxes.
        </p>

        <AccumulationChart schedule={result.scheduleMonthly} />

        <button
          type="button"
          onClick={() => setShowSchedule((v) => !v)}
          className="w-full rounded-md border border-white/15 px-3 py-2.5 text-sm font-medium text-zinc-100 transition hover:border-accent hover:text-accent"
        >
          {showSchedule ? "Hide accumulation schedule" : "Show accumulation schedule"}
        </button>

        {showSchedule ? (
          <>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setScheduleMode("annual")}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                  scheduleMode === "annual" ? "bg-accent text-black" : "border border-white/15 text-zinc-300"
                }`}
              >
                Annual
              </button>
              <button
                type="button"
                onClick={() => setScheduleMode("monthly")}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                  scheduleMode === "monthly" ? "bg-accent text-black" : "border border-white/15 text-zinc-300"
                }`}
              >
                Monthly
              </button>
            </div>
            <div className="max-h-[28rem] overflow-auto rounded-lg border border-white/10">
              <table className="min-w-full text-xs md:text-sm">
                <thead className="sticky top-0 z-10 bg-[#111827]">
                  <tr className="text-zinc-300">
                    <th className="px-2 py-2 text-left font-semibold">Period</th>
                    <th className="px-2 py-2 text-right font-semibold">Deposit</th>
                    <th className="px-2 py-2 text-right font-semibold">Interest</th>
                    <th className="px-2 py-2 text-right font-semibold">Ending balance</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr
                      key={`${row.label}-${row.period}`}
                      className={`border-t border-white/5 text-zinc-200 ${idx % 2 ? "bg-white/[0.02]" : ""}`}
                    >
                      <td className="px-2 py-1.5 font-medium">{row.label}</td>
                      <td className="px-2 py-1.5 text-right">{formatUsd(row.deposit)}</td>
                      <td className="px-2 py-1.5 text-right text-accent">{formatUsd(row.interest)}</td>
                      <td className="px-2 py-1.5 text-right font-medium">{formatUsd(row.endingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default function CdCalculator() {
  const [draft, setDraft] = useState<CalculatorInputs>(defaults);
  const [inputs, setInputs] = useState<CalculatorInputs>(defaults);
  const [showResult, setShowResult] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleMode, setScheduleMode] = useState<"monthly" | "annual">("annual");
  const [, startTransition] = useTransition();

  const result = useMemo(() => projectCdGrowth(inputs), [inputs]);

  const updateDraft = <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => {
    startTransition(() => {
      setDraft((prev) => ({ ...prev, [key]: value }));
    });
  };

  const onCalculate = (e?: FormEvent) => {
    e?.preventDefault();
    setInputs(draft);
    setShowResult(true);
    requestAnimationFrame(() => {
      document.getElementById("calculator-result")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  };

  const onClear = () => {
    setDraft(defaults);
    setInputs(defaults);
    setShowResult(false);
    setShowSchedule(false);
  };

  return (
    <section
      id="calculator"
      aria-labelledby="calculator-heading"
      className="overflow-hidden rounded-xl border border-white/10 bg-[#0b1018] shadow-2xl shadow-black/50"
    >
      <div className="flex items-center gap-2 border-b border-white/5 bg-[#111827] px-4 py-3 md:px-6">
        <span className="text-zinc-400" aria-hidden="true">
          ▾
        </span>
        <p id="calculator-heading" className="text-sm font-medium text-zinc-100 md:text-base">
          Modify the values and click Calculate
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:divide-x lg:divide-white/10">
        <form onSubmit={onCalculate} className="px-4 md:px-6">
          <div className="md:grid md:grid-cols-2 md:gap-x-6">
            <Row label="Initial deposit" htmlFor="initialDeposit">
              <div className="relative">
                <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                  $
                </span>
                <input
                  id="initialDeposit"
                  type="number"
                  min={0}
                  step={100}
                  inputMode="decimal"
                  className={`${inputClass} pl-6`}
                  value={draft.initialDeposit}
                  onChange={(e) => updateDraft("initialDeposit", Number(e.target.value) || 0)}
                />
              </div>
            </Row>

            <Row label="Interest rate" htmlFor="interestRate" hint="APY if annual; APR otherwise">
              <div className="relative">
                <input
                  id="interestRate"
                  type="number"
                  min={0}
                  max={100}
                  step={0.01}
                  inputMode="decimal"
                  className={`${inputClass} pr-8`}
                  value={draft.interestRate}
                  onChange={(e) => updateDraft("interestRate", Number(e.target.value) || 0)}
                />
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                  %
                </span>
              </div>
            </Row>

            <Row label="Compound" htmlFor="compound">
              <select
                id="compound"
                className={`${inputClass} text-left`}
                value={draft.compound}
                onChange={(e) => updateDraft("compound", e.target.value as CompoundFrequency)}
              >
                <option value="annually">Annually (APY)</option>
                <option value="semiannually">Semiannually</option>
                <option value="quarterly">Quarterly</option>
                <option value="monthly">Monthly (APR)</option>
                <option value="daily">Daily</option>
                <option value="continuously">Continuously</option>
              </select>
            </Row>

            <Row label="Marginal tax rate" htmlFor="marginalTaxRate" hint="Optional after-tax estimate">
              <div className="relative">
                <input
                  id="marginalTaxRate"
                  type="number"
                  min={0}
                  max={50}
                  step={1}
                  inputMode="numeric"
                  className={`${inputClass} pr-8`}
                  value={draft.marginalTaxRate}
                  onChange={(e) => updateDraft("marginalTaxRate", Number(e.target.value) || 0)}
                />
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                  %
                </span>
              </div>
            </Row>

            <Row label="Deposit length (years)" htmlFor="years">
              <input
                id="years"
                type="number"
                min={0}
                max={40}
                inputMode="numeric"
                className={inputClass}
                value={draft.years}
                onChange={(e) => updateDraft("years", Number(e.target.value) || 0)}
              />
            </Row>

            <Row label="Deposit length (months)" htmlFor="months">
              <input
                id="months"
                type="number"
                min={0}
                max={11}
                inputMode="numeric"
                className={inputClass}
                value={draft.months}
                onChange={(e) => updateDraft("months", Number(e.target.value) || 0)}
              />
            </Row>
          </div>

          <div className="flex items-center justify-center gap-3 py-4 md:justify-start md:py-5">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-7 py-3 text-sm font-bold text-black shadow-sm transition hover:bg-[#5eead4] active:scale-[0.99] md:px-8 md:text-base"
            >
              <span aria-hidden="true">▶</span>
              Calculate
            </button>
            <button
              type="button"
              onClick={onClear}
              className="rounded-md border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:bg-white/10 md:text-base"
            >
              Clear
            </button>
          </div>
        </form>

        <div className={`${showResult ? "block" : "hidden lg:block"} border-t border-white/10 lg:border-t-0`}>
          {showResult ? (
            <ResultPanel
              result={result}
              showSchedule={showSchedule}
              setShowSchedule={setShowSchedule}
              scheduleMode={scheduleMode}
              setScheduleMode={setScheduleMode}
            />
          ) : (
            <div className="hidden h-full min-h-[28rem] flex-col items-center justify-center gap-3 p-8 text-center lg:flex">
              <p className="text-lg font-semibold text-white">Your CD projection appears here</p>
              <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
                Enter deposit, rate, compounding, and term, then click Calculate to see maturity
                value, interest earned, and a full schedule.
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="border-t border-white/10 px-4 py-2.5 text-[11px] leading-relaxed text-white md:px-6">
        Educational estimate only. Confirm APY, compounding, and early-withdrawal rules with your bank
        or credit union before opening a CD.
      </p>
    </section>
  );
}
