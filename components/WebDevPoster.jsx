'use client';

export default function WebDevPoster() {
  const whatsappUrl = `https://wa.me/919818224995?text=${encodeURIComponent(
    'Hi Reddington Global, I want to get my business online for ₹4,999.'
  )}`;

  return (
    <div className="rgc-poster reveal">
      {/* ── Top Brand Bar ── */}
      <div className="rgc-poster__top">
        <span className="rgc-poster__brand">[ REDDINGTON GLOBAL ]</span>
        <span className="rgc-poster__badge">7-DAY DELIVERY &bull; 01/01</span>
      </div>

      {/* ── Hero Statement ── */}
      <div className="rgc-poster__hero">
        <h2 className="rgc-poster__headline">
          Get your business online <span className="rgc-poster__price">for ₹4,999</span>
        </h2>
        <p className="rgc-poster__subhead">
          One-time payment. Live in 7 days. Yours to keep.
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
        >
          [+91 98182 24995]
        </a>
      </div>

      {/* ── Clear Transparent Disclaimers ── */}
      <div className="rgc-poster__disclaimer">
        <p>
          *Domain &amp; hosting billed separately at actual cost. E-commerce, payment gateway and extra pages available as add-ons.
        </p>
        <p>
          *Zero monthly platform fees. 100% full source code ownership upon handover.
        </p>
      </div>
    </div>
  );
}
