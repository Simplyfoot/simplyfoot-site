import CrestGLB from "components/CrestGLB";
import Image from "next/image";
import Image1 from "../../assets/images/Cohesion_4.png"

// Blasons divisions (GLB + fallback image pour SEO/perf)
const DIVISIONS = [
  { nom: "Bronze",  model: "/blasons/bronze.glb",  fallback: "/blasons/bronze.png",  desc: "Division d’entrée, pour se lancer et progresser." },
  { nom: "Argent",  model: "/blasons/argent.glb",  fallback: "/blasons/argent.png",  desc: "Pour les joueurs réguliers et impliqués." },
  { nom: "Or",      model: "/blasons/or.glb",      fallback: "/blasons/or.PNG",      desc: "Le palier de l’excellence technique et collective." },
  { nom: "Platine", model: "/blasons/platine.glb", fallback: "/blasons/platine.png", desc: "Niveau élite, performance continue et régularité." },
  { nom: "Diamant", model: "/blasons/diamant.glb", fallback: "/blasons/diamant.png", desc: "Joueurs d’exception, leaders sur et hors du terrain." },
  { nom: "Master",  model: "/blasons/master.glb",  fallback: "/blasons/coupe.jpg",   desc: "Légende du club : maîtrise et influence au top." },
] as const;

// Modules-clés pour coach/dirigeant
const MODULES = [
  {
    icon: "🏟️",
    title: "Organisation du club et des équipes",
    desc: "Créez des équipes (U11, U13, Seniors, Féminines…), ajoutez les joueurs et attribuez les rôles (coach, joueur, admin). Structurez tout votre club depuis une seule plateforme.",
  },
  {
    icon: "📅",
    title: "Planification intelligente",
    desc: "Gérez tous vos événements (matchs, entraînements, déplacements) avec rappels automatiques. Notifications email/push pour ne jamais rater un rendez-vous.",
  },
  {
    icon: "📋",
    title: "Feuilles de match automatisées",
    desc: "Générez vos feuilles de match en un clic : composition, postes, consignes individuelles, impression/partage immédiat.",
  },
  {
    icon: "🧠",
    title: "Évaluation et progression des joueurs",
    desc: "Notes simplifiées sur plusieurs critères, suivi de la progression, et classements par division (Bronze à Master). Motivez et valorisez vos joueurs !",
  },
  {
    icon: "📊",
    title: "Dashboard coach avancé",
    desc: "Accédez à toutes les stats-clés de l’équipe : effectif, absences/blessures, performances collectives, top joueurs en progression, actions rapides (évaluer, commenter, conseiller…).",
  },
  {
    icon: "🗂",
    title: "Gestion documentaire & scan",
    desc: "Centralisez et scannez tous les docs (licences, certifs médicaux, docs club…). Classement auto par joueur/équipe.",
  },
  {
    icon: "🔐",
    title: "Accès & sécurité personnalisés",
    desc: "Chaque rôle (coach, joueur, parent, admin) a sa propre interface. Connexion ultra-sécurisée, gestion fine des autorisations.",
  },
  {
    icon: "🤖",
    title: "Intelligence Artificielle & recommandations",
    desc: "L’IA identifie les axes de progrès, propose des exercices adaptés et anticipe les risques (blessures, baisse de perf…).",
  },
] as const;

export const metadata = {
  title: "Gestion de club – SimplyFoot",
  description:
    "Structurez, automatisez et professionnalisez la gestion de votre club amateur : équipes, matchs, documents, IA, et classements motivants.",
  openGraph: {
    title: "Gestion de club – SimplyFoot",
    description:
      "Structurez, automatisez et professionnalisez la gestion de votre club amateur : équipes, matchs, documents, IA, et classements motivants.",
    type: "website",
  },
};

