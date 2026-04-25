'use client';

import { Check, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { BRAND_CONTACT } from '@/config/site';

const WHATSAPP_GREEN = '#25D366';

/**
 * Section dédiée hotline WhatsApp. Mise en avant explicite (canal nouveau,
 * gros budget conversion). Layout deux colonnes desktop, empilé mobile :
 * pitch + CTA à gauche, mockup conversation stylisé à droite.
 *
 * Le mockup est composé de divs Tailwind — pas d'image, pas de SVG : c'est
 * adressable par le designer, accessible (texte dans le DOM, pas dans une
 * image) et responsive natif.
 */
export function ContactWhatsApp() {
    const t = useTranslations('Contact.whatsapp');
    const contact = BRAND_CONTACT.foot;

    const url = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(t('prefilledMessage'))}`;

    return (
        <section
            aria-labelledby="contact-whatsapp-heading"
            className="bg-primary text-secondary-50 relative isolate w-full overflow-hidden"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 [background-image:radial-gradient(color-mix(in_srgb,var(--secondary-50)_25%,transparent)_1px,transparent_1px)] [background-size:24px_24px] opacity-25"
            />

            <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1.05fr_1fr] md:py-24">
                <div className="flex flex-col gap-6">
                    <span
                        className="inline-flex w-max items-center gap-2 rounded-full px-3 py-1 text-[0.65rem] font-bold tracking-[0.2em] uppercase"
                        style={{
                            backgroundColor: WHATSAPP_GREEN,
                            color: '#FFFFFF',
                        }}
                    >
                        <MessageCircle className="size-3.5" aria-hidden />
                        {t('badge')}
                    </span>

                    <h2
                        id="contact-whatsapp-heading"
                        className="font-display max-w-[22ch] text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.05] font-bold tracking-tight text-balance"
                    >
                        {t('heading')}
                    </h2>
                    <p className="text-secondary-50/85 max-w-[58ch] text-base leading-relaxed md:text-lg">
                        {t('subtitle')}
                    </p>

                    <div>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-secondary-50 text-story-ink hover:bg-secondary-50/95 focus-visible:ring-secondary-50 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold shadow-[0_12px_30px_-12px_rgba(0,0,0,0.4)] transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none"
                        >
                            <MessageCircle
                                className="size-5"
                                aria-hidden
                                style={{ color: WHATSAPP_GREEN }}
                            />
                            {t('cta')}
                        </a>
                    </div>
                </div>

                <ConversationMockup />
            </div>
        </section>
    );
}

/**
 * Mockup conversation WhatsApp — UI stylisée à la main pour évoquer
 * l'application sans en copier les marques (ce n'est pas un screenshot
 * de l'app WhatsApp). Couleurs cohérentes avec leur identité de marque
 * (vert WhatsApp, fond crème pour l'écran).
 */
function ConversationMockup() {
    const t = useTranslations('Contact.whatsapp.mockup');

    return (
        <div
            aria-hidden
            className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] bg-[#ECE5DD] p-3 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5"
        >
            {/* Barre supérieure WhatsApp */}
            <div
                className="-m-3 mb-3 flex items-center gap-3 px-4 py-3 text-white"
                style={{ backgroundColor: WHATSAPP_GREEN }}
            >
                <div className="font-display flex size-9 items-center justify-center rounded-full bg-white/20 text-base font-bold">
                    SF
                </div>
                <div className="flex flex-col">
                    <p className="text-sm font-semibold">{t('simplyName')}</p>
                    <p className="flex items-center gap-1.5 text-xs text-white/85">
                        <span className="size-1.5 rounded-full bg-white" aria-hidden />
                        {t('online')}
                    </p>
                </div>
            </div>

            {/* Bulles */}
            <div className="flex flex-col gap-3 px-1 pt-1 pb-2">
                <Bubble side="user" message={t('userMessage')} time={t('userTime')} />
                <Bubble side="simply" message={t('simplyMessage')} time={t('simplyTime')} />
            </div>
        </div>
    );
}

function Bubble({
    side,
    message,
    time,
}: {
    side: 'user' | 'simply';
    message: string;
    time: string;
}) {
    const isUser = side === 'user';
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`relative max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug shadow-sm ${
                    isUser
                        ? 'rounded-br-sm bg-[#DCF8C6] text-[#0B141A]'
                        : 'rounded-bl-sm bg-white text-[#0B141A]'
                }`}
            >
                <p>{message}</p>
                <div className="mt-1 flex items-center justify-end gap-1 text-[0.65rem] text-[#667781]">
                    <span>{time}</span>
                    {isUser && <Check className="size-3" aria-hidden />}
                </div>
            </div>
        </div>
    );
}
