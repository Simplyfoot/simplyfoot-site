'use client';

import { useTranslations } from 'next-intl';

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const t = useTranslations('errors');

    return (
        <main className="flex min-h-svh flex-col items-center justify-center bg-simply-black px-(--space-section-x) text-simply-beige">
            <h1 className="font-display text-display font-bold">{t('generic.title')}</h1>
            <p className="text-body-fluid mt-4 text-simply-beige/70">{t('generic.description')}</p>
            <button
                onClick={reset}
                className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-simply-blue px-6 text-simply-beige transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-simply-beige focus-visible:ring-offset-2 focus-visible:ring-offset-simply-black focus-visible:outline-none"
            >
                {t('generic.retry')}
            </button>
        </main>
    );
}
