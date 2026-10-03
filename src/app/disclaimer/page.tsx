import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CONTACT_EMAIL, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Educational disclaimer for ${SITE_NAME} calculators and certificate of deposit guides.`,
  alternates: { canonical: `${SITE_ORIGIN}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]} />
      <h1 className="text-3xl font-bold text-white mb-6">Disclaimer</h1>
      <div className="space-y-5 text-gray-300 leading-relaxed">
        <p>
          {SITE_NAME} provides educational calculators and articles about certificates of deposit and
          related cash savings topics. Nothing on this site is tax, legal, investment, or financial
          advice.
        </p>
        <p>
          Projections depend on assumptions you enter and simplified models of compounding and taxes.
          Actual bank APYs, day-count conventions, early-withdrawal rules, insurance coverage, and tax
          treatment can differ. Always confirm terms with the issuing institution and consult a
          qualified professional before making decisions.
        </p>
        <p>
          We are not affiliated with the FDIC, NCUA, or any bank or brokerage named in educational
          comparisons. Links to external resources are for convenience only.
        </p>
        <p>
          Questions:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="text-sm text-gray-500">Last updated: October 4, 2026</p>
      </div>
    </div>
  );
}
