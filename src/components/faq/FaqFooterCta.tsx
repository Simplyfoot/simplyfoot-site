import { Mail, MessageCircle, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { Button } from '@/shadcn/button';

/**
 * "Pas trouvé votre réponse ?" footer. Links to email + phone (hard contact
 * info) and offers the Simmo chatbot shortcut. Simmo isn't wired yet, so
 * the shortcut currently redirects to /foot/contact — visitor still reaches
 * the team, no dead-end.
 */
export function FaqFooterCta() {
    const t = useTranslations('Faq.footerCta');

    return (
        <section
            aria-label={t('heading')}
            className="border-border bg-card mt-8 flex flex-col gap-4 rounded-2xl border p-6 md:flex-row md:items-center md:justify-between md:p-8"
        >
            <div className="flex flex-col gap-2">
                <h2 className="font-display text-foreground text-xl font-semibold">
                    {t('heading')}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{t('description')}</p>
                <ul className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                    <li>
                        <a
                            href="mailto:contact@simplyfoot.fr"
                            className="text-primary hover:text-primary/80 focus-visible:ring-primary inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline focus-visible:rounded focus-visible:ring-2 focus-visible:outline-none"
                        >
                            <Mail className="size-4" aria-hidden />
                            contact@simplyfoot.fr
                        </a>
                    </li>
                    <li>
                        <a
                            href="tel:+33699948866"
                            className="text-primary hover:text-primary/80 focus-visible:ring-primary inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline focus-visible:rounded focus-visible:ring-2 focus-visible:outline-none"
                        >
                            <Phone className="size-4" aria-hidden />
                            06 99 94 88 66
                        </a>
                    </li>
                </ul>
            </div>

            <Button asChild size="lg" className="shrink-0">
                <Link href="/foot/contact">
                    <MessageCircle className="mr-2 size-4" aria-hidden />
                    {t('askSimmo')} 🐙
                </Link>
            </Button>
        </section>
    );
}
