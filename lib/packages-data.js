/**
 * Reddington Global — Service Plans & Consultation Registry
 *
 * Consultation-first model: no service is sold at a fixed price on the website.
 * Each service shows indicative plans ("Starting @" or "Custom quote") and add-on
 * services (no prices). The only payable item is the prepaid ₹99 consultation,
 * where the team recommends a plan, scope, ETA and quotes the final price.
 */

// ═══════════════════════════════════════════════════════════════════
// THE ONLY PAYABLE ITEM: ₹99 consultation (prepaid, not adjusted against project fees)
// ═══════════════════════════════════════════════════════════════════
export const GST_RATE = 0.18;

// Set to false to charge a flat ₹99 inclusive of GST instead of ₹99 + 18% GST
export const CONSULTATION_GST_EXTRA = false;

export const CONSULTATION = {
  id: 'consultation-99',
  name: '1-on-1 Strategic Consultation',
  badge: 'Expert Consultation',
  price: 99,
  currency: 'INR',
  gstExtra: CONSULTATION_GST_EXTRA,
  priceDisplay: CONSULTATION_GST_EXTRA ? '₹99 + GST' : '₹99 only',
  timeline: 'Call within 24 hours',
  deliverables: [
    '1-on-1 call with a senior practice expert',
    'Scope review of your requirements',
    'Recommended plan, timeline (ETA) and quote',
    'Clear next steps, no obligation to proceed',
  ],
  description:
    'A prepaid 1-on-1 consultation. We review your scope and recommend the right plan, timeline and price. The ₹99 fee covers the consultation only and is not adjusted against project fees.',
};

