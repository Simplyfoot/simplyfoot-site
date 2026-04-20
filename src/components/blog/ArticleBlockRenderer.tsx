import Image from 'next/image';

import { cn } from '@/lib/utils';
import type { ArticleBlock } from '@/types/blog';

interface ArticleBlockRendererProps {
    blocks: readonly ArticleBlock[];
    className?: string;
}

/**
 * Type-safe, zero-dependency renderer for structured article content. Each
 * branch is handled exhaustively; adding a new `ArticleBlock` variant causes
 * a compile error here until the case is covered.
 */
export function ArticleBlockRenderer({ blocks, className }: ArticleBlockRendererProps) {
    return (
        <div className={cn('flex flex-col gap-5', className)}>
            {blocks.map((block, i) => (
                <Block key={i} block={block} />
            ))}
        </div>
    );
}

function Block({ block }: { block: ArticleBlock }) {
    switch (block.type) {
        case 'heading':
            return block.level === 2 ? (
                <h2 className="font-display text-foreground mt-4 text-2xl leading-tight font-bold">
                    {block.text}
                </h2>
            ) : (
                <h3 className="font-display text-foreground mt-2 text-xl font-semibold">
                    {block.text}
                </h3>
            );
        case 'paragraph':
            return (
                <p className="text-foreground/90 max-w-[65ch] text-base leading-relaxed">
                    {block.text}
                </p>
            );
        case 'quote':
            return (
                <blockquote className="border-primary text-foreground/80 max-w-[65ch] border-l-4 pl-4 italic">
                    <p>&laquo; {block.text} &raquo;</p>
                    {block.author && (
                        <footer className="text-muted-foreground mt-2 text-sm not-italic">
                            — {block.author}
                        </footer>
                    )}
                </blockquote>
            );
        case 'list':
            return block.ordered ? (
                <ol className="text-foreground/90 max-w-[65ch] list-decimal space-y-2 pl-6 text-base leading-relaxed">
                    {block.items.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ol>
            ) : (
                <ul className="text-foreground/90 max-w-[65ch] list-disc space-y-2 pl-6 text-base leading-relaxed">
                    {block.items.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            );
        case 'image':
            return (
                <figure className="my-4">
                    <div className="bg-muted relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                        <Image
                            src={block.src}
                            alt={block.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 768px"
                            className="object-cover"
                        />
                    </div>
                    {block.caption && (
                        <figcaption className="text-muted-foreground mt-2 text-center text-sm">
                            {block.caption}
                        </figcaption>
                    )}
                </figure>
            );
        case 'divider':
            return <hr className="border-border my-2" />;
    }
}
