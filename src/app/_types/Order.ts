export type Order = {
  id: string;
  date: string;
  amount: number;
  plan: string;
  status: "Payé" | "En attente" | "Échoué";
  invoiceUrl?: string;
};