'use client';

import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface FaqSearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    ariaLabel: string;
    clearLabel: string;
    className?: string;
}

/**
 * Controlled search input with 200ms debounce so parent state isn't updated
 * on every keystroke. Local input stays reactive (instant echo), the debounced
 * value propagates up. A clear button appears as soon as the user typed.
 */
export function FaqSearchBar({
    value,
    onChange,
    placeholder,
    ariaLabel,
    clearLabel,
    className,
}: FaqSearchBarProps) {
    const [local, setLocal] = useState(value);

    // Debounce local → parent.
    useEffect(() => {
        const handle = setTimeout(() => {
            if (local !== value) {
                onChange(local);
            }
        }, 200);
        return () => clearTimeout(handle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [local]);

    // Sync when parent value changes externally (e.g. "Clear" button).
    useEffect(() => {
        if (value !== local) {
            setLocal(value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <div
            className={cn(
                'border-border focus-within:border-primary focus-within:ring-primary/20 bg-background relative flex h-12 w-full items-center rounded-xl border shadow-sm focus-within:ring-4',
                className,
            )}
        >
            <Search
                className="text-muted-foreground pointer-events-none absolute left-4 size-5"
                aria-hidden
            />
            <input
                type="search"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                placeholder={placeholder}
                aria-label={ariaLabel}
                className="text-foreground placeholder:text-muted-foreground h-full w-full rounded-xl bg-transparent pr-12 pl-12 text-base outline-none"
            />
            {local && (
                <button
                    type="button"
                    onClick={() => setLocal('')}
                    aria-label={clearLabel}
                    className="text-muted-foreground hover:text-foreground focus-visible:ring-primary absolute right-3 inline-flex size-8 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                    <X className="size-4" aria-hidden />
                </button>
            )}
        </div>
    );
}
