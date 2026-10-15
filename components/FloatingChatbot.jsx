'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const QUICK_PROMPTS = [
  'What BPO services do you provide?',
  'Tell me about your AI & SaaS solutions',
  'How does Bookkeeping & Accounting work?',
  'How do I book a consultation?',
];

export default function FloatingChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I am Reddington Global's AI Assistant. Ask me anything about our BPO operations, AI & Software solutions, or Accounting services.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Hide on invoice download pages and admin portal
  if (pathname?.startsWith('/invoice') || pathname?.startsWith('/admin')) {
    return null;
  }

  const sendMessage = async (textToSend) => {
    const userText = (textToSend || input).trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (data.message) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Sorry, I encountered an issue. Please reach out to sales@reddingtonglobal.com or try again.',
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Unable to reach the assistant right now. You can email sales@reddingtonglobal.com.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="floating-chat-container">
      {/* Floating launcher button directly above WhatsApp */}
      <button
        type="button"
        className={`floating-ai-btn ${isOpen ? 'is-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Reddington AI Assistant"
        id="floatingChatLauncher"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
          <rect x="3" y="8" width="18" height="12" rx="4"/>
          <circle cx="8" cy="14" r="1.5" fill="currentColor"/>
          <circle cx="16" cy="14" r="1.5" fill="currentColor"/>
          <path d="M9 18h6"/>
        </svg>
        <span>{isOpen ? 'Close' : 'Ask AI'}</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="floating-chat-window" role="dialog" aria-label="AI Chatbot">
          {/* Header */}
          <div className="floating-chat-header">
            <div className="floating-chat-header-info">
              <div className="floating-chat-avatar">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </div>
              <div>
                <div className="floating-chat-title">Reddington AI</div>
                <div className="floating-chat-status">
                  <span className="floating-chat-status-dot"></span> Online
                </div>
              </div>
            </div>
            <button
              type="button"
              className="floating-chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="floating-chat-messages">
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-bubble-row ${m.role === 'user' ? 'is-user' : 'is-assistant'}`}>
                <div className="chat-bubble">{m.content}</div>
              </div>
            ))}

            {loading && (
              <div className="chat-bubble-row is-assistant">
                <div className="chat-bubble chat-bubble-loading">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            {/* Quick starter chips */}
            {messages.length === 1 && !loading && (
              <div className="chat-quick-chips">
                <div className="chat-chips-label">Popular queries:</div>
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    type="button"
                    className="chat-chip-btn"
                    onClick={() => sendMessage(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form className="floating-chat-footer" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our services..."
              className="floating-chat-input"
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className="floating-chat-send"
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
