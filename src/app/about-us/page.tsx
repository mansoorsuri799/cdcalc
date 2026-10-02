import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import { BRAND_LOGO, CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Roth IRA Calculator — Our Mission",
  description:
    "Learn why RothIRA Calc exists: clear retirement math, current IRS limit context, and a free Roth IRA calculator without signup walls.",
  alternates: { canonical: `${SITE_ORIGIN}/about-us` },
  openGraph: {
    title: "About Roth IRA Calculator — Our Mission",
    description: "Independent educational tools for Roth IRA planning on rothiracalc.net.",
    url: `${SITE_ORIGIN}/about-us`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
      <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
        <div className="relative w-40 h-40 flex-shrink-0 rounded-2xl overflow-hidden border border-slate-700 bg-secondary">
          <Image
            src={BRAND_LOGO}
            alt="Roth IRA Calculator logo"
            fill
            sizes="160px"
            className="object-contain p-3"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">About {SITE_NAME}</h1>
          <p className="text-gray-300 leading-relaxed mb-4">
            {SITE_NAME} is an independent educational site at {SITE_DOMAIN}. We built a free Roth IRA
            calculator so savers can project tax-free growth, check contribution room, and understand
            income limits without creating an account or talking to a salesperson first.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Our pages explain contribution caps, eligibility, Roth vs Traditional tradeoffs, and
            common strategies like the backdoor Roth—always with the reminder that tax rules are
            personal and professional advice may be needed.
          </p>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">What we publish?</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="rounded-xl border border-slate-700 bg-secondary p-4">
            A working retirement projection tool with MAGI-aware contribution checks
          </li>
          <li className="rounded-xl border border-slate-700 bg-secondary p-4">
            Practical guides for limits, eligibility, and account comparisons
          </li>
          <li className="rounded-xl border border-slate-700 bg-secondary p-4">
            SERP-focused articles on openings, withdrawals, backdoor Roth, and 401(k) tradeoffs
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">Contact</h2>
        <p className="text-gray-300 leading-relaxed">
          Questions or corrections? Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
            {CONTACT_EMAIL}
          </a>{" "}
          or use our{" "}
          <Link href="/contact-us" className="text-accent hover:underline">
            contact form
          </Link>
          .
        </p>
      </section>

      <CtaButton href="/#calculator">TRY THE CALCULATOR</CtaButton>
    </div>
  );
}
