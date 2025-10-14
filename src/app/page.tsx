import HeroSection from "../components/home/HeroSection";
import HomeBenefits from "../components/home/HomeBenefits";
import SectionModules from "../components/SectionModules";

export const metadata = {
  title: "SimplyFoot – Application de gestion pour clubs de football amateurs",
  description:
    "SimplyFoot simplifie la vie des clubs amateurs : gérez vos équipes, matchs, entraînements, statistiques et communication depuis une seule application web & mobile.",
  alternates: {
    canonical: "https://www.simplyfoot.fr",
  },
  openGraph: {
    title: "SimplyFoot – Application de gestion pour clubs de football amateurs",
    description:
      "Créez, organisez et motivez votre équipe avec SimplyFoot : une solution simple, fun et efficace pour les clubs de football amateurs.",
    url: "https://www.simplyfoot.fr",
    siteName: "SimplyFoot",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "SimplyFoot – Gestion de club et d’équipe de football amateur",
      },
    ],
    type: "website",
  },
};

export default function Home() {
  return (
    <main
      className="w-full flex flex-col items-center bg-[#14482F] text-white"
      role="main"
    >
      {/* SECTION HERO */}
      <section id="hero" aria-label="Présentation de SimplyFoot" className="w-full">
        <HeroSection />
      </section>

      {/* SECTION AVANTAGES */}
      <section id="benefits" aria-label="Avantages de SimplyFoot" className="w-full">
        <HomeBenefits />
      </section>

      {/* SECTION MODULES */}
      <section id="modules" aria-label="Modules disponibles sur SimplyFoot" className="w-full">
        <SectionModules />
      </section>

      {/* SECTIONS À VENIR */}
      {/* <SectionOffres /> */}
      {/* <SectionPourquoi /> */}
      {/* <SectionValeurs /> */}
      {/* <SectionEquipe /> */}
    </main>
  );
}
