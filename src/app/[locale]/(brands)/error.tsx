'use client';

import { useTranslations } from 'next-intl';

interface BrandErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function BrandError({ reset }: BrandErrorProps) {
    const t = useTranslations('errors');

    return (
        <main className="flex min-h-svh flex-col items-center justify-center bg-[--brand-bg] px-(--space-section-x) text-foreground">
            <h1 className="font-display text-h1 font-bold text-brand-primary">
                {t('generic.title')}
            </h1>
            <p className="text-body-fluid mt-4 max-w-[60ch] text-balance text-muted-foreground">
                {t('generic.description')}
            </p>
            <button
                type="button"
                onClick={reset}
                className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-brand-primary px-6 font-medium text-white transition-colors hover:bg-brand-primary-dark focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:outline-none"
            >
                {t('generic.retry')}
            </button>
        </main>
    );
}
