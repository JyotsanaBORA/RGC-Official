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
  // 2. DEFAULT PACKAGES FOR OTHER PRACTICES
  // ═══════════════════════════════════════════════════════════════════
  'default': [
    {
      id: 'standard-booking',
      name: 'Dedicated Service Engagement',
      badge: 'Developer Pod',
      price: 4999,
      currency: 'INR',
      priceDisplay: 'From ₹4,999',
      timeline: '7 - 14 Days Delivery',
      deliverables: [
        'Dedicated team allocation with technical lead',
        'Milestone-driven execution & continuous staging reviews',
        'Role-based security & 100% source code ownership',
      ],
      description: 'Connect with our dedicated engineers and specialists to build and launch your project.',
      isPopular: true,
      isDefault: true,
    },
  ],
};

/**
 * Helper to fetch packages by service slug or service title
 */
export function getPackagesForService(serviceSlugOrTitle) {
  if (!serviceSlugOrTitle) return SERVICE_PACKAGES['web-development'];

  const normalized = serviceSlugOrTitle.toLowerCase().trim();

  if (
    normalized.includes('web') ||
    normalized.includes('website') ||
    normalized.includes('full-stack') ||
    normalized.includes('frontend') ||
    normalized === 'web-development'
  ) {
    return SERVICE_PACKAGES['web-development'];
  }

  return SERVICE_PACKAGES[normalized] || SERVICE_PACKAGES['default'];
}
