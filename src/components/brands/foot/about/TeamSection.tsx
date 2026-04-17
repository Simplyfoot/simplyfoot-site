import { getTranslations } from 'next-intl/server';

import { FounderCard } from '@/components/brands/foot/FounderCard';
import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { SectionBackground } from '@/components/shared/SectionBackground';
import { founders } from '@/content/about/founders';

export async function TeamSection() {
    const t = await getTranslations('about.team');

    return (
        <SectionBackground sport="foot" tone="tinted">
            <section id="team" aria-label="Équipe" className="py-(--space-section-y)">
                <div className="container-simply flex flex-col items-center gap-(--space-block)">
                    <div className="flex max-w-[55ch] flex-col items-center gap-3 text-center">
                        <AnimatedTitle sport="foot" className="text-h1">
                            {t('titleBefore')}
                            <span className="text-brand-primary">{t('titleHighlight')}</span>
                            {t('titleEnd')}
                        </AnimatedTitle>
                        <p className="text-body-fluid text-balance text-muted-foreground">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {founders.map((founder, i) => (
                            <FounderCard key={founder.id} founder={founder} index={i} />
                        ))}
                    </div>
                </div>
            </section>
        </SectionBackground>
    );
}
