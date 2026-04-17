'use client';

import { MessageCircleQuestion } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { FaqAccordion } from '@/components/faq/FaqAccordion';
import { FaqCategoryNav } from '@/components/faq/FaqCategoryNav';
import { FaqSearch } from '@/components/faq/FaqSearch';
import { buttonVariants } from '@/components/ui/button';
import { faqCategories } from '@/content/faq/foot-faq';
import { Link } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils';

export function FaqPageContent() {
    const t = useTranslations('foot');
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState(faqCategories[0]?.id ?? '');

    const navCategories = useMemo(
        () =>
            faqCategories.map((cat) => ({
                id: cat.id,
                titleKey: cat.titleKey,
            })),
        [],
    );

    const filteredQuestions = useMemo(() => {
        const searchLower = search.toLowerCase();

        return faqCategories.flatMap((cat) => {
            // Filter by category
            if (cat.id !== activeCategory) {
                return [];
            }

            // Filter by search
            if (!search.trim()) {
                return cat.questions;
            }

            return cat.questions.filter((q) => {
                const questionText = t(q.questionKey).toLowerCase();
                const answerText = t(q.answerKey).toLowerCase();
                return questionText.includes(searchLower) || answerText.includes(searchLower);
            });
        });
    }, [search, activeCategory, t]);

    return (
        <div className="flex flex-col gap-(--space-block)">
            {/* Search */}
            <FaqSearch value={search} onChange={setSearch} />

            {/* Category nav */}
            <FaqCategoryNav
                categories={navCategories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            {/* Accordion */}
            {filteredQuestions.length > 0 ? (
                <FaqAccordion questions={filteredQuestions} />
            ) : (
                <p className="text-body-fluid py-8 text-center text-muted-foreground">
                    {t('faqPage.noResults')}
                </p>
            )}

            {/* Not found CTA */}
            <div className="flex flex-col items-center gap-4 rounded-xl bg-brand-bg p-8 text-center">
                <MessageCircleQuestion className="size-10 text-brand-primary" aria-hidden="true" />
                <p className="text-h4 font-semibold">{t('faqPage.notFound')}</p>
                <Link
                    href="/foot/contact"
                    className={cn(
                        buttonVariants({ size: 'lg' }),
                        'min-h-11 bg-brand-primary text-white hover:bg-brand-primary-dark',
                    )}
                >
                    {t('faqPage.notFoundCta')}
                </Link>
            </div>
        </div>
    );
}
