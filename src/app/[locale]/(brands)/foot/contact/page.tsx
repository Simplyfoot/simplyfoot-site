import { ExternalLink, Globe, Mail, MessageCircle, Phone } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ContactForm } from '@/components/brands/foot/ContactForm';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { brandConfigs } from '@/lib/brand/config';
import { BrandProvider } from '@/lib/brand/context';
import { Link } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils';

const brand = brandConfigs.foot;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('foot.contact');
    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function ContactPage() {
    const t = await getTranslations('foot.contact');

    return (
        <BrandProvider config={brand}>
            <main>
                {/* Hero */}
                <section
                    aria-label={t('title')}
                    className="bg-[--brand-surface-dark] py-(--space-section-y)"
                >
                    <div className="container-simply flex flex-col items-center gap-4 text-center">
                        <h1 className="font-display text-display leading-tight font-bold text-[--simply-beige]">
                            {t('title')}
                        </h1>
                        <p className="text-body-fluid max-w-xl leading-relaxed text-[--simply-beige]/80">
                            {t('subtitle')}
                        </p>
                    </div>
                </section>

                {/* Content: form + info */}
                <section aria-label={t('form.title')} className="py-(--space-section-y)">
                    <div className="container-simply grid grid-cols-1 gap-(--space-block) lg:grid-cols-3">
                        {/* Form — left 2 cols */}
                        <div className="lg:col-span-2">
                            <ContactForm />
                        </div>

                        {/* Info cards — right col */}
                        <div className="flex flex-col gap-(--space-element)">
                            {/* Direct contact */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-display text-h4">
                                        {t('info.directContact')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3">
                                    <a
                                        href="mailto:contact@simplyfoot.fr"
                                        className="text-body-fluid flex min-h-11 items-center gap-3 text-brand-primary transition-colors hover:text-brand-primary-dark"
                                    >
                                        <Mail className="size-5 shrink-0" />
                                        <span>contact@simplyfoot.fr</span>
                                    </a>
                                    <Separator />
                                    <a
                                        href="tel:+33699948866"
                                        className="text-body-fluid flex min-h-11 items-center gap-3 text-brand-primary transition-colors hover:text-brand-primary-dark"
                                    >
                                        <Phone className="size-5 shrink-0" />
                                        <span>06 99 94 88 66</span>
                                    </a>
                                </CardContent>
                            </Card>

                            {/* Quick answer — Simmo */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-display text-h4">
                                        {t('info.quickAnswer')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-4">
                                    <p className="text-small-fluid text-muted-foreground">
                                        {t('info.quickAnswerText')}
                                    </p>
                                    {/* Simmo chatbot link points to homepage — full chatbot wiring ships with the Simmo IA backend (not in scope for pilot phase). */}
                                    <Link
                                        href="/foot"
                                        className={cn(
                                            buttonVariants({ variant: 'outline', size: 'lg' }),
                                            'min-h-11 gap-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10',
                                        )}
                                    >
                                        <MessageCircle className="size-4" />
                                        {t('info.chatSimmo')}
                                    </Link>
                                </CardContent>
                            </Card>

                            {/* Social */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-display text-h4">
                                        {t('info.social')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-4">
                                        {/* Public social accounts don't exist yet — links are pilot-phase placeholders, swapped when the brand launches official handles. */}
                                        <a
                                            href="https://instagram.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                            aria-label="Instagram"
                                        >
                                            <Globe className="size-5" />
                                        </a>
                                        <a
                                            href="https://facebook.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                            aria-label="Facebook"
                                        >
                                            <ExternalLink className="size-5" />
                                        </a>
                                        <a
                                            href="https://twitter.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                            aria-label="Twitter"
                                        >
                                            <MessageCircle className="size-5" />
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
        </BrandProvider>
    );
}
