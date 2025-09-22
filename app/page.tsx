/* -------------------------------------------------------------------------- */
/*  Page d’accueil SimplyFoot – composant serveur (App Router /app/page.tsx)  */
/* -------------------------------------------------------------------------- */

import HeroSection from "./components/HeroSection";
import HomeBenefits from "./components/HomeBenefits";
import Testimonials from "./components/Testimonials";
import ClubLogosCarousel from "./components/ClubLogosCarousel";
import SectionModules from "./components/SectionModules";
import Footer from "./components/Footer";
// À venir : import SectionOffres from "./components/SectionOffres"; etc.

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center bg-[#14482F]">
      {/* 1️⃣ HERO (accroche) */}
      <HeroSection />

      {/* 2️⃣ Bénéfices clés */}
      <HomeBenefits />

      {/* 3️⃣ Témoignages clients */}
      <Testimonials />

      {/* 4️⃣ Carousel de logos clubs */}
      <ClubLogosCarousel />

      {/* 5️⃣ Modules essentiels */}
      <SectionModules />

      {/* 6️⃣ Sections à venir  (décommente lorsqu’elles seront prêtes) */}
      {/* <SectionOffres />        // tableau des offres / tarifs */}
      {/* <SectionPourquoi />      // pain points → bénéfices */}
      {/* <SectionValeurs />       // ADN SimplyFoot */}
      {/* <SectionEquipe />        // présentation de l’équipe */}

      {/* 7️⃣ Footer global */}
      <Footer />
    </main>
  );
}

