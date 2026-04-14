import Image from 'next/image';
import { cn } from 'lib/utils/cn';
import type { TestimonialDTO } from 'lib/contracts/testimonial.dto';

interface BrandTestimonialsProps {
  title: string;
  testimonials: TestimonialDTO[];
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
}

export function BrandTestimonials({ title, testimonials, className }: BrandTestimonialsProps) {
  return (
    <section
      aria-labelledby="brand-testimonials-title"
      className={cn('w-full max-w-6xl mx-auto px-6 py-16', className)}
    >
      <h2
        id="brand-testimonials-title"
        className="text-2xl md:text-3xl font-bold text-[var(--brand-cta)] mb-9 text-center"
      >
        {title}
      </h2>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 list-none p-0 m-0">
        {testimonials.map((t) => (
          <li
            key={t.id}
            className="bg-[var(--color-surface-dark)] rounded-2xl p-7 flex flex-col border border-[var(--brand-border)] hover:border-[var(--brand-cta)]/40 transition-colors duration-200"
          >
            <blockquote className="flex-1 mb-6">
              <p className="text-base text-[var(--color-text-beige)] leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </blockquote>

            <div className="flex items-center gap-3">
              {t.avatarUrl ? (
                <Image
                  src={t.avatarUrl}
                  alt={`${t.authorName}, ${t.authorRole}`}
                  width={44}
                  height={44}
                  className="rounded-full border-2 border-[var(--brand-cta)]/50 shrink-0"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--brand-cta)]/20 text-sm font-bold text-[var(--brand-cta)] border border-[var(--brand-cta)]/30"
                >
                  {getInitials(t.authorName)}
                </span>
              )}
              <div>
                <div className="text-sm font-bold text-white">{t.authorName}</div>
                <div className="text-xs text-[var(--brand-cta)] font-semibold">{t.authorRole}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
