"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  // Animation du compteur clubs
  const [clubs, setClubs] = useState(0);
  useEffect(() => {
    if (clubs < 120) {
      const t = setTimeout(() => setClubs(clubs + 4), 18);
      return () => clearTimeout(t);
    }
  }, [clubs]);

  return (
    <section className="relative w-full min-h-[98vh] flex flex-col items-center justify-center bg-[#14482F] overflow-hidden pb-0">
      {/* Background image/vidéo */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/3.jpg"
          alt="Football ambiance"
          className="w-full h-full object-cover brightness-[.45] blur-[1.5px] select-none"
          draggable={false}
        />
        {/* Gradient ambiance */}
        <div className="absolute inset-0 bg-[conic-gradient(at_top_left,_#63ff7c33,_transparent_50%)]" />
      </div>

      {/* Contenu principal (texte + visuel) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-14 pt-32 pb-24">
        {/* Colonne gauche (texte, accroche, CTA) */}
        <div className="flex-1 flex flex-col items-start text-left gap-5">
          <motion.h1
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.9, type: "spring" }}
            className="text-white font-extrabold text-4xl md:text-6xl mb-3 drop-shadow-xl leading-tight"
          >
            <span className="text-[#5BE37D]">SimplyFoot.</span>
            <br />
            <span className="block">
              Le logiciel qui{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="inline-block"
              >
                fait briller
              </motion.span>{" "}
              votre club amateur
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
            className="mb-3 text-white/85 text-lg md:text-2xl font-medium max-w-xl"
          >
            Centralisez la gestion, motivez, communiquez, gagnez du temps.
            <br />
            <span className="font-semibold text-[#D9C6A3]">
              SimplyFoot simplifie la vie des bénévoles et dirigeants, tout en offrant une expérience unique aux joueurs et familles.
            </span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
            className="flex gap-5 mt-2 flex-wrap"
          >
            <a
              href="/inscription"
              className="px-8 py-4 rounded-xl font-bold text-lg bg-[#5BE37D] text-[#14482F] shadow-xl hover:bg-[#68FB7A] hover:scale-105 active:scale-95 focus:outline-none transition duration-150"
            >
              Inscrire mon club
              <span className="ml-2 text-xs bg-[#D9C6A3]/80 text-[#14482F] px-2 py-1 rounded-full font-semibold align-middle animate-bounce">
                Nouveau 2024
              </span>
            </a>
            <a
              href="/contact"
              className="px-8 py-4 rounded-xl font-bold text-lg border border-[#D9C6A3]/60 text-[#D9C6A3] hover:border-[#5BE37D] hover:text-[#5BE37D] hover:scale-105 active:scale-95 focus:outline-none transition duration-150"
            >
              Demander une démo
            </a>
          </motion.div>
        </div>

        {/* Colonne droite (mockup visuel/vidéo) */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex-1 flex items-center justify-center mt-8 md:mt-0"
        >
          <div className="relative rounded-3xl shadow-2xl border-4 border-[#5BE37D]/40 overflow-hidden bg-white/10 w-[320px] h-[580px] md:w-[360px] md:h-[620px] group">
            <Image
              src="/1.png"
              alt="Aperçu SimplyFoot"
              className="w-full h-full object-cover rounded-3xl"
              draggable={false}
              width={360}
              height={620}
              priority
            />
            {/* Play animé */}
            <motion.div
              animate={{
                scale: [1, 1.13, 1],
                opacity: [1, 0.75, 1]
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg width="80" height="80" fill="none">
                <circle cx="40" cy="40" r="38" stroke="#5BE37D" strokeWidth="5" fill="#fff9" />
                <polygon points="34,28 58,40 34,52" fill="#14432D" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* BANDEAU STATS - Placé EN DEHORS du flex principal */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative w-full max-w-6xl mx-auto px-4 py-6 z-30 flex flex-col sm:flex-row justify-center items-center gap-7
                   bg-[#D9C6A3]/95 rounded-t-3xl shadow-2xl border-t border-[#5BE37D]/20 mt-[-56px] mb-0
                   backdrop-blur-md"
        aria-label="Chiffres clés SimplyFoot"
      >
        <div className="text-center flex flex-col items-center">
          <span className="text-2xl md:text-3xl font-extrabold text-[#175438]">
            +{clubs} clubs
          </span>
          <span className="text-[#175438]/80 text-sm font-semibold">déjà équipés</span>
        </div>
        <div className="h-8 w-px bg-[#175438]/20 hidden sm:block" aria-hidden="true" />
        <div className="text-center flex flex-col items-center">
          <span className="text-2xl md:text-3xl font-extrabold text-[#175438]">100 %</span>
          <span className="text-[#175438]/80 text-sm font-semibold">dédié aux clubs amateurs</span>
        </div>
        <div className="h-8 w-px bg-[#175438]/20 hidden sm:block" aria-hidden="true" />
        <div className="text-center flex flex-col items-center">
          <span className="text-2xl md:text-3xl font-extrabold text-[#175438]">
            Simple. Rapide. Efficace.
          </span>
        </div>
      </motion.div>
    </section>
  );
}
