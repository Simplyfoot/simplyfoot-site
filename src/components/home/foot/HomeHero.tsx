'use client';

import { ArrowRight, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const HeroPlanet = dynamic(
    () => import('@/components/features/foot/Hero3DScene').then((m) => m.Hero3DScene),
    { ssr: false, loading: () => null },
);

interface HomeHeroProps {
    className?: string;
}

/**
 * Hero home sobre et cinématique — une seule idée : un titre massif en
 * trois lignes avec la troisième en accent sage. Zéro pill d'autorité,
 * zéro ticker, zéro pitch secondaire. Tout ça vit sur /foot/features.
 *
 * Fond `story-midnight` avec planète 3D centrée et dégradé radial large
 * pour laisser respirer la typographie. Un seul CTA primaire + scroll
 * indicator — l'intention est "fais défiler, on va te raconter".
 */
export function HomeHero({ className }: HomeHeroProps) {
    const t = useTranslations('Home.hero');

    return (
        <section
            aria-labelledby="home-hero-title"
            className={cn(
                'bg-story-midnight text-secondary-50 relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden',
                className,
            )}
        >
            <HeroPlanet ariaLabel={t('planetAlt')} />

            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,color-mix(in_srgb,var(--story-midnight)_75%,transparent)_40%,var(--story-midnight)_85%)]"
            />

            <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-10 px-4 py-20 text-center sm:px-6">
                <h1
                    id="home-hero-title"
                    className="font-display flex flex-col gap-1 text-[clamp(3rem,9vw,7rem)] leading-[0.98] font-bold tracking-tighter text-balance"
                >
                    <span>{t('titleLine1')}</span>
                    <span>{t('titleLine2')}</span>
                    <span className="text-story-forest-glow">{t('titleLine3')}</span>
                </h1>

                <p className="text-secondary-50/70 max-w-[48ch] text-base leading-relaxed md:text-lg">
                    {t('subtitle')}
                </p>

                <Link
                    href="/foot/contact"
                    className="focus-visible:ring-primary-foreground bg-primary text-primary-foreground hover:bg-primary/90 group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-base font-semibold shadow-[0_10px_30px_-10px_color-mix(in_srgb,var(--story-forest-glow)_80%,transparent)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-10px_color-mix(in_srgb,var(--story-forest-glow)_90%,transparent)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                    {t('cta')}
                    <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                    />
                </Link>
            </div>

            <a
                href="#home-whisper"
                aria-label={t('scrollHint')}
                className="focus-visible:ring-secondary-50 absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-1.5 text-[10px] font-semibold tracking-[0.4em] uppercase opacity-60 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:outline-none"
            >
                {t('scrollHint')}
                <ChevronDown className="size-4 animate-bounce" aria-hidden />
            </a>
        </section>
    );
}
