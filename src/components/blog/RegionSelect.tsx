'use client';

import { useTranslations } from 'next-intl';

import { REGION_LABELS } from '@/content/blog/regions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/select';
import type { FrenchRegion } from '@/types/blog';

const REGION_OPTIONS: readonly FrenchRegion[] = [
    'idf',
    'hdf',
    'ge',
    'bfc',
    'pdl',
    'bre',
    'cvl',
    'nor',
    'ara',
    'paca',
    'occ',
    'naq',
    'cor',
];

interface RegionSelectProps {
    value: FrenchRegion | null;
    onChange: (value: FrenchRegion | null) => void;
    className?: string;
}

const ALL_VALUE = '__all__';

export function RegionSelect({ value, onChange, className }: RegionSelectProps) {
    const t = useTranslations('Blog.filters');

    return (
        <Select
            value={value ?? ALL_VALUE}
            onValueChange={(v) => onChange(v === ALL_VALUE ? null : (v as FrenchRegion))}
        >
            <SelectTrigger className={className} aria-label={t('region')}>
                <SelectValue placeholder={t('region')} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={ALL_VALUE}>{t('allRegions')}</SelectItem>
                {REGION_OPTIONS.map((r) => (
                    <SelectItem key={r} value={r}>
                        {REGION_LABELS[r]}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
