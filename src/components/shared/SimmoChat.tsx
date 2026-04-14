'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Send, X, Minus } from 'lucide-react';
import { Simmo } from './Simmo';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS_BY_PATH: Array<{ match: (p: string) => boolean; items: string[] }> = [
  { match: (p) => p === '/', items: ['Quel sport proposez-vous ?', 'Combien \u00e7a co\u00fbte ?', 'Comment \u00e7a marche ?', 'Je veux essayer gratuitement'] },
  { match: (p) => p.startsWith('/foot') && !p.includes('/blog'), items: ['Fonctionnalit\u00e9s foot ?', 'G\u00e9rer mes convocations ?', 'Tarif pour mon club ?', 'D\u00e9mo SimplyFoot'] },
  { match: (p) => p.startsWith('/rugby') && !p.includes('/blog'), items: ['Fonctionnalit\u00e9s rugby ?', 'Compositions XV ?', 'Tarif pour mon club ?', 'D\u00e9mo SimplyRugby'] },
  { match: (p) => p.startsWith('/handball') && !p.includes('/blog'), items: ['Fonctionnalit\u00e9s handball ?', 'Cr\u00e9neaux gymnase ?', 'Tarif pour mon club ?', 'D\u00e9mo SimplyHandball'] },
  { match: (p) => p.includes('/blog'), items: ['Derniers articles ?', 'Filtrer par r\u00e9gion ?', 'Conseils pour mon club'] },
  { match: () => true, items: ['Qu\'est-ce que Simply ?', 'Combien \u00e7a co\u00fbte ?', 'Demander une d\u00e9mo'] },
];

