import { Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { AnimatedCounter } from '@/components/shared/about/AnimatedCounter';
import { PROOF_STATS, TESTIMONIAL_IDS } from '@/config/features-foot';
import { cn } from '@/lib/utils';

interface SocialProofProps {
    className?: string;
}

/**
 * Section "preuve sociale" : en-tête + grille de témoignages (citation
 * courte, auteur + rôle + club) + bande de chiffres animés qui traduit
 * l'effet terrain. Pas de logos clubs pour l'instant — pastilles initials
 * en attendant les autorisations graphiques.
 */
export function SocialProof({ className }: SocialProofProps) {
    const t = useTranslations('Features.proof');

    return (
        <section
            id="features-proof"
            aria-labelledby="features-proof-heading"
            className={cn('flex flex-col gap-12', className)}
        >
            <header className="flex max-w-[55ch] flex-col gap-3">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {t('eyebrow')}
                </p>
                <h2
                    id="features-proof-heading"
                    className="font-display text-foreground text-3xl leading-tight font-bold tracking-tight text-balance md:text-4xl"
                >
                    {t('heading')}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                    {t('intro')}
                </p>
            </header>

            <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {TESTIMONIAL_IDS.map((id) => (
                    <li
                        key={id}
                        className="border-border bg-card flex flex-col gap-4 rounded-2xl border p-6 shadow-sm"
                    >
                        <Quote className="text-primary/50 size-6" aria-hidden />
                        <blockquote className="text-foreground text-base leading-relaxed font-medium md:text-lg">
                            « {t(`testimonials.${id}.quote`)} »
                        </blockquote>
                        <footer className="text-muted-foreground mt-auto flex flex-col">
                            <span className="text-foreground text-sm font-semibold">
                                {t(`testimonials.${id}.author`)}
                            </span>
                            <span className="text-xs">{t(`testimonials.${id}.role`)}</span>
                        </footer>
                    </li>
                ))}
            </ul>

            <div className="flex flex-col gap-6">
                <h3 className="text-muted-foreground text-center text-xs font-semibold tracking-wider uppercase">
                    {t('statsHeading')}
                </h3>
                <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {PROOF_STATS.map((stat) => (
                        <li
                            key={stat.id}
                            className="border-border bg-card/70 flex flex-col items-center gap-1 rounded-2xl border p-5 text-center backdrop-blur-sm"
                        >
                            <span className="font-display text-primary text-3xl leading-none font-bold tabular-nums md:text-4xl">
                                <AnimatedCounter
                                    target={stat.target}
                                    duration={1.8}
                                    suffix={stat.suffix ?? ''}
                                    decimals={stat.decimals ?? 0}
                                />
                            </span>
                            <span className="text-muted-foreground max-w-[22ch] text-xs leading-snug md:text-sm">
                                {t(`stats.${stat.id}`)}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
