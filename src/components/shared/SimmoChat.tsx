'use client';

import { Send, X, Minus } from 'lucide-react';
import { Simmo } from './Simmo';
import { useSimmoChat } from 'lib/hooks/useSimmoChat';
import type { Message } from 'lib/hooks/useSimmoChat';

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

function ChatMessage({ msg, variant }: { msg: Message; variant: string }) {
  return (
    <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {msg.role === 'assistant' && (
        <div className="shrink-0 mr-2 mt-1">
          <Simmo size="xs" variant={variant as 'foot' | 'rugby' | 'handball' | 'ecosystem'} />
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
  );
}

export function SimmoChat() {
  const chat = useSimmoChat();

  if (chat.isHidden) return null;

  const variant = chat.getVariant();

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Closed state */}
      {!chat.isOpen && (
        <div className="relative">
          {chat.showGreeting && (
            <div className="absolute bottom-16 right-0 w-64 rounded-xl bg-white p-3 text-sm text-gray-800 shadow-xl">
              <button onClick={() => chat.setShowGreeting(false)} className="absolute top-1 right-2 text-gray-400 hover:text-gray-600 cursor-pointer" aria-label="Fermer">
                <X className="h-3 w-3" />
              </button>
              <p className="pr-4">Salut ! Je suis Simo &#x1f419; Besoin d&apos;un coup de tentacule ?</p>
              <button onClick={chat.openChat} className="mt-2 rounded-lg bg-[var(--brand-cta,#2563EB)] px-3 py-1.5 text-xs font-bold text-white hover:opacity-90 cursor-pointer">
                Discuter
              </button>
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white rotate-45" />
            </div>
          )}
          <button
            onClick={chat.openChat}
            className="group relative rounded-full bg-[var(--admin-surface)] border border-white/10 p-2 shadow-xl hover:scale-110 transition-transform cursor-pointer"
            aria-label="Ouvrir le chat Simo"
          >
            <Simmo size="sm" emotion="idle" variant={variant} />
            <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[var(--admin-surface)]" />
          </button>
        </div>
      )}

      {/* Open state */}
      {chat.isOpen && (
        <div className="flex flex-col w-[380px] h-[520px] max-sm:w-screen max-sm:h-[85vh] max-sm:fixed max-sm:bottom-0 max-sm:right-0 max-sm:rounded-none rounded-2xl border border-white/6 bg-[var(--admin-surface)] shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--admin-surface-alt)] border-b border-white/6">
            <div className="flex items-center gap-2.5">
              <Simmo size="xs" emotion={chat.loading ? 'thinking' : 'idle'} variant={variant} />
              <div>
                <span className="text-sm font-semibold text-white">Simmo</span>
                <span className="block text-[10px] text-emerald-400">En ligne</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => chat.setIsOpen(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 cursor-pointer" aria-label="R&#233;duire">
                <Minus className="h-4 w-4" />
              </button>
              <button onClick={() => chat.setDismissed(true)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 cursor-pointer" aria-label="Fermer">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={chat.scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {chat.messages.map((msg) => (
              <ChatMessage key={msg.id} msg={msg} variant={variant} />
            ))}

            {chat.loading && (
              <div className="flex items-center gap-2">
                <Simmo size="xs" emotion="thinking" variant={variant} />
                <div className="flex gap-1 bg-white/6 rounded-xl px-3 py-2.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                  ))}
                </div>
              </div>
            )}

            {!chat.hasInteracted && chat.messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {chat.suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => chat.sendMessage(s)}
                    className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:bg-white/8 hover:text-white transition-colors cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 bg-[var(--admin-surface-alt)] border-t border-white/6">
            <input
              type="text"
              value={chat.input}
              onChange={(e) => chat.setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); chat.sendMessage(chat.input); } }}
              placeholder="&#201;crire un message..."
              className="flex-1 rounded-xl bg-white/6 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none"
              disabled={chat.loading}
            />
            <button
              onClick={() => chat.sendMessage(chat.input)}
              disabled={!chat.input.trim() || chat.loading}
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
