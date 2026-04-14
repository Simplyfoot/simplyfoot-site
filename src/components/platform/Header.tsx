import { getDictionary } from 'lib/i18n/getDictionary';
import HeaderClient from './HeaderClient';

export default async function Header({ locale }: { locale: string }) {
  const commonDict = await getDictionary(locale as 'fr' | 'en', 'common');

  return <HeaderClient dict={commonDict.nav} locale={locale} />;
}
