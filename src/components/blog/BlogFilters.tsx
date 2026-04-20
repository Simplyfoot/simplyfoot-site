'use client';

import { Search, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

import { getClubById } from '@/content/blog/clubs';
import { REGION_LABELS } from '@/content/blog/regions';
import { cn } from '@/lib/utils';
import { Button } from '@/shadcn/button';
import { Input } from '@/shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/select';
import type { BlogCategory, BlogSort, FrenchRegion } from '@/types/blog';

import { CategoryTabs } from './CategoryTabs';
import { ClubAutocomplete } from './ClubAutocomplete';
import { DepartmentSelect } from './DepartmentSelect';
import { RegionSelect } from './RegionSelect';

const CATEGORY_VALUES = [
    'resultats',
    'actualites',
    'mises-a-jour',
    'guides',
    'temoignages',
    'reglementation',
] as const;

interface BlogFiltersProps {
    totalResults: number;
    className?: string;
}

/**
 * URL-synchronised filters. Every filter writes to `?category=&region=&...`
 * via next/navigation's router. Search input is debounced 300ms. Active
 * filters are displayed as removable pills, with an "Effacer tout" reset.
 */
export function BlogFilters({ totalResults, className }: BlogFiltersProps) {
    const t = useTranslations('Blog.filters');
    const tCat = useTranslations('Blog.categories');
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const category = readCategory(params.get('category'));
    const region = readRegion(params.get('region'));
    const department = params.get('department');
    const clubId = params.get('club');
    const sort = readSort(params.get('sort'));

    const [searchInput, setSearchInput] = useState(params.get('q') ?? '');

    // Debounce the search input → URL param update (300ms).
    useEffect(() => {
        const handler = setTimeout(() => {
            const current = params.get('q') ?? '';
            if (searchInput !== current) {
                updateParam('q', searchInput || null);
            }
        }, 300);
        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput]);

    // Keep local state in sync when URL changes externally (back button).
    useEffect(() => {
        const next = params.get('q') ?? '';
        if (next !== searchInput) {
            setSearchInput(next);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    function updateParam(key: string, value: string | null) {
        const next = new URLSearchParams(params.toString());
        if (value === null || value === '') {
            next.delete(key);
        } else {
            next.set(key, value);
        }
        // Any filter change resets pagination.
        if (key !== 'page') {
            next.delete('page');
        }
        const q = next.toString();
        router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    }

    function updateRegion(nextRegion: FrenchRegion | null) {
        const next = new URLSearchParams(params.toString());
        if (nextRegion) {
            next.set('region', nextRegion);
        } else {
            next.delete('region');
        }
        // Changing region invalidates department.
        next.delete('department');
        next.delete('page');
        const q = next.toString();
        router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    }

    function clearAll() {
        router.replace(pathname, { scroll: false });
    }

    const activePills = useMemo(
        () =>
            buildActivePills({
                category,
                region,
                department,
                clubId,
                query: searchInput,
                labels: {
                    search: t('searchPill'),
                    region: region ? REGION_LABELS[region] : '',
                    department: department ?? '',
                    club: clubId ? (getClubById(clubId)?.name ?? clubId) : '',
                    category: category ? tCat(category) : '',
                },
            }),
        [category, region, department, clubId, searchInput, t, tCat],
    );

    return (
        <div className={cn('flex flex-col gap-5', className)}>
            <CategoryTabs value={category} onChange={(c) => updateParam('category', c)} />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_auto_auto_auto]">
                <div className="relative">
                    <Search
                        className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
                        aria-hidden
                    />
                    <Input
                        type="search"
                        placeholder={t('search')}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        aria-label={t('search')}
                        className="pl-9"
                    />
                </div>

                <RegionSelect value={region} onChange={updateRegion} className="md:w-[200px]" />

                <DepartmentSelect
                    region={region}
                    value={department}
                    onChange={(d) => updateParam('department', d)}
                    className="md:w-[180px]"
                />

                <ClubAutocomplete
                    value={clubId}
                    onChange={(id) => updateParam('club', id)}
                    className="md:w-[220px]"
                />

                <Select
                    value={sort}
                    onValueChange={(v) => updateParam('sort', v === 'recent' ? null : v)}
                >
                    <SelectTrigger className="md:w-[140px]" aria-label={t('sort')}>
                        <SelectValue placeholder={t('sort')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="recent">{t('sortRecent')}</SelectItem>
                        <SelectItem value="popular">{t('sortPopular')}</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {(activePills.length > 0 || searchInput) && (
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-muted-foreground text-sm font-medium">
                        {t('results', { count: totalResults })}
                    </span>
                    {activePills.map((pill) => (
                        <button
                            key={pill.key}
                            type="button"
                            onClick={pill.onRemove}
                            className="bg-primary/10 text-primary hover:bg-primary/15 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors"
                        >
                            <span>{pill.label}</span>
                            <X className="size-3" aria-hidden />
                            <span className="sr-only">{t('removeFilter')}</span>
                        </button>
                    ))}
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={clearAll}
                        className="text-xs"
                    >
                        {t('clearAll')}
                    </Button>
                </div>
            )}
        </div>
    );

    function buildActivePills(ctx: {
        category: BlogCategory | null;
        region: FrenchRegion | null;
        department: string | null;
        clubId: string | null;
        query: string;
        labels: {
            search: string;
            region: string;
            department: string;
            club: string;
            category: string;
        };
    }) {
        const pills: { key: string; label: string; onRemove: () => void }[] = [];
        if (ctx.query) {
            pills.push({
                key: 'q',
                label: `${ctx.labels.search}: ${ctx.query}`,
                onRemove: () => setSearchInput(''),
            });
        }
        if (ctx.category) {
            pills.push({
                key: 'category',
                label: ctx.labels.category,
                onRemove: () => updateParam('category', null),
            });
        }
        if (ctx.region) {
            pills.push({
                key: 'region',
                label: ctx.labels.region,
                onRemove: () => updateRegion(null),
            });
        }
        if (ctx.department) {
            pills.push({
                key: 'department',
                label: `${ctx.labels.department}`,
                onRemove: () => updateParam('department', null),
            });
        }
        if (ctx.clubId) {
            pills.push({
                key: 'club',
                label: ctx.labels.club,
                onRemove: () => updateParam('club', null),
            });
        }
        return pills;
    }
}

function readCategory(raw: string | null): BlogCategory | null {
    if (!raw) {
        return null;
    }
    return (CATEGORY_VALUES as readonly string[]).includes(raw) ? (raw as BlogCategory) : null;
}

function readRegion(raw: string | null): FrenchRegion | null {
    if (!raw) {
        return null;
    }
    return raw in REGION_LABELS ? (raw as FrenchRegion) : null;
}

function readSort(raw: string | null): BlogSort {
    return raw === 'popular' ? 'popular' : 'recent';
}
