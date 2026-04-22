'use client';

import { cn } from '@/lib/utils';

export interface RoleOption {
    id: string;
    label: string;
}

interface RoleFilterProps {
    label: string;
    options: readonly RoleOption[];
    value: string;
    onValueChange: (value: string) => void;
    className?: string;
}

/**
 * Filtre par rôle pour la timeline. Chips pilule `role="radiogroup"` pour
 * une a11y clavier native — flèches pour naviguer, espace pour activer.
 *
 * Le composant est générique : il consomme une liste `options` et remonte
 * la sélection via `onValueChange`. Aucun couplage avec le domaine foot /
 * rugby / handball.
 */
export function RoleFilter({ label, options, value, onValueChange, className }: RoleFilterProps) {
    return (
        <div
            role="radiogroup"
            aria-label={label}
            className={cn(
                'border-border bg-background/70 flex flex-wrap items-center gap-1.5 rounded-full border p-1.5 shadow-sm backdrop-blur-sm',
                className,
            )}
        >
            {options.map((option) => {
                const active = option.id === value;
                return (
                    <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => onValueChange(option.id)}
                        className={cn(
                            'focus-visible:ring-primary rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all focus-visible:ring-2 focus-visible:outline-none sm:text-sm',
                            active
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5',
                        )}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}
