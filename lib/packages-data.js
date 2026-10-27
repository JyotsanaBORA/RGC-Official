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
      name: 'Basic Website',
      badge: 'Live in 7 Days',
      price: 4999,
      currency: 'INR',
      priceDisplay: '₹4,999 + GST',
      timeline: '7 Days',
      bestFor: 'Your first website: shop, clinic or freelancer',
      deliverables: [
        'Up to 5 pages (Home, About, Services, Gallery, Contact)',
        'Mobile-friendly, clean layout',
        'WhatsApp chat button + one-tap click-to-call',
        'Lead enquiry form (leads straight to your inbox)',
        'Google Maps location + basic SEO setup',
        'SSL security padlock & social media links',
        '2 rounds of revisions',
        '30 days free support',
      ],
      description: 'A complete, mobile-ready website. Live in 7 days. No templates you outgrow. No monthly fees to us.',
      isPopular: false,
      isDefault: true,
    },
    {
      id: 'web-standard-9999',
      name: 'Standard Website',
      badge: 'Most Popular',
      price: 9999,
      currency: 'INR',
      priceDisplay: '₹9,999 + GST',
      timeline: '10 Days',
      bestFor: 'Growing businesses that want more leads',
      deliverables: [
        'Everything in Basic, plus:',
        'Up to 10 pages with custom design matched to your brand',
        'Blog + easy editor to update your own content',
        'Auto-reply emails + leads copied to Google Sheets',
        '1 API integration (e.g. Google Sheets, email marketing)',
        'SEO for 5 key pages + Google Business Profile setup',
        'Google Analytics & Search Console setup',
        'Speed optimisation + image gallery',
        '3 rounds of revisions',
        '60 days free support',
      ],
      description: 'A brand-matched website built to bring in leads, with a blog you can update yourself.',
      isPopular: true,
      isDefault: false,
    },
    {
      id: 'web-premium-19999',
      name: 'Premium Website',
      badge: 'Payments & Integrations',
      price: 19999,
      currency: 'INR',
      priceDisplay: '₹19,999 + GST',
      timeline: '15–21 Days',
      bestFor: 'Take payments, bookings or connect your tools',
      deliverables: [
        'Everything in Standard, plus:',
        'Up to 20 pages, or an online store with up to 50 products',
        'Premium custom design with animations',
        'Up to 3 API integrations: Razorpay payments, WhatsApp Business alerts, appointment booking, or CRM (Zoho / HubSpot)',
        'Full admin panel + leads dashboard',
        'Full-site SEO, schema markup & 90+ speed score',
        'Google Ads & Meta Pixel conversion tracking',
        '2-language support + 1-hour training session',
        '5 rounds of revisions',
        '90 days priority support',
      ],
      description: 'A full business platform: online payments, bookings, CRM connections and an admin panel.',
      isPopular: false,
      isDefault: false,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // 2. PAYROLL & COMPENSATION PACKAGES (Starting at ₹4,999)
  // ═══════════════════════════════════════════════════════════════════
  'payroll-compensation': [
    {
      id: 'payroll-starter-4999',
      name: 'Payroll Package',
      badge: 'Upto 10 Employees',
      price: 4999,
      currency: 'INR',
      priceDisplay: '₹4,999 + GST',
      timeline: 'Monthly Payroll Cycle',
      deliverables: [
        'Workforce Compensation: Efficient compensation management',
        'Wage Calculation: Accurate wages & payroll calculations',
        'Tax Deduction: Proper tax deduction & processing (TDS)',
        'Statutory Compliance: PF, ESIC & PT reporting support',
        'Payroll Data & Balance: Full employee payroll register & net pay balance sheet',
        'Audit-ready salary statements and payslip generation support',
      ],
      description: 'Let us handle your payroll. Complete wage calculations, statutory compliance, payroll data, and final balance statements starting at ₹4,999/- for upto 10 employees.',
      isPopular: true,
      isDefault: true,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // 3. DEFAULT PACKAGES FOR ALL OTHER PRACTICES (Strategic Discovery @ ₹99)
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

// Extras billed on top of any website plan (shown under the pricing cards)
export const WEB_ADDONS = [
  { label: 'Extra page', priceDisplay: '₹999' },
  { label: 'Extra API integration', priceDisplay: '₹2,999' },
  { label: 'Extra revision round', priceDisplay: '₹999' },
];

/**
 * Server-side lookup so order amounts come from this registry, not the browser
 */
export function getPackageById(packageId) {
  if (!packageId) return null;
  for (const list of Object.values(SERVICE_PACKAGES)) {
    const pkg = list.find((p) => p.id === packageId);
    if (pkg) return pkg;
  }
  return null;
}

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

  if (
    normalized === 'payroll-compensation' ||
    normalized === 'payroll' ||
    normalized.includes('payroll')
  ) {
    return SERVICE_PACKAGES['payroll-compensation'];
  }

  return SERVICE_PACKAGES[normalized] || SERVICE_PACKAGES['default'];
}
