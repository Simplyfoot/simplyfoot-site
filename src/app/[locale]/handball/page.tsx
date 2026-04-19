import { setRequestLocale } from 'next-intl/server';

import { type AppLocale } from '@/i18n/routing';

export default async function HandballHomePage({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <main />;
}
