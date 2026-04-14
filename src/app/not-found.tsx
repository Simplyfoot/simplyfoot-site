import Link from 'next/link';
import { getDictionary } from 'lib/i18n/getDictionary';
import { Simmo } from 'components/shared/Simmo';

export default async function NotFound() {
  const dict = await getDictionary('fr', 'common');

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-[var(--brand-bg)] text-center px-6 pt-0 lg:pt-0 pb-10">
      <Simmo size="xl" emotion="surprise" variant="ecosystem" message="Oups ! Je me suis perdu..." />

      <h1 className="text-6xl font-extrabold text-[var(--brand-cta)] drop-shadow mb-4">
        {dict.errors.pageNotFound}
      </h1>
      <h2 className="text-2xl font-bold text-white mb-3">{dict.errors.pageNotFoundTitle}</h2>
      <p className="text-[var(--color-text-beige)]/80 max-w-md mb-8 mt-4">
        {dict.errors.pageNotFoundMessage}
      </p>

      <div className="flex flex-wrap gap-4 justify-center mt-4">
        <Link
          href="/"
          className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-[var(--brand-cta)] px-6 py-3 font-extrabold text-[var(--brand-cta-text)] shadow hover:bg-[var(--brand-cta-hover)] active:scale-[.98] transition"
        >
          {dict.cta.backToHome}
        </Link>
        <Link
          href="/contact"
          className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-[var(--brand-border)] px-6 py-3 font-semibold text-[var(--color-text-beige)] hover:border-[var(--brand-cta)] hover:text-[var(--brand-cta)] active:scale-[.98] transition"
        >
          {dict.cta.contactTeam}
        </Link>
      </div>

      <p className="mt-16 text-sm text-[var(--color-text-beige)]/60">
        {dict.platform.name} – {dict.platform.tagline}
      </p>
    </main>
  );
}
