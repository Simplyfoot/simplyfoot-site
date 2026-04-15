'use client';

import Link from 'next/link';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-2xl font-bold text-white">Erreur</h1>
      <p className="mb-8 max-w-md text-white/50 text-sm">
        {error.message || 'Une erreur est survenue dans le back-office.'}
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[var(--admin-bg)] hover:bg-white/90 transition-colors"
        >
          Reessayer
        </button>
        <Link
          href="/admin/dashboard"
          className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-white/60 hover:text-white transition-colors"
        >
          Retour au dashboard
        </Link>
      </div>
    </div>
  );
}
