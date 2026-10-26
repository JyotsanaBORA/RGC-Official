'use client';

import React from 'react';
import Link from 'next/link';

export default function MotionServices() {
  const categories = [
    {
      id: 'bpo-operations',
      index: '01',
      title: 'BPO & Customer Operations',
      boardTitle: 'BPO & IT OPERATIONS',
      domain: 'Omnichannel CX & Back-Office Scaling',
      tagline: '24/7 Floor Telemetry, Omnichannel CX & Back-Office',
      href: '/services/bpo-customer-service',
      capabilitiesHeader: 'CORE PRACTICE CAPABILITIES:',
      services: [
        'Customer Service',
        'Back Office',
        'Sales Support',
        'KYC / Operations',
        '24/7 Support',
      ],
      badge: 'DUAL-SHORE OUTSOURCING · 24/7 SLA',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      ),
    },
    {
      id: 'software-development',
      index: '02',
      title: 'Software Development & IT Solutions',
      boardTitle: 'SOFTWARE DEVELOPMENT',
      domain: 'AI, Modern Web, Custom APIs & Cloud',
      tagline: 'AI & Modern Web Engineering, APIs & Cloud',
      href: '/services/saas-digital-solutions',
      capabilitiesHeader: 'CORE PRACTICE CAPABILITIES:',
      services: [
        'Web Development',
        'AI & Automation',
        'SaaS & Applications',
        'APIs & Integrations',
        'Cloud',
      ],
      badge: 'AI & CLOUD-NATIVE · AGILE SPRINTS',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      ),
    },
    {
      id: 'accounting-finance',
      index: '03',
      title: 'Bookkeeping & Accounting',
      boardTitle: 'ACCOUNTING & FINANCE',
      domain: 'Audit-Ready Ledgers, Tax & Financial Reporting',
      tagline: 'Audit-Ready Ledgers, Reconciliation & Tax Support',
      href: '/services/bookkeeping-accountancy',
      capabilitiesHeader: 'CORE PRACTICE CAPABILITIES:',
      services: [
        'Bookkeeping',
        'Payroll & Compensation',
        'Reconciliation',
        'Tax Support',
        'Reporting',
      ],
      badge: 'AUDIT-READY COMPLIANCE · TIMELY BOOKS CLOSING',
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="svc-categories-container">
      <div className="svc-mono-grid">
        {categories.map((cat) => (
          <article key={cat.id} className="svc-mono-card">
            <Link
              href={cat.href}
              target="_blank"
              rel="noopener noreferrer"
              className="svc-mono-card__link"
              aria-label={`Explore ${cat.boardTitle} in new tab`}
            >
              {/* Card Ambient Highlight Glow on Hover */}
              <div className="svc-mono-card__glow" aria-hidden="true"></div>

              {/* Top Header Row: Icon + Index */}
              <div className="svc-mono-card__top">
                <div className="svc-mono-card__icon-box">
                  {cat.icon}
                </div>
                <div className="svc-mono-card__index-wrap">
                  <span className="svc-mono-card__brand">RGC PRACTICE</span>
                  <span className="svc-mono-card__num">{cat.index}</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="svc-mono-card__header">
                <h3 className="svc-mono-card__title">{cat.boardTitle}</h3>
                <p className="svc-mono-card__tagline">{cat.tagline}</p>
              </div>

              <div className="svc-mono-card__divider" aria-hidden="true"></div>

              {/* Capabilities Body */}
              <div className="svc-mono-card__body">
                <span className="svc-mono-card__sec-label">{cat.capabilitiesHeader}</span>
                <ul className="svc-mono-card__list">
                  {cat.services.map((svc, idx) => (
                    <li key={idx} className="svc-mono-card__item">
                      <span className="svc-mono-card__check" aria-hidden="true">
                        <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 8.5 6.5 12 13 4" />
                        </svg>
                      </span>
                      <span className="svc-mono-card__item-text">{svc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer: Micro Badge & CTA */}
              <div className="svc-mono-card__footer">
                <span className="svc-mono-card__badge">{cat.badge}</span>
                <span className="svc-mono-card__cta">
                  <span>Open</span>
                  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="3" y1="8" x2="13" y2="8" />
                    <polyline points="9 4 13 8 9 12" />
                  </svg>
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Advisory Callout Bar */}
      <div className="svc-advisory-bar reveal">
        <div>
          <h4 className="svc-advisory-bar__title">Need a custom multi-service operating model?</h4>
          <p className="svc-advisory-bar__desc">
            We engineer tailored hybrid frameworks combining dedicated BPO delivery, full-stack digital pipelines, and statutory compliance.
          </p>
        </div>
        <a href="#contact" className="btn btn--gold btn--sm">
          Get Custom Scoping &rarr;
        </a>
      </div>
    </div>
  );
}
