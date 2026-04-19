'use client';

import { useTranslations } from 'next-intl';

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const t = useTranslations('Errors');

    return (
        <main className="text-secondary flex min-h-svh flex-col items-center justify-center bg-black px-6 md:px-12">
            <h1 className="font-sans text-4xl font-bold md:text-6xl">{t('generic.title')}</h1>
            <p className="text-secondary/70 mt-4 text-base md:text-lg">
                {t('generic.description')}
            </p>
            <button
                onClick={reset}
                type="button"
                className="bg-primary text-primary-foreground focus-visible:ring-secondary mt-8 inline-flex min-h-11 items-center rounded-lg px-6 transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
            >
                {t('generic.retry')}
            </button>
        </main>
    );
}
