import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, MapPin, Clock, Calendar } from 'lucide-react';
import { getBrandConfig } from 'lib/config/brands';
import { buildBrandMetadata } from 'lib/seo/metadata';
import { mockArticles } from 'lib/blog/mock-articles';
import { categoryLabels } from 'lib/blog/types';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return mockArticles.map((a) => ({
    brand: a.brand,
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; slug: string }>;
}): Promise<Metadata> {
  const { brand, slug } = await params;
  const config = getBrandConfig(brand);
  const article = mockArticles.find((a) => a.slug === slug && a.brand === brand);
  if (!article) return {};
  return buildBrandMetadata(config, {
    title: article.title,
    description: article.excerpt,
    path: `/${config.slug}/blog/${slug}`,
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ brand: string; slug: string }>;
}) {
  const { brand, slug } = await params;
  const config = getBrandConfig(brand);
  const article = mockArticles.find((a) => a.slug === slug && a.brand === brand);

  if (!article) notFound();

  const date = new Date(article.publishedAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const related = mockArticles
    .filter((a) => a.brand === brand && a.slug !== slug && a.category === article.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[var(--brand-bg)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Back */}
        <Link
          href={`/${config.slug}/blog`}
          className="inline-flex items-center gap-2 text-sm text-[var(--brand-cta)] hover:underline mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux actualités
        </Link>

        {/* Cover placeholder */}
        <div className="rounded-2xl h-56 md:h-72 bg-gradient-to-br from-[var(--brand-bg)] to-[var(--brand-surface)] mb-8 flex items-center justify-center">
          <span className="text-6xl opacity-20">
            {brand === 'foot' ? '⚽' : brand === 'rugby' ? '🏉' : '🤾'}
          </span>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-beige)]/60 mb-4">
          <span className="rounded-full bg-[var(--brand-cta)]/15 px-2.5 py-0.5 font-semibold text-[var(--brand-cta)]">
            {categoryLabels[article.category]}
          </span>
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {date}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readingTime} min de lecture</span>
          <span>{article.author}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
          {article.title}
        </h1>

        {/* Location */}
        {article.department && (
          <div className="flex items-center gap-1 text-sm text-[var(--color-text-beige)]/50 mb-8">
            <MapPin className="h-4 w-4" />
            {article.department}{article.region ? `, ${article.region}` : ''}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {article.content.split('\n\n').map((para, i) => (
            <p key={i} className="text-[var(--color-text-beige)]/80 leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 mb-12">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--brand-border)] px-3 py-1 text-xs text-[var(--color-text-beige)]/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Separator */}
        <hr className="border-[var(--brand-border)] mb-8" />

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Articles similaires</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/${config.slug}/blog/${r.slug}`}
                  className="rounded-xl border border-[var(--brand-border)] bg-[var(--brand-surface)]/30 p-4 hover:border-[var(--brand-cta)]/40 transition-colors"
                >
                  <span className="text-xs text-[var(--brand-cta)] font-semibold">
                    {categoryLabels[r.category]}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1 line-clamp-2">{r.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link bottom */}
        <div className="mt-12">
          <Link
            href={`/${config.slug}/blog`}
            className="inline-flex items-center gap-2 text-sm text-[var(--brand-cta)] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux actualités
          </Link>
        </div>
      </div>
    </div>
  );
}
