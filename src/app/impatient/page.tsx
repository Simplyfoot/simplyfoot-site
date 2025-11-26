// TODO: Page à supprimer quand l'application sera lancée
import Image from "next/image";
import TeamImage from "../../assets/images/Equipe_8.png";
import Link from "next/link";

export const metadata = {
    title: "SimplyFoot — Application bientôt disponible ⚽️",
    description:
        "Notre application n’est pas encore ouverte au public, mais restez connectés… le coup d’envoi approche !",
};

export default function TemporaryFormulaPage() {
    return (
         <main className="flex flex-col items-center justify-start min-h-screen bg-[#14482F] text-center px-6 pt-0 lg:pt-0 pb-10">
            <Image
                src={TeamImage}
                alt="Équipe SimplyFoot"
                width={420}
                height={420}
                className="rounded-3xl shadow-2xl border-4 border-[#29be4f]/40 object-cover mb-8"
            />

            <div className="max-w-lg">
                <h1 className="text-3xl font-extrabold mb-6 text-[#29be4f]">
                    Eh eh... impatient ? 😏
                </h1>

                <p className="text-base leading-relaxed mb-6">
                    Notre application <strong>SimplyFoot</strong> n’est pas encore ouverte au public...
                    <br />
                    Mais restez connectés, on s’échauffe avant le grand match&nbsp;! ⚽️
                </p>

                <p className="text-sm text-[#C7B58A] mb-10">
                    En attendant, découvrez nos formules et rejoignez l’aventure dès que le coup d’envoi sera donné.
                </p>

                <Link
                    href="/offres"
                    className="mt-2 px-8 py-3 rounded-lg font-bold bg-[#29be4f] text-[#14482F] text-sm shadow hover:bg-[#68FB7A] transition"
                >
                    Retour aux formules
                </Link>
            </div>
        </main>
    );
}
