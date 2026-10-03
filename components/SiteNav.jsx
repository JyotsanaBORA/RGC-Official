'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('services');

  // Close on Escape & toggle body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const navMenuItems = [
    {
      id: 'services',
      label: 'Services',
      href: '/#services',
      icon: (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      id: 'bpo-partnerships',
      label: 'BPO Partnerships',
      href: '/bpo-partnerships',
      icon: (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0L13 13" />
          <path d="m13 13-3.3-3.3a1 1 0 0 0-1.4 0L6 12a1 1 0 0 0 0 1.4l4.3 4.3a1 1 0 0 0 1.4 0l2-2" />
          <path d="m18 11 3-3a2.8 2.8 0 0 0 0-4v0a2.8 2.8 0 0 0-4 0l-3 3" />
          <path d="m6 13-3 3a2.8 2.8 0 0 0 0 4v0a2.8 2.8 0 0 0 4 0l3-3" />
        </svg>
      ),
    },
    {
      id: 'about',
      label: 'Who We Are',
      href: '/about',
      icon: (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      ),
    },
    {
      id: 'process',
      label: 'Our Edge',
      href: '/process',
      icon: (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      id: 'team',
      label: 'Team',
      href: '/team',
      icon: (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: 'testimonials',
      label: 'Testimonials',
      href: '/testimonials',
      icon: (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: 'careers',
      label: 'Careers',
      href: '/careers',
      icon: (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      id: 'contact',
      label: 'Contact Us',
      href: '/contact',
      icon: (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* ══════════ TOP HEADER (Infosys Standard: Hamburger + Logo) ══════════ */}
      <header className="nav infosys-header" id="nav">
        <div className="container nav__inner">
          <div className="infosys-header__left">
            {/* Circular Hamburger Button */}
            <button
              type="button"
              className="infosys-hamburger-btn"
              onClick={() => setIsOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={isOpen}
            >
              <span className="infosys-hamburger-icon" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            {/* Brand Logo */}
            <Link href="/" className="nav__brand-group" aria-label="Reddington Global home">
              <div className="nav__brand">
                <img src="/assets/img/rgc-logo-opt.png" alt="Reddington Global" className="logo-img" />
              </div>
              <span className="nav__brand-text">
                <span className="nav__brand-line">REDDINGTON GLOBAL</span>
                <span className="nav__brand-line nav__brand-line--sub">CONSULTANCY</span>
              </span>
            </Link>
          </div>

          <div className="infosys-header__right">
            <Link href="/bpo-partnerships" className="infosys-header__pill-link">
              BPO Partnerships
            </Link>
            <Link href="/contact" className="btn btn--gold btn--sm">
              Get Consultation
            </Link>
          </div>
        </div>
      </header>

      {/* ══════════ SIDEBAR DRAWER OVERLAY (Infosys Standard) ══════════ */}
      <div
        className={`infosys-drawer-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      >
        <div
          className="infosys-drawer"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Circular Close Button (X) */}
          <button
            type="button"
            className="infosys-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close Navigation Menu"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="infosys-drawer__body">
            {/* ── Left Sidebar Navigation Column ── */}
            <aside className="infosys-drawer__sidebar">
              <div className="infosys-drawer__menu">
                {navMenuItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`infosys-drawer__menu-item ${isActive ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveTab(item.id)}
                    >
                      <Link
                        href={item.href}
                        onClick={() => {
                          if (item.id !== 'services') {
                            setIsOpen(false);
                          } else {
                            setActiveTab('services');
                          }
                        }}
                        className="infosys-drawer__menu-link"
                      >
                        <span className="infosys-drawer__menu-icon">{item.icon}</span>
                        <span className="infosys-drawer__menu-label">{item.label}</span>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Social / Contact Icons at bottom */}
              <div className="infosys-drawer__socials">
                <a
                  href="https://www.linkedin.com/company/reddingtonglobal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="infosys-drawer__social-link"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.8v8.37h-2.8v-8.37M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z"/>
                  </svg>
                </a>
                <a
                  href="mailto:sales@reddingtonglobal.com"
                  aria-label="Email"
                  className="infosys-drawer__social-link"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
                    <rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 7 10-7"/>
                  </svg>
                </a>
                <a
                  href="tel:+919818224495"
                  aria-label="Phone"
                  className="infosys-drawer__social-link"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>
                  </svg>
                </a>
              </div>
            </aside>

            {/* ── Right Content Panel (Categories & Services Grid) ── */}
            <main className="infosys-drawer__panel">
              {activeTab === 'services' && (
                <div className="infosys-services-view">
                  <div className="infosys-panel__header">
                    <h2 className="infosys-panel__title">Services</h2>
                    <p className="infosys-panel__desc">
                      Explore integrated enterprise capabilities engineered for operational scale, agility, and audit-ready governance.
                    </p>
                  </div>

                  <div className="infosys-categories-grid">
                    {/* Category 1: BPO Services */}
                    <div className="infosys-cat-box infosys-cat-box--bpo">
                      <div className="infosys-cat-box__head">
                        <div className="infosys-cat-box__icon-badge infosys-cat-box__icon-badge--bpo" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                            <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.2" />
                          </svg>
                        </div>
                        <div className="infosys-cat-box__head-meta">
                          <h3 className="infosys-cat-box__title">BPO Services</h3>
                          <p className="infosys-cat-box__sub">24/7 Floor Telemetry &amp; Customer Care</p>
                        </div>
                      </div>
                      <ul className="infosys-cat-box__list">
                        <li>
                          <Link href="/services/bpo-sales" target="_blank" rel="noopener noreferrer">
                            <span>Sales &amp; Revenue Operations</span>
                            <svg className="infosys-cat-box__arrow" viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M3 8h10M9 4l4 4-4 4"/>
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/bpo-backoffice" target="_blank" rel="noopener noreferrer">
                            <span>Back Office Operations</span>
                            <svg className="infosys-cat-box__arrow" viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M3 8h10M9 4l4 4-4 4"/>
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/bpo-customer-service" target="_blank" rel="noopener noreferrer">
                            <span>Customer Services &amp; Support</span>
                            <svg className="infosys-cat-box__arrow" viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M3 8h10M9 4l4 4-4 4"/>
                            </svg>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Category 2: Consultancy Services */}
                    <div className="infosys-cat-box infosys-cat-box--consultancy">
                      <div className="infosys-cat-box__head">
                        <div className="infosys-cat-box__icon-badge infosys-cat-box__icon-badge--consultancy" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 2 7 12 12 22 7 12 2" fill="currentColor" fillOpacity="0.16" />
                            <polyline points="2 17 12 22 22 17" />
                            <polyline points="2 12 12 17 22 12" />
                          </svg>
                        </div>
                        <div className="infosys-cat-box__head-meta">
                          <h3 className="infosys-cat-box__title">Consultancy Services</h3>
                          <p className="infosys-cat-box__sub">SaaS, Finance, Tax &amp; Performance</p>
                        </div>
                      </div>
                      <ul className="infosys-cat-box__list">
                        <li>
                          <Link href="/services/saas-digital-solutions" target="_blank" rel="noopener noreferrer">
                            <span>SaaS &amp; Digital Solutions</span>
                            <svg className="infosys-cat-box__arrow" viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M3 8h10M9 4l4 4-4 4"/>
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/bookkeeping-accountancy" target="_blank" rel="noopener noreferrer">
                            <span>Bookkeeping &amp; Accountancy</span>
                            <svg className="infosys-cat-box__arrow" viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M3 8h10M9 4l4 4-4 4"/>
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/digital-marketing" target="_blank" rel="noopener noreferrer">
                            <span>Digital Marketing &amp; Growth</span>
                            <svg className="infosys-cat-box__arrow" viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M3 8h10M9 4l4 4-4 4"/>
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/payroll-compensation" target="_blank" rel="noopener noreferrer">
                            <span>Payroll &amp; Compensation</span>
                            <svg className="infosys-cat-box__arrow" viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M3 8h10M9 4l4 4-4 4"/>
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/performance-management-consultancy" target="_blank" rel="noopener noreferrer">
                            <span>Performance Management</span>
                            <svg className="infosys-cat-box__arrow" viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M3 8h10M9 4l4 4-4 4"/>
                            </svg>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Category 3: Recruitment & Staffing */}
                    <div className="infosys-cat-box infosys-cat-box--recruitment">
                      <div className="infosys-cat-box__head">
                        <div className="infosys-cat-box__icon-badge infosys-cat-box__icon-badge--recruitment" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" fill="currentColor" fillOpacity="0.15" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        </div>
                        <div className="infosys-cat-box__head-meta">
                          <h3 className="infosys-cat-box__title">Recruitment &amp; Staffing</h3>
                          <p className="infosys-cat-box__sub">Precision Talent &amp; Executive Placement</p>
                        </div>
                      </div>
                      <ul className="infosys-cat-box__list">
                        <li>
                          <Link href="/services/recruitment-hiring" target="_blank" rel="noopener noreferrer">
                            <span>Recruitment &amp; Hiring</span>
                            <svg className="infosys-cat-box__arrow" viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M3 8h10M9 4l4 4-4 4"/>
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link href="/services/recruitment-staffing" target="_blank" rel="noopener noreferrer">
                            <span>Recruitment &amp; Staffing</span>
                            <svg className="infosys-cat-box__arrow" viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M3 8h10M9 4l4 4-4 4"/>
                            </svg>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Category 4: Strategic Partnerships & Programs */}
                    <div className="infosys-cat-box infosys-cat-box--partnerships infosys-cat-box--highlight">
                      <div className="infosys-cat-box__head">
                        <div className="infosys-cat-box__icon-badge infosys-cat-box__icon-badge--partnerships" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0L13 13" />
                            <path d="m13 13-3.3-3.3a1 1 0 0 0-1.4 0L6 12a1 1 0 0 0 0 1.4l4.3 4.3a1 1 0 0 0 1.4 0l2-2" />
                            <path d="m18 11 3-3a2.8 2.8 0 0 0 0-4v0a2.8 2.8 0 0 0-4 0l-3 3" />
                            <path d="m6 13-3 3a2.8 2.8 0 0 0 0 4v0a2.8 2.8 0 0 0 4 0l3-3" />
                          </svg>
                        </div>
                        <div className="infosys-cat-box__head-meta">
                          <h3 className="infosys-cat-box__title">BPO Partnerships</h3>
                          <p className="infosys-cat-box__sub">Campaign Opportunities for Call Centers</p>
                        </div>
                      </div>
                      <ul className="infosys-cat-box__list">
                        <li>
                          <Link href="/bpo-partnerships" onClick={() => setIsOpen(false)}>
                            <span>Explore Campaign Opportunities</span>
                            <svg className="infosys-cat-box__arrow" viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M3 8h10M9 4l4 4-4 4"/>
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link href="/bpo-partnerships#partner-form" onClick={() => setIsOpen(false)}>
                            <span>Register Your Call Center</span>
                            <svg className="infosys-cat-box__arrow" viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M3 8h10M9 4l4 4-4 4"/>
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link href="/contact" onClick={() => setIsOpen(false)}>
                            <span>Enterprise Strategy Scoping</span>
                            <svg className="infosys-cat-box__arrow" viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M3 8h10M9 4l4 4-4 4"/>
                            </svg>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'bpo-partnerships' && (
                <div className="infosys-single-view">
                  <div className="infosys-panel__header">
                    <h2 className="infosys-panel__title">BPO Partnerships</h2>
                    <p className="infosys-panel__desc">
                      Connect your contact center with high-volume enterprise campaign opportunities across US voice, customer support, and financial services.
                    </p>
                  </div>
                  <div className="infosys-preview-card">
                    <h3>Campaign Opportunities for BPOs &amp; Call Centers</h3>
                    <p>
                      We bring together delivery centers with partners seeking reliable teams to support their campaigns. From initial assessment to partner introductions and onboarding coordination, we build high-performing partnerships.
                    </p>
                    <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                      <Link href="/bpo-partnerships" className="btn btn--gold btn--sm" onClick={() => setIsOpen(false)}>
                        Go to BPO Partnerships Page →
                      </Link>
                      <Link href="/bpo-partnerships#partner-form" className="btn btn--ghost btn--sm" onClick={() => setIsOpen(false)}>
                        Register Center
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'about' && (
                <div className="infosys-single-view">
                  <div className="infosys-panel__header">
                    <h2 className="infosys-panel__title">Who We Are</h2>
                    <p className="infosys-panel__desc">
                      Reddington Global combines executive operational leadership with global credentials to deliver integrated operational muscle.
                    </p>
                  </div>
                  <div className="infosys-preview-card">
                    <h3>Enterprise Operating Model</h3>
                    <p>
                      We partner with growth-stage enterprises and middle-market organizations across India and the USA, providing audit-ready governance, telemetry, and execution.
                    </p>
                    <div style={{ marginTop: '20px' }}>
                      <Link href="/about" className="btn btn--gold btn--sm" onClick={() => setIsOpen(false)}>
                        Explore Our Company →
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'process' && (
                <div className="infosys-single-view">
                  <div className="infosys-panel__header">
                    <h2 className="infosys-panel__title">Our Edge</h2>
                    <p className="infosys-panel__desc">
                      Four-step operating architecture designed for measurable business impact and SLA precision.
                    </p>
                  </div>
                  <div className="infosys-preview-card">
                    <h3>Operating Architecture</h3>
                    <p>
                      Discover how our dual-shore Gurugram and Sheridan hubs deliver continuous uptime, 99.8% SLA precision, and 100% compliance.
                    </p>
                    <div style={{ marginTop: '20px' }}>
                      <Link href="/process" className="btn btn--gold btn--sm" onClick={() => setIsOpen(false)}>
                        View Operating Framework →
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'team' && (
                <div className="infosys-single-view">
                  <div className="infosys-panel__header">
                    <h2 className="infosys-panel__title">Leadership Team</h2>
                    <p className="infosys-panel__desc">
                      Decades of operational mastery across enterprise contact centers, digital architecture, and corporate governance.
                    </p>
                  </div>
                  <div className="infosys-preview-card">
                    <h3>Executive Leadership</h3>
                    <p>Meet the directors and practitioners guiding Reddington Global&apos;s dual-shore client operations.</p>
                    <div style={{ marginTop: '20px' }}>
                      <Link href="/team" className="btn btn--gold btn--sm" onClick={() => setIsOpen(false)}>
                        Meet Our Team →
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'testimonials' && (
                <div className="infosys-single-view">
                  <div className="infosys-panel__header">
                    <h2 className="infosys-panel__title">Client Testimonials</h2>
                    <p className="infosys-panel__desc">
                      Verified feedback and execution stories from leaders we work with across global enterprises.
                    </p>
                  </div>
                  <div className="infosys-preview-card">
                    <h3>Trusted by Industry Leaders</h3>
                    <p>Read how our teams collaborate, deploy, and scale delivery environments for client-facing operations.</p>
                    <div style={{ marginTop: '20px' }}>
                      <Link href="/testimonials" className="btn btn--gold btn--sm" onClick={() => setIsOpen(false)}>
                        Read Testimonials →
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'careers' && (
                <div className="infosys-single-view">
                  <div className="infosys-panel__header">
                    <h2 className="infosys-panel__title">Careers</h2>
                    <p className="infosys-panel__desc">
                      Join a culture of driven thinkers and operators delivering enterprise-grade solutions worldwide.
                    </p>
                  </div>
                  <div className="infosys-preview-card">
                    <h3>Shape Your Future</h3>
                    <p>Explore open positions in BPO operations, digital systems engineering, and management consulting.</p>
                    <div style={{ marginTop: '20px' }}>
                      <Link href="/careers" className="btn btn--gold btn--sm" onClick={() => setIsOpen(false)}>
                        Explore Open Roles →
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="infosys-single-view">
                  <div className="infosys-panel__header">
                    <h2 className="infosys-panel__title">Contact Us</h2>
                    <p className="infosys-panel__desc">
                      Connect with our practice leaders for a customized enterprise consultation.
                    </p>
                  </div>
                  <div className="infosys-preview-card">
                    <h3>Start a Conversation</h3>
                    <p>Our team will respond within one business day with a practical scope of work and roadmap.</p>
                    <div style={{ marginTop: '20px' }}>
                      <Link href="/contact" className="btn btn--gold btn--sm" onClick={() => setIsOpen(false)}>
                        Open Contact Portal →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
