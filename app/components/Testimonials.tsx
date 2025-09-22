"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const TESTIMONIALS = [
  {
    name: "Karim M.",
    role: "Président US Montauroux",
    text: "SimplyFoot a révolutionné la gestion de notre club : moins de stress, plus de cohésion ! Les bénévoles sont conquis.",
    avatar: "/avatars/karim.png",
  },
  {
    name: "Sophie R.",
    role: "Coach Féminines FC Toulon",
    text: "La planification des entraînements et le suivi des joueuses sont devenus un jeu d’enfant. Enfin une appli pensée pour l’amateur !",
    avatar: "/avatars/sophie.png",
  },
  {
    name: "Lucas T.",
    role: "Parent et dirigeant AS La Seyne",
    text: "Simple, rapide, et tellement pratique pour toute la famille. L’essayer, c’est l’adopter.",
    avatar: "/avatars/lucas.png",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-[#5BE37D] mb-9 text-center">
        Ils témoignent
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: .15 * i, duration: .55, type: "spring" }}
            className="bg-[#232729] rounded-2xl p-7 shadow-xl flex flex-col items-center text-center border border-[#5BE37D]/12 hover:scale-105 transition-all duration-200 group"
          >
            <Image
              src={t.avatar}
              alt={t.name}
              width={68}
              height={68}
              className="rounded-full mb-3 border-2 border-[#5BE37D]/50"
            />
            <div className="font-bold text-lg text-white">{t.name}</div>
            <div className="text-[#5BE37D] font-semibold mb-2">{t.role}</div>
            <p className="text-base text-[#D9C6A3]">{t.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
