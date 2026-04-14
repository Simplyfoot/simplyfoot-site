import {
  ShieldCheck,
  CalendarDays,
  FileText,
  Users,
  BarChart3,
  MessageCircle,
  LayoutDashboard,
  Video,
} from 'lucide-react';

const FEATURES = [
  {
    title: 'Gestion de club tout-en-un',
    desc: 'Tableau de bord président, staff, coach, joueur : centralisez et sécurisez toute la vie de votre club amateur.',
    icon: <ShieldCheck size={34} className="text-[var(--brand-cta)]" />,
  },
  {
    title: 'Planification & convocations',
    desc: 'Organisez tous vos matchs et entraînements, envoyez les convocations et rappels automatiques en 2 clics.',
    icon: <CalendarDays size={34} className="text-[var(--brand-cta)]" />,
  },
  {
    title: 'Feuilles de match & compos',
    desc: 'Générez vos feuilles de match FFF en PDF, signature numérique, composition glisser-déposer, exports rapides.',
    icon: <LayoutDashboard size={34} className="text-[var(--brand-cta)]" />,
  },
  {
    title: 'Statistiques & IA',
    desc: 'Analyse des stats individuelles et collectives, dashboards intuitifs, suggestions d’axes de progression (IA).',
    icon: <BarChart3 size={34} className="text-[var(--brand-cta)]" />,
  },
  {
    title: 'Scan & classement intelligent',
    desc: 'Scannez documents, carte d’identité ou licence : classement automatique, OCR, gestion dématérialisée.',
    icon: <FileText size={34} className="text-[var(--brand-cta)]" />,
  },
  {
    title: 'Communication club & familles',
    desc: 'Messagerie parents/joueurs, notifications en temps réel, validation des présences et infos médicales.',
    icon: <MessageCircle size={34} className="text-[var(--brand-cta)]" />,
  },
  {
    title: 'Compositions visuelles avancées',
    desc: 'Composez vos équipes sur un terrain interactif, drag & drop des joueurs, multi-équipes et exports visuels.',
    icon: <Users size={34} className="text-[var(--brand-cta)]" />,
  },
  {
    title: 'Vidéo & IA coach (V2)',
    desc: 'Import vidéo, analyse auto, tracking des actions, conseils personnalisés par IA pour coachs et joueurs.',
    icon: <Video size={34} className="text-[var(--brand-cta)]" />,
  },
];

export default function SectionFeatures() {
  return (
    <section
      id="features"
      className="w-full bg-[var(--color-platform-bg)] py-20 border-t border-[var(--brand-border)]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-12">
          Les <span className="text-[var(--brand-cta)]">modules essentiels</span> SimplyFoot
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-7 flex flex-col items-center text-center shadow-lg hover:shadow-2xl border border-[var(--brand-border)] group transition-all"
            >
              <span className="mb-4">{f.icon}</span>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[var(--brand-cta)] transition-colors">
                {f.title}
              </h3>
              <p className="text-sm text-white/80">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
