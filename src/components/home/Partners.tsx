import Image from "next/image";
import LogoFuji from "assets/logos/logo_fuji.png";

export default function Partners() {
  const PARTNERS_LOGOS = [
    {
      src: LogoFuji,
      alt: "Logo FUJI",
      name: "Notre photographe officiel",
      href: "",
    },
  ];

  return (
    <section className="w-full bg-[#F7F6F3] py-12 border-t border-[#14482F]/10 relative">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#14482F] mb-4">
          Nos partenaires
        </h2>

        <p className="text-[#14482F]/80 mb-4 text-base md:text-md max-w-2xl mx-auto leading-relaxed mb-10">
          Ils nous accompagnent dans le développement de SimplyFoot et partagent nos valeurs
          d’innovation, de proximité et d’humain au cœur du jeu.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-12">
          {PARTNERS_LOGOS.map((logo) => (
            <a
              key={logo.name}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`Visiter le site de ${logo.name}`}
              className="group flex flex-col items-center transition-transform duration-300 hover:-translate-y-1"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                height={80}
                className="object-contain transition-transform duration-300 group-hover:scale-105 group-hover:opacity-90"
                priority
              />
              <p className="mt-3 text-[#183B2A]/70 text-sm font-semibold group-hover:text-[#4D9369] transition-colors">
                {logo.name}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
