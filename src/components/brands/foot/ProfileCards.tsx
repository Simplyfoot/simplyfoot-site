'use client';

import { Building, ClipboardList, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

interface ProfileCardProps {
    icon: ReactNode;
    title: string;
    features: string[];
}

function ProfileCard({ icon, title, features }: ProfileCardProps) {
    return (
        <div className="rounded-xl border-t-4 border-brand-primary bg-[--brand-bg] p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                {icon}
            </div>
            <h3 className="font-display text-h4 font-semibold">{title}</h3>
            <ul className="mt-4 space-y-2">
                {features.map((feature) => (
                    <li
                        key={feature}
                        className="text-small-fluid flex items-start gap-2 text-muted-foreground"
                    >
                        <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-brand-primary" />
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function ProfileCards() {
    const t = useTranslations('foot.profiles');

    const profiles: Array<{ key: 'president' | 'coach' | 'player'; icon: ReactNode }> = [
        { key: 'president', icon: <Building className="size-6" /> },
        { key: 'coach', icon: <ClipboardList className="size-6" /> },
        { key: 'player', icon: <User className="size-6" /> },
    ];

    return (
        <div className="py-(--space-section-y)">
            <div className="container-simply">
                <div className="mb-(--space-block) text-center">
                    <h2 className="font-display text-h2 font-bold">{t('title')}</h2>
                    <p className="text-body-fluid mt-2 text-muted-foreground">{t('subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {profiles.map((profile) => (
                        <ProfileCard
                            key={profile.key}
                            icon={profile.icon}
                            title={t(`${profile.key}.title`)}
                            features={t.raw(`${profile.key}.features`) as string[]}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
