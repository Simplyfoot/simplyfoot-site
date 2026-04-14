import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'lib/utils/cn';

const badgeVariants = cva('inline-flex items-center rounded-full font-semibold text-xs px-3 py-1', {
  variants: {
    variant: {
      brand: 'bg-[var(--brand-cta)]/15 text-[var(--brand-cta)]',
      light: 'bg-white/20 text-white',
      dark: 'bg-[var(--color-surface-dark)] text-[var(--color-text-beige)]',
      success: 'bg-emerald-100 text-emerald-800',
    },
  },
  defaultVariants: { variant: 'brand' },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant, ...props }, ref) => (
  <span className={cn(badgeVariants({ variant }), className)} ref={ref} {...props} />
));
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
