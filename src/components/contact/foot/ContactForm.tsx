'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { BRAND_CONTACT } from '@/config/site';
import {
    buildContactSchema,
    CLUB_SIZE_VALUES,
    type ContactClubSize,
    type ContactFormValues,
    type ContactRole,
    type ContactSubject,
    ROLE_VALUES,
    SUBJECT_VALUES,
} from '@/lib/contact/contactSchema';
import { cn } from '@/lib/utils';

/**
 * Formulaire de contact détaillé. RHF + Zod (schéma localisé construit à
 * partir de `buildContactSchema`). En P1 le handler simule l'envoi : log
 * dev + toast Sonner. Brancher l'API quand le backend sera prêt.
 *
 * TODO(api): POST { values } vers /api/contact (Resend / SendGrid /
 * webhook interne). Sur erreur réseau, afficher le toast d'erreur et
 * laisser le formulaire rempli pour permettre une nouvelle tentative.
 */
export function ContactForm() {
    const t = useTranslations('Contact.form');
    const tFields = useTranslations('Contact.form.fields');
    const tErrors = useTranslations('Contact.form.errors');
    const tToast = useTranslations('Contact.form.toast');
    const tRoles = useTranslations('Contact.form.fields.role.options');
    const tSizes = useTranslations('Contact.form.fields.clubSize.options');
    const tSubjects = useTranslations('Contact.form.fields.subject.options');

    const formId = useId();
    const fieldId = (name: string) => `${formId}-${name}`;

    const schema = buildContactSchema({
        nameRequired: tErrors('name'),
        emailRequired: tErrors('emailRequired'),
        emailInvalid: tErrors('emailInvalid'),
        messageTooShort: tErrors('message'),
        consentRequired: tErrors('consent'),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            clubName: '',
            role: 'president',
            clubSize: '101-250',
            subject: 'pilote',
            message: '',
            consent: false as unknown as true,
            website: '',
        },
    });

    const onSubmit = handleSubmit(async (values) => {
        if (values.website && values.website.length > 0) {
            // Soumission honeypot — silencieux, succès simulé.
            toast.success(tToast('successTitle'), { description: tToast('successDescription') });
            reset();
            return;
        }

        // TODO(api): remplacer par fetch('/api/contact', { method: 'POST', body: JSON.stringify(values) })
        // et brancher la gestion d'erreur (toast.error sur 4xx/5xx).
        await new Promise((resolve) => setTimeout(resolve, 600));

        if (process.env.NODE_ENV === 'development') {
            console.warn('[contact] submitted (stub)', values);
        }

        toast.success(tToast('successTitle'), { description: tToast('successDescription') });
        reset();
    });

    return (
        <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-3">
                <h2
                    id="contact-form-heading"
                    className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] font-bold tracking-tight text-balance"
                >
                    {t('title')}
                </h2>
                <p className="text-story-ink/70 max-w-[60ch] text-base leading-relaxed">
                    {t('subtitle')}
                </p>
                <p className="text-story-ink/55 text-xs">{t('requiredHint')}</p>
            </header>

            <form
                onSubmit={onSubmit}
                noValidate
                className="bg-story-cream-light flex flex-col gap-5 rounded-3xl p-6 shadow-[0_2px_12px_-6px_color-mix(in_srgb,var(--story-ink)_25%,transparent)] md:p-8"
            >
                {/* Honeypot */}
                <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="pointer-events-none absolute -left-2499.75 h-0 w-0 opacity-0"
                    {...register('website')}
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field
                        id={fieldId('name')}
                        label={tFields('name.label')}
                        required
                        error={errors.name?.message}
                    >
                        <input
                            id={fieldId('name')}
                            type="text"
                            autoComplete="name"
                            placeholder={tFields('name.placeholder')}
                            aria-invalid={errors.name ? true : undefined}
                            aria-describedby={errors.name ? `${fieldId('name')}-error` : undefined}
                            className={inputClass(Boolean(errors.name))}
                            {...register('name')}
                        />
                    </Field>

                    <Field
                        id={fieldId('email')}
                        label={tFields('email.label')}
                        required
                        error={errors.email?.message}
                    >
                        <input
                            id={fieldId('email')}
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            placeholder={tFields('email.placeholder')}
                            aria-invalid={errors.email ? true : undefined}
                            aria-describedby={
                                errors.email ? `${fieldId('email')}-error` : undefined
                            }
                            className={inputClass(Boolean(errors.email))}
                            {...register('email')}
                        />
                    </Field>

                    <Field
                        id={fieldId('phone')}
                        label={tFields('phone.label')}
                        hint={tFields('phone.hint')}
                    >
                        <input
                            id={fieldId('phone')}
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder={tFields('phone.placeholder')}
                            className={inputClass(false)}
                            {...register('phone')}
                        />
                    </Field>

                    <Field
                        id={fieldId('clubName')}
                        label={tFields('clubName.label')}
                        hint={tFields('clubName.hint')}
                    >
                        <input
                            id={fieldId('clubName')}
                            type="text"
                            autoComplete="organization"
                            placeholder={tFields('clubName.placeholder')}
                            className={inputClass(false)}
                            {...register('clubName')}
                        />
                    </Field>

                    <Field id={fieldId('role')} label={tFields('role.label')} required>
                        <select
                            id={fieldId('role')}
                            className={selectClass(false)}
                            {...register('role')}
                        >
                            {ROLE_VALUES.map((value) => (
                                <option key={value} value={value}>
                                    {tRoles(value as ContactRole)}
                                </option>
                            ))}
                        </select>
                    </Field>

                    <Field id={fieldId('clubSize')} label={tFields('clubSize.label')} required>
                        <select
                            id={fieldId('clubSize')}
                            className={selectClass(false)}
                            {...register('clubSize')}
                        >
                            {CLUB_SIZE_VALUES.map((value) => (
                                <option key={value} value={value}>
                                    {tSizes(value as ContactClubSize)}
                                </option>
                            ))}
                        </select>
                    </Field>
                </div>

                <Field id={fieldId('subject')} label={tFields('subject.label')} required>
                    <select
                        id={fieldId('subject')}
                        className={selectClass(false)}
                        {...register('subject')}
                    >
                        {SUBJECT_VALUES.map((value) => (
                            <option key={value} value={value}>
                                {tSubjects(value as ContactSubject)}
                            </option>
                        ))}
                    </select>
                </Field>

                <Field
                    id={fieldId('message')}
                    label={tFields('message.label')}
                    hint={tFields('message.hint')}
                    required
                    error={errors.message?.message}
                >
                    <textarea
                        id={fieldId('message')}
                        rows={6}
                        placeholder={tFields('message.placeholder')}
                        aria-invalid={errors.message ? true : undefined}
                        aria-describedby={
                            errors.message ? `${fieldId('message')}-error` : undefined
                        }
                        className={cn(inputClass(Boolean(errors.message)), 'min-h-35 resize-y')}
                        {...register('message')}
                    />
                </Field>

                <div className="flex items-start gap-3">
                    <input
                        id={fieldId('consent')}
                        type="checkbox"
                        aria-invalid={errors.consent ? true : undefined}
                        aria-describedby={
                            errors.consent ? `${fieldId('consent')}-error` : undefined
                        }
                        className="border-story-ink/30 text-primary focus-visible:ring-primary mt-0.5 size-5 rounded border bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                        {...register('consent')}
                    />
                    <label
                        htmlFor={fieldId('consent')}
                        className="text-story-ink/80 text-sm leading-relaxed"
                    >
                        {tFields('consent.label')}{' '}
                        <span aria-hidden className="text-primary">
                            *
                        </span>
                    </label>
                </div>
                {errors.consent && (
                    <p
                        id={`${fieldId('consent')}-error`}
                        role="alert"
                        className="text-error-700 -mt-3 text-xs font-medium"
                    >
                        {errors.consent.message}
                    </p>
                )}

                <div className="flex justify-stretch sm:justify-start">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-base font-semibold shadow-[0_10px_30px_-12px_color-mix(in_srgb,var(--primary)_60%,transparent)] transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="size-4 animate-spin" aria-hidden />
                                {t('submit.loading')}
                            </>
                        ) : (
                            <>
                                <Send className="size-4" aria-hidden />
                                {t('submit.label')}
                            </>
                        )}
                    </button>
                </div>

                <p className="text-story-ink/45 text-xs">
                    {tToast('errorDescription', { email: BRAND_CONTACT.foot.email })}
                </p>
            </form>
        </div>
    );
}

