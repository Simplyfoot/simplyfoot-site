import { ShieldCheck, CalendarDays, FileText, Users, BarChart3, MessageCircle, LayoutDashboard, Video } from "lucide-react";

const MODULES = [
  {
    title: "Gestion du club",
    desc: "Président, staff, coach et joueurs : centralisez la gestion et la communication dans un espace sécurisé.",
    icon: <ShieldCheck size={38} className="text-[#175438]" />,
  },
  {
    title: "Planification & convocations",
    desc: "Organisez tous les matchs, entraînements et événements, avec rappels et notifications automatiques.",
    icon: <CalendarDays size={38} className="text-[#175438]" />,
  },
  {
    title: "Feuilles de match",
    desc: "Générez vos feuilles officielles, signatures numériques, et gardez un historique complet accessible partout.",
    icon: <LayoutDashboard size={38} className="text-[#175438]" />,
  },
  {
    title: "Statistiques & IA",
    desc: "Analysez la progression de chaque joueur, suivez les présences, blessures, scores et bénéficiez de conseils IA.",
    icon: <BarChart3 size={38} className="text-[#175438]" />,
  },
  {
    title: "Scan & classement de documents",
    desc: "Scannez et classez licences, certificats, cartes d’identité : zéro papier, zéro stress administratif.",
    icon: <FileText size={38} className="text-[#175438]" />,
  },
  {
    title: "Communication clubs & familles",
    desc: "Messagerie interne, notifications instantanées, validation des présences et informations santé.",
    icon: <MessageCircle size={38} className="text-[#175438]" />,
  },
  {
    title: "Compositions visuelles",
    desc: "Construisez vos équipes et tactiques en drag & drop sur terrain digital, partagez les compos.",
    icon: <Users size={38} className="text-[#175438]" />,
  },
  {
    title: "Vidéo & IA coach (bientôt)",
    desc: "Analyse vidéo automatisée, suivi IA, dashboards pour coachs et joueurs.",
    icon: <Video size={38} className="text-[#175438]" />,
  },
];

export default function SectionModules() {
  return (
    <section id="modules" className="w-full bg-[#D9C6A3] py-20 border-t border-[#175438]/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12 text-[#175438] drop-shadow-lg">
          Les <span className="text-[#14482F]">modules essentiels</span> SimplyFoot
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MODULES.map((m) => (
            <div
              key={m.title}
              className="bg-white/60 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl border border-[#175438]/15 group transition-all"
            >
              <span className="mb-4">{m.icon}</span>
              <h3 className="text-lg font-extrabold text-[#14482F] mb-2 group-hover:text-[#175438] transition-colors">
                {m.title}
              </h3>
              <p className="text-base text-[#232729] font-medium">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
