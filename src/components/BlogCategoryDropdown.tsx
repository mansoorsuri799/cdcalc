'use client';

import Link from 'next/link';

const categories = [
  { name: 'Early Withdrawal', href: '/blog/cd-early-withdrawal-penalty' },
  { name: 'Brokered CDs', href: '/blog/brokered-cds-explained' },
  { name: 'APY vs APR', href: '/blog/apy-vs-apr-for-cds' },
  { name: 'No-Penalty CDs', href: '/blog/no-penalty-cds' },
];

export default function BlogCategoryDropdown() {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <Link
          key={category.href}
          href={category.href}
          className="rounded-full border border-slate-600 px-3 py-1.5 text-sm text-gray-300 hover:border-accent hover:text-accent transition-colors"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
