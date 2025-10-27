import HeroSection from "../components/home/HeroSection";
import HomeBenefits from "../components/home/HomeBenefits";
import SectionModules from "../components/SectionModules";
import ClubLogosCarousel from "components/home/ClubLogosCarousel";
import Partners from "components/home/Partners";
import type { Metadata } from "next";

/* =========================================================================
   🔍 METADATA SEO
   ========================================================================= */
export const metadata: Metadata = {
  title:
    "SimplyFoot – Application de gestion pour clubs et associations de football amateurs",
  description:
    "Simplifiez la gestion de votre club de football amateur : membres, matchs, entraînements, statistiques et communication. SimplyFoot centralise tout en une seule plateforme web et mobile.",
  keywords: [
    "SimplyFoot",
    "application football",
    "gestion club",
    "football amateur",
    "association sportive",
    "gestion équipe",
    "logiciel club sportif",
  ],
  alternates: {
    canonical: "https://www.simplyfoot.fr",
  },
  openGraph: {
    title:
      "SimplyFoot – Application de gestion pour clubs de football amateurs",
    description:
      "Gérez vos équipes, matchs et communication en toute simplicité avec SimplyFoot, la solution pensée pour les clubs amateurs.",
    url: "https://www.simplyfoot.fr",
    siteName: "SimplyFoot",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.simplyfoot.fr/og.jpg",
        width: 1200,
        height: 630,
        alt: "SimplyFoot – Gestion de club et d’équipe de football amateur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "SimplyFoot – Application de gestion pour clubs de football amateurs",
    description:
      "Simplifiez la vie de votre club : joueurs, équipes, matchs et communication, réunis dans une seule application web & mobile.",
    images: ["https://www.simplyfoot.fr/og.jpg"],
    creator: "@SimplyFoot",
  },
};

/* =========================================================================
   🏠 PAGE D’ACCUEIL
   ========================================================================= */
export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SimplyFoot",
    url: "https://www.simplyfoot.fr",
    logo: "https://www.simplyfoot.fr/logo-simplyfoot.png",
    description:
      "SimplyFoot est une plateforme en ligne qui aide les clubs et associations de football amateurs à gérer leurs équipes, membres, matchs et communication.",
    sameAs: [
      "https://www.facebook.com/simplyfoot",
      "https://www.instagram.com/simplyfoot",
      "https://twitter.com/simplyfoot",
    ],
  };

  return (
    <>
      {/* Données structurées pour Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main
        id="main-content"
        className="w-full flex flex-col items-center bg-[#14482F] text-white"
        role="main"
      >
        {/* SECTION HERO */}
        <section
          id="hero"
          aria-label="Présentation de SimplyFoot"
          className="w-full"
        >
          <HeroSection />
        </section>

        {/* SECTION AVANTAGES */}
        <section
          id="benefits"
          aria-label="Avantages de SimplyFoot"
          className="w-full"
        >
          <HomeBenefits />
        </section>

        {/* SECTION MODULES */}
        <section
          id="modules"
          aria-label="Modules disponibles sur SimplyFoot"
          className="w-full"
        >
          <SectionModules />
          <ClubLogosCarousel />
          <Partners />
        </section>

        {/* SECTIONS À VENIR */}
        {/* <SectionOffres /> */}
        {/* <SectionPourquoi /> */}
        {/* <SectionValeurs /> */}
        {/* <SectionEquipe /> */}
      </main>
    </>
  );
}
