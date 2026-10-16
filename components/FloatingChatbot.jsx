'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const QUICK_PROMPTS = [
  'What 24/7 BPO & Customer Support services do you provide?',
  'Can you build custom AI agents & Web applications?',
  'How does audit-ready Bookkeeping & Tax compliance work?',
  'Tell me about Payroll & Compensation management',
  'How do BPO Partnerships & Campaign opportunities work?',
  'How do I book a ₹99 strategy consultation?',
];

function formatInline(text) {
  if (!text) return '';
  const tokens = [];
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.substring(lastIndex, match.index));
    }
    const val = match[0];
    if (val.startsWith('**') && val.endsWith('**')) {
      tokens.push(<strong key={match.index}>{val.slice(2, -2)}</strong>);
    } else if (val.startsWith('[') && val.includes('](')) {
      const linkText = val.slice(1, val.indexOf(']('));
      const linkUrl = val.slice(val.indexOf('](') + 2, -1);
      tokens.push(
        <a key={match.index} href={linkUrl} target="_blank" rel="noopener noreferrer">
          {linkText}
        </a>
      );
    } else if (val.includes('@')) {
      tokens.push(
        <a key={match.index} href={`mailto:${val}`}>
          {val}
        </a>
      );
    } else {
      const cleanUrl = val.replace(/[.,;:!?]+$/, '');
      const trailingPunctuation = val.slice(cleanUrl.length);
      tokens.push(
        <a key={match.index} href={cleanUrl} target="_blank" rel="noopener noreferrer">
          {cleanUrl}
        </a>
      );
      if (trailingPunctuation) {
        tokens.push(trailingPunctuation);
      }
    }
    lastIndex = match.index + val.length;
  }

  if (lastIndex < text.length) {
    tokens.push(text.substring(lastIndex));
  }

  return tokens.length > 0 ? tokens : text;
}

function ChatMessageContent({ content }) {
  if (!content) return null;

  const normalized = content
    .replace(/\r\n/g, '\n')
    .replace(/([.!?])\s+(\*\*[A-Z][^*]+\*\*)/g, '$1\n\n$2\n')
    .replace(/\s*[•●]\s*/g, '\n• ')
    .replace(/(\*\*[A-Z][^*]+\*\*)\s+(•|\*\*)/g, '$1\n$2');

  const rawLines = normalized.split('\n').map((l) => l.trim()).filter(Boolean);

  const elements = [];
  let currentList = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="chat-bubble-list">
          {currentList.map((item, i) => (
            <li key={i}>{formatInline(item)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  rawLines.forEach((line, idx) => {
    if (line.startsWith('•') || line.startsWith('- ') || line.startsWith('* ')) {
      const cleanItem = line.replace(/^[•\-\*]\s*/, '');
      currentList.push(cleanItem);
      return;
    }

    flushList();

    const headingMatch = line.match(/^\*\*([^*]+)\*\*:?$/);
    if (headingMatch && headingMatch[1].length < 75) {
      elements.push(
        <div key={`heading-${idx}`} className="chat-bubble-heading">
          {headingMatch[1]}
        </div>
      );
      return;
    }

    elements.push(
      <p key={`p-${idx}`} className="chat-bubble-p">
        {formatInline(line)}
      </p>
    );
  });

  flushList();

  // Extract service/contact URL to render a dedicated, one-tap payment/dashboard button
  const serviceUrlMatch = content.match(/https?:\/\/[^\s)]+(?:\/services\/[a-z0-9-]+|\/contact|\/bpo-partnerships)/i);
  if (serviceUrlMatch) {
    const matchedUrl = serviceUrlMatch[0].replace(/[.,;:!?]+$/, '');
    const localHref = matchedUrl.replace(/^https?:\/\/(?:www\.)?reddingtonglobal\.com/, '');
    let btnLabel = 'Go to Payment & Dashboard →';
    if (matchedUrl.includes('saas-digital-solutions')) {
      btnLabel = 'Open Web & AI Dashboard (₹99 Form) →';
    } else if (matchedUrl.includes('bookkeeping-accountancy')) {
      btnLabel = 'Open Bookkeeping Dashboard (₹99 Form) →';
    } else if (matchedUrl.includes('payroll-compensation')) {
      btnLabel = 'Open Payroll Dashboard (₹99 Form) →';
    } else if (matchedUrl.includes('bpo-customer-service')) {
      btnLabel = 'Open Customer Support Dashboard →';
    } else if (matchedUrl.includes('bpo-sales')) {
      btnLabel = 'Open BPO Sales Dashboard →';
    } else if (matchedUrl.includes('bpo-backoffice')) {
      btnLabel = 'Open Back Office Dashboard →';
    } else if (matchedUrl.includes('bpo-partnerships')) {
      btnLabel = 'Open BPO Partnerships Form →';
    } else if (matchedUrl.includes('digital-marketing')) {
      btnLabel = 'Open Digital Marketing Dashboard →';
    } else if (matchedUrl.includes('recruitment-hiring')) {
      btnLabel = 'Open Recruitment Dashboard →';
    } else if (matchedUrl.includes('contact')) {
      btnLabel = 'Open ₹99 Consultation Form →';
    }

    elements.push(
      <div key="action-cta-wrap" className="chat-bubble-cta-wrap">
        <a href={localHref || matchedUrl} className="chat-bubble-cta">
          {btnLabel}
        </a>
      </div>
    );
  }

  return <>{elements}</>;
}

export default function FloatingChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I am Reddington Global's Enterprise Solutions Advisor for BPO, Software & AI, and Bookkeeping services.\nWhich service area or operational challenge can I help scale for your business today?",
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
                <div className="chat-bubble">
                  <ChatMessageContent content={m.content} />
                </div>
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
