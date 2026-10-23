'use client';

import { useState, useEffect } from 'react';
import { trackLeadSubmission } from '../lib/analytics/events';
import { startConsultationPayment } from '../lib/payment';
import { getPackagesForService } from '../lib/packages-data';

export default function ServiceLeadForm({ serviceTitle, serviceSlug }) {
  const isWebDev =
    (serviceSlug || '').includes('web') ||
    (serviceTitle || '').toLowerCase().includes('web') ||
    !serviceSlug;

  const packages = getPackagesForService(serviceSlug || serviceTitle || 'web-development');
  const defaultPkg = packages.find((p) => p.isDefault) || packages[0];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: 'Clinic / Health',
    gstNumber: '',
    packageId: defaultPkg?.id || 'web-business-4999',
    requirement: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: '',
    orderId: '',
    paymentId: '',
  });

  useEffect(() => {
    const pkgs = getPackagesForService(serviceSlug || serviceTitle);
    const def = pkgs.find((p) => p.isDefault) || pkgs[0];
    if (def) {
      setFormData((prev) => ({ ...prev, packageId: def.id }));
    }
  }, [serviceSlug, serviceTitle]);

  const currentPackage =
    packages.find((p) => p.id === formData.packageId) || packages[0] || defaultPkg;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'gstNumber') {
      const formattedGst = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      setFormData((prev) => ({ ...prev, gstNumber: formattedGst }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '', orderId: '', paymentId: '' });

    const activeService = serviceTitle || 'Website Development';
    const activePrice = currentPackage?.price || 4999;

    trackLeadSubmission({
      form_name: `service_booking_${serviceSlug || 'web'}`,
      form_location: `service_card_${serviceSlug || 'web'}`,
      service_requested: `${activeService} - ${currentPackage?.name}`,
      amount: activePrice,
    });

    try {
      await startConsultationPayment({
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || formData.businessType,
          gstNumber: formData.gstNumber,
          selectedPackage: currentPackage?.name || 'Complete Business Website',
          packageId: currentPackage?.id || 'web-business-4999',
          packagePrice: activePrice,
          message: `Business Type: ${formData.businessType}. Requirements: ${formData.requirement || 'Standard 5-page setup'}`,
        },
        serviceName: `${activeService} — ${currentPackage?.name || 'Booking'}`,
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
        error: err.message || 'Error initializing booking.',
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
          <span className="svc-curved-title-icon">⚡</span>
          <span>RGC DEV STUDIO // WORKSTATION</span>
        </div>

        <div className="svc-curved-status">
          <span className="svc-screen-status-dot"></span>
          <span>LIVE IN 7 DAYS</span>
        </div>
      </div>

      {/* ── Screen Ambient Inner Area ── */}
      <div className="svc-curved-display">
        {/* Floating Center Glassmorphic Card (matching Image 3) */}
        <div className="svc-clean-card">
          <h3 className="svc-clean-title">Book Your Website</h3>
          <p className="svc-clean-subtitle">
            Get your business live in 7 days &bull; <strong>{currentPackage?.priceDisplay || '₹4,999 + GST'}</strong>
          </p>

          {status.success ? (
            <div className="svc-clean-success">
              <div className="svc-clean-success-icon">✓</div>
              <h4>Project Registered Successfully!</h4>
              <p>
                Thank you, <strong>{formData.name || 'Partner'}</strong>. Your booking for{' '}
                <strong>{currentPackage?.name || 'Website Development'}</strong> is confirmed.
              </p>
              <div className="svc-clean-success-box">
                <div>
                  <strong>Order ID:</strong> {status.orderId}
                </div>
                <div>
                  <strong>Selected Plan:</strong> {currentPackage?.name} ({currentPackage?.priceDisplay})
                </div>
                <div>
                  <strong>Turnaround SLA:</strong> {currentPackage?.timeline || 'Live in 7 Days'}
                </div>
                {formData.gstNumber && (
                  <div>
                    <strong>GSTIN:</strong> {formData.gstNumber}
                  </div>
                )}
                <div className="svc-clean-success-note">
                  ✉️ Tax invoice and specification onboarding dispatched to <strong>{formData.email}</strong>.
                </div>
              </div>
              <div className="svc-clean-success-actions">
                <a
                  href={`/invoice/${status.orderId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary svc-clean-btn-compact"
                >
                  📄 View Tax Invoice (PDF)
                </a>
                <a
                  href={`https://wa.me/919818224995?text=${encodeURIComponent(`Hi Reddington Global Developers, I have booked the ${currentPackage?.name || 'Website'} package (Order: ${status.orderId}). Here are my details to start Day 1 design.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="svc-clean-btn svc-clean-btn--wa"
                >
                  Connect on WhatsApp Now ›
                </a>
              </div>
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
                  placeholder="First & Last Name *"
                  value={formData.name}
                  onChange={handleChange}
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
                  className="svc-clean-input"
                />
              </div>

              {/* Row 2: Email & Business Name */}
              <div className="svc-clean-row">
                <input
                  id="svc-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  className="svc-clean-input"
                />
                <input
                  id="svc-company"
                  name="company"
                  type="text"
                  placeholder="Business / Brand Name"
                  value={formData.company}
                  onChange={handleChange}
                  className="svc-clean-input"
                />
              </div>

              {/* Row 3: Business Type & GSTIN */}
              <div className="svc-clean-row">
                <div className="svc-clean-select-wrap">
                  <select
                    id="svc-businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
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
                  className="svc-clean-input svc-clean-input--uppercase"
                />
              </div>

              {/* Row 4: Website Package Selection (Single Basic Plan or Multi-tier Dropdown) */}
              {packages.length > 1 ? (
                <div className="svc-clean-select-wrap svc-clean-full">
                  <select
                    id="svc-package"
                    name="packageId"
                    value={formData.packageId}
                    onChange={handleChange}
                    className="svc-clean-input svc-clean-select"
                  >
                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} — {pkg.priceDisplay}
                      </option>
                    ))}
                  </select>
                  <span className="svc-clean-arrow" aria-hidden="true">▾</span>
                </div>
              ) : (
                <div className="svc-clean-plan-chip svc-clean-full">
                  <div className="svc-clean-plan-chip__left">
                    <span className="svc-clean-plan-chip__tag">PLAN</span>
                    <strong className="svc-clean-plan-chip__name">{currentPackage?.name || 'Basic Bundle'}</strong>
                  </div>
                  <div className="svc-clean-plan-chip__price">
                    {currentPackage?.priceDisplay || '₹4,999 + GST'}
                  </div>
                </div>
              )}

              {/* Row 5: Notes & Requirements */}
              <input
                id="svc-requirement"
                name="requirement"
                type="text"
                placeholder="Message / Requirements (e.g. 5 pages, logo ready, need booking)"
                value={formData.requirement}
                onChange={handleChange}
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
                    <span className="svc-form-spinner"></span> Initializing Booking...
                  </span>
                ) : (
                  isWebDev ? 'Book your website @4999 +gst ›' : `Book Service (${currentPackage?.priceDisplay || '₹4,999'}) ›`
                )}
              </button>

              {/* Micro-Trust Strip */}
              <div className="svc-clean-trust">
                <span>⚡ Live in 7 Days</span>
                <span>&bull;</span>
                <span>✔ 30-Day Free Support</span>
                <span>&bull;</span>
                <span>🔒 100% Code Ownership</span>
              </div>


            </form>
          )}
        </div>
      </div>


    </div>
  );
}
