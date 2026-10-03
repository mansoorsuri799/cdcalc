import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import CtaButton from "@/components/CtaButton";
import { OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const title = "CD Early Withdrawal Penalty Explained";
const description =
  "Learn how CD early withdrawal penalties work, typical interest-month formulas, and when breaking a certificate of deposit can still be rational.";
const slug = "cd-early-withdrawal-penalty";
const datePublished = "2026-10-04";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_ORIGIN}/blog/${slug}` },
  openGraph: {
    title,
    description,
    url: `${SITE_ORIGIN}/blog/${slug}`,
    siteName: SITE_NAME,
    type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
  },
};

export default function EarlyWithdrawalPage() {
  return (
    <article className="container mx-auto px-4 py-10 max-w-3xl">
      <BlogPostSchema
        title={title}
        description={description}
        slug={slug}
        datePublished={datePublished}
        image={`${SITE_ORIGIN}${OG_IMAGE}`}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Early Withdrawal Penalty" },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-sm text-gray-500 mb-8">Updated {datePublished} · 8 min read</p>

      <p className="text-gray-300 leading-relaxed mb-6">
        Traditional certificates of deposit trade liquidity for a fixed rate. If you cash out before
        maturity, most banks and credit unions charge an early withdrawal penalty—usually measured in
        months of interest. Understanding that cost helps you decide whether to wait, break the CD, or
        choose a more flexible product next time.
      </p>

      <h2 className="text-2xl font-bold text-accent mb-3">How penalties are usually calculated?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        Disclosures often phrase the fee as “90 days of interest” or “180 days of interest” on the
        amount withdrawn. Shorter CDs tend to use smaller penalties; multi-year CDs often use larger
        ones. Some institutions apply simple interest on the principal for the stated number of days,
        even if your CD compounds more frequently.
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        Always read the specific account agreement. Penalty formulas are not standardized across
        banks, and promotional CDs can differ from standard menus.
      </p>

      <h2 className="text-2xl font-bold text-accent mb-3">What the penalty does not always cover?</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
        <li>Some banks may dip into principal if accrued interest is not enough to cover the fee.</li>
        <li>Partial withdrawals may be limited or unavailable.</li>
        <li>Brokered CDs sold before maturity follow market pricing, not a bank interest-month penalty.</li>
      </ul>

      <h2 className="text-2xl font-bold text-accent mb-3">When breaking a CD can still make sense?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        If you need cash for an emergency and have no cheaper source, paying the penalty can be the
        least-bad option. Occasionally, a much higher rate elsewhere can outweigh the fee after you
        model both paths—but run the math carefully and include taxes on interest already earned.
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        Use the{" "}
        <Link href="/#calculator" className="text-accent hover:underline">
          CD calculator
        </Link>{" "}
        to estimate remaining interest if you hold to maturity, then subtract the disclosed penalty
        from any early-exit scenario.
      </p>

      <h2 className="text-2xl font-bold text-accent mb-3">Ways to reduce the risk next time</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
        <li>
          Build a{" "}
          <Link href="/cd-ladder" className="text-accent hover:underline">
            CD ladder
          </Link>{" "}
          so cash matures on a schedule.
        </li>
        <li>
          Keep emergency funds in savings, not long CDs—see{" "}
          <Link href="/cd-vs-savings-account" className="text-accent hover:underline">
            CD vs high-yield savings
          </Link>
          .
        </li>
        <li>
          Consider a{" "}
          <Link href="/blog/no-penalty-cds" className="text-accent hover:underline">
            no-penalty CD
          </Link>{" "}
          when flexibility matters more than the top advertised APY.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-accent mb-3">Checklist before you open</h2>
      <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-8">
        <li>Find the early withdrawal section in the deposit agreement.</li>
        <li>Note whether the penalty can invade principal.</li>
        <li>Confirm grace-period rules at maturity.</li>
        <li>Match the term to a date you truly will not need the money.</li>
      </ol>

      <div className="rounded-2xl border border-accent/30 bg-secondary p-6 text-center">
        <p className="text-gray-300 mb-4">
          Estimate what holding to maturity is worth before you decide to break a CD.
        </p>
        <CtaButton href="/#calculator">OPEN CD CALCULATOR</CtaButton>
      </div>
    </article>
  );
}
