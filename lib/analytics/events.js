'use client';

/**
 * Safe dataLayer pusher for Google Ads & GA4 conversions.
 * Zero external libraries needed.
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    timestamp: new Date().toISOString(),
    ...params,
  });
}

/**
 * Fires when a user submits the consultation inquiry form.
 */
export function trackLeadSubmission(formData = {}) {
  trackEvent('lead_form_submitted', {
    form_name: 'consultation_inquiry',
    service_interest: formData.service || 'general',
  });
}

/**
 * Fires when a candidate submits a career application.
 */
export function trackCareerSubmission(jobTitle = '') {
  trackEvent('career_application_submitted', {
    job_title: jobTitle,
  });
}

/**
 * Fires when a user clicks a phone or email link.
 */
export function trackContactClick(type, value) {
  trackEvent('contact_click', {
    contact_type: type, // 'phone' | 'email' | 'whatsapp'
    contact_value: value,
  });
}
