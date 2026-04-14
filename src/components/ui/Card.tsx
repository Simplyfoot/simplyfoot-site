import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'lib/utils/cn';

const cardVariants = cva('rounded-2xl transition-all duration-250', {
  variants: {
    variant: {
      dark: 'bg-[var(--color-surface-dark)]/95 border border-[var(--brand-border)] shadow-2xl backdrop-blur-sm',
      light: 'bg-white/60 border border-[var(--color-text-dark)]/15 shadow-lg hover:shadow-2xl',
      ghost: 'bg-transparent',
    },
    hover: {
      lift: 'hover:scale-[1.06] hover:-translate-y-2 hover:z-20',
      subtle: 'hover:scale-105',
      none: '',
    },
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: { variant: 'dark', hover: 'none', padding: 'lg' },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hover, padding, ...props }, ref) => (
    <div
      className={cn(cardVariants({ variant, hover, padding }), className)}
      ref={ref}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

export { Card, cardVariants };
