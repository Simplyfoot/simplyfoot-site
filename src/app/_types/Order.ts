import { PlanEnum } from "./Plan";

export type Order = {
  id: string;
  date: string;
  amount: number;
  plan: PlanEnum;
  status: StatusEnum;
  invoice?: string;
};

export enum StatusEnum {
  Paid = "Payé",
  Pending = "En attente",
  Failed = "Échoué",
  Canceled = "Annulé",
}

export type Billing = "monthly" | "yearly";
