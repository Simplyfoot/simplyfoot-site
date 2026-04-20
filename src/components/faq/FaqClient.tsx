'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Button } from '@/shadcn/button';
import type { FaqCategory, FaqInlineToken } from '@/types/faq';

import { FaqAccordion } from './FaqAccordion';
import { FaqCategoryNav } from './FaqCategoryNav';
import { FaqSearchBar } from './FaqSearchBar';

interface FaqClientProps {
    categories: readonly FaqCategory[];
}

interface MatchResult {
    category: FaqCategory;
    items: readonly FaqCategory['items'][number][];
}

/**
 * Orchestrates search + category nav + sections. Search filters across all
 * categories and shows only matching items (question OR answer, accent- and
 * case-insensitive). The active category pill is driven by an
 * IntersectionObserver so it tracks scroll position naturally.
 *
 * Animation: pure CSS fade-up staggered per section, skipped under
 * `prefers-reduced-motion: reduce`.
 */
export function FaqClient({ categories }: FaqClientProps) {
    const t = useTranslations('Faq');
    const [query, setQuery] = useState('');
    const [activeId, setActiveId] = useState<string | null>(categories[0]?.id ?? null);
    const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

    const results = useMemo(() => filterCategories(categories, query), [categories, query]);
    const totalMatches = useMemo(
        () => results.reduce((acc, r) => acc + r.items.length, 0),
        [results],
    );
    const empty = query.trim().length > 0 && totalMatches === 0;

    // Track which category is currently in view (for nav pill active state).
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                // Take the section whose center is nearest the viewport top.
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                const first = visible[0];
                if (first) {
                    const id = first.target.getAttribute('data-faq-section');
                    if (id) {
                        setActiveId(id);
                    }
                }
            },
            {
                // Activate roughly when the section title reaches 30% from top.
                rootMargin: '-30% 0px -60% 0px',
                threshold: [0, 0.25, 0.5, 0.75, 1],
            },
        );
        sectionsRef.current.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [results]);

    const registerSection = useCallback((id: string, el: HTMLElement | null) => {
        if (el) {
            sectionsRef.current.set(id, el);
        } else {
            sectionsRef.current.delete(id);
        }
    }, []);

    const navigateToCategory = useCallback((id: string) => {
        const el = sectionsRef.current.get(id);
        if (!el) {
            return;
        }
        setActiveId(id);
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    return (
        <div className="flex flex-col gap-8">
            <FaqSearchBar
                value={query}
                onChange={setQuery}
                placeholder={t('search.placeholder')}
                ariaLabel={t('search.ariaLabel')}
                clearLabel={t('search.clearLabel')}
            />

            <FaqCategoryNav
                categories={categories}
                activeId={activeId}
                onNavigate={navigateToCategory}
            />

            {empty ? (
                <div className="border-border bg-card flex min-h-[30vh] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed p-8 text-center">
                    <p className="font-display text-foreground text-lg font-semibold">
                        {t('empty.title')}
                    </p>
                    <p className="text-muted-foreground max-w-[45ch] text-sm">
                        {t('empty.description')}
                    </p>
                    <Button type="button" variant="outline" onClick={() => setQuery('')}>
                        {t('empty.clearButton')}
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-14">
                    {results.map((res, i) => (
                        <FaqSection
                            key={res.category.id}
                            category={res.category}
                            items={res.items}
                            register={registerSection}
                            index={i}
                            questionsSuffix={t('questionsSuffix', {
                                count: res.items.length,
                            })}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

/* ───────────── Section wrapper (exported via internal helper) ───────────── */

interface FaqSectionProps {
    category: FaqCategory;
    items: MatchResult['items'];
    register: (id: string, el: HTMLElement | null) => void;
    index: number;
    questionsSuffix: string;
}

function FaqSection({ category, items, register, index, questionsSuffix }: FaqSectionProps) {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        register(category.id, ref.current);
        return () => register(category.id, null);
    }, [category.id, register]);

    return (
        <section
            ref={ref}
            data-faq-section={category.id}
            id={category.id}
            className="scroll-mt-24 motion-safe:animate-[faq-fade-up_0.4s_ease-out_both]"
            style={{ animationDelay: `${index * 60}ms` }}
        >
            <header className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-display text-foreground text-2xl font-semibold">
                    {category.title}
                </h2>
                <span className="text-muted-foreground text-sm tabular-nums">
                    {items.length} {questionsSuffix}
                </span>
            </header>
            <FaqAccordion scope={category.id} items={items} />
        </section>
    );
}

/* ───────────── Filtering helpers ───────────── */

function normalise(s: string): string {
    return s
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');
}

function tokensToText(tokens: readonly FaqInlineToken[]): string {
    return tokens
        .map((tok) => {
            switch (tok.type) {
                case 'text':
                case 'strong':
                    return tok.value;
                case 'email':
                    return `${tok.label ?? ''} ${tok.address}`;
                case 'phone':
                    return `${tok.label ?? ''} ${tok.number}`;
            }
        })
        .join(' ');
}

function filterCategories(
    categories: readonly FaqCategory[],
    query: string,
): readonly MatchResult[] {
    const needle = normalise(query.trim());
    if (!needle) {
        return categories.map((category) => ({ category, items: category.items }));
    }

    return categories
        .map((category) => {
            const items = category.items.filter((item) => {
                const haystack = [
                    item.question,
                    ...item.answer.flatMap((block) =>
                        block.type === 'paragraph'
                            ? [tokensToText(block.tokens)]
                            : block.items.map((li) => tokensToText(li)),
                    ),
                ].join(' ');
                return normalise(haystack).includes(needle);
            });
            return { category, items };
        })
        .filter((r) => r.items.length > 0);
}
