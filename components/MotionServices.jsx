'use client';

import React from 'react';
import Link from 'next/link';

export default function MotionServices() {
  const categories = [
    {
      id: 'bpo-operations',
      title: 'BPO & Customer Operations',
      boardTitle: 'BPO & IT OPERATIONS',
      domain: 'Omnichannel CX & Back-Office Scaling',
      tagline: '24/7 Floor Telemetry, Omnichannel CX & Back-Office',
      colorTheme: 'bpo',
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
    },
    {
      id: 'software-development',
      title: 'Software Development & IT Solutions',
      boardTitle: 'SOFTWARE DEVELOPMENT',
      domain: 'Modern Web, Custom APIs & Cloud',
      tagline: 'Modern Web Engineering, Custom APIs & Cloud',
      colorTheme: 'software',
      href: '/services/saas-digital-solutions',
      capabilitiesHeader: 'CORE PRACTICE CAPABILITIES:',
      services: [
        'Web / SaaS',
        'Applications',
        'APIs',
        'Integrations',
        'Cloud',
      ],
      badge: 'CLOUD-NATIVE ARCHITECTURE · AGILE SPRINTS',
    },
    {
      id: 'accounting-finance',
      title: 'Bookkeeping & Accounting',
      boardTitle: 'ACCOUNTING & FINANCE',
      domain: 'Audit-Ready Ledgers, Tax & Financial Reporting',
      tagline: 'Audit-Ready Ledgers, Reconciliation & Tax Support',
      colorTheme: 'accounting',
      href: '/services/bookkeeping-accountancy',
      capabilitiesHeader: 'CORE PRACTICE CAPABILITIES:',
      services: [
        'Bookkeeping',
        'Accounting',
        'Reconciliation',
        'Tax Support',
        'Reporting',
      ],
      badge: 'ZERO-PENALTY GUARANTEE · 5TH OF MO. CLOSING',
    },
  ];

  return (
    <div className="svc-categories-container">
      <div className="svc-categories-grid">
        {categories.map((cat) => (
          <article key={cat.id} className="svc-cat-card reveal">
            <Link
              href={cat.href}
              target="_blank"
              rel="noopener noreferrer"
              className="svc-cat-card__link-wrap"
              aria-label={`Explore ${cat.title} in new tab`}
            >
              {/* Signature Architectural Totem Board */}
              <div className={`svc-board svc-board--${cat.colorTheme}`}>
                <div className="svc-board__frame">
                  <span className="svc-board__rivet svc-board__rivet--tl" aria-hidden="true"></span>
                  <span className="svc-board__rivet svc-board__rivet--tr" aria-hidden="true"></span>
                  <span className="svc-board__rivet svc-board__rivet--bl" aria-hidden="true"></span>
                  <span className="svc-board__rivet svc-board__rivet--br" aria-hidden="true"></span>

                  <div className="svc-board__faceplate">
                    <div className="svc-board__header">
                      <span className="svc-board__brand">REDDINGTON GLOBAL CONSULTANCY</span>
                    </div>

                    <div className="svc-board__divider" aria-hidden="true"></div>

                    <div className="svc-board__hero">
                      <h3 className="svc-board__title">{cat.boardTitle}</h3>
                      <p className="svc-board__tagline">{cat.tagline}</p>
                    </div>

                    <div className="svc-board__body">
                      <div className="svc-board__sec-label">{cat.capabilitiesHeader}</div>
                      <ul className="svc-board__list">
                        {cat.services.map((svc, idx) => (
                          <li key={idx} className="svc-board__item">
                            <span className="svc-board__bullet" aria-hidden="true">•</span>
                            <span className="svc-board__item-text">{svc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="svc-board__footer">
                      <div className="svc-board__divider svc-board__divider--bottom" aria-hidden="true"></div>
                      <div className="svc-board__footer-row">
                        <span className="svc-board__badge">{cat.badge}</span>
                        <span className="svc-board__action-pill">Open &rarr;</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clean Stacked Caption: Zero Overlap */}
              <div className="svc-cat-card__caption">
                <h4 className="svc-cat-card__title">{cat.title}</h4>
                <p className="svc-cat-card__domain">{cat.domain}</p>
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
