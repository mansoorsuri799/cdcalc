import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import {
  BRAND_CONTRIBUTIONS,
  IRA_LIMITS_2026,
  SITE_NAME,
  SITE_ORIGIN,
  TAX_YEAR,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `${TAX_YEAR} Roth IRA Contribution Limits — Caps & Catch-Up`,
  description: `See the ${TAX_YEAR} Roth IRA contribution limits, catch-up amounts for age 50+, and how income phase-outs can reduce what you can contribute.`,
  alternates: { canonical: `${SITE_ORIGIN}/roth-ira-contribution-limits` },
  openGraph: {
    title: `${TAX_YEAR} Roth IRA Contribution Limits — Caps & Catch-Up`,
    description: `IRS ${TAX_YEAR} Roth IRA contribution caps, catch-up rules, and practical examples.`,
    url: `${SITE_ORIGIN}/roth-ira-contribution-limits`,
    siteName: SITE_NAME,
    type: "article",
  },
};

const faqs = [
  {
    question: `How much can I contribute to a Roth IRA in ${TAX_YEAR}?`,
    answer: `The combined IRA limit is $${IRA_LIMITS_2026.under50.toLocaleString()} under age 50, or $${IRA_LIMITS_2026.age50Plus.toLocaleString()} if you are age 50 or older, subject to earned income and MAGI eligibility.`,
  },
  {
    question: "Can I split contributions between Roth and Traditional IRAs?",
    answer:
      "Yes. You can fund both in the same year, but the combined total cannot exceed the annual IRA limit for your age.",
  },
  {
    question: "Do employer plans reduce my Roth IRA limit?",
    answer:
      "401(k) contributions do not reduce the IRA dollar cap, but your Traditional IRA deductibility can be affected by workplace plan coverage. Roth IRA eligibility depends mainly on MAGI and earned income.",
  },
];

export default function ContributionLimitsPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Contribution Limits" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {TAX_YEAR} Roth IRA contribution limits
      </h1>
      <p className="text-gray-300 text-lg leading-relaxed mb-8">
        Know the exact annual cap before you fund your account. This guide covers {TAX_YEAR} IRS
        contribution limits, catch-up rules, and how earned income interacts with the Roth IRA
        calculator on our homepage.
      </p>

      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 mb-10">
        <Image
          src={BRAND_CONTRIBUTIONS}
          alt="Visual guide to Roth IRA contribution limits and annual savings planning"
          fill
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover"
          priority
        />
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">Annual contribution caps</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          For {TAX_YEAR}, you may contribute up to ${IRA_LIMITS_2026.under50.toLocaleString()} across
          all traditional and Roth IRAs if you are under 50. Once you turn 50, the catch-up limit
          rises to ${IRA_LIMITS_2026.age50Plus.toLocaleString()}. You cannot contribute more than
          your taxable compensation for the year.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-secondary p-5">
            <p className="text-sm text-gray-400">Under age 50</p>
            <p className="text-3xl font-bold text-accent">
              ${IRA_LIMITS_2026.under50.toLocaleString()}
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-secondary p-5">
            <p className="text-sm text-gray-400">Age 50 and older</p>
            <p className="text-3xl font-bold text-accent">
              ${IRA_LIMITS_2026.age50Plus.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">Why the limit still matters for planning?</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Hitting the annual cap early in your career can dramatically change long-term balances
          because every contribution gets more years of tax-free compounding. Use the{" "}
          <Link href="/#calculator" className="text-accent hover:underline">
            Roth IRA calculator
          </Link>{" "}
          with “Maximize contributions” enabled to model that path, then stress-test a lower amount
          if cash flow is tight.
        </p>
        <p className="text-gray-300 leading-relaxed">
          If MAGI reduces your direct Roth room, read the{" "}
          <Link href="/roth-ira-eligibility" className="text-accent hover:underline">
            eligibility guide
          </Link>{" "}
          and our{" "}
          <Link href="/blog/backdoor-roth-ira-explained" className="text-accent hover:underline">
            backdoor Roth IRA explainer
          </Link>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">Deadline and practical tips</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="rounded-xl border border-slate-700 bg-secondary p-4">
            Contributions for a tax year can often be made until the tax filing deadline of the following year (not including extensions).
          </li>
          <li className="rounded-xl border border-slate-700 bg-secondary p-4">
            Spousal IRAs can let a non-working spouse contribute if you file jointly and have enough household compensation.
          </li>
          <li className="rounded-xl border border-slate-700 bg-secondary p-4">
            Excess contributions can trigger a 6% penalty each year they remain uncorrected—track totals across every IRA you own.
          </li>
        </ul>
      </section>

      <FaqSection items={faqs} />

      <div className="mt-12 text-center">
        <CtaButton href="/#calculator">PROJECT YOUR MAX CONTRIBUTION</CtaButton>
      </div>
    </div>
  );
}
