import { FOOT_ARTICLES } from '@/content/blog/foot-articles';
import type { BrandSlug } from '@/lib/brand';
import type { BlogArticle, BlogFilters, PaginatedResult } from '@/types/blog';

import { applyFilters, DEFAULT_PER_PAGE, paginate, sortWithPinned } from './utils';

/**
 * Blog service — single seam between components and data source.
 *
 * TODAY: reads static mock arrays from `src/content/blog/*`.
 * TOMORROW: swap every body to hit the DB/API of choice (Supabase, REST,
 * GraphQL...). Public signatures stay identical, so no component changes.
 *
 * Every function is intentionally async to match future I/O shape.
 */

/** In-memory index so brand-scoped queries are O(1) to initialise. */
const ALL_ARTICLES: Readonly<Record<BrandSlug, readonly BlogArticle[]>> = {
    foot: FOOT_ARTICLES,
    rugby: [],
    handball: [],
};

function getBrandArticles(brand: BrandSlug): readonly BlogArticle[] {
    return ALL_ARTICLES[brand];
}

/**
 * List articles matching `filters`, pinned-first then sorted, paginated.
 * `brand` is the only required filter. Pagination defaults: page 1, 9/page.
 */
export async function getArticles(filters: BlogFilters): Promise<PaginatedResult<BlogArticle>> {
    const articles = getBrandArticles(filters.brand);
    const filtered = applyFilters(articles, filters);
    const sorted = sortWithPinned(filtered, filters.sort ?? 'recent');
    return paginate(sorted, filters.page ?? 1, filters.perPage ?? DEFAULT_PER_PAGE);
}

/** Fetch a single article by its slug scoped to `brand`. Returns null if missing. */
export async function getArticleBySlug(
    brand: BrandSlug,
    slug: string,
): Promise<BlogArticle | null> {
    const article = getBrandArticles(brand).find((a) => a.slug === slug);
    return article ?? null;
}

/** Latest match results. Sorted by publish date, newest first. */
export async function getLatestResults(
    brand: BrandSlug,
    limit = 10,
): Promise<readonly BlogArticle[]> {
    return getBrandArticles(brand)
        .filter((a) => a.category === 'resultats')
        .slice()
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
        .slice(0, limit);
}

/** Full product changelog. Sorted by release date, newest first. */
export async function getChangelog(brand: BrandSlug): Promise<readonly BlogArticle[]> {
    return getBrandArticles(brand)
        .filter((a) => a.category === 'mises-a-jour')
        .slice()
        .sort((a, b) => {
            const aDate = a.changelog?.releaseDate ?? a.publishedAt;
            const bDate = b.changelog?.releaseDate ?? b.publishedAt;
            return bDate.localeCompare(aDate);
        });
}

/**
 * Featured articles for the blog hero. Editorial control via isPinned +
 * pinnedOrder. Returns up to `limit` pinned items, sorted by pinnedOrder asc.
 */
export async function getFeaturedArticles(
    brand: BrandSlug,
    limit = 3,
): Promise<readonly BlogArticle[]> {
    return getBrandArticles(brand)
        .filter((a) => a.isPinned)
        .slice()
        .sort((a, b) => (a.pinnedOrder ?? 0) - (b.pinnedOrder ?? 0))
        .slice(0, limit);
}

/**
 * Articles related to `article` — same region or same category, excluding
 * itself. Used on the single-article page.
 */
export async function getRelatedArticles(
    article: BlogArticle,
    limit = 3,
): Promise<readonly BlogArticle[]> {
    const pool = getBrandArticles(article.brand).filter((a) => a.slug !== article.slug);
    const byRegion = pool.filter((a) => article.region && a.region === article.region);
    const byCategory = pool.filter((a) => a.category === article.category);
    // Dedupe while preserving order: region-matches come first, then category-matches.
    const seen = new Set<string>();
    const merged: BlogArticle[] = [];
    for (const a of [...byRegion, ...byCategory]) {
        if (seen.has(a.slug)) {
            continue;
        }
        seen.add(a.slug);
        merged.push(a);
        if (merged.length >= limit) {
            break;
        }
    }
    return merged;
}

/** Previous and next articles by publish date, within the same brand. */
export async function getAdjacentArticles(
    article: BlogArticle,
): Promise<{ prev: BlogArticle | null; next: BlogArticle | null }> {
    const sorted = getBrandArticles(article.brand)
        .slice()
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    const idx = sorted.findIndex((a) => a.slug === article.slug);
    if (idx < 0) {
        return { prev: null, next: null };
    }
    return {
        prev: sorted[idx - 1] ?? null,
        next: sorted[idx + 1] ?? null,
    };
}

/** Distinct tag list for the sidebar. Returns tag + article count. */
export async function getPopularTags(
    brand: BrandSlug,
    limit = 10,
): Promise<readonly { tag: string; count: number }[]> {
    const counts = new Map<string, number>();
    for (const article of getBrandArticles(brand)) {
        for (const tag of article.tags) {
            counts.set(tag, (counts.get(tag) ?? 0) + 1);
        }
    }
    return [...counts.entries()]
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
}

/** Distinct regions currently represented by at least one article. */
export async function getActiveRegions(brand: BrandSlug): Promise<readonly string[]> {
    const set = new Set<string>();
    for (const a of getBrandArticles(brand)) {
        if (a.region) {
            set.add(a.region);
        }
    }
    return [...set];
}
