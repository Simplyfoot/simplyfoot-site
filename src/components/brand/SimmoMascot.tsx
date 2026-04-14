import { cn } from 'lib/utils/cn';

interface SimmoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = { sm: 48, md: 80, lg: 120 };

export function SimmoMascot({ size = 'md', className }: SimmoProps) {
  const dim = SIZES[size];

  return (
    <div className={cn('simmo-mascot inline-block', className)} style={{ width: dim, height: dim }}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Simmo, la mascotte Simply"
        role="img"
      >
        <defs>
          <linearGradient id="simmo-body" x1="60" y1="10" x2="60" y2="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--brand-cta)" />
            <stop offset="1" stopColor="var(--brand-primary-500)" />
          </linearGradient>
          <linearGradient id="simmo-tentacle" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="var(--brand-primary-500)" />
            <stop offset="1" stopColor="var(--brand-cta)" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Tentacules (6) — animation CSS wave */}
        <path className="simmo-t simmo-t1" d="M30 68 Q25 85 20 100 Q18 108 22 110" stroke="url(#simmo-tentacle)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path className="simmo-t simmo-t2" d="M42 72 Q38 90 32 105 Q30 112 35 113" stroke="url(#simmo-tentacle)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path className="simmo-t simmo-t3" d="M54 74 Q52 92 48 108 Q47 115 52 115" stroke="url(#simmo-tentacle)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path className="simmo-t simmo-t4" d="M66 74 Q68 92 72 108 Q73 115 68 115" stroke="url(#simmo-tentacle)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path className="simmo-t simmo-t5" d="M78 72 Q82 90 88 105 Q90 112 85 113" stroke="url(#simmo-tentacle)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path className="simmo-t simmo-t6" d="M90 68 Q95 85 100 100 Q102 108 98 110" stroke="url(#simmo-tentacle)" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Corps */}
        <ellipse cx="60" cy="45" rx="35" ry="32" fill="url(#simmo-body)" />

        {/* Yeux */}
        <ellipse cx="46" cy="40" rx="8" ry="9" fill="white" />
        <ellipse cx="74" cy="40" rx="8" ry="9" fill="white" />
        <circle cx="48" cy="41" r="4" fill="#1a1a2e" />
        <circle cx="76" cy="41" r="4" fill="#1a1a2e" />
        {/* Reflets */}
        <circle cx="50" cy="39" r="1.5" fill="white" />
        <circle cx="78" cy="39" r="1.5" fill="white" />

        {/* Sourire */}
        <path d="M48 54 Q60 62 72 54" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Ventouses (petits cercles sur les tentacules) */}
        <circle cx="24" cy="92" r="2" fill="var(--brand-cta)" opacity="0.3" />
        <circle cx="36" cy="98" r="2" fill="var(--brand-cta)" opacity="0.3" />
        <circle cx="50" cy="100" r="2" fill="var(--brand-cta)" opacity="0.3" />
        <circle cx="70" cy="100" r="2" fill="var(--brand-cta)" opacity="0.3" />
        <circle cx="84" cy="98" r="2" fill="var(--brand-cta)" opacity="0.3" />
        <circle cx="96" cy="92" r="2" fill="var(--brand-cta)" opacity="0.3" />
      </svg>
    </div>
  );
}
