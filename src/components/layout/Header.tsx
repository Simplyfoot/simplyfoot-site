
import { getDictionary } from "../../lib/i18n/getDictionary";
import HeaderClient from "./HeaderClient";

export default async function Header({ locale }: { locale: string }) {
  const dict = await getDictionary(locale as "fr" | "en", "navbar");

  return <HeaderClient dict={dict} locale={locale} />;
}
