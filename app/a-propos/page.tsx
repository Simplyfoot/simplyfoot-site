import Image from "next/image";
import { Users2, ShieldCheck, Sparkles, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-[#14482F] py-14 px-2">
      <div className="max-w-4xl mx-auto bg-white/95 shadow-2xl rounded-3xl px-6 py-12 border border-[#5BE37D]/10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#5BE37D] mb-3 text-center">
          À propos de SimplyFoot
        </h1>
        <p className="text-center text-[#14482F] text-lg mb-8">
          Une aventure humaine et collective, portée par cinq passionnés unis par l’amour du football amateur et l’envie de faire bouger les lignes.
        </p>

        {/* Portraits associés */}
        <div className="flex flex-wrap gap-10 items-center justify-center mb-12">
          {[
            {
              src: "/11.png",
              alt: "Romain Pennacchio",
              name: "Romain Pennacchio",
              role: "Directeur Technique · Associé",
            },
            {
              src: "/3.jpg",
              alt: "Jérémy Baruc",
              name: "Jérémy Baruc",
              role: "Fondateur · CEO",
            },
            {
              src: "/jean.png",
              alt: "Jean Carboni",
              name: "Jean Carboni",
              role: "Développeur Expert · Associé",
            },
            {
              src: "/vanessa.jpeg",
              alt: "Vanessa Rolland",
              name: "Vanessa Rolland",
              role: "Développeur Expert · Associée",
            },
            {
              src: "/hugo.png",
              alt: "Hugo Pecorella",
              name: "Hugo Pecorella",
              role: "Tech & Cybersécurité · Associé",
            },
          ].map((person) => (
            <div key={person.name} className="flex flex-col items-center">
              <div className="w-[120px] aspect-square overflow-hidden rounded-full border-4 border-[#5BE37D]/60 shadow">
                <Image
                  src={person.src}
                  alt={person.alt}
                  width={120}
                  height={120}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="font-bold text-[#14482F] text-lg mt-4">{person.name}</div>
              <div className="text-[#14482F]/60 text-sm">{person.role}</div>
            </div>
          ))}
        </div>

        {/* Histoire */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#14482F] mb-4 text-center">Notre histoire</h2>
          <div className="bg-[#F7F6F3] rounded-xl px-6 py-6 text-[#14482F] shadow-md">
            <p className="mb-4">
              SimplyFoot, c’est d’abord une histoire de rencontres et de passions croisées. Sur un terrain de Provence, <strong>Romain</strong> et <strong>Jérémy</strong> partagent le même rêve : redonner du temps et de l’énergie à tous ces bénévoles, éducateurs, parents et jeunes qui font vivre le football amateur en France.
            </p>
            <p className="mb-4">
              Mais très vite, ils sont rejoints par <strong>Jean</strong>, <strong>Vanessa</strong> et <strong>Hugo</strong>, qui partagent la même conviction : <span className="font-semibold text-[#5BE37D]">un club, ce n’est pas qu’un tableau de scores ou une feuille Excel : c’est une famille, un foyer de valeurs et de passions.</span>
            </p>
            <p className="mb-4">
              Ensemble, ils écoutent les clubs, échangent sur les frustrations, imaginent la plateforme idéale… et découvrent que la clé, c’est l’humain : rendre simple ce qui est compliqué, créer du lien, valoriser chaque bénévole.
            </p>
            <p className="mb-4">
              Après des mois de terrain, de réunions tardives, de tests et d’échanges, naît SimplyFoot : <span className="font-bold text-[#5BE37D]">un logiciel pensé avec le cœur, codé avec rigueur, et porté par l’ambition de rendre le quotidien de chaque club plus doux, plus fluide, plus humain.</span>
            </p>
            <p className="font-semibold text-[#175438] text-lg">
              Aujourd’hui, SimplyFoot c’est avant tout une équipe soudée, guidée par l’envie d’apporter du bonheur, du progrès et de la simplicité à tous les amoureux du football amateur.
            </p>
          </div>
        </section>

        {/* Engagements */}
        <section className="mb-12 text-[#000000]">
          <h2 className="text-2xl font-bold text-[#14482F] mb-6 text-center">Nos engagements</h2>
          <div className="flex flex-col md:flex-row flex-wrap gap-6 justify-center">
            {[
              {
                icon: <Users2 className="text-[#5BE37D] w-16 h-16 mt-1" />,
                title: "Le collectif avant tout",
                desc: "SimplyFoot s’adresse à toute la famille du club : dirigeants, coachs, bénévoles, parents, enfants. Chacun compte et fait avancer la grande équipe !",
              },
              {
                icon: <ShieldCheck className="text-[#5BE37D] w-16 h-16 mt-1" />,
                title: "Simplicité & sécurité",
                desc: "Un outil ultra-intuitif, RGPD-ready, où la donnée reste protégée et où chacun se sent serein.",
              },
              {
                icon: <Sparkles className="text-[#5BE37D] w-16 h-16 mt-1" />,
                title: "Innovation & passion",
                desc: "Nous innovons chaque mois pour offrir aux clubs le meilleur du digital et de la convivialité.",
              },
              {
                icon: <Heart className="text-[#5BE37D] w-16 h-16 mt-1" />,
                title: "Respect & authenticité",
                desc: "Chez SimplyFoot, chaque club garde son identité, ses valeurs, son histoire. On ne standardise pas l’humain, on le valorise.",
              },
            ].map((item) => (
              <div key={item.title} className="flex-1 flex items-start gap-4 bg-[#F8E9CA]/60 rounded-xl p-5 shadow max-w-sm">
                {item.icon}
                <div>
                  <div className="font-bold text-[#14482F]">{item.title}</div>
                  <div>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to action */}
        <section className="flex flex-col items-center mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#5BE37D] mb-3 text-center">
            Envie de faire grandir votre club avec une équipe passionnée ?
          </h2>
          <a
            href="/contact"
            className="px-10 py-4 rounded-lg font-bold text-lg bg-[#5BE37D] text-[#14482F] shadow-xl hover:bg-[#68FB7A] transition"
          >
            Contactez-nous
          </a>
        </section>
      </div>
    </main>
  );
}
