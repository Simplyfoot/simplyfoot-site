// TODO i18n: useTranslations('errors') — réactiver à la reconstruction.
// import { useTranslations } from 'next-intl';

// TODO i18n: remplacer next/link par Link localisé (@/lib/i18n/routing) à la reconstruction.
import Link from 'next/link';

export default function NotFound() {
    // const t = useTranslations('errors');

    // TODO Tailwind: className="flex min-h-svh flex-col items-center justify-center bg-simply-black px-(--space-section-x) text-simply-beige"
    // TODO Tailwind h1: className="font-display text-display font-bold"
    // TODO Tailwind p: className="text-body-fluid mt-4 text-simply-beige/70"
    // TODO Tailwind a: className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-simply-blue px-6 text-simply-beige transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-simply-beige focus-visible:ring-offset-2 focus-visible:ring-offset-simply-black focus-visible:outline-none"
    return (
        <main>
            <h1>404</h1>
            {/* TODO i18n: t('notFound.description') */}
            <p>Page introuvable</p>
            {/* TODO i18n: t('notFound.backHome') */}
            <Link href="/">Retour à l&apos;accueil</Link>
        </main>
    );
}
