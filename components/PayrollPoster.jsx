'use client';

import React from 'react';
import { trackContactClick, trackMetaCustom } from '../lib/analytics/events';

export default function PayrollPoster() {
  const whatsappUrl = `https://wa.me/919818224995?text=${encodeURIComponent(
    'Hi Reddington Global, I want to book a ₹99 payroll consultation (plans starting @ ₹4,999/month).'
  )}`;

  const handleContactClick = () => {
    trackContactClick('whatsapp', '+919818224995');
    trackMetaCustom('PayrollPosterDirectContact', {
      channel: 'whatsapp',
      package: 'Payroll consultation (plans starting @ ₹4,999/month)',
      destination: whatsappUrl,
    });
  };

  return (
    <div className="rgc-poster rgc-poster--payroll reveal">
      {/* ── Top Brand Bar ── */}
      <div className="rgc-poster__top">
        <span className="rgc-poster__brand">[ REDDINGTON GLOBAL ]</span>
        <span className="rgc-poster__badge">PLANS STARTING @ ₹4,999/MONTH</span>
      </div>

      {/* ── Hero Statement matching Creative Poster ── */}
      <div className="rgc-poster__hero">
        <span className="rgc-payroll-badge">PAYROLL SERVICES</span>
        <h2 className="rgc-poster__headline">
          SIMPLIFY YOUR PAYROLL <span className="rgc-poster__price">POWER YOUR WORKFORCE</span>
        </h2>
        <p className="rgc-poster__subhead">
          We provide accurate payroll data, wage calculations, statutory tax deductions, and final salary balance statements.
        </p>
      </div>

      {/* ── 4 Core Pillars Grid (From Poster Image) ── */}
      <div className="rgc-payroll-grid">
        <div className="rgc-payroll-card">
          <div className="rgc-payroll-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <h4 className="rgc-payroll-card__title">Workforce Compensation</h4>
            <p className="rgc-payroll-card__desc">Efficient compensation management</p>
          </div>
        </div>

        <div className="rgc-payroll-card">
          <div className="rgc-payroll-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="8" y1="6" x2="16" y2="6" />
              <line x1="16" y1="14" x2="16" y2="18" />
              <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" strokeWidth="3" />
            </svg>
          </div>
          <div>
            <h4 className="rgc-payroll-card__title">Wage Calculation</h4>
            <p className="rgc-payroll-card__desc">Accurate wages &amp; payroll calculations</p>
          </div>
        </div>

        <div className="rgc-payroll-card">
          <div className="rgc-payroll-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div>
            <h4 className="rgc-payroll-card__title">Tax Deduction</h4>
            <p className="rgc-payroll-card__desc">Proper tax deduction &amp; processing</p>
          </div>
        </div>

        <div className="rgc-payroll-card">
          <div className="rgc-payroll-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <div>
            <h4 className="rgc-payroll-card__title">Statutory Compliance</h4>
            <p className="rgc-payroll-card__desc">Payroll aligned with statutory requirements</p>
          </div>
        </div>
      </div>

      {/* ── Red-Gold Callout Banner (Matching Poster Callout) ── */}
      <div className="rgc-payroll-banner">
        <div className="rgc-payroll-banner__content">
          <strong className="rgc-payroll-banner__title">LET US HANDLE YOUR PAYROLL.</strong>
          <span className="rgc-payroll-banner__sub">Plans starting @ ₹4,999/month · Book a ₹99 consultation</span>
        </div>
        <a href="#consultation-form" className="rgc-payroll-banner__btn">
          <span>Book Consultation</span>
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 3 11 8 6 13" />
          </svg>
        </a>
      </div>

      {/* ── High-Contrast WhatsApp Direct Contact ── */}
      <div className="rgc-poster__cta-box">
        <div className="rgc-poster__cta-lead">
          <span className="rgc-poster__wa-icon" aria-hidden="true">💬</span>
          <span>DM &ldquo;PAYROLL&rdquo; or WhatsApp us </span>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rgc-poster__phone-btn"
          aria-label="WhatsApp or Call +91 98182 24995"
          onClick={handleContactClick}
        >
          [+91 98182 24995]
        </a>
      </div>

      {/* ── Clear Scope & Balance Disclaimer ── */}
      <div className="rgc-poster__disclaimer">
        <p>
          *Scope Notice: We provide verified payroll data, gross-to-net wage calculations, statutory tax deductions (PF/ESIC/PT/TDS), and final net salary balance statements. Your plan and final price are confirmed on your ₹99 consultation.
        </p>
      </div>
    </div>
  );
}
