'use client';

import React from 'react';
import Link from 'next/link';

export default function MotionServices() {
  const categories = [
    {
      id: 'bpo',
      title: 'BPO Services',
      boardTitle: 'BPO SERVICES',
      domain: '24/7 Operations / Delivery',
      tagline: '24/7 Mission-Critical Delivery & CX',
      colorTheme: 'bpo',
      href: '/services/bpo-sales',
      capabilitiesHeader: 'SERVICES & CAPABILITIES:',
      services: [
        'Sales & Revenue Operations',
        'Back-Office Operations',
        'Customer Services & Support',
        'Omnichannel CX Floor',
      ],
      badge: 'DUAL-SHORE OUTSOURCING · ENTERPRISE SLA',
    },
    {
      id: 'consultancy',
      title: 'Consultancy Services',
      boardTitle: 'CONSULTANCY SERVICES',
      domain: 'SaaS, Finance & Tax',
      tagline: 'SaaS, Finance & Statutory Advisory',
      colorTheme: 'consultancy',
      href: '/services/saas-digital-solutions',
      capabilitiesHeader: 'SERVICES & CAPABILITIES:',
      services: [
        'SaaS & Digital Solutions',
        'Bookkeeping & Accountancy',
        'Digital Marketing & Growth',
        'Payroll & Compensation',
        'Performance Management',
      ],
      badge: 'STATUTORY COMPLIANCE: MCA & GSTIN',
    },
    {
      id: 'recruitment',
      title: 'Recruitment & Staffing',
      boardTitle: 'RECRUITMENT & STAFFING',
      domain: 'Talent & Headhunting',
      tagline: 'Precision Talent & Search',
      colorTheme: 'recruitment',
      href: '/services/recruitment-hiring',
      capabilitiesHeader: 'SERVICES & CAPABILITIES:',
      services: [
        'Recruitment & Hiring',
        'Workforce Staffing',
        'Leadership Search & Selection',
        'Dual-Shore Talent Pools',
      ],
      badge: 'VETTED TOP 3% TALENT · INDIA & USA HUBS',
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
              {/* Signature Architectural Totem Board (Portrait Square, Zero-AI, Razor-Sharp Vector Typography) */}
              <div className={`svc-board svc-board--${cat.colorTheme}`}>
                <div className="svc-board__frame">
                  {/* Precision Corner Mounting Rivets */}
                  <span className="svc-board__rivet svc-board__rivet--tl" aria-hidden="true"></span>
                  <span className="svc-board__rivet svc-board__rivet--tr" aria-hidden="true"></span>
                  <span className="svc-board__rivet svc-board__rivet--bl" aria-hidden="true"></span>
                  <span className="svc-board__rivet svc-board__rivet--br" aria-hidden="true"></span>

                  {/* Architectural Matte Faceplate */}
                  <div className="svc-board__faceplate">
                    {/* Top Identity Header */}
                    <div className="svc-board__header">
                      <span className="svc-board__brand">REDDINGTON GLOBAL CONSULTANCY</span>
                    </div>

                    <div className="svc-board__divider" aria-hidden="true"></div>

                    {/* Major Category Title & Tagline */}
                    <div className="svc-board__hero">
                      <h3 className="svc-board__title">{cat.boardTitle}</h3>
                      <p className="svc-board__tagline">{cat.tagline}</p>
                    </div>

                    {/* Services & Capabilities List */}
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

                    {/* Bottom Technical Telemetry Badge */}
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

              {/* Signature Editorial Caption: Title ——— Domain */}
              <div className="svc-cat-card__caption">
                <h3 className="svc-cat-card__title">{cat.title}</h3>
                <span className="svc-cat-card__rule" aria-hidden="true"></span>
                <span className="svc-cat-card__domain">{cat.domain}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* ── Compact Advisory Callout Bar ── */}
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
