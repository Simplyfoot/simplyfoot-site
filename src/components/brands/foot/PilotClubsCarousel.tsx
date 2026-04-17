'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { pilotClubs } from '@/content/pilot-clubs';

export function PilotClubsCarousel() {
    const t = useTranslations('foot.trustSection');

    return (
        <div className="overflow-hidden py-(--space-section-y)">
            <div className="container-simply mb-(--space-block) text-center">
                <h2 className="font-display text-h2 font-bold">{t('title')}</h2>
                <p className="text-body-fluid mt-2 text-muted-foreground">{t('subtitle')}</p>
            </div>

            <div
                aria-label={t('title')}
                className="relative mx-auto flex max-w-3xl overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            >
                <div className="flex shrink-0 animate-marquee items-center gap-12 px-6">
                    {pilotClubs.map((club) => (
                        <div
                            key={club.name}
                            className="flex shrink-0 items-center justify-center px-4"
                        >
                            <Image
                                src={club.logo}
                                alt={club.name}
                                width={80}
                                height={48}
                                className="h-10 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0 md:h-12"
                            />
                        </div>
                    ))}
                </div>

                <div
                    aria-hidden="true"
                    className="flex shrink-0 animate-marquee items-center gap-12 px-6"
                >
                    {pilotClubs.map((club, index) => (
                        <div
                            key={`dup-${index}`}
                            className="flex shrink-0 items-center justify-center px-4"
                        >
                            <Image
                                src={club.logo}
                                alt=""
                                width={80}
                                height={48}
                                className="h-10 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0 md:h-12"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
