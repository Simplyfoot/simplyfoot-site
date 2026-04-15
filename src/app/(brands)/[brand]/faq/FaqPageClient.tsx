'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

import type { FaqCategory as FaqCategoryType } from 'content/faq/foot-faq';
import { FaqSearch } from 'components/faq/FaqSearch';
import { FaqCategoryNav } from 'components/faq/FaqCategoryNav';
import { FaqCategory } from 'components/faq/FaqCategory';

interface FaqPageClientProps {
  categories: FaqCategoryType[];
  brandName: string;
}

export function FaqPageClient({ categories, brandName }: FaqPageClientProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return categories;
    const q = query.trim().toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q),
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, query]);

  const totalResults = filtered.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
      {/* Hero */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[var(--color-text-beige)] sm:text-4xl lg:text-5xl">
          Foire Aux Questions
        </h1>
        <p className="mt-3 text-base text-[var(--color-text-beige)]/60 sm:text-lg">
          Trouvez rapidement la r\u00e9ponse \u00e0 votre question sur {brandName}
        </p>
      </header>

      {/* Search */}
      <div className="mb-8">
        <FaqSearch onSearch={setQuery} />
      </div>

      {/* Category nav */}
      {!query.trim() && (
        <div className="mb-10">
          <FaqCategoryNav categories={categories} />
        </div>
      )}

      {/* Search results info */}
      {query.trim() && (
        <p className="mb-6 text-sm text-[var(--color-text-beige)]/60">
          {totalResults} r\u00e9sultat{totalResults !== 1 ? 's' : ''} pour &laquo;&nbsp;{query}&nbsp;&raquo;
        </p>
      )}

      {/* Categories */}
      <div className="space-y-10">
        {filtered.map((category) => (
          <FaqCategory key={category.id} category={category} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-10 text-center">
          <p className="text-lg font-semibold text-[var(--color-text-beige)]">
            Aucun r\u00e9sultat trouv\u00e9
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-beige)]/60">
            Essayez d&apos;autres mots-cl\u00e9s ou contactez-nous directement.
          </p>
        </div>
      )}

      {/* Bottom CTA */}
      <section aria-label="Contact et assistance" className="mt-16 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 text-center sm:p-10">
        <h2 className="text-xl font-bold text-[var(--color-text-beige)] sm:text-2xl">
          Pas trouv\u00e9 votre r\u00e9ponse ?
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text-beige)]/60">
          Contactez-nous ou demandez \u00e0 Simo, notre assistant intelligent.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-xl bg-[var(--brand-cta)] px-6 py-3 text-sm font-bold text-[var(--brand-cta-text)] transition-colors hover:opacity-90"
          >
            Nous contacter
          </Link>
          <button
            onClick={() => {
              // Trigger Simo chat open via DOM event
              const btn = document.querySelector('[aria-label="Ouvrir le chat Simo"]') as HTMLButtonElement | null;
              btn?.click();
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--brand-border)] px-6 py-3 text-sm font-medium text-[var(--color-text-beige)] transition-colors hover:bg-white/5 cursor-pointer"
          >
            <MessageCircle className="h-4 w-4" />
            Demander \u00e0 Simo
          </button>
        </div>
      </section>
    </div>
  );
}
