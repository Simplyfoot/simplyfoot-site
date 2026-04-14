import CrestGLB from 'components/brand/CrestGLBLazy';
import Image from 'next/image';
import Link from 'next/link';
import Image1 from 'assets/images/Cohesion_4.png';
import type { BrandConfig } from 'lib/config/brands';
import type { GestionClubContent } from 'content/gestion-club';

const DIVISIONS = [
  {
    nom: 'Bronze',
    model: '/blasons/bronze.glb',
    fallback: '/blasons/bronze.png',
    desc: "Division d'entrée, pour se lancer et progresser.",
  },
  {
    nom: 'Argent',
    model: '/blasons/argent.glb',
    fallback: '/blasons/argent.png',
    desc: 'Pour les joueurs réguliers et impliqués.',
  },
  {
    nom: 'Or',
    model: '/blasons/or.glb',
    fallback: '/blasons/or.PNG',
    desc: "Le palier de l'excellence technique et collective.",
  },
  {
    nom: 'Platine',
    model: '/blasons/platine.glb',
    fallback: '/blasons/platine.png',
    desc: 'Niveau élite, performance continue et régularité.',
  },
  {
    nom: 'Diamant',
    model: '/blasons/diamant.glb',
    fallback: '/blasons/diamant.png',
    desc: "Joueurs d'exception, leaders sur et hors du terrain.",
  },
  {
    nom: 'Master',
    model: '/blasons/master.glb',
    fallback: '/blasons/coupe.jpg',
    desc: "Légende du club : maîtrise et influence au top.",
  },
] as const;

const MODULES = [
  {
    icon: '🏟️',
    title: 'Organisation du club et des équipes',
    desc: 'Créez des équipes, ajoutez les joueurs et attribuez les rôles (coach, joueur, admin). Structurez tout votre club depuis une seule plateforme.',
  },
  {
    icon: '📅',
    title: 'Planification intelligente',
    desc: 'Gérez tous vos événements (matchs, entraînements, déplacements) avec rappels automatiques. Notifications email/push pour ne jamais rater un rendez-vous.',
  },
  {
    icon: '📋',
    title: 'Feuilles de match automatisées',
    desc: 'Générez vos feuilles de match en un clic : composition, postes, consignes individuelles, impression/partage immédiat.',
  },
  {
    icon: '🧠',
    title: 'Évaluation et progression des joueurs',
    desc: 'Notes simplifiées sur plusieurs critères, suivi de la progression, et classements par division (Bronze à Master). Motivez et valorisez !',
  },
  {
    icon: '📊',
    title: 'Dashboard coach avancé',
    desc: "Accédez à toutes les stats-clés de l'équipe : effectif, absences/blessures, performances collectives, top joueurs en progression.",
  },
  {
    icon: '🗂',
    title: 'Gestion documentaire & scan',
    desc: 'Centralisez et scannez tous les docs (licences, certifs médicaux, docs club…). Classement auto par joueur/équipe.',
  },
  {
    icon: '🔐',
    title: 'Accès & sécurité personnalisés',
    desc: 'Chaque rôle (coach, joueur, parent, admin) a sa propre interface. Connexion ultra-sécurisée, gestion fine des autorisations.',
  },
  {
    icon: '🤖',
    title: 'Intelligence Artificielle & recommandations',
    desc: "L'IA identifie les axes de progrès, propose des exercices adaptés et anticipe les risques (blessures, baisse de perf…).",
  },
] as const;

interface BrandGestionClubProps {
  brand: BrandConfig;
  content: GestionClubContent;
}

