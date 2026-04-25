'use client';

import { ArrowRight, MessageCircleQuestion } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Link } from '@/i18n/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shadcn/accordion';

import { SimmoDialog } from './SimmoDialog';

const FAQ_ITEMS = ['pilote', 'compat', 'delay'] as const;

/**
 * Section §6 — mini-FAQ + CTA Simmo. Trois questions très courtes pour
 * répondre aux objections les plus fréquentes (programme pilote, taille
 * de club, délai démo). Le CTA Simmo ouvre un dialog (présentation +
 * raccourcis FAQ/WhatsApp tant que le widget chat IA n'est pas branché).
 */
export function ContactMiniFaq() {
    const t = useTranslations('Contact.miniFaq');
    const tItems = useTranslations('Contact.miniFaq.items');
    const [simmoOpen, setSimmoOpen] = useState(false);

    return (
        <section
            aria-labelledby="contact-faq-heading"
            className="bg-secondary-50 text-story-ink w-full"
        >
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-20 sm:px-6 md:py-24">
                <div className="flex flex-col gap-3 text-center">
                    <h2
                        id="contact-faq-heading"
                        className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] font-bold tracking-tight text-balance"
                    >
                        {t('title')}
                    </h2>
                    <p className="text-story-ink/70 mx-auto max-w-[55ch] text-base leading-relaxed">
                        {t('subtitle')}
                    </p>
                </div>

                <Accordion
                    type="single"
                    collapsible
                    className="bg-story-cream-light flex flex-col gap-1 rounded-3xl px-2 py-2 shadow-[0_2px_12px_-6px_color-mix(in_srgb,var(--story-ink)_25%,transparent)] sm:px-4"
                >
                    {FAQ_ITEMS.map((key) => (
                        <AccordionItem
                            key={key}
                            value={key}
                            className="border-story-ink/10 last:border-b-0"
                        >
                            <AccordionTrigger className="text-story-ink hover:text-primary py-4 text-left text-base font-semibold sm:px-2">
                                {tItems(`${key}.question`)}
                            </AccordionTrigger>
                            <AccordionContent className="text-story-ink/80 text-base leading-relaxed sm:px-2">
                                {tItems(`${key}.answer`)}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <div className="flex flex-col items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setSimmoOpen(true)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold shadow-[0_10px_30px_-12px_color-mix(in_srgb,var(--primary)_60%,transparent)] transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                        <MessageCircleQuestion className="size-5" aria-hidden />
                        {t('ctaSimmo')}
                    </button>
                    <Link
                        href="/foot/faq"
                        className="text-story-ink/70 hover:text-primary focus-visible:ring-primary group inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-semibold focus-visible:ring-2 focus-visible:outline-none"
                    >
                        {t('ctaFaq')}
                        <ArrowRight
                            className="size-3.5 transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                        />
                    </Link>
                </div>
            </div>

            <SimmoDialog open={simmoOpen} onOpenChange={setSimmoOpen} />
        </section>
    );
}
