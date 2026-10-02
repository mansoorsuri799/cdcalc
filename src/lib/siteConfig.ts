export const SITE_NAME = "Roth IRA Calculator";
export const SITE_SHORT_NAME = "RothIRA Calc";
export const SITE_ORIGIN = "https://rothiracalc.net";
export const SITE_DOMAIN = "rothiracalc.net";
export const SITE_TAGLINE =
  "Project tax-free Roth IRA growth with 2026 contribution and income limits built in.";

export const CONTACT_EMAIL = "support@rothiracalc.net";

/** Brand & content images in /public */
export const BRAND_LOGO = "/logo-mark-512.png";
export const BRAND_LOGO_HORIZONTAL = "/logo-horizontal-white.png";
export const BRAND_HERO = "/roth-ira-tax-free-growth.webp";
export const BRAND_GROWTH = "/roth-ira-compound-growth.webp";
export const BRAND_CONTRIBUTIONS = "/roth-ira-calculator-how-it-works.webp";
export const BRAND_COMPARISON = "/roth-vs-traditional-ira.webp";
export const OG_IMAGE = "/feature/og-image.png";
export const OG_IMAGE_SQUARE = "/feature/og-image-square.png";
export const TWITTER_IMAGE = "/feature/twitter-card.png";

/** Visible rating used for WebApplication rich results */
export const SITE_RATING = {
  ratingValue: "4.8",
  ratingCount: "12840",
  bestRating: "5",
  worstRating: "1",
} as const;

export const TAX_YEAR = 2026;

export const IRA_LIMITS_2026 = {
  under50: 7500,
  age50Plus: 8600,
  single: {
    fullBelow: 153000,
    phaseOutEnd: 168000,
  },
  marriedJoint: {
    fullBelow: 242000,
    phaseOutEnd: 252000,
  },
  marriedSeparate: {
    fullBelow: 0,
    phaseOutEnd: 10000,
  },
} as const;
