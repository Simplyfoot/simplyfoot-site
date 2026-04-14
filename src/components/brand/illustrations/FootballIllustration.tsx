interface Props {
  className?: string;
}

export function FootballIllustration({ className }: Props) {
  return (
    <svg
      viewBox="0 0 300 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Terrain de football vu de dessus */}
      <rect x="20" y="20" width="260" height="360" rx="8" stroke="var(--brand-cta)" strokeWidth="2" opacity="0.6" />

      {/* Ligne mediane */}
      <line x1="20" y1="200" x2="280" y2="200" stroke="var(--brand-cta)" strokeWidth="1.5" opacity="0.5" />

      {/* Rond central */}
      <circle cx="150" cy="200" r="40" stroke="var(--brand-cta)" strokeWidth="1.5" fill="none" opacity="0.5" />
      <circle cx="150" cy="200" r="3" fill="var(--brand-cta)" opacity="0.6" />

      {/* Surface de reparation haute */}
      <rect x="75" y="20" width="150" height="60" stroke="var(--brand-cta)" strokeWidth="1.5" fill="none" opacity="0.4" />
      <rect x="110" y="20" width="80" height="25" stroke="var(--brand-cta)" strokeWidth="1" fill="none" opacity="0.3" />
      <circle cx="150" cy="65" r="2" fill="var(--brand-cta)" opacity="0.5" />

      {/* Surface de reparation basse */}
      <rect x="75" y="320" width="150" height="60" stroke="var(--brand-cta)" strokeWidth="1.5" fill="none" opacity="0.4" />
      <rect x="110" y="355" width="80" height="25" stroke="var(--brand-cta)" strokeWidth="1" fill="none" opacity="0.3" />
      <circle cx="150" cy="335" r="2" fill="var(--brand-cta)" opacity="0.5" />

      {/* Coins */}
      <path d="M20 30 A10 10 0 0 1 30 20" stroke="var(--brand-cta)" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M270 20 A10 10 0 0 1 280 30" stroke="var(--brand-cta)" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M20 370 A10 10 0 0 0 30 380" stroke="var(--brand-cta)" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M270 380 A10 10 0 0 0 280 370" stroke="var(--brand-cta)" strokeWidth="1" fill="none" opacity="0.3" />

      {/* Ballon stylise au centre */}
      <circle cx="150" cy="200" r="18" fill="var(--brand-cta)" opacity="0.15" />
      <circle cx="150" cy="200" r="18" stroke="var(--brand-cta)" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M150 182 L158 192 L155 204 L145 204 L142 192 Z" stroke="var(--brand-cta)" strokeWidth="1" fill="var(--brand-cta)" opacity="0.3" />
    </svg>
  );
}
