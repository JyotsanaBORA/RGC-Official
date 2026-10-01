/**
 * Reddington Global — Service Architecture
 * Categorized into:
 *  1. BPO Services (Sales, Back Office, Customer Services by Vishal Sir, Recruitment & Staffing)
 *  2. Consultancy Services (SaaS Solutions, Bookkeeping & Accountancy, Digital Marketing, Payroll & Compensation, Performance Management Consultancy)
 */

export const SERVICE_CATEGORIES = [
  {
    id: 'bpo',
    name: 'BPO Services',
    description:
      'Comprehensive business process outsourcing is designed to manage customer interactions across the entire sales lifecycle. Through our dedicated contact center operations, we handle inbound and outbound pre-sales engagement to qualify leads, alongside responsive post-sales support to resolve customer inquiries and boost retention.',
  },
  {
    id: 'consultancy',
    name: 'Consultancy Services',
    description:
      'Strategic enterprise advisory, software engineering, compliant financial governance, payroll administration, and performance optimization.',
  },
];

export const SERVICES = [
  // ═══════════════════════════════════════════════════════════════════
  // 1. BPO SERVICES
  // ═══════════════════════════════════════════════════════════════════
  {
    slug: 'bpo-sales',
    aliases: ['sales'],
    category: 'bpo',
    categoryName: 'BPO Services',
    title: 'Sales & Revenue Operations',
    shortTitle: 'Sales BPO',
    eyebrow: 'BPO Services · Inbound & Outbound Pipeline',
    image: '/assets/img/svc-sales-opt.webp',
    tagline: 'High-velocity sales execution, qualified pipeline generation, and dedicated outbound conversion teams.',
    overview:
      'Comprehensive business process outsourcing designed to manage customer interactions across the entire sales lifecycle. Through our dedicated contact center operations, we handle inbound and outbound pre-sales engagement to qualify leads, alongside responsive post-sales support to resolve customer inquiries and boost retention.',
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
    image: '/assets/img/svc-backoffice-opt.webp',
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
    aliases: ['customer-services', 'customer-service', 'customer-care'],
    category: 'bpo',
    categoryName: 'BPO Services',
    title: 'Customer Services by Vishal Sir',
    shortTitle: 'Customer Services',
    eyebrow: 'BPO Services · Omnichannel 24/7 Support',
    image: '/assets/img/svc-customercare-opt.webp',
    tagline: 'World-class 24/7 omnichannel customer care, technical resolution desks, and client retention.',
    overview:
      'Comprehensive contact center operations led by Vishal Sir, designed to manage customer interactions across the entire lifecycle. We handle inbound and outbound pre-sales engagement alongside responsive post-sales support, Tier-1/Tier-2 helpdesks, and empathetic client retention workflows across voice, chat, email, and social channels.',
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
  {
    slug: 'recruitment-staffing',
    aliases: ['recruitment', 'staffing', 'talent-acquisition'],
    category: 'bpo',
    categoryName: 'BPO Services',
    title: 'Recruitment & Staffing',
    shortTitle: 'Recruitment & Staffing',
    eyebrow: 'BPO Services · Talent Acquisition',
    image: '/assets/img/svc-recruitment-opt.webp',
    tagline: 'End-to-end talent sourcing engineered to fulfill high-volume headcount requirements with speed and precision.',
    overview:
      'We specialize in sourcing, screening, and deploying skilled professionals across both technical and non-technical domains to support fast-scaling business operations. From specialized floor staffing to technical recruitment, we ensure rigorous candidate vetting and rapid deployment.',
    stats: [
      { metric: '< 10 Days', label: 'Average Time-to-Deploy' },
      { metric: '94%', label: 'Candidate Retention Rate' },
      { metric: '100%', label: 'Multi-Stage Vetting' },
    ],
    challengeVsSolution: {
      challenge: 'Prolonged time-to-hire, high early candidate turnover, inflated agency placement fees, and mismatched operational skills.',
      solution: 'Institutional talent pipelines, standardized domain assessments, behavioral screening, and dedicated recruiters embedded in your requirements.',
      impact: 'Rapid headcount ramp-up, lower hiring overhead, and Day-One operational productivity.',
    },
    offerings: [
      { num: '01', title: 'High-Volume Floor Staffing', desc: 'Rapid deployment of pre-screened SDRs, customer service specialists, and transaction operators.' },
      { num: '02', title: 'Technical & Engineering Recruitment', desc: 'Sourcing full-stack engineers, cloud architects, DevOps specialists, and QA engineers for digital teams.' },
      { num: '03', title: 'Executive & Specialized Search', desc: 'Targeted headhunting for team leads, operations managers, and specialized domain directors.' },
      { num: '04', title: 'Multi-Tier Screening & Skill Assessment', desc: 'Rigorous technical coding tests, language fluency evaluation, and culture-fit assessments.' },
      { num: '05', title: 'Contract-to-Hire & Flexible Deployments', desc: 'Agile staffing models designed to scale up or down based on seasonal and operational requirements.' },
      { num: '06', title: 'Background Checks & Day-One Compliance', desc: 'End-to-end criminal, educational, and previous employer credential verification.' },
    ],
    slas: [
      { metric: '< 48 Hrs', label: 'First Candidate Slate', detail: 'Curated shortlist of screened profiles delivered within two business days.' },
      { metric: '90-Day', label: 'Replacement Guarantee', detail: 'Immediate zero-cost candidate replacement if placement does not pass probation.' },
      { metric: '100%', label: 'Verified Credentials', detail: 'Comprehensive background verification completed before Day-One onboarding.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 2. CONSULTANCY SERVICES
  // ═══════════════════════════════════════════════════════════════════
  {
    slug: 'saas-digital-solutions',
    aliases: ['saas', 'saas-services', 'it-services', 'it'],
    category: 'consultancy',
    categoryName: 'Consultancy Services',
    title: 'SaaS & IT Digital Solutions',
    shortTitle: 'SaaS Solutions',
    eyebrow: 'Consultancy · Cloud Architecture & SaaS',
    image: '/assets/img/svc-saas-opt.webp',
    tagline: 'Website design, custom web applications, API integrations, and global payment gateways engineered for scale.',
    overview:
      'We architect, build, and integrate scalable cloud-native digital ecosystems. From high-conversion website design and custom web applications to REST/GraphQL API integration, third-party middleware connections, and secure payment gateways, we eliminate technical silos and automate operations to unlock sustainable business velocity.',
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
      { num: '01', title: 'Website Design & Modern Web Applications', desc: 'High-performance Next.js, React, and Node.js applications designed with modern UX and responsive layouts.' },
      { num: '02', title: 'Custom REST & GraphQL API Integration', desc: 'Bi-directional pipelines connecting web apps, internal databases, CRMs, and external cloud infrastructure.' },
      { num: '03', title: 'Third-Party API & Middleware Connections', desc: 'Seamless orchestration between Salesforce, HubSpot, Zoho, Google Workspace, and enterprise ERPs.' },
      { num: '04', title: 'Global Payment Gateways & Billing', desc: 'Frictionless checkout integrations with Stripe, Razorpay, UPI, PayPal, and automated recurring billing engines.' },
      { num: '05', title: 'Cloud Hosting & DevOps (AWS / Azure)', desc: 'Secure cloud hosting, containerization (Docker), CI/CD automated deployments, and backup management.' },
      { num: '06', title: 'Ongoing SLA Maintenance & Endpoint Security', desc: 'Continuous endpoint uptime monitoring, vulnerability patching, database optimization, and feature evolution.' },
    ],
    slas: [
      { metric: '99.95%', label: 'Infrastructure Uptime', detail: 'High-availability multi-region cloud deployment.' },
      { metric: '< 2 Hrs', label: 'Critical Incident Response', detail: 'Dedicated Level-3 engineering escalation protocols.' },
      { metric: '100%', label: 'Code Review & Automated CI', detail: 'Zero unreviewed code deployed to production environments.' },
    ],
  },
  {
    slug: 'bookkeeping-accountancy',
    aliases: ['bookkeeping', 'accounting'],
    category: 'consultancy',
    categoryName: 'Consultancy Services',
    title: 'Bookkeeping & Accountancy',
    shortTitle: 'Bookkeeping & Accounts',
    eyebrow: 'Consultancy · Financial Governance & Tax',
    image: '/assets/img/svc-accounting-opt.webp',
    tagline: 'Audit-ready financial bookkeeping, statutory tax compliance, and executive reporting.',
    overview:
      'Maintain pristine financial transparency and zero regulatory penalties. Our chartered consultants and accountancy specialists handle day-to-day data entry, general ledgers, statutory tax filings (GST & TDS India), and monthly executive financial reporting packs to keep your enterprise audit-ready at all times.',
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
      { num: '01', title: 'Daily Data Entry & Financial Ledger Management', desc: 'Categorization of sales, purchases, bank feeds, expenses, and asset registers with zero reconciliation backlog.' },
      { num: '02', title: 'Statutory Tax Filing & Corporate Returns', desc: 'Timely preparation and electronic submission of statutory corporate income tax filings and advance tax computation.' },
      { num: '03', title: 'GST Compliance (India) & E-Invoicing', desc: 'Filing of GSTR-1, GSTR-3B, annual GSTR-9 returns, Input Tax Credit (ITC) reconciliation, and compliant e-way billing.' },
      { num: '04', title: 'TDS Compliance (India) & Form 16', desc: 'Accurate computation, monthly tax deposits, quarterly filing of Form 24Q/26Q, and Form 16/16A certificate generation.' },
      { num: '05', title: 'Regulatory Compliance & Audit Defense', desc: 'Full preparation of audit files, schedule verifications, and professional representation before statutory auditors.' },
      { num: '06', title: 'Monthly Management Accounts (MIS)', desc: 'Delivered by the 5th of every month: P&L statements, balance sheets, cash flow models, and burn rate forecasts.' },
    ],
    slas: [
      { metric: '5th Monthly', label: 'Books Closing SLA', detail: 'Complete management accounts delivered by the 5th of each month.' },
      { metric: '100%', label: 'Statutory Deadlines Met', detail: 'Zero late fees or penalties across GST, TDS, and corporate tax.' },
      { metric: 'Dual-Key', label: 'Financial Security Controls', detail: 'Multi-layer approval workflows for all sensitive ledger reconciliations.' },
    ],
  },
  {
    slug: 'payroll-compensation',
    aliases: ['payroll', 'payroll-services', 'payroll-compliance'],
    category: 'consultancy',
    categoryName: 'Consultancy Services',
    title: 'Payroll & Compensation Management',
    shortTitle: 'Payroll & Compensation',
    eyebrow: 'Consultancy · Workforce Compensation & Tax',
    image: '/assets/img/svc-payroll-opt.webp',
    tagline: 'A secure, streamlined payroll processing service designed to handle timely salary disbursements and end-to-end workforce compensation.',
    overview:
      'We manage wage calculations, tax deductions, and statutory compliance reporting to ensure operational accuracy and peace of mind. From automated salary disbursements to provident fund (PF), ESIC, and annual tax documentation, our payroll desk guarantees zero payroll delays and institutional-grade compliance.',
    stats: [
      { metric: '100%', label: 'On-Time Salary Disbursement' },
      { metric: 'Zero', label: 'Compliance Penalties' },
      { metric: 'AES-256', label: 'Encrypted Payroll Vault' },
    ],
    challengeVsSolution: {
      challenge: 'Manual payroll calculation errors, delayed salary payouts, complex statutory deductions, and employee friction over incorrect tax withholdings.',
      solution: 'Automated payroll pipelines integrated with direct deposit banking, automated statutory withholdings, and instant employee self-service access.',
      impact: 'Flawless payday execution, full labor law compliance, and delighted employees with transparent digital payslips.',
    },
    offerings: [
      { num: '01', title: 'Timely Salary Disbursement Orchestration', desc: 'Direct bank upload files and automated payroll processing to guarantee 100% on-time salary releases.' },
      { num: '02', title: 'Wage Calculations & Overtime Tracking', desc: 'Accurate computation of basic pay, allowances, incentives, overtime hours, and unpaid leave deductions.' },
      { num: '03', title: 'Statutory Compliance (PF, ESIC, PT)', desc: 'End-to-end calculation, monthly deposit, and return filing for Provident Fund, ESIC, and Professional Tax.' },
      { num: '04', title: 'Payroll Tax Withholding (TDS) & Form 16', desc: 'Investment declaration verification, monthly TDS deduction, and automated issuance of annual Form 16 certificates.' },
      { num: '05', title: 'Automated Digital Payslips & Portals', desc: 'Instant password-protected digital payslip generation and distribution to all employees on disbursement day.' },
      { num: '06', title: 'Full & Final Settlement (F&F) Governance', desc: 'Comprehensive exit settlement processing including gratuity calculations, leave encashment, and no-dues clearance.' },
    ],
    slas: [
      { metric: '100%', label: 'Disbursement Guarantee', detail: 'Salaries processed and disbursed on agreed contract dates without failure.' },
      { metric: 'Zero Error', label: 'Calculation Accuracy', detail: 'Automated calculation checks with double-entry accountant review.' },
      { metric: 'Strict AES', label: 'Data Security Protocols', detail: 'Full confidentiality encryption on all employee salary and banking records.' },
    ],
  },
  {
    slug: 'performance-management-consultancy',
    aliases: ['performance-management', 'performance'],
    category: 'consultancy',
    categoryName: 'Consultancy Services',
    title: 'Performance Management Consultancy',
    shortTitle: 'Performance Management',
    eyebrow: 'Consultancy · Floor Efficiency & QA Systems',
    image: '/assets/img/svc-performance-opt.webp',
    tagline: 'Targeted advisory solutions built to streamline day-to-day operations and improve floor efficiency.',
    overview:
      'We implement robust performance management systems, optimize contact center workflows to maximize sales output, and deliver structured Quality Assurance (QA) frameworks to ensure interaction standards remain consistent. From agent telemetry to closing ratio optimization, we elevate floor throughput and eliminate operational bottlenecks.',
    stats: [
      { metric: '+32%', label: 'Average Floor Productivity Lift' },
      { metric: '100%', label: 'Calibrated QA Interaction Auditing' },
      { metric: '< 14 Days', label: 'Rapid Workflow Deployment' },
    ],
    challengeVsSolution: {
      challenge: 'Declining floor productivity, inconsistent agent talk tracks, uncalibrated QA scores, and lack of visibility into daily operational metrics.',
      solution: 'Custom performance management frameworks, real-time KPI dashboards, structured coaching cadences, and dialed workflow redesign.',
      impact: 'Measurable rise in conversion rates, lower agent turnover, and predictable institutional output across all teams.',
    },
    offerings: [
      { num: '01', title: 'Robust Performance Management Systems', desc: 'Implementation of structured KPI tracking, milestone scorecards, and objective employee evaluation systems.' },
      { num: '02', title: 'Contact Center Workflow Optimization', desc: 'In-depth audit and redesign of operational routing, call queues, and floor cadences to maximize sales output.' },
      { num: '03', title: 'Structured Quality Assurance (QA) Frameworks', desc: 'Institutional interaction scoring matrices, speech calibration rubrics, and compliance adherence standards.' },
      { num: '04', title: 'Real-Time Floor Telemetry & Leaderboards', desc: 'Live productivity monitors, activity tracking, and transparent performance leaderboards that motivate teams.' },
      { num: '05', title: 'Script Adherence & Coaching Cadences', desc: 'Weekly calibrated coaching, objection handling workshops, and tactical deal clinic sessions.' },
      { num: '06', title: 'SLA Audit Defense & Bottleneck Elimination', desc: 'Diagnostic analysis to isolate operational friction points and establish contract-grade SLA adherence.' },
    ],
    slas: [
      { metric: 'Weekly', label: 'Calibration Scoring Reviews', detail: 'Executive quality calibration sessions to maintain zero scoring drift.' },
      { metric: '+25% Min', label: 'Target Output Improvement', detail: 'Documented performance elevation achieved within 60 days of deployment.' },
      { metric: '100%', label: 'Actionable Reporting', detail: 'Daily and weekly telemetry dashboards delivered to client leadership.' },
    ],
  },
  {
    slug: 'digital-marketing',
    aliases: ['marketing', 'performance-marketing', 'digital-marketing-services'],
    category: 'consultancy',
    categoryName: 'Consultancy Services',
    title: 'Digital Marketing & Growth',
    shortTitle: 'Digital Marketing',
    eyebrow: 'Consultancy · Paid Media & Performance SEO',
    image: '/assets/img/svc-marketing-opt.webp',
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
  return SERVICES.find((s) => s.slug === clean || s.aliases?.includes(clean)) || null;
}

export function getServicesByCategory(category) {
  return SERVICES.filter((s) => s.category === category);
}
