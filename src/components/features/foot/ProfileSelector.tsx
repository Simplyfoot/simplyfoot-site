'use client';

import type { LucideIcon } from 'lucide-react';
import { Check, Crown, Flag, Shirt, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import {
    PROFILE_IDS,
    PROFILE_MOCKUPS,
    PROFILE_SIMO_POSE,
    type ProfileId,
} from '@/config/features-foot';
import { cn, range } from '@/lib/utils';

import { ProfileMockup } from './ProfileMockup';
import { SimoMascot } from './SimoMascot';

interface ProfileSelectorProps {
    className?: string;
}

/**
 * Sélecteur premium de profil utilisateur. Onglets horizontaux en desktop,
 * scroll horizontal en mobile. Change simultanément : la fiche de
 * promesse, la liste de points forts, le mockup iPhone, et la pose SIMO.
 *
 * Ne dépend d'aucune lib d'animation : les changements sont instantanés
 * côté DOM mais la transition `duration-500` de `ProfileMockup` lisse le
 * swap visuel.
 */
export function ProfileSelector({ className }: ProfileSelectorProps) {
    const t = useTranslations('Features.profiles');
    const tCommon = useTranslations('Common');
    const [active, setActive] = useState<ProfileId>('president');

    return (
        <section
            id="features-profiles"
            aria-labelledby="features-profiles-heading"
            className={cn('flex flex-col gap-10', className)}
        >
            <header className="flex max-w-[55ch] flex-col gap-3">
                <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {t('eyebrow')}
                </p>
                <h2
                    id="features-profiles-heading"
                    className="font-display text-foreground text-3xl leading-tight font-bold tracking-tight text-balance md:text-4xl"
                >
                    {t('heading')}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed md:text-lg">
                    {t('intro')}
                </p>
            </header>

            <div
                role="tablist"
                aria-label={t('eyebrow')}
                className="border-border bg-background/70 -mx-4 flex items-center gap-1.5 overflow-x-auto rounded-none border-y p-2 shadow-sm backdrop-blur-sm sm:mx-0 sm:gap-2 sm:rounded-full sm:border"
            >
                {PROFILE_IDS.map((id) => {
                    const isActive = id === active;
                    const Icon = PROFILE_ICONS[id];
                    return (
                        <button
                            key={id}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`profile-panel-${id}`}
                            id={`profile-tab-${id}`}
                            onClick={() => setActive(id)}
                            className={cn(
                                'focus-visible:ring-primary inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:outline-none',
                                isActive
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5',
                            )}
                        >
                            <Icon className="size-4" aria-hidden />
                            {t(`items.${id}.tab`)}
                        </button>
                    );
                })}
            </div>

            <div
                id={`profile-panel-${active}`}
                role="tabpanel"
                aria-labelledby={`profile-tab-${active}`}
                className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1.2fr_1fr] md:items-center"
            >
                <div className="flex flex-col gap-5">
                    <h3 className="font-display text-foreground text-2xl leading-tight font-bold tracking-tight text-balance md:text-3xl">
                        {t(`items.${active}.accroche`)}
                    </h3>
                    <p className="text-muted-foreground max-w-[55ch] text-base leading-relaxed md:text-lg">
                        {t(`items.${active}.promise`)}
                    </p>
                    <ul className="flex flex-col gap-3">
                        {range(4).map((i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="bg-primary/15 text-primary flex size-6 shrink-0 items-center justify-center rounded-full">
                                    <Check className="size-3.5" aria-hidden />
                                </span>
                                <span className="text-foreground/90 text-sm leading-relaxed md:text-base">
                                    {t(`items.${active}.points.${i}`)}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-2">
                        <SimoMascot
                            pose={PROFILE_SIMO_POSE[active]}
                            alt={tCommon('simoAlt')}
                            bubble={t(`items.${active}.simoBubble`)}
                            bubbleSide="right"
                            sizeClassName="size-32 md:size-40"
                        />
                    </div>
                </div>

                <div className="relative flex justify-center">
                    <ProfileMockup
                        key={active}
                        mockupSrc={PROFILE_MOCKUPS[active]}
                        alt={t(`items.${active}.mockupAlt`)}
                    />
                </div>
            </div>
        </section>
    );
}

const PROFILE_ICONS: Record<ProfileId, LucideIcon> = {
    president: Crown,
    coach: Flag,
    player: Shirt,
    parent: Users,
};
