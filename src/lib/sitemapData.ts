import { SITE_ORIGIN } from "@/lib/siteConfig";

function imageLoc(path: string): string {
  return `${SITE_ORIGIN}${path}`;
}

export type SitemapPage = {
  path: string;
  lastMod: string;
  changeFreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  images?: Array<{ loc: string; title: string; caption: string }>;
};

const LASTMOD = "2026-10-04";

export const SITEMAP_PAGES: SitemapPage[] = [
  {
    path: "/",
    lastMod: LASTMOD,
    changeFreq: "daily",
    priority: 1,
    images: [
      {
        loc: imageLoc("/favicon-512x512.png"),
        title: "CD Calculator logo",
        caption: "Free CD Calculator brand mark for certificate of deposit projections",
      },
      {
        loc: imageLoc("/hero-cd-calculator.webp"),
        title: "CD Calculator hero illustration",
        caption: "Homepage visual for estimating certificate of deposit earnings",
      },
      {
        loc: imageLoc("/cd-interest-growth.webp"),
        title: "CD interest growth chart",
        caption: "Visual of CD interest compounding to maturity",
      },
    ],
  },
  {
    path: "/how-cds-work",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/how-a-cd-works.webp"),
        title: "How a certificate of deposit works",
        caption: "Step visual explaining CD deposits, fixed rates, interest, and maturity",
      },
    ],
  },
  {
    path: "/cd-ladder",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/cd-ladder-strategy.webp"),
        title: "CD ladder strategy illustration",
        caption: "Illustration of staggered CD maturities in a ladder strategy",
      },
    ],
  },
  {
    path: "/cd-vs-savings-account",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/cd-compounding-frequency.webp"),
        title: "CD versus savings compounding",
        caption: "Comparison visual for CD rates versus high-yield savings liquidity",
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
        loc: imageLoc("/android-chrome-512x512.png"),
        title: "About CD Calculator",
        caption: "CD Calculator brand logo used on the About page",
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
    path: "/blog/cd-early-withdrawal-penalty",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.75,
    images: [
      {
        loc: imageLoc("/cd-early-withdrawal-penalty.webp"),
        title: "CD early withdrawal penalty guide image",
        caption: "Visual explaining certificate of deposit early withdrawal penalties",
      },
    ],
  },
  {
    path: "/blog/brokered-cds-explained",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.75,
  },
  {
    path: "/blog/apy-vs-apr-for-cds",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.75,
    images: [
      {
        loc: imageLoc("/cd-interest-formula.webp"),
        title: "CD interest and APY formula visual",
        caption: "Illustration supporting APY versus APR explanations for CDs",
      },
    ],
  },
  {
    path: "/blog/no-penalty-cds",
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
