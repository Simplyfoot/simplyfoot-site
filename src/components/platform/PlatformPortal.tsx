'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Users, ShieldCheck, Smartphone, Headphones, ArrowRight, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { BrandConfig } from 'lib/config/brands';
import PlanetSceneLazy from 'components/three/PlanetSceneLazy';
import StarfieldLazy from 'components/three/StarfieldLazy';
import { SceneErrorBoundary } from 'components/three/SceneErrorBoundary';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  { Icon: Users, title: 'Pensé pour les bénévoles', desc: 'Chaque fonctionnalité est conçue avec des dirigeants et coachs amateurs. Simple, efficace, sans formation.' },
  { Icon: ShieldCheck, title: 'Sécurisé & conforme RGPD', desc: 'Vos données et celles de vos licenciés sont protégées. Hébergement en France, conformité totale.' },
  { Icon: Smartphone, title: 'Mobile & accessible partout', desc: "Gérez votre club depuis le terrain, les vestiaires ou chez vous. L'application s'adapte à votre quotidien." },
  { Icon: Headphones, title: 'Support réactif', desc: "Une équipe à votre écoute, des réponses en moins de 24h. Vous n'êtes jamais seul face à un problème." },
] as const;

const STATS = [
  { value: 3, suffix: '', label: 'sports couverts' },
  { value: 1, suffix: '', label: 'plateforme unifiée' },
  { value: 100, suffix: '%', label: "dédié à l'amateur" },
] as const;

interface PlatformPortalProps {
  brands: BrandConfig[];
}

