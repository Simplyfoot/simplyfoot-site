export default function HandballLoading() {
    return (
        <div
            role="status"
            aria-label="Chargement"
            className="flex min-h-[60svh] items-center justify-center bg-[--brand-bg]"
        >
            <div className="flex flex-col items-center gap-4">
                <div className="size-12 animate-pulse rounded-full bg-brand-primary/20" />
                <div className="h-3 w-32 animate-pulse rounded-full bg-brand-primary/20" />
            </div>
        </div>
    );
}
