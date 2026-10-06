'use client';

import React from 'react';
import Link from 'next/link';

export default function GlobalDeliveryTree() {
  const verticals = [
    {
      id: 'bpo-operations',
      title: 'BPO & IT OPERATIONS',
      categoryName: 'BPO & Customer Operations',
      accent: '#D49F2D',
      href: '/services/bpo-customer-service',
      capabilities: [
        { name: 'Customer Service', href: '/services/bpo-customer-service' },
        { name: 'Back Office', href: '/services/bpo-backoffice' },
        { name: 'Sales Support', href: '/services/bpo-sales' },
        { name: 'KYC / Operations', href: '/services/bpo-backoffice#capabilities' },
        { name: '24/7 Support', href: '/services/bpo-customer-service#capabilities' },
      ],
    },
    {
      id: 'software-development',
      title: 'SOFTWARE DEVELOPMENT',
      categoryName: 'Software Development & IT Solutions',
      accent: '#38BDF8',
      href: '/services/saas-digital-solutions',
      capabilities: [
        { name: 'Web / SaaS', href: '/services/saas-digital-solutions' },
        { name: 'Applications', href: '/services/saas-digital-solutions#capabilities' },
        { name: 'APIs', href: '/services/saas-digital-solutions#capabilities' },
        { name: 'Integrations', href: '/services/saas-digital-solutions#capabilities' },
        { name: 'Cloud', href: '/services/saas-digital-solutions#capabilities' },
      ],
    },
    {
      id: 'accounting-finance',
      title: 'ACCOUNTING & FINANCE',
      categoryName: 'Bookkeeping & Accounting',
      accent: '#34D399',
      href: '/services/bookkeeping-accountancy',
      capabilities: [
        { name: 'Bookkeeping', href: '/services/bookkeeping-accountancy' },
        { name: 'Accounting', href: '/services/bookkeeping-accountancy#capabilities' },
        { name: 'Reconciliation', href: '/services/bookkeeping-accountancy#capabilities' },
        { name: 'Tax Support', href: '/services/bookkeeping-accountancy#capabilities' },
        { name: 'Reporting', href: '/services/bookkeeping-accountancy#capabilities' },
      ],
    },
  ];

  return (
    <div className="rg-tree-wrapper reveal">
      <div className="rg-tree-card">
        {/* Header Tag */}
        <div className="rg-tree-header">
          <span className="rg-tree-pill">ENTERPRISE DELIVERY ARCHITECTURE</span>
          <h3 className="rg-tree-heading">
            Three Core Verticals. <span className="gold-italic">One Unified Partner.</span>
          </h3>
          <p className="rg-tree-sub">
            Structured delivery model connecting front-office growth, digital engineering, and statutory governance.
          </p>
        </div>

        {/* ── Architecture Diagram Canvas ── */}
        <div className="rg-tree-diagram" aria-label="Reddington Global Organization Chart">
          {/* Level 1: Parent Brand Root */}
          <div className="rg-tree-root">
            <div className="rg-tree-root-box">
              <span className="rg-tree-root-badge">PARENT ENTITY</span>
              <span className="rg-tree-root-title">REDDINGTON GLOBAL</span>
            </div>
            {/* Trunk Stem Down */}
            <div className="rg-tree-stem rg-tree-stem--down" aria-hidden="true"></div>
          </div>

          {/* Bus Connector Bar (Desktop SVG branching line) */}
          <div className="rg-tree-bus-connector" aria-hidden="true">
            <div className="rg-tree-bus-line"></div>
            <div className="rg-tree-bus-drops">
              <span className="rg-tree-drop"></span>
              <span className="rg-tree-drop rg-tree-drop--center"></span>
              <span className="rg-tree-drop"></span>
            </div>
          </div>

          {/* Level 2 & 3: 3 Verticals Grid with 5 Capabilities Each */}
          <div className="rg-tree-verticals-grid">
            {verticals.map((vert) => (
              <div key={vert.id} className={`rg-tree-col rg-tree-col--${vert.id}`}>
                {/* Vertical Header Node */}
                <Link href={vert.href} className="rg-tree-col-node">
                  <span className="rg-tree-col-tag">{vert.categoryName}</span>
                  <h4 className="rg-tree-col-title">{vert.title}</h4>
                </Link>

                {/* Vertical Spine Line */}
                <div className="rg-tree-col-spine" aria-hidden="true"></div>

                {/* 5 Capability Cards */}
                <div className="rg-tree-caps-list">
                  {vert.capabilities.map((cap, cIdx) => (
                    <Link key={cIdx} href={cap.href} className="rg-tree-cap-item">
                      <span className="rg-tree-cap-bullet" aria-hidden="true"></span>
                      <span className="rg-tree-cap-text">{cap.name}</span>
                      <svg className="rg-tree-cap-arr" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M4 8h8M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  ))}
                </div>

                {/* Convergence Lead-Out Line */}
                <div className="rg-tree-col-spine rg-tree-col-spine--bottom" aria-hidden="true"></div>
              </div>
            ))}
          </div>

          {/* Bus Converge Bar (Desktop bottom convergence line) */}
          <div className="rg-tree-bus-connector rg-tree-bus-connector--bottom" aria-hidden="true">
            <div className="rg-tree-bus-drops rg-tree-bus-drops--bottom">
              <span className="rg-tree-drop"></span>
              <span className="rg-tree-drop rg-tree-drop--center"></span>
              <span className="rg-tree-drop"></span>
            </div>
            <div className="rg-tree-bus-line"></div>
          </div>

          {/* Stem into Foundation Base */}
          <div className="rg-tree-stem rg-tree-stem--to-base" aria-hidden="true"></div>

          {/* Level 4: Unified Foundation Base */}
          <div className="rg-tree-base">
            <Link href="/bpo-partnerships" className="rg-tree-base-box">
              <div className="rg-tree-base-meta">
                <span className="rg-tree-base-tag">UNIFIED CAPABILITY FOUNDATION</span>
                <span className="rg-tree-base-title">Global Delivery Partner</span>
                <p className="rg-tree-base-desc">
                  Dual-shore execution hubs, enterprise SLA governance, and BPO campaign partnerships.
                </p>
              </div>
              <span className="btn btn--gold btn--sm rg-tree-base-btn">
                Explore Partnerships &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
