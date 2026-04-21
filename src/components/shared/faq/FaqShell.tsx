'use client';

import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useDeferredValue, useMemo, useState } from 'react';

import { FaqSections } from '@/components/shared/faq/FaqSections';
import { FaqSidebar } from '@/components/shared/faq/FaqSidebar';
import { BRAND_CONTACT } from '@/config/site';
import { Button } from '@/shadcn/button';
import { Input } from '@/shadcn/input';
import { BRANDS } from '@/utils/constants.utils';

import type { BrandSlug } from '~types/brand.types';
import type { FaqCategory, FaqIcon, FaqItem } from '~types/faq.types';

interface SidebarItem {
    id: string;
    icon: FaqIcon;
    title: string;
}

interface FaqShellProps {
    sidebarItems: readonly SidebarItem[];
    categories: readonly FaqCategory[];
    sidebarLabel: string;
    brand: BrandSlug;
}

function flattenForSearch(
    categoryId: string,
    item: FaqItem,
    translate: (key: string) => string,
): string {
    const parts: string[] = [translate(`categories.${categoryId}.items.${item.id}.question`)];

    let paragraphIndex = 0;
    for (const block of item.blocks) {
        if (block.kind === 'paragraph') {
            parts.push(
                translate(`categories.${categoryId}.items.${item.id}.answer.p${paragraphIndex}`),
            );
            paragraphIndex++;
        } else {
            for (let index = 0; index < (block.count ?? 0); index++) {
                parts.push(translate(`categories.${categoryId}.items.${item.id}.answer.l${index}`));
            }
        }
    }

    return parts.join(' ').toLowerCase();
}

export function FaqShell({ sidebarItems, categories, sidebarLabel, brand }: FaqShellProps) {
    const t = useTranslations('FAQ');
    const [selectedId, setSelectedId] = useState<string>(() => sidebarItems[0]?.id ?? '');
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);

    const interpolationValues = useMemo(
        () => ({
            brand: BRANDS[brand].label,
            email: BRAND_CONTACT[brand].email,
            phone: BRAND_CONTACT[brand].phone,
        }),
        [brand],
    );

    const normalizedQuery = deferredQuery.trim().toLowerCase();
    const isSearching = normalizedQuery.length > 0;

    // Index préconstruit (question + réponse aplaties, minuscules) pour la recherche.
    // Reconstruit uniquement quand la locale ou la marque change — pas à chaque
    // frappe clavier dans le champ de recherche.
    const searchIndex = useMemo<ReadonlyMap<string, string>>(() => {
        const index = new Map<string, string>();
        // Pour l'index de recherche, on prend le message brut et on retire
        // les tags ICU (<strong>, <mail>, <tel>) : la recherche compare du
        // texte pur, pas du React. `t()` appelé sur une chaîne avec tags
        // lèverait une `FORMATTING_ERROR` faute de handlers.
        const translate = (key: string): string => {
            const raw = t.raw(key);
            if (typeof raw !== 'string') {
                return '';
            }
            return raw
                .replace(/<\/?[a-z]+>/gi, '')
                .replaceAll('{brand}', interpolationValues.brand)
                .replaceAll('{email}', interpolationValues.email)
                .replaceAll('{phone}', interpolationValues.phone);
        };

        for (const category of categories) {
            for (const item of category.items) {
                index.set(
                    `${category.id}/${item.id}`,
                    flattenForSearch(category.id, item, translate),
                );
            }
        }
        return index;
    }, [categories, t, interpolationValues]);

    const visibleCategories = useMemo<readonly FaqCategory[]>(() => {
        if (isSearching) {
            const result: FaqCategory[] = [];
            for (const category of categories) {
                const items = category.items.filter((item) => {
                    const haystack = searchIndex.get(`${category.id}/${item.id}`);
                    return haystack?.includes(normalizedQuery) ?? false;
                });
                if (items.length > 0) {
                    result.push({ ...category, items });
                }
            }
            return result;
        }

        const selected = categories.find((category) => category.id === selectedId);
        return selected ? [selected] : [];
    }, [isSearching, normalizedQuery, categories, selectedId, searchIndex]);

    const handleSelectCategory = useCallback((id: string) => {
        setSelectedId(id);
        setQuery('');
    }, []);

    return (
        <div className="grid gap-4 lg:grid-cols-[260px_1fr] lg:gap-12">
            <FaqSidebar
                items={sidebarItems}
                activeId={isSearching ? null : selectedId}
                onSelect={handleSelectCategory}
                label={sidebarLabel}
            />

            <div className="min-w-0">
                <div className="relative mb-6 md:mb-8">
                    <Search
                        className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                        aria-hidden="true"
                    />
                    <Input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={t('searchPlaceholder')}
                        aria-label={t('searchPlaceholder')}
                        className="bg-background h-11 pr-10 pl-10"
                    />
                    {query ? (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label={t('searchClearLabel')}
                            onClick={() => setQuery('')}
                            className="absolute top-1/2 right-1 size-9 -translate-y-1/2"
                        >
                            <X className="size-4" aria-hidden="true" />
                        </Button>
                    ) : null}
                </div>

                <FaqSections
                    categories={visibleCategories}
                    brand={brand}
                    showCategoryHeading={isSearching}
                    emptyMessage={t('noResults')}
                />
            </div>
        </div>
    );
}
