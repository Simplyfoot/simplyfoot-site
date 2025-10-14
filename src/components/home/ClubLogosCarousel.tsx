"use client";

import Image from "next/image";
import LogoClubCadiere from "assets/logos/logo_club_cadiere.png";
import LogoClubStMandrier from "assets/logos/logo_club_us_st_mandrier.png";

export default function ClubLogosSection() {
  const CLUB_LOGOS = [
    {
      src: LogoClubCadiere,
      alt: "Logo du club La Cadière FC",
      name: "La Cadière FC",
      href: "https://uslacadiere.fr/",
    },
    {
      src: LogoClubStMandrier,
      alt: "Logo du club US Saint-Mandrier",
      name: "US Saint-Mandrier",
      href: "https://www.facebook.com/ussmfootball83/?locale=fr_FR",
    },
  ];

  return (
    <section className="w-full py-12 bg-[#181B1D] border-t border-[#29be4f]/10">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#29be4f] mb-4">
          Ils nous font confiance 💚
        </h2>
        <p className="text-[#F8E9CA]/80 mb-10 text-base md:text-md">
          Des clubs engagés dans l’aventure SimplyFoot, testant nos solutions sur le terrain.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12">
          {CLUB_LOGOS.map((logo) => (
            <a
              key={logo.name}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-1"
              title={`Visiter le site de ${logo.name}`}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                height={110}
                className="object-contain transition-transform duration-300 group-hover:scale-105 group-hover:opacity-90"
                priority
              />
              <p className="mt-3 text-[#F8E9CA]/70 text-sm font-semibold group-hover:text-[#29be4f] transition-colors">
                {logo.name}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
