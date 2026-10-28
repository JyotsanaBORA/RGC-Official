'use client';

import { trackContactClick, trackMetaCustom } from '../lib/analytics/events';

export default function WebDevPoster() {
  const whatsappUrl = `https://wa.me/919818224995?text=${encodeURIComponent(
    'Hi Reddington Global, I want to book a ₹99 consultation for a business website.'
  )}`;

  const handleContactClick = () => {
    trackContactClick('whatsapp', '+919818224995');
    trackMetaCustom('WebDevPosterDirectContact', {
      channel: 'whatsapp',
      package: 'Website consultation (plans starting @ ₹4,999)',
      destination: whatsappUrl,
    });
  };

  return (
    <div className="rgc-poster reveal">
      {/* ── Top Brand Bar ── */}
      <div className="rgc-poster__top">
        <span className="rgc-poster__brand">[ REDDINGTON GLOBAL ]</span>
        <span className="rgc-poster__badge">LIVE IN AS LITTLE AS 10 DAYS</span>
      </div>

      {/* ── Hero Statement ── */}
      <div className="rgc-poster__hero">
        <h2 className="rgc-poster__headline">
          Get your business online <span className="rgc-poster__price">starting @ ₹4,999</span>
        </h2>
        <p className="rgc-poster__subhead">
          Book a ₹99 consultation. We recommend the right plan, timeline &amp; quote.
        </p>
      </div>

      {/* ── High-Contrast WhatsApp & Direct Number Callout ── */}
      <div className="rgc-poster__cta-box">
        <div className="rgc-poster__cta-lead">
          <span className="rgc-poster__wa-icon" aria-hidden="true">💬</span>
          <span>DM &ldquo;WEBSITE&rdquo; or WhatsApp us</span>
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

      {/* ── Clear Transparent Disclaimers ── */}
      <div className="rgc-poster__disclaimer">
        <p>
          *Domain &amp; hosting billed separately at actual cost. E-commerce, payment gateway and extra pages available as add-on services, scoped on your consultation.
        </p>
        <p>
          *Zero monthly platform fees. 100% full source code ownership upon handover.
        </p>
      </div>
    </div>
  );
}
