import { ChevronDown } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { ParticleBackground } from '@/components/shared/ParticleBackground';
import { SectionDivider } from '@/components/shared/SectionDivider';
import { founders } from '@/content/about/founders';
import { cn } from '@/lib/utils';

export async function AboutHero() {
    const t = await getTranslations('about.hero');

    return (
        <section
            aria-label="Hero"
            className="relative isolate overflow-hidden bg-[--brand-surface-dark] py-(--space-section-y) text-[--simply-beige]"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,158,138,0.3)_0%,rgba(26,46,34,0.65)_45%,transparent_80%)]"
            />
            <ParticleBackground sport="foot" density={16} />

            <div className="container-simply relative z-10 flex flex-col items-center gap-8 text-center">
                <AnimatedTitle
                    sport="foot"
                    level="h1"
                    className="mx-auto max-w-[18ch] font-display text-display leading-[1.05] text-[--simply-beige]"
                >
                    {t('titleBefore')}
                    <span className="text-[#7A9E8A]">{t('titleHighlight')}</span>
                    {t('titleEnd')}
                </AnimatedTitle>
                <p className="text-body-fluid max-w-[55ch] text-balance text-[--simply-beige]/80">
                    {t('subtitle')}
                </p>

                <FounderAvatarRow />

                <a
                    href="#acte-1"
                    className="text-small-fluid mt-4 inline-flex items-center gap-2 text-[--simply-beige]/60 transition-colors hover:text-[--simply-beige]"
                >
                    {t('scrollHint')}
                    <ChevronDown className="size-4 animate-bounce" aria-hidden="true" />
                </a>
            </div>

            <SectionDivider
                sport="foot"
                className="absolute inset-x-0 bottom-0 text-[--brand-bg]"
                colorClass="text-[--brand-bg]"
            />
        </section>
    );
}

function FounderAvatarRow() {
    return (
        <div
            aria-hidden="true"
            className="mt-2 flex items-center justify-center -space-x-3 sm:-space-x-4"
        >
            {founders.map((founder) => (
                <span
                    key={founder.id}
                    className={cn(
                        'flex size-12 items-center justify-center rounded-full bg-linear-to-br',
                        'font-display text-sm font-semibold text-white ring-2 ring-[--brand-surface-dark]',
                        'shadow-[0_6px_14px_-4px_rgba(0,0,0,0.4)]',
                        founder.gradient,
                    )}
                >
                    {founder.initials}
                </span>
            ))}
        </div>
    );
}
