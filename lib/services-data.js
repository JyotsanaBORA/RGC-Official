/**
 * Reddington Global — Service Architecture
 * Categorized into:
 *  1. BPO Services (Sales, Back Office, Customer Services)
 *  2. Consultancy Services (SaaS, Bookkeeping & Accountancy, IT Services)
 *  3. Digital Marketing
 */

export const SERVICE_CATEGORIES = [
  { id: 'bpo', name: 'BPO Services', description: 'Enterprise process management, specialized floor operations, and customer lifecycle delivery.' },
  { id: 'consultancy', name: 'Consultancy Services', description: 'Strategic advisory, software engineering, and compliant financial governance.' },
  { id: 'marketing', name: 'Digital Marketing', description: 'Data-driven performance media, high-intent acquisition, and ROI growth engines.' },
];

export const SERVICES = [
  // ═══════════════════════════════════════════════════════════════════
  // 1. BPO SERVICES
  // ═══════════════════════════════════════════════════════════════════
  {
    slug: 'bpo-sales',
    aliases: ['sales', 'recruitment', 'recruitment-staffing'],
    category: 'bpo',
    categoryName: 'BPO Services',
    title: 'Sales & Revenue Operations',
    shortTitle: 'Sales BPO',
    eyebrow: 'BPO Services · Inbound & Outbound Pipeline',
    image: '/assets/img/svc-recruitment-opt.webp',
    tagline: 'High-velocity sales execution, qualified pipeline generation, and dedicated outbound conversion teams.',
    overview:
      'We deploy specialized, quota-carrying sales development teams trained to accelerate your deal pipeline. From inbound lead qualification to aggressive outbound prospecting and inside sales closing, our operational floors combine disciplined cadences with rigorous performance telemetry to expand your enterprise revenue.',
    stats: [
      { metric: '3.4x', label: 'Average Pipeline Velocity' },
      { metric: '< 5 Mins', label: 'Inbound Lead Response Time' },
      { metric: '100%', label: 'CRM & Activity Compliance' },
    ],
    challengeVsSolution: {
      challenge: 'Unqualified lead decay, high SDR turnover, inconsistent outbound calling cadences, and soaring cost-per-acquisition (CPA).',
      solution: 'Dedicated high-performance sales floor with continuous objection handling training, dialed outbound cadences, and real-time conversion dashboards.',
      impact: 'Immediate pipeline expansion, lower acquisition costs, and predictable monthly recurring revenue (MRR) acceleration.',
    },
    offerings: [
      { num: '01', title: 'Inbound Lead Qualification (SDR)', desc: 'Instant response protocols for incoming demo requests and web inquiries to qualify intent and book executive discovery meetings.' },
      { num: '02', title: 'Outbound Prospecting & Account Calling (BDR)', desc: 'Disciplined multi-touch phone, email, and social cadences targeting verified decision-makers across your TAM.' },
      { num: '03', title: 'Inside Sales & Deal Closing', desc: 'Pre-screened account executives managing consultative sales cycles, overcoming objections, and securing closed-won contracts.' },
      { num: '04', title: 'Pipeline & CRM Hygiene Governance', desc: 'Real-time pipeline tracking, deal stage verification, and CRM data enrichment across Salesforce, HubSpot, and Zoho.' },
      { num: '05', title: 'Win-Back & Contract Renewal Desk', desc: 'Strategic outreach to dormant accounts and expiring contracts to minimize churn and reactivate high-margin revenue.' },
      { num: '06', title: 'Omnichannel Sales Cadences', desc: 'Integrated telephony, live web chat sales conversion, and automated sequence workflows tailored to high-ticket B2B deals.' },
    ],
    slas: [
      { metric: '< 5 Mins', label: 'Inbound Speed-to-Lead', detail: 'Rapid routing for incoming high-intent buyer inquiries.' },
      { metric: '100%', label: 'QA Recorded & Calibrated', detail: 'Every interaction analyzed for script adherence and closing technique.' },
      { metric: 'Bi-Weekly', label: 'Revenue Calibration Review', detail: 'Executive conversion reviews and pacing adjustments.' },
    ],
  },
  {
    slug: 'bpo-backoffice',
    aliases: ['backoffice', 'back-office', 'operations'],
    category: 'bpo',
    categoryName: 'BPO Services',
    title: 'Back Office Operations',
    shortTitle: 'Back Office BPO',
    eyebrow: 'BPO Services · Data Operations & Admin',
    image: '/assets/img/svc-bpo-opt.webp',
    tagline: 'Precision data operations, workflow orchestration, and high-volume transaction processing.',
    overview:
      'Eliminate operational friction and administrative bottlenecks with our specialized back office delivery teams. We manage complex data workflows, KYC verification, order processing, and administrative support with dual-shore execution, institutional-grade data security, and near-zero error tolerances.',
    stats: [
      { metric: '99.8%', label: 'Data Accuracy Benchmark' },
      { metric: '24/7/365', label: 'Continuous Floor Execution' },
      { metric: '40–60%', label: 'Operational Cost Reduction' },
    ],
    challengeVsSolution: {
      challenge: 'Manual processing delays, high error rates in transactional records, fragmented compliance documentation, and expensive internal overhead.',
      solution: 'Structured operational units operating with automated validation rules, double-entry verification checkpoints, and strict SLA controls.',
      impact: 'Rapid turnaround times, flawless audit compliance, and scalable capacity that grows without linear hiring costs.',
    },
    offerings: [
      { num: '01', title: 'High-Volume Transaction Processing', desc: 'Rapid, error-free processing of invoices, billing orders, claims, and administrative records under strict SLAs.' },
      { num: '02', title: 'KYC, Identity & Compliance Verification', desc: 'Rigorous customer identification, document validation, credential checks, and fraud screening for regulated sectors.' },
      { num: '03', title: 'Catalog, Inventory & Master Data Management', desc: 'Continuous catalog updating, multi-channel product uploads, data taxonomy tagging, and deduplication.' },
      { num: '04', title: 'Document Digitization & OCR Workflows', desc: 'Automated document indexing, metadata tagging, archival management, and cloud storage compliance.' },
      { num: '05', title: 'Account Reconciliation & Clerical Support', desc: 'Systematic cross-checking of ledger entries, merchant payouts, statements, and operational dispute handling.' },
      { num: '06', title: 'Workflow Automation & Scripting', desc: 'Implementation of smart automation macros and robotic workflow triggers to eliminate repetitive manual entry.' },
    ],
    slas: [
      { metric: '99.8%', label: 'Accuracy SLA', detail: 'Dual-check QA governance on all transactional workflows.' },
      { metric: 'Same-Day', label: 'Turnaround Guarantee', detail: 'Transactions processed within agreed daily cutoff windows.' },
      { metric: 'ISO / AES', label: 'Data Security Protocols', detail: 'Strict zero-leakage access controls and clean-desk operational floors.' },
    ],
  },
  {
    slug: 'bpo-customer-service',
    aliases: ['customer-services', 'customer-service', 'immergix-bpo'],
    category: 'bpo',
    categoryName: 'BPO Services',
    title: 'Customer Services by Experts',
    shortTitle: 'Customer Services',
    eyebrow: 'BPO Services · Omnichannel 24/7 Support',
    image: '/assets/img/svc-performance-opt.webp',
    tagline: 'World-class 24/7 omnichannel customer care, technical resolution desks, and client retention.',
    overview:
      'Turn customer support into your core competitive advantage. Our expert service teams provide round-the-clock voice, chat, email, and social care with empathetic brand representation, rapid first-contact resolution (FCR), and calibrated quality assurance that boosts customer lifetime value (LTV).',
    stats: [
      { metric: '> 92%', label: 'First Contact Resolution (FCR)' },
      { metric: '< 25 Sec', label: 'Average Voice Speed-to-Answer' },
      { metric: '4.8 / 5', label: 'Average CSAT Benchmark' },
    ],
    challengeVsSolution: {
      challenge: 'Long wait times, robotic responses, high customer churn, and costly overnight shift staffing.',
      solution: 'Dedicated multi-shift operational floors with domain-trained agents, omnichannel ticketing integrations, and daily calibrated QA scoring.',
      impact: 'Industry-leading CSAT/NPS scores, enhanced customer retention, and seamless 24/7 global customer care.',
    },
    offerings: [
      { num: '01', title: '24/7 Omnichannel Voice & Chat Support', desc: 'Rapid, empathetic live response across phone, web live chat, mobile app ticketing, and WhatsApp Business.' },
      { num: '02', title: 'Tier-1 & Tier-2 Technical Helpdesk', desc: 'Structured troubleshooting, bug triage, account recovery, and SaaS application support guided by detailed SOPs.' },
      { num: '03', title: 'Proactive Customer Success & Retention', desc: 'Scheduled milestone check-ins, VIP client escalation desks, and proactive outreach to at-risk accounts.' },
      { num: '04', title: 'Social Media & Reputation Response', desc: 'Live monitoring and professional resolution across Google Reviews, Trustpilot, LinkedIn, and social media channels.' },
      { num: '05', title: 'Multilingual & Global Shift Delivery', desc: 'Round-the-clock shift structures covering North American, European, and Asia-Pacific working hours seamlessly.' },
      { num: '06', title: 'Voice Analytics & Continuous QA Coaching', desc: '100% call and interaction recording with weekly scoring calibration to continually elevate agent performance.' },
    ],
    slas: [
      { metric: '< 25 Sec', label: 'Voice Response SLA', detail: 'Rapid agent connection with under 2% abandonment rates.' },
      { metric: '> 90%', label: 'CSAT Benchmark Guarantee', detail: 'Maintained through calibrated coaching and weekly QA audits.' },
      { metric: '24/7/365', label: 'Floor Availability', detail: 'Guaranteed continuity with redundant dual-shore infrastructure.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 2. CONSULTANCY SERVICES
  // ═══════════════════════════════════════════════════════════════════
  {
    slug: 'saas-digital-solutions',
    aliases: ['saas', 'saas-services'],
    category: 'consultancy',
    categoryName: 'Consultancy Services',
    title: 'SaaS & Digital Solutions',
    shortTitle: 'SaaS Solutions',
    eyebrow: 'Consultancy · Cloud Architecture & SaaS',
    image: '/assets/img/svc-saas-opt.webp',
    tagline: 'Modern software engineering, unified cloud platforms, and workflow automation tailored for scale.',
    overview:
      'We architect, build, and integrate scalable cloud-native digital ecosystems. From custom enterprise web applications to unified CRM architectures and secure API integrations, we eliminate technical silos and automate operations to unlock sustainable business velocity.',
    stats: [
      { metric: '99.95%', label: 'Target System Uptime' },
      { metric: '2-Week', label: 'Agile Delivery Sprints' },
      { metric: 'PCI-DSS', label: 'Security & Encryption Standards' },
    ],
    challengeVsSolution: {
      challenge: 'Fragmented SaaS tools, manual data exports, clunky legacy software, and slow developer delivery.',
      solution: 'Modern cloud-native architecture with bi-directional API pipelines, unified customer databases, and clean intuitive interfaces.',
      impact: 'Automated business workflows, seamless system connectivity, and enterprise-grade software performance.',
    },
    offerings: [
      { num: '01', title: 'Enterprise Web Application Engineering', desc: 'High-performance Next.js, React, and Node.js enterprise applications designed with modern UX and robust backends.' },
      { num: '02', title: 'Bi-Directional API Integration & Middleware', desc: 'Custom REST and GraphQL pipelines connecting CRMs, payment gateways, ERPs, and external SaaS platforms.' },
      { num: '03', title: 'CRM & ERP Ecosystem Architecture', desc: 'Turnkey setup, data migration, and workflow automation for Salesforce, HubSpot, Zoho, and internal databases.' },
      { num: '04', title: 'Cloud Infrastructure & DevOps (AWS / Azure)', desc: 'Secure cloud hosting, CI/CD automated deployments, containerization (Docker), and automated backup management.' },
      { num: '05', title: 'Payment Gateways & Subscription Billing', desc: 'Frictionless checkout integrations with Stripe, Razorpay, UPI, and global recurring billing engines.' },
      { num: '06', title: 'Ongoing SLA Maintenance & Security Auditing', desc: 'Continuous endpoint uptime monitoring, vulnerability patching, database optimization, and feature evolution.' },
    ],
    slas: [
      { metric: '99.95%', label: 'Infrastructure Uptime', detail: 'High-availability multi-region cloud deployment.' },
      { metric: '< 2 Hrs', label: 'Critical Incident Response', detail: 'Dedicated Level-3 engineering escalation protocols.' },
      { metric: '100%', label: 'Code Review & Automated CI', detail: 'Zero unreviewed code deployed to production environments.' },
    ],
  },
  {
    slug: 'bookkeeping-accountancy',
    aliases: ['bookkeeping', 'bookkeeping-statutory-compliance', 'accounting'],
    category: 'consultancy',
    categoryName: 'Consultancy Services',
    title: 'Bookkeeping & Accountancy',
    shortTitle: 'Bookkeeping & Accounts',
    eyebrow: 'Consultancy · Financial Governance & Tax',
    image: '/assets/img/svc-compliance-opt.webp',
    tagline: 'Audit-ready financial bookkeeping, statutory tax compliance, and executive reporting.',
    overview:
      'Maintain pristine financial transparency and zero regulatory penalties. Our chartered consultants and accountancy specialists handle day-to-day general ledgers, GST/TDS returns, payroll reconciliation, and monthly executive financial reporting packs to keep your enterprise audit-ready at all times.',
    stats: [
      { metric: '100%', label: 'Statutory Filing Accuracy' },
      { metric: '5th of Mo.', label: 'Punctual Monthly Books Closing' },
      { metric: 'Zero', label: 'Penalty Compliance Track Record' },
    ],
    challengeVsSolution: {
      challenge: 'Disorganized receipts, delayed monthly statements, surprise tax liabilities, and painful year-end audit scrambles.',
      solution: 'Structured bookkeeping cadences, continuous bank reconciliations, and proactive statutory tax filings handled by domain experts.',
      impact: 'Clear leadership visibility into unit economics, total compliance peace of mind, and painless external financial audits.',
    },
    offerings: [
      { num: '01', title: 'Daily Financial Ledger & Entry Management', desc: 'Rigorous categorization of sales, purchases, bank feeds, expenses, and asset registers with zero reconciliation backlog.' },
      { num: '02', title: 'Statutory GST Compliance & E-Invoicing', desc: 'Preparation and filing of GSTR-1, GSTR-3B, annual GSTR-9 returns, Input Tax Credit (ITC) reconciliation, and e-way billing.' },
      { num: '03', title: 'TDS Deduction & Electronic Filing', desc: 'Accurate computation, timely tax deposits, quarterly filing of Form 24Q/26Q, and Form 16/16A certificate generation.' },
      { num: '04', title: 'Payroll Reconciliation & Withholdings', desc: 'End-to-end integration between payroll disbursements, Provident Fund (PF), ESIC, and corporate ledger entries.' },
      { num: '05', title: 'Executive Management Accounts (MIS)', desc: 'Delivered by the 5th of every month: P&L statements, balance sheets, cash flow models, and burn rate forecasts.' },
      { num: '06', title: 'Year-End Audit Defense & Governance', desc: 'Full preparation of audit files, schedule verifications, and professional representation before external auditors.' },
    ],
    slas: [
      { metric: '5th Monthly', label: 'Books Closing SLA', detail: 'Complete management accounts delivered by the 5th of each month.' },
      { metric: '100%', label: 'Statutory Deadlines Met', detail: 'Zero late fees or penalties across GST, TDS, and corporate tax.' },
      { metric: 'Dual-Key', label: 'Financial Security Controls', detail: 'Multi-layer approval workflows for all sensitive ledger reconciliations.' },
    ],
  },
  {
    slug: 'it-services',
    aliases: ['it', 'it-infrastructure', 'tech-services', 'performance-management-consultancy'],
    category: 'consultancy',
    categoryName: 'Consultancy Services',
    title: 'IT Services & Infrastructure',
    shortTitle: 'IT Services',
    eyebrow: 'Consultancy · Managed IT & Cloud Infrastructure',
    image: '/assets/img/svc-payroll-opt.webp',
    tagline: 'Enterprise managed IT services, cloud systems administration, network security, and technical advisory.',
    overview:
      'Empower your workforce with dependable, enterprise-grade IT infrastructure. We provide managed IT support, cloud network engineering, endpoint security governance, hardware lifecycle management, and high-availability systems architecture built to prevent downtime and safeguard corporate data.',
    stats: [
      { metric: '99.9%', label: 'Infrastructure Availability' },
      { metric: '< 15 Mins', label: 'Critical IT Ticket Response' },
      { metric: 'SOC-Ready', label: 'Security & Access Protocols' },
    ],
    challengeVsSolution: {
      challenge: 'Network downtime, unpatched workstation vulnerabilities, disorganized hardware inventory, and remote team connectivity roadblocks.',
      solution: 'Centralized cloud management, 24/7 network monitoring, automated security patching, and responsive IT desk support.',
      impact: 'Seamless workforce productivity, protected business assets, and rock-solid corporate IT resilience.',
    },
    offerings: [
      { num: '01', title: 'Managed IT Helpdesk & Remote Support', desc: 'Swift ticket resolution for software crashes, user credentials, email provisioning, and hardware troubleshooting.' },
      { num: '02', title: 'Cloud Systems Administration (AWS / Azure / GCP)', desc: 'Architecture management, virtual machine scaling, IAM access governance, and cloud cost optimization.' },
      { num: '03', title: 'Endpoint Security & Antivirus Governance', desc: 'Centralized MDM device management, automated OS patch management, anti-ransomware defenses, and disk encryption.' },
      { num: '04', title: 'Corporate Network & VPN Architecture', desc: 'Secure firewall deployments, high-speed office networking, dual-WAN failover, and zero-trust VPN setups.' },
      { num: '05', title: 'Business Continuity & Disaster Recovery (BCP)', desc: 'Automated daily cloud backups, snapshot testing, and guaranteed recovery-time objectives (RTO).' },
      { num: '06', title: 'IT Procurement & Asset Lifecycle Management', desc: 'Enterprise workstation provisioning, asset tracking, licensing compliance, and certified hardware retirement.' },
    ],
    slas: [
      { metric: '< 15 Mins', label: 'Severity-1 Response SLA', detail: 'Rapid response for critical server or network outages.' },
      { metric: '24/7', label: 'Proactive Telemetry', detail: 'Continuous automated monitoring of CPU, RAM, and network health.' },
      { metric: 'Zero Loss', label: 'Backup Verification SLA', detail: 'Daily automated verification of all core data backups.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 3. DIGITAL MARKETING
  // ═══════════════════════════════════════════════════════════════════
  {
    slug: 'digital-marketing',
    aliases: ['marketing', 'performance-marketing', 'digital-marketing-services'],
    category: 'marketing',
    categoryName: 'Digital Marketing',
    title: 'Digital Marketing & Growth',
    shortTitle: 'Digital Marketing',
    eyebrow: 'Performance Marketing · Paid Media & SEO',
    image: '/assets/img/who-we-are-opt.webp',
    tagline: 'High-ROI paid advertising, data-driven lead generation, search ranking, and conversion funnels.',
    overview:
      'Drive predictable commercial growth through data-calibrated digital marketing. We build, manage, and optimize enterprise campaigns across Meta Ads, Google Ads, and LinkedIn Ads, paired with strategic on-page SEO and high-converting landing pages engineered to turn traffic into qualified pipeline.',
    stats: [
      { metric: '4.2x', label: 'Average ROAS on Paid Media' },
      { metric: '-38%', label: 'Reduction in Cost Per Lead (CPL)' },
      { metric: '100%', label: 'Attributed Conversion Tracking' },
    ],
    challengeVsSolution: {
      challenge: 'Wasted ad budget, inaccurate conversion reporting, low click-to-lead conversion rates, and stagnant organic search visibility.',
      solution: 'Precision audience targeting, continuous creative A/B testing, unified GTM/GA4 conversion tracking, and high-intent keyword capture.',
      impact: 'Predictable stream of commercial inbound leads, transparent CPA metrics, and compounding digital brand authority.',
    },
    offerings: [
      { num: '01', title: 'Meta Ads Management (Facebook & Instagram)', desc: 'Hyper-targeted lead generation, retargeting sequences, dynamic creative optimization, and custom audience funnels.' },
      { num: '02', title: 'Google Ads & Search Intent Capture', desc: 'High-intent search campaigns, Performance Max (PMax), remarketing display networks, and call-only ads.' },
      { num: '03', title: 'LinkedIn B2B Account-Based Marketing (ABM)', desc: 'Targeted account marketing aimed at verified corporate titles, company sizes, and executive procurement teams.' },
      { num: '04', title: 'Conversion Rate Optimization (CRO)', desc: 'High-speed landing page design, heat-mapping analysis, copywriting, and form friction reduction to maximize conversions.' },
      { num: '05', title: 'Enterprise Technical & On-Page SEO', desc: 'Keyword strategy, Schema markup, site architecture, and authoritative content pipelines that rank on page one.' },
      { num: '06', title: 'Advanced Tracking, GTM & Attribution Dashboards', desc: 'End-to-end Google Tag Manager, GA4 event modeling, Meta Conversions API (CAPI), and live client ROI dashboards.' },
    ],
    slas: [
      { metric: 'Daily', label: 'Bid & Budget Optimization', detail: 'Active bid management to maintain lowest cost-per-lead.' },
      { metric: '100%', label: 'Attribution Tracking', detail: 'Every lead tracked back to its original ad, keyword, and campaign.' },
      { metric: 'Weekly', label: 'Executive Performance Briefing', detail: 'Transparent ROI, spend, and conversion reports.' },
    ],
  },
];

export function getServiceBySlug(slug) {
  if (!slug) return null;
  const clean = slug.toLowerCase().trim();
  return SERVICES.find(s => s.slug === clean || s.aliases?.includes(clean)) || null;
}

export function getServicesByCategory(category) {
  return SERVICES.filter(s => s.category === category);
}
