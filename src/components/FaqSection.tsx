type FaqItem = { question: string; answer: string };

export default function FaqSection({
  id = "faq",
  title = "Frequently asked questions",
  items,
}: {
  id?: string;
  title?: string;
  items: FaqItem[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id={id} className="mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-accent mb-6">{title}</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-slate-700 bg-[#0D2433] open:border-accent/40"
          >
            <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-white flex items-center justify-between gap-4">
              <span>{item.question}</span>
              <span className="text-accent transition group-open:rotate-45 text-xl leading-none">+</span>
            </summary>
            <div className="px-5 pb-4 text-gray-300 leading-relaxed">{item.answer}</div>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
