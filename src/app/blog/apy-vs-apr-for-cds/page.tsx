import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import CtaButton from "@/components/CtaButton";
import { OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const title = "APY vs APR for CDs";
const description =
  "Learn the difference between APY and APR on certificates of deposit, why compounding changes earnings, and which rate to enter in a CD calculator.";
const slug = "apy-vs-apr-for-cds";
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

export default function ApyVsAprPage() {
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
          { label: "APY vs APR" },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-sm text-gray-500 mb-8">Updated {datePublished} · 7 min read</p>

      <p className="text-gray-300 leading-relaxed mb-6">
        Banks advertise CD yields with precise language for a reason. APY and APR are not the same
        number, and mixing them up can understate or overstate what you earn by maturity. This guide
        shows how to read each label and how to enter it correctly in our{" "}
        <Link href="/#calculator" className="text-accent hover:underline">
          CD calculator
        </Link>
        .
      </p>

      <h2 className="text-2xl font-bold text-accent mb-3">APY in plain English</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Annual percentage yield already includes the effect of compounding over a year. If a CD
        advertises 4.50% APY, that is the effective yearly growth rate assuming you leave interest in
        the account under the stated compounding rules. When shopping products, APY is usually the
        fairest apples-to-apples comparison.
      </p>

      <h2 className="text-2xl font-bold text-accent mb-3">APR / interest rate</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        A nominal annual percentage rate (sometimes shown as “interest rate”) does not by itself tell
        you how often interest is added. Monthly or daily compounding on the same APR produces a
        higher APY. That is why two CDs with identical APR figures can pay different amounts if their
        compounding schedules differ.
      </p>

      <h2 className="text-2xl font-bold text-accent mb-3">Which value to enter in the calculator?</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
        <li>
          <span className="text-white font-medium">Have an APY?</span> Choose{" "}
          <span className="text-white">Annually (APY)</span> and enter that yield.
        </li>
        <li>
          <span className="text-white font-medium">Have a nominal APR plus compounding frequency?</span>{" "}
          Select monthly, daily, or the matching option and enter the APR.
        </li>
        <li>
          <span className="text-white font-medium">Unsure?</span> Prefer the APY from the Truth in
          Savings disclosure—it is designed for consumer comparison.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-accent mb-3">Quick example</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        A 4.40% APR compounded monthly produces an APY a bit above 4.40%. Entering 4.40% in APY mode
        would slightly understate earnings compared with modeling the true monthly APR path. Matching
        the label to the compounding mode keeps the maturity estimate honest.
      </p>

      <h2 className="text-2xl font-bold text-accent mb-3">Related decisions</h2>
      <p className="text-gray-300 leading-relaxed mb-8">
        Once rates are comparable, decide whether you need liquidity or a lock. Compare products in{" "}
        <Link href="/cd-vs-savings-account" className="text-accent hover:underline">
          CD vs high-yield savings
        </Link>{" "}
        and review basics in{" "}
        <Link href="/how-cds-work" className="text-accent hover:underline">
          how CDs work
        </Link>
        .
      </p>

      <div className="rounded-2xl border border-accent/30 bg-secondary p-6 text-center">
        <p className="text-gray-300 mb-4">
          Enter APY or APR correctly and see the maturity difference instantly.
        </p>
        <CtaButton href="/#calculator">OPEN CD CALCULATOR</CtaButton>
      </div>
    </article>
  );
}
