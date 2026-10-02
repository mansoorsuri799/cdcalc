"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import {
  CalculatorInputs,
  CalculatorResult,
  FilingStatus,
  YearRow,
  formatCompactUsd,
  formatUsd,
  projectRothGrowth,
} from "@/lib/rothMath";

const defaults: CalculatorInputs = {
  currentAge: 30,
  retirementAge: 65,
  currentBalance: 30000,
  annualContribution: 7500,
  expectedReturn: 6,
  marginalTaxRate: 25,
  filingStatus: "single",
  magi: 90000,
  maximize: false,
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

function AccumulationChart({
  schedule,
  startAge,
}: {
  schedule: YearRow[];
  startAge: number;
}) {
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

  const maxY = Math.max(
    ...schedule.map((r) => Math.max(r.rothEnd, r.taxableEnd, r.principalEnd)),
    1
  );
  const niceMax = Math.ceil(maxY / 250000) * 250000 || 250000;
  const endAge = schedule[schedule.length - 1]?.age ?? startAge;

  const xAt = (i: number) => pad.left + (i / Math.max(schedule.length - 1, 1)) * plotW;
  const yAt = (v: number) => pad.top + plotH - (v / niceMax) * plotH;

  const pathFor = (getter: (row: YearRow) => number) =>
    schedule
      .map((row, i) => `${i === 0 ? "M" : "L"} ${xAt(i).toFixed(2)} ${yAt(getter(row)).toFixed(2)}`)
      .join(" ");

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => niceMax * t);
  const ageSpan = Math.max(endAge - startAge, 1);
  const xAges = [0, 0.33, 0.66, 1].map((t) => Math.round(startAge + ageSpan * t));

  return (
    <div className="w-full overflow-hidden rounded-lg border border-white/10 bg-[#080b10] p-2 md:p-3">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Balance accumulation graph">
        <text
          x={width / 2}
          y={18}
          textAnchor="middle"
          className="fill-zinc-100"
          style={{ fontSize: 14, fontWeight: 700 }}
        >
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

        {xAges.map((age) => {
          const i = Math.min(
            schedule.length - 1,
            Math.max(0, Math.round(((age - startAge) / ageSpan) * (schedule.length - 1)))
          );
          const x = xAt(i);
          return (
            <g key={`age-${age}`}>
              <line x1={x} y1={pad.top} x2={x} y2={pad.top + plotH} stroke="#2a3140" strokeWidth="1" />
              <text x={x} y={height - 12} textAnchor="middle" fill="#8b93a7" style={{ fontSize: 11 }}>
                {age}
              </text>
            </g>
          );
        })}

        <text x={width / 2} y={height - 1} textAnchor="middle" fill="#a1a1aa" style={{ fontSize: 12 }}>
          Age
        </text>

        <path d={pathFor((r) => r.rothEnd)} fill="none" stroke="#38bdf8" strokeWidth="2.5" />
        <path d={pathFor((r) => r.taxableEnd)} fill="none" stroke="#84cc16" strokeWidth="2.5" />
        <path d={pathFor((r) => r.principalEnd)} fill="none" stroke="#f87171" strokeWidth="2.5" />

        <rect x={pad.left + 8} y={pad.top + 8} width="12" height="4" fill="#38bdf8" />
        <text x={pad.left + 24} y={pad.top + 13} fill="#d4d4d8" style={{ fontSize: 11 }}>
          Roth IRA
        </text>
        <rect x={pad.left + 8} y={pad.top + 24} width="12" height="4" fill="#84cc16" />
        <text x={pad.left + 24} y={pad.top + 29} fill="#d4d4d8" style={{ fontSize: 11 }}>
          Taxable account
        </text>
        <rect x={pad.left + 8} y={pad.top + 40} width="12" height="4" fill="#f87171" />
        <text x={pad.left + 24} y={pad.top + 45} fill="#d4d4d8" style={{ fontSize: 11 }}>
          Principal
        </text>
      </svg>
    </div>
  );
}

