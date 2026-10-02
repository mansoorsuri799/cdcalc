import { SITE_ORIGIN } from "@/lib/siteConfig";

export type SitemapPage = {
  path: string;
  lastMod: string;
  changeFreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  images?: Array<{ loc: string; title: string; caption: string }>;
};

const LASTMOD = "2026-10-03";

export const SITEMAP_PAGES: SitemapPage[] = [
  {
    path: "/",
    lastMod: LASTMOD,
    changeFreq: "daily",
    priority: 1,
    images: [
      {
        loc: `${SITE_ORIGIN}/logo-mark-512.png`,
        title: "Roth IRA Calculator logo",
        caption: "Free Roth IRA Calculator brand mark for tax-free retirement projections",
      },
      {
        loc: `${SITE_ORIGIN}/roth-ira-tax-free-growth.webp`,
        title: "Roth IRA tax-free growth illustration",
        caption: "Illustration of tax-free Roth IRA compound growth on the calculator homepage",
      },
      {
        loc: `${SITE_ORIGIN}/roth-ira-compound-growth.webp`,
        title: "Roth IRA compound growth chart",
        caption: "Visual comparing long-term Roth IRA compounding versus taxable growth",
      },
    ],
  },
  {
    path: "/roth-ira-contribution-limits",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: `${SITE_ORIGIN}/roth-ira-calculator-how-it-works.webp`,
        title: "How the Roth IRA calculator works",
        caption: "Step visual for using contribution and growth assumptions in the Roth IRA calculator",
      },
    ],
  },
  {
    path: "/roth-ira-eligibility",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
  },
  {
    path: "/roth-vs-traditional-ira",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: `${SITE_ORIGIN}/roth-vs-traditional-ira.webp`,
        title: "Roth IRA vs Traditional IRA comparison",
        caption: "Side-by-side visual comparing Roth IRA and Traditional IRA retirement paths",
      },
    ],
  },
  {
    path: "/about-us",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.7,
    images: [
      {
        loc: `${SITE_ORIGIN}/logo-512.png`,
        title: "About Roth IRA Calculator",
        caption: "Roth IRA Calculator brand logo used on the About page",
      },
    ],
  },
  {
    path: "/blog",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.8,
  },
  {
    path: "/blog/backdoor-roth-ira-explained",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.75,
  },
  {
    path: "/blog/roth-ira-5-year-rule",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.75,
  },
  {
    path: "/blog/how-to-open-a-roth-ira",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.75,
  },
  {
    path: "/blog/roth-ira-vs-401k",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.75,
  },
  {
    path: "/contact-us",
    lastMod: LASTMOD,
    changeFreq: "yearly",
    priority: 0.6,
  },
  {
    path: "/privacy",
    lastMod: LASTMOD,
    changeFreq: "yearly",
    priority: 0.4,
  },
  {
    path: "/disclaimer",
    lastMod: LASTMOD,
    changeFreq: "yearly",
    priority: 0.4,
  },
];

export function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}`;
}
