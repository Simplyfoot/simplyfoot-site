import { cn } from '@/lib/utils';
import type { FaqBlock, FaqInlineToken } from '@/types/faq';

interface FaqAnswerRendererProps {
    blocks: readonly FaqBlock[];
    className?: string;
}

/**
 * Zero-dependency, type-safe renderer for FAQ answers. Each block and inline
 * token variant is handled via exhaustive switch — adding a new variant in
 * `types/faq.ts` triggers a compile error here until the case is covered.
 *
 * Inline tokens support plain text, bold emphasis, and clickable email/phone
 * links (mailto:/tel:). No HTML string, no dangerouslySetInnerHTML.
 */
export function FaqAnswerRenderer({ blocks, className }: FaqAnswerRendererProps) {
    return (
        <div className={cn('flex flex-col gap-3', className)}>
            {blocks.map((block, i) => (
                <Block key={i} block={block} />
            ))}
        </div>
    );
}

function Block({ block }: { block: FaqBlock }) {
    switch (block.type) {
        case 'paragraph':
            return (
                <p className="text-muted-foreground max-w-[65ch] text-base leading-relaxed">
                    {block.tokens.map((tok, i) => (
                        <InlineToken key={i} token={tok} />
                    ))}
                </p>
            );
        case 'list':
            return (
                <ul className="text-muted-foreground ml-1 flex max-w-[65ch] flex-col gap-1.5 text-base leading-relaxed">
                    {block.items.map((tokens, i) => (
                        <li key={i} className="flex gap-2">
                            <span
                                className="text-primary mt-[0.55em] size-1 shrink-0 rounded-full bg-current"
                                aria-hidden
                            />
                            <span>
                                {tokens.map((tok, j) => (
                                    <InlineToken key={j} token={tok} />
                                ))}
                            </span>
                        </li>
                    ))}
                </ul>
            );
    }
}

function InlineToken({ token }: { token: FaqInlineToken }) {
    switch (token.type) {
        case 'text':
            return <>{token.value}</>;
        case 'strong':
            return <strong className="text-foreground font-semibold">{token.value}</strong>;
        case 'email':
            return (
                <a
                    href={`mailto:${token.address}`}
                    className="text-primary focus-visible:ring-primary font-medium underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none"
                >
                    {token.label ?? token.address}
                </a>
            );
        case 'phone':
            return (
                <a
                    href={`tel:${token.number.replace(/\s+/g, '')}`}
                    className="text-primary focus-visible:ring-primary font-medium underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none"
                >
                    {token.label ?? token.number}
                </a>
            );
    }
}
