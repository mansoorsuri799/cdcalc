import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const title = "How to Open a Roth IRA in 2026";
const description =
  "Step-by-step guide to opening a Roth IRA: pick a provider, verify eligibility, fund the account, and invest contributions.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_ORIGIN}/blog/how-to-open-a-roth-ira` },
  openGraph: {
    title,
    description,
    url: `${SITE_ORIGIN}/blog/how-to-open-a-roth-ira`,
    siteName: SITE_NAME,
    type: "article",
  },
};

const faqs = [
  {
    question: "How long does it take to open a Roth IRA?",
    answer:
      "Most brokerages let you open an account online in minutes. Funding and trade settlement may take one to several business days depending on the transfer method.",
  },
  {
    question: "How much do I need to start?",
    answer:
      "Some providers have no minimum. You can start small and increase toward the annual limit as cash flow allows.",
  },
];

export default function HowToOpenPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <BlogPostSchema
        title={title}
        description={description}
        slug="how-to-open-a-roth-ira"
        datePublished="2026-10-03"
        articleBody={description}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "How to Open a Roth IRA" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-gray-400 text-sm mb-8">Updated October 3, 2026 · 7 min read</p>

      <div className="space-y-5 text-gray-300 leading-relaxed">
        <p>
          Opening a Roth IRA is straightforward once you confirm eligibility and know how much you
          can contribute. Follow these steps, then use our calculator to set a contribution target.
        </p>
        <h2 className="text-2xl font-bold text-accent pt-4">1. Confirm you can contribute</h2>
        <p>
          Check earned income and MAGI against the{" "}
          <Link href="/roth-ira-eligibility" className="text-accent hover:underline">
            Roth IRA eligibility rules
          </Link>
          . If you are phased out, explore a{" "}
          <Link href="/blog/backdoor-roth-ira-explained" className="text-accent hover:underline">
            backdoor Roth
          </Link>{" "}
          with a tax professional.
        </p>
        <h2 className="text-2xl font-bold text-accent pt-4">2. Choose a provider</h2>
        <p>
          Compare brokerage fees, fund/ETF menus, customer support, and automatic contribution tools.
          Low-cost index funds are a common default for long-term Roth investing.
        </p>
        <h2 className="text-2xl font-bold text-accent pt-4">3. Open and fund the account</h2>
        <p>
          Complete the application, link a bank account, and contribute up to the{" "}
          <Link href="/roth-ira-contribution-limits" className="text-accent hover:underline">
            annual limit for your age
          </Link>
          . Label the contribution for the correct tax year if you are funding before the filing deadline.
        </p>
        <h2 className="text-2xl font-bold text-accent pt-4">4. Invest the cash</h2>
        <p>
          Uninvested cash does not build retirement wealth. Pick an allocation that matches your
          timeline, then revisit annually. Project outcomes with the{" "}
          <Link href="/#calculator" className="text-accent hover:underline">
            Roth IRA calculator
          </Link>
          .
        </p>
      </div>

      <FaqSection items={faqs} />
      <div className="mt-10">
        <CtaButton href="/#calculator">SET A CONTRIBUTION TARGET</CtaButton>
      </div>
    </div>
  );
}
