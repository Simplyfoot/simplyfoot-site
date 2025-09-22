"use client";
import { motion } from "framer-motion";
import { CheckCircle, AlarmClock, Users, Star } from "lucide-react";

const BENEFITS = [
  {
    icon: <CheckCircle className="w-10 h-10 text-[#5BE37D]" />,
    title: "Simplicité absolue",
    desc: "Prenez en main votre club en 10 minutes. Gestion intuitive pour tous, même sans compétence technique.",
  },
  {
    icon: <AlarmClock className="w-10 h-10 text-[#5BE37D]" />,
    title: "Gain de temps",
    desc: "Automatisez convocations, feuilles de match, statistiques, rappels… Concentrez-vous sur le jeu, pas sur l’administratif.",
  },
  {
    icon: <Users className="w-10 h-10 text-[#5BE37D]" />,
    title: "Cohésion & motivation",
    desc: "Valorisez chaque membre, renforcez l’esprit d’équipe et l’engagement des joueurs et familles.",
  },
  {
    icon: <Star className="w-10 h-10 text-[#5BE37D]" />,
    title: "Image professionnelle",
    desc: "Mettez en avant votre club auprès de la mairie, des parents, des partenaires. Fini les outils bricolés !",
  },
];

export default function HomeBenefits() {
  return (
    <section
      className="w-full max-w-6xl mx-auto px-6 mt-0 mb-20 relative z-20"
      aria-labelledby="home-benefits-title"
    >
      {/* Titre section : impact, SEO et accessibilité */}
      <h2
        id="home-benefits-title"
        className="text-3xl md:text-4xl font-extrabold text-white text-center mb-10 drop-shadow"
      >
        Pourquoi SimplyFoot transforme votre club
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {BENEFITS.map((b, i) => (
          <motion.article
            key={b.title}
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              delay: 0.1 + i * 0.14,
              duration: 0.7,
              type: "spring",
              stiffness: 90,
              damping: 13,
            }}
            className="bg-[#232729]/95 rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center border border-[#5BE37D]/15
                       hover:scale-[1.06] hover:shadow-emerald-400/20 hover:z-20 hover:-translate-y-2 transition-all duration-250 group
                       backdrop-blur-sm"
            role="region"
            aria-label={b.title}
            tabIndex={0}
          >
            <div className="mb-3 group-hover:scale-110 transition-transform duration-200">{b.icon}</div>
            <h3 className="text-xl font-extrabold text-white mb-2 drop-shadow">{b.title}</h3>
            <p className="text-base text-[#D9C6A3] font-medium">{b.desc}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
