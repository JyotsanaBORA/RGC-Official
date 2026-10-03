'use client';
import React, { useState } from 'react';

export default function BpoPartnerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
    seatCapacity: '',
    campaignType: 'US Voice Process',
    infrastructure: '',
    experience: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`BPO Partnership Registration: ${formData.companyName}`);
    const body = encodeURIComponent(
      `Company Name: ${formData.companyName}\n` +
      `Contact Person: ${formData.contactPerson}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Location: ${formData.location}\n` +
      `Available Seats: ${formData.seatCapacity}\n` +
      `Preferred Campaign: ${formData.campaignType}\n` +
      `Infrastructure/Dialer: ${formData.infrastructure}\n` +
      `Experience Summary: ${formData.experience}\n\n` +
      `Additional Notes:\n${formData.message}`
    );
    window.location.href = `mailto:sales@reddingtonglobal.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="bpo-form-container" id="partner-form">
      <div className="ct-form-header">
        <p className="ct-form-header__eyebrow">Partner Onboarding</p>
        <h3 className="ct-form-header__title">Register Your Call Center</h3>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', marginTop: '6px' }}>
          Tell us about your team and capacity. Our partnership managers will review your profile and reach out within 24 hours.
        </p>
        <div className="ct-form-header__rule" aria-hidden="true"></div>
      </div>

      {submitted ? (
        <div className="bpo-success-state" style={{ textAlign: 'center', padding: '36px 20px' }}>
          <div style={{ fontSize: '42px', marginBottom: '12px' }}>✓</div>
          <h4 style={{ fontSize: '22px', color: '#F6D97E', marginBottom: '8px' }}>Registration Received</h4>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '440px', margin: '0 auto' }}>
            Thank you for registering. Your details have been routed to our BPO Campaign Management desk. We will connect with you shortly.
          </p>
          <button
            type="button"
            className="btn btn--gold btn--sm"
            style={{ marginTop: '20px' }}
            onClick={() => setSubmitted(false)}
          >
            Submit Another Center
          </button>
        </div>
      ) : (
        <form className="ct-form" onSubmit={handleSubmit}>
          <div className="ct-form__row">
            <div className="ff">
              <input
                id="bpCompany"
                name="companyName"
                type="text"
                placeholder=" "
                required
                value={formData.companyName}
                onChange={handleChange}
              />
              <label htmlFor="bpCompany">Company / Call Center Name *</label>
              <span className="ff__bar"></span>
            </div>

            <div className="ff">
              <input
                id="bpPerson"
                name="contactPerson"
                type="text"
                placeholder=" "
                required
                value={formData.contactPerson}
                onChange={handleChange}
              />
              <label htmlFor="bpPerson">Contact Person Name &amp; Title *</label>
              <span className="ff__bar"></span>
            </div>
          </div>

          <div className="ct-form__row">
            <div className="ff">
              <input
                id="bpEmail"
                name="email"
                type="email"
                placeholder=" "
                required
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="bpEmail">Business Email *</label>
              <span className="ff__bar"></span>
            </div>

            <div className="ff">
              <input
                id="bpPhone"
                name="phone"
                type="tel"
                placeholder=" "
                required
                value={formData.phone}
                onChange={handleChange}
              />
              <label htmlFor="bpPhone">Phone / WhatsApp Number *</label>
              <span className="ff__bar"></span>
            </div>
          </div>

          <div className="ct-form__row">
            <div className="ff">
              <input
                id="bpLocation"
                name="location"
                type="text"
                placeholder=" "
                required
                value={formData.location}
                onChange={handleChange}
              />
              <label htmlFor="bpLocation">Operating Location (City, Country) *</label>
              <span className="ff__bar"></span>
            </div>

            <div className="ff ct-form__select-wrap">
              <select
                id="bpSeats"
                name="seatCapacity"
                required
                value={formData.seatCapacity}
                onChange={handleChange}
              >
                <option value="" disabled hidden></option>
                <option value="10 - 25 Seats">10 – 25 Seats</option>
                <option value="25 - 50 Seats">25 – 50 Seats</option>
                <option value="50 - 100 Seats">50 – 100 Seats</option>
                <option value="100+ Seats">100+ Enterprise Seats</option>
              </select>
              <label htmlFor="bpSeats">Available Seat Capacity *</label>
              <span className="ff__bar"></span>
            </div>
          </div>

          <div className="ct-form__row">
            <div className="ff ct-form__select-wrap">
              <select
                id="bpCampaign"
                name="campaignType"
                value={formData.campaignType}
                onChange={handleChange}
              >
                <option value="US Voice (Outbound / Inbound)">US Voice (Outbound / Inbound)</option>
                <option value="Financial Services & Debt Campaigns">Financial Services &amp; Debt Campaigns</option>
                <option value="24/7 Customer Care & Support">24/7 Customer Care &amp; Support</option>
                <option value="Lead Generation & Surveys">Lead Generation &amp; Surveys</option>
                <option value="Back Office & Non-Voice">Back Office &amp; Non-Voice</option>
              </select>
              <label htmlFor="bpCampaign">Primary Campaign Domain</label>
              <span className="ff__bar"></span>
            </div>

            <div className="ff">
              <input
                id="bpInfra"
                name="infrastructure"
                type="text"
                placeholder=" "
                value={formData.infrastructure}
                onChange={handleChange}
              />
              <label htmlFor="bpInfra">Dialer / Infra (e.g. Vicidial, Five9)</label>
              <span className="ff__bar"></span>
            </div>
          </div>

          <div className="ff ff--textarea">
            <textarea
              id="bpExp"
              name="experience"
              rows={2}
              placeholder=" "
              value={formData.experience}
              onChange={handleChange}
            />
            <label htmlFor="bpExp">Prior Campaign Experience &amp; Highlights</label>
            <span className="ff__bar"></span>
          </div>

          <div className="ff ff--textarea">
            <textarea
              id="bpMsg"
              name="message"
              rows={3}
              placeholder=" "
              value={formData.message}
              onChange={handleChange}
            />
            <label htmlFor="bpMsg">Any specific requirements or queries?</label>
            <span className="ff__bar"></span>
          </div>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap', marginTop: '10px' }}>
            <button type="submit" className="btn btn--gold">
              Register Your Call Center →
            </button>
            <a href="tel:+919818224495" className="btn btn--ghost btn--sm">
              Speak With Our Partnership Team
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
