import Link from 'next/link';
import CtaButton from '@/components/CtaButton';
import { CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_TAGLINE } from '@/lib/siteConfig';

export default function Footer() {
  return (
    <footer className="bg-[#05070c] text-white pt-8 pb-2 px-4 md:px-8 border-t border-white/10 relative z-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold text-accent mb-4">{SITE_NAME}</h2>
            <p className="text-sm text-gray-300 mb-4">{SITE_TAGLINE}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-accent hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-accent">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-accent transition-colors">Roth IRA Calculator</Link></li>
              <li><Link href="/roth-ira-contribution-limits" className="text-gray-300 hover:text-accent transition-colors">Contribution Limits</Link></li>
              <li><Link href="/roth-ira-eligibility" className="text-gray-300 hover:text-accent transition-colors">Eligibility & Income Limits</Link></li>
              <li><Link href="/roth-vs-traditional-ira" className="text-gray-300 hover:text-accent transition-colors">Roth vs Traditional IRA</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-accent transition-colors">Blog</Link></li>
              <li><Link href="/about-us" className="text-gray-300 hover:text-accent transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-accent">Resources</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/backdoor-roth-ira-explained" className="text-gray-300 hover:text-accent transition-colors">Backdoor Roth IRA</Link></li>
              <li><Link href="/blog/roth-ira-5-year-rule" className="text-gray-300 hover:text-accent transition-colors">5-Year Rule</Link></li>
              <li><Link href="/blog/how-to-open-a-roth-ira" className="text-gray-300 hover:text-accent transition-colors">How to Open a Roth IRA</Link></li>
              <li><Link href="/blog/roth-ira-vs-401k" className="text-gray-300 hover:text-accent transition-colors">Roth IRA vs 401(k)</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="text-gray-300 hover:text-accent transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-accent">Try the Tool</h2>
            <p className="text-sm text-gray-300 mb-4">
              Run a free projection with 2026 contribution limits, MAGI eligibility, and a Roth vs taxable comparison.
            </p>
            <CtaButton href="/#calculator" ariaLabel="Open the Roth IRA calculator">
              OPEN CALCULATOR
            </CtaButton>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-4 pb-3 text-center text-sm text-zinc-500">
          <p className="mb-0">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved. |{' '}
            <Link href="/" className="hover:text-accent">{SITE_DOMAIN}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
