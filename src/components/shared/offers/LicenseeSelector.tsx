'use client';

import { Sparkles, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import {
    DEFAULT_LICENSEES,
    LICENSEE_SLIDER_MAX,
    LICENSEE_SLIDER_MIN,
    pickPlanForLicensees,
} from '@/config/offers';
import { cn } from '@/lib/utils';
import { Slider } from '@/shadcn/slider';

interface LicenseeSelectorProps {
    value: number;
    onChange: (licensees: number) => void;
    className?: string;
}

/**
 * Sélecteur ergonomique "combien de licenciés dans votre club ?". Input
 * numérique + slider synchronisés, avec rappel temps réel de l'offre
 * recommandée. Valeur initiale : `DEFAULT_LICENSEES` (≈ médiane Grand Club).
 */
export function LicenseeSelector({ value, onChange, className }: LicenseeSelectorProps) {
    const t = useTranslations('Offers.selector');
    const recommended = pickPlanForLicensees(value);

    const handleSlide = useCallback(
        (next: number[]) => {
            const raw = next[0] ?? DEFAULT_LICENSEES;
            onChange(clamp(raw));
        },
        [onChange],
    );

    const handleInput = useCallback(
        (raw: string) => {
            const parsed = parseInt(raw, 10);
            if (Number.isNaN(parsed)) {
                onChange(LICENSEE_SLIDER_MIN);
                return;
            }
            onChange(clamp(parsed));
        },
        [onChange],
    );

    return (
        <section
            aria-label={t('label')}
            className={cn(
                'border-border bg-card relative overflow-hidden rounded-3xl border p-6 shadow-sm md:p-8',
                className,
            )}
        >
            <div
                aria-hidden
                className="bg-primary/[0.06] pointer-events-none absolute -top-24 -right-24 size-56 rounded-full blur-3xl"
            />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
                <div className="flex-1 space-y-2">
                    <div className="text-primary inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
                        <Users className="size-3.5" aria-hidden />
                        {t('eyebrow')}
                    </div>
                    <h2 className="font-display text-foreground text-2xl font-bold tracking-tight md:text-3xl">
                        {t('title')}
                    </h2>
                    <p className="text-muted-foreground max-w-[55ch] text-sm leading-relaxed md:text-base">
                        {t('helper')}
                    </p>
                </div>

                <div className="flex flex-1 flex-col gap-5">
                    <div className="flex items-baseline justify-between gap-4">
                        <label
                            className="text-muted-foreground text-sm font-medium"
                            htmlFor="licensees"
                        >
                            {t('inputLabel')}
                        </label>
                        <div className="flex items-baseline gap-2">
                            <input
                                id="licensees"
                                type="number"
                                inputMode="numeric"
                                min={LICENSEE_SLIDER_MIN}
                                max={LICENSEE_SLIDER_MAX}
                                value={value}
                                onChange={(e) => handleInput(e.target.value)}
                                className="border-input bg-background focus-visible:ring-primary font-display h-11 w-24 rounded-lg border px-3 text-right text-lg font-semibold tabular-nums focus-visible:ring-2 focus-visible:outline-none"
                                aria-label={t('inputLabel')}
                            />
                            <span className="text-muted-foreground text-sm">{t('unit')}</span>
                        </div>
                    </div>

                    <Slider
                        value={[value]}
                        min={LICENSEE_SLIDER_MIN}
                        max={LICENSEE_SLIDER_MAX}
                        step={5}
                        onValueChange={handleSlide}
                        aria-label={t('sliderLabel')}
                    />

                    <div
                        className="bg-primary/5 ring-primary/20 inline-flex items-center gap-3 rounded-2xl px-4 py-3 ring-1"
                        aria-live="polite"
                    >
                        <Sparkles className="text-primary size-4 shrink-0" aria-hidden />
                        <p className="text-foreground text-sm leading-snug">
                            {t('recommended', { plan: t(`plans.${recommended.id}`) })}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function clamp(n: number): number {
    return Math.min(LICENSEE_SLIDER_MAX, Math.max(LICENSEE_SLIDER_MIN, Math.round(n)));
}
