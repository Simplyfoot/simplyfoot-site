'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { BrandConfig, BrandId } from 'lib/config/brands';

/* ── Sport-specific SVG icons (decorative) ── */

function FootballIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M40 4 L52 20 L48 38 L32 38 L28 20 Z" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M40 76 L28 60 L32 42 L48 42 L52 60 Z" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

function RugbyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      <ellipse cx="40" cy="40" rx="34" ry="22" stroke="currentColor" strokeWidth="1.5" opacity="0.3" transform="rotate(-30 40 40)" />
      <line x1="18" y1="55" x2="62" y2="25" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="25" y1="60" x2="55" y2="20" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
    </svg>
  );
}

function HandballIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M40 6 Q60 40 40 74" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M40 6 Q20 40 40 74" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <line x1="6" y1="40" x2="74" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
    </svg>
  );
}

const SPORT_ICONS: Record<BrandId, React.FC<{ className?: string }>> = {
  foot: FootballIcon,
  rugby: RugbyIcon,
  handball: HandballIcon,
};

/* ── Subtle background patterns per sport ── */
const PATTERNS: Record<BrandId, string> = {
  foot: 'repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg 30deg, var(--brand-cta) 30deg 31deg)',
  rugby: 'repeating-linear-gradient(135deg, transparent 0px 20px, var(--brand-cta) 20px 21px)',
  handball: 'radial-gradient(circle at 20% 30%, var(--brand-cta) 1px, transparent 1px), radial-gradient(circle at 80% 70%, var(--brand-cta) 1px, transparent 1px)',
};

interface BrandPortalCardProps {
  brand: BrandConfig;
}

export function BrandPortalCard({ brand }: BrandPortalCardProps) {
  const prefersReduced = useReducedMotion();
  const SportIcon = SPORT_ICONS[brand.id];

  return (
    <Link
      href={`/${brand.slug}`}
      data-brand={brand.id}
      aria-label={`Découvrir Simply${brand.suffix}`}
      className="group block"
    >
      <motion.div
        whileHover={prefersReduced ? {} : { scale: 1.02, y: -4 }}
        whileTap={prefersReduced ? {} : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative flex flex-col overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-bg)] p-8 transition-all duration-300 group-hover:border-[var(--brand-cta)] group-hover:shadow-[0_0_40px_-8px_var(--brand-cta)] group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-[var(--brand-cta)]"
      >
        {/* Brand halo */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 brand-halo opacity-50" />

        {/* Subtle sport pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
          style={{ backgroundImage: PATTERNS[brand.id], backgroundSize: '40px 40px' }}
        />

        {/* Sport icon (decorative, top-right) */}
        <div className="pointer-events-none absolute -top-2 -right-2 w-24 h-24 text-[var(--brand-cta)] opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <SportIcon className="w-full h-full" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          {/* Eyebrow */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-cta)]/70">
            {brand.sport.charAt(0).toUpperCase() + brand.sport.slice(1)} amateur
          </p>

          {/* Name */}
          <span className="mt-3 text-3xl font-extrabold text-white">
            Simply<span className="text-[var(--brand-cta)]">{brand.suffix}</span>
          </span>

          {/* Description */}
          <p className="mt-4 flex-1 text-sm leading-relaxed text-white/60">
            {brand.meta.description}
          </p>

          {/* Divider + CTA link */}
          <div className="mt-7 border-t border-[var(--brand-border)] pt-5">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-cta)] transition-all group-hover:gap-2.5">
              Découvrir
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
