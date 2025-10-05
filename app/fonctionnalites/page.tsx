"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ShieldCheck,
  CalendarDays,
  FileText,
  Users,
  BarChart3,
  MessageCircle,
  LayoutDashboard,
  Video,
  Bus,
  MapPin,
  CloudSun,
  BellRing,
  Gift,
  BadgeCheck,
} from "lucide-react";

// ---------- Helpers ----------
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

// ---------- Data ----------
const FEATURES = [
  {
    title: "Demandes de transport responsables",
    desc: "Organisez les trajets en un clic avec une charte parent signée. Engagement de responsabilité, visibilité des places, rappel automatique.",
    icon: <Bus size={28} className="text-[#5BE37D]" />,
    tag: "Logistique",
  },
  {
    title: "Inscription autonome des licenciés",
    desc: "Fini l'ajout manuel : chaque adhérent crée son compte et rejoint automatiquement le club et sa catégorie.",
    icon: <ShieldCheck size={28} className="text-[#5BE37D]" />,
    tag: "Gain de temps",
  },
  {
    title: "Licences, visites médicales & équipements",
    desc: "Vue centralisée par joueur : statut de licence, date de visite médicale, dotation d'équipement.",
    icon: <FileText size={28} className="text-[#5BE37D]" />,
    tag: "Suivi",
  },
  {
    title: "Création d'évènement ciblée",
    desc: "Choisissez précisément les équipes ou joueurs concernés. Disponibilités, rappels, documents liés.",
    icon: <CalendarDays size={28} className="text-[#5BE37D]" />,
    tag: "Organisation",
  },
  {
    title: "Messagerie coach ↔ joueur/équipe",
    desc: "Discussions privées ou d'équipe, pièces jointes, mentions @joueur, tout au même endroit.",
    icon: <MessageCircle size={28} className="text-[#5BE37D]" />,
    tag: "Communication",
  },
  {
    title: "Compo par glisser‑déposer",
    desc: "Alignez vos joueurs sur un terrain interactif. Enregistrez, dupliquez, partagez.",
    icon: <Users size={28} className="text-[#5BE37D]" />,
    tag: "Tactique",
  },
  {
    title: "Stats & cotation Technique/Mental",
    desc: "Évaluez chaque joueur (technique, mental, assiduité). Visualisez la progression et classements.",
    icon: <BarChart3 size={28} className="text-[#5BE37D]" />,
    tag: "Performance",
  },
  {
    title: "Badges de progression",
    desc: "Récompensez la présence et les évaluations : badges visibles par les joueurs et leurs parents.",
    icon: <BadgeCheck size={28} className="text-[#5BE37D]" />,
    tag: "Motivation",
  },
  {
    title: "GPS & météo en temps réel",
    desc: "Lien direct vers l'itinéraire, conditions météo locales, point de rendez‑vous clair.",
    icon: (
      <div className="flex items-center gap-1 text-[#5BE37D]">
        <MapPin size={24} /> <CloudSun size={24} />
      </div>
    ),
    tag: "Confort",
  },
  {
    title: "Anniversaires & vacances scolaires",
    desc: "Calendrier intelligent : anniversaires de l'équipe et vacances (zones académiques).",
    icon: <Gift size={28} className="text-[#5BE37D]" />,
    tag: "Cohésion",
  },
  {
    title: "Notifications qui n'oublient rien",
    desc: "Système de notification avancé : relances intelligentes, résumés quotidiens, silence nocturne.",
    icon: <BellRing size={28} className="text-[#5BE37D]" />,
    tag: "Rappels",
  },
];

const ROLES_IMPACT = [
  {
    role: "Président",
    items: [
      "Vision claire du club (licences, assiduité, équipements)",
      "Documents centralisés, conformité facilitée",
      "Facturation simple, plans adaptés au nombre de licenciés",
    ],
  },
  {
    role: "Coach",
    items: [
      "Convocations et relances en 2 clics",
      "Compo par drag‑and‑drop, feuilles auto",
      "Stats & progression joueur pour orienter les séances",
    ],
  },
  {
    role: "Parent",
    items: [
      "Dispo en un swipe, covoiturage sécurisé",
      "Infos match, GPS et météo intégrés",
      "Notifications utiles, pas intrusives",
    ],
  },
  {
    role: "Joueur",
    items: [
      "Badges et objectifs motivants",
      "Messagerie claire avec le coach",
      "Historique de progression personnel",
    ],
  },
];

