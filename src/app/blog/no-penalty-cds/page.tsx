import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import CtaButton from "@/components/CtaButton";
import { OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const title = "No-Penalty CDs: Flexible Rate Locks";
const description =
  "Learn how no-penalty CDs work, typical waiting periods before withdrawal, rate tradeoffs, and when they beat traditional CDs or savings accounts.";
const slug = "no-penalty-cds";
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

export default function NoPenaltyCdsPage() {
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
          { label: "No-Penalty CDs" },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-sm text-gray-500 mb-8">Updated {datePublished} · 7 min read</p>

      <p className="text-gray-300 leading-relaxed mb-6">
        No-penalty CDs aim for a middle ground: a fixed rate like a traditional CD, with the option
        to withdraw before maturity without the usual interest-month fee. The flexibility often comes
        with a lower APY than the best standard CDs, so you should model both paths before you choose.
      </p>

      <h2 className="text-2xl font-bold text-accent mb-3">How no-penalty CDs typically work?</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        You open the CD at a stated APY and term. After a short waiting period—commonly around a week—
        many issuers let you withdraw the full balance without an early withdrawal penalty. Partial
        withdrawals may be restricted; some products require a full closeout.
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        Rules vary by bank. Confirm the waiting period, minimum balance, and whether interest already
        paid is recalculated if you leave early.
      </p>

      <h2 className="text-2xl font-bold text-accent mb-3">When a no-penalty CD fits?</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
        <li>You want a rate lock but might need the cash if plans change.</li>
        <li>Savings APYs are volatile and you prefer a fixed quote for a while.</li>
        <li>You are between decisions and do not want a traditional CD penalty hanging over you.</li>
      </ul>

      <h2 className="text-2xl font-bold text-accent mb-3">When to skip them?</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        If you are certain you can hold to maturity, a standard CD or{" "}
        <Link href="/cd-ladder" className="text-accent hover:underline">
          CD ladder
        </Link>{" "}
        often pays more. If you need constant add/withdraw access, a{" "}
        <Link href="/cd-vs-savings-account" className="text-accent hover:underline">
          high-yield savings account
        </Link>{" "}
        is usually simpler. For penalty details on traditional products, see{" "}
        <Link href="/blog/cd-early-withdrawal-penalty" className="text-accent hover:underline">
          early withdrawal penalties
        </Link>
        .
      </p>

      <h2 className="text-2xl font-bold text-accent mb-3">How to compare with the calculator?</h2>
      <p className="text-gray-300 leading-relaxed mb-8">
        Enter the no-penalty APY and term in the{" "}
        <Link href="/#calculator" className="text-accent hover:underline">
          CD calculator
        </Link>
        , then run the same deposit against a higher traditional CD APY. The gap in maturity interest
        is the price of flexibility—decide whether that insurance is worth it for your timeline.
      </p>

      <div className="rounded-2xl border border-accent/30 bg-secondary p-6 text-center">
        <p className="text-gray-300 mb-4">
          Compare no-penalty and traditional CD maturity values before you open either.
        </p>
        <CtaButton href="/#calculator">OPEN CD CALCULATOR</CtaButton>
      </div>
    </article>
  );
}
