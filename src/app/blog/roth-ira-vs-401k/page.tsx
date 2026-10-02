import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const title = "Roth IRA vs 401(k): Where Should Extra Savings Go?";
const description =
  "Compare Roth IRA and 401(k) contribution limits, employer matches, investment choice, and tax treatment to prioritize retirement dollars.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_ORIGIN}/blog/roth-ira-vs-401k` },
  openGraph: {
    title,
    description,
    url: `${SITE_ORIGIN}/blog/roth-ira-vs-401k`,
    siteName: SITE_NAME,
    type: "article",
  },
};

const faqs = [
  {
    question: "Should I contribute to a Roth IRA or 401(k) first?",
    answer:
      "Many people capture any 401(k) match first, then fund a Roth IRA for investment flexibility, then return to the 401(k) for higher contribution room.",
  },
  {
    question: "Can I have both?",
    answer:
      "Yes. You can contribute to a workplace 401(k) and a Roth IRA in the same year if you meet each account’s rules.",
  },
];

export default function RothVs401kPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <BlogPostSchema
        title={title}
        description={description}
        slug="roth-ira-vs-401k"
        datePublished="2026-10-03"
        articleBody={description}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Roth IRA vs 401(k)" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-gray-400 text-sm mb-8">Updated October 3, 2026 · 8 min read</p>

      <div className="space-y-5 text-gray-300 leading-relaxed">
        <p>
          Roth IRAs and 401(k) plans are complementary, not rivals. The better “next dollar” depends
          on employer matching, fees, investment menus, and whether you want Roth or pre-tax treatment.
        </p>
        <h2 className="text-2xl font-bold text-accent pt-4">Contribution room</h2>
        <p>
          Workplace 401(k) plans allow much larger annual deferrals than IRAs. Roth IRAs have lower
          caps but often broader investment choice and easier penalty-free access to contributions.
          See current IRA caps on our{" "}
          <Link href="/roth-ira-contribution-limits" className="text-accent hover:underline">
            contribution limits page
          </Link>
          .
        </p>
        <h2 className="text-2xl font-bold text-accent pt-4">Employer match comes first</h2>
        <p>
          A match is an immediate return few investments can beat. Contribute enough to the 401(k) to
          earn the full match before maximizing an IRA, unless your plan is unusually restrictive or
          expensive.
        </p>
        <h2 className="text-2xl font-bold text-accent pt-4">Tax treatment choices</h2>
        <p>
          A Roth 401(k) and Roth IRA both use after-tax contributions for tax-free qualified growth.
          A traditional 401(k) lowers taxable income now. Compare IRA-level tradeoffs in{" "}
          <Link href="/roth-vs-traditional-ira" className="text-accent hover:underline">
            Roth vs Traditional IRA
          </Link>
          , then project IRA compounding with the{" "}
          <Link href="/#calculator" className="text-accent hover:underline">
            Roth IRA calculator
          </Link>
          .
        </p>
      </div>

      <FaqSection items={faqs} />
      <div className="mt-10">
        <CtaButton href="/#calculator">RUN THE ROTH PROJECTION</CtaButton>
      </div>
    </div>
  );
}
