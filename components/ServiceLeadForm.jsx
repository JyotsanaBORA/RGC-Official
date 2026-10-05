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
        <h3 className="svc-form-card__title">Consultancy at ₹99</h3>
        <p className="svc-form-card__sub">
          Book a 1-on-1 strategic scoping session for <strong>{serviceTitle}</strong> with our practice directors for <strong>₹99</strong>.
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
          <a
            href={`https://wa.me/919818224495?text=${encodeURIComponent(`Hi Reddington Global, I booked a consultation for ${serviceTitle} at ₹99 (Order: ${status.orderId}).`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--gold svc-form-card__wa-btn"
          >
            <span>💬</span> Fast-Track via WhatsApp
          </a>
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
