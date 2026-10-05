'use client';
import React, { useState } from 'react';
import { trackLeadSubmission, trackContactClick } from '../lib/analytics/events';
import { startConsultationPayment } from '../lib/payment';

/* ── SVG icons ── */
const IconEmail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 7 10-7"/>
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 21C12 21 5 14.5 5 9a7 7 0 0114 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>
  </svg>
);

const CONTACTS = [
  { Icon: IconEmail, label: 'Email us', value: 'sales@reddingtonglobal.com', href: 'mailto:sales@reddingtonglobal.com' },
  { Icon: IconPhone, label: 'Call us', value: '+91 98182 24495', href: 'tel:+919818224495' },
];

const OFFICES = [
  {
    name: 'Gurugram Operations Campus',
    addr: '750 Udyog Vihar Phase 5, Sector 19, Gurugram, Haryana 122016',
    entities: ['RG Consultancy Pvt Ltd', 'BPO Operations Floor', 'MyCashBridge Fintech', 'RG Care Foundation'],
    href: 'https://www.reddingtonglobal.com/',
  },
];

/* ── Floating-label field ── */
function FloatField({ id, name, label, type = 'text', required = false, rows, autoComplete, value, onChange }) {
  const Tag = rows ? 'textarea' : 'input';
  return (
    <div className={`ff${rows ? ' ff--textarea' : ''}`}>
      <Tag
        id={id}
        name={name}
        type={rows ? undefined : type}
        autoComplete={autoComplete}
        required={required}
        rows={rows}
        placeholder=" "
        maxLength={rows ? 2000 : undefined}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
      <span className="ff__bar" aria-hidden="true"></span>
    </div>
  );
}

