import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { SectionBackground } from '@/components/shared/SectionBackground';

export async function Act2Section() {
    const t = await getTranslations('about.act2');
    const body = t.raw('body') as string[];

    return (
        <SectionBackground sport="foot" tone="tinted">
            <section id="acte-2" aria-label="Acte 2 — L'idée" className="py-(--space-section-y)">
                <div className="container-simply grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <div className="flex flex-col gap-6">
                        <AnimatedTitle sport="foot" className="max-w-[22ch] text-h1">
                            {t('titleBefore')}
                            <span className="text-brand-primary">{t('titleHighlight')}</span>
                            {t('titleEnd')}
                        </AnimatedTitle>
                        {body.map((p, i) => (
                            <p
                                key={i}
                                className="text-body-fluid max-w-[65ch] leading-relaxed text-foreground/90"
                            >
                                {p}
                            </p>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <StatTile
                            value={<AnimatedCounter target={2000000} duration={2.2} />}
                            caption={t('stats.licensees')}
                        />
                        <StatTile
                            value={<AnimatedCounter target={15000} duration={2.2} />}
                            caption={t('stats.clubs')}
                        />
                        <StatTile
                            value={
                                <span className="font-display text-h3 font-semibold text-brand-primary">
                                    {t('stats.volunteersQualifier')}
                                </span>
                            }
                            caption={t('stats.volunteers')}
                        />
                        <StatTile
                            value={
                                <span className="font-display text-display font-bold text-brand-primary">
                                    {t('stats.zero')}
                                </span>
                            }
                            caption={t('stats.dedicated')}
                        />
                    </div>
                </div>
            </section>
        </SectionBackground>
    );
}

function StatTile({ value, caption }: { value: ReactNode; caption: string }) {
    return (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-brand-primary/15 bg-white/60 p-5 text-center shadow-sm">
            <div className="font-display text-display leading-none font-bold text-brand-primary tabular-nums">
                {value}
            </div>
            <p className="text-small-fluid max-w-[18ch] text-muted-foreground">{caption}</p>
        </div>
    );
}
