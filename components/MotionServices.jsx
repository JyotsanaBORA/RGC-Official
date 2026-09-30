import React from 'react';
import Link from 'next/link';
import { SERVICES } from '../lib/services-data';

const SERVICE_ICONS = {
  'recruitment': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
      <path d="M16 3.5a3.5 3.5 0 010 7M18.5 13.7c1.8 1 3 2.9 3 5.1" />
    </svg>
  ),
  'immergix-bpo': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
    </svg>
  ),
  'performance-management-consultancy': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 20h18M6 20V10m6 10V4m6 16v-7" />
    </svg>
  ),
  'payroll-compensation-management': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  'saas-digital-solutions': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  'bookkeeping-statutory-compliance': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

export default function MotionServices() {
  return (
    <div className="services__grid">
      {SERVICES.map((svc) => {
        const href = `/services/${svc.slug}`;
        const icon = SERVICE_ICONS[svc.slug] || (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
          </svg>
        );

        return (
          <article key={svc.slug} className="service reveal">
            <Link href={href} className="service__link" aria-label={`Learn more about ${svc.title}`}></Link>
            <figure className="service__img">
              <img
                src={svc.image}
                alt={svc.title}
                loading="lazy"
              />
            </figure>
            <div className="service__icon" aria-hidden="true">
              {icon}
            </div>
            <h3>{svc.title}</h3>
            <p>{svc.tagline}</p>
            <span className="service__more" aria-hidden="true">Learn more &rarr;</span>
          </article>
        );
      })}

      {/* CTA card */}
      <article className="service service--cta reveal">
        <h3>Not sure where to begin?</h3>
        <p>Share your objective, and we&apos;ll recommend the right delivery model.</p>
        <a href="#contact" className="btn btn--gold btn--sm">Talk to Us</a>
      </article>
    </div>
  );
}
