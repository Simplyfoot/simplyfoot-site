'use client';

import { useTranslations } from 'next-intl';

import { getDepartmentsForRegion } from '@/content/blog/regions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/select';
import type { FrenchRegion } from '@/types/blog';

interface DepartmentSelectProps {
    region: FrenchRegion | null;
    value: string | null;
    onChange: (code: string | null) => void;
    className?: string;
}

const ALL_VALUE = '__all__';

/**
 * Cascaded department select — only shows departments of the current region.
 * Disabled when no region is selected.
 */
export function DepartmentSelect({ region, value, onChange, className }: DepartmentSelectProps) {
    const t = useTranslations('Blog.filters');
    const options = region ? getDepartmentsForRegion(region) : [];
    const disabled = !region;

    return (
        <Select
            value={value ?? ALL_VALUE}
            onValueChange={(v) => onChange(v === ALL_VALUE ? null : v)}
            disabled={disabled}
        >
            <SelectTrigger className={className} aria-label={t('department')}>
                <SelectValue placeholder={disabled ? t('pickRegionFirst') : t('department')} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={ALL_VALUE}>{t('allDepartments')}</SelectItem>
                {options.map((d) => (
                    <SelectItem key={d.code} value={d.code}>
                        {d.code} — {d.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
