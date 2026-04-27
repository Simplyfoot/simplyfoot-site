'use client';

import { ArrowRight, CheckCircle2, ChevronDown, Flag, ShieldCheck, Zap } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import { SimoMascot } from '@/components/features/foot/SimoMascot';
import { PhoneFrame } from '@/components/shared/PhoneFrame';
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
 * Hero home V2 — pensé pour parler à un président de club amateur dès
 * les 3 premières secondes. Deux colonnes :
 *   - Gauche : pastille d'autorité pulsante, titre massif en 3 lignes,
 *     subtitle produit concret, 2 CTA, bandeau de confiance (France,
 *     RGPD, cadence MAJ, clubs pilotes).
 *   - Droite : iPhone encadré (`<PhoneFrame>`) affichant le tableau de
 *     bord Président — la "preuve produit" immédiate, visible sans
 *     scroller. SIMO glisse un œil depuis le coin bas.
 *
 * Ambiance : fond `story-midnight` + planète 3D + double radial gradient
 * (sage + ambre) pour ajouter de la chaleur sans perdre la signature
 * cinématique.
 */
export function HomeHero({ className }: HomeHeroProps) {
    const t = useTranslations('Home.hero');
    const tCommon = useTranslations('Common');

    return (
        <section
            aria-labelledby="home-hero-title"
            className={cn(
                'bg-story-midnight text-secondary-50 relative isolate flex min-h-[88vh] w-full flex-col overflow-hidden',
                className,
            )}
        >
            <HeroPlanet ariaLabel={t('planetAlt')} />

            {/* Voile sombre + accent sage (gauche) pour lisibilité */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,color-mix(in_srgb,var(--story-forest-glow)_22%,transparent)_0%,color-mix(in_srgb,var(--story-midnight)_70%,transparent)_50%,var(--story-midnight)_90%)]"
            />
            {/* Accent ambré top-right — chaleur bois/vestiaire */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,color-mix(in_srgb,var(--warning-400)_18%,transparent)_0%,transparent_45%)]"
            />

            <div className="relative mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-16 md:py-20">
                {/* Colonne gauche — texte + autorité + CTAs + trust */}
                <div className="flex flex-col gap-8 text-center md:text-left">
                    <span className="border-story-forest-glow/40 bg-story-forest-glow/10 text-story-forest-glow inline-flex w-max items-center gap-2 self-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase md:self-start">
                        <span
                            aria-hidden
                            className="bg-story-forest-glow size-1.5 animate-pulse rounded-full"
                        />
                        {t('authorityPill')}
                    </span>

                    <h1
                        id="home-hero-title"
                        className="font-display flex flex-col gap-1 text-[clamp(2.75rem,8vw,6rem)] leading-[0.98] font-bold tracking-tighter text-balance"
                    >
                        <span>{t('titleLine1')}</span>
                        <span>{t('titleLine2')}</span>
                        <span className="text-story-forest-glow">{t('titleLine3')}</span>
                    </h1>

                    <p className="text-secondary-50/80 max-w-[54ch] text-base leading-relaxed md:text-lg">
                        {t('subtitle')}
                    </p>

                    <div className="flex flex-col items-center gap-3 sm:flex-row md:items-start">
                        <Link
                            href="/foot/contact"
                            className="focus-visible:ring-primary-foreground bg-primary text-primary-foreground hover:bg-primary/90 group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold shadow-[0_10px_30px_-10px_color-mix(in_srgb,var(--story-forest-glow)_80%,transparent)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-10px_color-mix(in_srgb,var(--story-forest-glow)_90%,transparent)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                            {t('ctaPrimary')}
                            <ArrowRight
                                className="size-4 transition-transform group-hover:translate-x-0.5"
                                aria-hidden
                            />
                        </Link>
                        <Link
                            href="/foot/features"
                            className="focus-visible:ring-secondary-50 border-secondary-50/25 text-secondary-50 hover:border-secondary-50/60 hover:bg-secondary-50/10 inline-flex items-center justify-center gap-2 rounded-full border bg-transparent px-6 py-3.5 text-base font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                            {t('ctaSecondary')}
                        </Link>
                    </div>

                    <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium md:justify-start">
                        <TrustItem icon={<Flag className="size-3.5" aria-hidden />}>
                            {t('trust.france')}
                        </TrustItem>
                        <TrustItem icon={<ShieldCheck className="size-3.5" aria-hidden />}>
                            {t('trust.rgpd')}
                        </TrustItem>
                        <TrustItem icon={<Zap className="size-3.5" aria-hidden />}>
                            {t('trust.updates')}
                        </TrustItem>
                        <TrustItem icon={<CheckCircle2 className="size-3.5" aria-hidden />}>
                            {t('trust.pilots')}
                        </TrustItem>
                    </ul>
                </div>

                {/* Colonne droite — iPhone encadré + SIMO */}
                <div className="relative flex items-center justify-center md:justify-end">
                    {/* Halo derrière le téléphone */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--story-forest-glow)_28%,transparent)_0%,transparent_65%)]"
                    />
                    <PhoneFrame
                        src="/images/Accueil President.png"
                        alt={t('mockupAlt')}
                        size="lg"
                        rotation="rotate-[3deg]"
                        priority
                    />
                    {/* SIMO décalé bas-gauche du téléphone, taille modeste */}
                    <div className="absolute -bottom-4 left-0 md:-bottom-6 md:left-2">
                        <SimoMascot
                            pose="default"
                            alt={tCommon('simoAlt')}
                            bubble={t('simoBubble')}
                            bubbleSide="right"
                            sizeClassName="size-24 md:size-28"
                            bubbleClassName="bg-white/95 text-foreground"
                        />
                    </div>
                </div>
            </div>

            <a
                href="#home-clubs"
                aria-label={t('scrollHint')}
                className="focus-visible:ring-secondary-50 absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-1 text-[10px] font-semibold tracking-[0.4em] uppercase opacity-60 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:outline-none"
            >
                {t('scrollHint')}
                <ChevronDown className="size-4 animate-bounce" aria-hidden />
            </a>
        </section>
    );
}

function TrustItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <li className="text-secondary-50/75 inline-flex items-center gap-1.5">
            <span className="text-story-forest-glow/90">{icon}</span>
            {children}
        </li>
    );
}
