import { redirect } from '@/i18n/navigation';

import type { AppLocale } from '~types/i18n.types';

export default async function RootPage({ params }: { params: Promise<{ locale: AppLocale }> }) {
    const { locale } = await params;

    redirect({ href: '/foot', locale });
}
