'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Search, Tag, Calendar, Clock, ArrowRight, X } from 'lucide-react';

// ---------------------------------------------------------
// Helpers
// ---------------------------------------------------------
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: '2-digit' });

const readingTime = (text: string) => Math.max(1, Math.ceil(text.split(/\s+/).length / 200)); // ~200 wpm

// ---------------------------------------------------------
// Data (remplace par ton CMS / DB / MDX)
// ---------------------------------------------------------
export type Blog = {
  id: number;
  slug: string;
  titre: string;
  resume: string;
  image: string;
  contenu: string;
  auteur: string;
  date: string; // ISO
  tags: string[];
  featured?: boolean;
};

const BLOGS: Blog[] = [
  {
    id: 1,
    slug: 'bienvenue-blog-simplyfoot',
    titre: 'Bienvenue sur le blog SimplyFoot',
    resume: 'Découvrez toutes les actus et conseils pour booster la gestion de votre club.',
    image: '/3.jpg',
    contenu:
      'Ceci est le premier article du blog. Restez connectés pour plus de contenu exclusif ! Vous trouverez ici tous nos conseils, guides, retours d’expérience, nouveautés, et astuces pour faire briller votre club amateur.',
    auteur: 'L’équipe SimplyFoot',
    date: '2024-07-13',
    tags: ['Conseils', 'Gestion', 'Annonces'],
    featured: true,
  },
  {
    id: 2,
    slug: 'organiser-convocations-comme-un-pro',
    titre: 'Organiser les convocations comme un pro',
    resume:
      "Modèles prêts à l'emploi, rappels automatiques et suivi des réponses pour gagner du temps.",
    image: '/team-gestion.jpg',
    contenu:
      "Entre les messages perdus et les réponses tardives, les convocations peuvent vite devenir un casse-tête. On vous montre comment standardiser vos envois, automatiser les rappels et suivre les présences en un clin d'œil.",
    auteur: 'Staff SimplyFoot',
    date: '2024-08-02',
    tags: ['Organisation', 'Coach', 'Productivité'],
  },
  {
    id: 3,
    slug: 'statistiques-qui-motivent-vraiment',
    titre: 'Les statistiques qui motivent vraiment les joueurs',
    resume: "Des indicateurs simples, lisibles et partagés qui changent la dynamique d'une saison.",
    image: '/1.png',
    contenu:
      'Trop de stats tuent la stat. Découvrez comment sélectionner 5 indicateurs clés pour suivre votre progression collective et donner envie aux joueurs de se dépasser.',
    auteur: 'Analyse & Data',
    date: '2024-08-28',
    tags: ['Performance', 'Data', 'Motivation'],
  },
];

