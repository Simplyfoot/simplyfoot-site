'use client';

import { Check, ChevronsUpDown, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { CLUBS, getClubById } from '@/content/blog/clubs';
import { cn } from '@/lib/utils';
import { Button } from '@/shadcn/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/shadcn/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/popover';

interface ClubAutocompleteProps {
    value: string | null;
    onChange: (clubId: string | null) => void;
    className?: string;
}

/**
 * Combobox-powered club picker. Fully searchable, accessible (combobox
 * pattern from cmdk), and capped visually to 8 results at a time.
 */
export function ClubAutocomplete({ value, onChange, className }: ClubAutocompleteProps) {
    const t = useTranslations('Blog.filters');
    const [open, setOpen] = useState(false);
    const selected = value ? getClubById(value) : null;
    const allClubs = useMemo(() => CLUBS, []);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-label={t('club')}
                    className={cn('h-9 justify-between font-normal', className)}
                >
                    <span className={cn('truncate', !selected && 'text-muted-foreground')}>
                        {selected ? selected.name : t('club')}
                    </span>
                    <span className="ml-2 inline-flex shrink-0 items-center gap-1">
                        {selected && (
                            <span
                                role="button"
                                tabIndex={0}
                                aria-label={t('clubClear')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onChange(null);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onChange(null);
                                    }
                                }}
                                className="hover:bg-muted rounded-sm p-0.5"
                            >
                                <X className="text-muted-foreground size-3.5" aria-hidden />
                            </span>
                        )}
                        <ChevronsUpDown className="size-4 opacity-50" aria-hidden />
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={t('clubSearch')} />
                    <CommandList>
                        <CommandEmpty>{t('clubNoResults')}</CommandEmpty>
                        <CommandGroup>
                            {allClubs.map((club) => (
                                <CommandItem
                                    key={club.id}
                                    value={`${club.name} ${club.id}`}
                                    onSelect={() => {
                                        onChange(club.id === value ? null : club.id);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 size-4',
                                            value === club.id ? 'opacity-100' : 'opacity-0',
                                        )}
                                        aria-hidden
                                    />
                                    <span>{club.name}</span>
                                    <span className="text-muted-foreground ml-auto text-xs">
                                        {club.department}
                                    </span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
