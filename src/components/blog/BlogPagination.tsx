'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/shadcn/pagination';

interface BlogPaginationProps {
    page: number;
    totalPages: number;
    className?: string;
}

/**
 * SEO-friendly paginated navigation. Uses `?page=N` URL param — old articles
 * stay indexable, each page has a unique canonical URL. Collapses to
 * ellipsis when there are more than 7 pages to show.
 */
export function BlogPagination({ page, totalPages, className }: BlogPaginationProps) {
    const t = useTranslations('Blog.pagination');
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    if (totalPages <= 1) {
        return null;
    }

    const buildHref = (targetPage: number) => {
        const next = new URLSearchParams(params.toString());
        if (targetPage <= 1) {
            next.delete('page');
        } else {
            next.set('page', String(targetPage));
        }
        const q = next.toString();
        return q ? `${pathname}?${q}` : pathname;
    };

    const goToPage = (targetPage: number) => (e: React.MouseEvent) => {
        e.preventDefault();
        router.replace(buildHref(targetPage), { scroll: false });
    };

    const visiblePages = computeVisiblePages(page, totalPages);

    return (
        <Pagination className={cn(className)} aria-label={t('label')}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={buildHref(page - 1)}
                        onClick={goToPage(Math.max(1, page - 1))}
                        aria-label={t('previous')}
                        aria-disabled={page === 1}
                        className={page === 1 ? 'pointer-events-none opacity-50' : undefined}
                    />
                </PaginationItem>

                {visiblePages.map((p, i) =>
                    p === 'ellipsis' ? (
                        <PaginationItem key={`ellipsis-${i}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={p}>
                            <PaginationLink
                                href={buildHref(p)}
                                onClick={goToPage(p)}
                                isActive={p === page}
                                aria-current={p === page ? 'page' : undefined}
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    ),
                )}

                <PaginationItem>
                    <PaginationNext
                        href={buildHref(page + 1)}
                        onClick={goToPage(Math.min(totalPages, page + 1))}
                        aria-label={t('next')}
                        aria-disabled={page === totalPages}
                        className={
                            page === totalPages ? 'pointer-events-none opacity-50' : undefined
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

type PageItem = number | 'ellipsis';

function computeVisiblePages(current: number, total: number): readonly PageItem[] {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }
    const pages: PageItem[] = [1];
    if (current > 3) {
        pages.push('ellipsis');
    }
    for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
        pages.push(p);
    }
    if (current < total - 2) {
        pages.push('ellipsis');
    }
    pages.push(total);
    return pages;
}