interface FieldProps {
    id: string;
    label: string;
    required?: boolean;
    hint?: string;
    error?: string;
    children: React.ReactNode;
}

function Field({ id, label, required = false, hint, error, children }: FieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-story-ink/85 text-sm font-semibold">
                {label}{' '}
                {required && (
                    <span aria-hidden className="text-primary">
                        *
                    </span>
                )}
                {hint && <span className="text-story-ink/45 ml-1 font-normal">({hint})</span>}
            </label>
            {children}
            {error && (
                <p id={`${id}-error`} role="alert" className="text-error-700 text-xs font-medium">
                    {error}
                </p>
            )}
        </div>
    );
}

function inputClass(hasError: boolean): string {
    return cn(
        'min-h-12 rounded-xl border bg-white px-4 py-3 text-sm text-story-ink placeholder:text-story-ink/40 transition-colors',
        'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        hasError
            ? 'border-error-500 focus-visible:ring-error-500'
            : 'border-story-ink/15 focus-visible:ring-primary focus-visible:border-primary',
    );
}

function selectClass(hasError: boolean): string {
    // Native chevron conservée — comportement OS/clavier connu, accessible
    // par défaut, pas de SVG inline à maintenir. Padding-right léger pour
    // équilibrer visuellement avec les inputs texte.
    return cn(inputClass(hasError), 'pr-3');
}
