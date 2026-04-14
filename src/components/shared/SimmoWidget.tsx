'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { Simmo } from './Simmo';

type SimmoEmotion = 'idle' | 'wave' | 'thinking' | 'celebrate' | 'surprise' | 'encourage' | 'sleep';

interface SimmoMessage {
  emotion: SimmoEmotion;
  text: string;
  autoDismiss: number;
}

const PAGE_MESSAGES: Array<{ match: (p: string) => boolean; msg: SimmoMessage }> = [
  { match: (p) => p === '/', msg: { emotion: 'wave', text: 'Bienvenue dans l\u2019univers Simply ! Explorez nos 3 sports \uD83D\uDC19', autoDismiss: 6000 } },
  { match: (p) => p === '/foot', msg: { emotion: 'encourage', text: 'Bienvenue chez SimplyFoot ! D\u00e9couvrez comment g\u00e9rer votre club \u26BD', autoDismiss: 5000 } },
  { match: (p) => p === '/rugby', msg: { emotion: 'encourage', text: 'Bienvenue chez SimplyRugby ! Votre pack m\u00e9rite un outil \u00e0 sa hauteur \uD83C\uDFC9', autoDismiss: 5000 } },
  { match: (p) => p === '/handball', msg: { emotion: 'encourage', text: 'Bienvenue chez SimplyHandball ! Pr\u00e9cis sur le parquet, pr\u00e9cis dans la gestion \uD83E\uDD3E', autoDismiss: 5000 } },
  { match: (p) => p.includes('/offres'), msg: { emotion: 'idle', text: 'S\u00e9lectionnez la taille de votre club pour voir votre tarif \uD83C\uDF81', autoDismiss: 6000 } },
  { match: (p) => p.includes('/contact'), msg: { emotion: 'encourage', text: 'Notre \u00e9quipe r\u00e9pond en moins de 24h ! \uD83D\uDCAC', autoDismiss: 5000 } },
  { match: (p) => p.startsWith('/admin/dashboard'), msg: { emotion: 'wave', text: 'Bonjour Damien ! Voici votre tableau de bord \uD83D\uDCCA', autoDismiss: 5000 } },
];

export function SimmoWidget() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  const [message, setMessage] = useState<SimmoMessage | null>(null);
  const [showBubble, setShowBubble] = useState(false);

  const getVariant = useCallback(() => {
    if (pathname.startsWith('/foot')) return 'foot' as const;
    if (pathname.startsWith('/rugby')) return 'rugby' as const;
    if (pathname.startsWith('/handball')) return 'handball' as const;
    return 'ecosystem' as const;
  }, [pathname]);

  useEffect(() => {
    if (dismissed) return;

    const match = PAGE_MESSAGES.find((pm) => pm.match(pathname));
    if (match) {
      const timer = setTimeout(() => {
        setMessage(match.msg);
        setShowBubble(true);

        if (match.msg.autoDismiss > 0) {
          setTimeout(() => setShowBubble(false), match.msg.autoDismiss);
        }
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setMessage(null);
      setShowBubble(false);
    }
  }, [pathname, dismissed]);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        className="absolute -top-2 -right-1 z-10 rounded-full bg-black/50 p-1 text-white/40 hover:text-white hover:bg-black/80 transition-colors cursor-pointer"
        aria-label="Fermer Simmo"
      >
        <X className="h-3 w-3" />
      </button>

      <Simmo
        size="sm"
        emotion={showBubble && message ? message.emotion : 'idle'}
        variant={getVariant()}
        message={showBubble && message ? message.text : undefined}
        onClick={() => {
          if (message) setShowBubble(!showBubble);
        }}
        className="hover:scale-110 transition-transform"
      />
    </div>
  );
}
