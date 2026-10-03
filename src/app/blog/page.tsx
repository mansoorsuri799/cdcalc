import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "CD Calculator Blog — Penalties, Brokered CDs & Rate Guides",
  description:
    "Practical certificate of deposit articles on early withdrawal penalties, brokered CDs, APY vs APR, and no-penalty CDs.",
  alternates: { canonical: `${SITE_ORIGIN}/blog` },
  openGraph: {
    title: "CD Calculator Blog — Penalties, Brokered CDs & Rate Guides",
    description: "Educational CD guides from CD Calculator.",
    url: `${SITE_ORIGIN}/blog`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const posts = [
  {
    href: "/blog/cd-early-withdrawal-penalty",
    title: "CD Early Withdrawal Penalty Explained",
    excerpt:
      "How penalties are calculated, when breaking a CD can still make sense, and what to check in the account disclosure.",
    date: "October 2026",
    read: "8 min read",
  },
  {
    href: "/blog/brokered-cds-explained",
    title: "Brokered CDs Explained",
    excerpt:
      "Bank CD vs brokered CD differences: how you buy them, secondary-market pricing, call features, and insurance basics.",
    date: "October 2026",
    read: "9 min read",
  },
  {
    href: "/blog/apy-vs-apr-for-cds",
    title: "APY vs APR for CDs",
    excerpt:
      "Why the same number can mean different earnings, and which label to enter in the CD calculator.",
    date: "October 2026",
    read: "7 min read",
  },
  {
    href: "/blog/no-penalty-cds",
    title: "No-Penalty CDs: Flexible Rate Locks",
    excerpt:
      "How no-penalty CDs work, typical waiting periods, and when they beat both traditional CDs and savings accounts.",
    date: "October 2026",
    read: "7 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-accent mb-3">CD Calculator Blog</h1>
      <p className="text-gray-300 text-lg mb-10">
        Focused guides that support the calculator—only high-intent certificate of deposit questions
        people actually search.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <article
            key={post.href}
            className="rounded-xl border border-slate-700 bg-secondary p-6 hover:border-accent/50 transition-colors"
          >
            <h2 className="text-xl font-bold text-white mb-3">{post.title}</h2>
            <p className="text-gray-300 mb-4">{post.excerpt}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.read}</span>
            </div>
            <Link href={post.href} className="text-accent hover:underline font-semibold">
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
