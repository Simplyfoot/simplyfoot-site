import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--brand-cta)] text-[var(--brand-cta-text)] shadow-xl hover:bg-[var(--brand-cta-hover)] hover:scale-105',
        secondary:
          'border border-[var(--color-text-beige)]/60 text-[var(--color-text-beige)] hover:border-[var(--brand-cta)] hover:text-[var(--brand-cta)] hover:scale-105',
        ghost: 'hover:bg-white/10 text-[var(--color-text-beige)]',
        outline:
          'border border-[var(--brand-cta)] text-[var(--brand-cta)] hover:bg-[var(--brand-cta)]/10',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'px-8 py-4 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  ),
);
Button.displayName = 'Button';

export { Button, buttonVariants };
