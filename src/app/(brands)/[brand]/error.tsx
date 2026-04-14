'use client';

export default function BrandError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Une erreur est survenue</h2>
      <p className="text-[var(--color-text-beige)] mb-6 max-w-md">
        {error.message || 'Impossible de charger cette page. Veuillez r\u00e9essayer.'}
      </p>
      <button
        onClick={reset}
        className="rounded-xl bg-[var(--brand-cta)] px-6 py-3 font-bold text-[var(--brand-cta-text)] hover:bg-[var(--brand-cta-hover)] transition"
      >
        R\u00e9essayer
      </button>
    </div>
  );
}
