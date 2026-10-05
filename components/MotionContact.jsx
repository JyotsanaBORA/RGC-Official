'use client';
import React from 'react';
import { trackLeadSubmission, trackContactClick } from '../lib/analytics/events';

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
  { Icon: IconEmail, label: 'Email us', value: 'sales@reddingtonglobal.com', href: 'mailto:sales@reddingtonglobal.com', badge: 'Direct Desk' },
  { Icon: IconPhone, label: 'Call — India', value: '+91 98182 24495', href: 'tel:+919818224495', badge: 'Contact No.' },
  { Icon: IconPhone, label: 'Call — International', value: '+1 (949) 779-4978', href: 'tel:+19497794978', badge: 'US Direct' },
];

const OFFICES = [
  {
    name: 'Gurugram Operations Campus',
    addr: '750 Udyog Vihar Phase 5, Sector 19, Gurugram, Haryana 122016',
    entities: ['RG Consultancy Pvt Ltd', 'BPO Operations Floor', 'MyCashBridge Fintech', 'RG Care Foundation'],
    href: 'https://www.reddingtonglobal.com/',
  },
  {
    name: 'RG Group Inc',
    region: 'USA Global Office',
    flag: '🇺🇸',
    addr: '30 N Gould St, Ste R, Sheridan, WY 82801, USA',
    entities: ['North America Client Solutions'],
    href: 'https://www.rgdebtrelief.com/',
  },
];

/* ── Floating-label field ── */
function FloatField({ id, name, label, type = 'text', required = false, rows, autoComplete }) {
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
      />
      <label htmlFor={id}>{label}</label>
      <span className="ff__bar" aria-hidden="true"></span>
    </div>
  );
}

export default function MotionContact() {
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
              Our Global Offices &amp; Delivery Hubs
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
            <p className="ct-form-header__eyebrow">Free Consultation</p>
            <h3 className="ct-form-header__title">Share your requirements</h3>
            <div className="ct-form-header__rule" aria-hidden="true"></div>
          </div>

          <form
            id="contactForm"
            className="ct-form"
            action="mailto:sales@reddingtonglobal.com"
            method="post"
            encType="text/plain"
            onSubmit={(e) => {
              const service = e.currentTarget.elements.service?.value;
              trackLeadSubmission({ service });
            }}
          >
            <div className="ct-form__row">
              <FloatField id="fName"    name="name"    label="Full Name"     autoComplete="name"         required />
              <FloatField id="fCompany" name="company" label="Company"       autoComplete="organization"          />
            </div>
            <FloatField   id="fEmail"   name="email"   label="Work Email"    type="email" autoComplete="email"  required />
            <div className="ct-form__row">
              <FloatField id="fPhone"   name="phone"   label="Phone Number"  type="tel"   autoComplete="tel"               />
              <div className="ff ct-form__select-wrap">
                <select id="fService" name="service" defaultValue="">
                  <option value="" disabled hidden></option>
                  <option>BPO — Sales &amp; Revenue Operations</option>
                  <option>BPO — Back Office Operations</option>
                  <option>BPO — Customer Services by Experts</option>
                  <option>Consultancy — SaaS &amp; Digital Solutions</option>
                  <option>Consultancy — Bookkeeping &amp; Accountancy</option>
                  <option>Consultancy — IT Services &amp; Infrastructure</option>
                  <option>Digital Marketing &amp; Growth</option>
                  <option>Other Enterprise Inquiries</option>
                </select>
                <label htmlFor="fService">Service Interested In</label>
                <span className="ff__bar" aria-hidden="true"></span>
              </div>
            </div>
            <FloatField id="fMsg" name="message" label="How can we help you?" required rows={4} />

            <button
              type="submit"
              className="btn btn--gold ct-form__submit"
            >
              Send Message
              <svg className="ct-form__arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 10h12M11 5l5 5-5 5"/>
              </svg>
            </button>

            <p className="ct-form__note">
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 110 1.5A.75.75 0 018 4zm1 8H7v-5h2v5z"/>
              </svg>
              Our team typically responds within one business day.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
