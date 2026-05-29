import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import {
    BRAND_PARTNER_OF,
    BRAND_PARTNERS,
    getPartnerLogoSrc,
    getPartnerOfLogoSrc,
    type PartnerEntry,
} from '@/config/partners.config';

import type { BrandSlug } from '~types/brand.types';

interface PartnersDuoSectionProps {
    brand: BrandSlug;
    /** Namespace i18n contenant `partners.*` et `partnerOf.*`. */
    namespace: string;
}

type PartnerKind = 'partners' | 'partnerOf';

interface PartnersColumnProps {
    eyebrow: string;
    items: ReadonlyArray<PartnerEntry>;
    logoAlt: (name: string) => string;
    getLogoSrc: (slug: string) => string;
}

function PartnersColumn({ eyebrow, items, logoAlt, getLogoSrc }: PartnersColumnProps) {
    return (
        <section
            aria-label={eyebrow}
            className="bg-muted/50 flex flex-col items-center rounded-2xl border p-8 text-center md:p-10"
        >
            <p className="text-primary-700 text-sm font-semibold tracking-widest uppercase">
                {eyebrow}
            </p>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
                {items.map((partner) => {
                    const logo = (
                        <Image
                            src={getLogoSrc(partner.slug)}
                            alt={logoAlt(partner.name)}
                            width={200}
                            height={120}
                            className="h-20 w-auto object-contain transition hover:scale-105 md:h-24"
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
        </section>
    );
}

export async function PartnersDuoSection({ brand, namespace }: PartnersDuoSectionProps) {
    const partners = BRAND_PARTNERS[brand];
    const partnerOf = BRAND_PARTNER_OF[brand];

    if (partners.length === 0 && partnerOf.length === 0) {
        return null;
    }

    const t = await getTranslations(namespace);

    const logoAltFor = (kind: PartnerKind) => (name: string) => t(`${kind}.logoAlt`, { name });

    return (
        <section id="partners" aria-label={t('partners.eyebrow')} className="pt-4 pb-12 md:pt-8">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
                <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                    {partners.length > 0 && (
                        <PartnersColumn
                            eyebrow={t('partners.eyebrow')}
                            items={partners}
                            logoAlt={logoAltFor('partners')}
                            getLogoSrc={(slug) => getPartnerLogoSrc(brand, slug)}
                        />
                    )}

                    {partnerOf.length > 0 && (
                        <PartnersColumn
                            eyebrow={t('partnerOf.eyebrow')}
                            items={partnerOf}
                            logoAlt={logoAltFor('partnerOf')}
                            getLogoSrc={(slug) => getPartnerOfLogoSrc(brand, slug)}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
