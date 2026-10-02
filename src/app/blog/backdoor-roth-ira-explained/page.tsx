import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const title = "Backdoor Roth IRA Explained for High Earners";
const description =
  "Learn how the backdoor Roth IRA works, who uses it, pro-rata tax traps, and the basic contribution-then-convert sequence.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_ORIGIN}/blog/backdoor-roth-ira-explained` },
  openGraph: {
    title,
    description,
    url: `${SITE_ORIGIN}/blog/backdoor-roth-ira-explained`,
    siteName: SITE_NAME,
    type: "article",
  },
};

const faqs = [
  {
    question: "Is a backdoor Roth IRA legal?",
    answer:
      "Yes. It uses two legal steps: a nondeductible Traditional IRA contribution and a Roth conversion. Tax reporting still matters, especially Form 8606.",
  },
  {
    question: "What is the pro-rata rule?",
    answer:
      "If you hold pre-tax Traditional IRA money anywhere, conversions are taxed proportionally across all IRA balances—not only the nondeductible slice you just added.",
  },
];

export default function BackdoorRothPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <BlogPostSchema
        title={title}
        description={description}
        slug="backdoor-roth-ira-explained"
        datePublished="2026-10-03"
        articleBody={description}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Backdoor Roth IRA" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-gray-400 text-sm mb-8">Updated October 3, 2026 · 9 min read</p>

      <div className="space-y-5 text-gray-300 leading-relaxed">
        <p>
          A backdoor Roth IRA is a nickname for a funding method, not a special account type. When
          MAGI is too high for a direct Roth contribution, savers may contribute to a Traditional IRA
          on a nondeductible basis and then convert those dollars to a Roth IRA.
        </p>
        <h2 className="text-2xl font-bold text-accent pt-4">Who typically uses it?</h2>
        <p>
          High earners who fail the{" "}
          <Link href="/roth-ira-eligibility" className="text-accent hover:underline">
            Roth IRA income limits
          </Link>{" "}
          still want tax-free growth and tax-free qualified withdrawals. The strategy is also used by
          dual-income households that land in the phase-out range mid-year after bonuses or RSUs.
        </p>
        <h2 className="text-2xl font-bold text-accent pt-4">Basic sequence</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Confirm you have earned income and room under the annual IRA contribution limit.</li>
          <li>Make a nondeductible contribution to a Traditional IRA.</li>
          <li>Convert that amount to a Roth IRA, ideally before large gains accrue.</li>
          <li>File Form 8606 and keep basis records.</li>
        </ol>
        <h2 className="text-2xl font-bold text-accent pt-4">Watch the pro-rata trap</h2>
        <p>
          Existing pre-tax IRA balances can make part of the conversion taxable even if the new
          contribution was nondeductible. Some people roll pre-tax IRA money into a workplace plan
          first (when allowed) to simplify the math. This is highly fact-specific—get tax help before
          moving large balances.
        </p>
        <h2 className="text-2xl font-bold text-accent pt-4">Model the long-term benefit</h2>
        <p>
          Once dollars are in the Roth, growth can compound without annual tax drag. Use the{" "}
          <Link href="/#calculator" className="text-accent hover:underline">
            Roth IRA calculator
          </Link>{" "}
          to compare a Roth path with a taxable account after you estimate conversion costs.
        </p>
      </div>

      <FaqSection items={faqs} />
      <div className="mt-10">
        <CtaButton href="/#calculator">OPEN CALCULATOR</CtaButton>
      </div>
    </div>
  );
}
