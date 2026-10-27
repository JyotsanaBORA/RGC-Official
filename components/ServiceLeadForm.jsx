'use client';

import { useState, useEffect, useRef } from 'react';
import { trackLeadSubmission } from '../lib/analytics/events';
import { startConsultationPayment } from '../lib/payment';
import { getPackagesForService } from '../lib/packages-data';
import { getAttributionData } from '../lib/analytics/attribution';

export default function ServiceLeadForm({ serviceTitle, serviceSlug }) {
  // Strictly isolate Website Development and Payroll from generic consultation
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

  const packages = getPackagesForService(serviceSlug || serviceTitle);
  const defaultPkg = packages.find((p) => p.isDefault) || packages[0];

  const defaultServiceArea = serviceTitle || 'Customer Service & Support';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: isWebDev
      ? 'Clinic / Healthcare'
      : isPayroll
      ? 'Upto 10 Employees (₹4,999 Package)'
      : defaultServiceArea,
    gstNumber: '',
    packageId:
      defaultPkg?.id ||
      (isWebDev ? 'web-business-4999' : isPayroll ? 'payroll-starter-4999' : 'consultation-99'),
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

  useEffect(() => {
    const pkgs = getPackagesForService(serviceSlug || serviceTitle);
    const def = pkgs.find((p) => p.isDefault) || pkgs[0];
    if (def) {
      setFormData((prev) => ({
        ...prev,
        packageId: def.id,
        businessType: isWebDev
          ? prev.businessType
          : isPayroll
          ? (prev.businessType.includes('Employees') ? prev.businessType : 'Upto 10 Employees (₹4,999 Package)')
          : (serviceTitle || prev.businessType),
      }));
    }
  }, [serviceSlug, serviceTitle, isWebDev, isPayroll]);

  // Plan cards elsewhere on the page dispatch `rg:select-plan` with a package id
  useEffect(() => {
    const onSelectPlan = (e) => {
      const id = e.detail;
      if (!packages.some((p) => p.id === id)) return;
      setFormData((prev) => ({ ...prev, packageId: id }));
    };
    window.addEventListener('rg:select-plan', onSelectPlan);
    return () => window.removeEventListener('rg:select-plan', onSelectPlan);
  }, [packages]);

  const currentPackage =
    packages.find((p) => p.id === formData.packageId) || packages[0] || defaultPkg;
  const planShortName = (currentPackage?.name || 'Basic Website').replace(/ Website$/, '');

  // Background auto-save for abandoned form leads
  const saveLeadDraft = async (dataToSave = formData) => {
    const cleanPhone = (dataToSave.phone || '').trim();
    const cleanEmail = (dataToSave.email || '').trim();
    if (cleanPhone.length < 7 && (!cleanEmail.includes('@') || !cleanEmail.includes('.'))) {
      return;
    }

    try {
      const activeService =
        serviceTitle ||
        (isWebDev
          ? 'Website Development'
          : isPayroll
          ? 'Payroll & Compensation Management'
          : 'Strategic Consultation');
      const activePrice = currentPackage?.price || (isWebDev || isPayroll ? 4999 : 99);
      const attribution = getAttributionData();

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
          selectedPackage:
            currentPackage?.name ||
            (isWebDev
              ? 'Basic Website'
              : isPayroll
              ? 'Payroll Starter Package'
              : 'Strategic Consultation'),
          packageId: currentPackage?.id || '',
          packagePrice: activePrice,
          attribution,
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

    const activeService =
      serviceTitle ||
      (isWebDev
        ? 'Website Development'
        : isPayroll
        ? 'Payroll & Compensation Management'
        : 'Strategic Consultation');
    const activePrice = currentPackage?.price || (isWebDev || isPayroll ? 4999 : 99);

    trackLeadSubmission({
      form_name: `service_booking_${serviceSlug || (isWebDev ? 'web' : isPayroll ? 'payroll' : 'consultation')}`,
      form_location: `service_card_${serviceSlug || (isWebDev ? 'web' : isPayroll ? 'payroll' : 'consultation')}`,
      service_requested: `${activeService} - ${currentPackage?.name}`,
      amount: activePrice,
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
          selectedPackage:
            currentPackage?.name ||
            (isWebDev
              ? 'Basic Website'
              : isPayroll
              ? 'Payroll Starter Package'
              : '1-on-1 Strategic Consultation'),
          packageId:
            currentPackage?.id ||
            (isWebDev
              ? 'web-business-4999'
              : isPayroll
              ? 'payroll-starter-4999'
              : 'consultation-99'),
          packagePrice: activePrice,
          message: `${isWebDev ? 'Business Type' : isPayroll ? 'Team Size' : 'Practice Area'}: ${formData.businessType}. Requirements: ${formData.requirement || 'Standard engagement'}`,
        },
        serviceName: isWebDev
          ? `Website Development — ${currentPackage?.name || 'Basic Website'}`
          : isPayroll
          ? 'Payroll Services — Starter Package (Upto 10 Staff)'
          : `${activeService} — Strategic Consultation`,
        amount: activePrice,
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
          <span>
            {isWebDev
              ? 'Dev Studio'
              : isPayroll
              ? 'Payroll Desk'
              : 'Consultation'}
          </span>
        </div>

        <div className="svc-curved-status">
          <span className="svc-screen-status-dot"></span>
          <span>
            {isWebDev
              ? `Live in ${currentPackage?.timeline || '7 Days'}`
              : isPayroll
              ? 'Active'
              : 'Available'}
          </span>
        </div>
      </div>

      {/* ── Screen Ambient Inner Area ── */}
      <div className="svc-curved-display">
        {/* Floating Center Glassmorphic Card */}
        <div className="svc-clean-card">
          <h3 className="svc-clean-title">
            {isWebDev
              ? 'Book Your Website'
              : isPayroll
              ? 'Book Payroll'
              : 'Schedule Consultation'}
          </h3>
          <p className="svc-clean-subtitle">
            {isWebDev ? (
              <>
                Get your business live in {(currentPackage?.timeline || '7 Days').toLowerCase()} &bull; <strong>{currentPackage?.priceDisplay || '₹4,999 + GST'}</strong>
              </>
            ) : isPayroll ? (
              <>
                Complete payroll data &amp; balance &bull; <strong>{currentPackage?.priceDisplay || '₹4,999 + GST'}</strong>
              </>
            ) : (
              <>
                1-on-1 strategy call for {serviceTitle || 'Enterprise Operations'} &bull; <strong>{currentPackage?.priceDisplay || '₹99 (One-Time)'}</strong>
              </>
            )}
          </p>

          {status.success ? (
            <div className="svc-clean-success">
              <div className="svc-clean-success-icon">✓</div>
              <h4>
                {isWebDev
                  ? 'Project Registered Successfully!'
                  : isPayroll
                  ? 'Payroll Onboarding Confirmed!'
                  : 'Consultation Scheduled Successfully!'}
              </h4>
              <p>
                Thank you, <strong>{formData.name || 'Partner'}</strong>. Your booking for{' '}
                <strong>
                  {currentPackage?.name ||
                    (isWebDev
                      ? 'Basic Website'
                      : isPayroll
                      ? 'Payroll Starter Package'
                      : 'Strategic Consultation')}
                </strong>{' '}
                is confirmed.
              </p>
              <div className="svc-clean-success-box">
                <div>
                  <strong>Order ID:</strong> {status.orderId}
                </div>
                <div>
                  <strong>{isWebDev || isPayroll ? 'Selected Plan:' : 'Session Type:'}</strong> {currentPackage?.name} ({currentPackage?.priceDisplay})
                </div>
              </div>
              <p style={{ marginTop: '14px', fontSize: '13px', color: '#D4C5B9' }}>
                {isWebDev
                  ? 'Our lead developer has received your specifications. We will contact you on WhatsApp within 2 hours.'
                  : isPayroll
                  ? 'Our Payroll Director has received your onboarding request. We will contact you on WhatsApp / Phone within 2 hours to collect attendance logs and payroll master data.'
                  : 'Our Practice Director has reserved your strategic slot. A calendar invitation and briefing note have been sent.'}
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
                  placeholder={isWebDev ? 'First & Last Name *' : 'Full Name *'}
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
                  placeholder={isWebDev ? 'Email Address *' : 'Corporate Email *'}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="svc-clean-input"
                />
                <input
                  id="svc-company"
                  name="company"
                  type="text"
                  placeholder={isWebDev ? 'Business / Brand Name' : isPayroll ? 'Company Name' : 'Company / Organization'}
                  value={formData.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="svc-clean-input"
                />
              </div>

              {/* Row 3: Business Type / Practice Area & GSTIN */}
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
                      <option value="Upto 10 Employees (₹4,999 Package)">Upto 10 Employees</option>
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

              {/* Row 4: Plan Picker (multi-plan services) / Plan Chip / Consultation Display */}
              {packages.length > 1 ? (
                <div className="svc-plan-picker svc-clean-full" role="radiogroup" aria-label="Choose your plan">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      role="radio"
                      aria-checked={pkg.id === currentPackage?.id}
                      className={`svc-plan-picker__opt${pkg.id === currentPackage?.id ? ' is-active' : ''}`}
                      onClick={() => setFormData((prev) => ({ ...prev, packageId: pkg.id }))}
                    >
                      {pkg.isPopular && <span className="svc-plan-picker__flag">Popular</span>}
                      <span className="svc-plan-picker__name">{pkg.name.replace(/ Website$/, '')}</span>
                      <span className="svc-plan-picker__price">₹{pkg.price.toLocaleString('en-IN')}</span>
                    </button>
                  ))}
                </div>
              ) : (
              <div className="svc-clean-plan-chip svc-clean-full">
                <div className="svc-clean-plan-chip__left">
                  <span className="svc-clean-plan-chip__tag">
                    {isWebDev ? 'PLAN' : isPayroll ? 'PACKAGE' : 'SESSION'}
                  </span>
                  <strong className="svc-clean-plan-chip__name">
                    {currentPackage?.name ||
                      (isWebDev
                        ? 'Basic Website'
                        : isPayroll
                        ? 'Payroll Package'
                        : '1-on-1 Strategic Consultation')}
                  </strong>
                </div>
                <div className="svc-clean-plan-chip__price">
                  {currentPackage?.priceDisplay ||
                    (isWebDev || isPayroll ? '₹4,999 + GST' : '₹99 (One-Time)')}
                </div>
              </div>
              )}

              {/* Row 5: Notes & Requirements */}
              <input
                id="svc-requirement"
                name="requirement"
                type="text"
                placeholder={
                  isWebDev
                    ? 'Message / Requirements (e.g. 5 pages, logo ready, need booking)'
                    : isPayroll
                    ? 'Notes / Requirements (e.g. 8 staff, salary cycle on 1st)...'
                    : `Scope / Objectives (e.g. team size, current challenges, timeline for ${serviceTitle || 'operations'})...`
                }
                value={formData.requirement}
                onChange={handleChange}
                onBlur={handleBlur}
                className="svc-clean-input svc-clean-full"
              />

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status.loading}
                className="svc-clean-btn"
              >
                {status.loading ? (
                  <span className="svc-clean-loading">
                    <span className="svc-form-spinner"></span> Initializing Gateway...
                  </span>
                ) : isWebDev ? (
                  `Book ${planShortName} @ ${currentPackage?.priceDisplay || '₹4,999 + GST'} ›`
                ) : isPayroll ? (
                  'Book Payroll @ ₹4,999 + GST →'
                ) : (
                  'Confirm Slot & Pay ₹99 →'
                )}
              </button>

              {/* Micro-Trust Strip */}
              <div className="svc-clean-trust">
                {isWebDev ? (
                  <>
                    <span>⚡ Live in {currentPackage?.timeline || '7 Days'}</span>
                    <span>&bull;</span>
                    <span>✔ Free Support Included</span>
                    <span>&bull;</span>
                    <span>🔒 100% Code Ownership</span>
                  </>
                ) : isPayroll ? (
                  <>
                    <span>⚡ 100% Calculation Accuracy</span>
                    <span>&bull;</span>
                    <span>✔ Statutory PF/ESIC/PT</span>
                    <span>&bull;</span>
                    <span>📄 Net Salary Balance Sheets</span>
                  </>
                ) : (
                  <>
                    <span>🔒 Strict Mutual NDA</span>
                    <span>&bull;</span>
                    <span>⚡ Instant Gateway</span>
                    <span>&bull;</span>
                    <span>📄 GST Tax Invoice</span>
                  </>
                )}
              </div>

              {/* Direct WhatsApp Fast-Track */}
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <a
                  href={`https://wa.me/919818224995?text=${encodeURIComponent(
                    isWebDev
                      ? `Hi Reddington Global, I want to book the ${currentPackage?.name || 'Basic Website'} package for ${currentPackage?.priceDisplay || '₹4,999 + GST'}.`
                      : isPayroll
                      ? 'Hi Reddington Global, I want to book the Payroll Package for ₹4,999 (upto 10 employees).'
                      : `Hi Reddington Global, I would like to schedule a ₹99 strategic consultation for ${serviceTitle || 'our enterprise operations'}.`
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
