import type { ReactNode } from 'react';

export default function FootLayout({ children }: { children: ReactNode }) {
    return <div data-brand="foot">{children}</div>;
}
