"use client";
import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin } from "lucide-react";

const LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "CGU", href: "/cgu" },
  { label: "CGV", href: "/cgv" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "Gestion des cookies", href: "/confidentialite#cookies" },
  { label: "Nous contacter", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0b1a12] text-[#d7eadd] border-t border-simply-green/20 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-3">
        {/* Bloc société */}
        <section className="space-y-4">
          <h3 className="text-xl font-extrabold text-simply-green">
            SimplyFoot&nbsp;—&nbsp;SAS
          </h3>
          <p className="text-sm leading-relaxed">
            Capital social&nbsp;: 2 000&nbsp;€<br />
            RCS&nbsp;: Paris&nbsp;900&nbsp;123&nbsp;456<br />
            N° TVA&nbsp;: FR&nbsp;12&nbsp;900123456
          </p>
          <address className="not-italic text-sm flex flex-col gap-2">
            <span className="flex items-start gap-2">
              <MapPin size={16} /> 15 rue du Football&nbsp;75015&nbsp;Paris
            </span>
            <span className="flex items-start gap-2">
              <Phone size={16} /> +33&nbsp;1&nbsp;84&nbsp;80&nbsp;12&nbsp;34
            </span>
            <span className="flex items-start gap-2">
              <Mail size={16} /> contact@simplyfoot.fr
            </span>
          </address>
        </section>

        {/* Bloc navigation juridique */}
        <nav className="space-y-2">
          <h4 className="text-lg font-semibold mb-2">Informations légales</h4>
          <ul className="grid gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm hover:text-simply-green transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bloc réseaux & newsletter */}
        <section className="space-y-4">
          <h4 className="text-lg font-semibold mb-2">Restez connectés</h4>
          <p className="text-sm">
            Suivez nos dernières actualités, mises à jour et conseils de gestion
            de club.
          </p>
          <div className="flex gap-4">
            <Link
              href="https://facebook.com/simplyfoot"
              aria-label="Facebook"
              className="hover:text-simply-green transition-colors"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="https://twitter.com/simplyfoot"
              aria-label="Twitter"
              className="hover:text-simply-green transition-colors"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="https://linkedin.com/company/simplyfoot"
              aria-label="LinkedIn"
              className="hover:text-simply-green transition-colors"
            >
              <Linkedin size={20} />
            </Link>
          </div>
        </section>
      </div>

      <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/60">
        © {year}&nbsp;SimplyFoot – Tous droits réservés. <br className="md:hidden" />
        Conçu avec ❤️ pour les clubs amateurs.
      </div>
    </footer>
  );
}
