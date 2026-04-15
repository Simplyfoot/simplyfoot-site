import Link from 'next/link';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { categoryLabels } from 'lib/blog/types';
import type { BlogArticle } from 'lib/blog/types';

interface BlogCardProps {
  article: BlogArticle;
  brandSlug: string;
}

export function BlogCard({ article, brandSlug }: BlogCardProps) {
  const date = new Date(article.publishedAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/${brandSlug}/blog/${article.slug}`}
      className="group flex flex-col rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)]/50 overflow-hidden transition-all duration-200 hover:border-[var(--brand-cta)]/40 hover:shadow-lg"
    >
      {/* Cover placeholder */}
      <div className="h-44 bg-gradient-to-br from-[var(--brand-bg)] to-[var(--brand-surface)] flex items-center justify-center">
        <span className="text-4xl opacity-20">
          {brandSlug === 'foot' ? '⚽' : brandSlug === 'rugby' ? '🏉' : '🤾'}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-[var(--brand-cta)]/15 px-2.5 py-0.5 font-semibold text-[var(--brand-cta)]">
            {categoryLabels[article.category]}
          </span>
          <span className="flex items-center gap-1 text-[var(--color-text-beige)]/60">
            <Clock className="h-3 w-3" /> {article.readingTime} min
          </span>
        </div>

        <h3 className="text-base font-bold text-brand-text leading-snug line-clamp-2">
          {article.title}
        </h3>

        <p className="text-sm text-[var(--color-text-beige)]/70 line-clamp-2">
          {article.excerpt}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between text-xs text-[var(--color-text-beige)]/50">
          <div className="flex items-center gap-1">
            {article.department && (
              <>
                <MapPin className="h-3 w-3" />
                <span>{article.department}</span>
              </>
            )}
          </div>
          <span>{date}</span>
        </div>

        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand-cta)] transition-all group-hover:gap-2">
          Lire l&apos;article
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
