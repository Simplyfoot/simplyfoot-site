import type { ReactNode } from 'react';

export default function RugbyLayout({ children }: { children: ReactNode }) {
    return <div data-brand="rugby">{children}</div>;
}
