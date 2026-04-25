'use client';

import { ExternalLink, MessageCircle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SimoMascot } from '@/components/features/foot/SimoMascot';
import { BRAND_CONTACT } from '@/config/site';
import { Link } from '@/i18n/navigation';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shadcn/dialog';

const WHATSAPP_GREEN = '#25D366';

interface SimmoDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

/**
 * Dialog "Discuter avec Simmo". Aujourd'hui : présentation de Simmo + 2
 * raccourcis utiles (FAQ, WhatsApp). Demain : intégrer un vrai widget chat
 * IA en remplaçant le corps du `DialogContent`.
 *
 * TODO(simmo): brancher le chat IA Simmo (provider + UI conversation)
 * quand le backend sera prêt. Garder le fallback "ressources utiles" pour
 * la dégradation gracieuse côté `motion-reduce` ou indisponibilité.
 */
export function SimmoDialog({ open, onOpenChange }: SimmoDialogProps) {
    const t = useTranslations('Contact.simmoDialog');
    const tCommon = useTranslations('Common');
    const tWhatsApp = useTranslations('Contact.whatsapp');
    const contact = BRAND_CONTACT.foot;

    const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
        tWhatsApp('prefilledMessage'),
    )}`;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-story-forest text-secondary-50 border-0 sm:max-w-md">
                <DialogHeader>
                    <div className="flex flex-col items-center gap-4 text-center">
                        <SimoMascot
                            alt={tCommon('simoAlt')}
                            bubble={t('bubble')}
                            sizeClassName="size-32"
                            bubbleClassName="bg-secondary-50 text-story-ink"
                            staticPose
                        />
                        <DialogTitle className="font-display text-secondary-50 text-xl font-bold">
                            {t('title')}
                        </DialogTitle>
                        <DialogDescription className="text-secondary-50/75 text-sm leading-relaxed">
                            {t('body')}
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <DialogFooter className="mt-2 flex flex-col gap-2 sm:flex-col">
                    <Link
                        href="/foot/faq"
                        onClick={() => onOpenChange(false)}
                        className="bg-secondary-50 text-story-ink hover:bg-secondary-50/95 focus-visible:ring-secondary-50 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none"
                    >
                        <ExternalLink className="size-4" aria-hidden />
                        {t('actions.faq')}
                    </Link>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => onOpenChange(false)}
                        className="border-secondary-50/30 text-secondary-50 hover:border-secondary-50/60 hover:bg-secondary-50/10 focus-visible:ring-secondary-50 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border bg-transparent px-5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:outline-none"
                    >
                        <MessageCircle
                            className="size-4"
                            aria-hidden
                            style={{ color: WHATSAPP_GREEN }}
                        />
                        {t('actions.whatsapp')}
                    </a>
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="text-secondary-50/60 hover:text-secondary-50 focus-visible:ring-secondary-50/40 inline-flex min-h-11 items-center justify-center gap-1 rounded-full text-xs font-semibold focus-visible:ring-2 focus-visible:outline-none"
                        >
                            <X className="size-3.5" aria-hidden />
                            {t('actions.close')}
                        </button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
