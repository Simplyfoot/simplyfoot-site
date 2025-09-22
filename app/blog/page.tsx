"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Tag, Calendar, Clock, ArrowRight, X } from "lucide-react";

// ---------------------------------------------------------
// Helpers
// ---------------------------------------------------------
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "2-digit" });

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
    slug: "bienvenue-blog-simplyfoot",
    titre: "Bienvenue sur le blog SimplyFoot",
    resume:
      "Découvrez toutes les actus et conseils pour booster la gestion de votre club.",
    image: "/3.jpg",
    contenu:
      "Ceci est le premier article du blog. Restez connectés pour plus de contenu exclusif ! Vous trouverez ici tous nos conseils, guides, retours d’expérience, nouveautés, et astuces pour faire briller votre club amateur.",
    auteur: "L’équipe SimplyFoot",
    date: "2024-07-13",
    tags: ["Conseils", "Gestion", "Annonces"],
    featured: true,
  },
  {
    id: 2,
    slug: "organiser-convocations-comme-un-pro",
    titre: "Organiser les convocations comme un pro",
    resume:
      "Modèles prêts à l'emploi, rappels automatiques et suivi des réponses pour gagner du temps.",
    image: "/team-gestion.jpg",
    contenu:
      "Entre les messages perdus et les réponses tardives, les convocations peuvent vite devenir un casse-tête. On vous montre comment standardiser vos envois, automatiser les rappels et suivre les présences en un clin d'œil.",
    auteur: "Staff SimplyFoot",
    date: "2024-08-02",
    tags: ["Organisation", "Coach", "Productivité"],
  },
  {
    id: 3,
    slug: "statistiques-qui-motivent-vraiment",
    titre: "Les statistiques qui motivent vraiment les joueurs",
    resume:
      "Des indicateurs simples, lisibles et partagés qui changent la dynamique d'une saison.",
    image: "/1.png",
    contenu:
      "Trop de stats tuent la stat. Découvrez comment sélectionner 5 indicateurs clés pour suivre votre progression collective et donner envie aux joueurs de se dépasser.",
    auteur: "Analyse & Data",
    date: "2024-08-28",
    tags: ["Performance", "Data", "Motivation"],
  },
];

const ALL_TAGS = Array.from(new Set(BLOGS.flatMap((b) => b.tags))).sort();

