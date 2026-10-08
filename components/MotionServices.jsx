'use client';

import React, { useRef, useState, useEffect } from 'react';
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

  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Sync active index on scroll
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const scrollLeft = sliderRef.current.scrollLeft;
    const cardEl = sliderRef.current.children[0];
    const cardWidth = cardEl ? cardEl.offsetWidth : 340;
    const gap = 24;
    const newIdx = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(Math.max(newIdx, 0), categories.length - 1));
  };

  const scrollToIndex = (idx) => {
    if (!sliderRef.current) return;
    const cardEl = sliderRef.current.children[0];
    const cardWidth = cardEl ? cardEl.offsetWidth : 340;
    const gap = 24;
    sliderRef.current.scrollTo({
      left: idx * (cardWidth + gap),
      behavior: 'smooth',
    });
    setActiveIndex(idx);
  };

  const handlePrev = () => {
    scrollToIndex(Math.max(activeIndex - 1, 0));
  };

  const handleNext = () => {
    scrollToIndex(Math.min(activeIndex + 1, categories.length - 1));
  };

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
    sliderRef.current.classList.add('is-dragging');
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    if (Math.abs(walk) > 6) {
      hasDraggedRef.current = true;
    }
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!sliderRef.current) return;
    isDraggingRef.current = false;
    sliderRef.current.classList.remove('is-dragging');
  };

  const handleLinkClick = (e) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      hasDraggedRef.current = false;
    }
  };

  return (
    <div className="svc-categories-container">
      <div className="svc-slider-wrapper">
        {/* Navigation & Controls Bar */}
        <div className="svc-slider-header-bar">
          <span className="svc-slider-hint">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6"/>
            </svg>
            Swipe or use arrows to explore core verticals
          </span>

          <div className="svc-slider-nav-btns" role="group" aria-label="Slider navigation">
            <button
              type="button"
              className="svc-slider-btn svc-slider-btn--prev"
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous vertical"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className="svc-slider-btn svc-slider-btn--next"
              onClick={handleNext}
              disabled={activeIndex === categories.length - 1}
              aria-label="Next vertical"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Draggable & Scroll-Snapping Slider Track */}
        <div
          ref={sliderRef}
          className="svc-categories-slider"
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          role="region"
          aria-label="Service categories slider"
          tabIndex={0}
        >
          {categories.map((cat) => (
            <article key={cat.id} className="svc-cat-card">
              <Link
                href={cat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="svc-cat-card__link-wrap"
                aria-label={`Explore ${cat.title} in new tab`}
                onClick={handleLinkClick}
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
                          {cat.services.map((svc, sIdx) => (
                            <li key={sIdx} className="svc-board__item">
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

                <div className="svc-cat-card__caption">
                  <h3 className="svc-cat-card__title">{cat.title}</h3>
                  <span className="svc-cat-card__rule" aria-hidden="true"></span>
                  <span className="svc-cat-card__domain">{cat.domain}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Dots Indicators */}
        <div className="svc-slider-dots" role="tablist" aria-label="Slider pagination">
          {categories.map((cat, idx) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === idx}
              className={`svc-slider-dot ${activeIndex === idx ? 'is-active' : ''}`}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to slide ${idx + 1}: ${cat.title}`}
            />
          ))}
        </div>
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
