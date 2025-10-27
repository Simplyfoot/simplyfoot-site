export type Subscription = {
  plan: string;
  start: string;
  end: string;
  active: boolean;
  seats?: { used: number; quota: number };
  renewsAutomatically?: boolean;
  nextInvoice?: { date: string; amount: number } | null;
};