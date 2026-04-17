'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    clubName: z.string().optional(),
    role: z.string().optional(),
    clubSize: z.string().optional(),
    subject: z.string().min(1),
    message: z.string().min(20),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ROLE_KEYS = ['president', 'coach', 'player', 'parent', 'volunteer', 'other'] as const;
const SIZE_KEYS = ['small', 'medium', 'large', 'xlarge', 'xxlarge'] as const;
const SUBJECT_KEYS = ['pilot', 'pricing', 'demo', 'bug', 'suggestion', 'other'] as const;

export function ContactForm() {
    const t = useTranslations('foot.contact');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            clubName: '',
            role: '',
            clubSize: '',
            subject: '',
            message: '',
        },
    });

    function onSubmit(data: ContactFormData) {
        // Email backend is intentionally not wired yet — submissions are logged and the
        // success toast is shown. Pilot phase runs without automated email capture;
        // integration with Resend/SendGrid happens post-pilot when volume justifies it.
        console.warn('[ContactForm] Form submitted:', data);
        toast.success(t('form.success'));
        reset();
    }

    const selectClassName = cn(
        'h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none transition-colors',
        'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
        'md:text-sm dark:bg-input/30',
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {/* Name + Email */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-name">{t('form.name')}</Label>
                    <Input
                        id="contact-name"
                        className="min-h-9"
                        aria-invalid={errors.name ? true : undefined}
                        {...register('name')}
                    />
                    {errors.name ? (
                        <p className="text-caption text-destructive">
                            {t('form.validation.nameRequired')}
                        </p>
                    ) : null}
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-email">{t('form.email')}</Label>
                    <Input
                        id="contact-email"
                        type="email"
                        className="min-h-9"
                        aria-invalid={errors.email ? true : undefined}
                        {...register('email')}
                    />
                    {errors.email ? (
                        <p className="text-caption text-destructive">
                            {t('form.validation.emailInvalid')}
                        </p>
                    ) : null}
                </div>
            </div>

            {/* Phone + Club Name */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-phone">{t('form.phone')}</Label>
                    <Input
                        id="contact-phone"
                        type="tel"
                        className="min-h-9"
                        {...register('phone')}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-clubName">{t('form.clubName')}</Label>
                    <Input id="contact-clubName" className="min-h-9" {...register('clubName')} />
                </div>
            </div>

            {/* Role + Club Size */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-role">{t('form.role')}</Label>
                    <select id="contact-role" className={selectClassName} {...register('role')}>
                        <option value="" />
                        {ROLE_KEYS.map((key) => (
                            <option key={key} value={key}>
                                {t(`form.roles.${key}`)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-clubSize">{t('form.clubSize')}</Label>
                    <select
                        id="contact-clubSize"
                        className={selectClassName}
                        {...register('clubSize')}
                    >
                        <option value="" />
                        {SIZE_KEYS.map((key) => (
                            <option key={key} value={key}>
                                {t(`form.sizes.${key}`)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="contact-subject">{t('form.subject')}</Label>
                <select
                    id="contact-subject"
                    className={selectClassName}
                    aria-invalid={errors.subject ? true : undefined}
                    {...register('subject')}
                >
                    <option value="" />
                    {SUBJECT_KEYS.map((key) => (
                        <option key={key} value={key}>
                            {t(`form.subjects.${key}`)}
                        </option>
                    ))}
                </select>
                {errors.subject ? (
                    <p className="text-caption text-destructive">
                        {t('form.validation.subjectRequired')}
                    </p>
                ) : null}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="contact-message">{t('form.message')}</Label>
                <Textarea
                    id="contact-message"
                    rows={5}
                    className="min-h-28"
                    aria-invalid={errors.message ? true : undefined}
                    {...register('message')}
                />
                {errors.message ? (
                    <p className="text-caption text-destructive">
                        {t('form.validation.messageTooShort')}
                    </p>
                ) : null}
            </div>

            {/* Submit */}
            <Button
                type="submit"
                disabled={isSubmitting}
                className="min-h-11 w-full bg-brand-primary text-white hover:bg-brand-primary-dark md:w-auto md:self-start"
            >
                {t('form.submit')}
            </Button>
        </form>
    );
}
