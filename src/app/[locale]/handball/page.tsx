import { setRequestLocale } from 'next-intl/server';

import type { AppLocale } from '~types/i18n.types';

export default async function HandballHomePage({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <main />;
}
