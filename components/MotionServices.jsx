import React from 'react';
import Link from 'next/link';
import { SERVICES } from '../lib/services-data';

const SERVICE_ICONS = {
  'bpo-sales': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  'bpo-backoffice': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 7V4a2 2 0 012-2h12a2 2 0 012 2v3M4 7h16M4 7v13a2 2 0 002 2h12a2 2 0 002-2V7M9 12h6M9 16h4" />
    </svg>
  ),
  'bpo-customer-service': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 18v-6a9 9 0 0118 0v6" />
      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
    </svg>
  ),
  'saas-digital-solutions': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  'bookkeeping-accountancy': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  'it-services': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  'digital-marketing': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
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
            <div className="service__badge-category">{svc.categoryName}</div>
            <h3>{svc.title}</h3>
            <p>{svc.tagline}</p>
            <span className="service__more" aria-hidden="true">Explore Dashboard &rarr;</span>
          </article>
        );
      })}

      {/* CTA card */}
      <article className="service service--cta reveal">
        <h3>Not sure where to begin?</h3>
        <p>Share your business objective, and we&apos;ll architect the right delivery model.</p>
        <a href="#contact" className="btn btn--gold btn--sm">Schedule Consultation</a>
      </article>
    </div>
  );
}