function ResultPanel({
  result,
  retirementAge,
  showSchedule,
  setShowSchedule,
}: {
  result: CalculatorResult;
  retirementAge: number;
  showSchedule: boolean;
  setShowSchedule: (v: boolean | ((prev: boolean) => boolean)) => void;
}) {
  return (
    <div id="calculator-result" className="flex h-full flex-col">
      <div className="flex items-center justify-between bg-accent px-4 py-2.5">
        <p className="text-sm font-semibold text-black">Result</p>
        <p className="text-xs text-black/80 md:text-sm">
          {result.years} years · {formatUsd(result.annualContribution)}/yr
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-5">
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-white/5 text-zinc-400">
                <th className="px-3 py-2 text-left font-medium" />
                <th className="px-3 py-2 text-right font-semibold text-zinc-200">Roth IRA</th>
                <th className="px-3 py-2 text-right font-semibold text-zinc-200">Taxable account</th>
              </tr>
            </thead>
            <tbody className="text-zinc-200">
              <tr className="border-t border-white/5 bg-white/[0.03]">
                <td className="px-3 py-2.5 font-semibold text-white">Balance at age {retirementAge}</td>
                <td className="px-3 py-2.5 text-right text-base font-bold text-accent md:text-lg">
                  {formatUsd(result.rothBalance)}
                </td>
                <td className="px-3 py-2.5 text-right text-base font-bold text-white md:text-lg">
                  {formatUsd(result.taxableBalance)}
                </td>
              </tr>
              <tr className="border-t border-white/5">
                <td className="px-3 py-2">Total principal</td>
                <td className="px-3 py-2 text-right">{formatUsd(result.totalContributions)}</td>
                <td className="px-3 py-2 text-right">{formatUsd(result.totalContributions)}</td>
              </tr>
              <tr className="border-t border-white/5 bg-white/[0.03]">
                <td className="px-3 py-2">Total interest</td>
                <td className="px-3 py-2 text-right text-accent">{formatUsd(result.rothGrowth)}</td>
                <td className="px-3 py-2 text-right">{formatUsd(result.taxableGrowth)}</td>
              </tr>
              <tr className="border-t border-white/5">
                <td className="px-3 py-2">Total tax (est.)</td>
                <td className="px-3 py-2 text-right">$0</td>
                <td className="px-3 py-2 text-right">{formatUsd(result.totalTaxEstimate)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm leading-relaxed text-zinc-300">
          According to these assumptions, the Roth IRA can accumulate{" "}
          <span className="font-semibold text-accent">{formatUsd(result.taxAdvantage)}</span> more
          than a regular taxable account by age {retirementAge}.
        </p>

        <div
          className={`rounded-md border px-3 py-2 text-xs leading-relaxed md:text-sm ${
            result.contributionReduced
              ? "border-amber-500/40 bg-amber-500/10 text-amber-100"
              : "border-accent/40 bg-accent/10 text-accent"
          }`}
          role="status"
        >
          Allowed contribution now: {formatUsd(result.maxAllowed)}. {result.eligibilityNote}
        </div>

        <AccumulationChart schedule={result.schedule} startAge={result.schedule[0]?.age ?? 30} />

        <button
          type="button"
          onClick={() => setShowSchedule((v) => !v)}
          className="w-full rounded-md border border-white/15 px-3 py-2.5 text-sm font-medium text-zinc-100 transition hover:border-accent hover:text-accent"
        >
          {showSchedule ? "Hide annual schedule" : "Show annual schedule"}
        </button>

        {showSchedule ? (
          <div className="max-h-[28rem] overflow-auto rounded-lg border border-white/10">
            <table className="min-w-full text-xs md:text-sm">
              <thead className="sticky top-0 z-10 bg-[#111827]">
                <tr className="text-zinc-300">
                  <th className="px-2 py-2 text-left font-semibold" rowSpan={2}>
                    Age
                  </th>
                  <th className="px-2 py-1 text-center font-semibold" colSpan={2}>
                    Principal
                  </th>
                  <th className="px-2 py-1 text-center font-semibold" colSpan={2}>
                    Roth IRA
                  </th>
                  <th className="px-2 py-1 text-center font-semibold" colSpan={2}>
                    Taxable account
                  </th>
                </tr>
                <tr className="text-zinc-500">
                  <th className="px-2 py-1 text-right font-medium">Start</th>
                  <th className="px-2 py-1 text-right font-medium">End</th>
                  <th className="px-2 py-1 text-right font-medium">Start</th>
                  <th className="px-2 py-1 text-right font-medium">End</th>
                  <th className="px-2 py-1 text-right font-medium">Start</th>
                  <th className="px-2 py-1 text-right font-medium">End</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((row, idx) => (
                  <tr
                    key={row.age}
                    className={`border-t border-white/5 text-zinc-200 ${idx % 2 ? "bg-white/[0.02]" : ""}`}
                  >
                    <td className="px-2 py-1.5 font-medium">{row.age}</td>
                    <td className="px-2 py-1.5 text-right">{formatUsd(row.principalStart)}</td>
                    <td className="px-2 py-1.5 text-right">{formatUsd(row.principalEnd)}</td>
                    <td className="px-2 py-1.5 text-right">{formatUsd(row.rothStart)}</td>
                    <td className="px-2 py-1.5 text-right font-medium text-sky-400">
                      {formatUsd(row.rothEnd)}
                    </td>
                    <td className="px-2 py-1.5 text-right">{formatUsd(row.taxableStart)}</td>
                    <td className="px-2 py-1.5 text-right">{formatUsd(row.taxableEnd)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function RothIraCalculator() {
  const [draft, setDraft] = useState<CalculatorInputs>(defaults);
  const [inputs, setInputs] = useState<CalculatorInputs>(defaults);
  const [showResult, setShowResult] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [, startTransition] = useTransition();

  const result = useMemo(() => projectRothGrowth(inputs), [inputs]);

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
            <Row label="Current balance" htmlFor="currentBalance">
              <div className="relative">
                <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                  $
                </span>
                <input
                  id="currentBalance"
                  type="number"
                  min={0}
                  inputMode="decimal"
                  className={`${inputClass} pl-6`}
                  value={draft.currentBalance}
                  onChange={(e) => updateDraft("currentBalance", Number(e.target.value) || 0)}
                />
              </div>
            </Row>

            <Row label="Annual contribution" htmlFor="annualContribution">
              <div className="relative">
                <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                  $
                </span>
                <input
                  id="annualContribution"
                  type="number"
                  min={0}
                  inputMode="decimal"
                  disabled={draft.maximize}
                  className={`${inputClass} pl-6`}
                  value={draft.annualContribution}
                  onChange={(e) => updateDraft("annualContribution", Number(e.target.value) || 0)}
                />
              </div>
            </Row>

            <Row label="Maximize contributions?">
              <div className="flex justify-end gap-5 text-sm text-white">
                <label className="inline-flex cursor-pointer items-center gap-1.5">
                  <input
                    type="radio"
                    name="maximize"
                    className="accent-accent"
                    checked={draft.maximize}
                    onChange={() => updateDraft("maximize", true)}
                  />
                  Yes
                </label>
                <label className="inline-flex cursor-pointer items-center gap-1.5">
                  <input
                    type="radio"
                    name="maximize"
                    className="accent-accent"
                    checked={!draft.maximize}
                    onChange={() => updateDraft("maximize", false)}
                  />
                  No
                </label>
              </div>
            </Row>

            <Row label="Expected rate of return" htmlFor="expectedReturn">
              <div className="relative">
                <input
                  id="expectedReturn"
                  type="number"
                  min={0}
                  max={20}
                  step={0.1}
                  inputMode="decimal"
                  className={`${inputClass} pr-8`}
                  value={draft.expectedReturn}
                  onChange={(e) => updateDraft("expectedReturn", Number(e.target.value) || 0)}
                />
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                  %
                </span>
              </div>
            </Row>

            <Row label="Current age" htmlFor="currentAge">
              <input
                id="currentAge"
                type="number"
                min={18}
                max={100}
                inputMode="numeric"
                className={inputClass}
                value={draft.currentAge}
                onChange={(e) => updateDraft("currentAge", Number(e.target.value) || 0)}
              />
            </Row>

            <Row label="Retirement age" htmlFor="retirementAge">
              <input
                id="retirementAge"
                type="number"
                min={draft.currentAge + 1}
                max={100}
                inputMode="numeric"
                className={inputClass}
                value={draft.retirementAge}
                onChange={(e) => updateDraft("retirementAge", Number(e.target.value) || 0)}
              />
            </Row>

            <Row label="Marginal tax rate" htmlFor="marginalTaxRate" hint="Taxable-account comparison">
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

            <div className="border-b border-white/5 py-2 md:col-span-2 md:py-2.5">
              <details className="group">
                <summary className="cursor-pointer text-[13px] font-medium text-accent md:text-sm">
                  Income eligibility (optional)
                </summary>
                <div className="pt-1 md:grid md:grid-cols-2 md:gap-x-6">
                  <Row label="Filing status" htmlFor="filingStatus">
                    <select
                      id="filingStatus"
                      className={`${inputClass} text-left`}
                      value={draft.filingStatus}
                      onChange={(e) => updateDraft("filingStatus", e.target.value as FilingStatus)}
                    >
                      <option value="single">Single / HoH</option>
                      <option value="marriedJoint">Married jointly</option>
                      <option value="marriedSeparate">Married separately</option>
                    </select>
                  </Row>
                  <Row label="Modified AGI (MAGI)" htmlFor="magi">
                    <div className="relative">
                      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                        $
                      </span>
                      <input
                        id="magi"
                        type="number"
                        min={0}
                        inputMode="decimal"
                        className={`${inputClass} pl-6`}
                        value={draft.magi}
                        onChange={(e) => updateDraft("magi", Number(e.target.value) || 0)}
                      />
                    </div>
                  </Row>
                </div>
              </details>
            </div>
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
              retirementAge={inputs.retirementAge}
              showSchedule={showSchedule}
              setShowSchedule={setShowSchedule}
            />
          ) : (
            <div className="hidden h-full min-h-[28rem] flex-col items-center justify-center gap-3 p-8 text-center lg:flex">
              <p className="text-lg font-semibold text-white">Your projection appears here</p>
              <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
                Enter your assumptions on the left, then click Calculate to see Roth vs taxable
                balances, a growth chart, and a full annual schedule.
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="border-t border-white/10 px-4 py-2.5 text-[11px] leading-relaxed text-white md:px-6">
        Educational estimate only. Confirm limits on IRS.gov before contributing.
      </p>
    </section>
  );
}
