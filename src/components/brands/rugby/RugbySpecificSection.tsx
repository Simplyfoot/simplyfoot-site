'use client';

// 204 lines — the large inline SVG RugbyPitchSvg (~150 lines of coordinates for
// field lines, 15 player positions and labels) is intentionally kept monolithic.
// Extraction would split rugby-specific visual data across files without clarity.
import { CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { SectionBackground } from '@/components/shared/SectionBackground';

function RugbyPitchSvg() {
    return (
        <svg
            viewBox="0 0 300 440"
            className="mx-auto w-full max-w-sm"
            role="img"
            aria-hidden="true"
        >
            {/* Pitch background */}
            <rect x="10" y="10" width="280" height="420" rx="4" fill="#2d5a27" />

            {/* In-goal areas */}
            <rect
                x="10"
                y="10"
                width="280"
                height="40"
                fill="#245020"
                stroke="#fff"
                strokeWidth="1.5"
            />
            <rect
                x="10"
                y="390"
                width="280"
                height="40"
                fill="#245020"
                stroke="#fff"
                strokeWidth="1.5"
            />

            {/* Try lines */}
            <line x1="10" y1="50" x2="290" y2="50" stroke="#fff" strokeWidth="2" />
            <line x1="10" y1="390" x2="290" y2="390" stroke="#fff" strokeWidth="2" />

            {/* 22m lines */}
            <line
                x1="10"
                y1="120"
                x2="290"
                y2="120"
                stroke="#fff"
                strokeWidth="1"
                strokeDasharray="6 4"
            />
            <line
                x1="10"
                y1="320"
                x2="290"
                y2="320"
                stroke="#fff"
                strokeWidth="1"
                strokeDasharray="6 4"
            />

            {/* 10m lines */}
            <line
                x1="10"
                y1="185"
                x2="290"
                y2="185"
                stroke="#fff"
                strokeWidth="1"
                strokeDasharray="4 4"
            />
            <line
                x1="10"
                y1="255"
                x2="290"
                y2="255"
                stroke="#fff"
                strokeWidth="1"
                strokeDasharray="4 4"
            />

            {/* Halfway line */}
            <line x1="10" y1="220" x2="290" y2="220" stroke="#fff" strokeWidth="2" />

            {/* Centre circle */}
            <circle cx="150" cy="220" r="20" fill="none" stroke="#fff" strokeWidth="1.5" />

            {/* Touchlines */}
            <rect
                x="10"
                y="10"
                width="280"
                height="420"
                rx="4"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
            />

            {/* === XV positions (attacking from bottom) === */}
            {/* Front row */}
            <circle cx="115" cy="365" r="8" fill="var(--brand-primary, #8B1A1A)" />
            <circle cx="150" cy="365" r="8" fill="var(--brand-primary, #8B1A1A)" />
            <circle cx="185" cy="365" r="8" fill="var(--brand-primary, #8B1A1A)" />

            {/* Second row */}
            <circle cx="130" cy="345" r="8" fill="var(--brand-primary, #8B1A1A)" />
            <circle cx="170" cy="345" r="8" fill="var(--brand-primary, #8B1A1A)" />

            {/* Back row */}
            <circle cx="100" cy="325" r="8" fill="var(--brand-primary, #8B1A1A)" />
            <circle cx="150" cy="330" r="8" fill="var(--brand-primary, #8B1A1A)" />
            <circle cx="200" cy="325" r="8" fill="var(--brand-primary, #8B1A1A)" />

            {/* Scrum-half */}
            <circle cx="150" cy="300" r="8" fill="var(--brand-primary, #8B1A1A)" />

            {/* Fly-half */}
            <circle cx="150" cy="275" r="8" fill="var(--brand-primary, #8B1A1A)" />

            {/* Centres */}
            <circle cx="115" cy="255" r="8" fill="var(--brand-primary, #8B1A1A)" />
            <circle cx="185" cy="255" r="8" fill="var(--brand-primary, #8B1A1A)" />

            {/* Wings */}
            <circle cx="40" cy="240" r="8" fill="var(--brand-primary, #8B1A1A)" />
            <circle cx="260" cy="240" r="8" fill="var(--brand-primary, #8B1A1A)" />

            {/* Fullback */}
            <circle cx="150" cy="210" r="8" fill="var(--brand-primary, #8B1A1A)" />

            {/* Position labels — small, white text */}
            <text x="115" y="369" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                1
            </text>
            <text x="150" y="369" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                2
            </text>
            <text x="185" y="369" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                3
            </text>
            <text x="130" y="349" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                4
            </text>
            <text x="170" y="349" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                5
            </text>
            <text x="100" y="329" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                6
            </text>
            <text x="150" y="334" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                8
            </text>
            <text x="200" y="329" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                7
            </text>
            <text x="150" y="304" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                9
            </text>
            <text x="150" y="279" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                10
            </text>
            <text x="40" y="244" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                11
            </text>
            <text x="115" y="259" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                12
            </text>
            <text x="185" y="259" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                13
            </text>
            <text x="260" y="244" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                14
            </text>
            <text x="150" y="214" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                15
            </text>
        </svg>
    );
}

export function RugbySpecificSection() {
    const t = useTranslations('rugby.rugbySpecific');

    const points = [t('points.0'), t('points.1'), t('points.2'), t('points.3'), t('points.4')];

    return (
        <SectionBackground sport="rugby" tone="light">
            <div className="py-(--space-section-y)">
                <div className="container-simply">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        <div className="flex flex-col gap-4">
                            <AnimatedTitle sport="rugby">{t('title')}</AnimatedTitle>
                            <p className="text-body-fluid font-medium text-muted-foreground">
                                {t('subtitle')}
                            </p>

                            <p className="text-body-fluid mt-2 max-w-[65ch] leading-relaxed text-foreground/90">
                                {t('description')}
                            </p>
                            <p className="text-body-fluid max-w-[65ch] leading-relaxed text-foreground/90">
                                {t('description2')}
                            </p>

                            <ul className="mt-4 space-y-3">
                                {points.map((point) => (
                                    <li key={point} className="flex items-start gap-3">
                                        <CheckCircle
                                            className="mt-0.5 size-5 shrink-0 text-brand-primary"
                                            aria-hidden="true"
                                        />
                                        <span className="text-body-fluid max-w-[60ch]">
                                            {point}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex items-center justify-center">
                            <RugbyPitchSvg />
                        </div>
                    </div>
                </div>
            </div>
        </SectionBackground>
    );
}
