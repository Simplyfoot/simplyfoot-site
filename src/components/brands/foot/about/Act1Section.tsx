import { getTranslations } from 'next-intl/server';

import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { SectionBackground } from '@/components/shared/SectionBackground';

export async function Act1Section() {
    const t = await getTranslations('about.act1');
    const paragraphs = t.raw('paragraphs') as string[];

    return (
        <SectionBackground sport="foot" tone="light" withPattern>
            <section
                id="acte-1"
                aria-label="Acte 1 — Le constat"
                className="py-(--space-section-y)"
            >
                <div className="container-simply flex flex-col items-center gap-8 text-center">
                    <AnimatedTitle sport="foot" className="max-w-[22ch] text-h1">
                        {t('titleBefore')}
                        <span className="text-brand-primary">{t('titleHighlight')}</span>
                        {t('titleEnd')}
                    </AnimatedTitle>

                    <div className="flex max-w-[65ch] flex-col gap-5 text-balance">
                        {paragraphs.map((p, i) => (
                            <AnimatedCard
                                key={i}
                                sport="foot"
                                index={i}
                                className="border-none bg-transparent p-0 shadow-none before:hidden after:hidden hover:-translate-y-0 hover:scale-100 hover:shadow-none"
                            >
                                <p className="text-body-fluid leading-relaxed text-foreground/90">
                                    {p}
                                </p>
                            </AnimatedCard>
                        ))}
                    </div>
                </div>
            </section>
        </SectionBackground>
    );
}
