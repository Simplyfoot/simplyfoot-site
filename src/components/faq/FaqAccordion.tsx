'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from 'content/faq/foot-faq';

interface FaqAccordionProps {
  item: FaqItem;
  defaultOpen?: boolean;
}

function formatAnswer(text: string) {
  const lines = text.split('\n');
  const result: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    result.push(
      <ul key={`ul-${result.length}`} className="list-disc pl-5 space-y-1 mt-2">
        {listItems.map((li, i) => (
          <li key={i}>{formatInline(li)}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('\u2022 ') || trimmed.startsWith('- ')) {
      listItems.push(trimmed.replace(/^[\u2022\-]\s*/, ''));
    } else {
      flushList();
      if (trimmed) {
        result.push(<p key={`p-${i}`} className={result.length > 0 ? 'mt-2' : ''}>{formatInline(trimmed)}</p>);
      }
    }
  });
  flushList();
  return result;
}

function formatInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let rest = text;
  // Match emails
  const emailRe = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
  // Match phone numbers
  const phoneRe = /((?:0|\+33)\s?\d[\s.]?\d{2}[\s.]?\d{2}[\s.]?\d{2}[\s.]?\d{2})/;
  const combined = new RegExp(`(${emailRe.source}|${phoneRe.source})`);

  while (combined.test(rest)) {
    const m = rest.match(combined)!;
    const before = rest.slice(0, m.index);
    if (before) parts.push(before);

    const match = m[0];
    if (emailRe.test(match)) {
      parts.push(
        <a key={parts.length} href={`mailto:${match}`} className="text-[var(--brand-cta)] underline underline-offset-2 hover:opacity-80">
          {match}
        </a>
      );
    } else {
      const tel = match.replace(/[\s.]/g, '');
      parts.push(
        <a key={parts.length} href={`tel:${tel}`} className="text-[var(--brand-cta)] underline underline-offset-2 hover:opacity-80">
          {match}
        </a>
      );
    }
    rest = rest.slice(m.index! + match.length);
  }
  if (rest) parts.push(rest);
  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

export function FaqAccordion({ item, defaultOpen = false }: FaqAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const id = item.question.replace(/\s+/g, '-').toLowerCase().slice(0, 40);

  return (
    <div className="border-b border-[var(--brand-border)] last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cta)]/60 focus-visible:ring-inset"
        aria-expanded={isOpen}
        aria-controls={`faq-${id}`}
      >
        <span className="text-sm font-semibold text-[var(--color-text-beige)] sm:text-base">{item.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-[var(--brand-cta)]"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-${id}`}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm leading-relaxed text-[var(--color-text-beige)]/80">
              {formatAnswer(item.answer)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
