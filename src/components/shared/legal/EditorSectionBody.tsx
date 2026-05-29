import { getTranslations } from 'next-intl/server';

import { BRAND_CONTACT, SIMPLY_LEGAL } from '@/config/site';
import { BRANDS } from '@/utils/constants.utils';

import type { BrandSlug } from '~types/brand.types';

interface EditorSectionBodyProps {
    brand: BrandSlug;
}

const editorFieldKeys = [
    'companyName',
    'registeredOffice',
    'rcs',
    'legalForm',
    'vat',
    'email',
    'publicationDirector',
] as const;

export async function EditorSectionBody({ brand }: EditorSectionBodyProps) {
    const t = await getTranslations('Legal.mentionsLegales.sections.editor');
    const brandLabel = BRANDS[brand].label;

    const valueVars = {
        brand: brandLabel.toUpperCase(),
        entity: SIMPLY_LEGAL.entity,
        capital: SIMPLY_LEGAL.capital,
        address: SIMPLY_LEGAL.address,
        rcs: SIMPLY_LEGAL.rcs,
        tva: SIMPLY_LEGAL.tva,
        email: BRAND_CONTACT[brand].email,
    };

    return (
        <div className="text-muted-foreground space-y-4 text-base leading-relaxed md:text-lg">
            <p>{t('intro')}</p>
            <ul className="space-y-1">
                {editorFieldKeys.map((key) => (
                    <li key={key}>
                        <span className="text-foreground font-medium">
                            {t(`fields.${key}.label`)} :
                        </span>{' '}
                        {t(`fields.${key}.value`, valueVars)}
                    </li>
                ))}
            </ul>
        </div>
    );
}
