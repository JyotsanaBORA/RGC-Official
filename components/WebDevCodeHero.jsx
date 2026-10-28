'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * "Code → website" hero for the Web Development page.
 * A code panel types itself out while a mini website builds alongside it.
 * Each line can reveal one part of the preview once it is fully typed.
 */
const LINES = [
  { tokens: [['tag', '<Site'], ['attr', ' name='], ['str', '"Sharma Dental Clinic"'], ['tag', '>']] },
  { tokens: [['pad', '  '], ['tag', '<Nav'], ['attr', ' links='], ['str', "{['Home','Services','Book']}"], ['tag', ' />']], reveal: 'nav' },
  { tokens: [['pad', '  '], ['tag', '<Hero'], ['attr', ' title='], ['str', '"Smile brighter, today."'], ['tag', ' />']], reveal: 'hero' },
  { tokens: [['pad', '  '], ['tag', '<Button'], ['attr', ' pay='], ['str', '"razorpay"'], ['tag', '>'], ['txt', 'Book visit'], ['tag', '</Button>']], reveal: 'cta' },
  { tokens: [['pad', '  '], ['tag', '<Services'], ['attr', ' grid='], ['str', '{3}'], ['tag', ' />']], reveal: 'cards' },
  { tokens: [['pad', '  '], ['tag', '<WhatsApp'], ['attr', ' leadAlerts'], ['tag', ' />']], reveal: 'wa' },
  { tokens: [['tag', '</Site>']] },
  { tokens: [['cmt', '$ deploy --prod'], ['ok', '  ✓ live']], reveal: 'live' },
];

const lineLength = (line) => line.tokens.reduce((n, [, text]) => n + text.length, 0);
const TOTAL = LINES.reduce((n, line) => n + lineLength(line), 0);
const CHARS_PER_TICK = 2;
const TICK_MS = 34;
const HOLD_MS = 4200;

export default function WebDevCodeHero() {
  const rootRef = useRef(null);
  const [typed, setTyped] = useState(0);
  const [inView, setInView] = useState(false);

  // Only animate while the panel is on screen; reduced motion shows the finished build.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(TOTAL);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    if (rootRef.current) io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return undefined;
    if (typed >= TOTAL) {
      const restart = setTimeout(() => setTyped(0), HOLD_MS);
      return () => clearTimeout(restart);
    }
    const tick = setTimeout(() => setTyped((t) => Math.min(TOTAL, t + CHARS_PER_TICK)), TICK_MS);
    return () => clearTimeout(tick);
  }, [inView, typed]);

  // Work out how much of each line is visible and which preview parts are done.
  let remaining = typed;
  const revealed = new Set();
  const visible = LINES.map((line) => {
    const len = lineLength(line);
    const shown = Math.max(0, Math.min(len, remaining));
    remaining -= len;
    if (shown === len && line.reveal) revealed.add(line.reveal);
    return shown;
  });
  const firstUnfinished = visible.findIndex((shown, i) => shown < lineLength(LINES[i]));
  const cursorLine = firstUnfinished === -1 ? LINES.length - 1 : firstUnfinished;
  const done = typed >= TOTAL;
  const on = (part) => (revealed.has(part) ? ' is-on' : '');

  return (
    <div className="wd-hero reveal" ref={rootRef} aria-label="Animated example: website code building a live website">
      <div className="wd-hero__glow" aria-hidden="true"></div>

      {/* Code editor */}
      <div className="wd-hero__editor" aria-hidden="true">
        <div className="wd-hero__chrome">
          <span></span><span></span><span></span>
          <em>site.jsx</em>
        </div>
        <pre className="wd-hero__code">
          {LINES.map((line, i) => {
            let left = visible[i];
            return (
              <div key={i} className="wd-hero__line">
                <span className="wd-hero__ln">{i + 1}</span>
                <code>
                  {line.tokens.map(([cls, text], t) => {
                    if (left <= 0) return null;
                    const part = text.slice(0, left);
                    left -= text.length;
                    return <span key={t} className={`tk-${cls}`}>{part}</span>;
                  })}
                  {!done && i === cursorLine && <span className="wd-hero__caret"></span>}
                </code>
              </div>
            );
          })}
        </pre>
      </div>

      {/* Live preview */}
      <div className="wd-hero__preview" aria-hidden="true">
        <div className="wd-hero__url">
          <span className="wd-hero__lock">🔒</span>
          <span>sharmadental.in</span>
          <span className={`wd-hero__live${on('live')}`}>● LIVE</span>
        </div>
        <div className="wd-hero__site">
          <div className={`wd-site__nav${on('nav')}`}>
            <b>Sharma Dental</b>
            <span>Home</span><span>Services</span><span>Book</span>
          </div>
          <div className={`wd-site__hero${on('hero')}`}>
            <h4>Smile brighter, today.</h4>
            <p>Gentle care · Gurugram</p>
          </div>
          <div className={`wd-site__cta${on('cta')}`}>Book visit →</div>
          <div className={`wd-site__cards${on('cards')}`}>
            <i>🦷<small>Cleaning</small></i>
            <i>✨<small>Whitening</small></i>
            <i>🩺<small>Check-up</small></i>
          </div>
          <div className={`wd-site__wa${on('wa')}`}>
            <span className="wd-site__wa-dot">💬</span>
            <span>New lead: Priya wants a check-up</span>
          </div>
        </div>
        <div className={`wd-hero__checks${on('live')}`}>
          <span>✓ Mobile ready</span>
          <span>✓ SEO</span>
          <span>✓ SSL</span>
          <span>✓ Payments</span>
        </div>
      </div>
    </div>
  );
}
