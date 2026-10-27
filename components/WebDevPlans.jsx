'use client';

import { SERVICE_PACKAGES, WEB_ADDONS } from '../lib/packages-data';
import { trackEvent } from '../lib/analytics/events';

export default function WebDevPlans() {
  const plans = SERVICE_PACKAGES['web-development'];

  // Preselect the plan in ServiceLeadForm, then bring the form into view
  const choosePlan = (plan) => {
    window.dispatchEvent(new CustomEvent('rg:select-plan', { detail: plan.id }));
    trackEvent('web_plan_selected', { plan: plan.name, value: plan.price });
    document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="svc-plans-sec reveal" id="plans">
      <div className="svc-sec-head">
        <span className="eyebrow">Website Plans</span>
        <h2 className="svc-sec-title">
          Pick the plan that fits <span className="gold-italic">your business.</span>
        </h2>
        <p className="svc-sec-sub">
          One-time price, no monthly fees to us. Domain &amp; hosting are billed to your own account so you keep 100% ownership.
        </p>
      </div>

      <div className="svc-plans-grid">
        {plans.map((plan, i) => (
          <article
            key={plan.id}
            className={`svc-plan-card reveal-card${plan.isPopular ? ' is-popular' : ''}`}
            style={{ '--i': i }}
          >
            <span className="svc-plan-card__badge">{plan.badge}</span>
            <h3 className="svc-plan-card__name">{plan.name.replace(/ Website$/, '')}</h3>
            <p className="svc-plan-card__for">{plan.bestFor}</p>
            <div className="svc-plan-card__price">
              <strong>₹{plan.price.toLocaleString('en-IN')}</strong>
              <span>+ GST · one-time</span>
            </div>
            <div className="svc-plan-card__timeline">⚡ Live in {plan.timeline}</div>
            <ul className="svc-plan-card__list">
              {plan.deliverables.map((item, idx) =>
                item.endsWith(':') ? (
                  <li key={idx} className="svc-plan-card__lead">{item}</li>
                ) : (
                  <li key={idx}>{item}</li>
                )
              )}
            </ul>
            <button type="button" className="svc-plan-card__cta" onClick={() => choosePlan(plan)}>
              Choose {plan.name.replace(/ Website$/, '')} →
            </button>
          </article>
        ))}
      </div>

      <div className="svc-plans-addons">
        <strong>Add-ons:</strong>
        {WEB_ADDONS.map((addon) => (
          <span key={addon.label}>
            {addon.label} <b>{addon.priceDisplay}</b>
          </span>
        ))}
        <span className="svc-plans-addons__note">Content &amp; photos provided by you · All prices + GST</span>
      </div>
    </section>
  );
}
