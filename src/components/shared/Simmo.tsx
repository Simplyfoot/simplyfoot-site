'use client';

import { useEffect, useState } from 'react';
import { cn } from 'lib/utils/cn';

type SimmoEmotion = 'idle' | 'wave' | 'thinking' | 'celebrate' | 'surprise' | 'encourage' | 'sleep';

interface SimmoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  emotion?: SimmoEmotion;
  variant?: 'foot' | 'rugby' | 'handball' | 'ecosystem';
  message?: string;
  onClick?: () => void;
  className?: string;
}

const SIZES = { xs: 32, sm: 48, md: 80, lg: 120, xl: 200 };

const COLORS: Record<string, [string, string]> = {
  foot: ['#1B5E20', '#4CAF50'],
  rugby: ['#8B1A1A', '#C62828'],
  handball: ['#1A237E', '#3F51B5'],
  ecosystem: ['#2E7D32', '#4CAF50'],
};

const MOUTHS: Record<SimmoEmotion, string> = {
  idle: 'M48 56 Q60 63 72 56',
  wave: 'M48 56 Q60 64 72 56',
  thinking: 'M52 58 Q60 56 68 58',
  celebrate: 'M46 54 Q60 68 74 54',
  surprise: 'M55 55 Q60 62 65 55',
  encourage: 'M48 56 Q60 64 72 56',
  sleep: 'M52 58 Q60 56 68 58',
};

export function Simmo({ size = 'md', emotion = 'idle', variant = 'ecosystem', message, onClick, className }: SimmoProps) {
  const dim = SIZES[size];
  const [c1, c2] = COLORS[variant] ?? COLORS.ecosystem;
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  const eyeScaleY = blinking || emotion === 'sleep' ? 0.1 : 1;

  return (
    <div role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(); } : undefined} className={cn('simmo-mascot inline-flex flex-col items-center gap-2', className)} onClick={onClick} style={{ cursor: onClick ? 'pointer' : undefined }}>
      {message && (
        <div className="relative rounded-xl bg-white px-3 py-2 text-xs font-medium text-gray-800 shadow-lg max-w-[200px] text-center">
          {message}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45" />
        </div>
      )}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: dim, height: dim }}
        aria-label="Simmo, la mascotte Simply"
        role="img"
      >
        <defs>
          <linearGradient id={`simmo-grad-${variant}`} x1="60" y1="15" x2="60" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor={c2} />
            <stop offset="1" stopColor={c1} />
          </linearGradient>
        </defs>

        {/* Tentacles */}
        {[
          'M30 68 Q25 85 20 100 Q18 108 22 110',
          'M42 72 Q38 90 32 105 Q30 112 35 113',
          'M54 74 Q52 92 48 108 Q47 115 52 115',
          'M66 74 Q68 92 72 108 Q73 115 68 115',
          'M78 72 Q82 90 88 105 Q90 112 85 113',
          'M90 68 Q95 85 100 100 Q102 108 98 110',
        ].map((d, i) => (
          <path
            key={i}
            className="simmo-t"
            d={d}
            stroke={`url(#simmo-grad-${variant})`}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}

        {/* Ventouses */}
        {[[24, 92], [36, 98], [50, 100], [70, 100], [84, 98], [96, 92]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2" fill={c2} opacity="0.3" />
        ))}

        {/* Body */}
        <ellipse cx="60" cy="45" rx="35" ry="32" fill={`url(#simmo-grad-${variant})`} />

        {/* Eyes */}
        <g style={{ transform: `scaleY(${eyeScaleY})`, transformOrigin: '60px 40px', transition: 'transform 0.1s' }}>
          <ellipse cx="46" cy="40" rx="8" ry="9" fill="white" />
          <ellipse cx="74" cy="40" rx="8" ry="9" fill="white" />
          <circle cx="48" cy="41" r="4" fill="#1a1a2e" />
          <circle cx="76" cy="41" r="4" fill="#1a1a2e" />
          <circle cx="50" cy="39" r="1.5" fill="white" />
          <circle cx="78" cy="39" r="1.5" fill="white" />
        </g>

        {/* Mouth */}
        <path d={MOUTHS[emotion]} stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Celebrate stars */}
        {emotion === 'celebrate' && (
          <>
            <circle cx="25" cy="25" r="2" fill={c2} opacity="0.6" />
            <circle cx="95" cy="20" r="1.5" fill={c2} opacity="0.5" />
            <circle cx="15" cy="50" r="1" fill={c2} opacity="0.4" />
            <circle cx="105" cy="55" r="1.5" fill={c2} opacity="0.4" />
          </>
        )}

        {/* Sleep ZzZ */}
        {emotion === 'sleep' && (
          <text x="85" y="25" fill="white" fontSize="12" fontWeight="bold" opacity="0.5">Z</text>
        )}
      </svg>
    </div>
  );
}
