'use client';

import { ChevronDown, Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';
import { type AppLocale } from '@/i18n/routing';
import { Button } from '@/shadcn/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/shadcn/dropdown-menu';

const locales = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
] as const;

export function LanguageSwitcher() {
    const t = useTranslations('Header.languageSwitcher');
    const router = useRouter();
    const pathname = usePathname();
    const activeLocale = useLocale();
    const [isPending, startTransition] = useTransition();

    const handleChange = (next: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: next as AppLocale });
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    aria-label={t('label')}
                    disabled={isPending}
                    className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:ring-primary-foreground/60 inline-flex items-center gap-1.5 leading-none"
                >
                    <Globe className="size-4 shrink-0" aria-hidden="true" />
                    <span className="font-medium leading-none">{activeLocale.toUpperCase()}</span>
                    <ChevronDown className="size-3 shrink-0 opacity-70" aria-hidden="true" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-36">
                <DropdownMenuRadioGroup value={activeLocale} onValueChange={handleChange}>
                    {locales.map((l) => (
                        <DropdownMenuRadioItem key={l.code} value={l.code} className="pr-3">
                            <span>{l.name}</span>
                            <span aria-hidden="true" className="ml-auto text-base leading-none">
                                {l.flag}
                            </span>
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
