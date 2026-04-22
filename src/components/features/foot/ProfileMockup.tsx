'use client';

import { UsersRound } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

interface ProfileMockupProps {
    /** Chemin vers le PNG — `null` affiche une illustration de repli (Parent). */
    mockupSrc: string | null;
    alt: string;
    className?: string;
}

/**
 * Mockup iPhone d'un profil. Légère rotation + ombre portée pour un rendu
 * premium. Pour le profil Parent (`mockupSrc=null`), on affiche une
 * composition illustrative — avatars famille en pastilles — plutôt qu'un
 * vrai mockup.
 */
export function ProfileMockup({ mockupSrc, alt, className }: ProfileMockupProps) {
    if (!mockupSrc) {
        return <ParentIllustration label={alt} className={className} />;
    }

    return (
        <div
            className={cn(
                'relative mx-auto aspect-[9/19] w-full max-w-[320px] overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)]',
                'rotate-[-3deg] transition-transform duration-500 hover:rotate-0',
                className,
            )}
        >
            <Image
                src={mockupSrc}
                alt={alt}
                fill
                sizes="(min-width: 768px) 320px, 260px"
                className="object-cover"
                priority={false}
            />
        </div>
    );
}

function ParentIllustration({ label, className }: { label: string; className?: string }) {
    return (
        <div
            role="img"
            aria-label={label}
            className={cn(
                'bg-secondary-50 ring-secondary-100 relative mx-auto flex aspect-[9/19] w-full max-w-[320px] flex-col items-center justify-center gap-6 overflow-hidden rounded-[2.5rem] p-8 text-center shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)] ring-2',
                'rotate-[-3deg] transition-transform duration-500 hover:rotate-0',
                className,
            )}
        >
            <span className="bg-primary text-primary-foreground flex size-16 items-center justify-center rounded-full shadow-lg">
                <UsersRound className="size-8" aria-hidden />
            </span>
            <div className="flex -space-x-3">
                {['bg-primary-500', 'bg-warning-500', 'bg-info-500', 'bg-primary-300'].map((bg) => (
                    <span
                        key={bg}
                        className={cn(
                            'ring-secondary-50 flex size-12 items-center justify-center rounded-full text-xs font-bold text-white ring-4',
                            bg,
                        )}
                        aria-hidden
                    >
                        👨‍👩‍👧
                    </span>
                ))}
            </div>
            <p className="text-story-ink font-display max-w-[20ch] text-lg font-semibold text-balance">
                Plusieurs enfants. Un seul compte. Zéro doublon.
            </p>
        </div>
    );
}
