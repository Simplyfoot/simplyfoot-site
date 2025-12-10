import CrestGLB from "components/CrestGLB";
import Image from "next/image";
import ImageFoot from "../../assets/images/Cohesion_6.png";


// SEO
export const metadata = {
  title: "Gestion d'équipe – SimplyFoot",
  description:
    "Créez, organisez et motivez votre équipe avec SimplyFoot : calendrier intelligent, classements ludiques, IA et blasons 3D.",
  openGraph: {
    title: "Gestion d'équipe – SimplyFoot",
    description:
      "Créez, organisez et motivez votre équipe avec SimplyFoot : calendrier intelligent, classements ludiques, IA et blasons 3D.",
    type: "website",
  },
};

// Divisions (affichage 3D + fallback image)
const DIVISIONS_EQUIPE = [
  { nom: "Bronze",  model: "/blasons/bronze.glb",  fallback: "/blasons/bronze.png",  desc: "Débutants : faites vos preuves et amusez-vous." },
  { nom: "Argent",  model: "/blasons/argent.glb",  fallback: "/blasons/argent.png",  desc: "Engagés : améliorez vos compétences et performances." },
  { nom: "Or",      model: "/blasons/or.glb",      fallback: "/blasons/or.PNG",      desc: "Confirmés : montrez votre talent et l'esprit d'équipe." },
  { nom: "Platine", model: "/blasons/platine.glb", fallback: "/blasons/platine.png", desc: "Experts : devenez essentiels et brillez ensemble." },
  { nom: "Diamant", model: "/blasons/diamant.glb", fallback: "/blasons/diamant.png", desc: "Élite : menez votre équipe vers la victoire." },
  { nom: "Master",  model: "/blasons/master.glb",  fallback: "/blasons/coupe.jpg",   desc: "Légendes : inspirez tous les membres du groupe." },
] as const;

// Modules spécifiques joueurs / coachs / capitaines / parents
const MODULES_EQUIPE = [
  {
    icon: "⚽",
    title: "Créer votre équipe en 1 minute",
    desc: "Invitez vos coéquipiers, rôles clairs (coach, capitaine, joueur), tout est prêt.",
  },
  {
    icon: "📅",
    title: "Calendrier intelligent",
    desc: "Matchs & entraînements avec rappels automatiques et disponibilités en un clic.",
  },
  {
    icon: "📈",
    title: "Classements & stats motivants",
    desc: "Suivi des performances individuelles et collectives, objectifs par joueur.",
  },
  {
    icon: "🚗",
    title: "Covoiturage simplifié",
    desc: "Planifiez les trajets, partagez les places et évitez les galères de dernière minute.",
  },
  {
    icon: "📱",
    title: "Messagerie d'équipe",
    desc: "Groupes, annonces, partage de médias, tout reste centralisé et accessible.",
  },
  {
    icon: "📁",
    title: "Docs & autorisations",
    desc: "Licences, certificats et documents partagés en toute sécurité.",
  },
  {
    icon: "🤖",
    title: "Coaching par IA",
    desc: "Conseils adaptés, prévention des blessures, séances proposées selon le profil.",
  },
  {
    icon: "🏆",
    title: "Badges & défis",
    desc: "Défis hebdo, trophées de progression et rituels d'équipe pour souder le groupe.",
  },
] as const;

