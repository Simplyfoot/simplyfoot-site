'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { categoryLabels } from 'lib/blog/types';
import type { BlogCategory } from 'lib/blog/types';
import { regions } from 'lib/blog/regions';

export function BlogFiltersBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = (searchParams.get('category') as BlogCategory) || '';
  const region = searchParams.get('region') || '';
  const department = searchParams.get('department') || '';
  const search = searchParams.get('search') || '';

  const selectedRegion = regions.find((r) => r.slug === region);
  const departments = selectedRegion?.departments ?? [];

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      if (key === 'region') params.delete('department');
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router],
  );

  const clearAll = useCallback(() => {
    router.push(pathname);
  }, [pathname, router]);

  const activeFilters: { label: string; key: string }[] = [];
  if (category) activeFilters.push({ label: categoryLabels[category as BlogCategory], key: 'category' });
  if (region && selectedRegion) activeFilters.push({ label: selectedRegion.name, key: 'region' });
  if (department) activeFilters.push({ label: department, key: 'department' });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-beige)]/40" />
        <input
          type="text"
          placeholder="Rechercher un article..."
          defaultValue={search}
          onChange={(e) => setParam('search', e.target.value)}
          className="w-full rounded-xl bg-[var(--brand-surface)]/50 border border-[var(--brand-border)] pl-11 pr-4 py-3 text-sm text-white placeholder:text-[var(--color-text-beige)]/40 focus:outline-none focus:border-[var(--brand-cta)]/50"
        />
      </div>

      {/* Dropdowns */}
      <div className="flex flex-wrap gap-3">
        <select
          value={category}
          onChange={(e) => setParam('category', e.target.value)}
          className="rounded-lg bg-[var(--brand-surface)]/50 border border-[var(--brand-border)] px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--brand-cta)]/50"
        >
          <option value="">Toutes catégories</option>
          {Object.entries(categoryLabels).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>

        <select
          value={region}
          onChange={(e) => setParam('region', e.target.value)}
          className="rounded-lg bg-[var(--brand-surface)]/50 border border-[var(--brand-border)] px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--brand-cta)]/50"
        >
          <option value="">Toutes régions</option>
          {regions.map((r) => (
            <option key={r.slug} value={r.slug}>{r.name}</option>
          ))}
        </select>

        <select
          value={department}
          onChange={(e) => setParam('department', e.target.value)}
          disabled={!region}
          className="rounded-lg bg-[var(--brand-surface)]/50 border border-[var(--brand-border)] px-3 py-2 text-sm text-white disabled:opacity-40 focus:outline-none focus:border-[var(--brand-cta)]/50"
        >
          <option value="">Tous départements</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Active filters pills */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[var(--color-text-beige)]/50">Filtres :</span>
          {activeFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setParam(f.key, '')}
              className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-cta)]/15 px-3 py-1 text-xs font-semibold text-[var(--brand-cta)] hover:bg-[var(--brand-cta)]/25 transition-colors cursor-pointer"
            >
              {f.label}
              <X className="h-3 w-3" />
            </button>
          ))}
          <button
            onClick={clearAll}
            className="text-xs text-[var(--color-text-beige)]/40 hover:text-white transition-colors cursor-pointer"
          >
            Effacer tout
          </button>
        </div>
      )}
    </div>
  );
}
