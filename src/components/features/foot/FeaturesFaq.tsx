import { useTranslations } from 'next-intl';

import { LANDING_FAQ_KEYS } from '@/config/features-foot';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shadcn/accordion';

interface FeaturesFaqProps {
    className?: string;
}

/**
 * FAQ de la landing — 7 questions ciblant les objections classiques des
 * présidents bénévoles (prix, âge des dirigeants, données, migration,
 * offline, contribution, innovation). Réutilise le pattern shadcn
 * Accordion déjà utilisé dans Offers / Help center.
 */
export function FeaturesFaq({ className }: FeaturesFaqProps) {
    const t = useTranslations('Features.faqSection');

    return (
        <section
            id="features-faq"
            aria-labelledby="features-faq-heading"
            className={cn('flex flex-col gap-8', className)}
        >
            <header className="flex max-w-[55ch] flex-col gap-3">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {t('eyebrow')}
                </p>
                <h2
                    id="features-faq-heading"
                    className="font-display text-foreground text-3xl leading-tight font-bold tracking-tight text-balance md:text-4xl"
                >
                    {t('heading')}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">{t('intro')}</p>
            </header>

            <Accordion
                type="single"
                collapsible
                className="border-border divide-border divide-y border-t border-b"
            >
                {LANDING_FAQ_KEYS.map((key) => (
                    <AccordionItem key={key} value={key} className="border-b-0">
                        <AccordionTrigger className="text-foreground py-5 text-left text-base font-medium hover:no-underline">
                            {t(`items.${key}.question`)}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground max-w-[70ch] pb-5 text-base leading-relaxed">
                            {t(`items.${key}.answer`)}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
