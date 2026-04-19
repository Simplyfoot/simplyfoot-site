import type { ReactNode } from 'react';

export default function HandballLayout({ children }: { children: ReactNode }) {
    return <div data-brand="handball">{children}</div>;
}
