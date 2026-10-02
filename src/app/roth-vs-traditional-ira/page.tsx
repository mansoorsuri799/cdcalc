import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { BRAND_COMPARISON, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Roth IRA vs Traditional IRA — Taxes, RMDs & Who Wins",
  description:
    "Compare Roth IRA vs Traditional IRA on taxes, deductions, withdrawals, RMDs, and income limits so you can choose the better retirement path.",
  alternates: { canonical: `${SITE_ORIGIN}/roth-vs-traditional-ira` },
  openGraph: {
    title: "Roth IRA vs Traditional IRA — Taxes, RMDs & Who Wins",
    description: "Side-by-side comparison of Roth and Traditional IRA rules for savers.",
    url: `${SITE_ORIGIN}/roth-vs-traditional-ira`,
    siteName: SITE_NAME,
    type: "article",
  },
};

const faqs = [
  {
    question: "Is a Roth IRA better than a Traditional IRA?",
    answer:
      "It depends on tax rates now versus later, eligibility, and whether you value tax-free qualified withdrawals and no lifetime RMDs. Many households use both over time.",
  },
  {
    question: "Do Traditional IRAs have income limits to contribute?",
    answer:
      "Anyone with earned income (within contribution rules) can usually contribute to a Traditional IRA, but deductibility can phase out if you or a spouse is covered by a workplace plan.",
  },
  {
    question: "Can I convert a Traditional IRA to a Roth IRA?",
    answer:
      "Yes. A Roth conversion moves pre-tax money into a Roth and generally creates taxable income in the conversion year. That is also the foundation of backdoor Roth strategies.",
  },
];

export default function RothVsTraditionalPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Roth vs Traditional" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Roth IRA vs Traditional IRA
      </h1>
      <p className="text-gray-300 text-lg leading-relaxed mb-8">
        Both accounts help you invest for retirement. The difference is timing of taxes—and that
        timing can change which account leaves you with more spendable money later.
      </p>

      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 mb-10">
        <Image
          src={BRAND_COMPARISON}
          alt="Comparison chart concept for Roth IRA versus Traditional IRA growth"
          fill
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover"
          priority
        />
      </div>

      <section className="mb-10 overflow-x-auto rounded-xl border border-slate-700">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary text-left text-gray-300">
            <tr>
              <th className="px-4 py-3">Feature</th>
              <th className="px-4 py-3">Roth IRA</th>
              <th className="px-4 py-3">Traditional IRA</th>
            </tr>
          </thead>
          <tbody className="text-gray-200">
            {[
              ["Contributions", "After-tax dollars", "Often pre-tax / deductible"],
              ["Growth", "Tax-free if qualified", "Tax-deferred"],
              ["Qualified withdrawals", "Tax-free", "Taxed as ordinary income"],
              ["Income limits to contribute", "Yes for direct Roth", "No (deduction may phase out)"],
              ["RMDs during owner’s lifetime", "None", "Required"],
              ["Best if…", "You expect higher future taxes", "You want a deduction today"],
            ].map(([feature, roth, trad]) => (
              <tr key={feature} className="border-t border-slate-700">
                <td className="px-4 py-3 font-medium text-white">{feature}</td>
                <td className="px-4 py-3">{roth}</td>
                <td className="px-4 py-3">{trad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">How to choose with real numbers?</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Start with eligibility. If MAGI blocks a direct Roth contribution, a Traditional IRA or
          backdoor path may be the workable option. If you qualify for Roth, run the{" "}
          <Link href="/#calculator" className="text-accent hover:underline">
            Roth IRA calculator
          </Link>{" "}
          and compare the tax-free ending balance with a taxable alternative at your current marginal
          rate.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Still deciding between workplace plans and IRAs? Read{" "}
          <Link href="/blog/roth-ira-vs-401k" className="text-accent hover:underline">
            Roth IRA vs 401(k)
          </Link>
          .
        </p>
      </section>

      <FaqSection items={faqs} />

      <div className="mt-12 text-center">
        <CtaButton href="/#calculator">COMPARE WITH THE CALCULATOR</CtaButton>
      </div>
    </div>
  );
}
