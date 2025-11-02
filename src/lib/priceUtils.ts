import { Billing } from "app/_types/Order";

export const eur = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export function priceFor(billing: Billing, monthlyBase: number) {
  if (billing === "monthly") {
    return {
      main: `${eur.format(monthlyBase)}`,
      sub: "/ mois TTC",
      foot: "",
      savings: null as string | null,
    };
  }
  const annualNoDisc = monthlyBase * 12;
  const annualTotal = +(annualNoDisc * 0.9).toFixed(2);
  const equiv = +(annualTotal / 12).toFixed(2);
  const save = +(annualNoDisc - annualTotal).toFixed(2);
  return {
    main: `${eur.format(annualTotal)}`,
    sub: "/ an TTC (–10% vs mensuel)",
    foot: `soit ${eur.format(equiv)}/mois en moyenne`,
    savings: `Économisez ${eur.format(save)}/an`,
  };
}
