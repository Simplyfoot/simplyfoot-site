'use client';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/input';

interface FaqSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export function FaqSearch({ value, onChange }: FaqSearchProps) {
    const t = useTranslations('foot.faqPage');

    return (
        <div className="relative w-full">
            <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
            />
            <Input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="min-h-11 pl-10"
            />
        </div>
    );
}