function renderContent(content: string) {
  const parts = content.split(/(\[[^\]]*\]\([^)]*\))/g);
  return parts.map((part, i) => {
    const m = part.match(/\[([^\]]*)\]\(([^)]*)\)/);
    if (m) {
      return (
        <a key={i} href={m[2]} className="text-[var(--brand-cta,#60a5fa)] underline underline-offset-2 hover:opacity-80">
          {m[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function SimmoChat() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getVariant = useCallback(() => {
    if (pathname.startsWith('/foot')) return 'foot' as const;
    if (pathname.startsWith('/rugby')) return 'rugby' as const;
    if (pathname.startsWith('/handball')) return 'handball' as const;
    return 'ecosystem' as const;
  }, [pathname]);

  // Greeting bubble after 3s on first visit
  useEffect(() => {
    if (dismissed || isOpen) return;
    if (sessionStorage.getItem('simmo_greeted')) return;
    const t = setTimeout(() => { setShowGreeting(true); sessionStorage.setItem('simmo_greeted', '1'); }, 3000);
    return () => clearTimeout(t);
  }, [dismissed, isOpen]);

  // Load messages from session
  useEffect(() => {
    const stored = sessionStorage.getItem('simmo_messages');
    if (stored) {
      try { setMessages(JSON.parse(stored)); setHasInteracted(true); } catch { /* ignore */ }
    }
  }, []);

  // Save messages
  useEffect(() => {
    if (messages.length > 0) sessionStorage.setItem('simmo_messages', JSON.stringify(messages.slice(-50)));
  }, [messages]);

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  // Open chat with welcome
  function openChat() {
    setIsOpen(true);
    setShowGreeting(false);
    if (messages.length === 0) {
      setMessages([{ id: 'welcome', role: 'assistant', content: "Salut ! Je suis Simmo, le poulpe de Simply \uD83D\uDC19 Comment puis-je t'aider ?" }]);
    }
  }

  // Send message
  async function sendMessage(content: string) {
    if (!content.trim() || loading) return;
    setHasInteracted(true);

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: content.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/simmo-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.filter((m) => m.id !== 'welcome').map((m) => ({ role: m.role, content: m.content })),
          brand: getVariant() === 'ecosystem' ? undefined : getVariant(),
          page: pathname,
        }),
      });

      const data = await res.json();
      const assistantMsg: Message = { id: `a-${Date.now()}`, role: 'assistant', content: data.message || "D\u00e9sol\u00e9, je n'ai pas pu r\u00e9pondre." };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [...prev, { id: `e-${Date.now()}`, role: 'assistant', content: "Oups ! Probl\u00e8me de connexion \uD83D\uDC19 R\u00e9essaie !" }]);
    } finally {
      setLoading(false);
    }
  }

  const suggestions = SUGGESTIONS_BY_PATH.find((s) => s.match(pathname))?.items ?? [];

  if (dismissed) return null;

  // Admin pages: no chat
  if (pathname.startsWith('/admin')) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Closed state */}
      {!isOpen && (
        <div className="relative">
          {showGreeting && (
            <div className="absolute bottom-16 right-0 w-64 rounded-xl bg-white p-3 text-sm text-gray-800 shadow-xl">
              <button onClick={() => setShowGreeting(false)} className="absolute top-1 right-2 text-gray-400 hover:text-gray-600 cursor-pointer" aria-label="Fermer">
                <X className="h-3 w-3" />
              </button>
              <p className="pr-4">Salut ! Je suis Simmo \uD83D\uDC19 Besoin d&apos;un coup de tentacule ?</p>
              <button onClick={openChat} className="mt-2 rounded-lg bg-[var(--brand-cta,#2563EB)] px-3 py-1.5 text-xs font-bold text-white hover:opacity-90 cursor-pointer">
                Discuter
              </button>
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white rotate-45" />
            </div>
          )}
          <button
            onClick={openChat}
            className="group relative rounded-full bg-[#111113] border border-white/10 p-2 shadow-xl hover:scale-110 transition-transform cursor-pointer"
            aria-label="Ouvrir le chat Simmo"
          >
            <Simmo size="sm" emotion="idle" variant={getVariant()} />
            <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#111113]" />
          </button>
        </div>
      )}

      {/* Open state */}
      {isOpen && (
        <div className="flex flex-col w-[380px] h-[520px] max-sm:w-screen max-sm:h-[85vh] max-sm:fixed max-sm:bottom-0 max-sm:right-0 max-sm:rounded-none rounded-2xl border border-white/6 bg-[#111113] shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0c] border-b border-white/6">
            <div className="flex items-center gap-2.5">
              <Simmo size="xs" emotion={loading ? 'thinking' : 'idle'} variant={getVariant()} />
              <div>
                <span className="text-sm font-semibold text-white">Simmo</span>
                <span className="block text-[10px] text-emerald-400">En ligne</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 cursor-pointer" aria-label="R\u00e9duire">
                <Minus className="h-4 w-4" />
              </button>
              <button onClick={() => setDismissed(true)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 cursor-pointer" aria-label="Fermer">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="shrink-0 mr-2 mt-1">
                    <Simmo size="xs" variant={getVariant()} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[var(--brand-cta,#2563EB)] text-white rounded-[16px_4px_16px_16px]'
                      : 'bg-white/6 text-white/90 rounded-[4px_16px_16px_16px]'
                  }`}
                >
                  {msg.role === 'assistant' ? renderContent(msg.content) : msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-center gap-2">
                <Simmo size="xs" emotion="thinking" variant={getVariant()} />
                <div className="flex gap-1 bg-white/6 rounded-xl px-3 py-2.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {!hasInteracted && messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:bg-white/8 hover:text-white transition-colors cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 bg-[#0a0a0c] border-t border-white/6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder="\u00c9crire un message..."
              className="flex-1 rounded-xl bg-white/6 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none"
              disabled={loading}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="rounded-xl bg-[var(--brand-cta,#2563EB)] p-2.5 text-white disabled:opacity-30 hover:opacity-90 transition-opacity cursor-pointer"
              aria-label="Envoyer"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
