import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import { BRAND_LOGO, CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About CD Calculator — Our Mission",
  description:
    "Learn why CD Calculator exists: clear certificate of deposit math, compounding options, and a free tool without signup walls.",
  alternates: { canonical: `${SITE_ORIGIN}/about-us` },
  openGraph: {
    title: "About CD Calculator — Our Mission",
    description: "Independent educational tools for CD planning on cdcalc.net.",
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
            alt="CD Calculator logo"
            fill
            sizes="160px"
            className="object-contain p-3"
            priority
          />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">About {SITE_NAME}</h1>
          <p className="text-gray-300 leading-relaxed mb-4">
            {SITE_NAME} is an independent educational site at {SITE_DOMAIN}. We built a free CD
            calculator so savers can project maturity value, compare compounding methods, and
            understand after-tax interest estimates without creating an account or talking to a
            salesperson first.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Our pages explain how CDs work, ladder strategies, CD vs savings tradeoffs, and common
            product questions like penalties and brokered CDs—always with the reminder that bank terms
            and tax rules are personal.
          </p>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-accent mb-3">What we publish?</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="rounded-xl border border-slate-700 bg-secondary p-4">
            A working certificate of deposit projection tool with APY/APR compounding and schedules
          </li>
          <li className="rounded-xl border border-slate-700 bg-secondary p-4">
            Practical guides for CD basics, ladders, and savings comparisons
          </li>
          <li className="rounded-xl border border-slate-700 bg-secondary p-4">
            SERP-focused articles on penalties, brokered CDs, APY vs APR, and no-penalty products
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

      <CtaButton href="/#calculator">OPEN CD CALCULATOR</CtaButton>
    </div>
  );
}
