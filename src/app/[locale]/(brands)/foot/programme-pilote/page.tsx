import { AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { brandConfigs } from '@/lib/brand/config';
import { BrandProvider } from '@/lib/brand/context';
import { Link } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils';

const brand = brandConfigs.foot;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('foot.pilot');
    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function ProgrammePilotePage() {
    const t = await getTranslations('foot.pilot');

    const objectivePoints = [
        t('objective.points.0'),
        t('objective.points.1'),
        t('objective.points.2'),
    ];

    const availableItems = [
        t('available.items.0'),
        t('available.items.1'),
        t('available.items.2'),
        t('available.items.3'),
        t('available.items.4'),
        t('available.items.5'),
        t('available.items.6'),
        t('available.items.7'),
        t('available.items.8'),
        t('available.items.9'),
        t('available.items.10'),
    ];

    const feedbackItems = [
        t('feedback.items.0'),
        t('feedback.items.1'),
        t('feedback.items.2'),
        t('feedback.items.3'),
        t('feedback.items.4'),
        t('feedback.items.5'),
        t('feedback.items.6'),
        t('feedback.items.7'),
    ];

    return (
        <BrandProvider config={brand}>
            <main>
                {/* Hero */}
                <section
                    aria-label={t('title')}
                    className="bg-[--brand-surface-dark] py-(--space-section-y)"
                >
                    <div className="container-simply flex flex-col items-center gap-6 text-center">
                        <Badge className="bg-brand-primary/20 text-brand-primary-light hover:bg-brand-primary/30">
                            {t('badge')}
                        </Badge>

                        <h1 className="font-display text-display leading-tight font-bold text-[--simply-beige]">
                            {t('title')}
                        </h1>

                        <p className="text-body-fluid max-w-2xl leading-relaxed text-[--simply-beige]/80">
                            {t('subtitle')}
                        </p>
                    </div>
                </section>

                {/* Objective */}
                <section aria-label={t('objective.title')} className="py-(--space-section-y)">
                    <div className="container-simply">
                        <h2 className="font-display text-h2 font-bold">{t('objective.title')}</h2>
                        <ul className="mt-(--space-element) flex flex-col gap-4">
                            {objectivePoints.map((point) => (
                                <li key={point} className="text-body-fluid flex items-start gap-3">
                                    <CheckCircle className="mt-1 size-5 shrink-0 text-brand-primary" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Available now */}
                <section
                    aria-label={t('available.title')}
                    className="bg-[--brand-surface-dark] py-(--space-section-y)"
                >
                    <div className="container-simply">
                        <h2 className="font-display text-h2 font-bold text-[--simply-beige]">
                            {t('available.title')}
                        </h2>
                        <ul className="mt-(--space-element) grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {availableItems.map((item) => (
                                <li
                                    key={item}
                                    className="text-body-fluid flex items-start gap-3 text-[--simply-beige]/90"
                                >
                                    <CheckCircle className="mt-1 size-5 shrink-0 text-brand-primary-light" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Coming soon — link to roadmap */}
                <section aria-label="Roadmap" className="py-(--space-section-y)">
                    <div className="container-simply flex flex-col items-center gap-6 text-center">
                        <h2 className="font-display text-h2 font-bold">
                            {/* Reuse roadmap title from foot namespace */}
                            {t('available.title')}
                        </h2>
                        <Link
                            href="/foot"
                            className={cn(
                                buttonVariants({ variant: 'outline', size: 'lg' }),
                                'min-h-11 border-brand-primary px-6 text-brand-primary hover:bg-brand-primary/10',
                            )}
                        >
                            <ArrowRight data-icon="inline-start" className="mr-2 size-4" />
                            {t('ctaCta')}
                        </Link>
                    </div>
                </section>

                {/* Feedback */}
                <section
                    aria-label={t('feedback.title')}
                    className="bg-muted/50 py-(--space-section-y)"
                >
                    <div className="container-simply">
                        <h2 className="font-display text-h2 font-bold">{t('feedback.title')}</h2>
                        <ul className="mt-(--space-element) grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {feedbackItems.map((item) => (
                                <li key={item} className="text-body-fluid flex items-start gap-3">
                                    <CheckCircle className="mt-1 size-5 shrink-0 text-brand-primary" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Warning */}
                <section aria-label={t('warning.title')} className="py-(--space-section-y)">
                    <div className="container-simply">
                        <Card className="border-orange-300 bg-orange-50 ring-orange-300">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 font-display text-h4">
                                    <AlertTriangle className="size-6 shrink-0 text-orange-600" />
                                    <span className="text-orange-900">{t('warning.title')}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-body-fluid leading-relaxed text-orange-800">
                                    {t('warning.text')}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* CTA */}
                <section
                    aria-label={t('ctaTitle')}
                    className="bg-[--brand-surface-dark] py-(--space-section-y)"
                >
                    <div className="container-simply flex flex-col items-center gap-6 text-center">
                        <h2 className="font-display text-h2 font-bold text-[--simply-beige]">
                            {t('ctaTitle')}
                        </h2>
                        <Link
                            href="/foot/contact"
                            className={cn(
                                buttonVariants({ size: 'lg' }),
                                'min-h-11 bg-brand-primary px-8 text-white hover:bg-brand-primary-dark',
                            )}
                        >
                            {t('ctaCta')}
                            <ArrowRight data-icon="inline-end" className="ml-2 size-4" />
                        </Link>
                    </div>
                </section>
            </main>
        </BrandProvider>
    );
}
