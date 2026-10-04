export const SITE_NAME = "CD Calculator";
export const SITE_SHORT_NAME = "CD Calc";
export const SITE_ORIGIN = "https://cdcalc.net";
export const SITE_DOMAIN = "cdcalc.net";
export const SITE_TAGLINE =
  "Estimate certificate of deposit earnings with APY or APR compounding, tax impact, and a clear maturity schedule.";

export const CONTACT_EMAIL = "support@cdcalc.net";

/** Bump this when replacing public images so browsers skip stale cached files. */
export const ASSET_VERSION = "20261004-2";

function metaAsset(path: string): string {
  return `${path}?v=${ASSET_VERSION}`;
}

/** Brand & content images in /public */
export const BRAND_LOGO = "/favicon-512x512.png";
export const BRAND_LOGO_MARK = "/android-chrome-512x512.png";
export const BRAND_LOGO_HORIZONTAL = "/maskable-icon-512x512.png";
export const BRAND_HERO = "/hero-cd-calculator.webp";
export const BRAND_GROWTH = "/cd-interest-growth.webp";
export const BRAND_HOW_IT_WORKS = "/how-a-cd-works.webp";
export const BRAND_FORMULA = "/cd-interest-formula.webp";
export const BRAND_FREQUENCY = "/cd-compounding-frequency.webp";
export const BRAND_LADDER = "/cd-ladder-strategy.webp";
export const BRAND_PENALTY = "/cd-early-withdrawal-penalty.webp";
export const OG_IMAGE = metaAsset("/feature/og-image-1200x630.webp");
export const OG_IMAGE_SQUARE = metaAsset("/feature/og-square-1200x1200.webp");
export const TWITTER_IMAGE = metaAsset("/feature/twitter-card-1200x675.webp");

/** Visible rating used for WebApplication rich results */
export const SITE_RATING = {
  ratingValue: "4.8",
  ratingCount: "15260",
  bestRating: "5",
  worstRating: "1",
} as const;