export function BrandGestionClub({ brand, content }: BrandGestionClubProps) {
  const [titlePrefix, ...titleRest] = content.heroTitle.split(' – ');
  const titleSuffix = titleRest.join(' – ');

  return (
    <div className="relative w-full min-h-screen bg-[var(--brand-bg)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 brand-halo" />

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-16">
        {/* Hero Section */}
        <section aria-label="Présentation gestion de club" className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-cta)]/40 bg-[var(--brand-surface)]/50 px-3 py-1 text-xs font-semibold text-[var(--color-text-beige)]/90">
              <span className="h-2 w-2 rounded-full bg-[var(--brand-cta)] animate-pulse" />
              {content.heroTag}
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white leading-tight">
              <span className="text-[var(--brand-cta)]">{titlePrefix}</span>
              {titleSuffix ? <> – {titleSuffix}</> : null}
            </h1>
            <p className="text-[var(--color-text-beige)] text-lg md:text-xl mt-4 font-medium">
              {content.heroSubtitle}
            </p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-white/90 text-base">
              {content.heroPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href={`/${brand.slug}/offres`}
                className="px-8 py-4 rounded-xl font-bold text-lg bg-[var(--brand-cta)] text-[var(--brand-bg)] shadow-xl hover:bg-[var(--brand-cta-hover)] active:scale-[.98] transition"
              >
                {content.cta1Label}
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl font-bold text-lg border border-[var(--color-text-beige)]/60 text-[var(--color-text-beige)] hover:border-[var(--brand-cta)] hover:text-[var(--brand-cta)] active:scale-[.98] transition"
              >
                Demander une démo
              </Link>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Image
              src={Image1}
              alt={content.imageAlt}
              width={520}
              height={520}
              priority
              className="rounded-3xl shadow-2xl border-4 border-[var(--brand-cta)]/40 object-cover"
            />
          </div>
        </section>

        {/* Divisions */}
        <section aria-labelledby="divisions-title">
          <h2
            id="divisions-title"
            className="text-3xl md:text-4xl font-bold text-[var(--brand-cta)] mb-8 text-center"
          >
            {content.divisionsTitle}
          </h2>
          <p className="mx-auto max-w-3xl text-center text-[var(--color-text-beige)] mb-8">
            {content.divisionsSubtitle}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 justify-center items-start">
            {DIVISIONS.map((d) => (
              <article
                key={d.nom}
                className="flex flex-col items-center justify-start bg-[var(--color-surface-dark)] rounded-2xl p-6 shadow border border-[var(--brand-cta)]/10"
              >
                <CrestGLB src={d.model} size={120} />
                <h3 className="text-[var(--brand-cta)] font-extrabold text-lg mt-2">{d.nom}</h3>
                <p className="text-center text-[var(--color-text-beige)] text-sm mt-1">{d.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Modules */}
        <section aria-labelledby="modules-title">
          <h2
            id="modules-title"
            className="text-3xl md:text-4xl font-bold text-[var(--brand-cta)] mb-8 text-center"
          >
            {content.modulesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {MODULES.map((mod) => (
              <div
                key={mod.title}
                className="bg-[var(--color-text-beige)]/90 rounded-xl p-6 flex flex-col items-center text-center shadow border border-[var(--brand-cta)]/10"
              >
                <span className="text-3xl mb-3" aria-hidden>
                  {mod.icon}
                </span>
                <h3 className="font-extrabold text-lg text-[var(--brand-bg)] mb-2">{mod.title}</h3>
                <p className="text-base text-[var(--color-surface-dark)]">{mod.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dashboard */}
        <section aria-labelledby="dashboard-title" className="my-8 flex flex-col items-center">
          <h2 id="dashboard-title" className="text-3xl md:text-4xl font-bold text-[var(--brand-cta)] mb-6 text-center">
            {content.dashboardTitle}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-white/90">
            {content.dashboardPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        {/* CTA final */}
        <section aria-labelledby="club-cta-title" className="flex flex-col items-center mt-4">
          <h2 id="club-cta-title" className="text-2xl md:text-3xl font-bold text-[var(--brand-cta)] mb-3 text-center">
            {content.ctaTitle}
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${brand.slug}/offres`}
              className="px-10 py-4 rounded-lg font-bold text-lg bg-[var(--brand-cta)] text-[var(--brand-bg)] shadow-xl hover:bg-[var(--brand-cta-hover)] active:scale-[.98] transition"
            >
              {content.cta1Label}
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 rounded-lg font-bold text-lg border border-[var(--color-text-beige)]/60 text-[var(--color-text-beige)] hover:border-[var(--brand-cta)] hover:text-[var(--brand-cta)] active:scale-[.98] transition"
            >
              Être recontacté par un expert
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
