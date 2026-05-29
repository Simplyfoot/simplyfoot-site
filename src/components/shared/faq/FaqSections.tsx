'use client';

import { useTranslations } from 'next-intl';
import { type ReactNode, useMemo } from 'react';

import { BRAND_CONTACT } from '@/config/site';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shadcn/accordion';
import { BRANDS } from '@/utils/constants.utils';

import type { BrandSlug } from '~types/brand.types';
import type { FaqCategory } from '~types/faq.types';

interface FaqSectionsProps {
    categories: readonly FaqCategory[];
    brand: BrandSlug;
    showCategoryHeading: boolean;
    emptyMessage: string;
}

type RichValues = Record<string, string | ((chunks: ReactNode) => ReactNode)>;

export function FaqSections({
    categories,
    brand,
    showCategoryHeading,
    emptyMessage,
}: FaqSectionsProps) {
    const t = useTranslations('FAQ');
    const brandLabel = BRANDS[brand].label;
    const contact = BRAND_CONTACT[brand];

    const interpolationValues = useMemo(
        () => ({ brand: brandLabel, email: contact.email }),
        [brandLabel, contact.email],
    );

    const richHandlers = useMemo<RichValues>(
        () => ({
            ...interpolationValues,
            strong: (chunks) => <strong className="font-semibold">{chunks}</strong>,
            mail: (chunks) => (
                <a
                    href={`mailto:${contact.email}`}
                    className="text-primary focus-visible:ring-ring rounded-sm font-medium underline underline-offset-4 hover:no-underline focus-visible:ring-2 focus-visible:outline-none"
                >
                    {chunks}
                </a>
            ),
        }),
        [contact.email, interpolationValues],
    );

    if (categories.length === 0) {
        return (
            <p className="text-muted-foreground rounded-lg border border-dashed px-6 py-10 text-center">
                {emptyMessage}
            </p>
        );
    }

    return (
        <div className="space-y-10" data-slot="faq-sections">
            {categories.map((category) => (
                <section key={category.id} aria-labelledby={`faq-category-${category.id}-title`}>
                    {showCategoryHeading ? (
                        <h2
                            id={`faq-category-${category.id}-title`}
                            className="text-muted-foreground mb-3 text-sm font-semibold tracking-wide uppercase"
                        >
                            {t(`categories.${category.id}.title`)}
                        </h2>
                    ) : (
                        <h2
                            id={`faq-category-${category.id}-title`}
                            className="mb-4 flex items-end gap-2 text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl"
                        >
                            <span
                                aria-hidden="true"
                                className="bg-primary-400 h-5 w-2 shrink-0 translate-y-0.5 rounded-full sm:h-6"
                            />
                            <span>{t(`categories.${category.id}.title`)}</span>
                        </h2>
                    )}

                    <Accordion
                        type="multiple"
                        className="bg-muted/50 rounded-xl px-3 sm:rounded-2xl sm:px-4 md:px-6"
                    >
                        {category.items.map((item) => {
                            let paragraphIndex = 0;

                            return (
                                <AccordionItem key={item.id} value={`${category.id}-${item.id}`}>
                                    <AccordionTrigger className="text-sm sm:text-base md:text-lg">
                                        {t(
                                            `categories.${category.id}.items.${item.id}.question`,
                                            interpolationValues,
                                        )}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground space-y-4 text-sm leading-relaxed sm:text-base">
                                        {item.blocks.map((block, blockIndex) => {
                                            if (block.kind === 'paragraph') {
                                                const key = `categories.${category.id}.items.${item.id}.answer.p${paragraphIndex}`;
                                                paragraphIndex++;
                                                return (
                                                    <p key={`${blockIndex}-${key}`}>
                                                        {t.rich(key, richHandlers)}
                                                    </p>
                                                );
                                            }

                                            return (
                                                <ul
                                                    key={blockIndex}
                                                    className="list-disc space-y-2 pl-6"
                                                >
                                                    {Array.from(
                                                        { length: block.count ?? 0 },
                                                        (_, listIndex) => {
                                                            const key = `categories.${category.id}.items.${item.id}.answer.l${listIndex}`;
                                                            return (
                                                                <li key={key}>
                                                                    {t.rich(key, richHandlers)}
                                                                </li>
                                                            );
                                                        },
                                                    )}
                                                </ul>
                                            );
                                        })}
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </section>
            ))}
        </div>
    );
}
