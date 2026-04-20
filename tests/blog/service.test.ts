import { describe, expect, it } from 'vitest';

import {
    getActiveRegions,
    getAdjacentArticles,
    getArticleBySlug,
    getArticles,
    getChangelog,
    getFeaturedArticles,
    getLatestResults,
    getPopularTags,
    getRelatedArticles,
} from '@/lib/blog/service';

describe('blog/service — getArticles', () => {
    it('returns only articles from the requested brand', async () => {
        const res = await getArticles({ brand: 'foot' });
        expect(res.items.length).toBeGreaterThan(0);
        expect(res.items.every((a) => a.brand === 'foot')).toBe(true);
    });

    it('filters by category', async () => {
        const res = await getArticles({ brand: 'foot', category: 'guides', perPage: 100 });
        expect(res.items.every((a) => a.category === 'guides')).toBe(true);
    });

    it('filters by region', async () => {
        const res = await getArticles({ brand: 'foot', region: 'paca', perPage: 100 });
        expect(res.items.every((a) => a.region === 'paca')).toBe(true);
    });

    it('filters by department', async () => {
        const res = await getArticles({ brand: 'foot', department: '13', perPage: 100 });
        expect(res.items.every((a) => a.department === '13')).toBe(true);
    });

    it('filters by clubId', async () => {
        const res = await getArticles({ brand: 'foot', clubId: 'fc-gardanne', perPage: 100 });
        expect(res.items.every((a) => (a.clubIds ?? []).includes('fc-gardanne'))).toBe(true);
    });

    it('accent-insensitive full-text search on the title', async () => {
        const res = await getArticles({ brand: 'foot', query: 'MARTIGUES', perPage: 100 });
        expect(res.items.some((a) => a.title.includes('Martigues'))).toBe(true);
    });

    it('pins pinned articles first regardless of date order', async () => {
        const res = await getArticles({ brand: 'foot', sort: 'recent', perPage: 100 });
        const pinnedIndices = res.items.map((a, i) => (a.isPinned ? i : -1)).filter((i) => i >= 0);
        const nonPinnedFirstIndex = res.items.findIndex((a) => !a.isPinned);
        // Every pinned article must come before the first non-pinned article.
        expect(pinnedIndices.every((i) => i < nonPinnedFirstIndex)).toBe(true);
    });

    it('paginates correctly: page 1 of 5 == first 5 items', async () => {
        const full = await getArticles({ brand: 'foot', perPage: 100 });
        const paged = await getArticles({ brand: 'foot', page: 1, perPage: 5 });
        expect(paged.items).toHaveLength(5);
        expect(paged.items).toEqual(full.items.slice(0, 5));
        expect(paged.totalPages).toBe(Math.ceil(full.total / 5));
    });

    it('popular sort ranks higher-view articles first (outside of pinned)', async () => {
        const res = await getArticles({ brand: 'foot', sort: 'popular', perPage: 100 });
        const nonPinned = res.items.filter((a) => !a.isPinned);
        for (let i = 1; i < nonPinned.length; i++) {
            const prev = nonPinned[i - 1];
            const curr = nonPinned[i];
            if (!prev || !curr) {
                continue;
            }
            expect(prev.views ?? 0).toBeGreaterThanOrEqual(curr.views ?? 0);
        }
    });
});

describe('blog/service — getArticleBySlug', () => {
    it('returns the article when the slug exists', async () => {
        const article = await getArticleBySlug('foot', 'fc-gardanne-us-martigues-district13-j8');
        expect(article).not.toBeNull();
        expect(article?.slug).toBe('fc-gardanne-us-martigues-district13-j8');
    });

    it('returns null when the slug does not exist', async () => {
        const article = await getArticleBySlug('foot', 'does-not-exist');
        expect(article).toBeNull();
    });

    it('does not leak articles across brands', async () => {
        const article = await getArticleBySlug('rugby', 'fc-gardanne-us-martigues-district13-j8');
        expect(article).toBeNull();
    });
});

