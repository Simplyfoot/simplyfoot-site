import { PlanEnum } from "./Plan";

export type Subscription = {
  plan: PlanEnum;
  start: string;
  end: string;
  active: boolean;
  seats?: { used: number; quota: number };
  renewsAutomatically?: boolean;
  nextInvoice?: { date: string; amount: number } | null;
  remainingDays?: number;
  progress?: number;
  customer_email?: string;
  stripe_subscription_id?: string;
};