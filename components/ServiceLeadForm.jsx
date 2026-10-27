'use client';

import { useState, useEffect, useRef } from 'react';
import { trackLeadSubmission } from '../lib/analytics/events';
import { startConsultationPayment } from '../lib/payment';
import { CONSULTATION, getPackageCharge, getServicePlans, getPlanPriceLabel } from '../lib/packages-data';
import { getAttributionData } from '../lib/analytics/attribution';

// Every service books the same prepaid ₹99 consultation; plans are only an indication of interest
const charge = getPackageCharge(CONSULTATION);
const inr = (n) => n.toLocaleString('en-IN', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 });

export default function ServiceLeadForm({ serviceTitle, serviceSlug }) {
  const isWebDev =
    serviceSlug === 'web-development' ||
    serviceSlug === 'web-dev' ||
    serviceSlug === 'website-development' ||
    (serviceTitle || '').toLowerCase().includes('website development');

  const isPayroll =
    serviceSlug === 'payroll-compensation' ||
    serviceSlug === 'payroll' ||
    serviceSlug === 'payroll-services' ||
    (serviceTitle || '').toLowerCase().includes('payroll');

  const plans = getServicePlans(serviceSlug || serviceTitle)?.plans || [];
  const activeService = serviceTitle || 'Strategic Consultation';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: isWebDev ? 'Clinic / Healthcare' : isPayroll ? 'Upto 10 Employees' : activeService,
    gstNumber: '',
    planId: '', // '' = not sure yet
    requirement: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: '',
    orderId: '',
    paymentId: '',
  });

  const leadIdRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Plan cards elsewhere on the page dispatch `rg:select-plan` with a plan id
  useEffect(() => {
    const onSelectPlan = (e) => {
      const id = e.detail;
      if (id && !plans.some((p) => p.id === id)) return;
      setFormData((prev) => ({ ...prev, planId: id || '' }));
    };
    window.addEventListener('rg:select-plan', onSelectPlan);
    return () => window.removeEventListener('rg:select-plan', onSelectPlan);
  }, [plans]);

  // Keep plan cards elsewhere on the page in sync with the form's selection
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('rg:plan-changed', { detail: formData.planId }));
  }, [formData.planId]);

  const interestedPlan = plans.find((p) => p.id === formData.planId) || null;
  const interestedPlanLabel = interestedPlan
    ? `${activeService} — ${interestedPlan.name} (${interestedPlan.startingAt ? `Starting @ ${getPlanPriceLabel(interestedPlan)}` : 'Custom quote'})`
    : '';

  // Background auto-save for abandoned form leads
  const saveLeadDraft = async (dataToSave = formData) => {
    const cleanPhone = (dataToSave.phone || '').trim();
    const cleanEmail = (dataToSave.email || '').trim();
    if (cleanPhone.length < 7 && (!cleanEmail.includes('@') || !cleanEmail.includes('.'))) {
      return;
    }

    try {
      const draftPlan = plans.find((p) => p.id === dataToSave.planId);
      const res = await fetch('/api/lead-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: leadIdRef.current,
          name: dataToSave.name,
          email: dataToSave.email,
          phone: dataToSave.phone,
          company: dataToSave.company || dataToSave.businessType,
          gstNumber: dataToSave.gstNumber,
          service: activeService,
          selectedPackage: CONSULTATION.name,
          packageId: CONSULTATION.id,
          packagePrice: CONSULTATION.price,
          amount: Math.round(charge.total * 100),
          interestedPlan: draftPlan ? `${activeService} — ${draftPlan.name}` : '',
          attribution: getAttributionData(),
          notes: {
            requirement: dataToSave.requirement,
            business_type: dataToSave.businessType,
          },
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.leadId) {
          leadIdRef.current = json.leadId;
        }
      }
    } catch (_) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nextData;
    if (name === 'gstNumber') {
      const formattedGst = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      nextData = { ...formData, gstNumber: formattedGst };
    } else {
      nextData = { ...formData, [name]: value };
    }
    setFormData(nextData);

    if (name === 'phone' || name === 'email' || name === 'name') {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        saveLeadDraft(nextData);
      }, 1200);
    }
  };

  const handleBlur = () => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    saveLeadDraft(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    setStatus({ loading: true, success: false, error: '', orderId: '', paymentId: '' });

    trackLeadSubmission({
      form_name: `service_booking_${serviceSlug || 'consultation'}`,
      form_location: `service_card_${serviceSlug || 'consultation'}`,
      service_requested: `${activeService} - Consultation${interestedPlan ? ` (interested: ${interestedPlan.name})` : ''}`,
      amount: charge.total,
    });

    try {
      await startConsultationPayment({
        customer: {
          leadId: leadIdRef.current,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || formData.businessType,
          gstNumber: formData.gstNumber,
          selectedPackage: CONSULTATION.name,
          packageId: CONSULTATION.id,
          packagePrice: CONSULTATION.price,
          interestedPlan: interestedPlanLabel,
          message: `${isWebDev ? 'Business Type' : isPayroll ? 'Team Size' : 'Practice Area'}: ${formData.businessType}. Interested plan: ${interestedPlan ? interestedPlan.name : 'Not sure yet'}. Requirements: ${formData.requirement || 'Not specified'}`,
        },
        serviceName: `${activeService} — 1-on-1 Consultation`,
        amount: charge.total,
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
            error: errMsg || 'Transaction was declined or cancelled.',
            orderId: '',
            paymentId: '',
          });
        },
        onCancel: () => {
          setStatus({
            loading: false,
            success: false,
            error: 'Payment window was closed. A confirmation summary has been saved.',
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
        error: err.message || 'Error initializing booking gateway.',
        orderId: '',
        paymentId: '',
      });
    }
  };

  return (
    <div className="svc-curved-screen" id="consultation-form">
      {/* ── Screen Top Titlebar ── */}
      <div className="svc-curved-titlebar">
        <div className="svc-screen-controls" aria-hidden="true">
          <span className="svc-screen-dot svc-screen-dot--red"></span>
          <span className="svc-screen-dot svc-screen-dot--amber"></span>
          <span className="svc-screen-dot svc-screen-dot--green"></span>
        </div>

        <div className="svc-curved-title">
          <span>Consultation</span>
        </div>

        <div className="svc-curved-status">
          <span className="svc-screen-status-dot"></span>
          <span>Call in 24h</span>
        </div>
      </div>

      {/* ── Screen Ambient Inner Area ── */}
      <div className="svc-curved-display">
        <div className="svc-clean-card">
          <h3 className="svc-clean-title">Book Consultation @ ₹99</h3>
          <p className="svc-clean-subtitle">
            1-on-1 call for {activeService} &bull; <strong>{CONSULTATION.priceDisplay}</strong>
          </p>

          {status.success ? (
            <div className="svc-clean-success">
              <div className="svc-clean-success-icon">✓</div>
              <h4>Consultation Booked!</h4>
              <p>
                Thank you, <strong>{formData.name || 'Partner'}</strong>. Our {activeService} expert will call you within
                24 hours to understand your scope and recommend the right plan, timeline and quote.
              </p>
              <div className="svc-clean-success-box">
                <div>
                  <strong>Order ID:</strong> {status.orderId}
                </div>
                <div>
                  <strong>Interested plan:</strong> {interestedPlan ? interestedPlan.name : 'Not sure yet (we will advise)'}
                </div>
              </div>
              <p style={{ marginTop: '14px', fontSize: '13px', color: '#D4C5B9' }}>
                A GST tax invoice for your ₹99 consultation has been emailed to you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="svc-clean-form">
              {status.error && (
                <div className="svc-clean-alert">
                  <strong>Booking Alert:</strong> {status.error}
                </div>
              )}

              {/* Row 1: Name & Phone */}
              <div className="svc-clean-row">
                <input
                  id="svc-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="svc-clean-input"
                />
                <input
                  id="svc-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="Phone / WhatsApp *"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="svc-clean-input"
                />
              </div>

              {/* Row 2: Email & Business / Company Name */}
              <div className="svc-clean-row">
                <input
                  id="svc-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="svc-clean-input"
                />
                <input
                  id="svc-company"
                  name="company"
                  type="text"
                  placeholder={isWebDev ? 'Business / Brand Name' : 'Company / Organization'}
                  value={formData.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="svc-clean-input"
                />
              </div>

              {/* Row 3: Business Type / Team Size / Practice Area & GSTIN */}
              <div className="svc-clean-row">
                <div className="svc-clean-select-wrap">
                  {isWebDev ? (
                    <select
                      id="svc-businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="svc-clean-input svc-clean-select"
                    >
                      <option value="Clinic / Healthcare">Clinic / Healthcare</option>
                      <option value="Café / Restaurant">Café / Restaurant</option>
                      <option value="Salon / Spa">Salon / Spa</option>
                      <option value="Coaching / Institute">Coaching / Education</option>
                      <option value="Boutique / Fashion">Boutique / Retail</option>
                      <option value="Gym / Fitness">Gym / Fitness</option>
                      <option value="CA / Legal / Consultant">CA / Legal / Advisory</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Interior Studio">Interior / Architect</option>
                      <option value="Tech / Startup">Tech / Startup</option>
                      <option value="Other Business">Other Business</option>
                    </select>
                  ) : isPayroll ? (
                    <select
                      id="svc-businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="svc-clean-input svc-clean-select"
                    >
                      <option value="Upto 10 Employees">Upto 10 Employees</option>
                      <option value="More than 10 Employees">More than 10 Employees</option>
                    </select>
                  ) : (
                    <select
                      id="svc-businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="svc-clean-input svc-clean-select"
                    >
                      <option value="Customer Service & Support">Customer Service & CX</option>
                      <option value="Back Office Operations & KYC">Back Office Operations & KYC</option>
                      <option value="Sales & Lead Generation">Sales & Lead Generation</option>
                      <option value="Performance Management & QA">Performance Management & QA</option>
                      <option value="Recruitment & Talent Staffing">Recruitment & Staffing</option>
                      <option value="AI Engineering & SaaS Solutions">AI Engineering & SaaS</option>
                      <option value="Bookkeeping & Accountancy">Bookkeeping & Tax (GST/TDS)</option>
                      <option value="Payroll & Compensation Management">Payroll & Compensation</option>
                      <option value="Digital Marketing & Growth">Digital Marketing & Growth</option>
                      <option value="BPO Partnership / Campaign">BPO Partnership / Campaign</option>
                      <option value="General Enterprise Advisory">General Enterprise Advisory</option>
                    </select>
                  )}
                  <span className="svc-clean-arrow" aria-hidden="true">▾</span>
                </div>

                <input
                  id="svc-gst"
                  name="gstNumber"
                  type="text"
                  maxLength={15}
                  placeholder="GSTIN (Optional for tax invoice)"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="svc-clean-input svc-clean-input--uppercase"
                />
              </div>

              {/* Row 4: Interested plan (optional) — the price is discussed on the call */}
              {plans.length > 0 && (
                <div className="svc-clean-full">
                  <span className="svc-plan-picker__label">Interested in (optional)</span>
                  <div className="svc-plan-picker" role="radiogroup" aria-label="Interested plan">
                    {[...plans, { id: '', name: 'Not sure', notSure: true }].map((plan) => (
                      <button
                        key={plan.id || 'not-sure'}
                        type="button"
                        role="radio"
                        aria-checked={formData.planId === plan.id}
                        className={`svc-plan-picker__opt${formData.planId === plan.id ? ' is-active' : ''}`}
                        onClick={() => setFormData((prev) => ({ ...prev, planId: plan.id }))}
                      >
                        {plan.isPopular && <span className="svc-plan-picker__flag">Popular</span>}
                        <span className="svc-plan-picker__name">{plan.name}</span>
                        <span className="svc-plan-picker__price">
                          {plan.notSure ? 'We advise' : plan.startingAt ? `From ${getPlanPriceLabel(plan)}` : 'Custom'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="svc-gst-summary svc-clean-full">
                <span>
                  Consultation ₹{inr(charge.base)}
                  {charge.gst > 0 ? ` + ₹${inr(charge.gst)} GST (18%)` : ' (incl. GST)'}
                </span>
                <strong>Payable ₹{inr(charge.total)}</strong>
              </div>

              {/* Row 5: Notes & Requirements */}
              <input
                id="svc-requirement"
                name="requirement"
                type="text"
                placeholder={
                  isWebDev
                    ? 'Tell us what you need (e.g. 5 pages, logo ready, need bookings)'
                    : isPayroll
                    ? 'Tell us your setup (e.g. 8 staff, salary cycle on 1st)'
                    : `Scope / Objectives (e.g. team size, current challenges, timeline)`
                }
                value={formData.requirement}
                onChange={handleChange}
                onBlur={handleBlur}
                className="svc-clean-input svc-clean-full"
              />

              {/* Submit CTA */}
              <button type="submit" disabled={status.loading} className="svc-clean-btn">
                {status.loading ? (
                  <span className="svc-clean-loading">
                    <span className="svc-form-spinner"></span> Initializing Gateway...
                  </span>
                ) : (
                  `Pay ₹${inr(charge.total)} & Book Call ›`
                )}
              </button>

              {/* Micro-Trust Strip */}
              <div className="svc-clean-trust">
                <span>📞 Expert call in 24h</span>
                <span>&bull;</span>
                <span>📋 Plan, ETA &amp; quote</span>
                <span>&bull;</span>
                <span>📄 GST Invoice</span>
              </div>
              <p className="svc-consult-note">
                ₹99 is a prepaid consultation fee. Project pricing is quoted after the call and is separate from this fee.
              </p>

              {/* Direct WhatsApp Fast-Track */}
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <a
                  href={`https://wa.me/919818224995?text=${encodeURIComponent(
                    `Hi Reddington Global, I would like to book a ₹99 consultation for ${activeService}${interestedPlan ? ` (interested in the ${interestedPlan.name} plan)` : ''}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#F6D97E',
                    fontSize: '0.8rem',
                    fontWeight: 650,
                    textDecoration: 'none',
                    opacity: 0.9,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <span>💬 Fast-Track via WhatsApp (+91 98182 24995)</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
