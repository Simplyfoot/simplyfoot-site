'use client';

import Link from 'next/link';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-3xl font-bold">Erreur de chargement</h1>
      <p className="mb-8 max-w-md text-white/60">
        {error.message || "Impossible de charger le blog. Veuillez reessayer."}
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="rounded-lg bg-[var(--brand-cta)] px-6 py-3 font-medium text-[var(--brand-cta-text)] transition-colors hover:opacity-90"
        >
          Reessayer
        </button>
        <Link
          href="/"
          className="rounded-lg border border-white/20 px-6 py-3 font-medium text-white/80 transition-colors hover:bg-white/5"
        >
          Retour a l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
