import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const title = "Roth IRA 5-Year Rule and Withdrawal Basics";
const description =
  "Understand Roth IRA withdrawal ordering, the five-year rule for earnings, and when qualified distributions become tax-free.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_ORIGIN}/blog/roth-ira-5-year-rule` },
  openGraph: {
    title,
    description,
    url: `${SITE_ORIGIN}/blog/roth-ira-5-year-rule`,
    siteName: SITE_NAME,
    type: "article",
  },
};

const faqs = [
  {
    question: "Can I withdraw Roth contributions anytime?",
    answer:
      "Yes. Contributions (your after-tax deposits) can generally be withdrawn tax- and penalty-free at any age. Earnings follow stricter rules.",
  },
  {
    question: "Do conversions have their own five-year clocks?",
    answer:
      "Converted amounts can have separate five-year periods for penalty purposes. Track each conversion year carefully if you may need the money early.",
  },
];

export default function FiveYearRulePage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <BlogPostSchema
        title={title}
        description={description}
        slug="roth-ira-5-year-rule"
        datePublished="2026-10-03"
        articleBody={description}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "5-Year Rule" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-gray-400 text-sm mb-8">Updated October 3, 2026 · 8 min read</p>

      <div className="space-y-5 text-gray-300 leading-relaxed">
        <p>
          Roth IRAs are flexible, but “tax-free” does not mean “rule-free.” Contributions come out
          first and are usually accessible anytime. Earnings become qualified—and tax-free—only when
          distribution rules and a five-year period are both satisfied.
        </p>
        <h2 className="text-2xl font-bold text-accent pt-4">The earnings five-year clock</h2>
        <p>
          For tax-free earnings, your Roth IRA must generally satisfy a five-year aging period that
          starts with your first contribution to any Roth IRA, and you typically need a qualifying
          reason such as being age 59½, disability, or a first-home exception (with limits).
        </p>
        <h2 className="text-2xl font-bold text-accent pt-4">Why this matters for projections?</h2>
        <p>
          The{" "}
          <Link href="/#calculator" className="text-accent hover:underline">
            Roth IRA calculator
          </Link>{" "}
          shows ending balances assuming qualified use in retirement. If you plan early access, model
          a lower spendable amount for the earnings portion and keep a cash emergency fund outside the
          IRA.
        </p>
        <h2 className="text-2xl font-bold text-accent pt-4">Ordering rules in plain English</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Contributions come out first.</li>
          <li>Conversions come out next (with possible penalty clocks).</li>
          <li>Earnings come out last and are the most restricted.</li>
        </ul>
        <p>
          Before taking money out, compare your plan with{" "}
          <Link href="/roth-vs-traditional-ira" className="text-accent hover:underline">
            Roth vs Traditional IRA
          </Link>{" "}
          withdrawal tax treatment so you do not create an avoidable tax bill.
        </p>
      </div>

      <FaqSection items={faqs} />
      <div className="mt-10">
        <CtaButton href="/#calculator">PROJECT A RETIREMENT BALANCE</CtaButton>
      </div>
    </div>
  );
}
