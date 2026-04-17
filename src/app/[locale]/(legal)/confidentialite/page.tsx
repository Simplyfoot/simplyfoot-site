import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('legal.privacy');
    return { title: t('title'), description: t('description') };
}

export default async function ConfidentialitePage() {
    const t = await getTranslations('legal.privacy');
    return (
        <main className="container-simply py-(--space-section-y)">
            <h1 className="font-display text-h1 font-bold text-brand-primary">{t('title')}</h1>
            <p className="text-body-fluid mt-6 max-w-[65ch] leading-relaxed text-muted-foreground">
                {t('body')}
            </p>
        </main>
    );
}
