import Image from 'next/image';
import { cn } from 'lib/utils/cn';
import type { PartnerDTO } from 'lib/contracts/partner.dto';

interface BrandPartnersProps {
  title: string;
  subtitle?: string;
  partners: PartnerDTO[];
  className?: string;
}

export function BrandPartners({ title, subtitle, partners, className }: BrandPartnersProps) {
  return (
    <section
      aria-labelledby="partners-title"
      className={cn(
        'w-full bg-[var(--color-surface-card)] py-12 border-t border-[var(--brand-bg)]/10',
        className,
      )}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 id="partners-title" className="text-2xl md:text-3xl font-bold text-[var(--brand-bg)] mb-4">{title}</h2>
        {subtitle && (
          <p className="text-[var(--brand-bg)]/80 mb-10 text-base md:text-md max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-12">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.websiteUrl ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              title={partner.name}
              className="group flex flex-col items-center transition-transform duration-300 hover:-translate-y-1"
            >
              <Image
                src={partner.logoUrl}
                alt={partner.name}
                height={80}
                width={120}
                className="object-contain transition-transform duration-300 group-hover:scale-105 group-hover:opacity-90"
              />
              {partner.description && (
                <p className="mt-3 text-[var(--brand-bg)]/70 text-sm font-semibold group-hover:text-[var(--brand-accent)] transition-colors">
                  {partner.description}
                </p>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
