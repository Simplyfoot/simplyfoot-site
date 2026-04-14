import Image from 'next/image';
import { cn } from 'lib/utils/cn';
import type { ClubLogoDTO } from 'lib/contracts/club-logo.dto';

interface BrandClubLogosProps {
  title: string;
  subtitle?: string;
  logos: ClubLogoDTO[];
  className?: string;
}

export function BrandClubLogos({ title, subtitle, logos, className }: BrandClubLogosProps) {
  return (
    <section
      aria-labelledby="club-logos-title"
      className={cn('w-full py-12 bg-[var(--color-surface-dark)] border-t border-[var(--brand-border)]', className)}
    >
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 id="club-logos-title" className="text-2xl md:text-3xl font-bold text-[var(--brand-cta)] mb-4">{title}</h2>
        {subtitle && (
          <p className="text-[var(--color-text-beige)]/80 mb-10 text-base md:text-md">{subtitle}</p>
        )}

        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12">
          {logos.map((logo) => (
            <a
              key={logo.id}
              href={logo.websiteUrl ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-1"
              title={logo.clubName}
            >
              <Image
                src={logo.logoUrl}
                alt={`Logo ${logo.clubName}`}
                height={110}
                width={110}
                className="object-contain transition-transform duration-300 group-hover:scale-105 group-hover:opacity-90"
              />
              <p className="mt-3 text-[var(--color-text-beige)]/70 text-sm font-semibold group-hover:text-[var(--brand-cta)] transition-colors">
                {logo.clubName}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
