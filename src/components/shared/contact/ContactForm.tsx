'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { type Control, type FieldValues, type Path, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
    CONTACT_COMMON_FIELDS_AFTER,
    CONTACT_COMMON_FIELDS_BEFORE,
    CONTACT_TOPICS,
    type ContactField,
    type ContactTopic,
    getAllFieldNames,
    getTopicConfig,
} from '@/config/contact.config';
import { contactSchema } from '@/helpers/contact.helpers';
import { Button } from '@/shadcn/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shadcn/form';
import { Input } from '@/shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/select';
import { Textarea } from '@/shadcn/textarea';

import type { BrandSlug } from '~types/brand.types';

interface ContactFormProps {
    brand: BrandSlug;
}

// Type "plat" pour le state RHF : tous les champs co-existent côté UI.
// Le schéma Zod (discriminated union) valide la variante adéquate selon `topic`.
type ContactFormValues = {
    brand: BrandSlug;
    topic: ContactTopic;
    website: string;
} & Record<string, string>;

function buildDefaultValues(brand: BrandSlug): ContactFormValues {
    const values: Record<string, string> = {};
    for (const name of getAllFieldNames()) {
        values[name] = '';
    }

    return {
        brand,
        topic: 'request-demo',
        website: '',
        ...values,
        // Les selects exigent une valeur valide dès le mount pour passer la validation.
        clubSize: '1-50',
    };
}

type ErrorTranslator = ReturnType<typeof useTranslations<'Contact.form'>>;

function buildLocalizedErrorMap(
    t: ErrorTranslator,
): NonNullable<Parameters<typeof z.config>[0]>['localeError'] {
    return (issue) => {
        const input = issue.input;
        const isEmpty = input === undefined || input === null || input === '';

        if (isEmpty) {
            return { message: t('errors.required') };
        }

        switch (issue.code) {
            case 'too_small': {
                const minimum = Number(issue.minimum);
                return { message: t('errors.tooShort', { min: minimum }) };
            }
            case 'too_big': {
                const maximum = Number(issue.maximum);
                return { message: t('errors.tooLong', { max: maximum }) };
            }
            case 'invalid_format': {
                if (issue.format === 'email') {
                    return { message: t('errors.email') };
                }
                if (issue.format === 'url') {
                    return { message: t('errors.url') };
                }
                return { message: t('errors.invalid') };
            }
            default:
                return { message: t('errors.invalid') };
        }
    };
}

interface ContactFieldRendererProps<TValues extends FieldValues> {
    field: ContactField;
    control: Control<TValues>;
    t: ErrorTranslator;
}