describe('blog/service — getLatestResults', () => {
    it('returns only resultats articles', async () => {
        const results = await getLatestResults('foot', 10);
        expect(results.every((a) => a.category === 'resultats')).toBe(true);
    });

    it('respects the limit parameter', async () => {
        const results = await getLatestResults('foot', 2);
        expect(results).toHaveLength(2);
    });

    it('sorts by date, newest first', async () => {
        const results = await getLatestResults('foot', 10);
        for (let i = 1; i < results.length; i++) {
            const prev = results[i - 1];
            const curr = results[i];
            if (!prev || !curr) {
                continue;
            }
            expect(prev.publishedAt >= curr.publishedAt).toBe(true);
        }
    });
});

describe('blog/service — getChangelog', () => {
    it('returns only mises-a-jour articles', async () => {
        const changelog = await getChangelog('foot');
        expect(changelog.every((a) => a.category === 'mises-a-jour')).toBe(true);
    });

    it('sorts by release date, newest first', async () => {
        const changelog = await getChangelog('foot');
        for (let i = 1; i < changelog.length; i++) {
            const prev = changelog[i - 1];
            const curr = changelog[i];
            if (!prev || !curr) {
                continue;
            }
            const prevDate = prev.changelog?.releaseDate ?? prev.publishedAt;
            const currDate = curr.changelog?.releaseDate ?? curr.publishedAt;
            expect(prevDate >= currDate).toBe(true);
        }
    });
});

describe('blog/service — getFeaturedArticles', () => {
    it('returns only pinned articles', async () => {
        const featured = await getFeaturedArticles('foot', 10);
        expect(featured.every((a) => a.isPinned)).toBe(true);
    });

    it('sorts by pinnedOrder ascending', async () => {
        const featured = await getFeaturedArticles('foot', 10);
        for (let i = 1; i < featured.length; i++) {
            const prev = featured[i - 1];
            const curr = featured[i];
            if (!prev || !curr) {
                continue;
            }
            expect(prev.pinnedOrder ?? 0).toBeLessThanOrEqual(curr.pinnedOrder ?? 0);
        }
    });

    it('respects the limit parameter', async () => {
        const featured = await getFeaturedArticles('foot', 1);
        expect(featured.length).toBeLessThanOrEqual(1);
    });
});

describe('blog/service — getRelatedArticles / getAdjacentArticles / taxonomies', () => {
    it('excludes the current article from related results', async () => {
        const current = await getArticleBySlug('foot', 'fc-gardanne-us-martigues-district13-j8');
        if (!current) {
            throw new Error('Fixture article missing');
        }
        const related = await getRelatedArticles(current, 5);
        expect(related.every((a) => a.slug !== current.slug)).toBe(true);
    });

    it('prev/next links are consistent across the timeline', async () => {
        const current = await getArticleBySlug('foot', 'fc-gardanne-us-martigues-district13-j8');
        if (!current) {
            throw new Error('Fixture article missing');
        }
        const { prev, next } = await getAdjacentArticles(current);
        if (prev) {
            expect(prev.publishedAt >= current.publishedAt).toBe(true);
        }
        if (next) {
            expect(next.publishedAt <= current.publishedAt).toBe(true);
        }
    });

    it('popular tags are sorted by count descending', async () => {
        const tags = await getPopularTags('foot', 50);
        for (let i = 1; i < tags.length; i++) {
            const prev = tags[i - 1];
            const curr = tags[i];
            if (!prev || !curr) {
                continue;
            }
            expect(prev.count).toBeGreaterThanOrEqual(curr.count);
        }
    });

    it('active regions contains at least paca and bre from the fixtures', async () => {
        const regions = await getActiveRegions('foot');
        expect(regions).toContain('paca');
        expect(regions).toContain('bre');
    });
});
