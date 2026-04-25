import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ContactContent } from '@/components/contact/foot/ContactContent';
import { buildAlternates } from '@/helpers/i18n.helpers';
import { BRANDS } from '@/utils/constants.utils';

import type { AppLocale } from '~types/i18n.types';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Contact.meta' });
    const brandLabel = BRANDS.foot.label;

    return {
        title: t('title', { brand: brandLabel }),
        description: t('description'),
        alternates: buildAlternates('/foot/contact', locale),
        openGraph: {
            title: t('title', { brand: brandLabel }),
            description: t('description'),
            siteName: brandLabel,
            locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title', { brand: brandLabel }),
            description: t('description'),
        },
    };
}

export default async function FootContactPage({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <main>
            <ContactContent />
        </main>
    );
}
