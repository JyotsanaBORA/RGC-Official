'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SERVICES, SERVICE_CATEGORIES } from '../lib/services-data';

export default function MotionServices() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES
      : activeCategory === 'marketing'
      ? SERVICES.filter((s) => s.slug === 'digital-marketing')
      : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <div className="svc-showcase">
      {/* ── Deloitte-Style Division Tabs ── */}
      <div className="svc-showcase__tabs reveal" role="tablist" aria-label="Services Divisions">
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'all'}
          className={`svc-showcase__tab ${activeCategory === 'all' ? 'is-active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All Capabilities <span className="svc-showcase__tab-count">{SERVICES.length}</span>
        </button>

        {SERVICE_CATEGORIES.map((cat) => {
          const count = SERVICES.filter((s) => s.category === cat.id).length;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`svc-showcase__tab ${activeCategory === cat.id ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name} <span className="svc-showcase__tab-count">{count}</span>
            </button>
          );
        })}

        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'marketing'}
          className={`svc-showcase__tab ${activeCategory === 'marketing' ? 'is-active' : ''}`}
          onClick={() => setActiveCategory('marketing')}
        >
          Digital Marketing <span className="svc-showcase__tab-count">1</span>
        </button>
      </div>

      {/* ── Capabilities Grid ── */}
      <div className="svc-showcase__grid">
        {filteredServices.map((svc) => {
          const href = `/services/${svc.slug}`;
          const topStat = svc.stats && svc.stats.length > 0 ? svc.stats[0] : null;

          return (
            <article key={svc.slug} className="svc-card reveal">
              <Link href={href} className="svc-card__overlay-link" aria-label={`View ${svc.title} dashboard`} />

              {/* Realistic Operational Photography */}
              <div className="svc-card__media">
                <img
                  src={svc.image}
                  alt={`${svc.title} operational team at Reddington Global`}
                  loading="lazy"
                  className="svc-card__img"
                />
                <span className="svc-card__badge-cat">{svc.categoryName}</span>
              </div>

              {/* Card Body */}
              <div className="svc-card__body">
                <div className="svc-card__eyebrow">{svc.eyebrow}</div>
                <h3 className="svc-card__title">{svc.title}</h3>
                <p className="svc-card__tagline">{svc.tagline}</p>

                {topStat && (
                  <div className="svc-card__stat-chip">
                    <span className="svc-card__stat-metric">{topStat.metric}</span>
                    <span className="svc-card__stat-label">{topStat.label}</span>
                  </div>
                )}

                <div className="svc-card__footer">
                  <span className="svc-card__link-text">
                    Explore Dashboard <span className="svc-card__arrow" aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </article>
          );
        })}

        {/* ── Executive Consultation Advisory Card ── */}
        <article className="svc-card svc-card--advisory reveal">
          <div className="svc-card__advisory-inner">
            <span className="svc-card__advisory-pill">Tailored Architecture</span>
            <h3 className="svc-card__advisory-title">Need cross-division operations?</h3>
            <p className="svc-card__advisory-desc">
              We engineer custom hybrid operating models combining specialized BPO floors, full-stack SaaS pipelines, and statutory financial governance.
            </p>
            <div className="svc-card__advisory-action">
              <a href="#contact" className="btn btn--gold btn--sm">
                Request Strategy Scoping &rarr;
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
