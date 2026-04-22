'use client';

import { useTranslations } from 'next-intl';

import { CLUB_SIZES } from '@/config/offers';
import { cn } from '@/lib/utils';

import type { ClubSize } from '~types/offers.types';

interface SizeSelectorProps {
    value: ClubSize;
    onChangeAction: (size: ClubSize) => void;
    className?: string;
}

/**
 * Sélecteur de taille de club — 3 pastilles (petit / moyen / grand). La
 * taille détermine uniquement le multiplicateur de prix ; elle est
 * orthogonale au choix de tier (DÉCOUVERTE / STARTER / CLUB).
 *
 * Pattern `role="radiogroup"` pour l'a11y clavier. Simplicité volontaire
 * (vs ancien slider) : un président sait si son club a 80, 200 ou 600
 * licenciés — il lui suffit de cliquer.
 */
export function SizeSelector({ value, onChangeAction, className }: SizeSelectorProps) {
    const t = useTranslations('Offers.sizes');

    return (
        <section
            aria-labelledby="offers-size-heading"
            className={cn(
                'border-border bg-card flex flex-col gap-5 rounded-3xl border p-6 shadow-sm md:p-8',
                className,
            )}
        >
            <header className="flex flex-col gap-2 text-center md:text-left">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {t('eyebrow')}
                </p>
                <h2
                    id="offers-size-heading"
                    className="font-display text-foreground text-2xl leading-tight font-bold tracking-tight text-balance md:text-3xl"
                >
                    {t('heading')}
                </h2>
                <p className="text-muted-foreground max-w-[55ch] text-sm leading-relaxed md:text-base">
                    {t('helper')}
                </p>
            </header>

            <div
                role="radiogroup"
                aria-label={t('heading')}
                className="border-border bg-background/70 -mx-2 flex items-stretch gap-1.5 overflow-x-auto rounded-full border p-1.5 shadow-inner sm:mx-0 sm:gap-2"
            >
                {CLUB_SIZES.map((size) => {
                    const active = size.id === value;
                    return (
                        <button
                            key={size.id}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => onChangeAction(size.id)}
                            className={cn(
                                'focus-visible:ring-primary flex flex-1 shrink-0 flex-col items-center gap-0.5 rounded-full px-4 py-2 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:outline-none sm:flex-row sm:justify-center sm:gap-2',
                                active
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5',
                            )}
                        >
                            <span>{t(`${size.id}.label`)}</span>
                            <span
                                className={cn(
                                    'text-[11px] font-medium tracking-tight',
                                    active ? 'text-primary-foreground/80' : 'text-muted-foreground',
                                )}
                            >
                                {t(`${size.id}.short`)}
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
