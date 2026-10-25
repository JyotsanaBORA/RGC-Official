'use client';

/**
 * Safe dataLayer pusher for Google Ads & GA4 conversions.
 * Zero external libraries needed.
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return;

  // 1. Google Tag Manager (dataLayer push)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    timestamp: new Date().toISOString(),
    ...params,
  });

  // 2. Google Analytics 4 direct (gtag)
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

/**
 * Safe Meta Pixel event tracker
 */
export function trackMetaEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', eventName, params);
  }
}

/**
 * Safe Meta Pixel custom event tracker
 */
export function trackMetaCustom(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, params);
  }
}

/**
 * Fires when a user submits the consultation inquiry form.
 */
export function trackLeadSubmission(formData = {}) {
  trackEvent('lead_form_submitted', {
    form_name: formData.form_name || 'consultation_inquiry',
    service_interest: formData.service || formData.service_requested || 'general',
    company: formData.company || '',
  });
  trackMetaEvent('Lead', {
    content_name: formData.service || formData.service_requested || 'general',
    currency: 'INR',
    value: Number(formData.amount) || 99,
  });
}

/**
 * Fires when a candidate submits a career application.
 */
export function trackCareerSubmission(jobTitle = '') {
  trackEvent('career_application_submitted', {
    job_title: jobTitle,
  });
  trackMetaEvent('SubmitApplication', {
    job_title: jobTitle,
  });
}

/**
 * Fires when a user clicks a phone, email, or direct WhatsApp link.
 */
export function trackContactClick(type, value) {
  trackEvent('contact_click', {
    contact_type: type, // 'phone' | 'email' | 'whatsapp'
    contact_value: value,
  });
  trackMetaEvent('Contact', {
    contact_type: type,
  });
}

/**
 * Fires ViewContent (Meta) and view_item (GA4 dataLayer) on service practice pages.
 */
export function trackServiceView({ slug, title, category, price = 99 }) {
  trackEvent('view_item', {
    item_id: slug,
    item_name: title,
    item_category: category,
    price: Number(price),
    currency: 'INR',
  });
  trackMetaEvent('ViewContent', {
    content_name: title,
    content_category: category,
    content_ids: [slug],
    content_type: 'product',
    value: Number(price),
    currency: 'INR',
  });
}

/**
 * Unified Begin Checkout event for Meta Pixel and GA4 dataLayer.
 */
export function trackEcommerceBeginCheckout({ amount = 99, serviceName = '', orderId = '', campaignSource = '', campaignName = '' }) {
  trackEvent('begin_checkout', {
    currency: 'INR',
    value: Number(amount),
    items: [
      {
        item_id: orderId || serviceName,
        item_name: serviceName,
        price: Number(amount),
        quantity: 1,
      },
    ],
  });

  trackMetaEvent('InitiateCheckout', {
    value: Number(amount),
    currency: 'INR',
    content_name: serviceName,
    content_type: 'product',
    order_id: orderId,
    campaign_source: campaignSource,
    campaign_name: campaignName,
  });
}

/**
 * Unified Purchase event for Meta Pixel and GA4 dataLayer.
 */
export function trackEcommercePurchase({ amount = 99, serviceName = '', orderId = '', paymentId = '', campaignSource = '', campaignName = '' }) {
  trackEvent('purchase', {
    transaction_id: paymentId || orderId,
    value: Number(amount),
    currency: 'INR',
    items: [
      {
        item_id: orderId || serviceName,
        item_name: serviceName,
        price: Number(amount),
        quantity: 1,
      },
    ],
  });

  trackMetaEvent('Purchase', {
    value: Number(amount),
    currency: 'INR',
    content_name: serviceName,
    content_type: 'product',
    order_id: orderId,
    payment_id: paymentId,
    campaign_source: campaignSource,
    campaign_name: campaignName,
  });

  trackMetaEvent('Schedule', {
    content_name: serviceName,
    order_id: orderId,
  });
}

