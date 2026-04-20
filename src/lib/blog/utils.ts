import type { BlogArticle, BlogFilters, BlogSort, PaginatedResult } from '@/types/blog';

/**
 * Normalise a string for case-/accent-insensitive full-text search.
 * Strips diacritics so "Étoile" matches a query "etoile".
 */
export function normalise(s: string): string {
    return s
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');
}

/** Match one article against the optional text `query`. */
export function matchesQuery(article: BlogArticle, query: string): boolean {
    const needle = normalise(query.trim());
    if (!needle) {
        return true;
    }
    const haystack = normalise(
        [article.title, article.excerpt, ...article.tags, ...(article.clubIds ?? [])].join(' '),
    );
    return haystack.includes(needle);
}

/** Apply every active filter in a single pass. */
export function applyFilters(
    articles: readonly BlogArticle[],
    filters: BlogFilters,
): readonly BlogArticle[] {
    return articles.filter((a) => {
        if (a.brand !== filters.brand) {
            return false;
        }
        if (filters.category && a.category !== filters.category) {
            return false;
        }
        if (filters.region && a.region !== filters.region) {
            return false;
        }
        if (filters.department && a.department !== filters.department) {
            return false;
        }
        if (filters.clubId && !(a.clubIds ?? []).includes(filters.clubId)) {
            return false;
        }
        if (filters.query && !matchesQuery(a, filters.query)) {
            return false;
        }
        return true;
    });
}

/** Return a new sorted array — does not mutate the input. */
export function sortArticles(
    articles: readonly BlogArticle[],
    sort: BlogSort,
): readonly BlogArticle[] {
    const copy = [...articles];
    if (sort === 'popular') {
        copy.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
    } else {
        copy.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    }
    return copy;
}

/**
 * Pinned articles appear first, in `pinnedOrder` ascending order. Non-pinned
 * articles then follow using the requested sort. Editorial control over the
 * hero is preserved regardless of sort choice.
 */
export function sortWithPinned(
    articles: readonly BlogArticle[],
    sort: BlogSort,
): readonly BlogArticle[] {
    const pinned = articles.filter((a) => a.isPinned);
    const rest = articles.filter((a) => !a.isPinned);
    pinned.sort((a, b) => (a.pinnedOrder ?? 0) - (b.pinnedOrder ?? 0));
    return [...pinned, ...sortArticles(rest, sort)];
}

export const DEFAULT_PER_PAGE = 9;

export function paginate<T>(
    items: readonly T[],
    page: number,
    perPage: number,
): PaginatedResult<T> {
    const safePerPage = Math.max(1, Math.floor(perPage));
    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / safePerPage));
    const safePage = Math.min(Math.max(1, Math.floor(page)), totalPages);
    const start = (safePage - 1) * safePerPage;
    return {
        items: items.slice(start, start + safePerPage),
        total,
        page: safePage,
        perPage: safePerPage,
        totalPages,
    };
}
