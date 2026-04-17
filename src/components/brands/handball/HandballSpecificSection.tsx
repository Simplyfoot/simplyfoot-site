'use client';

import { CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { AnimatedTitle } from '@/components/shared/AnimatedTitle';
import { SectionBackground } from '@/components/shared/SectionBackground';

function HandballCourtSvg() {
    return (
        <svg
            viewBox="0 0 400 220"
            className="mx-auto w-full max-w-md"
            role="img"
            aria-hidden="true"
        >
            {/* Court background */}
            <rect x="10" y="10" width="380" height="200" rx="4" fill="#b78f5b" />
            <rect
                x="10"
                y="10"
                width="380"
                height="200"
                rx="4"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
            />

            {/* Halfway line */}
            <line x1="200" y1="10" x2="200" y2="210" stroke="#fff" strokeWidth="2" />
            <circle cx="200" cy="110" r="6" fill="none" stroke="#fff" strokeWidth="1" />

            {/* 6m semicircles (goalie area) */}
            <path
                d="M 10,50 A 60,60 0 0 1 10,170"
                fill="rgba(26,35,126,0.18)"
                stroke="#fff"
                strokeWidth="1.5"
            />
            <path
                d="M 390,50 A 60,60 0 0 0 390,170"
                fill="rgba(26,35,126,0.18)"
                stroke="#fff"
                strokeWidth="1.5"
            />

            {/* 9m dashed lines */}
            <path
                d="M 10,30 A 90,90 0 0 1 10,190"
                fill="none"
                stroke="#fff"
                strokeWidth="1"
                strokeDasharray="5 4"
            />
            <path
                d="M 390,30 A 90,90 0 0 0 390,190"
                fill="none"
                stroke="#fff"
                strokeWidth="1"
                strokeDasharray="5 4"
            />

            {/* 7m line */}
            <line x1="80" y1="105" x2="80" y2="115" stroke="#fff" strokeWidth="2" />
            <line x1="320" y1="105" x2="320" y2="115" stroke="#fff" strokeWidth="2" />

            {/* Goals */}
            <rect x="4" y="100" width="6" height="20" fill="#fff" />
            <rect x="390" y="100" width="6" height="20" fill="#fff" />

            {/* Players — left team attacking right */}
            {/* Goalkeeper */}
            <circle cx="28" cy="110" r="6" fill="#FFD700" stroke="#1A237E" strokeWidth="1.5" />
            {/* Back court line */}
            <circle cx="110" cy="80" r="6" fill="var(--brand-primary, #1A237E)" />
            <circle cx="110" cy="110" r="6" fill="var(--brand-primary, #1A237E)" />
            <circle cx="110" cy="140" r="6" fill="var(--brand-primary, #1A237E)" />
            {/* Wings */}
            <circle cx="90" cy="50" r="6" fill="var(--brand-primary, #1A237E)" />
            <circle cx="90" cy="170" r="6" fill="var(--brand-primary, #1A237E)" />
            {/* Pivot */}
            <circle cx="160" cy="110" r="6" fill="var(--brand-primary, #1A237E)" />

            {/* Labels */}
            <text x="28" y="113" textAnchor="middle" fill="#1A237E" fontSize="7" fontWeight="bold">
                G
            </text>
            <text x="90" y="53" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">
                AG
            </text>
            <text x="110" y="83" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">
                ARG
            </text>
            <text x="110" y="113" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">
                DC
            </text>
            <text x="110" y="143" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">
                ARD
            </text>
            <text x="90" y="173" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">
                AD
            </text>
            <text x="160" y="113" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">
                PV
            </text>
        </svg>
    );
}

export function HandballSpecificSection() {
    const t = useTranslations('handball.handballSpecific');
    const points = [t('points.0'), t('points.1'), t('points.2'), t('points.3'), t('points.4')];

    return (
        <SectionBackground sport="handball" tone="light">
            <div className="py-(--space-section-y)">
                <div className="container-simply">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        <div className="flex flex-col gap-4">
                            <AnimatedTitle sport="handball">{t('title')}</AnimatedTitle>
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
                            <HandballCourtSvg />
                        </div>
                    </div>
                </div>
            </div>
        </SectionBackground>
    );
}
