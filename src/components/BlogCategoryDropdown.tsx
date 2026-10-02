'use client';

import Link from 'next/link';

const categories = [
  { name: 'Backdoor Roth', href: '/blog/backdoor-roth-ira-explained' },
  { name: '5-Year Rule', href: '/blog/roth-ira-5-year-rule' },
  { name: 'Open a Roth IRA', href: '/blog/how-to-open-a-roth-ira' },
  { name: 'Roth vs 401(k)', href: '/blog/roth-ira-vs-401k' },
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
