import { useTranslations } from 'next-intl';

import { FOUNDERS } from '@/config/about';
import { cn } from '@/lib/utils';

interface AboutHeroProps {
    brandLabel: string;
}

/**
 * Section 1 — hero plein écran sur fond vert foncé. Titre "Nous sommes X",
 * sous-titre "5 cofondateurs, 10 clubs pionniers, 1 conviction", et ligne
 * d'avatars chevauchants des 5 cofondateurs.
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
            <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-6 text-center">
                <h1 className="font-display max-w-[20ch] text-4xl leading-[1.05] font-bold text-balance md:text-5xl lg:text-6xl">
                    {t('titleBefore')}
                    <span className="text-story-forest-glow">{brandLabel}</span>
                </h1>
                <p className="text-secondary-50/80 max-w-[55ch] text-lg leading-relaxed text-balance">
                    {t('subtitle')}
                </p>
                <FoundersAvatarRow />
            </div>
        </section>
    );
}

function FoundersAvatarRow() {
    return (
        <div aria-hidden className="mt-4 flex items-center justify-center -space-x-3 sm:-space-x-4">
            {FOUNDERS.map((founder) => (
                <span
                    key={founder.id}
                    className={cn(
                        'flex size-14 items-center justify-center rounded-full bg-linear-to-br',
                        'font-display ring-story-forest text-sm font-semibold text-white ring-2',
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
