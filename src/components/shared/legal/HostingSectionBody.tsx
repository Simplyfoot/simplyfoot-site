import { getTranslations } from 'next-intl/server';

import { SIMPLY_HOSTING } from '@/config/site';

export async function HostingSectionBody() {
    const t = await getTranslations('Legal.mentionsLegales.sections.hosting');

    return (
        <div className="text-muted-foreground space-y-4 text-base leading-relaxed md:text-lg">
            <p>{t('intro')}</p>
            <address className="not-italic">
                <span className="block">{SIMPLY_HOSTING.name}</span>
                {SIMPLY_HOSTING.addressLines.map((line) => (
                    <span key={line} className="block">
                        {line}
                    </span>
                ))}
                <span className="block">{t('country')}</span>
            </address>
            <p>
                <span className="text-foreground font-medium">{t('websiteLabel')} :</span>{' '}
                <a
                    href={SIMPLY_HOSTING.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 focus-visible:ring-ring rounded-sm underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
                >
                    {SIMPLY_HOSTING.website}
                </a>
            </p>
        </div>
    );
}
