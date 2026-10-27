'use client';

import { useState, useEffect } from 'react';
import { getServicePlans } from '../lib/packages-data';
import { trackEvent } from '../lib/analytics/events';

export default function ServicePlans({ serviceSlug, serviceTitle }) {
  const config = getServicePlans(serviceSlug);
  const [selectedId, setSelectedId] = useState('');

  // ServiceLeadForm broadcasts `rg:plan-changed` whenever its interested plan changes (picker or card)
  useEffect(() => {
    const onPlanChanged = (e) => setSelectedId(e.detail || '');
    window.addEventListener('rg:plan-changed', onPlanChanged);
    return () => window.removeEventListener('rg:plan-changed', onPlanChanged);
  }, []);

  if (!config) return null;
  const { plans, addons } = config;

  // Mark the plan as the client's interest in ServiceLeadForm. Scroll only when the form is off-screen
  // (mobile, where it stacks below); on desktop the sticky form is already visible.
  const choosePlan = (plan) => {
    setSelectedId(plan.id);
    window.dispatchEvent(new CustomEvent('rg:select-plan', { detail: plan.id }));
    trackEvent('plan_interest_selected', { service: serviceTitle, plan: plan.name, starting_at: plan.startingAt || 0 });

    const form = document.getElementById('consultation-form');
    if (!form) return;

    const r = form.getBoundingClientRect();
    const visiblePx = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
    const mostlyVisible = visiblePx >= Math.min(r.height, window.innerHeight) * 0.6;
    if (!mostlyVisible) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    }

    // Brief gold glow so the plan change registers; restart it on repeat clicks
    form.removeAttribute('data-plan-pulse');
    void form.offsetWidth;
    form.setAttribute('data-plan-pulse', '');
    const onPulseEnd = (e) => {
      if (e.animationName !== 'rgFormPulse') return;
      form.removeAttribute('data-plan-pulse');
      form.removeEventListener('animationend', onPulseEnd);
    };
    form.addEventListener('animationend', onPulseEnd);
  };

  return (
    <section className="svc-plans-sec reveal" id="plans">
      <div className="svc-plans-sec__grid" aria-hidden="true"></div>
      <div className="svc-plans-sec__orb" aria-hidden="true"></div>

      <div className="svc-plans-head">
        <span className="svc-plans-head__eyebrow">
          <span className="svc-plans-head__pulse" aria-hidden="true"></span>
          {serviceTitle} · Plans
        </span>
        <h2 className="svc-plans-head__title">
          Pick a plan, <span className="gold-italic">we&apos;ll tailor it.</span>
        </h2>
        <p className="svc-plans-head__sub">
          Every business is different. Book a ₹99 consultation and our expert recommends the right plan, scope, timeline
          and final quote for you.
        </p>
      </div>

      <div className="svc-plans-grid">
        {plans.map((plan, i) => {
          const isSelected = plan.id === selectedId;
          return (
            <article
              key={plan.id}
              className={`svc-plan-card reveal-card${plan.isPopular ? ' is-popular' : ''}${isSelected ? ' is-selected' : ''}`}
              style={{ '--i': i }}
            >
              <div className="svc-plan-card__glow" aria-hidden="true"></div>

              <div className="svc-plan-card__top">
                <span className="svc-plan-card__tier">TIER_0{i + 1}</span>
                <span className="svc-plan-card__badge">{plan.badge}</span>
              </div>

              <h3 className="svc-plan-card__name">{plan.name}</h3>
              <p className="svc-plan-card__for">{plan.bestFor}</p>

              {plan.startingAt ? (
                <div className="svc-plan-card__price">
                  <span className="svc-plan-card__from">Starting @</span>
                  <span className="svc-plan-card__cur">₹</span>
                  <strong>{plan.startingAt.toLocaleString('en-IN')}</strong>
                  <span className="svc-plan-card__terms">
                    {plan.unit ? `${plan.unit.replace('/', 'per ')}` : 'one-time'}
                    <br />+ GST
                  </span>
                </div>
              ) : (
                <div className="svc-plan-card__price svc-plan-card__price--quote">
                  <strong>Custom quote</strong>
                  <span className="svc-plan-card__terms">based on<br />your scope</span>
                </div>
              )}

              {plan.specs && (
                <dl className="svc-plan-card__specs" aria-label="Typical scope">
                  {plan.specs.map((spec) => (
                    <div key={spec.label}>
                      <dt>{spec.label}</dt>
                      <dd>{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <ul className="svc-plan-card__list">
                {plan.highlights.map((item, idx) =>
                  item.endsWith(':') ? (
                    <li key={idx} className="svc-plan-card__lead">{item}</li>
                  ) : (
                    <li key={idx}>{item}</li>
                  )
                )}
              </ul>

              <button
                type="button"
                className="svc-plan-card__cta"
                aria-pressed={isSelected}
                onClick={() => choosePlan(plan)}
              >
                <span>{isSelected ? 'Added to consultation' : 'Discuss this plan'}</span>
                <span aria-hidden="true">{isSelected ? '✓' : '→'}</span>
              </button>
            </article>
          );
        })}
      </div>

      {addons?.length > 0 && (
        <div className="svc-plans-addons">
          <span className="svc-plans-addons__label">Add-on services</span>
          {addons.map((addon) => (
            <span key={addon} className="svc-plans-addons__chip">{addon}</span>
          ))}
          <span className="svc-plans-addons__note">Scoped &amp; priced during your consultation</span>
        </div>
      )}
    </section>
  );
}