export default function GestionEquipePage() {
  return (
    <main className="relative w-full min-h-screen bg-[#14482F]">
      {/* halo de fond discret */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(91,227,125,.18),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 -mt-4 pb-16 flex flex-col gap-16">
        {/* HERO */}
        <section className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#29be4f]/40 bg-[#1d3e2e]/50 px-3 py-1 text-xs font-semibold text-[#F8E9CA]/90">
              <span className="h-2 w-2 rounded-full bg-[#29be4f] animate-pulse" />
              Pour les équipes ambitieuses
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Gérez votre <span className="text-[#29be4f]">équipe</span> comme jamais : simple, fun, efficace
            </h1>
            <p className="text-[#F8E9CA] text-lg md:text-xl mt-4 font-medium">
              Planifiez, communiquez et progressez ensemble. Des outils pro, pensés pour le plaisir du jeu et la cohésion.
            </p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-white/90 text-base">
              <li>✅ Création d&#39;équipe express & invitations</li>
              <li>✅ Calendrier et disponibilités en un clic</li>
              <li>✅ Classements ludiques & badges de progression</li>
              <li>✅ Covoiturage + messagerie intégrée</li>
            </ul>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="/offres"
                className="px-8 py-4 rounded-xl font-bold text-lg bg-[#29be4f] text-[#14482F] shadow-xl hover:bg-[#63f286] active:scale-[.98] transition"
              >
                Créer mon équipe
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-xl font-bold text-lg border border-[#F8E9CA]/60 text-[#F8E9CA] hover:border-[#29be4f] hover:text-[#29be4f] active:scale-[.98] transition"
              >
                Demander une démo
              </a>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Image
              src={ImageFoot}
              alt="Gestion d'équipe SimplyFoot"
              width={520}
              height={520}
              priority
              className="rounded-3xl shadow-2xl border-4 border-[#29be4f]/40 object-cover"
            />
          </div>
        </section>

        {/* DIVISIONS 3D */}
        <section aria-labelledby="divisions-title">
          <h2 id="divisions-title" className="text-3xl md:text-4xl font-bold text-[#29be4f] mb-8 text-center">
            Progresser, se challenger, s&#39;amuser ensemble
          </h2>
          <p className="mx-auto max-w-3xl text-center text-[#F8E9CA] mb-8">
            Des blasons 3D immersifs pour visualiser votre progression : survolez pour les voir tourner. Un repère clair pour motiver l&#39;équipe semaine après semaine.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 justify-center items-start">
            {DIVISIONS_EQUIPE.map((d) => (
              <article
                key={d.nom}
                className="flex flex-col items-center justify-start bg-[#232729] rounded-2xl p-6 shadow border border-[#29be4f]/10"
              >
                <div className="relative flex items-center justify-center w-[130px] h-[130px]">
                  <noscript>
                    <Image src={d.fallback} alt={d.nom} width={130} height={130} className="rounded-xl" />
                  </noscript>
                  <CrestGLB src={d.model} />
                </div>
                <h3 className="text-xl font-bold text-white mt-3 mb-1">{d.nom}</h3>
                <p className="text-sm text-[#F8E9CA] text-center">{d.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* MODULES */}
        <section aria-labelledby="modules-title">
          <h2 id="modules-title" className="text-3xl md:text-4xl font-bold text-[#29be4f] mb-8 text-center">
            Simplifiez-vous la vie avec SimplyFoot
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {MODULES_EQUIPE.map((mod) => (
              <div
                key={mod.title}
                className="bg-[#F8E9CA]/90 rounded-xl p-6 flex flex-col items-center text-center shadow border border-[#29be4f]/10"
              >
                <span className="text-3xl mb-3" aria-hidden>{mod.icon}</span>
                <h3 className="font-extrabold text-lg text-[#14482F] mb-2">{mod.title}</h3>
                <p className="text-base text-[#232729]">{mod.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION COMMENT ÇA MARCHE */}
        <section aria-labelledby="how-title" className="bg-[#1d3e2e]/60 rounded-2xl border border-[#29be4f]/20 p-8">
          <h2 id="how-title" className="text-3xl font-bold text-white text-center mb-6">
            Comment ça marche ?
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[#F8E9CA]">
            <li className="rounded-xl bg-[#232729]/70 p-5 border border-[#29be4f]/10">
              <span className="text-[#29be4f] font-bold">1. Créez l&#39;équipe</span>
              <p>Donnez un nom, choisissez un visuel, invitez vos membres en 1 clic.</p>
            </li>
            <li className="rounded-xl bg-[#232729]/70 p-5 border border-[#29be4f]/10">
              <span className="text-[#29be4f] font-bold">2. Organisez</span>
              <p>Ajoutez matchs/entraînements, sondages de présence et covoit&#39; automatique.</p>
            </li>
            <li className="rounded-xl bg-[#232729]/70 p-5 border border-[#29be4f]/10">
              <span className="text-[#29be4f] font-bold">3. Progressez</span>
              <p>Stats, défis, badges & IA : tout pour s&#39;améliorer ensemble et garder le sourire.</p>
            </li>
          </ol>
        </section>

        {/* CTA FINAL */}
        <section className="flex flex-col items-center mt-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#29be4f] mb-3 text-center">
            Prêts à donner un nouvel élan à votre équipe ?
          </h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="/offres"
              className="px-10 py-4 rounded-lg font-bold text-lg bg-[#29be4f] text-[#14482F] shadow-xl hover:bg-[#63f286] active:scale-[.98] transition"
            >
              Essayer gratuitement
            </a>
            <a
              href="/contact"
              className="px-10 py-4 rounded-lg font-bold text-lg border border-[#F8E9CA]/60 text-[#F8E9CA] hover:border-[#29be4f] hover:text-[#29be4f] active:scale-[.98] transition"
            >
              Être recontacté par un coach
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
