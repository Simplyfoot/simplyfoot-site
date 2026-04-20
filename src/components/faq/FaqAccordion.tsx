import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shadcn/accordion';
import type { FaqItem } from '@/types/faq';

import { FaqAnswerRenderer } from './FaqAnswerRenderer';

interface FaqAccordionProps {
    /** Composite anchor id for this accordion group — used to namespace item values. */
    scope: string;
    items: readonly FaqItem[];
}

/**
 * Accessible collapsible list built on Radix via shadcn. `type="single"` so
 * only one answer is open at a time — avoids visual noise on long pages.
 * Items stay in the DOM (no unmount) so anchor/deep-link scrolling works
 * regardless of which one is currently expanded.
 */
export function FaqAccordion({ scope, items }: FaqAccordionProps) {
    return (
        <Accordion
            type="single"
            collapsible
            className="border-border divide-border divide-y border-t border-b"
        >
            {items.map((item) => {
                const value = `${scope}__${item.id}`;
                return (
                    <AccordionItem key={value} value={value} className="border-b-0">
                        <AccordionTrigger className="text-foreground py-5 text-left text-base font-medium hover:no-underline">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="pb-5">
                            <FaqAnswerRenderer blocks={item.answer} />
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}
