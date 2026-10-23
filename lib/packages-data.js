/**
 * Reddington Global — Service Packages Registry
 * Configurable service package tiers and plans for Website Development and core practices.
 */

export const SERVICE_PACKAGES = {
  // ═══════════════════════════════════════════════════════════════════
  // 1. WEBSITE DEVELOPMENT PACKAGES (As requested by client)
  // ═══════════════════════════════════════════════════════════════════
  'web-development': [
    {
      id: 'web-business-4999',
      name: 'Basic Bundle',
      badge: 'Live in 7 Days',
      price: 4999,
      currency: 'INR',
      priceDisplay: '₹4,999 + GST',
      timeline: 'Guaranteed 7 Days',
      deliverables: [
        'Up to 5 pages (Home, About, Services, Gallery, Contact)',
        'Mobile-friendly design (Looks sharp on every phone)',
        'WhatsApp chat button + one-tap click-to-call',
        'Lead enquiry form (leads straight to your inbox)',
        'Google Maps location + Basic SEO setup',
        'SSL security padlock & social media links',
        '2 rounds of revisions',
        '30 days free support (small fixes after launch)',
      ],
      description: 'A complete, mobile-ready website. Live in 7 days. No templates you outgrow. No monthly fees to us.',
      isPopular: true,
      isDefault: true,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // 2. DEFAULT PACKAGES FOR ALL OTHER PRACTICES (Strategic Discovery @ ₹99)
  // ═══════════════════════════════════════════════════════════════════
  'default': [
    {
      id: 'consultation-99',
      name: '1-on-1 Strategic Consultation',
      badge: 'Director Discovery',
      price: 99,
      currency: 'INR',
      priceDisplay: '₹99 (One-Time)',
      timeline: 'Scheduled Within 24-48 Hours',
      deliverables: [
        'Direct 1-on-1 session with Senior Practice Director',
        'Operational bottleneck assessment & workflow audit',
        'Tailored implementation roadmap & SLA architecture',
        'Cost-optimization & compliance risk mitigation plan',
      ],
      description: 'Book a 1-on-1 strategic session with our Practice Director. Introductory fee ₹99, fully deductible upon formal engagement.',
      isPopular: true,
      isDefault: true,
    },
  ],
};

/**
 * Helper to fetch packages by service slug or service title
 */
export function getPackagesForService(serviceSlugOrTitle) {
  if (!serviceSlugOrTitle) return SERVICE_PACKAGES['default'];

  const normalized = serviceSlugOrTitle.toLowerCase().trim();

  if (
    normalized === 'web-development' ||
    normalized === 'web-dev' ||
    normalized === 'website-development' ||
    normalized.startsWith('web-dev') ||
    normalized.includes('website development')
  ) {
    return SERVICE_PACKAGES['web-development'];
  }

  return SERVICE_PACKAGES[normalized] || SERVICE_PACKAGES['default'];
}