export function PlatformPortal({ brands }: PlatformPortalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    const hover = window.matchMedia('(hover: hover)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanTilt(hover && !reduced);
  }, []);

  // GSAP animations
  useGSAP(() => {
    // Hero entrance
    gsap.from('.hero-badge', { opacity: 0, scale: 0.95, duration: 0.6, delay: 0.3 });
    gsap.from('.hero-title', { opacity: 0, y: 60, duration: 1, delay: 0.5, ease: 'power4.out' });
    gsap.from('.hero-sub', { opacity: 0, y: 30, duration: 0.8, delay: 1.0, ease: 'power3.out' });
    gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 0.6, stagger: 0.15, delay: 1.3 });
    gsap.from('.hero-scroll', { opacity: 0, duration: 0.6, delay: 1.8 });

    // Stats counter
    const statEls = containerRef.current?.querySelectorAll('.stat-num');
    statEls?.forEach((el) => {
      const target = parseFloat(el.getAttribute('data-val') || '0');
      gsap.fromTo(el, { innerText: 0 }, {
        innerText: target, duration: 2, ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });

    // Brand portals stagger
    gsap.from('.portal-card', {
      y: 80, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.2,
      scrollTrigger: { trigger: '.portals-grid', start: 'top 80%' },
    });

    // Values stagger
    gsap.from('.value-card', {
      y: 50, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: '.values-grid', start: 'top 80%' },
    });

    // CTA reveal
    gsap.from('.cta-title', {
      opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-section', start: 'top 80%' },
    });
  }, { scope: containerRef });

  const handleTiltMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!canTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
    e.currentTarget.style.transition = 'transform 0.1s ease-out';
  }, [canTilt]);

  const handleTiltLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
    e.currentTarget.style.transition = 'transform 0.4s ease-out';
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--color-platform-bg)]">

      {/* ── Hero with 3D background ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Starfield — absolute, only in hero */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <SceneErrorBoundary>
            <StarfieldLazy />
          </SceneErrorBoundary>
        </div>

        {/* Planets 3D — above starfield */}
        <div className="absolute inset-0 z-[1]">
          <SceneErrorBoundary>
            <PlanetSceneLazy />
          </SceneErrorBoundary>
        </div>

        {/* Text — above canvas */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-white/60 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" aria-hidden="true" />
            La plateforme des clubs amateurs
          </span>

          <h1 className="hero-title mt-8 font-display text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-9xl">
            Simply
          </h1>

          <p className="hero-sub mx-auto mt-6 max-w-xl text-lg text-white/55 leading-relaxed md:text-xl">
            Un écosystème complet pour gérer, motiver et faire rayonner votre club — quel que soit votre sport.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="hero-cta rounded-xl bg-white px-7 py-3.5 text-sm font-extrabold text-[var(--color-platform-bg)] shadow-lg transition-all hover:shadow-white/20 hover:shadow-xl hover:scale-[1.02] active:scale-[.98]">
              Demander une démo
            </Link>
            <Link href="#brands" className="hero-cta rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white/70 transition-all hover:border-white/40 hover:text-white active:scale-[.98]">
              Découvrir les sports
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="h-6 w-6 text-white/30" />
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div className="border-y border-[var(--color-platform-border)]">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <dl className="grid grid-cols-3 gap-0 divide-x divide-[var(--color-platform-border)]">
            {STATS.map(({ value, suffix, label }) => (
              <div key={label} className="flex flex-col items-center px-4 text-center">
                <dt className="text-3xl font-extrabold text-white sm:text-5xl">
                  <span className="stat-num" data-val={value}>0</span>{suffix}
                </dt>
                <dd className="mt-2 text-xs font-medium text-white/45 uppercase tracking-widest">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ── Brand portals ── */}
      <section id="brands" className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8" aria-labelledby="brands-title">
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-white/35">
          Trois univers, une plateforme
        </p>
        <h2 id="brands-title" className="mb-16 text-center text-3xl font-bold text-white md:text-4xl">
          Choisissez votre sport
        </h2>

        <div className="portals-grid grid grid-cols-1 gap-6 md:grid-cols-3">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/${brand.slug}`}
              data-brand={brand.id}
              aria-label={`Découvrir Simply${brand.suffix}`}
              className="portal-card group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-bg)] p-8 transition-shadow duration-300 hover:border-[var(--brand-cta)] hover:shadow-[0_0_60px_-12px_var(--brand-cta)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cta)]"
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 brand-halo opacity-50" />
              <div className="relative z-10 flex flex-1 flex-col">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-cta)]/70">
                  {brand.sport.charAt(0).toUpperCase() + brand.sport.slice(1)} amateur
                </p>
                <span className="mt-3 text-3xl font-extrabold text-white">
                  Simply<span className="text-[var(--brand-cta)]">{brand.suffix}</span>
                </span>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-white/60">
                  {brand.meta.description}
                </p>
                <div className="mt-7 border-t border-[var(--brand-border)] pt-5">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-cta)] transition-all group-hover:gap-3">
                    Découvrir
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Valeurs Simply ── */}
      <section className="border-t border-[var(--color-platform-border)]" aria-labelledby="values-title">
        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-white/35">
            Ce qui nous rassemble
          </p>
          <h2 id="values-title" className="mb-16 text-center text-3xl font-bold text-white md:text-4xl">
            Conçu pour durer
          </h2>
          <div className="values-grid grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ Icon, title, desc }) => (
              <div key={title} className="value-card group">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                  <Icon className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final with animated gradient ── */}
      <section className="cta-section border-t border-[var(--color-platform-border)] cta-gradient">
        <div className="mx-auto max-w-2xl px-4 py-28 text-center sm:px-6 lg:px-8">
          <h2 className="cta-title text-3xl font-extrabold text-white md:text-5xl">
            Prêt à transformer votre club ?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-white/55 leading-relaxed">
            Rejoignez les clubs qui ont choisi Simply pour simplifier leur quotidien et se concentrer sur l&apos;essentiel : le sport.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-extrabold text-[var(--color-platform-bg)] shadow-lg transition-all hover:shadow-white/20 hover:shadow-xl hover:scale-[1.03] active:scale-[.98]"
            >
              Contacter l&apos;équipe Simply
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
