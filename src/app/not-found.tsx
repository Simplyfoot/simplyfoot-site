import Link from 'next/link';

/**
 * Global not-found. Catches requests that never matched a locale segment
 * (e.g. unknown top-level paths, malformed locale). Must provide its own
 * <html>/<body> because the root app/layout.tsx returns children as-is
 * (the <html>/<body> live in app/[locale]/layout.tsx, which is bypassed
 * here by definition).
 *
 * Uses next/link directly (not the next-intl wrapper) since the locale
 * context is not available at this level. Copy defaults to French (primary
 * locale) for the same reason.
 */
export default function GlobalNotFound() {
    return (
        <html lang="fr">
            <body>
                <main className="flex min-h-svh flex-col items-center justify-center bg-black px-6 md:px-12">
                    <h1 className="text-secondary-50 text-4xl font-bold md:text-6xl">404</h1>
                    <p className="text-secondary-50/70 mt-4 text-base md:text-lg">
                        Page introuvable
                    </p>
                    <Link
                        href="/"
                        className="bg-primary-700 text-primary-foreground focus-visible:ring-secondary-50 mt-8 inline-flex min-h-11 items-center rounded-lg px-6 transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                    >
                        Retour à l&apos;accueil
                    </Link>
                </main>
            </body>
        </html>
    );
}
