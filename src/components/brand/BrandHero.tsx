import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { cn } from 'lib/utils/cn';

interface BrandHeroAction {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

interface BrandHeroProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  actions?: BrandHeroAction[];
  backgroundImage?: StaticImageData | string;
  illustration?: React.ReactNode;
  stats?: { label: string; value: string }[];
  layout?: 'left' | 'center' | 'right';
  mascot?: React.ReactNode;
  className?: string;
}

export function BrandHero({
  title,
  subtitle,
  actions = [],
  backgroundImage,
  illustration,
  stats,
  layout = 'left',
  mascot,
  className,
}: BrandHeroProps) {
  return (
    <section
      aria-label="Présentation"
      className={cn(
        'relative w-full min-h-[98vh] flex flex-col items-center justify-center bg-[var(--brand-bg)] overflow-hidden pb-0',
        className,
      )}
    >
      {/* Background image (SimplyFoot only) */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src={backgroundImage}
            alt=""
            role="presentation"
            className="w-full h-full object-cover brightness-[.45] blur-[1.5px] select-none"
            draggable={false}
            fill
            priority
          />
          <div className="absolute inset-0 bg-[conic-gradient(at_top_left,_var(--brand-accent)33,_transparent_50%)]" />
        </div>
      )}

      {/* Pattern background (rugby/handball — no photo) */}
      {!backgroundImage && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 brand-halo" />
      )}

      {/* Content — layout varies per sport */}
      {layout === 'center' ? (
        /* RUGBY: Texte centre, imposant, illustration en dessous */
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center pt-32 pb-16">
          <h1 className="font-display text-white font-extrabold text-4xl md:text-6xl lg:text-7xl mb-6 drop-shadow-xl leading-tight">
            {title}
          </h1>
          <div className="mb-6 text-white/85 text-lg md:text-2xl font-medium max-w-2xl mx-auto">
            {subtitle}
          </div>
          {actions.length > 0 && (
            <div className="flex gap-5 justify-center flex-wrap">
              {actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={cn(
                    'px-8 py-4 rounded-xl font-bold text-lg transition-all duration-150',
                    action.variant === 'secondary'
                      ? 'border border-[var(--color-text-beige)]/60 text-[var(--color-text-beige)] hover:border-[var(--brand-cta)] hover:text-[var(--brand-cta)]'
                      : 'bg-[var(--brand-cta)] text-[var(--brand-cta-text)] shadow-lg hover:bg-[var(--brand-cta-hover)]',
                  )}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          )}
          {illustration && (
            <div className="mt-12 flex justify-center opacity-60">
              {illustration}
            </div>
          )}
        </div>
      ) : layout === 'right' ? (
        /* HANDBALL: Illustration a gauche, texte a droite */
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-14 pt-32 pb-24">
          {illustration && (
            <div className="flex-1 flex items-center justify-center opacity-50">
              {illustration}
            </div>
          )}
          <div className="flex-1 flex flex-col items-start text-left gap-5">
            <h1 className="font-display text-white font-extrabold text-4xl md:text-6xl mb-3 drop-shadow-xl leading-tight">
              {title}
            </h1>
            <div className="mb-3 text-white/85 text-lg md:text-2xl font-medium max-w-xl">
              {subtitle}
            </div>
            {actions.length > 0 && (
              <div className="flex gap-5 mt-2 flex-wrap">
                {actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={cn(
                      'px-8 py-4 rounded-xl font-bold text-lg transition-all duration-150',
                      action.variant === 'secondary'
                        ? 'border border-[var(--color-text-beige)]/60 text-[var(--color-text-beige)] hover:border-[var(--brand-cta)] hover:text-[var(--brand-cta)]'
                        : 'bg-[var(--brand-cta)] text-[var(--brand-cta-text)] shadow-lg hover:bg-[var(--brand-cta-hover)]',
                    )}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* FOOT (default): Texte a gauche, illustration a droite */
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-14 pt-32 pb-24">
          <div className="flex-1 flex flex-col items-start text-left gap-5">
            <h1 className="font-display text-white font-extrabold text-4xl md:text-6xl mb-3 drop-shadow-xl leading-tight">
              {title}
            </h1>
            <div className="mb-3 text-white/85 text-lg md:text-2xl font-medium max-w-xl">
              {subtitle}
            </div>
            {actions.length > 0 && (
              <div className="flex gap-5 mt-2 flex-wrap">
                {actions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={cn(
                      'px-8 py-4 rounded-xl font-bold text-lg transition-all duration-150',
                      action.variant === 'secondary'
                        ? 'border border-[var(--color-text-beige)]/60 text-[var(--color-text-beige)] hover:border-[var(--brand-cta)] hover:text-[var(--brand-cta)]'
                        : 'bg-[var(--brand-cta)] text-[var(--brand-cta-text)] shadow-lg hover:bg-[var(--brand-cta-hover)]',
                    )}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {illustration && (
            <div className="flex-1 flex items-center justify-center mt-8 md:mt-0 opacity-50">
              {illustration}
            </div>
          )}
        </div>
      )}

      {/* Mascot */}
      {mascot && (
        <div className="absolute bottom-8 right-8 z-20 opacity-70">
          {mascot}
        </div>
      )}

      {/* Stats banner */}
      {stats && stats.length > 0 && (
        <div className="relative w-full max-w-6xl mx-auto px-4 py-6 z-30 mt-9 flex flex-col sm:flex-row justify-center items-center gap-16 bg-[var(--color-text-beige)]/95 rounded-t-3xl shadow-2xl border-t border-[var(--brand-border)] mb-0 backdrop-blur-md">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-16">
              {i > 0 && (
                <div className="h-8 w-px bg-[var(--color-text-dark)]/20 hidden sm:block" aria-hidden="true" />
              )}
              <div className="text-center flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-dark)]">{stat.value}</span>
                {stat.label && (
                  <span className="text-[var(--color-text-dark)]/80 text-sm font-semibold">{stat.label}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
