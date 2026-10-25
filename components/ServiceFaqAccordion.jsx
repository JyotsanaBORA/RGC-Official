'use client';

import { useState } from 'react';
import { trackMetaCustom, trackEvent } from '../lib/analytics/events';

const DEFAULT_FAQS = [
  {
    q: 'What is covered during the ₹99 Strategic Consultation?',
    a: 'You will meet 1-on-1 with a Senior Operations Director at Reddington Global. We evaluate your current operational workflows, diagnose bottlenecks, estimate cost-saving opportunities, and provide a tailored engagement blueprint with clear SLA benchmarks.',
  },
  {
    q: 'How quickly can our dedicated team or project be deployed?',
    a: 'Standard operational units (BPO, Bookkeeping, Customer Care) are mobilized within 3 to 7 business days. Custom engineering or specialized enterprise pods typically launch within 10 to 14 days, fully trained and integrated into your tech stack.',
  },
  {
    q: 'How does Reddington Global guarantee data privacy and security?',
    a: 'Every engagement is protected under a strict Mutual Non-Disclosure Agreement (NDA). All data transmission and storage follow ISO/IEC compliance protocols, role-based access restrictions, and dual-shore encrypted channels.',
  },
  {
    q: 'Will I receive an official tax invoice with GST input credit?',
    a: 'Yes. Upon completing your ₹99 booking, an automated GST-compliant tax invoice is generated instantly with our corporate PAN and GSTIN, emailed to your corporate address and downloadable anytime.',
  },
  {
    q: 'Can we scale our team capacity up or down dynamically?',
    a: 'Yes. Our dual-shore delivery model is built for operational elasticity. You can add seats, expand developer pods, or scale support shifts up or down as your business volume fluctuates, without overhead penalties.',
  },
];

export default function ServiceFaqAccordion({ service }) {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = service?.faqs && service.faqs.length > 0 ? service.faqs : DEFAULT_FAQS;

  const toggle = (idx) => {
    const isOpening = openIdx !== idx;
    setOpenIdx(isOpening ? idx : -1);

    if (isOpening && faqs[idx]) {
      trackMetaCustom('FaqQuestionViewed', {
        question: faqs[idx].q,
        service: service?.title || 'General',
      });
      trackEvent('faq_interaction', {
        question: faqs[idx].q,
        service: service?.title || 'General',
      });
    }
  };

  return (
    <div className="svc-faq-list">
      {faqs.map((item, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={i} className={`svc-faq-item ${isOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              className="svc-faq-question"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
            >
              <span className="svc-faq-question-text">{item.q}</span>
              <span className="svc-faq-icon">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="svc-faq-answer">
                <p>{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
