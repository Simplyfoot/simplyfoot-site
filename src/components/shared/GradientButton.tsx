'use client';

import { type ComponentPropsWithoutRef, forwardRef, type ReactNode } from 'react';

import { Link } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils';

type CommonProps = {
    children: ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary';
    size?: 'md' | 'lg';
};

type LinkProps = CommonProps & { href: string };
type ButtonProps = CommonProps & ComponentPropsWithoutRef<'button'> & { href?: undefined };

const sizeStyles = {
    md: 'min-h-11 px-6 py-2.5 text-sm',
    lg: 'min-h-13 px-10 py-4 text-base',
} as const;

const baseClass = cn(
    'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold',
    'transition-[transform,box-shadow,background-position] duration-300 ease-out will-change-transform',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
    'focus-visible:ring-offset-[--brand-surface-dark]',
);

const primaryStyle =
    'bg-[linear-gradient(120deg,var(--brand-primary)_0%,var(--brand-primary-light)_50%,var(--brand-primary)_100%)] ' +
    '[background-size:200%_100%] text-white shadow-[0_12px_40px_-12px_var(--brand-primary)] ' +
    'hover:scale-[1.03] hover:[background-position:100%_0] ' +
    'hover:shadow-[0_18px_50px_-10px_var(--brand-primary)] ' +
    'hover:animate-[breathing_1.5s_ease-in-out_infinite]';

const secondaryStyle =
    'bg-white/5 text-[--simply-beige] border border-[--simply-beige]/30 backdrop-blur-sm ' +
    'hover:bg-white/10 hover:border-[--simply-beige]/60 hover:scale-[1.02]';

export const GradientButton = forwardRef<
    HTMLAnchorElement | HTMLButtonElement,
    LinkProps | ButtonProps
>(function GradientButton(props, _ref) {
    const { children, className, variant = 'primary', size = 'lg' } = props;
    const style = variant === 'primary' ? primaryStyle : secondaryStyle;
    const classes = cn(baseClass, sizeStyles[size], style, className);

    const content = (
        <>
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            <style>{`
          @keyframes breathing {
            0%, 100% { transform: scale(1.03); }
            50% { transform: scale(1.05); }
          }
        `}</style>
        </>
    );

    if ('href' in props && props.href) {
        return (
            <Link href={props.href} className={classes}>
                {content}
            </Link>
        );
    }

    const buttonProps = props as ButtonProps;
    return (
        <button type="button" className={classes} {...buttonProps}>
            {content}
        </button>
    );
});