// ═══════════════════════════════════════════════════════════════════
// INDICATIVE PLANS PER SERVICE (display only, never charged on the site)
// startingAt: number → "Starting @ ₹X"; null → "Custom quote"
// ═══════════════════════════════════════════════════════════════════
export const SERVICE_PLANS = {
  'web-development': {
    plans: [
      {
        id: 'web-basic',
        name: 'Basic',
        startingAt: 4999,
        unit: '',
        badge: 'Fastest Launch',
        bestFor: 'Your first website: shop, clinic or freelancer',
        specs: [
          { label: 'Launch', value: '7d' },
          { label: 'Pages', value: '5' },
          { label: 'APIs', value: '—' },
          { label: 'Support', value: '30d' },
        ],
        highlights: [
          'Up to 5 pages (Home, About, Services, Gallery, Contact)',
          'Mobile-friendly, clean layout',
          'WhatsApp chat button + one-tap click-to-call',
          'Lead enquiry form straight to your inbox',
          'Google Maps + basic SEO setup',
          'SSL security & social media links',
        ],
      },
      {
        id: 'web-standard',
        name: 'Standard',
        startingAt: 9999,
        unit: '',
        badge: 'Most Popular',
        isPopular: true,
        bestFor: 'Growing businesses that want more leads',
        specs: [
          { label: 'Launch', value: '10d' },
          { label: 'Pages', value: '10' },
          { label: 'APIs', value: '1' },
          { label: 'Support', value: '60d' },
        ],
        highlights: [
          'Everything in Basic, plus:',
          'Custom design matched to your brand',
          'Blog + easy editor to update your own content',
          'Auto-reply emails + leads copied to Google Sheets',
          'API integration (e.g. Google Sheets, email marketing)',
          'SEO for key pages + Google Business Profile & Analytics',
        ],
      },
      {
        id: 'web-premium',
        name: 'Premium',
        startingAt: 19999,
        unit: '',
        badge: 'Payments & APIs',
        bestFor: 'Take payments, bookings or connect your tools',
        specs: [
          { label: 'Launch', value: '21d' },
          { label: 'Pages', value: '20' },
          { label: 'APIs', value: '3' },
          { label: 'Support', value: '90d' },
        ],
        highlights: [
          'Everything in Standard, plus:',
          'Online store or larger multi-page site',
          'API integrations: Razorpay payments, WhatsApp Business alerts, bookings, CRM (Zoho / HubSpot)',
          'Admin panel + leads dashboard',
          'Full-site SEO, schema markup & speed optimisation',
          'Google Ads & Meta Pixel conversion tracking',
        ],
      },
    ],
    addons: ['Extra pages', 'Additional API integrations', 'Copywriting & content', 'Logo & brand kit', 'Multi-language support', 'Annual maintenance'],
  },

  'payroll-compensation': {
    plans: [
      {
        id: 'payroll-starter',
        name: 'Payroll Package',
        startingAt: 4999,
        unit: '/month',
        badge: 'Up to 10 Employees',
        isPopular: true,
        bestFor: 'Complete monthly payroll for teams of up to 10 employees',
        specs: [
          { label: 'Team', value: 'Upto 10' },
          { label: 'Cycle', value: 'Monthly' },
          { label: 'Accuracy', value: '100%' },
          { label: 'Penalties', value: 'Zero' },
        ],
        highlights: [
          'Workforce Compensation: efficient compensation management',
          'Wage Calculation: accurate wages & payroll calculations',
          'Tax Deduction: proper TDS deduction & processing',
          'Statutory Compliance: PF, ESIC & PT aligned with statutory requirements',
        ],
      },
    ],
    addons: ['Form 16 generation', 'Full & final settlements', 'Reimbursement processing', 'HRMS / attendance integration'],
  },

  'bookkeeping-accountancy': {
    plans: [
      {
        id: 'books-starter',
        name: 'Starter',
        startingAt: 4999,
        unit: '/month',
        badge: 'Up to 50 Transactions',
        isPopular: true,
        bestFor: 'Small businesses & early-stage startups',
        highlights: [
          'Monthly bookkeeping & ledger management',
          'Bank reconciliation',
          'GST return filing support',
          'Monthly P&L statement',
        ],
      },
      {
        id: 'books-growth',
        name: 'Growth',
        startingAt: null,
        unit: '/month',
        badge: 'Higher Volumes',
        bestFor: 'Growing businesses with more transactions',
        highlights: [
          'Everything in Starter, plus:',
          'TDS compliance & returns',
          'Accounts payable & receivable tracking',
          'Monthly management accounts (MIS)',
        ],
      },
      {
        id: 'books-enterprise',
        name: 'Enterprise',
        startingAt: null,
        unit: '/month',
        badge: 'Full Finance Desk',
        bestFor: 'Companies needing audit-ready finance ops',
        highlights: [
          'Everything in Growth, plus:',
          'Statutory filings & corporate returns',
          'Audit support & regulatory compliance',
          'Dedicated accountant',
        ],
      },
    ],
    addons: ['GST e-invoicing setup', 'Year-end audit support', 'Payroll & Form 16', 'Accounting software migration'],
  },

  'bpo-sales': {
    plans: [
      { id: 'sales-starter', name: 'Starter', startingAt: null, badge: 'Pilot Team', bestFor: 'Testing outbound or inbound sales', highlights: ['Inbound lead qualification (SDR)', 'Daily call & activity reports', 'CRM updates on every lead'] },
      { id: 'sales-growth', name: 'Growth', startingAt: null, badge: 'Most Popular', isPopular: true, bestFor: 'Scaling a qualified pipeline', highlights: ['Everything in Starter, plus:', 'Outbound prospecting (BDR)', 'Omnichannel sales cadences', 'Weekly pipeline reviews'] },
      { id: 'sales-enterprise', name: 'Enterprise', startingAt: null, badge: 'Full Sales Desk', bestFor: 'Dedicated sales floor at scale', highlights: ['Everything in Growth, plus:', 'Inside sales & deal closing', 'Win-back & renewal desk', 'Dedicated team lead & QA'] },
    ],
    addons: ['CRM setup & hygiene', 'Sales script development', 'Multilingual agents', 'Call recording & QA audits'],
  },

  'bpo-backoffice': {
    plans: [
      { id: 'backoffice-starter', name: 'Starter', startingAt: null, badge: 'Pilot Process', bestFor: 'One defined back-office process', highlights: ['Data entry & transaction processing', 'Daily accuracy reports', 'Defined turnaround SLAs'] },
      { id: 'backoffice-growth', name: 'Growth', startingAt: null, badge: 'Most Popular', isPopular: true, bestFor: 'Multiple workflows & higher volumes', highlights: ['Everything in Starter, plus:', 'KYC & compliance verification', 'Document digitization & OCR', 'Account reconciliation support'] },
      { id: 'backoffice-enterprise', name: 'Enterprise', startingAt: null, badge: '24/7 Operations', bestFor: 'Round-the-clock data operations', highlights: ['Everything in Growth, plus:', '24/7/365 floor coverage', 'Workflow automation & scripting', 'Dedicated operations manager'] },
    ],
    addons: ['Catalog & master data management', 'RPA automation', 'Custom reporting dashboards', 'Process documentation (SOPs)'],
  },

  'bpo-customer-service': {
    plans: [
      { id: 'cx-starter', name: 'Starter', startingAt: null, badge: 'Business Hours', bestFor: 'Email & chat support for growing brands', highlights: ['Email & live chat support', 'Business-hours coverage', 'Knowledge-base driven resolution'] },
      { id: 'cx-growth', name: 'Growth', startingAt: null, badge: 'Most Popular', isPopular: true, bestFor: 'Omnichannel support with voice', highlights: ['Everything in Starter, plus:', 'Voice support', 'Tier-1 technical helpdesk', 'Weekly CSAT & QA reports'] },
      { id: 'cx-enterprise', name: 'Enterprise', startingAt: null, badge: '24/7 Omnichannel', bestFor: 'Global, always-on customer care', highlights: ['Everything in Growth, plus:', '24/7 multilingual coverage', 'Tier-2 escalations & retention desk', 'Voice analytics & QA coaching'] },
    ],
    addons: ['WhatsApp Business support', 'Social media response', 'Multilingual agents', 'Helpdesk tool setup (Zendesk / Freshdesk)'],
  },

  'saas-digital-solutions': {
    plans: [
      { id: 'saas-starter', name: 'Starter', startingAt: null, badge: 'Automation', bestFor: 'Automate one workflow or process', highlights: ['AI workflow automation', 'Integration with your existing tools', 'Deployment & handover'] },
      { id: 'saas-growth', name: 'Growth', startingAt: null, badge: 'Most Popular', isPopular: true, bestFor: 'Custom app or AI product MVP', highlights: ['Everything in Starter, plus:', 'Custom SaaS app or dashboard', 'AI / LLM features', '2-week agile sprints'] },
      { id: 'saas-enterprise', name: 'Enterprise', startingAt: null, badge: 'Platform Build', bestFor: 'Scalable platforms & enterprise AI', highlights: ['Everything in Growth, plus:', 'Custom LLM solutions', 'Cloud, MLOps & DevOps', 'Security & compliance readiness'] },
    ],
    addons: ['Payment gateway & billing automation', 'Cloud hosting management', 'Annual maintenance', 'AI chatbot / agent'],
  },

  'performance-management-consultancy': {
    plans: [
      { id: 'perf-starter', name: 'Audit', startingAt: null, badge: 'Diagnosis', bestFor: 'Find bottlenecks on your floor', highlights: ['Floor efficiency & SLA audit', 'QA sampling review', 'Findings & action report'] },
      { id: 'perf-growth', name: 'Implementation', startingAt: null, badge: 'Most Popular', isPopular: true, bestFor: 'Fix and systemise performance', highlights: ['Everything in Audit, plus:', 'Performance management system setup', 'QA frameworks & scorecards', 'Coaching cadences'] },
      { id: 'perf-enterprise', name: 'Managed', startingAt: null, badge: 'Ongoing', bestFor: 'Continuous performance governance', highlights: ['Everything in Implementation, plus:', 'Real-time floor telemetry & leaderboards', 'Monthly performance reviews', 'Dedicated performance consultant'] },
    ],
    addons: ['Script adherence audits', 'Trainer-the-trainer programs', 'Custom dashboards', 'SLA audit defense'],
  },

  'digital-marketing': {
    plans: [
      { id: 'dm-starter', name: 'Starter', startingAt: null, badge: 'One Channel', bestFor: 'Start paid ads on one platform', highlights: ['Meta or Google Ads management', 'Campaign setup & creatives guidance', 'Monthly performance report'] },
      { id: 'dm-growth', name: 'Growth', startingAt: null, badge: 'Most Popular', isPopular: true, bestFor: 'Multi-channel lead generation', highlights: ['Everything in Starter, plus:', 'Meta + Google Ads', 'Conversion tracking (GA4, Pixel)', 'Landing page CRO'] },
      { id: 'dm-enterprise', name: 'Enterprise', startingAt: null, badge: 'Full Funnel', bestFor: 'Full-funnel growth & SEO', highlights: ['Everything in Growth, plus:', 'Technical & on-page SEO', 'LinkedIn B2B ABM', 'Attribution dashboards & weekly reviews'] },
    ],
    addons: ['Ad creatives & video', 'Landing page design', 'Server-side tracking (CAPI)', 'Social media management'],
  },

  'recruitment-hiring': {
    plans: [
      { id: 'hire-starter', name: 'Single Hire', startingAt: null, badge: 'One Role', bestFor: 'Fill one open position', highlights: ['Sourcing & screening', 'Vetted shortlist', 'Interview coordination'] },
      { id: 'hire-growth', name: 'Team Hiring', startingAt: null, badge: 'Most Popular', isPopular: true, bestFor: 'Multiple roles across teams', highlights: ['Everything in Single Hire, plus:', 'Multiple concurrent roles', 'Multi-tier technical vetting', 'Offer & joining follow-up'] },
      { id: 'hire-enterprise', name: 'Hiring Partner', startingAt: null, badge: 'Ongoing', bestFor: 'Continuous or executive hiring', highlights: ['Everything in Team Hiring, plus:', 'Executive & specialised search', 'Contract & project staffing', 'Dedicated recruiter'] },
    ],
    addons: ['Background verification', 'Salary benchmarking', 'Employer branding', 'Contract staffing'],
  },
};

