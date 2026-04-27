import { useTranslations } from 'next-intl';

interface AboutHeroProps {
    brandLabel: string;
}

/**
 * Hero court et sobre — un titre, un sous-titre. Le récit prend le relais
 * juste en dessous, donc inutile d'en mettre trop ici.
 */
export function AboutHero({ brandLabel }: AboutHeroProps) {
    const t = useTranslations('About.hero');

    return (
        <section
            aria-label={t('title', { brand: brandLabel })}
            className="bg-story-forest text-secondary-50 relative isolate overflow-hidden px-4 py-20 sm:px-6 md:py-24"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--story-forest-glow)_30%,transparent)_0%,color-mix(in_srgb,var(--story-forest)_65%,transparent)_45%,transparent_80%)]"
            />
            <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-5 text-center">
                <p className="text-secondary-50/70 text-xs font-bold tracking-[0.35em] uppercase">
                    {t('eyebrow')}
                </p>
                <h1 className="font-display max-w-[20ch] text-4xl leading-[1.05] font-bold text-balance md:text-5xl lg:text-6xl">
                    {t('titleBefore')}
                    <span className="text-story-forest-glow">{brandLabel}</span>
                </h1>
                <p className="text-secondary-50/80 max-w-[55ch] text-lg leading-relaxed text-balance">
                    {t('subtitle')}
                </p>
            </div>
        </section>
    );
}
