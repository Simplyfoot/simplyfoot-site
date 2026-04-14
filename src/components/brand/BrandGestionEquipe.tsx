import CrestGLB from 'components/brand/CrestGLBLazy';
import Image from 'next/image';
import Link from 'next/link';
import ImageFoot from 'assets/images/Cohesion_6.png';
import type { BrandConfig } from 'lib/config/brands';
import type { GestionEquipeContent } from 'content/gestion-equipe';

const DIVISIONS_EQUIPE = [
  {
    nom: 'Bronze',
    model: '/blasons/bronze.glb',
    fallback: '/blasons/bronze.png',
    desc: 'Débutants : faites vos preuves et amusez-vous.',
  },
  {
    nom: 'Argent',
    model: '/blasons/argent.glb',
    fallback: '/blasons/argent.png',
    desc: 'Engagés : améliorez vos compétences et performances.',
  },
  {
    nom: 'Or',
    model: '/blasons/or.glb',
    fallback: '/blasons/or.PNG',
    desc: "Confirmés : montrez votre talent et l'esprit d'équipe.",
  },
  {
    nom: 'Platine',
    model: '/blasons/platine.glb',
    fallback: '/blasons/platine.png',
    desc: 'Experts : devenez essentiels et brillez ensemble.',
  },
  {
    nom: 'Diamant',
    model: '/blasons/diamant.glb',
    fallback: '/blasons/diamant.png',
    desc: 'Élite : menez votre équipe vers la victoire.',
  },
  {
    nom: 'Master',
    model: '/blasons/master.glb',
    fallback: '/blasons/coupe.jpg',
    desc: 'Légendes : inspirez tous les membres du groupe.',
  },
] as const;

const MODULES_EQUIPE = [
  { icon: '🏅', title: 'Créer votre équipe en 1 minute', desc: 'Invitez vos coéquipiers, rôles clairs (coach, capitaine, joueur), tout est prêt.' },
  { icon: '📅', title: 'Calendrier intelligent', desc: 'Matchs & entraînements avec rappels automatiques et disponibilités en un clic.' },
  { icon: '📈', title: 'Classements & stats motivants', desc: 'Suivi des performances individuelles et collectives, objectifs par joueur.' },
  { icon: '🚗', title: 'Covoiturage simplifié', desc: 'Planifiez les trajets, partagez les places et évitez les galères de dernière minute.' },
  { icon: '📱', title: "Messagerie d'équipe", desc: 'Groupes, annonces, partage de médias, tout reste centralisé et accessible.' },
  { icon: '📁', title: 'Docs & autorisations', desc: 'Licences, certificats et documents partagés en toute sécurité.' },
  { icon: '🤖', title: 'Coaching par IA', desc: 'Conseils adaptés, prévention des blessures, séances proposées selon le profil.' },
  { icon: '🏆', title: 'Badges & défis', desc: "Défis hebdo, trophées de progression et rituels d'équipe pour souder le groupe." },
] as const;

interface BrandGestionEquipeProps {
  brand: BrandConfig;
  content: GestionEquipeContent;
}

export function BrandGestionEquipe({ brand, content }: BrandGestionEquipeProps) {
  return (
    <div className="relative w-full min-h-screen bg-[var(--brand-bg)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 brand-halo" />

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-16">
        {/* Hero */}
        <section aria-label="Présentation gestion d'équipe" className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-cta)]/40 bg-[var(--brand-surface)]/50 px-3 py-1 text-xs font-semibold text-[var(--color-text-beige)]/90">
              <span className="h-2 w-2 rounded-full bg-[var(--brand-cta)] animate-pulse" />
              {content.heroTag}
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Gérez votre <span className="text-[var(--brand-cta)]">équipe</span>{' '}
              {content.heroTitle.replace('Gérez votre équipe', '').trim()}
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
                Créer mon équipe
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
              src={ImageFoot}
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
            Des blasons 3D immersifs pour visualiser votre progression : survolez pour les voir
            tourner. Un repère clair pour motiver l&apos;équipe semaine après semaine.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 justify-center items-start">
            {DIVISIONS_EQUIPE.map((d) => (
              <article
                key={d.nom}
                className="flex flex-col items-center justify-start bg-[var(--color-surface-dark)] rounded-2xl p-6 shadow border border-[var(--brand-cta)]/10"
              >
                <div className="relative flex items-center justify-center w-[130px] h-[130px]">
                  <noscript>
                    <Image src={d.fallback} alt={d.nom} width={130} height={130} className="rounded-xl" />
                  </noscript>
                  <CrestGLB src={d.model} />
                </div>
                <h3 className="text-xl font-bold text-white mt-3 mb-1">{d.nom}</h3>
                <p className="text-sm text-[var(--color-text-beige)] text-center">{d.desc}</p>
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
            {MODULES_EQUIPE.map((mod) => (
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

        {/* Comment ça marche */}
        <section
          aria-labelledby="how-title"
          className="bg-[var(--brand-surface)]/60 rounded-2xl border border-[var(--brand-cta)]/20 p-8"
        >
          <h2 id="how-title" className="text-3xl font-bold text-white text-center mb-6">
            Comment ça marche ?
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[var(--color-text-beige)]">
            <li className="rounded-xl bg-[var(--color-surface-dark)]/70 p-5 border border-[var(--brand-cta)]/10">
              <span className="text-[var(--brand-cta)] font-bold">1. Créez l&apos;équipe</span>
              <p>Donnez un nom, choisissez un visuel, invitez vos membres en 1 clic.</p>
            </li>
            <li className="rounded-xl bg-[var(--color-surface-dark)]/70 p-5 border border-[var(--brand-cta)]/10">
              <span className="text-[var(--brand-cta)] font-bold">2. Organisez</span>
              <p>Ajoutez matchs/entraînements, sondages de présence et covoiturage automatique.</p>
            </li>
            <li className="rounded-xl bg-[var(--color-surface-dark)]/70 p-5 border border-[var(--brand-cta)]/10">
              <span className="text-[var(--brand-cta)] font-bold">3. Progressez</span>
              <p>Stats, défis, badges & IA : tout pour s&apos;améliorer ensemble et garder le sourire.</p>
            </li>
          </ol>
        </section>

        {/* CTA final */}
        <section aria-labelledby="equipe-cta-title" className="flex flex-col items-center mt-4">
          <h2 id="equipe-cta-title" className="text-2xl md:text-3xl font-bold text-[var(--brand-cta)] mb-3 text-center">
            {content.ctaTitle}
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${brand.slug}/offres`}
              className="px-10 py-4 rounded-lg font-bold text-lg bg-[var(--brand-cta)] text-[var(--brand-bg)] shadow-xl hover:bg-[var(--brand-cta-hover)] active:scale-[.98] transition"
            >
              Essayer gratuitement
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 rounded-lg font-bold text-lg border border-[var(--color-text-beige)]/60 text-[var(--color-text-beige)] hover:border-[var(--brand-cta)] hover:text-[var(--brand-cta)] active:scale-[.98] transition"
            >
              Être recontacté par un coach
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