// ═══════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════

export function isGstExtra(pkg) {
  return Boolean(pkg?.gstExtra);
}

/**
 * Charge breakdown in rupees (2-decimal precision), e.g. 99 + GST → { base: 99, gst: 17.82, total: 116.82 }
 */
export function getPackageCharge(pkg) {
  const base = Number(pkg?.price) || 0;
  const gst = isGstExtra(pkg) ? Math.round(base * GST_RATE * 100) / 100 : 0;
  return { base, gst, total: Math.round((base + gst) * 100) / 100 };
}

/**
 * Server-side lookup: only the consultation can be paid for on the website
 */
export function getPackageById(packageId) {
  return packageId === CONSULTATION.id ? CONSULTATION : null;
}

/**
 * Display label for an indicative plan price
 */
export function getPlanPriceLabel(plan) {
  if (!plan?.startingAt) return 'Custom quote';
  return `₹${plan.startingAt.toLocaleString('en-IN')}${plan.unit || ''}`;
}

/**
 * Resolve a service slug (or alias / title) to its plans + add-ons
 */
export function getServicePlans(serviceSlugOrTitle) {
  if (!serviceSlugOrTitle) return null;
  const normalized = serviceSlugOrTitle.toLowerCase().trim();
  if (SERVICE_PLANS[normalized]) return SERVICE_PLANS[normalized];
  if (normalized.startsWith('web-dev') || normalized.includes('website development')) return SERVICE_PLANS['web-development'];
  if (normalized.includes('payroll')) return SERVICE_PLANS['payroll-compensation'];
  if (normalized.includes('bookkeeping')) return SERVICE_PLANS['bookkeeping-accountancy'];
  return null;
}
