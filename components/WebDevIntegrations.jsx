/**
 * Bento grid of API integrations for the Web Development page.
 * Each tile carries a small looping CSS animation; costs are scoped on the consultation.
 */
export default function WebDevIntegrations() {
  return (
    <section className="wd-bento-sec reveal" aria-labelledby="wd-bento-title">
      <div className="svc-sec-head">
        <span className="eyebrow" style={{ color: '#10B981' }}>APIS &amp; INTEGRATIONS</span>
        <h2 className="svc-sec-title" id="wd-bento-title">
          A website that <span className="gold-italic">works for you.</span>
        </h2>
        <p className="svc-sec-sub">
          Connect payments, leads, bookings and your CRM. We scope the right integrations on your ₹99 consultation.
        </p>
      </div>

      <div className="wd-bento">
        {/* Payments (wide) */}
        <article className="wd-tile wd-tile--wide">
          <div className="wd-tile__art wd-pay" aria-hidden="true">
            <div className="wd-pay__card">
              <span>Order #1042</span>
              <b>Payment received</b>
              <i className="wd-pay__tick">✓</i>
            </div>
            <div className="wd-pay__methods"><span>UPI</span><span>Card</span><span>Netbanking</span></div>
          </div>
          <h3>Online payments</h3>
          <p>Razorpay checkout for orders, bookings and advance payments, with automatic receipts.</p>
        </article>

        {/* WhatsApp */}
        <article className="wd-tile">
          <div className="wd-tile__art wd-chat" aria-hidden="true">
            <span className="wd-chat__msg">Hi, is Saturday free?</span>
            <span className="wd-chat__msg wd-chat__msg--me">Yes! Booked for 11 AM ✓</span>
          </div>
          <h3>WhatsApp Business</h3>
          <p>Instant lead alerts and a click-to-chat button on every page.</p>
        </article>

        {/* Bookings */}
        <article className="wd-tile">
          <div className="wd-tile__art wd-cal" aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => <i key={i} style={{ '--d': i }}></i>)}
          </div>
          <h3>Appointment booking</h3>
          <p>Customers pick a slot online; you get it on your calendar.</p>
        </article>

        {/* CRM sync (wide) */}
        <article className="wd-tile wd-tile--wide">
          <div className="wd-tile__art wd-sync" aria-hidden="true">
            <span className="wd-sync__node">Website form</span>
            <span className="wd-sync__wire"><i></i><i></i><i></i></span>
            <span className="wd-sync__node">Zoho · HubSpot · Sheets</span>
          </div>
          <h3>CRM &amp; Google Sheets sync</h3>
          <p>Every enquiry lands in your CRM or sheet automatically, so no lead slips through.</p>
        </article>

        {/* Email */}
        <article className="wd-tile">
          <div className="wd-tile__art wd-mail" aria-hidden="true">
            <span className="wd-mail__env">✉</span>
          </div>
          <h3>Email automation</h3>
          <p>Confirmation, follow-up and newsletter emails sent for you.</p>
        </article>

        {/* Maps & SEO (wide) */}
        <article className="wd-tile wd-tile--wide">
          <div className="wd-tile__art wd-map" aria-hidden="true">
            <span className="wd-map__pin">📍</span>
            <span className="wd-map__ring"></span>
          </div>
          <h3>Google Maps &amp; SEO</h3>
          <p>Get found locally with Maps, search-ready pages and analytics.</p>
        </article>
      </div>
    </section>
  );
}
