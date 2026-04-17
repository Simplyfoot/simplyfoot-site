// 232 lines — contains the concurrence comparison data (ROWS, cell renderers,
// desktop table + mobile cards layouts). Splitting further would fragment a
// cohesive unit of comparison logic across 3-4 files for marginal readability gain.
'use client';

import { Check, Star, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

type CellValueKind =
    | 'stars-1'
    | 'stars-2'
    | 'stars-3'
    | 'stars-4'
    | 'stars-5'
    | 'check'
    | 'x'
    | 'coming-soon'
    | 'revenue-highlight'
    | 'partial';

interface CompetitorRow {
    labelKey: string;
    simplyFoot: CellValueKind;
    sportEasy: CellValueKind;
    spond: CellValueKind;
    teamPulse: CellValueKind;
}

const COMPETITORS = ['SimplyFoot', 'SportEasy', 'Spond', 'TeamPulse'] as const;

const ROWS: CompetitorRow[] = [
    {
        labelKey: 'comparison.focusFootball',
        simplyFoot: 'stars-5',
        sportEasy: 'stars-2',
        spond: 'stars-1',
        teamPulse: 'stars-2',
    },
    {
        labelKey: 'comparison.clubManagement',
        simplyFoot: 'stars-4',
        sportEasy: 'stars-3',
        spond: 'stars-1',
        teamPulse: 'stars-2',
    },
    {
        labelKey: 'comparison.multiRoleNative',
        simplyFoot: 'check',
        sportEasy: 'x',
        spond: 'x',
        teamPulse: 'x',
    },
    {
        labelKey: 'comparison.separatedParents',
        simplyFoot: 'check',
        sportEasy: 'x',
        spond: 'x',
        teamPulse: 'x',
    },
    {
        labelKey: 'comparison.clubRevenue',
        simplyFoot: 'revenue-highlight',
        sportEasy: 'x',
        spond: 'x',
        teamPulse: 'x',
    },
    {
        labelKey: 'comparison.invoicing',
        simplyFoot: 'check',
        sportEasy: 'partial',
        spond: 'x',
        teamPulse: 'x',
    },
];

function renderStars(count: number) {
    return (
        <span className="flex items-center gap-0.5" aria-label={`${count}/5`}>
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    className={cn(
                        'size-4',
                        i < count
                            ? 'fill-brand-primary text-brand-primary'
                            : 'text-muted-foreground/30',
                    )}
                    aria-hidden="true"
                />
            ))}
        </span>
    );
}

interface CellValueProps {
    value: CellValueKind;
    labels: { comingSoon: string; partial: string; revenue: string };
}

function CellValue({ value, labels }: CellValueProps) {
    if (value.startsWith('stars-')) {
        const parts = value.split('-');
        const count = Number(parts[1] ?? 0);
        return renderStars(count);
    }
    if (value === 'check') {
        return <Check className="size-5 text-brand-primary" aria-label="Oui" />;
    }
    if (value === 'x') {
        return <X className="size-5 text-muted-foreground" aria-label="Non" />;
    }
    if (value === 'coming-soon') {
        return (
            <span className="text-small-fluid font-medium text-brand-primary-light">
                {labels.comingSoon}
            </span>
        );
    }
    if (value === 'partial') {
        return (
            <span className="text-small-fluid inline-flex items-center gap-1 font-medium text-muted-foreground">
                <span
                    className="inline-block size-2 rounded-full bg-brand-primary/40"
                    aria-hidden
                />
                {labels.partial}
            </span>
        );
    }
    if (value === 'revenue-highlight') {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary px-2.5 py-1 text-xs font-semibold text-white">
                <Check className="size-3" aria-hidden />
                {labels.revenue}
            </span>
        );
    }
    return null;
}

export function CompetitorTable() {
    const t = useTranslations('foot.pricing');
    const labels = {
        comingSoon: t('comparison.comingSoon'),
        partial: t('comparison.partial'),
        revenue: t('comparison.clubRevenueValue'),
    };

    return (
        <section
            aria-label={t('comparison.title')}
            className="px-(--space-section-x) py-(--space-section-y)"
        >
            <div className="container-simply flex flex-col items-center gap-(--space-block)">
                <h2 className="text-center font-display text-h2 font-bold">
                    {t('comparison.title')}
                </h2>

                {/* Desktop table */}
                <div className="hidden w-full overflow-x-auto md:block">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="py-3 pr-4 font-medium text-muted-foreground" />
                                {COMPETITORS.map((name, i) => (
                                    <th
                                        key={name}
                                        className={cn(
                                            'px-4 py-3 text-center font-semibold',
                                            i === 0 && 'rounded-t-lg bg-brand-primary/10',
                                        )}
                                    >
                                        {name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {ROWS.map((row) => (
                                <tr key={row.labelKey} className="border-b last:border-b-0">
                                    <td className="py-3 pr-4 font-medium">{t(row.labelKey)}</td>
                                    <td className="bg-brand-primary/10 px-4 py-3">
                                        <div className="flex justify-center">
                                            <CellValue value={row.simplyFoot} labels={labels} />
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center">
                                            <CellValue value={row.sportEasy} labels={labels} />
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center">
                                            <CellValue value={row.spond} labels={labels} />
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center">
                                            <CellValue value={row.teamPulse} labels={labels} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile cards */}
                <div className="flex w-full flex-col gap-(--space-element) md:hidden">
                    {COMPETITORS.map((name, compIdx) => (
                        <div
                            key={name}
                            className={cn(
                                'rounded-xl border p-4',
                                compIdx === 0 && 'border-brand-primary bg-brand-primary/5',
                            )}
                        >
                            <h3 className="text-body-fluid mb-3 font-semibold">{name}</h3>
                            <ul className="flex flex-col gap-2">
                                {ROWS.map((row) => {
                                    const values: readonly CellValueKind[] = [
                                        row.simplyFoot,
                                        row.sportEasy,
                                        row.spond,
                                        row.teamPulse,
                                    ];
                                    const value = values[compIdx] ?? 'x';
                                    return (
                                        <li
                                            key={row.labelKey}
                                            className="flex items-center justify-between gap-2"
                                        >
                                            <span className="text-small-fluid text-muted-foreground">
                                                {t(row.labelKey)}
                                            </span>
                                            <CellValue value={value} labels={labels} />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