const ALL_TAGS = Array.from(new Set(BLOGS.flatMap((b) => b.tags))).sort();

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------
export default function BlogPage() {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string | null>(null);
  const [quickView, setQuickView] = useState<Blog | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOGS.filter((b) => {
      const matchesQuery =
        !q || [b.titre, b.resume, b.contenu, b.tags.join(' ')].join(' ').toLowerCase().includes(q);
      const matchesTag = !tag || b.tags.includes(tag);
      return matchesQuery && matchesTag;
    }).sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [query, tag]);

  const featured = filtered.find((b) => b.featured) ?? filtered[0];
  const others = filtered.filter((b) => b.id !== featured?.id);

  return (
    <div className="relative w-full min-h-screen bg-[var(--brand-bg)]">
      {/* halo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 brand-halo" />

      <div className="mx-auto max-w-7xl px-5 py-12">
        {/* HERO */}
        <header className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--brand-cta)] drop-shadow-xl">
            SimplyFoot Le Journal
          </h1>
          <p className="mt-3 text-xl md:text-2xl font-semibold text-[var(--color-text-beige)]">
            Conseils, innovations & actualités pour les clubs amateurs
          </p>

          {/* Search + tags */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="flex w-full max-w-2xl items-center gap-2 rounded-full bg-[var(--brand-surface)]/70 px-4 py-2 ring-1 ring-[var(--brand-cta)]/30">
              <Search className="h-5 w-5 text-[var(--brand-cta)]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un sujet, un tag, un mot-clé…"
                className="w-full bg-transparent text-white placeholder:text-white/60 focus:outline-none"
                aria-label="Rechercher dans le blog"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setTag(null)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition ${
                  tag === null
                    ? 'bg-[var(--brand-cta)] text-[var(--brand-bg)]'
                    : 'text-[var(--color-text-beige)] ring-1 ring-[var(--brand-cta)]/30 hover:text-white'
                }`}
              >
                <Tag className="h-3.5 w-3.5" /> Tout
              </button>
              {ALL_TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag((old) => (old === t ? null : t))}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition ${
                    tag === t
                      ? 'bg-[var(--brand-cta)] text-[var(--brand-bg)]'
                      : 'text-[var(--color-text-beige)] ring-1 ring-[var(--brand-cta)]/30 hover:text-white'
                  }`}
                >
                  <Tag className="h-3.5 w-3.5" /> {t}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* FEATURED */}
        {featured && (
          <section aria-label="Article a la une" className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch">
            <article className="relative overflow-hidden rounded-3xl border border-[var(--brand-cta)]/20 bg-[var(--color-surface-dark)] shadow-lg">
              <Link href={`/blog/${featured.slug}`} className="group block h-full">
                <div className="relative h-64 w-full md:h-full">
                  <Image
                    src={featured.image}
                    alt={featured.titre}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-beige)]">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-[var(--brand-cta)]" />{' '}
                      {formatDate(featured.date)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4 text-[var(--brand-cta)]" />{' '}
                      {readingTime(featured.contenu)} min
                    </span>
                  </div>
                  <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-white">
                    {featured.titre}
                  </h2>
                  <p className="mt-1 text-[var(--color-text-beige)]">{featured.resume}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {featured.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-[var(--brand-bg)]/70 px-2.5 py-1 text-xs font-semibold text-[var(--brand-cta)] ring-1 ring-[var(--brand-cta)]/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-[var(--brand-cta)] font-bold">
                    Lire l’article <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            </article>

            {/* Quick view panel */}
            <aside className="rounded-3xl border border-[var(--brand-cta)]/20 bg-[var(--color-surface-dark)] p-6 shadow-lg text-[var(--color-text-beige)]">
              <h3 className="text-white text-lg font-extrabold">Aperçu rapide</h3>
              <p className="mt-2 text-sm">
                Plongez dans nos guides : gestion, organisation, performance, motivation. Cliquez
                sur un article pour le lire en entier.
              </p>
              <ul className="mt-4 space-y-3">
                {others.slice(0, 4).map((b) => (
                  <li key={b.id} className="flex items-start gap-3">
                    <div className="relative h-14 w-20 overflow-hidden rounded-lg ring-1 ring-[var(--brand-cta)]/20">
                      <Image src={b.image} alt={b.titre} fill className="object-cover" />
                    </div>
                    <div>
                      <Link
                        href={`/blog/${b.slug}`}
                        className="text-white font-semibold hover:text-[var(--brand-cta)]"
                      >
                        {b.titre}
                      </Link>
                      <div className="text-xs opacity-80 flex items-center gap-2">
                        <span>{formatDate(b.date)}</span>
                        <span>•</span>
                        <span>{readingTime(b.contenu)} min</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        )}

        {/* GRID */}
        <section aria-label="Tous les articles" className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((blog) => (
              <article
                key={blog.id}
                className="group overflow-hidden rounded-3xl border border-[var(--brand-cta)]/20 bg-white/95 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <Link href={`/blog/${blog.slug}`} className="block h-full">
                  <div className="relative h-44 w-full">
                    <Image
                      src={blog.image}
                      alt={blog.titre}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-6 text-[var(--brand-bg)]">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-muted)]">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-[var(--brand-cta)]" />{' '}
                        {formatDate(blog.date)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-4 w-4 text-[var(--brand-cta)]" />{' '}
                        {readingTime(blog.contenu)} min
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold">{blog.titre}</h3>
                    <p className="text-sm text-[var(--color-text-dark)]">{blog.resume}</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {blog.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-[var(--brand-cta)]/10 px-2.5 py-1 text-[11px] font-semibold text-[var(--color-text-dark)] ring-1 ring-[var(--brand-cta)]/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}

            {others.length === 0 && (
              <div className="col-span-full rounded-2xl border border-[var(--brand-cta)]/20 bg-[var(--color-surface-dark)] p-10 text-center text-[var(--color-text-beige)]">
                Aucun article ne correspond à votre recherche.
              </div>
            )}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section aria-label="Inscription newsletter" className="mt-16 rounded-3xl border border-[var(--brand-cta)]/20 bg-[var(--brand-surface)]/60 p-8 text-center">
          <h3 className="text-2xl font-extrabold text-white">
            Recevez nos conseils directement dans votre boîte mail
          </h3>
          <p className="mt-2 text-[var(--color-text-beige)]">
            1 email / mois. Pas de spam, que du terrain et des idées concrètes pour votre club.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Merci ! Nous vous inscrivons à la newsletter.');
            }}
            className="mx-auto mt-4 flex max-w-md items-center gap-2"
          >
            <input
              type="email"
              required
              placeholder="Votre email club@exemple.fr"
              className="w-full rounded-xl bg-white/95 px-4 py-3 text-[var(--brand-bg)] placeholder:text-[var(--brand-bg)]/60 focus:outline-none"
            />
            <button className="rounded-xl bg-[var(--brand-cta)] px-5 py-3 font-extrabold text-[var(--brand-bg)] shadow hover:bg-[var(--brand-cta-hover)]">
              S&#39;abonner
            </button>
          </form>
        </section>

        {/* QUICK VIEW MODAL (optionnel) */}
        {quickView && (
          <div
            className="fixed inset-0 z-50 grid place-items-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Apercu de l article"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/60"
              onClick={() => setQuickView(null)}
              aria-label="Fermer"
              tabIndex={-1}
            />
            <div
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white"
            >
              <button
                className="absolute right-3 top-3 rounded-full bg-black/60 p-1 text-white"
                onClick={() => setQuickView(null)}
                aria-label="Fermer l'aperçu"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative h-56 w-full">
                <Image src={quickView.image} alt={quickView.titre} fill className="object-cover" />
              </div>
              <div className="space-y-2 p-6">
                <h3 className="text-2xl font-extrabold text-[var(--brand-bg)]">
                  {quickView.titre}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-muted)]">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-[var(--color-text-dark)]" />{' '}
                    {formatDate(quickView.date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-4 w-4 text-[var(--color-text-dark)]" />{' '}
                    {readingTime(quickView.contenu)} min
                  </span>
                </div>
                <p className="text-[var(--color-surface-dark)]">{quickView.resume}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickView.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[var(--brand-cta)]/10 px-2.5 py-1 text-[11px] font-semibold text-[var(--color-text-dark)] ring-1 ring-[var(--brand-cta)]/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pt-3">
                  <Link
                    href={`/blog/${quickView.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-cta)] px-5 py-2 font-extrabold text-[var(--brand-bg)] hover:bg-[var(--brand-cta-hover)]"
                  >
                    Lire l’article <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
