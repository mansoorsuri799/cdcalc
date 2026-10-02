import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { IRA_LIMITS_2026, SITE_NAME, SITE_ORIGIN, TAX_YEAR } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `${TAX_YEAR} Roth IRA Eligibility & Income Limits`,
  description: `Check ${TAX_YEAR} Roth IRA income limits by filing status, understand MAGI phase-outs, and see when a direct contribution may be reduced to zero.`,
  alternates: { canonical: `${SITE_ORIGIN}/roth-ira-eligibility` },
  openGraph: {
    title: `${TAX_YEAR} Roth IRA Eligibility & Income Limits`,
    description: `MAGI ranges and eligibility rules for direct Roth IRA contributions in ${TAX_YEAR}.`,
    url: `${SITE_ORIGIN}/roth-ira-eligibility`,
    siteName: SITE_NAME,
    type: "article",
  },
};

const faqs = [
  {
    question: "What income is used for Roth IRA eligibility?",
    answer:
      "The IRS uses modified adjusted gross income (MAGI), which starts with AGI and adds back certain deductions. Brokerages and tax software can help estimate MAGI before you contribute.",
  },
  {
    question: "What if I am over the income limit?",
    answer:
      "You generally cannot make a direct Roth contribution once MAGI reaches the top of the phase-out. Many high earners evaluate a backdoor Roth conversion. Talk with a tax professional before using that strategy.",
  },
  {
    question: "Do I need earned income to contribute?",
    answer:
      "Yes. Roth IRA contributions require taxable compensation (or a spousal IRA setup when filing jointly). Investment income alone usually is not enough.",
  },
];

export default function EligibilityPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Eligibility" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Roth IRA eligibility and income limits for {TAX_YEAR}
      </h1>
      <p className="text-gray-300 text-lg leading-relaxed mb-8">
        Direct Roth IRA contributions depend on your filing status and MAGI. Use this page to see
        whether you qualify for a full contribution, a reduced amount, or none at all—then model the
        result in our calculator.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">{TAX_YEAR} MAGI phase-out ranges</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="min-w-full text-sm">
            <thead className="bg-secondary text-left text-gray-300">
              <tr>
                <th className="px-4 py-3">Filing status</th>
                <th className="px-4 py-3">Full contribution</th>
                <th className="px-4 py-3">Partial</th>
                <th className="px-4 py-3">No direct Roth</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              <tr className="border-t border-slate-700">
                <td className="px-4 py-3">Single / HoH</td>
                <td className="px-4 py-3">&lt; ${IRA_LIMITS_2026.single.fullBelow.toLocaleString()}</td>
                <td className="px-4 py-3">
                  ${IRA_LIMITS_2026.single.fullBelow.toLocaleString()}–$
                  {(IRA_LIMITS_2026.single.phaseOutEnd - 1).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  ≥ ${IRA_LIMITS_2026.single.phaseOutEnd.toLocaleString()}
                </td>
              </tr>
              <tr className="border-t border-slate-700">
                <td className="px-4 py-3">Married filing jointly</td>
                <td className="px-4 py-3">
                  &lt; ${IRA_LIMITS_2026.marriedJoint.fullBelow.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  ${IRA_LIMITS_2026.marriedJoint.fullBelow.toLocaleString()}–$
                  {(IRA_LIMITS_2026.marriedJoint.phaseOutEnd - 1).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  ≥ ${IRA_LIMITS_2026.marriedJoint.phaseOutEnd.toLocaleString()}
                </td>
              </tr>
              <tr className="border-t border-slate-700">
                <td className="px-4 py-3">Married filing separately*</td>
                <td className="px-4 py-3">—</td>
                <td className="px-4 py-3">
                  &lt; ${IRA_LIMITS_2026.marriedSeparate.phaseOutEnd.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  ≥ ${IRA_LIMITS_2026.marriedSeparate.phaseOutEnd.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          *If you lived with your spouse during the year. Confirm final IRS figures before contributing.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">How to check eligibility in practice?</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Estimate MAGI early in the year, then again before your final contribution. Bonuses, equity
          compensation, and side income can push you into the phase-out unexpectedly. Our{" "}
          <Link href="/#calculator" className="text-accent hover:underline">
            Roth IRA calculator
          </Link>{" "}
          accepts filing status and MAGI so the projected contribution updates immediately.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Over the limit? Learn whether a conversion strategy fits in{" "}
          <Link href="/blog/backdoor-roth-ira-explained" className="text-accent hover:underline">
            Backdoor Roth IRA explained
          </Link>
          , and compare account types in{" "}
          <Link href="/roth-vs-traditional-ira" className="text-accent hover:underline">
            Roth vs Traditional IRA
          </Link>
          .
        </p>
      </section>

      <FaqSection items={faqs} />

      <div className="mt-12 text-center">
        <CtaButton href="/#calculator">CHECK ELIGIBILITY IN THE TOOL</CtaButton>
      </div>
    </div>
  );
}