export default function FonctionnalitesPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#14482F]">
      {/* halo */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(91,227,125,.18),transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* HERO */}
        <motion.section
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#5BE37D]/40 bg-[#1d3e2e]/50 px-3 py-1 text-xs font-semibold text-[#F8E9CA]/90">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#5BE37D]" />
            Conçu avec des coachs & des parents
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Toutes les fonctionnalités pour <span className="text-[#5BE37D]">simplifier</span> et <span className="text-[#5BE37D]">motiver</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg md:text-xl font-medium text-[#F8E9CA]">
            SimplyFoot centralise l&#39;organisation, les échanges et la progression sportive. Moins d&#39;administratif, plus de football.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/offres" className="rounded-xl bg-[#5BE37D] px-8 py-4 text-lg font-extrabold text-[#14482F] shadow-xl transition hover:bg-[#63f286] active:scale-[.98]">
              Essayer gratuitement
            </a>
            <a href="/contact" className="rounded-xl border border-[#F8E9CA]/60 px-8 py-4 text-lg font-bold text-[#F8E9CA] transition hover:border-[#5BE37D] hover:text-[#5BE37D] active:scale-[.98]">
              Demander une démo
            </a>
          </div>
        </motion.section>

        {/* GRID FEA */}
        <section className="mt-16" aria-labelledby="features-title">
          <h2 id="features-title" className="text-center text-3xl md:text-4xl font-bold text-[#5BE37D]">
            Ce que vous faites en 5 minutes, pas en 5 jours
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.article
                key={f.title}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="group rounded-2xl border border-[#5BE37D]/15 bg-[#1d3e2e]/60 p-6 shadow hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#14482F] ring-1 ring-[#5BE37D]/30">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white">{f.title}</h3>
                    <p className="mt-1 text-sm text-[#F8E9CA]">{f.desc}</p>
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#5BE37D]/25 bg-[#14482F]/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#5BE37D]">
                  {f.tag}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* IMPACT PAR RÔLE */}
        <section className="mt-16" aria-labelledby="impact-title">
          <h2 id="impact-title" className="text-center text-3xl md:text-4xl font-bold text-[#5BE37D]">
            L&#39;impact concret pour votre club
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ROLES_IMPACT.map((b, i) => (
              <motion.div
                key={b.role}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl border border-[#5BE37D]/15 bg-[#232729] p-6 text-[#F8E9CA] shadow"
              >
                <h3 className="text-white mb-2 font-extrabold">{b.role}</h3>
                <ul className="space-y-2">
                  {b.items.map((t) => (
                    <li key={t} className="flex gap-2"><span className="text-[#5BE37D]">•</span><span>{t}</span></li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SHOWCASE Transport + Compo */}
        <section className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="relative overflow-hidden rounded-2xl border border-[#5BE37D]/20 bg-[#232729] p-6">
            <h3 className="text-white text-xl font-extrabold">Transport responsable</h3>
            <p className="mt-2 text-[#F8E9CA] text-sm">
              Covoiturage clair, parents engagés via charte, itinéraires partagés en un clic. 
              Les coachs gagnent du temps, les familles sont rassurées.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-[#1d3e2e] px-2.5 py-1 text-[#5BE37D] ring-1 ring-[#5BE37D]/30">Charte signée</span>
              <span className="rounded-full bg-[#1d3e2e] px-2.5 py-1 text-[#5BE37D] ring-1 ring-[#5BE37D]/30">Places visibles</span>
              <span className="rounded-full bg-[#1d3e2e] px-2.5 py-1 text-[#5BE37D] ring-1 ring-[#5BE37D]/30">Rappels auto</span>
            </div>
            <Image src="/feature-transport.jpg" alt="Transport SimplyFoot" width={640} height={360} className="mt-4 rounded-xl object-cover" />
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="relative overflow-hidden rounded-2xl border border-[#5BE37D]/20 bg-[#232729] p-6">
            <h3 className="text-white text-xl font-extrabold">Compo par glisser‑déposer</h3>
            <p className="mt-2 text-[#F8E9CA] text-sm">
              Composez votre équipe sur un terrain interactif, sauvegardez vos schémas et partagez‑les en deux secondes.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-[#1d3e2e] px-2.5 py-1 text-[#5BE37D] ring-1 ring-[#5BE37D]/30">Terrain interactif</span>
              <span className="rounded-full bg-[#1d3e2e] px-2.5 py-1 text-[#5BE37D] ring-1 ring-[#5BE37D]/30">Exports visuels</span>
              <span className="rounded-full bg-[#1d3e2e] px-2.5 py-1 text-[#5BE37D] ring-1 ring-[#5BE37D]/30">Feuille auto</span>
            </div>
            <Image src="/feature-compo.jpg" alt="Compo SimplyFoot" width={640} height={360} className="mt-4 rounded-xl object-cover" />
          </motion.div>
        </section>

        {/* CTA FINAL */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Moins d&#39;organisation. Plus de football.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-[#F8E9CA]">
            Adoptez les fonctionnalités qui libèrent coachs et bénévoles, et qui motivent les joueurs semaine après semaine.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a href="/offres" className="rounded-xl bg-[#5BE37D] px-8 py-4 text-lg font-extrabold text-[#14482F] shadow-xl transition hover:bg-[#63f286] active:scale-[.98]">
              Découvrir les offres
            </a>
            <a href="/inscription" className="rounded-xl border border-[#F8E9CA]/60 px-8 py-4 text-lg font-bold text-[#F8E9CA] transition hover:border-[#5BE37D] hover:text-[#5BE37D] active:scale-[.98]">
              Créer un compte club
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
