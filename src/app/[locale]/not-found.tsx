import { useTranslations } from 'next-intl';

import { Link } from '@/lib/i18n/routing';

export default function NotFound() {
    const t = useTranslations('errors');

    return (
        <main className="flex min-h-svh flex-col items-center justify-center bg-simply-black px-(--space-section-x) text-simply-beige">
            <h1 className="font-display text-display font-bold">404</h1>
            <p className="text-body-fluid mt-4 text-simply-beige/70">{t('notFound.description')}</p>
            <Link
                href="/"
                className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-simply-blue px-6 text-simply-beige transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-simply-beige focus-visible:ring-offset-2 focus-visible:ring-offset-simply-black focus-visible:outline-none"
            >
                {t('notFound.backHome')}
            </Link>
        </main>
    );
}
