import { getTranslations } from 'next-intl/server';

import { QuoteCard } from '@/components/brands/foot/QuoteCard';
import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { SectionBackground } from '@/components/shared/SectionBackground';

export async function Act3Section() {
    const t = await getTranslations('about.act3');
    const quotes = t.raw('quotes') as string[];

    return (
        <SectionBackground sport="foot" tone="light" withPattern>
            <section
                id="acte-3"
                aria-label="Acte 3 — La construction"
                className="py-(--space-section-y)"
            >
                <div className="container-simply flex flex-col items-center gap-10 text-center">
                    <div className="flex max-w-[60ch] flex-col gap-5">
                        <AnimatedTitle sport="foot" className="text-h1">
                            {t('titleBefore')}
                            <span className="text-brand-primary">{t('titleHighlight')}</span>
                            {t('titleEnd')}
                        </AnimatedTitle>
                        <p className="text-body-fluid leading-relaxed text-balance text-foreground/90">
                            {t('body')}
                        </p>
                    </div>

                    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                        {quotes.map((q, i) => (
                            <QuoteCard key={q} text={q} index={i} />
                        ))}
                    </div>
                </div>
            </section>
        </SectionBackground>
    );
}
