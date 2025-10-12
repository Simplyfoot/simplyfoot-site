"use client";
import Image from "next/image";

const CLUB_LOGOS = [
  "/logos/club1.png",
  "/logos/club2.png",
  "/logos/club3.png",
  "/logos/club4.png",
  "/logos/club5.png",
  "/logos/club6.png",
  // Duplique ou adapte selon tes logos disponibles
];

export default function ClubLogosCarousel() {
  // Double la liste pour effet boucle infinie
  const logos = [...CLUB_LOGOS, ...CLUB_LOGOS];
  return (
    <section className="relative w-full py-10 overflow-hidden bg-[#181B1D]">
      <h2 className="text-2xl md:text-3xl font-bold text-[#5BE37D] mb-7 text-center">
        +120 clubs déjà équipés par SimplyFoot
      </h2>
      <div className="relative w-full h-20 overflow-x-hidden">
        <div className="absolute flex gap-12 min-w-full animate-marquee">
          {logos.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`Logo club ${i + 1}`}
              width={70}
              height={70}
              className="rounded-xl grayscale hover:grayscale-0 transition"
              draggable={false}
              priority={i < 6}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
