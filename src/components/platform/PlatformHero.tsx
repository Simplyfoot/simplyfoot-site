import Link from 'next/link';
import type { BrandConfig } from 'lib/config/brands';

interface PlatformHeroProps {
  brands: BrandConfig[];
}

export function PlatformHero({ brands: _brands }: PlatformHeroProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 pb-20 text-center sm:px-6 lg:px-8 min-h-[90vh] flex flex-col items-center justify-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-white/60 uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-white/40" aria-hidden="true" />
        La plateforme des clubs amateurs
      </span>

      <h1 className="mt-6 font-display text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl">
        Simply
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lg text-white/55 leading-relaxed">
        Un écosystème complet pour gérer, motiver et faire rayonner votre club — quel que soit
        votre sport.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/contact"
          className="rounded-xl bg-white px-7 py-3.5 text-sm font-extrabold text-[var(--color-platform-bg)] shadow-lg transition-shadow hover:shadow-white/20 hover:shadow-xl active:scale-[.98]"
        >
          Demander une démo
        </Link>
        <Link
          href="#brands"
          className="rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white/70 transition hover:border-white/40 hover:text-white active:scale-[.98]"
        >
          Découvrir les sports
        </Link>
      </div>
    </section>
  );
}
