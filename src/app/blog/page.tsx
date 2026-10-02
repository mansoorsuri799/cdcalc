import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Roth IRA Blog — Guides on Limits, Withdrawals & Strategy",
  description:
    "Practical Roth IRA articles on the backdoor Roth, 5-year rule, opening an account, and Roth IRA vs 401(k).",
  alternates: { canonical: `${SITE_ORIGIN}/blog` },
  openGraph: {
    title: "Roth IRA Blog — Guides on Limits, Withdrawals & Strategy",
    description: "Educational Roth IRA guides from RothIRA Calc.",
    url: `${SITE_ORIGIN}/blog`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const posts = [
  {
    href: "/blog/backdoor-roth-ira-explained",
    title: "Backdoor Roth IRA Explained",
    excerpt:
      "How high earners use nondeductible Traditional IRA contributions and conversions when direct Roth contributions are blocked.",
    date: "October 2026",
    read: "9 min read",
  },
  {
    href: "/blog/roth-ira-5-year-rule",
    title: "Roth IRA 5-Year Rule & Withdrawals",
    excerpt:
      "Learn when earnings become qualified, how multiple five-year clocks work, and what happens if you withdraw early.",
    date: "October 2026",
    read: "8 min read",
  },
  {
    href: "/blog/how-to-open-a-roth-ira",
    title: "How to Open a Roth IRA",
    excerpt:
      "A step-by-step walkthrough for choosing a provider, funding the account, and investing your first contribution.",
    date: "October 2026",
    read: "7 min read",
  },
  {
    href: "/blog/roth-ira-vs-401k",
    title: "Roth IRA vs 401(k)",
    excerpt:
      "Compare contribution room, employer matches, investment menus, and tax treatment so you can prioritize the right dollars.",
    date: "October 2026",
    read: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-accent mb-3">Roth IRA Blog</h1>
      <p className="text-gray-300 text-lg mb-10">
        Focused guides that support the calculator—no filler topics, only high-intent Roth IRA questions
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
