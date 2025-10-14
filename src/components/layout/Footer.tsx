"use client";
import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Linkedin, Instagram } from "lucide-react";

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
            SimplyFoot — SAS
          </h3>
          <p className="text-sm leading-relaxed">
            Capital social : 2 000 €<br />
            RCS : 991 139 171 R.C.S Paris<br />
            N° TVA : FR 89 991139171
          </p>
          <address className="not-italic text-sm flex flex-col gap-2">
            <span className="flex items-start gap-2">
              <MapPin size={16} /> 60 rue François 1er, 75008 Paris
            </span>
            <span className="flex items-start gap-2">
              <Phone size={16} /><a className="font-semibold hover:underline" href="tel:+33682845641">+33 6 82 84 56 41</a>
            </span>
            <span className="flex items-start gap-2">
              <Mail size={16} /><a className="font-semibold hover:underline" href="mailto:contact@simplyfoot.com">contact@simplyfoot.fr</a>
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
              href="https://www.facebook.com/profile.php?id=61580681960537"
              aria-label="Facebook"
              className="hover:text-simply-green transition-colors"
            >
              <Facebook size={20} />
            </Link>
            {/* <Link
              href="https://twitter.com/simplyfoot"
              aria-label="Twitter"
              className="hover:text-simply-green transition-colors"
            >
              <Twitter size={20} />
            </Link> */}
            <Link
              href="https://www.linkedin.com/in/simply-foot-40a883372/"
              aria-label="LinkedIn"
              className="hover:text-simply-green transition-colors"
            >
              <Linkedin size={20} />
            </Link>
                        <Link
              href="https://www.instagram.com/simply.foot/"
              aria-label="Instagram"
              className="hover:text-simply-green transition-colors"
            >
              <Instagram size={20} />
            </Link>
          </div>
        </section>
      </div>

      <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/60">
        © {year} SimplyFoot – Tous droits réservés. <br className="md:hidden" />
        Conçu avec ❤️ pour les clubs amateurs.
      </div>
    </footer>
  );
}