export default function GestionClubPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#14482F]">
      {/* arrière-plan subtil */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(91,227,125,.18),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-16">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#5BE37D]/40 bg-[#1d3e2e]/50 px-3 py-1 text-xs font-semibold text-[#F8E9CA]/90">
              <span className="h-2 w-2 rounded-full bg-[#5BE37D] animate-pulse" />
              Conçu avec les clubs amateurs
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white leading-tight">
              <span className="text-[#5BE37D]">SimplyFoot</span> – la gestion de club qui motive et fait gagner du temps
            </h1>
            <p className="text-[#F8E9CA] text-lg md:text-xl mt-4 font-medium">
              Structurez vos équipes, planifiez en 1 clic, centralisez vos docs et suivez la progression. Une plateforme pensée pour les bénévoles, les coachs et les familles.
            </p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-white/90 text-base">
              <li>✅ Ajout express des équipes & joueurs</li>
              <li>✅ Calendrier centralisé (matchs, entraînements, déplacements)</li>
              <li>✅ Feuilles de match auto + partage rapide</li>
              <li>✅ Classements motivants : Bronze → Master</li>
            </ul>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="/offres"
                className="px-8 py-4 rounded-xl font-bold text-lg bg-[#5BE37D] text-[#14482F] shadow-xl hover:bg-[#63f286] active:scale-[.98] transition"
              >
                Découvrir les offres club
              </a>
              <a
                href="/contact"
                className="px-8 py-4 rounded-xl font-bold text-lg border border-[#F8E9CA]/60 text-[#F8E9CA] hover:border-[#5BE37D] hover:text-[#5BE37D] active:scale-[.98] transition"
              >
                Demander une démo
              </a>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Image
              src={Image1}
              alt="Interface de gestion SimplyFoot"
              width={520}
              height={520}
              priority
              className="rounded-3xl shadow-2xl border-4 border-[#5BE37D]/40 object-cover"
            />
          </div>
        </section>

        {/* Classement joueurs – Divisions (3D) */}
        <section aria-labelledby="divisions-title">
          <h2 id="divisions-title" className="text-3xl md:text-4xl font-bold text-[#5BE37D] mb-8 text-center">
            Classement & progression des joueurs : les 6 divisions SimplyFoot
          </h2>
          <p className="mx-auto max-w-3xl text-center text-[#F8E9CA] mb-8">
            Visualisez les statuts des joueurs avec des blasons 3D immersifs. Survolez pour les voir tourner : motivation garantie lors des annonces et des remises de trophées.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 justify-center items-start">
            {DIVISIONS.map((d) => (
              <article
                key={d.nom}
                className="flex flex-col items-center justify-start bg-[#232729] rounded-2xl p-6 shadow border border-[#5BE37D]/10"
              >
                {/* Fallback SSR (img) + hydratation 3D ensuite */}
                <div className="relative flex items-center justify-center w-[120px] h-[120px]">
                  <noscript>
                    <Image src={d.fallback} alt={`Division ${d.nom}`} width={120} height={120} className="rounded-xl" />
                  </noscript>
                  <CrestGLB src={d.model} />
                </div>
                <h3 className="text-xl font-bold text-white mt-3 mb-1">{d.nom}</h3>
                <p className="text-sm text-[#F8E9CA] text-center">{d.desc}</p>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-lg text-[#F8E9CA]">
            Chaque joueur évolue de Bronze à Master selon ses performances, son implication et l’avis des coachs.
            <span className="block text-[#5BE37D] font-semibold">Un classement motivant, inspiré de l’eSport et des grandes académies !</span>
          </p>
        </section>

        {/* Modules-clés */}
        <section aria-labelledby="modules-title">
          <h2 id="modules-title" className="text-3xl md:text-4xl font-bold text-[#5BE37D] mb-8 text-center">
            Tout pour gérer votre club de A à Z
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {MODULES.map((mod) => (
              <div
                key={mod.title}
                className="bg-[#F8E9CA]/90 rounded-xl p-6 flex flex-col items-center text-center shadow border border-[#5BE37D]/10"
              >
                <span className="text-3xl mb-3" aria-hidden>{mod.icon}</span>
                <h3 className="font-extrabold text-lg text-[#14482F] mb-2">{mod.title}</h3>
                <p className="text-base text-[#232729]">{mod.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dashboard coach – Accroche */}
        <section className="my-8 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#5BE37D] mb-6 text-center">
            Un dashboard coach ultra‑puissant, pensé pour l’action
          </h2>
          <p className="max-w-3xl text-[#F8E9CA] text-lg text-center mb-6">
            Visualisez en temps réel les données clés de votre effectif, gérez les absences/blessures, suivez la progression de chaque joueur et pilotez votre club comme un pro.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-white/90">
            <li>👥 Effectif complet, absences/blessures, moyenne d’âge</li>
            <li>📊 Résultats, séries, courbes de progression</li>
            <li>🏆 Top 3 joueurs en progression, joueur du mois</li>
            <li>💡 Actions rapides coach : évaluer, conseiller, commenter…</li>
          </ul>
        </section>

        {/* Call to action final */}
        <section className="flex flex-col items-center mt-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#5BE37D] mb-3 text-center">
            Prêt à faire passer votre club dans une nouvelle dimension ?
          </h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="/offres"
              className="px-10 py-4 rounded-lg font-bold text-lg bg-[#5BE37D] text-[#14482F] shadow-xl hover:bg-[#63f286] active:scale-[.98] transition"
            >
              Tester SimplyFoot gratuitement
            </a>
            <a
              href="/contact"
              className="px-10 py-4 rounded-lg font-bold text-lg border border-[#F8E9CA]/60 text-[#F8E9CA] hover:border-[#5BE37D] hover:text-[#5BE37D] active:scale-[.98] transition"
            >
              Être recontacté par un expert
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
