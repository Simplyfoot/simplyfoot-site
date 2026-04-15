'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, Facebook, Linkedin, Instagram } from 'lucide-react';
import SimoImg from 'assets/images/SIMO.png';
import { company } from 'lib/config/company';

interface FooterDict {
  legalTitle: string;
  legalLinks: {
    mentions: string;
    cgu: string;
    cgv: string;
    privacy: string;
    cookies: string;
    contact: string;
  };
  socialTitle: string;
  socialSubtitle: string;
  copyright: string;
  tagline: string;
}

const LEGAL_LINKS = [
  { key: 'mentions' as const, href: '/mentions-legales' },
  { key: 'cgu' as const, href: '/cgu' },
  { key: 'cgv' as const, href: '/cgv' },
  { key: 'privacy' as const, href: '/confidentialite' },
  { key: 'cookies' as const, href: '/confidentialite#cookies' },
  { key: 'contact' as const, href: '/contact' },
];

export default function Footer({ dict }: { dict: FooterDict }) {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-[var(--brand-bg-alt)] text-[var(--color-text-beige)]/90 border-t border-[var(--brand-border)] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-3">
        <section aria-label="Coordonnees" className="space-y-4">
          <h3 className="text-xl font-extrabold text-[var(--brand-cta)]">{company.legalName}</h3>
          <p className="text-sm leading-relaxed">
            Capital social : {company.legal.capitalSocial} €
            <br />
            RCS : {company.legal.rcs}
            <br />
            N° TVA : {company.legal.tva}
          </p>
          <address className="not-italic text-sm flex flex-col gap-2">
            <span className="flex items-start gap-2">
              <MapPin size={16} aria-hidden="true" /> {company.address.full}
            </span>
            <span className="flex items-start gap-2">
              <Phone size={16} aria-hidden="true" />
              <a className="font-semibold hover:underline" href={`tel:${company.phone.replace(/\s/g, '')}`}>
                {company.phone}
              </a>
            </span>
            <span className="flex items-start gap-2">
              <Mail size={16} aria-hidden="true" />
              <a className="font-semibold hover:underline" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </span>
          </address>
        </section>

        <nav className="space-y-2">
          <h4 className="text-lg font-semibold mb-2">{dict.legalTitle}</h4>
          <ul className="grid gap-1">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm hover:text-[var(--brand-cta)] transition-colors"
                >
                  {dict.legalLinks[l.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-label="Reseaux sociaux" className="space-y-4">
          <h4 className="text-lg font-semibold mb-2">{dict.socialTitle}</h4>
          <p className="text-sm">{dict.socialSubtitle}</p>
          <div className="flex gap-4">
            <Link
              href={company.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[var(--brand-cta)] transition-colors"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href={company.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[var(--brand-cta)] transition-colors"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href={company.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[var(--brand-cta)] transition-colors"
            >
              <Instagram size={20} />
            </Link>
          </div>
        </section>
      </div>

      <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/60">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Image src={SimoImg} alt="Simo, mascotte Simply" width={48} height={48} className="rounded-full" />
          <span className="font-bold text-sm text-white/80">Simply</span>
        </div>
        © {year} {company.legalName} – {dict.copyright} <br className="md:hidden" />
        {dict.tagline}
      </div>
    </footer>
  );
}
