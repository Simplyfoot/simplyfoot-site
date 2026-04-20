import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, User } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';

import { ArticleBlockRenderer } from '@/components/blog/ArticleBlockRenderer';
import { ChangelogCard } from '@/components/blog/ChangelogCard';
import { MatchResultCard } from '@/components/blog/MatchResultCard';
import { SharePanel } from '@/components/blog/SharePanel';
import { SmartArticleCard } from '@/components/blog/SmartArticleCard';
import { FOOT_ARTICLES } from '@/content/blog/foot-articles';
import { Link as IntlLink } from '@/i18n/navigation';
import { type AppLocale } from '@/i18n/routing';
import { localizedArticleHref } from '@/lib/blog/href';
import { getAdjacentArticles, getArticleBySlug, getRelatedArticles } from '@/lib/blog/service';
import { SITE_URL } from '@/lib/constants';

interface ArticlePageProps {
    params: Promise<{ locale: AppLocale; slug: string }>;
}

export async function generateStaticParams() {
    return FOOT_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleBySlug('foot', slug);
    if (!article) {
        return {};
    }
    return {
        title: `${article.title} — SimplyFoot`,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: 'article',
            publishedTime: article.publishedAt,
            ...(article.imageUrl ? { images: [article.imageUrl] } : {}),
        },
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const article = await getArticleBySlug('foot', slug);
    if (!article) {
        notFound();
    }

    const [related, adjacent, t, tCategories, currentLocale] = await Promise.all([
        getRelatedArticles(article, 3),
        getAdjacentArticles(article),
        getTranslations('Blog.article'),
        getTranslations('Blog.categories'),
        getLocale(),
    ]);

    const shareUrl = `${SITE_URL}${localizedArticleHref(article.slug, currentLocale)}`;

    return (
        <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 md:px-6 lg:py-14">
            <nav
                aria-label="Breadcrumb"
                className="text-muted-foreground flex items-center gap-2 text-sm"
            >
                <IntlLink href="/foot" className="hover:text-primary transition-colors">
                    {t('breadcrumb.home')}
                </IntlLink>
                <span aria-hidden>/</span>
                <IntlLink href="/foot/blog" className="hover:text-primary transition-colors">
                    {t('breadcrumb.blog')}
                </IntlLink>
                <span aria-hidden>/</span>
                <span className="text-foreground">{tCategories(article.category)}</span>
            </nav>

            <header className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 font-medium">
                        {tCategories(article.category)}
                    </span>
                    {article.region && (
                        <span className="bg-muted text-muted-foreground inline-flex items-center rounded-full px-3 py-1 font-medium uppercase">
                            {article.region}
                        </span>
                    )}
                </div>

                <h1 className="font-display text-foreground text-3xl leading-tight font-bold md:text-4xl">
                    {article.title}
                </h1>
                <p className="text-muted-foreground max-w-[65ch] text-lg leading-relaxed">
                    {article.excerpt}
                </p>

                <div className="text-muted-foreground flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                    <span className="inline-flex items-center gap-1.5">
                        <User className="size-4" aria-hidden />
                        {t('by', { author: article.author })}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-4" aria-hidden />
                        <time dateTime={article.publishedAt}>
                            {formatDate(article.publishedAt)}
                        </time>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-4" aria-hidden />
                        {article.readingMinutes} min
                    </span>
                    {article.matchData && (
                        <span className="inline-flex items-center gap-1.5">
                            <MapPin className="size-4" aria-hidden />
                            {article.matchData.stadium}
                        </span>
                    )}
                </div>
            </header>

            {article.matchData && <MatchResultCard article={article} />}
            {article.changelog && <ChangelogCard article={article} inline />}

            <ArticleBlockRenderer blocks={article.content} />

            {article.tags.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                        <li
                            key={tag}
                            className="border-border text-muted-foreground rounded-full border px-3 py-1 text-xs"
                        >
                            #{tag}
                        </li>
                    ))}
                </ul>
            )}

            <SharePanel url={shareUrl} title={article.title} />

            <div className="border-border flex flex-col gap-4 border-t pt-6 sm:flex-row sm:justify-between">
                {adjacent.prev ? (
                    <Link
                        href={localizedArticleHref(adjacent.prev.slug, currentLocale)}
                        className="group hover:text-primary flex flex-col items-start gap-1 text-sm transition-colors"
                    >
                        <span className="text-muted-foreground inline-flex items-center gap-1">
                            <ArrowLeft className="size-3.5" aria-hidden />
                            {t('navigation.previous')}
                        </span>
                        <span className="line-clamp-1 max-w-[30ch] font-medium">
                            {adjacent.prev.title}
                        </span>
                    </Link>
                ) : (
                    <span />
                )}
                {adjacent.next && (
                    <Link
                        href={localizedArticleHref(adjacent.next.slug, currentLocale)}
                        className="group hover:text-primary flex flex-col items-end gap-1 text-right text-sm transition-colors"
                    >
                        <span className="text-muted-foreground inline-flex items-center gap-1">
                            {t('navigation.next')}
                            <ArrowRight className="size-3.5" aria-hidden />
                        </span>
                        <span className="line-clamp-1 max-w-[30ch] font-medium">
                            {adjacent.next.title}
                        </span>
                    </Link>
                )}
            </div>

            {related.length > 0 && (
                <section className="mt-6">
                    <h2 className="font-display mb-5 text-xl font-semibold">{t('relatedTitle')}</h2>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                        {related.map((a) => (
                            <SmartArticleCard key={a.slug} article={a} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}

function formatDate(iso: string): string {
    try {
        return new Date(iso).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    } catch {
        return iso;
    }
}
