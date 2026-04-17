'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils';

export function PilotBanner() {
    const t = useTranslations('foot.pilotBanner');

    return (
        <div className="bg-brand-primary py-4">
            <div className="container-simply flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:text-left">
                <p className="text-small-fluid font-medium text-white">{t('text')}</p>
                <Link
                    href="/foot/programme-pilote"
                    className={cn(
                        buttonVariants({ variant: 'secondary', size: 'sm' }),
                        'min-h-11 shrink-0 bg-white/20 text-white hover:bg-white/30 sm:min-h-0',
                    )}
                >
                    {t('cta')}
                    <ArrowRight data-icon="inline-end" className="ml-1 size-3.5" />
                </Link>
            </div>
        </div>
    );
}
