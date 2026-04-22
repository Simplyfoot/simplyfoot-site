import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ABOUT_SHAPE } from '@/config/about';
import { Link } from '@/i18n/navigation';
import { cn, range } from '@/lib/utils';
import { Button } from '@/shadcn/button';

import type { AboutBrand } from '~types/about.types';

interface AboutAct5Props {
    brand: AboutBrand;
}

/**
 * Acte 5 — conclusion + CTA. Fond sombre (symétrie avec le hero), liste de
 * 3 promesses avec icône ✦, phrase finale impactante, deux CTA (rejoindre
 * l'aventure → contact, découvrir → home de la marque).
 */
export function AboutAct5({ brand }: AboutAct5Props) {
    const t = useTranslations('About.act5');
    const promises = range(ABOUT_SHAPE.promiseCount);

    return (
        <section
            aria-label={t('title')}
            className="bg-story-forest text-secondary-50 relative isolate overflow-hidden px-4 py-20 sm:px-6 md:py-24"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--story-forest-glow)_30%,transparent)_0%,color-mix(in_srgb,var(--story-forest)_70%,transparent)_45%,transparent_80%)]"
            />

            <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-10 text-center">
                <h2 className="font-display max-w-[22ch] text-3xl leading-tight font-bold text-balance md:text-4xl">
                    {t('titleBefore')}
                    <span className="text-story-forest-glow">{t('titleHighlight')}</span>
                </h2>

                <ul className="flex max-w-[50ch] flex-col gap-4 text-left">
                    {promises.map((i) => (
                        <li
                            key={i}
                            className="flex items-start gap-3 text-base leading-relaxed md:text-lg"
                        >
                            <Sparkles
                                className="text-story-forest-glow mt-1 size-4 shrink-0"
                                aria-hidden
                            />
                            <span className="text-secondary-50/90">{t(`promises.${i}`)}</span>
                        </li>
                    ))}
                </ul>

                <p className="font-display max-w-[55ch] text-xl leading-snug text-balance md:text-2xl">
                    « {t('signature')} »
                </p>

                <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
                    <Button asChild size="lg" className="shrink-0">
                        <Link href={`/${brand}/contact`}>
                            {t('ctaPrimary')}
                            <ArrowRight className="ml-2 size-4" aria-hidden />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className={cn(
                            'border-secondary-50/40 text-secondary-50 shrink-0 bg-transparent',
                            'hover:border-secondary-50/70 hover:bg-secondary-50/10 hover:text-secondary-50',
                        )}
                    >
                        <Link href={`/${brand}`}>{t('ctaSecondary')}</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
