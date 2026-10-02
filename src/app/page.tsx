import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import RothIraCalculator from "@/components/RothIraCalculator";
import FaqSection from "@/components/FaqSection";
import CtaButton from "@/components/CtaButton";
import { WEB_APPLICATION_JSON_LD } from "@/lib/appFacts";
import { imageObjectLicensing } from "@/lib/schemaImageLicensing";
import {
  BRAND_CONTRIBUTIONS,
  BRAND_GROWTH,
  BRAND_HERO,
  BRAND_LOGO,
  IRA_LIMITS_2026,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_RATING,
  TAX_YEAR,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    default: "Roth IRA Calculator (2026)",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Use our free Roth IRA calculator to project tax-free retirement growth, compare a taxable account, and check 2026 contribution and income limits before you contribute.",
  alternates: { canonical: SITE_ORIGIN },
  openGraph: {
    title: "Roth IRA Calculator (2026)",
    description:
      "Project Roth IRA balances, see contribution eligibility, and compare tax-free growth vs a taxable account.",
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Roth IRA Calculator homepage tool preview",
      },
    ],
  },
};

const faqs = [
  {
    question: "How does this Roth IRA calculator work?",
    answer:
      "Enter your age, retirement age, current balance, annual contribution, expected return, tax rate, filing status, and MAGI. The tool compounds growth annually, applies 2026 contribution caps after income phase-outs, and compares the Roth path with a taxable account using after-tax returns.",
  },
  {
    question: `What is the Roth IRA contribution limit for ${TAX_YEAR}?`,
    answer: `For ${TAX_YEAR}, the combined IRA contribution limit is $${IRA_LIMITS_2026.under50.toLocaleString()} if you are under age 50, or $${IRA_LIMITS_2026.age50Plus.toLocaleString()} if you are age 50 or older. Your Roth amount can be lower if MAGI falls in the phase-out range.`,
  },
  {
    question: "Can I contribute to a Roth IRA if my income is high?",
    answer:
      "Direct Roth IRA contributions phase out as MAGI rises. In 2026, full contributions generally stop once single MAGI reaches $168,000 or joint MAGI reaches $252,000. Higher earners often explore a backdoor Roth conversion with a tax professional.",
  },
  {
    question: "Is Roth IRA growth really tax-free?",
    answer:
      "Qualified withdrawals of earnings are tax-free when you are at least 59½ and satisfy the five-year rule. Contributions can generally be withdrawn anytime without tax because they were made with after-tax dollars.",
  },
  {
    question: "Should I choose a Roth or Traditional IRA?",
    answer:
      "Roth accounts are often stronger if you expect a higher tax rate in retirement or want tax-free qualified withdrawals and no lifetime RMDs. Traditional IRAs may help if you want a deduction today and expect a lower retirement tax rate. Use our Roth vs Traditional guide for a side-by-side view.",
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
          "Free Roth IRA calculator with 2026 contribution limits, MAGI eligibility checks, and Roth vs taxable projections.",
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_ORIGIN}/#webpage`,
        url: `${SITE_ORIGIN}/`,
        name: "Roth IRA Calculator (2026)",
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
        name: "How to use the Roth IRA Calculator",
        description:
          "Project your Roth IRA balance and check 2026 contribution eligibility in a few steps.",
        step: [
          {
            "@type": "HowToStep",
            name: "Enter ages and balances",
            text: "Add your current age, planned retirement age, and current Roth IRA balance.",
          },
          {
            "@type": "HowToStep",
            name: "Set contribution and return assumptions",
            text: "Choose an annual contribution, expected return, and marginal tax rate for the taxable comparison.",
          },
          {
            "@type": "HowToStep",
            name: "Check MAGI eligibility",
            text: "Select filing status and MAGI so the calculator can apply 2026 Roth income phase-out rules.",
          },
          {
            "@type": "HowToStep",
            name: "Review projections",
            text: "Read the projected Roth balance, growth, taxable comparison, and optional year-by-year schedule.",
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
        {/* Hero: compact title + calculator first */}
        <section className="mb-10 md:mb-14">
          <div className="mb-4 max-w-3xl sm:mb-6 lg:mb-8">
            <h1 className="text-[1.65rem] font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Roth IRA Calculator
            </h1>
            <p className="mt-2 text-sm leading-snug text-gray-300 sm:mt-3 sm:text-base md:text-lg">
              Estimate Roth IRA balances and compare them with a regular taxable account. Free{" "}
              {TAX_YEAR} limits and MAGI eligibility built in.
            </p>
            <p className="mt-1.5 hidden text-sm text-gray-400 sm:flex sm:items-center sm:gap-1.5 sm:flex-wrap">
              <span>{SITE_RATING.ratingValue}</span>
              <span className="tracking-tight text-amber-400" aria-hidden="true">
                ★★★★☆
              </span>
              <span>({Number(SITE_RATING.ratingCount).toLocaleString()}) · Free · Web · Finance</span>
            </p>
          </div>

          <RothIraCalculator />
        </section>

        {/* Content below tool */}
        <article className="max-w-4xl">
          <section id="what-is-roth-ira" className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">
              What a Roth IRA calculator helps you decide?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              A Roth IRA is a retirement account funded with after-tax dollars. Qualified
              withdrawals of contributions and earnings can be tax-free, which makes long-term
              compounding especially powerful. This Roth IRA calculator turns those rules into a
              practical projection so you can see how today&apos;s contributions may grow by retirement.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Unlike many bank widgets that only spit out one ending balance, our tool also checks
              whether your MAGI still allows a full {TAX_YEAR} contribution, flags phase-outs, and
              shows how much tax drag a taxable brokerage account might create at the same return.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Use it when you are deciding how much to contribute, whether catch-up contributions
              matter after age 50, or whether a Roth path looks stronger than keeping the same money
              in a taxable account.
            </p>
          </section>

          <section id="2026-limits" className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">
              {TAX_YEAR} Roth IRA contribution and income limits
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              IRS limits change over time. For {TAX_YEAR}, the combined traditional and Roth IRA
              contribution limit is ${IRA_LIMITS_2026.under50.toLocaleString()} under age 50, or $
              {IRA_LIMITS_2026.age50Plus.toLocaleString()} if you are age 50 or older. Income can
              reduce or eliminate a direct Roth contribution.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-700">
              <table className="min-w-full text-sm">
                <thead className="bg-secondary text-left text-gray-300">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Filing status</th>
                    <th className="px-4 py-3 font-semibold">Full contribution MAGI</th>
                    <th className="px-4 py-3 font-semibold">Phase-out ends</th>
                  </tr>
                </thead>
                <tbody className="text-gray-200">
                  <tr className="border-t border-slate-700">
                    <td className="px-4 py-3">Single / Head of household</td>
                    <td className="px-4 py-3">
                      Under ${IRA_LIMITS_2026.single.fullBelow.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      ${IRA_LIMITS_2026.single.phaseOutEnd.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="px-4 py-3">Married filing jointly</td>
                    <td className="px-4 py-3">
                      Under ${IRA_LIMITS_2026.marriedJoint.fullBelow.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      ${IRA_LIMITS_2026.marriedJoint.phaseOutEnd.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="px-4 py-3">Married filing separately*</td>
                    <td className="px-4 py-3">N/A (phase-out starts immediately)</td>
                    <td className="px-4 py-3">
                      ${IRA_LIMITS_2026.marriedSeparate.phaseOutEnd.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3 mb-6">
              *If you lived with your spouse at any time during the year. Always verify current
              figures on IRS.gov.
            </p>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-secondary">
              <Image
                src={BRAND_CONTRIBUTIONS}
                alt="Illustration of Roth IRA annual contribution planning for 2026"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-gray-300">
              Need the deep dive? Read the full{" "}
              <Link href="/roth-ira-contribution-limits" className="text-accent hover:underline">
                Roth IRA contribution limits guide
              </Link>{" "}
              or check{" "}
              <Link href="/roth-ira-eligibility" className="text-accent hover:underline">
                income eligibility rules
              </Link>
              .
            </p>
          </section>

          <section id="how-to-use" className="mb-14">
            <h2 className="mb-12 text-2xl font-bold text-accent md:mb-16 md:text-3xl">
              How to use this Roth IRA calculator?
            </h2>

            <ol className="relative">
              {(
                [
                  {
                    step: "01",
                    title: "Set your timeline",
                    body: "Current age and retirement age control how many compounding years the projection runs.",
                    icon: (
                      <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-[1.15rem] md:w-[1.15rem]" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M12 8v4.25l2.75 1.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ),
                  },
                  {
                    step: "02",
                    title: "Enter balances and contributions",
                    body: "Start with today\u2019s Roth balance and the amount you expect to add each year.",
                    icon: (
                      <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-[1.15rem] md:w-[1.15rem]" fill="none" aria-hidden="true">
                        <rect x="3.5" y="6.5" width="17" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="16" cy="14.25" r="1.15" fill="currentColor" />
                      </svg>
                    ),
                  },
                  {
                    step: "03",
                    title: "Choose return and tax assumptions",
                    body: "A long-term stock/bond blend often lands around 6–8%. Your marginal tax rate powers the taxable-account comparison.",
                    icon: (
                      <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-[1.15rem] md:w-[1.15rem]" fill="none" aria-hidden="true">
                        <path d="M4.5 16.25 9 11.75l3.5 3.5 7-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.25 7.25h4.25v4.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ),
                  },
                  {
                    step: "04",
                    title: "Add MAGI details",
                    body: "Filing status and modified AGI let the tool estimate whether you still qualify for a full or reduced direct Roth contribution.",
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
                    {/* Connector line to next step */}
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

          <section id="roth-vs-taxable" className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">
              Why the Roth vs taxable comparison matters?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Keeping investments in a taxable brokerage account can work, but annual taxes on
              dividends and realized gains reduce the effective compounding rate. Our calculator
              approximates that drag by applying your marginal tax rate to the assumed return on the
              taxable side while leaving Roth growth untaxed.
            </p>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-secondary mb-4">
              <Image
                src={BRAND_GROWTH}
                alt="Growth chart comparing Roth IRA compounding with taxable savings"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              The gap you see as “Roth tax advantage” is the long-term value of sheltering returns.
              For account-type tradeoffs beyond taxable brokerage accounts, see{" "}
              <Link href="/roth-vs-traditional-ira" className="text-accent hover:underline">
                Roth IRA vs Traditional IRA
              </Link>{" "}
              and our blog on{" "}
              <Link href="/blog/roth-ira-vs-401k" className="text-accent hover:underline">
                Roth IRA vs 401(k)
              </Link>
              .
            </p>
          </section>

          <section id="who-should-use" className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">
              Who should use a Roth IRA?
            </h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {[
                "Workers who expect higher tax rates later and want tax-free qualified withdrawals",
                "Savers who value flexibility because contributions (not earnings) can usually be withdrawn anytime",
                "People who want to avoid lifetime required minimum distributions on their own Roth IRA",
                "High earners researching whether a backdoor Roth path is worth exploring",
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
              Projections assume end-of-year contributions, a constant annual return, and a simplified
              taxable-account tax drag. Real markets are volatile, fund expense ratios matter, and tax
              law can change. The eligibility estimate is educational and does not replace IRS
              worksheets or advice from a CPA or fiduciary advisor.
            </p>
            <div className="relative w-full max-w-2xl aspect-video mx-auto rounded-xl overflow-hidden border border-white/10 bg-secondary">
              <Image
                src={BRAND_HERO}
                alt="Roth IRA Calculator visual showing long-term retirement savings growth"
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
            </div>
          </section>

          <FaqSection items={faqs} />

          <section className="mt-16 rounded-2xl border border-accent/30 bg-secondary p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to refine your retirement number?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Scroll back to the tool, adjust your contribution, and compare the Roth path against a
              taxable account before your next paycheck hits.
            </p>
            <CtaButton href="/#calculator" ariaLabel="Jump to Roth IRA calculator">
              BACK TO CALCULATOR
            </CtaButton>
          </section>
        </article>
      </div>
    </>
  );
}
