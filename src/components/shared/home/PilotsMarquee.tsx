import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { CSSProperties } from 'react';

import { getPilotLogoSrc, type PartnerEntry, PILOT_CLUBS } from '@/config/partners.config';

import type { BrandSlug } from '~types/brand.types';

interface PilotsMarqueeProps {
    brand: BrandSlug;
    /** Namespace i18n contenant les clés `pilots.eyebrow`, `pilots.title`, `pilots.description`, `pilots.logoAlt`. */
    namespace: string;
}

interface PilotLogoProps {
    brand: BrandSlug;
    club: PartnerEntry;
    alt: string;
}

function PilotLogo({ brand, club, alt }: PilotLogoProps) {
    const image = (
        <Image
            src={getPilotLogoSrc(brand, club.slug)}
            alt={alt}
            width={160}
            height={160}
            className="h-20 w-auto object-contain transition-transform duration-300 group-hover/logo:scale-110 md:h-28"
        />
    );

    const wrapperClass =
        'group/logo focus-visible:ring-primary-500 inline-flex items-center justify-center rounded-xl p-2 transition duration-300 hover:-translate-y-1 hover:drop-shadow-lg focus-visible:ring-2 focus-visible:outline-none';

    if (club.url) {
        return (
            <a
                href={club.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={club.name}
                className={wrapperClass}
            >
                {image}
            </a>
        );
    }

    return <span className={wrapperClass}>{image}</span>;
}

export async function PilotsMarquee({ brand, namespace }: PilotsMarqueeProps) {
    const pilots = PILOT_CLUBS[brand];

    if (pilots.length === 0) {
        return null;
    }

    const t = await getTranslations(namespace);

    return (
        <section
            id="pilots"
            aria-labelledby="pilots-heading"
            className="bg-secondary-50 py-20 md:py-28"
        >
            <div className="mx-auto max-w-7xl px-6 md:px-12">
                <div className="mx-auto max-w-2xl text-center">
                    <h2
                        id="pilots-heading"
                        className="text-foreground text-3xl font-bold tracking-tight md:text-4xl"
                    >
                        {t('pilots.title')}
                    </h2>

                    <p className="text-muted-foreground mt-4 text-base md:text-lg">
                        {t('pilots.description')}
                    </p>
                </div>
            </div>

            <div className="relative mt-12 overflow-hidden md:mt-16" aria-label={t('pilots.title')}>
                <div
                    aria-hidden="true"
                    className="from-secondary-50 pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent md:w-32"
                />
                <div
                    aria-hidden="true"
                    className="from-secondary-50 pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent md:w-32"
                />

                {/* Deux groupes côte-à-côte, chacun forcé à `min-w-full` pour que
                    le translate -50% reste seamless quelle que soit la largeur
                    de la viewport. Les logos s'étirent via `justify-around`. */}
                <div
                    className="marquee-track flex w-max"
                    style={{ '--marquee-duration': '40s' } as CSSProperties}
                >
                    {[0, 1].map((groupIndex) => (
                        <ul
                            key={groupIndex}
                            className="flex min-w-[100vw] shrink-0 items-center justify-around gap-8 px-4 md:gap-16 md:px-8"
                            aria-hidden={groupIndex === 1 ? 'true' : undefined}
                        >
                            {pilots.map((club) => (
                                <li key={club.slug} className="shrink-0">
                                    <PilotLogo
                                        brand={brand}
                                        club={club}
                                        alt={
                                            groupIndex === 1
                                                ? ''
                                                : t('pilots.logoAlt', { name: club.name })
                                        }
                                    />
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </section>
    );
}
