'use client';

import { useState } from 'react';
import { trackLeadSubmission } from '../lib/analytics/events';
import { startConsultationPayment } from '../lib/payment';

export default function ServiceLeadForm({ serviceTitle, serviceSlug }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirement: '',
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '', orderId: '', paymentId: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '', orderId: '', paymentId: '' });

    trackLeadSubmission({
      form_name: `service_inquiry_${serviceSlug}`,
      form_location: `service_dashboard_${serviceSlug}`,
      service_requested: serviceTitle,
      amount: 99,
    });

    try {
      await startConsultationPayment({
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.requirement,
        },
        serviceName: `${serviceTitle} Consultation`,
        amount: 99,
        onSuccess: (data) => {
          setStatus({
            loading: false,
            success: true,
            error: '',
            orderId: data.orderId,
            paymentId: data.paymentId,
          });
        },
        onFailure: (errMsg) => {
          setStatus({
            loading: false,
            success: false,
            error: errMsg || 'Payment transaction was declined or failed.',
            orderId: '',
            paymentId: '',
          });
        },
        onCancel: () => {
          setStatus({
            loading: false,
            success: false,
            error: 'Payment window was closed. A status notification has been dispatched to your email.',
            orderId: '',
            paymentId: '',
          });
        },
      });
    } catch (err) {
      console.error('Submission error:', err);
      setStatus({
        loading: false,
        success: false,
        error: err.message || 'Error initializing payment gateway.',
        orderId: '',
        paymentId: '',
      });
    }
  };

  return (
    <div className="svc-form-card" id="consultation-form">
      <div className="svc-form-card__header">
        <div className="svc-form-card__badge">Priority Direct Desk • ₹99</div>
        <h3 className="svc-form-card__title">Consultancy @ ₹99</h3>
        <p className="svc-form-card__sub">
          Book a 1-on-1 strategic consultation session for <strong>{serviceTitle}</strong> with our senior consultants for <strong>₹99</strong>.
        </p>
      </div>

      {status.success ? (
        <div className="svc-form-card__success">
          <div className="svc-form-card__success-icon">✓</div>
          <h4>Consultation Booked Successfully!</h4>
          <p>
            Thank you, <strong>{formData.name || 'Partner'}</strong>. Your consultation for <strong>{serviceTitle}</strong> is confirmed.
          </p>
          <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', fontSize: '13px', margin: '14px 0', border: '1px solid #e2e8f0' }}>
            <div><strong>Order ID:</strong> {status.orderId}</div>
            <div><strong>Payment Ref:</strong> {status.paymentId}</div>
            <div style={{ color: '#059669', marginTop: '6px', fontSize: '12px' }}>
              ✉️ Official tax invoice with GST breakdown has been emailed to <strong>{formData.email}</strong>.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
            <a
              href={`/invoice/${status.orderId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary svc-form-card__wa-btn"
            >
              📄 Download Invoice (PDF)
            </a>
            <a
              href={`https://wa.me/919818224495?text=${encodeURIComponent(`Hi Reddington Global, I booked a consultation for ${serviceTitle} @ ₹99 (Order: ${status.orderId}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--gold svc-form-card__wa-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Fast-Track via WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="svc-form-card__form">
          {status.error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 14px', color: '#991b1b', fontSize: '13px' }}>
              <strong>Payment Alert:</strong> {status.error}
            </div>
          )}

          <div className="svc-form-group">
            <label htmlFor="svc-name">Full Name *</label>
            <input
              id="svc-name"
              name="name"
              type="text"
              required
              placeholder="e.g. Alex Morgan"
              value={formData.name}
              onChange={handleChange}
              className="svc-input"
            />
          </div>

          <div className="svc-form-row">
            <div className="svc-form-group">
              <label htmlFor="svc-email">Corporate Email *</label>
              <input
                id="svc-email"
                name="email"
                type="email"
                required
                placeholder="alex@company.com"
                value={formData.email}
                onChange={handleChange}
                className="svc-input"
              />
            </div>
            <div className="svc-form-group">
              <label htmlFor="svc-phone">Phone / WhatsApp *</label>
              <input
                id="svc-phone"
                name="phone"
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                className="svc-input"
              />
            </div>
          </div>

          <div className="svc-form-group">
            <label htmlFor="svc-company">Company / Organization</label>
            <input
              id="svc-company"
              name="company"
              type="text"
              placeholder="e.g. Acme Corp"
              value={formData.company}
              onChange={handleChange}
              className="svc-input"
            />
          </div>

          <div className="svc-form-group">
            <label htmlFor="svc-requirement">Scope or Operational Requirements</label>
            <textarea
              id="svc-requirement"
              name="requirement"
              rows={2}
              placeholder={`Describe your ${serviceTitle} goals, target headcount, or timeline...`}
              value={formData.requirement}
              onChange={handleChange}
              className="svc-textarea"
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="btn btn--gold svc-form-card__submit"
          >
            {status.loading ? 'Initializing Gateway...' : 'Proceed to Pay ₹99 & Book →'}
          </button>

          <div className="svc-form-card__trust">
            <span>🔒 Strict Mutual NDA</span>
            <span>⚡ Instant Razorpay Gateway</span>
            <span>📄 GST Tax Invoice</span>
          </div>
        </form>
      )}
    </div>
  );
}
