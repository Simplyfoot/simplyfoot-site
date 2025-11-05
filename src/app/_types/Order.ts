import { PlanEnum } from "./Plan";

export type Order = {
  id: string;
  date: string;
  amount: number;
  plan: PlanEnum;
  status: statusEnum;
  invoice?: string;
};

export enum statusEnum {
  Paid = "Payé",
  Pending = "En attente",
  Failed = "Échoué",
}

export type Billing = "monthly" | "yearly";

export { PlanEnum };
