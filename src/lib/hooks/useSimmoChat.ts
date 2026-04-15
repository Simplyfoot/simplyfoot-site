'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { SIMO_MAX_HISTORY, SIMO_GREETING_DELAY_MS } from 'lib/constants';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

type SimmoVariant = 'foot' | 'rugby' | 'handball' | 'ecosystem';

const SUGGESTIONS_BY_PATH: Array<{ match: (p: string) => boolean; items: string[] }> = [
  { match: (p) => p === '/', items: ['Quel sport proposez-vous ?', 'Combien \u00e7a co\u00fbte ?', 'Comment \u00e7a marche ?', 'Je veux essayer gratuitement'] },
  { match: (p) => p.startsWith('/foot') && !p.includes('/blog'), items: ['Fonctionnalit\u00e9s foot ?', 'G\u00e9rer mes convocations ?', 'Tarif pour mon club ?', 'D\u00e9mo SimplyFoot'] },
  { match: (p) => p.startsWith('/rugby') && !p.includes('/blog'), items: ['Fonctionnalit\u00e9s rugby ?', 'Compositions XV ?', 'Tarif pour mon club ?', 'D\u00e9mo SimplyRugby'] },
  { match: (p) => p.startsWith('/handball') && !p.includes('/blog'), items: ['Fonctionnalit\u00e9s handball ?', 'Cr\u00e9neaux gymnase ?', 'Tarif pour mon club ?', 'D\u00e9mo SimplyHandball'] },
  { match: (p) => p.includes('/faq'), items: ['Comment cr\u00e9er mon compte ?', 'Comment rejoindre mon club ?', 'Comment envoyer des convocations ?', 'Parents s\u00e9par\u00e9s : comment faire ?'] },
  { match: (p) => p.includes('/blog'), items: ['Derniers articles ?', 'Filtrer par r\u00e9gion ?', 'Conseils pour mon club'] },
  { match: () => true, items: ['Qu\'est-ce que Simply ?', 'Combien \u00e7a co\u00fbte ?', 'Demander une d\u00e9mo'] },
];

/**
 * Hook qui encapsule toute la logique du chat Simmo :
 * gestion des messages, envoi via l'API, persistence session, suggestions.
 */
export function useSimmoChat() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getVariant = useCallback((): SimmoVariant => {
    if (pathname.startsWith('/foot')) return 'foot';
    if (pathname.startsWith('/rugby')) return 'rugby';
    if (pathname.startsWith('/handball')) return 'handball';
    return 'ecosystem';
  }, [pathname]);

  // Greeting bubble after 3s on first visit
  useEffect(() => {
    if (dismissed || isOpen) return;
    if (sessionStorage.getItem('simmo_greeted')) return;
    const t = setTimeout(() => { setShowGreeting(true); sessionStorage.setItem('simmo_greeted', '1'); }, SIMO_GREETING_DELAY_MS);
    return () => clearTimeout(t);
  }, [dismissed, isOpen]);

  // Load messages from session
  useEffect(() => {
    const stored = sessionStorage.getItem('simmo_messages');
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
        setHasInteracted(true);
      } catch {
        // Corrupted sessionStorage data — start fresh
      }
    }
  }, []);

  // Save messages
  useEffect(() => {
    if (messages.length > 0) sessionStorage.setItem('simmo_messages', JSON.stringify(messages.slice(-SIMO_MAX_HISTORY)));
  }, [messages]);

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  function openChat() {
    setIsOpen(true);
    setShowGreeting(false);
    if (messages.length === 0) {
      setMessages([{ id: 'welcome', role: 'assistant', content: "Salut ! Je suis Simo, le poulpe de Simply \uD83D\uDC19 Comment puis-je t'aider ?" }]);
    }
  }

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
      // Network error or API failure — show friendly message to user
      setMessages((prev) => [...prev, { id: `e-${Date.now()}`, role: 'assistant', content: "Oups ! Probl\u00e8me de connexion \uD83D\uDC19 R\u00e9essaie !" }]);
    } finally {
      setLoading(false);
    }
  }

  const suggestions = SUGGESTIONS_BY_PATH.find((s) => s.match(pathname))?.items ?? [];
  const isHidden = dismissed || pathname.startsWith('/admin');

  return {
    pathname,
    isOpen,
    setIsOpen,
    messages,
    input,
    setInput,
    loading,
    dismissed,
    setDismissed,
    showGreeting,
    setShowGreeting,
    hasInteracted,
    scrollRef,
    getVariant,
    openChat,
    sendMessage,
    suggestions,
    isHidden,
  };
}

export type { Message, SimmoVariant };