// ---------------------------------------------------------
// Page
// ---------------------------------------------------------
export default function BlogPage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [quickView, setQuickView] = useState<Blog | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOGS.filter((b) => {
      const matchesQuery = !q || [b.titre, b.resume, b.contenu, b.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(q);
      const matchesTag = !tag || b.tags.includes(tag);
      return matchesQuery && matchesTag;
    }).sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [query, tag]);

  const featured = filtered.find((b) => b.featured) ?? filtered[0];
  const others = filtered.filter((b) => b.id !== featured?.id);

  return (
    <main className="relative w-full min-h-screen bg-[#14482F]">
      {/* halo */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(91,227,125,.18),transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-5 py-12">
        {/* HERO */}
        <header className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#5BE37D] drop-shadow-xl">
            SimplyFoot Le Journal
          </h1>
          <p className="mt-3 text-xl md:text-2xl font-semibold text-[#D9C6A3]">
            Conseils, innovations & actualités pour les clubs amateurs
          </p>

          {/* Search + tags */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="flex w-full max-w-2xl items-center gap-2 rounded-full bg-[#1d3e2e]/70 px-4 py-2 ring-1 ring-[#5BE37D]/30">
              <Search className="h-5 w-5 text-[#5BE37D]" />
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
                    ? "bg-[#5BE37D] text-[#14482F]"
                    : "text-[#D9C6A3] ring-1 ring-[#5BE37D]/30 hover:text-white"
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
                      ? "bg-[#5BE37D] text-[#14482F]"
                      : "text-[#D9C6A3] ring-1 ring-[#5BE37D]/30 hover:text-white"
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
          <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch">
            <article className="relative overflow-hidden rounded-3xl border border-[#5BE37D]/20 bg-[#1f4733] shadow-lg">
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
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#D9C6A3]">
                    <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4 text-[#5BE37D]" /> {formatDate(featured.date)}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4 text-[#5BE37D]" /> {readingTime(featured.contenu)} min</span>
                  </div>
                  <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-white">{featured.titre}</h2>
                  <p className="mt-1 text-[#D9C6A3]">{featured.resume}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {featured.tags.map((t) => (
                      <span key={t} className="rounded-full bg-[#14482F]/70 px-2.5 py-1 text-xs font-semibold text-[#5BE37D] ring-1 ring-[#5BE37D]/30">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-[#5BE37D] font-bold">
                    Lire l’article <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            </article>

            {/* Quick view panel */}
            <aside className="rounded-3xl border border-[#5BE37D]/20 bg-[#232729] p-6 shadow-lg text-[#D9C6A3]">
              <h3 className="text-white text-lg font-extrabold">Aperçu rapide</h3>
              <p className="mt-2 text-sm">
                Plongez dans nos guides : gestion, organisation, performance, motivation. Cliquez sur un article pour le lire en entier.
              </p>
              <ul className="mt-4 space-y-3">
                {others.slice(0, 4).map((b) => (
                  <li key={b.id} className="flex items-start gap-3">
                    <div className="relative h-14 w-20 overflow-hidden rounded-lg ring-1 ring-[#5BE37D]/20">
                      <Image src={b.image} alt="" fill className="object-cover" />
                    </div>
                    <div>
                      <Link href={`/blog/${b.slug}`} className="text-white font-semibold hover:text-[#5BE37D]">
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
        <section className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((blog) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                viewport={{ once: true }}
                className="group overflow-hidden rounded-3xl border border-[#5BE37D]/20 bg-white/95 shadow-xl hover:shadow-2xl"
              >
                <Link href={`/blog/${blog.slug}`} className="block h-full">
                  <div className="relative h-44 w-full">
                    <Image src={blog.image} alt={blog.titre} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                  </div>
                  <div className="flex flex-col gap-2 p-6 text-[#14482F]">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#3a6a52]">
                      <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4 text-[#5BE37D]" /> {formatDate(blog.date)}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4 text-[#5BE37D]" /> {readingTime(blog.contenu)} min</span>
                    </div>
                    <h3 className="text-lg font-extrabold">{blog.titre}</h3>
                    <p className="text-sm text-[#175438]">{blog.resume}</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {blog.tags.map((t) => (
                        <span key={t} className="rounded-full bg-[#e7efe9] px-2.5 py-1 text-[11px] font-semibold text-[#185C41] ring-1 ring-[#5BE37D]/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}

            {others.length === 0 && (
              <div className="col-span-full rounded-2xl border border-[#5BE37D]/20 bg-[#232729] p-10 text-center text-[#D9C6A3]">
                Aucun article ne correspond à votre recherche.
              </div>
            )}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="mt-16 rounded-3xl border border-[#5BE37D]/20 bg-[#1d3e2e]/60 p-8 text-center">
          <h3 className="text-2xl font-extrabold text-white">Recevez nos conseils directement dans votre boîte mail</h3>
          <p className="mt-2 text-[#D9C6A3]">
            1 email / mois. Pas de spam, que du terrain et des idées concrètes pour votre club.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Merci ! Nous vous inscrivons à la newsletter.");
            }}
            className="mx-auto mt-4 flex max-w-md items-center gap-2"
          >
            <input
              type="email"
              required
              placeholder="Votre email club@exemple.fr"
              className="w-full rounded-xl bg-white/95 px-4 py-3 text-[#14482F] placeholder:text-[#14482F]/60 focus:outline-none"
            />
            <button className="rounded-xl bg-[#5BE37D] px-5 py-3 font-extrabold text-[#14482F] shadow hover:bg-[#63f286]">
              S&#39;abonner
            </button>
          </form>
        </section>

        {/* QUICK VIEW MODAL (optionnel) */}
        {quickView && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => setQuickView(null)}>
            <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white" onClick={(e) => e.stopPropagation()}>
              <button className="absolute right-3 top-3 rounded-full bg-black/60 p-1 text-white" onClick={() => setQuickView(null)} aria-label="Fermer l'aperçu">
                <X className="h-5 w-5" />
              </button>
              <div className="relative h-56 w-full">
                <Image src={quickView.image} alt="" fill className="object-cover" />
              </div>
              <div className="space-y-2 p-6">
                <h3 className="text-2xl font-extrabold text-[#14482F]">{quickView.titre}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#3a6a52]">
                  <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4 text-[#185C41]" /> {formatDate(quickView.date)}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4 text-[#185C41]" /> {readingTime(quickView.contenu)} min</span>
                </div>
                <p className="text-[#232729]">{quickView.resume}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickView.tags.map((t) => (
                    <span key={t} className="rounded-full bg-[#e7efe9] px-2.5 py-1 text-[11px] font-semibold text-[#185C41] ring-1 ring-[#5BE37D]/20">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pt-3">
                  <Link href={`/blog/${quickView.slug}`} className="inline-flex items-center gap-2 rounded-xl bg-[#5BE37D] px-5 py-2 font-extrabold text-[#14482F] hover:bg-[#63f286]">
                    Lire l’article <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

