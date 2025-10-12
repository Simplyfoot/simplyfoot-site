import HeroSection from "../components/home/HeroSection";
import HomeBenefits from "../components/home/HomeBenefits";
import SectionModules from "../components/SectionModules";
import Footer from "../components/layout/Footer";
// À venir : import SectionOffres from "./components/SectionOffres"; etc.

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center bg-[#14482F]">
      <HeroSection />

      <HomeBenefits />

      {/* <Testimonials /> */}

      {/* <ClubLogosCarousel /> */}

      <SectionModules />

      {/* Sections à venir  (à décommenter lorsqu’elles seront prêtes) */}
      {/* <SectionOffres />        // tableau des offres / tarifs */}
      {/* <SectionPourquoi />      // pain points → bénéfices */}
      {/* <SectionValeurs />       // ADN SimplyFoot */}
      {/* <SectionEquipe />        // présentation de l’équipe */}

    </main>
  );
}

