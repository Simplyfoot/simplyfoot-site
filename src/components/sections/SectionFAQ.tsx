'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from 'lib/utils/cn';
import type { FaqDTO } from 'lib/contracts/faq.dto';

interface SectionFAQProps {
  title: string;
  items: FaqDTO[];
  className?: string;
}

export function SectionFAQ({ title, items, className }: SectionFAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className={cn('w-full py-16 lg:py-24', className)}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-12">{title}</h2>
        <div className="space-y-4">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-xl border border-[var(--brand-border)] overflow-hidden"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-white hover:bg-white/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 transition-transform duration-200 text-[var(--brand-cta)]',
                      isOpen && 'rotate-180',
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 text-[var(--color-text-beige)]/80 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
