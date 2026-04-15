'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { SEARCH_DEBOUNCE_MS } from 'lib/constants';

interface FaqSearchProps {
  onSearch: (query: string) => void;
}

export function FaqSearch({ onSearch }: FaqSearchProps) {
  const [value, setValue] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onSearch(value), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timerRef.current);
  }, [value, onSearch]);

  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--brand-cta)]" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Rechercher une question..."
        aria-label="Rechercher dans la FAQ"
        className="w-full rounded-xl bg-[var(--brand-surface)] border border-[var(--brand-border)] pl-12 pr-10 py-3.5 text-sm text-[var(--color-text-beige)] placeholder:text-[var(--color-text-beige)]/40 focus:outline-none focus:border-[var(--brand-cta)] focus:ring-2 focus:ring-[var(--brand-cta)]/30"
      />
      {value && (
        <button
          onClick={() => setValue('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-[var(--color-text-beige)]/40 hover:text-[var(--color-text-beige)] cursor-pointer"
          aria-label="Effacer la recherche"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
