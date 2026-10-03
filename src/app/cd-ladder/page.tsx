import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import { BRAND_MATURITY, OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "CD Ladder Guide — How to Build One Step by Step",
  description:
    "Learn how a CD ladder works, why savers stagger maturities, and how to model each rung with a CD calculator before you invest.",
  alternates: { canonical: `${SITE_ORIGIN}/cd-ladder` },
  openGraph: {
    title: "CD Ladder Guide — How to Build One Step by Step",
    description: "Stagger CD maturities for yield and liquidity with a practical ladder plan.",
    url: `${SITE_ORIGIN}/cd-ladder`,
    siteName: SITE_NAME,
    type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "CD ladder strategy guide" }],
  },
};

const faqs = [
  {
    question: "What is a CD ladder?",
    answer:
      "A CD ladder splits one cash pile into several CDs with different maturity dates—such as 6, 12, 18, and 24 months—so money becomes available on a schedule while longer rungs often earn higher rates.",
  },
  {
    question: "How many rungs should I use?",
    answer:
      "Four or five rungs is a common starting point. Choose spacing that matches when you might need cash. Equal dollar amounts keep the plan simple; unequal amounts can match known expenses.",
  },
  {
    question: "Should every rung use the same bank?",
    answer:
      "Not necessarily. Shopping rates can raise yield, and spreading deposits across institutions can help you stay within FDIC or NCUA insurance limits.",
  },
];

export default function CdLadderPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: "CD Ladder", item: `${SITE_ORIGIN}/cd-ladder` },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "CD Ladder" }]} />

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        CD ladder: build yield without locking everything up
      </h1>
      <p className="text-gray-300 text-lg leading-relaxed mb-8">
        A CD ladder is a simple structure: instead of putting all cash into one long CD, you buy
        several CDs that mature on a rolling schedule. You keep access to a portion of your money
        regularly while still capturing longer-term rates on other rungs.
      </p>

      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-secondary mb-10">
        <Image
          src={BRAND_MATURITY}
          alt="Staggered CD maturity timeline illustrating a certificate of deposit ladder"
          fill
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover"
          priority
        />
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">Example 4-rung ladder</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Suppose you have $40,000. You might open four $10,000 CDs: 6-month, 12-month, 18-month, and
          24-month. Every six months a rung matures. You can spend that cash, park it in savings, or
          reinvest into a new 24-month CD at the back of the ladder.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="min-w-full text-sm">
            <thead className="bg-secondary text-left text-gray-300">
              <tr>
                <th className="px-4 py-3 font-semibold">Rung</th>
                <th className="px-4 py-3 font-semibold">Term</th>
                <th className="px-4 py-3 font-semibold">Deposit</th>
                <th className="px-4 py-3 font-semibold">Role</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {[
                ["1", "6 months", "$10,000", "Near-term liquidity"],
                ["2", "12 months", "$10,000", "One-year buffer"],
                ["3", "18 months", "$10,000", "Mid ladder yield"],
                ["4", "24 months", "$10,000", "Longer rate lock"],
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
        <h2 className="text-2xl font-bold text-accent mb-3">How to build your ladder?</h2>
        <ol className="space-y-4 text-gray-300">
          <li className="rounded-xl border border-slate-700 bg-secondary p-4">
            <span className="font-semibold text-white">1. Decide the cash purpose. </span>
            Emergency funds usually stay liquid. Ladder money you can leave alone between maturities.
          </li>
          <li className="rounded-xl border border-slate-700 bg-secondary p-4">
            <span className="font-semibold text-white">2. Pick rung spacing. </span>
            Monthly, quarterly, or semiannual maturities should match bill cycles and comfort with rate changes.
          </li>
          <li className="rounded-xl border border-slate-700 bg-secondary p-4">
            <span className="font-semibold text-white">3. Model each CD. </span>
            Use the{" "}
            <Link href="/#calculator" className="text-accent hover:underline">
              CD calculator
            </Link>{" "}
            for every rung&apos;s deposit, APY, and term so you know the maturity value before you buy.
          </li>
          <li className="rounded-xl border border-slate-700 bg-secondary p-4">
            <span className="font-semibold text-white">4. Reinvest with intent. </span>
            When a rung matures, renew long, shorten the ladder, or move to savings if rates or needs changed.
          </li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">Pros and tradeoffs</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-secondary p-4 text-gray-300">
            <h3 className="font-semibold text-white mb-2">Pros</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Regular access to maturing cash</li>
              <li>Chance to reinvest at new rates</li>
              <li>Less timing risk than one long CD</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-700 bg-secondary p-4 text-gray-300">
            <h3 className="font-semibold text-white mb-2">Tradeoffs</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>More accounts to track</li>
              <li>Shorter rungs may earn less than one long CD</li>
              <li>Early withdrawals still hurt if you break a rung</li>
            </ul>
          </div>
        </div>
      </section>

      <FaqSection items={faqs} />

      <section className="mt-12 rounded-2xl border border-accent/30 bg-secondary p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Model each ladder rung</h2>
        <p className="text-gray-300 mb-6">
          Run the calculator once per CD term, then compare totals before you fund the ladder.
        </p>
        <CtaButton href="/#calculator">OPEN CD CALCULATOR</CtaButton>
      </section>
    </div>
  );
}
