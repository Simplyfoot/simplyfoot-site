'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';

interface WaitlistFormProps {
    className?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success';

/**
 * Formulaire d'inscription à la liste prioritaire "innovation revenus".
 * UI uniquement : validation Zod + react-hook-form côté client, simulation
 * d'envoi (pas de backend branché en P1). À remplacer par une vraie
 * intégration (Resend / Loops / API interne) quand le backend sera prêt.
 *
 * Champ honeypot `website` caché pour bloquer les soumissions de bots
 * naïfs ; une vraie intégration ajoutera Turnstile ou hCaptcha côté serveur.
 */
export function WaitlistForm({ className }: WaitlistFormProps) {
    const t = useTranslations('Features.innovation');
    const [status, setStatus] = useState<FormStatus>('idle');

    const schema = z.object({
        email: z.string().min(1, t('errorRequired')).email(t('errorInvalid')),
        website: z.string().max(0).optional(),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: { email: '', website: '' },
    });

    const onSubmit = handleSubmit(async (values) => {
        if (values.website && values.website.length > 0) {
            // Soumission honeypot → on fait mine d'accepter sans rien envoyer.
            setStatus('success');
            reset();
            return;
        }
        setStatus('submitting');
        // Placeholder — remplacer par un fetch vers l'endpoint waitlist.
        await new Promise((resolve) => setTimeout(resolve, 600));
        setStatus('success');
        reset();
    });

    if (status === 'success') {
        return (
            <div
                role="status"
                className={cn(
                    'bg-primary/10 text-foreground border-primary/30 flex items-center gap-3 rounded-2xl border p-5',
                    className,
                )}
            >
                <span className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full">
                    <Check className="size-5" aria-hidden />
                </span>
                <div className="flex flex-col gap-1">
                    <p className="font-display text-foreground text-base font-semibold">
                        {t('successTitle')}
                    </p>
                    <p className="text-muted-foreground text-sm">{t('successBody')}</p>
                </div>
            </div>
        );
    }

    return (
        <form
            onSubmit={onSubmit}
            noValidate
            className={cn('flex flex-col gap-3', className)}
            aria-describedby="waitlist-micro-copy"
        >
            <div className="flex flex-col gap-2 sm:flex-row">
                <label htmlFor="waitlist-email" className="sr-only">
                    {t('emailLabel')}
                </label>
                <input
                    id="waitlist-email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder={t('emailPlaceholder')}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? 'waitlist-email-error' : undefined}
                    className="focus-visible:ring-primary-foreground flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-sm text-white placeholder:text-white/50 focus-visible:ring-2 focus-visible:outline-none"
                    {...register('email')}
                />
                <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
                    {...register('website')}
                />
                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary-foreground inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {status === 'submitting' ? (
                        <Loader2 className="size-4 animate-spin" aria-hidden />
                    ) : (
                        <ArrowRight className="size-4" aria-hidden />
                    )}
                    {t('submitLabel')}
                </button>
            </div>
            {errors.email && (
                <p
                    id="waitlist-email-error"
                    role="alert"
                    className="text-error-300 pl-1 text-xs font-medium"
                >
                    {errors.email.message}
                </p>
            )}
            <p id="waitlist-micro-copy" className="pl-1 text-xs text-white/60">
                {t('microCopy')}
            </p>
        </form>
    );
}
