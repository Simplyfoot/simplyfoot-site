'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { REGION_LABELS } from '@/content/blog/regions';
import { getArticles } from '@/lib/blog/service';
import type {
    BlogArticle,
    BlogCategory,
    BlogFilters as BlogFiltersType,
    BlogSort,
    FrenchRegion,
} from '@/types/blog';

import { BlogFilters } from './BlogFilters';
import { BlogGrid } from './BlogGrid';
import { BlogPagination } from './BlogPagination';

interface BlogHomeClientProps {
    /** Server-rendered first page so the client sees real content immediately. */
    initialArticles: readonly BlogArticle[];
    initialTotal: number;
    initialTotalPages: number;
}

/**
 * Client-side orchestration of filters + grid + pagination.
 * Reads the URL params, calls the blog service (which stays swappable to
 * DB), and refreshes the grid. The server-rendered initial payload is used
 * while the first effect is pending to avoid a layout flash.
 */
export function BlogHomeClient({
    initialArticles,
    initialTotal,
    initialTotalPages,
}: BlogHomeClientProps) {
    const pathname = usePathname();
    const router = useRouter();
    const params = useSearchParams();

    const [articles, setArticles] = useState<readonly BlogArticle[]>(initialArticles);
    const [total, setTotal] = useState(initialTotal);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const [page, setPage] = useState(parsePage(params.get('page')));

    useEffect(() => {
        const filters: BlogFiltersType = {
            brand: 'foot',
            category: parseCategory(params.get('category')),
            region: parseRegion(params.get('region')),
            department: params.get('department') ?? undefined,
            clubId: params.get('club') ?? undefined,
            query: params.get('q') ?? undefined,
            sort: parseSort(params.get('sort')),
            page: parsePage(params.get('page')),
        };
        let cancelled = false;
        getArticles(filters).then((res) => {
            if (cancelled) {
                return;
            }
            setArticles(res.items);
            setTotal(res.total);
            setTotalPages(res.totalPages);
            setPage(res.page);
            // If the requested page exceeds the total, reset the URL to the clamped page.
            if (filters.page && filters.page > res.totalPages) {
                const next = new URLSearchParams(params.toString());
                next.delete('page');
                const q = next.toString();
                router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
            }
        });
        return () => {
            cancelled = true;
        };
    }, [params, pathname, router]);

    return (
        <div className="flex flex-col gap-8">
            <BlogFilters totalResults={total} />
            <BlogGrid articles={articles} />
            <BlogPagination page={page} totalPages={totalPages} />
        </div>
    );
}

function parseCategory(raw: string | null): BlogCategory | undefined {
    const values: readonly BlogCategory[] = [
        'resultats',
        'actualites',
        'mises-a-jour',
        'guides',
        'temoignages',
        'reglementation',
    ];
    return raw && values.includes(raw as BlogCategory) ? (raw as BlogCategory) : undefined;
}

function parseRegion(raw: string | null): FrenchRegion | undefined {
    return raw && raw in REGION_LABELS ? (raw as FrenchRegion) : undefined;
}

function parseSort(raw: string | null): BlogSort | undefined {
    return raw === 'popular' ? 'popular' : 'recent';
}

function parsePage(raw: string | null): number {
    const n = raw ? parseInt(raw, 10) : 1;
    return Number.isFinite(n) && n > 0 ? n : 1;
}
