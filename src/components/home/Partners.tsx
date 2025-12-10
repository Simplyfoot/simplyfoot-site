export default function Partners() {
  return (
    <section className="w-full bg-[#F7F6F3] py-12 border-t border-[#14482F]/10 relative">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#14482F] mb-4">
          Nos partenaires
        </h2>

        <p className="text-[#14482F]/80 mb-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Ils nous accompagnent dans le développement de SimplyFoot et partagent nos valeurs
          d’innovation, de proximité et d’humain au cœur du jeu.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-10">
          <a
            href="https://www.com-online.fr/"
            target="_blank"
            rel="noopener noreferrer"
            title="Visiter le site de l’Agence Com’On"
            className="group flex flex-col items-center transition-transform duration-300 hover:-translate-y-1"
          >
          </a>
        </div>
      </div>
    </section>
  );
}
