import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import CdCalculator from "@/components/CdCalculator";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { WEB_APPLICATION_JSON_LD } from "@/lib/appFacts";
import { imageObjectLicensing } from "@/lib/schemaImageLicensing";
import {
  BRAND_FORMULA,
  BRAND_FREQUENCY,
  BRAND_GROWTH,
  BRAND_HERO,
  BRAND_HOW_IT_WORKS,
  BRAND_LOGO,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_RATING,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    default: "Free CD Calculator — Estimate Certificate of Deposit Earnings",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Use our free CD calculator to project certificate of deposit maturity value, interest earned, APY or APR compounding, and after-tax estimates before you lock in a term.",
  alternates: { canonical: SITE_ORIGIN },
  openGraph: {
    title: "Free CD Calculator — Estimate Certificate of Deposit Earnings",
    description:
      "Project CD balances with compounding options, tax impact, and a clear maturity schedule.",
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "CD Calculator homepage tool preview",
      },
    ],
  },
};

const faqs = [
  {
    question: "How does this CD calculator work?",
    answer:
      "Enter your initial deposit, interest rate, compounding frequency, and term length in years and months. The tool compounds growth to maturity, shows total interest, estimates after-tax interest using your marginal tax rate, and builds monthly and annual schedules.",
  },
  {
    question: "Should I enter APY or APR?",
    answer:
      "Choose Annually (APY) when the bank advertises an annual percentage yield—the rate already includes compounding. Choose Monthly, Daily, or another frequency when you have a nominal APR and need the calculator to compound that rate for you.",
  },
  {
    question: "Are CD earnings taxable?",
    answer:
      "Yes. Interest from CDs held in taxable accounts is generally taxed as ordinary income in the year it is credited or paid. Our after-tax estimate applies your marginal rate to interest only; it is educational, not tax advice.",
  },
  {
    question: "What is a certificate of deposit?",
    answer:
      "A CD is a timed deposit at a bank or credit union. You agree to leave money for a fixed term in exchange for a stated rate. Many U.S. bank CDs are FDIC-insured up to applicable limits; credit union share certificates are typically NCUA-insured.",
  },
  {
    question: "What happens if I withdraw early?",
    answer:
      "Most traditional CDs charge an early withdrawal penalty, often measured in months of interest. No-penalty CDs are an exception. Read our guide on early withdrawal penalties before breaking a term.",
  },
];

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/`,
        name: SITE_NAME,
        description:
          "Free CD calculator with APY/APR compounding, tax estimates, and maturity schedules.",
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_ORIGIN}/#webpage`,
        url: `${SITE_ORIGIN}/`,
        name: "Free CD Calculator — Estimate Certificate of Deposit Earnings",
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_ORIGIN}${BRAND_LOGO}`,
          width: 512,
          height: 512,
          ...imageObjectLicensing,
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_ORIGIN}/#organization`,
        name: SITE_NAME,
        url: `${SITE_ORIGIN}/`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_ORIGIN}${BRAND_LOGO}`,
          width: 512,
          height: 512,
          ...imageObjectLicensing,
        },
      },
      {
        ...WEB_APPLICATION_JSON_LD,
        "@id": `${SITE_ORIGIN}/#webapp`,
      },
      {
        "@type": "HowTo",
        name: "How to use the CD Calculator",
        description:
          "Estimate your certificate of deposit maturity value and interest in a few steps.",
        step: [
          {
            "@type": "HowToStep",
            name: "Enter your deposit",
            text: "Add the initial amount you plan to place in the CD.",
          },
          {
            "@type": "HowToStep",
            name: "Set rate and compounding",
            text: "Enter the advertised APY or APR and choose how often interest compounds.",
          },
          {
            "@type": "HowToStep",
            name: "Choose the term",
            text: "Set years and months until maturity.",
          },
          {
            "@type": "HowToStep",
            name: "Review results",
            text: "Read the end balance, interest earned, after-tax estimate, chart, and schedule.",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="container mx-auto px-3 pt-4 pb-16 sm:px-4 sm:pt-6 md:pt-10 lg:max-w-7xl">
        <section className="mb-10 md:mb-14">
          <div className="mb-4 max-w-3xl sm:mb-6 lg:mb-8">
            <h1 className="text-[1.65rem] font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              CD Calculator
            </h1>
            <p className="mt-2 text-sm leading-snug text-gray-300 sm:mt-3 sm:text-base md:text-lg">
              Estimate certificate of deposit earnings to maturity. Free compounding options, tax
              impact, and a clear schedule—no signup required.
            </p>
            <p className="mt-1.5 hidden text-sm text-gray-400 sm:flex sm:items-center sm:gap-1.5 sm:flex-wrap">
              <span>{SITE_RATING.ratingValue}</span>
              <span className="tracking-tight text-amber-400" aria-hidden="true">
                ★★★★☆
              </span>
              <span>({Number(SITE_RATING.ratingCount).toLocaleString()}) · Free · Web · Finance</span>
            </p>
          </div>

          <CdCalculator />
        </section>

        <article className="max-w-4xl">
          <section id="what-is-cd-calculator" className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">
              What a CD calculator helps you decide?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              A certificate of deposit locks money for a fixed term in exchange for a stated rate.
              This CD calculator turns deposit size, APY or APR, compounding, and term length into a
              practical maturity projection so you can compare offers before you commit.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Unlike many bank widgets that only show one ending balance, our tool also estimates
              after-tax interest, charts accumulation over the term, and builds monthly and annual
              schedules you can scan side by side.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Use it when you are choosing between term lengths, shopping APYs, or deciding whether a
              CD fits better than a high-yield savings account for money you will not need soon.
            </p>
          </section>

          <section id="cd-formula" className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">
              CD calculator formula
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              For discrete compounding, maturity value is calculated as{" "}
              <span className="text-white font-medium">FV = P × (1 + r/n)^(n×t)</span>, where P is
              the deposit, r is the annual rate as a decimal, n is compounds per year, and t is years.
              Continuous compounding uses <span className="text-white font-medium">FV = P × e^(r×t)</span>.
              In Annually (APY) mode, the rate is treated as an effective yearly yield.
            </p>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-secondary">
              <Image
                src={BRAND_FORMULA}
                alt="CD interest formula visual showing how maturity balance is calculated"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          </section>

          <section id="how-to-use" className="mb-14">
            <h2 className="mb-12 text-2xl font-bold text-accent md:mb-16 md:text-3xl">
              How to use this CD calculator?
            </h2>

            <ol className="relative">
              {(
                [
                  {
                    step: "01",
                    title: "Enter your initial deposit",
                    body: "Start with the amount you plan to put into the CD on day one.",
                    icon: (
                      <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-[1.15rem] md:w-[1.15rem]" fill="none" aria-hidden="true">
                        <rect x="3.5" y="6.5" width="17" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="16" cy="14.25" r="1.15" fill="currentColor" />
                      </svg>
                    ),
                  },
                  {
                    step: "02",
                    title: "Set rate and compounding",
                    body: "Use Annually (APY) for advertised yields, or pick monthly, daily, or continuous when you have a nominal APR.",
                    icon: (
                      <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-[1.15rem] md:w-[1.15rem]" fill="none" aria-hidden="true">
                        <path d="M4.5 16.25 9 11.75l3.5 3.5 7-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.25 7.25h4.25v4.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ),
                  },
                  {
                    step: "03",
                    title: "Choose the term",
                    body: "Combine years and months to match common CD terms such as 6 months, 12 months, or 5 years.",
                    icon: (
                      <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-[1.15rem] md:w-[1.15rem]" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M12 8v4.25l2.75 1.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ),
                  },
                  {
                    step: "04",
                    title: "Review maturity results",
                    body: "Compare end balance, interest, after-tax estimate, chart, and the full accumulation schedule.",
                    icon: (
                      <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-[1.15rem] md:w-[1.15rem]" fill="none" aria-hidden="true">
                        <rect x="5" y="3.75" width="14" height="16.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    ),
                  },
                ] as const
              ).map((item, index, list) => (
                <li
                  key={item.step}
                  className="relative flex items-start gap-4 pb-12 last:pb-0 md:gap-6 md:pb-16"
                >
                  <div className="relative flex w-12 flex-shrink-0 flex-col items-center md:w-14">
                    {index < list.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-10 bottom-[-3rem] w-px -translate-x-1/2 bg-accent/45 md:top-11 md:bottom-[-4rem]"
                      />
                    ) : null}
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-primary text-accent md:h-11 md:w-11">
                      {item.icon}
                    </span>
                    <span className="relative z-10 mt-2 bg-primary px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent md:text-[11px]">
                      Step {item.step}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1 pt-1.5 md:pt-2">
                    <h3 className="text-lg font-bold leading-snug tracking-tight text-white md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-zinc-400 md:text-[15px]">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="compounding" className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">
              Why compounding frequency matters?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Two CDs with the same advertised number can pay differently if one quotes APY and the
              other quotes a nominal APR with monthly or daily compounding. More frequent compounding
              earns slightly more interest when the rate is an APR.
            </p>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-secondary mb-4">
              <Image
                src={BRAND_FREQUENCY}
                alt="Illustration comparing CD compounding frequency options and APY impact"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              For a deeper walkthrough of rate labels, see{" "}
              <Link href="/blog/apy-vs-apr-for-cds" className="text-accent hover:underline">
                APY vs APR for CDs
              </Link>
              . For product basics, start with{" "}
              <Link href="/how-cds-work" className="text-accent hover:underline">
                how CDs work
              </Link>
              .
            </p>
          </section>

          <section id="cd-vs-savings" className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">
              When a CD beats a savings account?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              CDs shine when you can leave money untouched until maturity and want a fixed rate. High-yield
              savings accounts win when you need liquidity or expect rates to move. Run both scenarios
              with realistic terms before you choose.
            </p>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-secondary mb-4">
              <Image
                src={BRAND_GROWTH}
                alt="Chart showing certificate of deposit interest growth to maturity"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              Compare the tradeoffs in our{" "}
              <Link href="/cd-vs-savings-account" className="text-accent hover:underline">
                CD vs high-yield savings guide
              </Link>
              , or learn how to stagger maturities with a{" "}
              <Link href="/cd-ladder" className="text-accent hover:underline">
                CD ladder
              </Link>
              .
            </p>
          </section>

          <section id="who-should-use" className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">
              Who should use a CD?
            </h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {[
                "Savers with a known spending date (home down payment, tuition, car) a few months to a few years away",
                "People who want FDIC or NCUA insurance and a fixed rate instead of market volatility",
                "Retirees parking cash they will need on a schedule",
                "Anyone building a CD ladder to blend yield with periodic liquidity",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-slate-700 bg-secondary p-4 text-gray-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="assumptions" className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">
              Assumptions and limitations
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Projections assume a fixed rate for the full term, no additional deposits, and no early
              withdrawal. Real banks may use different day-count conventions, credit interest on
              specific cycles, or change promotional APYs. Tax estimates ignore state taxes, NIIT, and
              account wrappers such as IRAs.
            </p>
            <div className="relative w-full max-w-2xl aspect-video mx-auto rounded-xl overflow-hidden border border-white/10 bg-secondary mb-4">
              <Image
                src={BRAND_HERO}
                alt="CD Calculator hero showing balance at maturity with compound interest growth"
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
            </div>
            <div className="relative w-full max-w-2xl aspect-video mx-auto rounded-xl overflow-hidden border border-white/10 bg-secondary">
              <Image
                src={BRAND_HOW_IT_WORKS}
                alt="Four-step guide showing how a certificate of deposit works from deposit to maturity"
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
            </div>
          </section>

          <FaqSection items={faqs} />

          <section className="mt-16 rounded-2xl border border-accent/30 bg-secondary p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to compare CD offers?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Scroll back to the tool, adjust deposit and term, and see how compounding changes your
              maturity value before you open an account.
            </p>
            <CtaButton href="/#calculator" ariaLabel="Jump to CD calculator">
              BACK TO CALCULATOR
            </CtaButton>
          </section>
        </article>
      </div>
    </>
  );
}
