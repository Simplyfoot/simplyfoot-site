interface ManifestContent {
  eyebrow: string;
  phrase: string;
  statement: string;
}

interface BrandManifestProps {
  manifest: ManifestContent;
}

export function BrandManifest({ manifest }: BrandManifestProps) {
  return (
    <section
      aria-label={manifest.eyebrow}
      className="w-full bg-[var(--brand-bg)] relative overflow-hidden py-20 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 50% at 50% 110%, color-mix(in srgb, var(--brand-cta) 10%, transparent), transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div
          className="w-10 h-px bg-[var(--brand-cta)] mx-auto mb-8 origin-left"
          aria-hidden="true"
        />

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-cta)] mb-7">
          {manifest.eyebrow}
        </p>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text leading-[1.1] tracking-tight mb-8">
          {manifest.phrase}
        </h2>

        <p className="text-base md:text-lg text-brand-text-muted max-w-2xl mx-auto leading-relaxed">
          {manifest.statement}
        </p>
      </div>
    </section>
  );
}
