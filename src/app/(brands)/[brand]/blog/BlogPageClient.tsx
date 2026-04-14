'use client';

import { useMemo, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { BlogFiltersBar } from 'components/blog/BlogFiltersBar';
import { BlogCard } from 'components/blog/BlogCard';
import { BlogEmpty } from 'components/blog/BlogEmpty';
import { filterArticles, paginateArticles } from 'lib/blog/utils';
import { mockArticles } from 'lib/blog/mock-articles';
import type { BlogCategory } from 'lib/blog/types';
import { regions } from 'lib/blog/regions';

interface BlogPageClientProps {
  brandSlug: string;
  brandId: string;
}

export function BlogPageClient({ brandSlug, brandId }: BlogPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(() => ({
    category: (searchParams.get('category') as BlogCategory) || undefined,
    region: (() => {
      const slug = searchParams.get('region');
      if (!slug) return undefined;
      return regions.find((r) => r.slug === slug)?.name;
    })(),
    department: searchParams.get('department') || undefined,
    search: searchParams.get('search') || undefined,
    page: parseInt(searchParams.get('page') || '1', 10),
  }), [searchParams]);

  const filtered = useMemo(() => filterArticles(mockArticles, brandId, filters), [brandId, filters]);
  const { articles, totalPages, currentPage } = paginateArticles(filtered, filters.page);

  const clearAll = useCallback(() => {
    router.push(pathname);
  }, [pathname, router]);

  const goToPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(page));
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  return (
    <>
      <BlogFiltersBar />

      {articles.length > 0 ? (
        <>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <BlogCard key={a.id} article={a} brandSlug={brandSlug} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {currentPage > 1 && (
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  className="rounded-lg border border-[var(--brand-border)] px-4 py-2 text-sm text-white hover:border-[var(--brand-cta)]/50 transition-colors cursor-pointer"
                >
                  Précédent
                </button>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                    p === currentPage
                      ? 'bg-[var(--brand-cta)] text-[var(--brand-cta-text)]'
                      : 'border border-[var(--brand-border)] text-white hover:border-[var(--brand-cta)]/50'
                  }`}
                >
                  {p}
                </button>
              ))}
              {currentPage < totalPages && (
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  className="rounded-lg border border-[var(--brand-border)] px-4 py-2 text-sm text-white hover:border-[var(--brand-cta)]/50 transition-colors cursor-pointer"
                >
                  Suivant
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <BlogEmpty onClear={clearAll} />
      )}
    </>
  );
}
