import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import { BRAND_FREQUENCY, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "CD vs High-Yield Savings Account — Which to Choose?",
  description:
    "Compare certificates of deposit and high-yield savings accounts on rate locks, liquidity, penalties, and when each product fits.",
  alternates: { canonical: `${SITE_ORIGIN}/cd-vs-savings-account` },
  openGraph: {
    title: "CD vs High-Yield Savings Account — Which to Choose?",
    description: "Side-by-side guide to CDs versus liquid high-yield savings.",
    url: `${SITE_ORIGIN}/cd-vs-savings-account`,
    siteName: SITE_NAME,
    type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "CD vs high-yield savings comparison" }],
  },
};

const faqs = [
  {
    question: "Is a CD always better than a savings account?",
    answer:
      "No. A CD is better when you can lock funds and want a fixed rate. A high-yield savings account is better when you need flexible deposits and withdrawals or expect to use the cash soon.",
  },
  {
    question: "Can I use both?",
    answer:
      "Yes. Many savers keep emergency cash in savings and put timed goals into CDs or a CD ladder so they capture fixed rates without freezing every dollar.",
  },
  {
    question: "Do both pay taxable interest?",
    answer:
      "In taxable accounts, interest from both CDs and savings accounts is generally taxed as ordinary income. Account wrappers such as IRAs can change the tax timing.",
  },
];

export default function CdVsSavingsPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "CD vs Savings",
        item: `${SITE_ORIGIN}/cd-vs-savings-account`,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "CD vs Savings" }]} />

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        CD vs high-yield savings account
      </h1>
      <p className="text-gray-300 text-lg leading-relaxed mb-8">
        Both products can hold cash safely inside insurance limits, but they solve different problems.
        Choose based on whether you need a rate lock or day-to-day access—then confirm the numbers with
        the{" "}
        <Link href="/#calculator" className="text-accent hover:underline">
          CD calculator
        </Link>
        .
      </p>

      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-secondary mb-10">
        <Image
          src={BRAND_FREQUENCY}
          alt="Comparison visual for CD rate locks versus flexible high-yield savings compounding"
          fill
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover"
          priority
        />
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">Quick comparison</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="min-w-full text-sm">
            <thead className="bg-secondary text-left text-gray-300">
              <tr>
                <th className="px-4 py-3 font-semibold">Feature</th>
                <th className="px-4 py-3 font-semibold">CD</th>
                <th className="px-4 py-3 font-semibold">High-yield savings</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {[
                ["Rate", "Usually fixed for the term", "Variable; can change anytime"],
                ["Access", "Limited until maturity", "Flexible withdrawals"],
                ["Best for", "Known future expenses", "Emergency funds & short buffers"],
                ["Early exit", "Penalty on most traditional CDs", "Typically no term penalty"],
                ["Planning", "Maturity value is predictable", "Balance path depends on future APY"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-slate-700">
                  {row.map((cell) => (
                    <td key={cell} className="px-4 py-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">Choose a CD when…</h2>
        <ul className="space-y-3 text-gray-300 list-disc list-inside">
          <li>You will not need the money before a specific date.</li>
          <li>You want to lock today&apos;s APY in case savings rates fall.</li>
          <li>You are building a{" "}
            <Link href="/cd-ladder" className="text-accent hover:underline">
              CD ladder
            </Link>{" "}
            for scheduled liquidity.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">Choose high-yield savings when…</h2>
        <ul className="space-y-3 text-gray-300 list-disc list-inside">
          <li>The cash is your emergency fund or near-term spending money.</li>
          <li>You want to add or withdraw without watching a maturity calendar.</li>
          <li>You expect to move money often between checking and savings.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">A practical hybrid</h2>
        <p className="text-gray-300 leading-relaxed">
          Keep three to six months of expenses in savings. Put dated goals—tax payment, vacation,
          down payment—into CDs sized to those dates. If you worry about penalties, read{" "}
          <Link href="/blog/cd-early-withdrawal-penalty" className="text-accent hover:underline">
            CD early withdrawal penalties
          </Link>{" "}
          and{" "}
          <Link href="/blog/no-penalty-cds" className="text-accent hover:underline">
            no-penalty CDs
          </Link>{" "}
          before you open anything.
        </p>
      </section>

      <FaqSection items={faqs} />

      <section className="mt-12 rounded-2xl border border-accent/30 bg-secondary p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Run the CD numbers</h2>
        <p className="text-gray-300 mb-6">
          Estimate maturity value on the CD side, then decide whether liquidity is worth a variable savings APY.
        </p>
        <CtaButton href="/#calculator">OPEN CD CALCULATOR</CtaButton>
      </section>
    </div>
  );
}
