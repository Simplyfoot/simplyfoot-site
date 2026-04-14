'use client';

// Error boundary is a Client Component — i18n loaded statically since
// the server dictionary loader may not be available during an error.
import errorStrings from 'locales/fr/common.json';

const t = errorStrings.errors;

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-3xl font-bold">{t.genericError}</h1>
      <p className="mb-8 max-w-md text-gray-400">{error.message || t.genericErrorMessage}</p>
      <button
        onClick={reset}
        className="rounded-lg bg-[var(--brand-cta)] px-6 py-3 font-medium text-[var(--brand-cta-text)] transition-colors hover:opacity-90"
      >
        {t.retry}
      </button>
    </div>
  );
}
