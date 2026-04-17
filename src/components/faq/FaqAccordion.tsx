'use client';

import { useTranslations } from 'next-intl';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import type { FaqQuestion } from '@/content/faq/foot-faq';

interface FaqAccordionProps {
    questions: FaqQuestion[];
}

export function FaqAccordion({ questions }: FaqAccordionProps) {
    const t = useTranslations('foot');

    if (questions.length === 0) {
        return null;
    }

    return (
        <Accordion>
            {questions.map((question) => (
                <AccordionItem key={question.id} value={question.id}>
                    <AccordionTrigger className="text-body-fluid font-medium">
                        {t(question.questionKey)}
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-small-fluid text-muted-foreground">
                            {t(question.answerKey)}
                        </p>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
