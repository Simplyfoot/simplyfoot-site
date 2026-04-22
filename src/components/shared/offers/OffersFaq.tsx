import { useTranslations } from 'next-intl';

import { OFFERS_FAQ_KEYS } from '@/config/offers';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shadcn/accordion';

interface OffersFaqProps {
    className?: string;
}

/**
 * FAQ dédiée au pricing. Questions ciblant les objections classiques (quel
 * plan, engagement, évolution, moyen de paiement…). Accordéon Radix via
 * shadcn pour l'a11y native (single + collapsible).
 */
export function OffersFaq({ className }: OffersFaqProps) {
    const t = useTranslations('Offers.faq');

    return (
        <section aria-label={t('heading')} className={cn('flex flex-col gap-8', className)}>
            <header className="max-w-[55ch] space-y-3">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {t('eyebrow')}
                </p>
                <h2 className="font-display text-foreground text-3xl font-bold tracking-tight text-balance md:text-4xl">
                    {t('heading')}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">{t('intro')}</p>
            </header>

            <Accordion
                type="single"
                collapsible
                className="border-border divide-border divide-y border-t border-b"
            >
                {OFFERS_FAQ_KEYS.map((key) => (
                    <AccordionItem key={key} value={key} className="border-b-0">
                        <AccordionTrigger className="text-foreground py-5 text-left text-base font-medium hover:no-underline">
                            {t(`items.${key}.question`)}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground max-w-[65ch] pb-5 text-base leading-relaxed">
                            {t(`items.${key}.answer`)}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
