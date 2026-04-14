interface Props {
  className?: string;
}

export function RugbyIllustration({ className }: Props) {
  return (
    <svg
      viewBox="0 0 300 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Poteaux en H */}
      <rect x="100" y="80" width="6" height="260" fill="var(--brand-cta)" opacity="0.5" />
      <rect x="194" y="80" width="6" height="260" fill="var(--brand-cta)" opacity="0.5" />
      <rect x="100" y="180" width="100" height="5" fill="var(--brand-cta)" opacity="0.6" />

      {/* Barre superieure des poteaux */}
      <rect x="97" y="76" width="12" height="8" rx="2" fill="var(--brand-cta)" opacity="0.7" />
      <rect x="191" y="76" width="12" height="8" rx="2" fill="var(--brand-cta)" opacity="0.7" />

      {/* Ballon ovale en vol */}
      <g opacity="0.8">
        <ellipse cx="150" cy="140" rx="28" ry="16" fill="var(--brand-cta)" opacity="0.15" transform="rotate(-25 150 140)" />
        <ellipse cx="150" cy="140" rx="28" ry="16" stroke="var(--brand-cta)" strokeWidth="1.5" fill="none" transform="rotate(-25 150 140)" />
        {/* Couture du ballon */}
        <line x1="135" y1="128" x2="165" y2="152" stroke="var(--brand-cta)" strokeWidth="1" opacity="0.6" transform="rotate(-25 150 140)" />
        <line x1="140" y1="132" x2="142" y2="128" stroke="var(--brand-cta)" strokeWidth="0.8" opacity="0.4" />
        <line x1="148" y1="138" x2="150" y2="134" stroke="var(--brand-cta)" strokeWidth="0.8" opacity="0.4" />
        <line x1="156" y1="144" x2="158" y2="140" stroke="var(--brand-cta)" strokeWidth="0.8" opacity="0.4" />
      </g>

      {/* Rayures maillot (pattern rugby) */}
      <line x1="30" y1="320" x2="270" y2="320" stroke="var(--brand-cta)" strokeWidth="3" opacity="0.15" />
      <line x1="30" y1="335" x2="270" y2="335" stroke="var(--brand-cta)" strokeWidth="3" opacity="0.1" />
      <line x1="30" y1="350" x2="270" y2="350" stroke="var(--brand-cta)" strokeWidth="3" opacity="0.15" />
      <line x1="30" y1="365" x2="270" y2="365" stroke="var(--brand-cta)" strokeWidth="3" opacity="0.1" />
      <line x1="30" y1="380" x2="270" y2="380" stroke="var(--brand-cta)" strokeWidth="3" opacity="0.15" />

      {/* Ligne de terrain */}
      <line x1="40" y1="290" x2="260" y2="290" stroke="var(--brand-cta)" strokeWidth="1" opacity="0.3" strokeDasharray="8 4" />
    </svg>
  );
}