export default function MotionContact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Consultancy — SaaS & Digital Solutions',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [paymentError, setPaymentError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPaymentError(null);

    trackLeadSubmission({
      service: formData.service,
      amount: 99,
    });

    try {
      await startConsultationPayment({
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
        },
        serviceName: formData.service || 'Strategic Business Consultancy',
        amount: 99,
        onSuccess: (data) => {
          setLoading(false);
          setPaymentSuccess({
            name: formData.name,
            email: formData.email,
            orderId: data.orderId,
            paymentId: data.paymentId,
            service: formData.service,
          });
        },
        onFailure: (errMsg) => {
          setLoading(false);
          setPaymentError(errMsg || 'Payment was unsuccessful.');
        },
        onCancel: () => {
          setLoading(false);
          setPaymentError('Payment window was dismissed. A notification has been sent to your email.');
        },
      });
    } catch (err) {
      setLoading(false);
      setPaymentError(err.message || 'Error initializing payment gateway.');
    }
  };

  return (
    <div className="ct-wrap">
      {/* ── Decorative background glows ── */}
      <div className="ct-glow ct-glow--gold" aria-hidden="true"></div>
      <div className="ct-glow ct-glow--red" aria-hidden="true"></div>

      <div className="container ct-grid">
        {/* ════ LEFT — info panel ════ */}
        <div className="ct-info reveal">
          <p className="eyebrow">Get in Touch</p>
          <h2 className="section__title ct-info__title">
            Let&apos;s build something<br /><span className="gold-italic">great together.</span>
          </h2>
          <p className="ct-info__sub">
            Tell us what you&apos;re solving for, and our team will respond within one business day with a clear, practical next step.
          </p>

          {/* Contact pills */}
          <div className="ct-channels">
            {CONTACTS.map((c) => (
              <a
                key={c.href}
                href={c.href}
                className="ct-channel"
                onClick={() => trackContactClick(c.label.toLowerCase().includes('call') ? 'phone' : 'email', c.value)}
              >
                <span className="ct-channel__icon"><c.Icon /></span>
                <span className="ct-channel__text">
                  <span className="ct-channel__meta">
                    <span className="ct-channel__label">{c.label}</span>
                    {c.badge && <span className="ct-channel__badge">{c.badge}</span>}
                  </span>
                  <span className="ct-channel__value">{c.value}</span>
                </span>
                <span className="ct-channel__arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>

          {/* Offices */}
          <div className="ct-offices">
            <p className="ct-offices__head">
              Our Operations Campus &amp; Delivery Hub
              <span className="ct-offices__line" aria-hidden="true"></span>
            </p>
            <div className="ct-offices__grid">
              {OFFICES.map((o) => (
                <div key={o.name} className="ct-office">
                  <span className="ct-office__icon"><IconPin /></span>
                  <div className="ct-office__body">
                    <div className="ct-office__top">
                      <strong className="ct-office__name">
                        {o.href ? (
                          <a href={o.href} target="_blank" rel="noopener noreferrer">{o.name}</a>
                        ) : (
                          o.name
                        )}
                      </strong>
                      {o.region && (
                        <span className="ct-office__badge">
                          {o.flag && <span aria-hidden="true">{o.flag}</span>} {o.region}
                        </span>
                      )}
                    </div>
                    <p className="ct-office__addr">{o.addr}</p>
                    {o.entities && (
                      <div className="ct-office__chips">
                        {o.entities.map((ent) => (
                          <span key={ent} className="ct-office__chip">{ent}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════ RIGHT — form ════ */}
        <div className="ct-form-wrap reveal">
          <div className="ct-form-header">
            <p className="ct-form-header__eyebrow">Consultancy @ ₹99</p>
            <h3 className="ct-form-header__title">Share your requirements</h3>
            <div className="ct-price-pill">
              <span className="ct-price-pill__label">1-on-1 Practice Lead Session</span>
              <span className="ct-price-pill__amount">₹99 Only</span>
            </div>
            <div className="ct-form-header__rule" aria-hidden="true"></div>
          </div>

          {paymentSuccess ? (
            <div className="ct-success-card">
              <div className="ct-success-card__icon">✓</div>
              <h4 className="ct-success-card__title">Consultation Confirmed!</h4>
              <p className="ct-success-card__msg">
                Thank you, <strong>{paymentSuccess.name || 'Partner'}</strong>. Your strategic consultation session has been booked.
              </p>
              <div className="ct-success-card__meta">
                <div><span>Order ID:</span> <code>{paymentSuccess.orderId}</code></div>
                <div><span>Payment ID:</span> <code>{paymentSuccess.paymentId}</code></div>
              </div>
              <div className="ct-success-card__invoice-notice">
                <span>✉️</span> Official tax invoice with GST breakdown has been emailed to <strong>{paymentSuccess.email}</strong>.
              </div>
              <div className="ct-success-card__actions">
                <a
                  href={`/invoice/${paymentSuccess.orderId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary"
                >
                  📄 Download Invoice (PDF)
                </a>
                <a
                  href={`https://wa.me/919818224495?text=${encodeURIComponent(`Hi Reddington Global, I have booked a consultation @ ₹99 (Order: ${paymentSuccess.orderId}). Here are my details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--gold"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Fast-Track via WhatsApp →
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentSuccess(null);
                    setFormData({ name: '', company: '', email: '', phone: '', service: 'Consultancy — SaaS & Digital Solutions', message: '' });
                  }}
                  className="btn btn--ghost"
                >
                  Book Another Session
                </button>
              </div>
            </div>
          ) : (
            <form
              id="contactForm"
              className="ct-form"
              onSubmit={handleFormSubmit}
            >
              {paymentError && (
                <div className="ct-form__error-banner">
                  <span>⚠️</span>
                  <div>
                    <strong>Payment Alert:</strong> {paymentError}
                    <div style={{ marginTop: '3px', fontSize: '12px' }}>
                      A status update was sent to your email. You can check your payment details and retry below.
                    </div>
                  </div>
                </div>
              )}

              <div className="ct-form__row">
                <FloatField
                  id="fName"
                  name="name"
                  label="Full Name *"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <FloatField
                  id="fCompany"
                  name="company"
                  label="Company"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>

              <FloatField
                id="fEmail"
                name="email"
                label="Work Email *"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />

              <div className="ct-form__row">
                <FloatField
                  id="fPhone"
                  name="phone"
                  label="Phone / WhatsApp *"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <div className="ff ct-form__select-wrap">
                  <select
                    id="fService"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                  >
                    <option>Consultancy — SaaS &amp; Digital Solutions</option>
                    <option>Consultancy — Bookkeeping &amp; Accountancy</option>
                    <option>Consultancy — IT Services &amp; Infrastructure</option>
                    <option>BPO — Sales &amp; Revenue Operations</option>
                    <option>BPO — Back Office Operations</option>
                    <option>BPO — Customer Services by Experts</option>
                    <option>Digital Marketing &amp; Growth</option>
                    <option>Other Enterprise Inquiries</option>
                  </select>
                  <label htmlFor="fService">Service Interested In</label>
                  <span className="ff__bar" aria-hidden="true"></span>
                </div>
              </div>

              <FloatField
                id="fMsg"
                name="message"
                label="How can we help you? *"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
              />

              <button
                type="submit"
                disabled={loading}
                className="btn btn--gold ct-form__submit"
              >
                {loading ? 'Initializing Payment Gateway...' : 'Proceed to Pay ₹99 & Book →'}
                <svg className="ct-form__arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 10h12M11 5l5 5-5 5"/>
                </svg>
              </button>

              <p className="ct-form__note">
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 110 1.5A.75.75 0 018 4zm1 8H7v-5h2v5z"/>
                </svg>
                Instant Razorpay checkout (UPI, Cards, Netbanking). Tax invoice dispatched immediately on success.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
