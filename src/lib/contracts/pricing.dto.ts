export interface PricingPlanDTO {
  id: string;
  key: string;
  name: string;
  target: string;
  subtitle: string;
  monthlyPrice: number | null;
  annualDiscountPct: number;
  features: string[];
  bonusText: string | null;
  badge: string | null;
  ctaLabel: string;
  ctaHref: string;
  gradientFrom: string;
  gradientTo: string;
}
