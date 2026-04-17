import Image from 'next/image';

import { cn } from '@/lib/utils';

interface PhoneMockupProps {
    src?: string;
    alt?: string;
    label?: string;
    priority?: boolean;
    className?: string;
    fallbackClassName?: string;
}

export function PhoneMockup({
    src,
    alt,
    label,
    priority,
    className,
    fallbackClassName = 'bg-brand-primary/10',
}: PhoneMockupProps) {
    return (
        <figure className={cn('flex flex-col items-center gap-5', className)}>
            <div className="relative mx-auto w-full max-w-75">
                {/* SVG spacer — guarantees 9:19.5 ratio regardless of parent layout */}
                <svg
                    viewBox="0 0 9 19.5"
                    aria-hidden
                    className="block size-full h-auto w-full opacity-0"
                />

                {/* Side buttons — left (action + volume up/down) */}
                <span
                    aria-hidden
                    className="absolute top-[18%] left-0 h-[6%] w-0.75 -translate-x-full rounded-l-sm bg-linear-to-r from-neutral-700 to-neutral-900"
                />
                <span
                    aria-hidden
                    className="absolute top-[30%] left-0 h-[8%] w-0.75 -translate-x-full rounded-l-sm bg-linear-to-r from-neutral-700 to-neutral-900"
                />
                <span
                    aria-hidden
                    className="absolute top-[42%] left-0 h-[8%] w-0.75 -translate-x-full rounded-l-sm bg-linear-to-r from-neutral-700 to-neutral-900"
                />
                {/* Side button — right (power) */}
                <span
                    aria-hidden
                    className="absolute top-[32%] right-0 h-[11%] w-0.75 translate-x-full rounded-r-sm bg-linear-to-l from-neutral-700 to-neutral-900"
                />

                {/* Outer metallic frame */}
                <div
                    className={cn(
                        'absolute inset-0 overflow-hidden rounded-[2.75rem] p-1.5',
                        'bg-[linear-gradient(145deg,#2a2a2a_0%,#0a0a0a_40%,#1a1a1a_60%,#000_100%)]',
                        'shadow-[0_50px_100px_-30px_rgba(0,0,0,0.55),0_24px_40px_-18px_rgba(0,0,0,0.35)]',
                    )}
                >
                    {/* Inner bezel */}
                    <div className="relative size-full overflow-hidden rounded-[2.25rem] bg-black p-0.5">
                        {/* Screen */}
                        <div className="relative size-full overflow-hidden rounded-[2.1rem] bg-[--brand-surface-dark]">
                            {src ? (
                                <Image
                                    src={src}
                                    alt={alt ?? ''}
                                    fill
                                    priority={priority}
                                    sizes="(max-width: 768px) 70vw, 300px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className={cn('absolute inset-0', fallbackClassName)}>
                                    <div className="absolute inset-x-0 top-5 flex justify-center">
                                        <span className="block h-6 w-28 rounded-full bg-black/60" />
                                    </div>
                                </div>
                            )}
                            {/* Top glass reflection */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-x-0 top-0 h-20 rounded-t-[2.1rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_80%)]"
                            />
                            {/* Inner highlight edge */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 rounded-[2.1rem] ring-1 ring-white/5 ring-inset"
                            />
                        </div>
                    </div>

                    {/* Outer frame highlight edge */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-[2.75rem] ring-1 ring-white/10 ring-inset"
                    />
                </div>
            </div>

            {label && (
                <figcaption className="text-small-fluid font-medium tracking-wide text-muted-foreground">
                    {label}
                </figcaption>
            )}
        </figure>
    );
}
