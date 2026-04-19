'use client';

// TODO i18n: useTranslations('errors') — réactiver à la reconstruction.
// import { useTranslations } from 'next-intl';

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    // const t = useTranslations('errors');

    // TODO Tailwind: className="flex min-h-svh flex-col items-center justify-center bg-simply-black px-(--space-section-x) text-simply-beige"
    // TODO Tailwind h1: className="font-display text-display font-bold"
    // TODO Tailwind p: className="text-body-fluid mt-4 text-simply-beige/70"
    // TODO Tailwind button: className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-simply-blue px-6 text-simply-beige transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-simply-beige focus-visible:ring-offset-2 focus-visible:ring-offset-simply-black focus-visible:outline-none"
    return (
        <main>
            {/* TODO i18n: t('generic.title') */}
            <h1>Oops</h1>
            {/* TODO i18n: t('generic.description') */}
            <p>Une erreur est survenue.</p>
            <button onClick={reset} type="button">
                {/* TODO i18n: t('generic.retry') */}
                Réessayer
            </button>
        </main>
    );
}
