import Image from "next/image";
import TeamImage from "../assets/images/Equipe_8.png";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-[#14482F] text-center px-6 pt-0 lg:pt-0 pb-10">

      {/* Halo vert */}

      {/* Illustration */}
      <Image
        src={TeamImage}
        alt="Équipe SimplyFoot"
        width={420}
        height={420}
        className="rounded-3xl shadow-2xl border-4 border-[#5BE37D]/40 object-cover mb-8"
      />

      {/* Texte principal */}
      <h1 className="text-6xl font-extrabold text-[#5BE37D] drop-shadow mb-4">404</h1>
      <h2 className="text-2xl font-bold text-[#FFFFFF] mb-3">
        Oups... cette page a été remplacée à la mi-temps ⚽
      </h2>
      <p className="text-[#F8E9CA]/80 max-w-md mb-8 mt-4">
        Pas de panique&nbsp;! Même les meilleurs ratent parfois une passe.  
        Reviens à l’accueil et reprends le match avec SimplyFoot.
      </p>

      {/* Boutons */}
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-[#5BE37D] px-6 py-3 font-extrabold text-[#14482F] shadow hover:bg-[#63f286] active:scale-[.98] transition"
        >
          Retour à l’accueil
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl border border-[#5BE37D]/40 px-6 py-3 font-semibold text-[#F8E9CA] hover:border-[#5BE37D] hover:text-[#5BE37D] active:scale-[.98] transition"
        >
          Contacter l’équipe
        </Link>
      </div>

      {/* Footer minimal */}
      <p className="mt-16 text-sm text-[#F8E9CA]/60">
        SimplyFoot – L’appli qui simplifie la vie des clubs amateurs 💚
      </p>
    </main>
  );
}