function ContactFieldRenderer<TValues extends FieldValues>({
    field,
    control,
    t,
}: ContactFieldRendererProps<TValues>) {
    const labelKey = `fields.${field.i18nKey}.label` as const;
    const placeholderKey = `fields.${field.i18nKey}.placeholder` as const;
    const helpKey = `fields.${field.i18nKey}.help` as const;

    const placeholder = t.has(placeholderKey) ? t(placeholderKey) : undefined;
    const helpText = t.has(helpKey) ? t(helpKey) : undefined;

    return (
        <FormField
            control={control}
            name={field.name as Path<TValues>}
            render={({ field: controllerField }) => (
                <FormItem>
                    <FormLabel>
                        {t(labelKey)}
                        {field.required && (
                            <>
                                {' '}
                                <span aria-hidden="true">*</span>
                            </>
                        )}
                    </FormLabel>
                    <FormControl>
                        {renderControl({
                            field,
                            controllerValue: (controllerField.value ?? '') as string,
                            onChange: controllerField.onChange,
                            onBlur: controllerField.onBlur,
                            name: controllerField.name,
                            ref: controllerField.ref,
                            placeholder,
                            t,
                        })}
                    </FormControl>
                    {helpText && <FormDescription>{helpText}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

function pickInputType(kindType: string): 'email' | 'tel' | 'url' | 'text' {
    if (kindType === 'email') {
        return 'email';
    }
    if (kindType === 'tel') {
        return 'tel';
    }
    if (kindType === 'url') {
        return 'url';
    }
    return 'text';
}

interface RenderControlArgs {
    field: ContactField;
    controllerValue: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    name: string;
    ref: React.Ref<HTMLElement>;
    placeholder: string | undefined;
    t: ErrorTranslator;
}

function renderControl({
    field,
    controllerValue,
    onChange,
    onBlur,
    name,
    ref,
    placeholder,
    t,
}: RenderControlArgs) {
    const { kind } = field;

    if (kind.type === 'textarea') {
        return (
            <Textarea
                rows={kind.rows ?? 6}
                placeholder={placeholder}
                value={controllerValue}
                onChange={(event) => onChange(event.target.value)}
                onBlur={onBlur}
                name={name}
                ref={ref as React.Ref<HTMLTextAreaElement>}
                className="bg-white dark:bg-zinc-900"
            />
        );
    }

    if (kind.type === 'select') {
        return (
            <Select value={controllerValue} onValueChange={onChange}>
                <SelectTrigger className="w-full bg-white dark:bg-zinc-900">
                    <SelectValue
                        placeholder={placeholder ?? t(`fields.${field.i18nKey}.placeholder`)}
                    />
                </SelectTrigger>
                <SelectContent>
                    {kind.options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {t(`fields.${field.i18nKey}.options.${option}`)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        );
    }

    const inputType = pickInputType(kind.type);

    return (
        <Input
            type={inputType}
            placeholder={placeholder}
            autoComplete={field.autoComplete}
            value={controllerValue}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
            name={name}
            ref={ref as React.Ref<HTMLInputElement>}
            className="bg-white dark:bg-zinc-900"
        />
    );
}

interface FieldGridProps<TValues extends FieldValues> {
    fields: ReadonlyArray<ContactField>;
    control: Control<TValues>;
    t: ErrorTranslator;
}

function FieldGrid<TValues extends FieldValues>({ fields, control, t }: FieldGridProps<TValues>) {
    if (fields.length === 0) {
        return null;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
                <div key={field.name} className={field.colSpan === 2 ? 'md:col-span-2' : undefined}>
                    <ContactFieldRenderer field={field} control={control} t={t} />
                </div>
            ))}
        </div>
    );
}

export function ContactForm({ brand }: ContactFormProps) {
    const t = useTranslations('Contact.form');
    const [submitting, setSubmitting] = useState(false);

    const resolver = useMemo(() => {
        z.config({ localeError: buildLocalizedErrorMap(t) });
        // Cast nécessaire : `FormValues` est un type plat alors que le schéma
        // attend une variante précise selon `topic` (discriminated union).
        return zodResolver(contactSchema) as never;
    }, [t]);

    const form = useForm<ContactFormValues>({
        resolver,
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: buildDefaultValues(brand),
    });

    const topic = form.watch('topic');
    const topicConfig = getTopicConfig(topic);
    const excludedCommon = useMemo(
        () => new Set(topicConfig.excludeCommonFields ?? []),
        [topicConfig],
    );
    const commonFieldsBefore = useMemo(
        () => CONTACT_COMMON_FIELDS_BEFORE.filter((field) => !excludedCommon.has(field.name)),
        [excludedCommon],
    );
    const commonFieldsAfter = useMemo(
        () => CONTACT_COMMON_FIELDS_AFTER.filter((field) => !excludedCommon.has(field.name)),
        [excludedCommon],
    );

    async function onSubmit(values: ContactFormValues) {
        setSubmitting(true);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });
            if (!response.ok) {
                throw new Error('send_failed');
            }
            toast.success(t('toastSuccessTitle'), { description: t('toastSuccessDescription') });
            form.reset(buildDefaultValues(brand));
        } catch {
            toast.error(t('toastErrorTitle'), { description: t('toastErrorDescription') });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6"
                noValidate
                aria-describedby="contact-legal-notice"
            >
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {t('topicLabel')} <span aria-hidden="true">*</span>
                            </FormLabel>
                            <Select
                                value={field.value}
                                onValueChange={(value) => field.onChange(value as ContactTopic)}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full bg-white dark:bg-zinc-900">
                                        <SelectValue placeholder={t('topicPlaceholder')} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {CONTACT_TOPICS.map((value) => (
                                        <SelectItem key={value} value={value}>
                                            {t(`topics.${value}`)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FieldGrid fields={commonFieldsBefore} control={form.control} t={t} />
                <FieldGrid fields={topicConfig.fields} control={form.control} t={t} />
                <FieldGrid fields={commonFieldsAfter} control={form.control} t={t} />

                {/* Honeypot anti-spam : caché aux humains et au lecteur d'écran. */}
                <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="contact-website">Ne pas remplir</label>
                    <input
                        id="contact-website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...form.register('website')}
                    />
                </div>

                <Button type="submit" disabled={submitting} className="justify-self-start">
                    {submitting && (
                        <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
                    )}
                    {submitting ? t('submitting') : t('submit')}
                </Button>
            </form>
        </Form>
    );
}
