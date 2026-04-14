interface Props {
  className?: string;
}

export function HandballIllustration({ className }: Props) {
  return (
    <svg
      viewBox="0 0 300 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* But de handball vu de face */}
      <rect x="40" y="60" width="220" height="160" rx="4" stroke="var(--brand-cta)" strokeWidth="2.5" fill="none" opacity="0.6" />

      {/* Filet (lignes croisees) */}
      <line x1="40" y1="100" x2="260" y2="100" stroke="var(--brand-cta)" strokeWidth="0.5" opacity="0.15" />
      <line x1="40" y1="140" x2="260" y2="140" stroke="var(--brand-cta)" strokeWidth="0.5" opacity="0.15" />
      <line x1="40" y1="180" x2="260" y2="180" stroke="var(--brand-cta)" strokeWidth="0.5" opacity="0.15" />
      <line x1="100" y1="60" x2="100" y2="220" stroke="var(--brand-cta)" strokeWidth="0.5" opacity="0.15" />
      <line x1="150" y1="60" x2="150" y2="220" stroke="var(--brand-cta)" strokeWidth="0.5" opacity="0.15" />
      <line x1="200" y1="60" x2="200" y2="220" stroke="var(--brand-cta)" strokeWidth="0.5" opacity="0.15" />

      {/* Ballon de handball en tir */}
      <g opacity="0.8">
        <circle cx="200" cy="100" r="16" fill="var(--brand-cta)" opacity="0.15" />
        <circle cx="200" cy="100" r="16" stroke="var(--brand-cta)" strokeWidth="1.5" fill="none" />
        {/* Lignes du ballon de hand */}
        <path d="M200 84 Q210 100 200 116" stroke="var(--brand-cta)" strokeWidth="0.8" fill="none" opacity="0.5" />
        <path d="M200 84 Q190 100 200 116" stroke="var(--brand-cta)" strokeWidth="0.8" fill="none" opacity="0.5" />
        <line x1="184" y1="100" x2="216" y2="100" stroke="var(--brand-cta)" strokeWidth="0.8" opacity="0.4" />
      </g>

      {/* Trainee du ballon (mouvement) */}
      <line x1="220" y1="90" x2="250" y2="75" stroke="var(--brand-cta)" strokeWidth="1" opacity="0.3" strokeDasharray="4 3" />
      <line x1="220" y1="95" x2="245" y2="82" stroke="var(--brand-cta)" strokeWidth="0.8" opacity="0.2" strokeDasharray="3 3" />

      {/* Lignes de parquet */}
      <line x1="20" y1="280" x2="280" y2="280" stroke="var(--brand-cta)" strokeWidth="0.8" opacity="0.12" />
      <line x1="20" y1="300" x2="280" y2="300" stroke="var(--brand-cta)" strokeWidth="0.8" opacity="0.08" />
      <line x1="20" y1="320" x2="280" y2="320" stroke="var(--brand-cta)" strokeWidth="0.8" opacity="0.12" />
      <line x1="20" y1="340" x2="280" y2="340" stroke="var(--brand-cta)" strokeWidth="0.8" opacity="0.08" />
      <line x1="20" y1="360" x2="280" y2="360" stroke="var(--brand-cta)" strokeWidth="0.8" opacity="0.12" />
      <line x1="20" y1="380" x2="280" y2="380" stroke="var(--brand-cta)" strokeWidth="0.8" opacity="0.08" />

      {/* Zone des 6m (demi-cercle) */}
      <path d="M80 220 Q150 270 220 220" stroke="var(--brand-cta)" strokeWidth="1" fill="none" opacity="0.25" strokeDasharray="6 3" />

      {/* Zone des 9m */}
      <path d="M55 220 Q150 295 245 220" stroke="var(--brand-cta)" strokeWidth="0.8" fill="none" opacity="0.15" strokeDasharray="4 4" />
    </svg>
  );
}
