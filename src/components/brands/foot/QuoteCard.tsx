'use client';

import { Quote } from 'lucide-react';

import { AnimatedCard } from '@/components/shared/AnimatedCard';

interface QuoteCardProps {
    text: string;
    index: number;
}

export function QuoteCard({ text, index }: QuoteCardProps) {
    return (
        <AnimatedCard
            sport="foot"
            index={index}
            className="flex h-full flex-col gap-3 border-l-[3px] border-l-brand-primary bg-[#FFF5E4]"
        >
            <Quote className="size-5 text-brand-primary/50" aria-hidden="true" />
            <p className="text-body-fluid max-w-[60ch] leading-relaxed text-foreground/85 italic">
                « {text} »
            </p>
        </AnimatedCard>
    );
}
