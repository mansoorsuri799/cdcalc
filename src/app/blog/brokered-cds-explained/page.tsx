import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import CtaButton from "@/components/CtaButton";
import { OG_IMAGE, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

const title = "Brokered CDs Explained";
const description =
  "Understand brokered CDs versus bank CDs: how they are purchased, FDIC coverage basics, call features, and secondary-market liquidity.";
const slug = "brokered-cds-explained";
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

export default function BrokeredCdsPage() {
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
          { label: "Brokered CDs" },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-sm text-gray-500 mb-8">Updated {datePublished} · 9 min read</p>

      <p className="text-gray-300 leading-relaxed mb-6">
        Brokered CDs are certificates of deposit issued by banks but bought through a brokerage
        platform. They can make it easier to shop many issuers in one account—and to spread deposits
        for insurance limits—but they do not behave exactly like the CD you open at your local branch.
      </p>

      <h2 className="text-2xl font-bold text-accent mb-3">Bank CD vs brokered CD</h2>
      <div className="overflow-x-auto rounded-xl border border-slate-700 mb-6">
        <table className="min-w-full text-sm">
          <thead className="bg-secondary text-left text-gray-300">
            <tr>
              <th className="px-4 py-3 font-semibold">Topic</th>
              <th className="px-4 py-3 font-semibold">Bank / credit union CD</th>
              <th className="px-4 py-3 font-semibold">Brokered CD</th>
            </tr>
          </thead>
          <tbody className="text-gray-200">
            {[
              ["Where you buy", "Directly at the institution", "Through a brokerage"],
              ["Early exit", "Bank penalty if allowed", "Sell on secondary market (price can vary)"],
              ["Call features", "Less common on retail CDs", "Some issues are callable by the bank"],
              ["Auto-renew", "Often yes after grace period", "Typically no auto-renew into a new CD"],
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

      <h2 className="text-2xl font-bold text-accent mb-3">Insurance still matters</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Brokered CDs are often issued by FDIC-insured banks. Coverage depends on the issuing bank and
        ownership category—not on the brokerage brand alone. Holding CDs from many issuers in one
        brokerage account can help you stay within limits more conveniently than opening many bank
        relationships.
      </p>

      <h2 className="text-2xl font-bold text-accent mb-3">Secondary market reality</h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        If you need out early, you generally sell the brokered CD to another investor. Prices move
        with interest rates: if rates rise, an older lower-yielding CD may sell below face value. That
        market loss can exceed a traditional bank early-withdrawal penalty.
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        Plan to hold to maturity unless you understand bid/ask spreads and rate risk. For penalty
        mechanics on direct bank CDs, see{" "}
        <Link href="/blog/cd-early-withdrawal-penalty" className="text-accent hover:underline">
          early withdrawal penalties
        </Link>
        .
      </p>

      <h2 className="text-2xl font-bold text-accent mb-3">Call risk and yield shopping</h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Some brokered CDs are callable, meaning the issuer can redeem early when it benefits them—
        often when rates fall. A higher yield may compensate for that risk, but it is not the same as
        a non-callable bank CD you can simply hold for the full term.
      </p>

      <h2 className="text-2xl font-bold text-accent mb-3">How to use the calculator with brokered CDs?</h2>
      <p className="text-gray-300 leading-relaxed mb-8">
        For a new-issue brokered CD held to maturity, enter the deposit, coupon/APY details as
        disclosed, and term in the{" "}
        <Link href="/#calculator" className="text-accent hover:underline">
          CD calculator
        </Link>
        . Do not treat a secondary-market purchase price as a simple bank deposit without adjusting
        for premium or discount.
      </p>

      <div className="rounded-2xl border border-accent/30 bg-secondary p-6 text-center">
        <p className="text-gray-300 mb-4">
          Model hold-to-maturity interest before you compare brokered offers.
        </p>
        <CtaButton href="/#calculator">OPEN CD CALCULATOR</CtaButton>
      </div>
    </article>
  );
}
