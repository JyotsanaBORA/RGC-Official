'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Apple-style pinned scroll story: a browser frame stays in view while the
 * steps scroll past, and the mock site inside it changes at each stage.
 */
const STAGES = [
  {
    key: 'consult',
    step: 'Step 1',
    title: 'Book a ₹99 consultation',
    text: 'Pick a plan you like (or not sure yet) and book your 1-on-1 call. Our expert understands your business, goals and budget.',
  },
  {
    key: 'design',
    step: 'Step 2',
    title: 'Get your plan, design & quote',
    text: 'We recommend the right plan, timeline and price, then map out your pages and layout before a line of code is written.',
  },
  {
    key: 'build',
    step: 'Step 3',
    title: 'We build it, you review it',
    text: 'Your brand colours, content and integrations come to life. You get preview links and revisions along the way.',
  },
  {
    key: 'launch',
    step: 'Step 4',
    title: 'Go live & get found',
    text: 'Your site launches with SSL, Google and Maps listing and WhatsApp lead alerts, plus post-launch support.',
  },
];

export default function WebDevBuildStory() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const stage = STAGES[active].key;

  return (
    <section className="svc-journey-sec wd-story reveal" aria-labelledby="wd-story-title">
      <div className="svc-sec-head">
        <span className="eyebrow" style={{ color: '#10B981' }}>HOW WE BUILD</span>
        <h2 className="svc-sec-title" id="wd-story-title">From consultation to live site.</h2>
        <p className="svc-sec-sub">
          Your exact timeline is confirmed on the call. Basic sites can go live in as little as 10 days*.
        </p>
      </div>

      <div className="wd-story__grid">
        <ol className="wd-story__steps">
          {STAGES.map((s, i) => (
            <li
              key={s.key}
              ref={(el) => (stepRefs.current[i] = el)}
              data-index={i}
              className={`wd-story__step${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
            >
              <span className="wd-story__badge">{i < active ? '✓' : i + 1}</span>
              <div>
                <small>{s.step}</small>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="wd-story__pin">
          <div className="wd-story__frame" data-stage={stage} aria-hidden="true">
            <div className="wd-story__bar">
              <span></span><span></span><span></span>
              <em>
                {stage === 'launch' ? '🔒 yourbusiness.in' : stage === 'consult' ? 'consultation call' : 'preview.reddingtonglobal.com'}
              </em>
            </div>

            <div className="wd-story__screen">
              {/* Mock site: dashed wireframe at "design", solid at "build" and "launch" */}
              <div className="wd-mock">
                <div className="wd-mock__nav"><i></i><i></i><i></i><i></i></div>
                <div className="wd-mock__hero">
                  <b></b><b></b><span></span>
                </div>
                <div className="wd-mock__cards"><i></i><i></i><i></i></div>
              </div>

              {/* Stage 1 overlay: the consultation call */}
              <div className="wd-call">
                <div className="wd-call__ring">📞</div>
                <strong>Expert call booked</strong>
                <small>1-on-1 · ₹99 consultation</small>
                <div className="wd-call__chips">
                  <span>Scope</span><span>Plan</span><span>ETA</span><span>Quote</span>
                </div>
              </div>

              {/* Stage 3 overlay: code chips */}
              <div className="wd-build-tags">
                <span>&lt;/&gt; Next.js</span><span>Razorpay</span><span>WhatsApp API</span>
              </div>

              {/* Stage 4 overlay: live results */}
              <div className="wd-live">
                <div className="wd-live__google">
                  <small>Google</small>
                  <strong>Your Business · Gurugram</strong>
                  <span>★★★★★ · Open now</span>
                </div>
                <div className="wd-live__toast">💬 New enquiry on WhatsApp</div>
              </div>
            </div>

            <div className="wd-story__progress">
              {STAGES.map((s, i) => (
                <span key={s.key} className={i <= active ? 'is-on' : ''}></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
