import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import FaqSection from "@/components/FaqSection";
import {
  BRAND_HOW_IT_WORKS,
  BRAND_LADDER,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "How CDs Work — Certificate of Deposit Basics",
  description:
    "Learn how certificates of deposit work: fixed terms, APY, FDIC insurance, maturity options, and when a CD fits your savings plan.",
  alternates: { canonical: `${SITE_ORIGIN}/how-cds-work` },
  openGraph: {
    title: "How CDs Work — Certificate of Deposit Basics",
    description: "A clear guide to CD terms, interest, insurance, and maturity decisions.",
    url: `${SITE_ORIGIN}/how-cds-work`,
    siteName: SITE_NAME,
    type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "How certificates of deposit work" }],
  },
};

const faqs = [
  {
    question: "How does a CD earn interest?",
    answer:
      "You deposit a fixed amount for a set term. The bank pays a stated rate that compounds on a schedule (or is quoted as APY). At maturity you receive principal plus accrued interest, subject to the account terms.",
  },
  {
    question: "Are CDs FDIC insured?",
    answer:
      "CDs from FDIC-insured banks are generally covered up to $250,000 per depositor, per ownership category, per bank. Credit union share certificates are typically covered by NCUA insurance with similar limits.",
  },
  {
    question: "What happens when a CD matures?",
    answer:
      "Banks usually give a grace period to withdraw or change the CD. If you do nothing, many CDs automatically renew into a similar term at the then-current rate—so mark the maturity date on your calendar.",
  },
];

export default function HowCdsWorkPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: "How CDs Work", item: `${SITE_ORIGIN}/how-cds-work` },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "How CDs Work" }]} />

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        How certificates of deposit work?
      </h1>
      <p className="text-gray-300 text-lg leading-relaxed mb-8">
        A CD is a timed deposit: you agree to leave money with a bank or credit union for a fixed
        period, and in return you receive a stated interest rate. This guide explains the moving
        parts so you can use the{" "}
        <Link href="/#calculator" className="text-accent hover:underline">
          CD calculator
        </Link>{" "}
        with confidence.
      </p>

      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-secondary mb-10">
        <Image
          src={BRAND_HOW_IT_WORKS}
          alt="How a CD works: deposit money, lock rate and term, earn interest, then mature"
          fill
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover"
          priority
        />
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">The core tradeoff</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Liquidity is the price of a CD&apos;s fixed rate. Traditional CDs expect you to wait until
          maturity. Break the term early and you usually pay a penalty—often several months of
          interest. That predictability is also the benefit: you know the rate up front, which helps
          planning for a home purchase, tuition bill, or retirement cash buffer.
        </p>
        <p className="text-gray-300 leading-relaxed">
          If you may need the cash sooner, compare a{" "}
          <Link href="/blog/no-penalty-cds" className="text-accent hover:underline">
            no-penalty CD
          </Link>{" "}
          or a{" "}
          <Link href="/cd-vs-savings-account" className="text-accent hover:underline">
            high-yield savings account
          </Link>
          .
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">Key terms to know</h2>
        <ul className="space-y-3 text-gray-300">
          {[
            ["Initial deposit", "The principal you place in the CD on day one."],
            ["Term", "How long the money stays locked—common lengths are 3 months to 5 years."],
            ["APY", "Annual percentage yield; includes the effect of compounding."],
            ["Maturity date", "When you can withdraw without an early withdrawal penalty."],
            ["Grace period", "Short window after maturity to move funds before auto-renewal."],
          ].map(([title, body]) => (
            <li key={title} className="rounded-xl border border-slate-700 bg-secondary p-4">
              <span className="font-semibold text-white">{title}: </span>
              {body}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">From open to maturity</h2>
        <ol className="space-y-4 text-gray-300 list-decimal list-inside">
          <li>Shop APYs, minimum deposits, and compounding disclosures across banks or credit unions.</li>
          <li>Open the CD and fund it with the initial deposit.</li>
          <li>Interest accrues according to the account&apos;s compounding rules.</li>
          <li>At maturity, withdraw, renew, or ladder into a new term.</li>
        </ol>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-secondary mt-6">
          <Image
            src={BRAND_LADDER}
            alt="CD ladder strategy showing staggered maturities after a CD reaches term"
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">Insurance and safety</h2>
        <p className="text-gray-300 leading-relaxed">
          Bank CDs and credit union share certificates sit on the low-risk end of cash products when
          held within insurance limits. Brokered CDs can also be issued by FDIC banks but trade
          through a brokerage—see{" "}
          <Link href="/blog/brokered-cds-explained" className="text-accent hover:underline">
            brokered CDs explained
          </Link>{" "}
          before you buy on the secondary market.
        </p>
      </section>

      <FaqSection items={faqs} />

      <section className="mt-12 rounded-2xl border border-accent/30 bg-secondary p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Estimate your maturity value</h2>
        <p className="text-gray-300 mb-6">
          Plug deposit, rate, and term into the free CD calculator to see interest before you open an account.
        </p>
        <CtaButton href="/#calculator">OPEN CD CALCULATOR</CtaButton>
      </section>
    </div>
  );
}
