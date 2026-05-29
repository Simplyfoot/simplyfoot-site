import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { BRAND_PARTNERS, getPartnerLogoSrc } from '@/config/partners.config';

import type { BrandSlug } from '~types/brand.types';

interface PartnersSectionProps {
    brand: BrandSlug;
    namespace: string;
}

export async function PartnersSection({ brand, namespace }: PartnersSectionProps) {
    const partners = BRAND_PARTNERS[brand];

    if (partners.length === 0) {
        return null;
    }

    const t = await getTranslations(namespace);

    return (
        <section
            id="partners"
            aria-labelledby="partners-heading"
            className="bg-muted py-16 md:py-20"
        >
            <div className="mx-auto max-w-7xl px-6 md:px-12">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-primary-700 text-sm font-semibold tracking-widest uppercase">
                        {t('partners.eyebrow')}
                    </p>

                    <h2
                        id="partners-heading"
                        className="text-foreground mt-3 text-2xl font-bold tracking-tight md:text-3xl"
                    >
                        {t('partners.title')}
                    </h2>
                </div>

                <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:mt-14">
                    {partners.map((partner) => {
                        const logo = (
                            <Image
                                src={getPartnerLogoSrc(brand, partner.slug)}
                                alt={t('partners.logoAlt', { name: partner.name })}
                                width={160}
                                height={80}
                                className="h-12 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 md:h-14"
                            />
                        );

                        return (
                            <li key={partner.slug}>
                                {partner.url ? (
                                    <a
                                        href={partner.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={partner.name}
                                        className="focus-visible:ring-ring inline-flex rounded-md focus-visible:ring-2 focus-visible:outline-none"
                                    >
                                        {logo}
                                    </a>
                                ) : (
                                    logo
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
